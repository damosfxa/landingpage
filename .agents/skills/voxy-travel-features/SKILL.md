---
name: voxy-travel-features
description: Skill berisi panduan teknis (coding recipes) untuk membangun fitur-fitur paket website travel Voxy (WhatsApp, Google Maps, Admin Panel Supabase, Animasi, Smooth Scroll, Midtrans). Gunakan saat mendevelop project klien.
---

# Voxy Travel Features Implementation Guide

Skill ini adalah "Buku Resep" rahasia untuk Voxy.dev. Saat Anda (Rizky) mendapatkan klien pembuatan website travel, gunakan panduan ini untuk membangun fitur-fitur yang dijanjikan di paket Essential, Professional, maupun Enterprise menggunakan stack **Next.js + Tailwind + Framer Motion + Supabase**.

---

## 📦 ESSENTIAL PLAN FEATURES

### 1. Tombol WhatsApp Terintegrasi
Jangan buat tombol manual. Selalu gunakan komponen *Floating WA* di kanan bawah.
**Resep:**
Buat komponen `FloatingWA` dengan `fixed bottom-8 right-8 z-50`. Gunakan SVG ikon WhatsApp. 
Format link WA: `https://wa.me/628XXX?text=Halo%20saya%20tertarik%20dengan%20paket%20travel%20Anda`.

### 2. Formulir Kontak Tanpa Backend (Web3Forms)
Untuk paket murah, hindari membuat sistem *database* khusus untuk pesan masuk.
**Resep:**
Gunakan **Web3Forms** (https://web3forms.com/). Cukup buat form HTML standar `<form action="https://api.web3forms.com/submit" method="POST">`, masukkan Access Key, dan pesan klien akan langsung terkirim ke email bos travel secara gratis tanpa repot membuat *backend*.

### 3. Integrasi Google Maps
**Resep:**
Minta *link* Google Maps dari lokasi kantor travel klien. Gunakan fitur "Share -> Embed a map".
Ambil tag `<iframe>` dan pasang di halaman Kontak dengan class Tailwind: `w-full h-64 md:h-96 rounded-xl border-0`.

---

## 🚀 PROFESSIONAL PLAN FEATURES

### 1. Desain Premium dengan Animasi (Framer Motion)
Website harga 3 Juta tidak boleh terlihat kaku.
**Resep:**
Selalu bungkus elemen utama dengan `<motion.div>` dari `framer-motion`.
Gunakan efek *Fade-in Up*:
`initial={{ opacity: 0, y: 20 }}`
`whileInView={{ opacity: 1, y: 0 }}`
`viewport={{ once: true }}`

### 2. Navigasi Mulus (Smooth Scroll Lenis)
Wajib dipasang agar membedakan website Voxy dari website WordPress murahan.
**Resep:**
Install `@studio-freight/react-lenis`. Buat `SmoothScrollProvider` yang membungkus `children` di `layout.tsx`.

### 3. Sistem Admin: Kelola Harga & Paket Sendiri
Ini adalah fitur bintang untuk membenarkan harga 3 Juta.
**Resep Supabase:**
1. Buat tabel `travel_packages` di Supabase (kolom: id, title, price, description, image_url, created_at).
2. Gunakan **Supabase Auth** untuk halaman `/admin/login`.
3. Buat halaman `/admin/dashboard` yang melakukan operasi CRUD (Create, Read, Update, Delete) ke tabel `travel_packages`.
4. Di *landing page* utama, *fetch* data dari Supabase ini untuk menampilkan paket-paket promo.

### 4. Optimasi SEO Dasar
**Resep:**
Di `layout.tsx` Next.js, pastikan untuk mengisi *Metadata* secara dinamis. Masukkan *Title*, *Description*, dan *OpenGraph* (gambar yang muncul saat link di-share ke WA) sesuai dengan nama *brand* travel klien.

---

## 👑 ENTERPRISE PLAN FEATURES

### 1. Sistem Booking Online Terintegrasi
Klien bisa langsung memesan paket umroh dari website.
**Resep:**
Buat tabel `bookings` di Supabase (kolom: nama, email, no_wa, package_id, tanggal_keberangkatan, status).
Buat form di halaman detail paket yang langsung melakukan `supabase.from('bookings').insert()`.

### 2. Pembayaran Otomatis (Payment Gateway)
Tidak perlu transfer manual lewat WA.
**Resep:**
Gunakan **Midtrans** (Snap API). 
Saat data `bookings` berhasil masuk ke Supabase, panggil *Route API* Next.js (`/api/tokenize`) yang berkomunikasi dengan Midtrans untuk menghasilkan *Token Transaksi*. Tampilkan *popup* Midtrans agar jamaah bisa bayar pakai QRIS, Virtual Account, atau Kartu Kredit. Update status `bookings` menjadi 'PAID' via *Webhook* Midtrans.

---

**Aturan Emas Saat Mengerjakan Proyek:**
Jika Rizky meminta Anda (Claude/Antigravity) membuatkan salah satu fitur di atas, **selalu prioritaskan kode yang paling simpel, modular, dan bersih** menggunakan Tailwind CSS dan TypeScript.
