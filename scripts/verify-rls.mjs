/**
 * Verifikasi RLS (DoD #2) memakai anon key — jalankan setelah migrasi diterapkan:
 *   node scripts/verify-rls.mjs
 *
 * Yang dites, semuanya dari sisi publik (belum login):
 *   1. SELECT projects  → BOLEH
 *   2. INSERT projects  → DITOLAK
 *   3. INSERT leads     → BOLEH
 *   4. SELECT leads     → tidak mengembalikan data
 */
import fs from "node:fs";
import path from "node:path";

const envPath = path.join(process.cwd(), ".env.local");
if (!fs.existsSync(envPath)) {
  console.error("File .env.local tidak ditemukan.");
  process.exit(1);
}

const env = Object.fromEntries(
  fs
    .readFileSync(envPath, "utf8")
    .split(/\r?\n/)
    .filter((line) => line.includes("=") && !line.trim().startsWith("#"))
    .map((line) => {
      const i = line.indexOf("=");
      return [line.slice(0, i).trim(), line.slice(i + 1).trim().replace(/^["']|["']$/g, "")];
    }),
);

const URL_BASE = env.NEXT_PUBLIC_SUPABASE_URL;
const ANON_KEY = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!URL_BASE || !ANON_KEY) {
  console.error("NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY belum diisi.");
  process.exit(1);
}

const request = (endpoint, init = {}) =>
  fetch(`${URL_BASE}/rest/v1/${endpoint}`, {
    ...init,
    headers: {
      apikey: ANON_KEY,
      Authorization: `Bearer ${ANON_KEY}`,
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });

let failures = 0;
const report = (ok, label, detail) => {
  console.log(`${ok ? "PASS" : "FAIL"}  ${label}${detail ? ` — ${detail}` : ""}`);
  if (!ok) failures += 1;
};

// 1. Publik boleh membaca projects.
{
  const res = await request("projects?select=id&limit=1");
  report(res.ok, "anon SELECT projects diizinkan", `HTTP ${res.status}`);
}

// 2. Publik tidak boleh menambah project.
{
  const res = await request("projects", {
    method: "POST",
    body: JSON.stringify({
      title: "RLS probe",
      slug: `rls-probe-${Date.now()}`,
      description: "Percobaan insert oleh anon, seharusnya ditolak.",
    }),
  });
  report(!res.ok, "anon INSERT projects ditolak", `HTTP ${res.status}`);
}

// 3. Publik boleh submit lead.
let insertedLead = null;
{
  const res = await request("leads", {
    method: "POST",
    body: JSON.stringify({ name: "RLS Probe", phone: "080000000000" }),
  });
  if (res.ok) insertedLead = true;
  report(res.ok, "anon INSERT leads diizinkan", `HTTP ${res.status}`);
}

// 4. Publik tidak boleh membaca daftar leads (RLS memfilter → array kosong).
{
  const res = await request("leads?select=id&limit=5");
  const rows = res.ok ? await res.json() : [];
  const blocked = !res.ok || rows.length === 0;
  report(blocked, "anon SELECT leads tidak mengembalikan data", `HTTP ${res.status}, ${rows.length} baris`);
}

if (insertedLead) {
  console.log(`\nCatatan: lead uji coba "RLS Probe" tertinggal di database. Hapus lewat /admin.`);
} else {
  console.log("\nCatatan: tidak ada baris uji coba yang tertinggal.");
}

console.log(failures === 0 ? "\nSemua pemeriksaan RLS lolos." : `\n${failures} pemeriksaan gagal.`);
process.exit(failures === 0 ? 0 : 1);
