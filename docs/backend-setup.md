# Backend Setup (Supabase) — Phase 1

## 1. Terapkan migrasi

Belum diterapkan otomatis karena butuh kredensial database (bukan anon key).
Pilih salah satu:

**Lewat Supabase Dashboard (paling cepat)**
Buka project → **SQL Editor** → tempel isi
[`supabase/migrations/20260724000000_init_projects_leads.sql`](../supabase/migrations/20260724000000_init_projects_leads.sql) → **Run**.

**Lewat Supabase CLI**

```bash
npx supabase link --project-ref xfznxfyrzunkjmjrmlau && npx supabase db push
```

Migrasi ini membuat tabel `projects` + `leads`, mengaktifkan RLS beserta
policy-nya, dan membuat bucket storage publik `portfolio_images`.

## 2. Buat akun admin

Supabase Dashboard → **Authentication** → **Users** → **Add user** →
isi email & password, centang *Auto Confirm User*. Belum ada rute self-signup,
jadi ini satu-satunya cara membuat admin (disengaja).

## 3. Verifikasi RLS

```bash
npm run verify:rls
```

Skrip ini memakai anon key dan memastikan: publik **boleh** membaca `projects`
dan submit `leads`, tapi **tidak boleh** menulis `projects` atau membaca daftar
`leads`. Skrip menyisakan satu baris lead uji coba — hapus lewat `/admin`.

## Struktur

| Path | Isi |
|---|---|
| `src/utils/supabase/client.ts` | Client Supabase untuk browser |
| `src/utils/supabase/server.ts` | Client untuk Server Component / Action |
| `src/utils/supabase/proxy.ts` | Refresh session + proteksi `/admin` |
| `src/proxy.ts` | Entry proxy (Next.js 16 — dulu `middleware.ts`) |
| `src/app/login/actions.ts` | `login`, `logout` |
| `src/app/admin/actions.ts` | CRUD project, upload gambar, kelola lead |
| `src/lib/actions/leads.ts` | `submitLead` (publik, tanpa login) |
| `src/components/lead-form.tsx` | Form lead tanpa styling, siap dipasang |

## Catatan

- Di Next.js 16 `middleware.ts` sudah diganti `proxy.ts` (fungsi diekspor
  bernama `proxy`). Matcher sengaja dibatasi ke `/admin/*` dan `/login` supaya
  180 halaman SEO di `/layanan/*` tetap ter-prerender statis.
- Setiap Server Action admin memanggil ulang `requireAdmin()`. Server Action
  adalah POST ke rute tempat ia dipakai, jadi proxy saja tidak cukup sebagai
  batas otorisasi.
