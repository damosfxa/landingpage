---
name: voxy-fullstack-workflow
description: Skill khusus untuk mengatur alur kerja (workflow) pembuatan aplikasi Full Stack. Mengatur pembagian tugas model AI (Gemini untuk Frontend, Claude Opus untuk Backend) dan menetapkan Tech Stack standar portofolio Voxy berdasarkan diagram gambar.
---

# Voxy Full Stack Development Workflow

Skill ini adalah pedoman mutlak (SOP) ketika *user* membuat proyek aplikasi baru dari awal hingga akhir, yang akan dijadikan sebagai portofolio Voxy.

## 1. Standar Teknologi Portofolio Voxy (Wajib)
Berdasarkan diagram arsitektur standar, semua proyek aplikasi portofolio Voxy harus dibangun dengan memilih teknologi dari daftar berikut ini:

### 🎨 Front End (UI/UX)
- **Language:** HTML5, CSS3, JavaScript
- **Framework:** React, Vue, Angular
- **Library:** Bootstrap, Tailwind, jQuery

### ⚙️ Back End (Server & Logic)
- **Language:** Node.js, Ruby, Python, PHP, Java
- **Database:** MySQL, PostgreSQL, MongoDB
- **API:** REST API, GraphQL

---

## 2. Protokol Penggunaan Model AI (SANGAT PENTING!)
*User* memiliki preferensi spesifik untuk mendelegasikan tugas kepada model AI yang berbeda agar hasilnya maksimal. AI yang sedang aktif **WAJIB** mengikuti aturan *Stop & Switch* berikut ini:

### A. Fase Instalasi & Setup Awal
- **Model yang Bertugas:** Gemini (Gemini 3.1)
- **Instruksi:** AI melakukan inisiasi proyek (seperti `npm create`, instalasi dependensi, dsb). 
- **Tindakan Wajib:** Setelah proses *install* selesai, AI **HARUS BERHENTI** bekerja. AI wajib memberikan laporan dan menyuruh *user* untuk mengganti model sesuai fase berikutnya.

### B. Fase Pengerjaan Back End
- **Model yang Bertugas:** Claude Opus (Claude Opus 4.6)
- **Instruksi untuk AI saat ini:** Jika langkah selanjutnya adalah membangun *database*, API, atau logika server, AI harus berhenti dan memberikan pesan ke *user*: 
  > *"Tahap sebelumnya selesai. Sesuai prosedur Voxy, silakan ganti model AI Anda ke **Claude Opus 4.6** untuk mulai mengerjakan bagian Back End."*

### C. Fase Pengerjaan Front End
- **Model yang Bertugas:** Gemini (Gemini 3.1)
- **Instruksi untuk AI saat ini:** Jika langkah selanjutnya adalah membangun antarmuka (UI/UX), merangkai komponen React/Vue, atau *styling*, AI harus berhenti dan memberikan pesan ke *user*:
  > *"Pekerjaan sistem selesai. Sesuai prosedur Voxy, silakan ganti model AI Anda ke **Gemini 3.1** untuk mulai mengerjakan bagian Front End."*

**Peringatan untuk AI:** Jangan pernah "memborong" pekerjaan *Full Stack* sendirian. Anda harus disiplin memberikan kesempatan kepada *user* untuk mengganti "otak" AI-nya sesuai zona kerja masing-masing!
