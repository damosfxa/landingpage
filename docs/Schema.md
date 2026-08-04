# Database Schema

Supabase sudah aktif. **Sumber kebenaran skema adalah file migrasi di
`supabase/migrations/`**, bukan dokumen ini -- kalau keduanya berbeda, migrasi
yang benar.

## 1. Tabel: `leads` (aktif)
Menyimpan data calon klien yang mengisi form di landing page.
- `id` (uuid, primary key, default `gen_random_uuid()`)
- `name` (text, not null)
- `phone` (text, not null) - *nomor WhatsApp*
- `agency_name` (text, nullable)
- `status` (text, check: `NEW` | `CONTACTED` | `CLOSED`) - *default `NEW`*
- `created_at` (timestamptz, default `now()`)

RLS: publik (`anon`) hanya boleh **INSERT**. Membaca, mengubah, dan menghapus
butuh `public.is_admin()`.

## 1b. Tabel: `projects` (aktif)
Portofolio yang tampil di landing page, dikelola lewat `/admin/projects`.
- `id` (uuid, primary key) · `title` · `slug` (unique) · `description`
- `image_url` (nullable) · `tech_stack` (text[]) · `metrics` (jsonb, nullable)
- `created_at` (timestamptz)

RLS: publik boleh **SELECT**; tulis butuh `public.is_admin()`.

## 1c. Tabel: `admins` (aktif)
Daftar user yang benar-benar admin. Tanpa baris di sini, akun Supabase yang
login tidak punya akses tulis apa pun.
- `user_id` (uuid, primary key, referensi `auth.users`)
- `created_at` (timestamptz)

## 2. Tabel: `Travel_Packages` (BELUM ADA, rencana)
Blueprint kalau web ini kelak dipakai sebagai *template* untuk klien biro travel.
Belum ada migrasinya.
- `id` (UUID, Primary Key)
- `package_name` (String, Not Null) - *Contoh: Umroh Reguler 9 Hari*
- `price` (Decimal, Not Null)
- `departure_date` (Date, Not Null)
- `hotel_makkah` (String, Not Null)
- `hotel_madinah` (String, Not Null)
- `availability` (Integer, Default 45) - *Sisa seat*
- `image_url` (String, Nullable)

## 3. Migration Rules
- **Jangan pernah menggunakan `DROP TABLE`** di *production* tanpa *backup*.
- Penambahan kolom baru harus memiliki nilai *default* atau *nullable* agar tidak merusak data lama.
