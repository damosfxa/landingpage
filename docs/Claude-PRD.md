# Voxy Web Studio - Acceptance Criteria & PRD (Fullstack Upgrade Phase 1)

**Scope:** Membangun fondasi Backend (Database, Authentication, Storage, dan API) menggunakan Supabase untuk mengubah Landing Page statis Voxy menjadi sistem Fullstack yang memiliki Admin Panel (Manajemen Portofolio) dan Database penampung Leads (Prospek Klien). UI/UX Frontend BUKAN tanggung jawab Anda (Claude).

## 1. Glossary / Konvensi
| Term | Meaning |
|---|---|
| Admin | Pemilik Voxy (Mas Rizky) yang memiliki akses penuh via Supabase Auth. |
| Leads | Calon klien biro travel yang mengisi form kontak dari landing page. |
| Project | Studi kasus (Portofolio) website yang pernah dibuat oleh Voxy. |

## 2. Skema Database & RLS (Tugas Utama Anda - Claude)
Buat file migrasi/script SQL untuk Supabase dengan skema berikut:

- **Tabel `projects`** (Untuk Portofolio): 
  - `id` (uuid, PK)
  - `title` (text) - *Contoh: Travel Angkasa*
  - `slug` (text, unique)
  - `description` (text)
  - `image_url` (text)
  - `tech_stack` (text[]) - *Array of strings*
  - `metrics` (jsonb, nullable) - *Contoh: {"loading_speed": "0.5s", "seo_score": 100}*
  - `created_at` (timestamptz)

- **Tabel `leads`** (Untuk Prospek Klien):
  - `id` (uuid, PK)
  - `name` (text)
  - `phone` (text)
  - `agency_name` (text, nullable)
  - `status` (text) - *Default: 'NEW' (Pilihan: NEW, CONTACTED, CLOSED)*
  - `created_at` (timestamptz)

- **Supabase RLS Rules**:
  - `projects`: `SELECT` (Public/Anon). `INSERT, UPDATE, DELETE` (Hanya Authenticated Admin).
  - `leads`: `INSERT` (Public/Anon). `SELECT, UPDATE, DELETE` (Hanya Authenticated Admin).

## 3. Infrastruktur Supabase (Next.js App Router)
- **Instalasi:** Wajib gunakan `@supabase/ssr` dan `@supabase/supabase-js`.
- **Client/Server:** Buat *utility functions* standar `createClient` untuk browser dan server (`utils/supabase/client.ts` & `utils/supabase/server.ts`).
- **Middleware:** Buat `middleware.ts` untuk memblokir akses ke rute `/admin/*` jika *user* belum *login* via Supabase Auth.

## 4. Acceptance Criteria (AC) - CRUD & Auth
**Modul Authentication**
- **AC-1.1**: Terdapat API/Server Action untuk *Login* menggunakan email/password Supabase.
- **AC-1.2**: Jika user non-login mengakses `/admin`, akan di-*redirect* otomatis ke `/login`.

**Modul Admin - Projects (Portofolio)**
- **AC-2.1**: Terdapat Server Action `createProject(data)` yang memvalidasi input dan menyimpan ke tabel `projects`.
- **AC-2.2**: Terdapat fungsi untuk *upload* gambar ke Supabase Storage (bucket `portfolio_images`) sebelum menyimpan data project, dan mereturn `publicURL`.

**Modul Publik - Submit Lead**
- **AC-3.1**: Terdapat Server Action `submitLead(data)` yang dapat dieksekusi oleh publik (tanpa token login) untuk memasukkan data ke tabel `leads`.

## 5. Batasan Kerja (Do Not Cross!)
- **JANGAN** membuat desain antarmuka (UI) yang rumit menggunakan Tailwind/Framer Motion. Cukup buatkan struktur file halamannya (`page.tsx`), Server Actions (`actions.ts`), dan *form* HTML murni tanpa *styling*. Gemini akan mengambil alih *styling* (Frontend) setelah Anda selesai.
- **JANGAN** mengubah `layout.tsx` utama atau mengubah konfigurasi font/warna yang sudah ada.

## 6. Definition of Done (DoD)
1. Tabel `projects` dan `leads` berhasil di-deploy ke Supabase.
2. RLS berhasil dites: Publik bisa mensubmit Lead, tapi tidak bisa membaca daftar Lead. Publik bisa membaca Project, tapi tidak bisa menambahkannya.
3. Middleware proteksi `/admin` berfungsi tanpa *infinite loop* redirect.
4. Server Actions untuk CRUD berfungsi 100% tanpa error database.
