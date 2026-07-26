# Voxy Web Studio — Landing Page

Landing page dan dashboard admin untuk Voxy Web Studio, jasa pembuatan website
tour & travel. Dibangun dengan Next.js (App Router) dan Supabase.

## Menjalankan secara lokal

```bash
npm install
npm run dev
```

Buka http://localhost:3000.

## Environment variables

Salin `.env.example` menjadi `.env.local`, lalu isi:

| Variable | Wajib | Keterangan |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | ya | URL project Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ya | Anon key Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | ya | Dipakai script verifikasi RLS |
| `NEXT_PUBLIC_GA_ID` | tidak | Google Analytics 4; tag hanya dimuat bila diisi |
| `TELEGRAM_BOT_TOKEN` | tidak | Notifikasi lead baru; dilewati bila kosong |
| `TELEGRAM_CHAT_ID` | tidak | Pasangan dari `TELEGRAM_BOT_TOKEN` |

## Struktur

- `src/app/page.tsx` — landing page utama
- `src/app/layanan/[niche]/[kota]/` — halaman SEO per kota, di-generate dari `src/lib/data/seo-data.ts`
- `src/app/admin/` — dashboard lead dan portofolio (butuh login)
- `src/components/sections/` — section landing page
- `src/lib/data/faq.ts` — sumber tunggal FAQ, dipakai halaman dan JSON-LD
- `supabase/migrations/` — skema tabel `projects` dan `leads` beserta RLS

## Perintah

```bash
npm run dev
npm run build
npm run lint
npm run verify:rls
```
