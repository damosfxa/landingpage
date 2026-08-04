# Backend Setup (Supabase): Phase 1

## 1. Terapkan migrasi

Belum diterapkan otomatis karena butuh kredensial database (bukan anon key).
Pilih salah satu:

**Lewat Supabase Dashboard (paling cepat)**
Buka project → **SQL Editor** → tempel isi
[`supabase/migrations/20260724000000_init_projects_leads.sql`](../supabase/migrations/20260724000000_init_projects_leads.sql) → **Run**.

**Lewat Supabase CLI**

```bash
npx supabase link --project-ref <project-ref-anda> && npx supabase db push
```

Terapkan **berurutan sesuai nama file**, karena migrasi berikutnya memperketat
apa yang dibuat migrasi sebelumnya:

| Migrasi | Isi |
|---|---|
| `20260724000000_init_projects_leads.sql` | Tabel `projects` + `leads`, RLS dasar, bucket `portfolio_images` |
| `20260726120000_tighten_anon_grants.sql` | Samakan GRANT `anon` dengan intent RLS |
| `20260804000000_admin_role_rls.sql` | Tabel `admins` + `is_admin()`, ganti policy `authenticated` jadi khusus admin |

Migrasi terakhir menyalin semua user yang sudah ada ke tabel `admins`, jadi tidak
ada jeda terkunci setelah diterapkan. Periksa dulu `select id, email from auth.users;`
— kalau ada akun yang tidak Anda kenali, hapus sebelum menjalankannya.

## 2. Matikan pendaftaran mandiri

**Lakukan ini sebelum apa pun.** Dashboard → **Authentication** → **Providers** →
**Email** → matikan *Allow new users to sign up*.

Aplikasi ini memang tidak punya rute signup, tapi itu tidak menutup apa pun:
`POST /auth/v1/signup` di Supabase bisa dipanggil langsung dengan anon key, dan
anon key bersifat publik (dipakai di browser). Selama setelan itu aktif, siapa pun
bisa membuat akun sendiri di project ini.

## 3. Buat akun admin

Dashboard → **Authentication** → **Users** → **Add user** → isi email & password,
centang *Auto Confirm User*.

Punya akun saja tidak memberi hak admin. Sejak migrasi `20260804000000_admin_role_rls.sql`,
semua policy tulis mensyaratkan `public.is_admin()`, yang mengecek keanggotaan di
tabel `public.admins`. Daftarkan user barunya lewat SQL Editor:

```sql
insert into public.admins (user_id)
select id from auth.users where email = 'email-admin@contoh.com';
```

Dua lapisan ini sengaja dipisah: setelan dashboard bisa tidak sengaja dinyalakan
lagi, sedangkan tabel `admins` tetap menahan akses meski itu terjadi.

## 4. Verifikasi RLS

```bash
npm run verify:rls
```

Skrip ini memakai anon key dan memastikan: publik **boleh** membaca `projects`
dan submit `leads`, tapi **tidak boleh** menulis `projects`, membaca daftar
`leads`, atau mendaftarkan akun sendiri. Kalau signup ternyata masih terbuka,
skrip lanjut membuktikan bahwa akun baru itu pun tetap tidak bisa membaca `leads`
— itulah gunanya `is_admin()`.

Skrip menyisakan baris/akun uji coba dan menyebutkannya di akhir output. Bersihkan
sesuai daftar itu.

## Struktur

| Path | Isi |
|---|---|
| `src/utils/supabase/client.ts` | Client Supabase untuk browser |
| `src/utils/supabase/server.ts` | Client untuk Server Component / Action |
| `src/utils/supabase/proxy.ts` | Refresh session + proteksi `/admin` |
| `src/proxy.ts` | Entry proxy (Next.js 16, dulu `middleware.ts`) |
| `src/app/login/actions.ts` | `login`, `logout` |
| `src/app/admin/actions.ts` | CRUD project, upload gambar, kelola lead |
| `src/lib/actions/leads.ts` | `submitLead` (publik, tanpa login) |
| `src/components/lead-form.tsx` | Form lead tanpa styling, siap dipasang |

## Catatan

- Di Next.js 16 `middleware.ts` sudah diganti `proxy.ts` (fungsi diekspor
  bernama `proxy`). Matcher sengaja dibatasi ke `/admin/*` dan `/login` supaya
  halaman publik tidak ikut jadi dinamis. (Rute `/layanan/*` yang dulu disebut di
  sini sudah dihapus di commit `51fbe61` dan kini di-301 ke `/`.)
- Setiap Server Action admin memanggil ulang `requireAdmin()`. Server Action
  adalah POST ke rute tempat ia dipakai, jadi proxy saja tidak cukup sebagai
  batas otorisasi.
- `requireAdmin()` hanya memastikan ada sesi login; yang menentukan boleh-tidaknya
  menulis adalah RLS lewat `is_admin()`. Dua-duanya perlu: yang pertama memberi
  redirect yang rapi ke `/login`, yang kedua menahan akses meski pengecekan di
  aplikasi terlewat.
