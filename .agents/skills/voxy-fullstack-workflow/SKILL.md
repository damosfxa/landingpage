---
name: voxy-fullstack-workflow
description: Skill utama SOP (Standard Operating Procedure) untuk mengatur alur kerja AI dalam pengerjaan proyek Voxy. Mengatur pembagian tugas mutlak antara Claude Opus 4.6 (Backend) dan Gemini 3.1 (Frontend & QA).
---

# Voxy Full Stack Development Workflow (Strict AI Handoff)

Skill ini adalah **Undang-Undang Mutlak (SOP)** mengenai bagaimana AI harus bekerja sama dalam membangun aplikasi (Portofolio/Client). Kamu harus sadar sedang berada di fase mana, dan harus berhenti saat tugasmu selesai untuk memberikan ruang pada AI lain.

## 1. Protokol Pembagian Tugas AI (Handoff Protocol)

Proses pengerjaan website dibagi secara tegas. AI **DILARANG KERAS** memborong pekerjaan Front End dan Back End sekaligus. 

### FASE 1: Perencanaan & Inisialisasi (Gemini 3.1)
- **Tugas:** Menyiapkan PRD, desain database, dan inisialisasi framework (`npx create-next-app`, instalasi dependensi).
- **Protokol:** Setelah `package.json` siap dan arsitektur database (Supabase/PostgreSQL) telah dirancang (tapi belum di-coding logika API-nya), hentikan pekerjaan.
- **Pesan Wajib AI:**
  > "Fase setup awal dan arsitektur selesai. Sesuai protokol Voxy, silakan ganti model AI Anda ke **Claude Opus 4.6** untuk mulai mengerjakan bagian Back End (Database, API, Auth, RLS)."

### FASE 2: Pengerjaan Back End (Claude Opus 4.6)
- **Tugas:** Setup Supabase client, Middleware, Route Handlers (API), tabel SQL, Row Level Security (RLS), fungsi upload Storage, integrasi Midtrans.
- **Protokol:** Claude hanya mengurus logika data dan server. Jangan menyentuh desain UI atau animasi Framer Motion. Setelah API dan Database siap digunakan, hentikan pekerjaan.
- **Pesan Wajib AI:**
  > "Sistem Back End dan logika server sudah selesai dikerjakan. Sesuai protokol Voxy, silakan ganti model AI Anda kembali ke **Gemini 3.1** untuk mulai merakit UI/UX (Front End) dan estetika website."

### FASE 3: Pengerjaan Front End & Estetika (Gemini 3.1)
- **Tugas:** Membangun antarmuka pengguna dengan Tailwind CSS, Framer Motion, Lenis Smooth Scroll, dan menghubungkannya dengan API dari Fase 2.
- **Protokol:** Wajib menerapkan prinsip "Anti-Vibe Code" (Desain Mewah Premium). Jika proses perakitan Front End sudah 100% selesai dan bisa dijalankan tanpa error, hentikan pekerjaan coding.
- **Pesan Wajib AI:**
  > "Pengerjaan Front End telah selesai! Sesuai protokol Voxy, jangan langsung diserahkan ke klien. Silakan panggil skill `voxy-design-reviewer` sekarang agar kita bisa menilai apakah desain font-nya elegan, warnanya sudah mewah (Anti-Vibe Code), dan layout-nya tidak murahan."

### FASE 4: Quality Assurance & Review
- **Tugas:** Memanggil skill `voxy-design-reviewer` untuk melakukan evaluasi ketat terhadap hasil akhir (Vibe, Layout, Font).
- **Protokol:** Lakukan revisi berdasarkan hasil *review* tersebut sampai 100% sempurna berkelas Premium Studio.

---

## 2. Peringatan Mutlak (100% Anti-Vibe Code)

Saat mengerjakan UI, ingatlah:
- **Jangan pernah menggunakan Font Koding (Monospace).**
- **Jangan menggunakan card standar atau layout murahan ala admin template.**
- **Jangan gunakan warna neon, `#000` (hitam murni), atau `#FFF` (putih murni).**
- Kita adalah **Premium Studio**. Pekerjaan Front End harus melambangkan *Quiet Luxury*. (Lihat detailnya di skill `voxy-portfolio-stack`).
