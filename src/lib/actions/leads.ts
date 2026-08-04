"use server";

import { headers } from "next/headers";
import { after } from "next/server";

import type { LeadFormState } from "@/lib/types/form-state";
import { leadSchema } from "@/lib/validations/schemas";
import { createClient } from "@/utils/supabase/server";

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

// Sengaja tidak seketat sebelumnya (3). Ini form lead, bukan endpoint login:
// biaya salah blokir (prospek asli menyerah) jauh lebih besar daripada biaya
// meloloskan beberapa submit bot ke tabel yang memang mudah dibersihkan lewat
// /admin. Banyak biro travel juga berbagi satu IP kantor.
const RATE_LIMIT_MAX_SUBMISSIONS = 5;

const TELEGRAM_TIMEOUT_MS = 3000;

// In-memory per-instance saja (bukan Redis/DB), jadi reset setiap cold start
// dan tidak dibagi antar instance serverless Vercel. Cukup untuk meredam bot
// yang spam berulang ke satu instance yang sama; bukan pertahanan distribusi.
const submissionLog = new Map<string, number[]>();

let lastSweptAt = Date.now();

/**
 * Buang IP yang sudah tidak punya submit dalam jendela aktif.
 *
 * Tanpa ini, entri hanya dipangkas saat IP yang sama datang lagi, sehingga
 * pengunjung sekali-datang menumpuk selamanya di instance yang berumur panjang.
 */
function sweepStaleEntries(now: number): void {
  if (now - lastSweptAt < RATE_LIMIT_WINDOW_MS) return;
  lastSweptAt = now;

  for (const [ip, timestamps] of submissionLog) {
    if (timestamps.every((timestamp) => now - timestamp >= RATE_LIMIT_WINDOW_MS)) {
      submissionLog.delete(ip);
    }
  }
}

function recentSubmissions(ip: string, now: number): number[] {
  return (submissionLog.get(ip) ?? []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS,
  );
}

/** Hanya membaca, tidak mencatat. Lihat `recordSubmission`. */
function isRateLimited(ip: string): boolean {
  const now = Date.now();
  sweepStaleEntries(now);

  const recent = recentSubmissions(ip, now);
  submissionLog.set(ip, recent);

  return recent.length >= RATE_LIMIT_MAX_SUBMISSIONS;
}

/**
 * Dipanggil hanya setelah submit benar-benar selesai diproses.
 *
 * Sebelumnya pencatatan dilakukan di `isRateLimited()`, sebelum validasi. Artinya
 * yang dihitung adalah percobaan, bukan submit: prospek yang salah ketik nomor
 * WhatsApp tiga kali langsung terkunci 10 menit.
 */
function recordSubmission(ip: string): void {
  const now = Date.now();
  const recent = recentSubmissions(ip, now);
  recent.push(now);
  submissionLog.set(ip, recent);
}

/**
 * Kirim notifikasi lead baru ke Telegram.
 *
 * Sengaja tanpa `parse_mode`. Dengan mode Markdown, nama yang mengandung `*`,
 * `_`, atau `[` membuat Telegram membalas 400 dan notifikasinya hilang diam-diam
 * padahal lead-nya sudah tersimpan -- untuk bisnis yang mengandalkan respons
 * cepat, itu sama saja dengan kehilangan lead.
 */
async function notifyTelegram(lead: {
  name: string;
  phone: string;
  agency_name: string | null;
}): Promise<void> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) return;

  const text = [
    "Lead baru",
    "",
    `Nama: ${lead.name}`,
    `WA: ${lead.phone}`,
    `Perusahaan: ${lead.agency_name || "-"}`,
  ].join("\n");

  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
      // Tanpa timeout, Telegram yang menggantung ikut menahan proses sampai
      // batas waktu platform.
      signal: AbortSignal.timeout(TELEGRAM_TIMEOUT_MS),
    });

    if (!response.ok) {
      console.error(
        `Telegram menolak notifikasi lead: HTTP ${response.status} ${await response.text()}`,
      );
    }
  } catch (error) {
    // Lead sudah tersimpan di database, jadi kegagalan notifikasi tidak boleh
    // membuat form gagal di sisi pengunjung.
    console.error("Gagal mengirim notifikasi Telegram:", error);
  }
}

/**
 * AC-3.1: Submit lead dari landing page.
 * Publik (anon, tanpa login). Diizinkan oleh policy `leads_insert_public`.
 */
export async function submitLead(
  _prevState: LeadFormState,
  formData: FormData,
): Promise<LeadFormState> {
  const headerList = await headers();
  const ip = headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (isRateLimited(ip)) {
    return {
      status: "error",
      message: "Terlalu banyak percobaan. Coba lagi dalam beberapa menit.",
    };
  }

  // Bot terjebak honeypot: pura-pura sukses tanpa benar-benar menyimpan,
  // supaya botnya tidak tahu ditolak dan tidak mengubah strategi.
  if (formData.get("website")) {
    recordSubmission(ip);
    return {
      status: "success",
      message: "Terima kasih! Tim kami akan menghubungi Anda segera.",
    };
  }

  const parsed = leadSchema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
    agency_name: formData.get("agency_name") ?? undefined,
  });

  // Salah ketik bukan percobaan spam, jadi tidak ikut dihitung rate limit.
  if (!parsed.success) {
    return {
      status: "error",
      message: "Data belum lengkap. Periksa kembali isian Anda.",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("leads").insert({
    name: parsed.data.name,
    phone: parsed.data.phone,
    agency_name: parsed.data.agency_name,
    status: "NEW",
  });

  if (error) {
    console.error("submitLead failed:", error.message);
    return {
      status: "error",
      message: "Gagal mengirim data. Silakan coba lagi.",
    };
  }

  recordSubmission(ip);

  // Dijadwalkan setelah respons terkirim, supaya pengunjung tidak menunggu
  // round-trip ke Telegram hanya untuk melihat konfirmasi.
  after(() => notifyTelegram(parsed.data));

  return {
    status: "success",
    message: "Terima kasih! Tim kami akan menghubungi Anda segera.",
    leadCaptured: true,
  };
}
