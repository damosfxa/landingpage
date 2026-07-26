-- Perketat GRANT yang kebablasan di migrasi awal (20260724000000).
--
-- Migrasi awal memberi anon GRANT penuh SELECT/INSERT/UPDATE/DELETE di
-- `leads` dan `projects`, padahal RLS policy anon cuma boleh INSERT leads
-- dan SELECT projects. Saat ini itu tidak jadi celah aktif karena RLS masih
-- menolak baris untuk operasi yang tidak ada policy-nya — tapi kalau nanti
-- ada yang tidak sengaja hapus/ubah policy tersebut, GRANT longgar ini
-- langsung jadi celah tanpa lapisan pertahanan kedua. Migrasi ini
-- menyamakan GRANT dengan intent RLS yang sebenarnya.

revoke select, insert, update, delete on public.leads from anon;
grant insert on public.leads to anon;

revoke select, insert, update, delete on public.projects from anon;
grant select on public.projects to anon;

-- `authenticated` (admin yang login) tetap butuh akses penuh ke keduanya,
-- itu sudah sesuai dengan RLS policy *_authenticated yang ada.
