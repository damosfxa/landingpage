---
name: voxy-universal-commerce
description: Skill blueprint universal untuk membangun SEGALA JENIS web/aplikasi (Landing Page, Sekolah, SaaS, Ticketing, dll) dengan arsitektur Fullstack yang Modular dan Clean.
---

# Voxy Universal Application Blueprint (Modular Elite Edition)

Skill ini adalah "Pisau Lipat Serbaguna" (Swiss Army Knife) untuk membangun **segala jenis** aplikasi. Sebagai *Fullstack Developer*, tujuan utamamu adalah mengubah masalah kompleks menjadi kode yang bersih, efisien, dan memberikan pengalaman digital yang mulus.

Jangan memaksakan teknologi yang tidak perlu. AI harus membaca kebutuhan proyek (bounty/klien) dan memilih **Tipe Modul** yang tepat.

## 0. Pilih Tipe Arsitektur (AI Harus Paham Konteks)
Sebelum menulis kode, tentukan tipe aplikasi yang sedang dibangun:

- **TIPE 1: Web Statis / Portofolio / Landing Page**
  - *Karakteristik:* Hanya butuh tampilan memukau. Tidak ada user login.
  - *Teknologi:* HANYA gunakan Gemini (Frontend) untuk Lenis, Framer Motion, dan Web3Forms (Kontak). Abaikan Supabase dan Midtrans.
- **TIPE 2: Aplikasi Data / SaaS / Dashboard Sekolah**
  - *Karakteristik:* Butuh login, manajemen data kompleks, tapi tidak ada sistem pembayaran.
  - *Teknologi:* Gunakan Claude (Backend) untuk Supabase Auth, CRUD, dan RBAC. Gemini untuk UI. Abaikan Midtrans.
- **TIPE 3: Transaksional (Toko Online / Ticketing)**
  - *Karakteristik:* Butuh sistem keranjang belanja dan *checkout* pembayaran.
  - *Teknologi:* Aktifkan semua senjata: Supabase, Midtrans Webhook, Zustand Shopping Cart.

---

## 1. RESEP FRONTEND: CUSTOMER EXPERIENCE MEWAH (Zona Gemini 3.1)
*(Berlaku untuk SEMUA Tipe Aplikasi)*

### A. Estetika Bespoke & Sinematik (Anti-Template 100%)
Pelanggan harus kagum pada detik pertama. JANGAN gunakan desain standar/kaku.
- **Scroll & Parallax:** Wajib gunakan `ReactLenis`. Padukan dengan `Framer Motion` untuk efek *Parallax Scaling* saat scroll.
- **Cinematic Clip-Path Reveal:** Untuk gambar/hero, animasikan CSS `clip-path` (contoh: dari `inset(100% 0% 0% 0%)` ke `inset(0%)`) agar elemen terbuka layaknya tirai sinematik.
*(Hukum Mutlak Voxy: Desain harus Bento Grid elegan, warna Off-Colors, Font Serif/Sans-Serif Mahal).*

### B. Keranjang Belanja Bebas-Bug (HANYA UNTUK TIPE 3)
Jika butuh *Shopping Cart*, gunakan **Zustand**.
- **ANTI-HYDRATION ERROR:** Saat memakai `persist` middleware, wajib tambahkan state `hasHydrated: boolean`. Jangan *render* keranjang sebelum komponen *mount* di client untuk mencegah *blank screen* Next.js.

---

## 2. RESEP BACKEND: INFRASTRUKTUR LEVEL BANK (Zona Claude Opus 4.6)
*(Berlaku untuk TIPE 2 & TIPE 3)*

### A. Keamanan & RBAC (Role-Based Access Control)
- **Tabel Roles:** Buat tabel `user_roles` di skema `public` (`user_id`, `role`).
- **Row Level Security (RLS):** Kunci semua operasi CRUD dengan RLS Supabase.
- **Next.js Middleware:** Lindungi rute rahasia (seperti `/admin`) menggunakan middleware SSR yang mengecek *role* user. Set juga *Content Security Policy (CSP)* untuk mencegah XSS.

### B. Transaksi Sempurna (HANYA UNTUK TIPE 3)
- **Gunakan Supabase RPC (Mencegah Rebutan Stok):** Buat fungsi PostgreSQL dengan kunci `FOR UPDATE` pada baris produk. Sistem harus mengunci sisa stok sebelum melempar token Midtrans ke Frontend.
- **Keamanan Webhook Midtrans:** Wajib validasi webhook menggunakan `crypto.createHash('sha512')` dari `order_id + status_code + gross_amount + ServerKey`. Tolak transaksi palsu!
- **Invalidasi Cache Instan:** Gunakan `unstable_cache` untuk loading 0ms. Saat Webhook sukses, panggil `revalidateTag` agar data terbaru (stok) langsung tersinkronisasi.
