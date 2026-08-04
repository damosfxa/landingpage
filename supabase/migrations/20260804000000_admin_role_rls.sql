-- Batasi akses tulis ke admin sungguhan, bukan sekadar "siapa pun yang login".
--
-- Migrasi awal (20260724000000) memakai `to authenticated ... using (true)` untuk
-- semua policy tulis. Asumsinya: satu-satunya cara jadi `authenticated` adalah
-- dibuatkan manual lewat dashboard, karena aplikasi tidak punya rute signup.
--
-- Asumsi itu hanya berlaku untuk aplikasi Next-nya. Endpoint `POST /auth/v1/signup`
-- di Supabase tetap bisa dipanggil langsung memakai anon key -- dan anon key itu
-- publik (dipakai di browser, terlihat di bundle). Selama "Allow new users to sign
-- up" masih aktif di dashboard, siapa pun bisa mendaftar sendiri lalu otomatis
-- memenuhi syarat `to authenticated`: membaca seluruh tabel `leads` (nama + nomor
-- WhatsApp calon klien) dan menghapus/mengubah seluruh `projects` serta storage.
--
-- Migrasi ini memindahkan otorisasi dari "punya sesi" ke "terdaftar sebagai admin",
-- sehingga setelan dashboard tidak lagi jadi satu-satunya lapisan pertahanan.

-- ---------------------------------------------------------------------------
-- Daftar admin
-- ---------------------------------------------------------------------------
create table if not exists public.admins (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.admins enable row level security;

-- Tanpa policy sama sekali: RLS menolak semua akses langsung. Tabel ini hanya
-- dibaca lewat `is_admin()` yang SECURITY DEFINER, jadi tidak ada yang perlu
-- (atau boleh) menanyakannya lewat PostgREST.
revoke all on public.admins from anon, authenticated;

-- Seed dari user yang sudah ada.
--
-- Ini disengaja dan aman: sebelum migrasi ini, SETIAP user yang ada sudah punya
-- akses admin penuh lewat `to authenticated using (true)`. Menyalin mereka ke
-- `admins` mempertahankan kondisi saat ini apa adanya, sambil menutup pintu bagi
-- pendaftar baru. Efeknya: tidak ada jeda terkunci setelah migrasi diterapkan.
--
-- PERIKSA DULU sebelum menjalankan migrasi ini:
--   select id, email, created_at from auth.users order by created_at;
-- Kalau ada akun yang tidak Anda kenali, itu berarti celah di atas sudah dipakai
-- orang. Hapus akun tersebut lebih dulu, jangan biarkan ikut ter-seed jadi admin.
insert into public.admins (user_id)
select id from auth.users
on conflict (user_id) do nothing;

-- ---------------------------------------------------------------------------
-- Helper
-- ---------------------------------------------------------------------------
-- SECURITY DEFINER supaya fungsi ini bisa membaca `public.admins` meski RLS
-- tabel itu menolak semua akses langsung. `search_path = ''` mencegah pembajakan
-- lewat schema lain, jadi semua nama ditulis lengkap.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.admins where user_id = (select auth.uid())
  );
$$;

revoke all on function public.is_admin() from public, anon;
grant execute on function public.is_admin() to authenticated;

-- ---------------------------------------------------------------------------
-- projects: baca publik tetap, tulis hanya admin
-- ---------------------------------------------------------------------------
drop policy if exists "projects_insert_authenticated" on public.projects;
create policy "projects_insert_admin"
  on public.projects for insert
  to authenticated
  with check (public.is_admin());

drop policy if exists "projects_update_authenticated" on public.projects;
create policy "projects_update_admin"
  on public.projects for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "projects_delete_authenticated" on public.projects;
create policy "projects_delete_admin"
  on public.projects for delete
  to authenticated
  using (public.is_admin());

-- ---------------------------------------------------------------------------
-- leads: insert publik tetap (form landing page), sisanya hanya admin
-- ---------------------------------------------------------------------------
drop policy if exists "leads_select_authenticated" on public.leads;
create policy "leads_select_admin"
  on public.leads for select
  to authenticated
  using (public.is_admin());

drop policy if exists "leads_update_authenticated" on public.leads;
create policy "leads_update_admin"
  on public.leads for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "leads_delete_authenticated" on public.leads;
create policy "leads_delete_admin"
  on public.leads for delete
  to authenticated
  using (public.is_admin());

-- ---------------------------------------------------------------------------
-- storage: baca publik tetap (gambar portofolio tampil di landing page),
-- tulis hanya admin
-- ---------------------------------------------------------------------------
drop policy if exists "portfolio_images_insert_authenticated" on storage.objects;
create policy "portfolio_images_insert_admin"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'portfolio_images' and public.is_admin());

drop policy if exists "portfolio_images_update_authenticated" on storage.objects;
create policy "portfolio_images_update_admin"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'portfolio_images' and public.is_admin())
  with check (bucket_id = 'portfolio_images' and public.is_admin());

drop policy if exists "portfolio_images_delete_authenticated" on storage.objects;
create policy "portfolio_images_delete_admin"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'portfolio_images' and public.is_admin());

-- ---------------------------------------------------------------------------
-- Menambah admin baru di kemudian hari
-- ---------------------------------------------------------------------------
-- Buat user lewat Dashboard > Authentication > Users > Add user, lalu:
--   insert into public.admins (user_id)
--   select id from auth.users where email = 'email-admin-baru@contoh.com';
--
-- Mencabut akses admin tanpa menghapus akunnya:
--   delete from public.admins
--   where user_id = (select id from auth.users where email = 'email@contoh.com');
