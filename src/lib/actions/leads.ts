"use server";

import type { LeadFormState } from "@/lib/types/form-state";
import { leadSchema } from "@/lib/validations/schemas";
import { createClient } from "@/utils/supabase/server";

/**
 * AC-3.1 — Submit lead dari landing page.
 * Publik (anon, tanpa login). Diizinkan oleh policy `leads_insert_public`.
 */
export async function submitLead(
  _prevState: LeadFormState,
  formData: FormData,
): Promise<LeadFormState> {
  const parsed = leadSchema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
    agency_name: formData.get("agency_name") ?? undefined,
  });

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

  // Notifikasi Telegram Otomatis (Jika di-set di Vercel)
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (botToken && chatId) {
    try {
      const text = `🚨 *KLIEN BARU MASUK!* 🚨\n\n*Nama:* ${parsed.data.name}\n*WA:* ${parsed.data.phone}\n*Perusahaan:* ${parsed.data.agency_name || "-"}\n\n_Segera hubungi melalui Dashboard Voxy Anda!_`;
      
      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: text,
          parse_mode: "Markdown"
        })
      });
    } catch (telegramError) {
      console.error("Failed to send Telegram notification:", telegramError);
      // Gagal ngirim tele tidak boleh menggagalkan form utama
    }
  }

  return {
    status: "success",
    message: "Terima kasih! Tim kami akan menghubungi Anda segera.",
  };
}
