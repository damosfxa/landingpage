---
name: voxy-travel-features
description: Skill berisi panduan teknis (coding recipes) & PRD untuk membangun paket website travel Voxy (WhatsApp, Google Maps, Admin Panel Supabase, Midtrans). 
---

# Voxy Travel Features Implementation Guide

Panduan ini mengatur pembuatan website Biro Travel/Umroh menggunakan standar Voxy (Next.js + Tailwind + Supabase). Panduan ini telah diperbarui untuk mengakomodasi integrasi fitur tingkat lanjut (seperti Midtrans) secara spesifik.

## 0. Protokol AI Handoff (Workflow)
Penting! Kenali siapa dirimu saat ini:
- Jika kamu **Claude Opus 4.6**, fokus pada Pembuatan Skema Database Supabase (`travel_packages`, `bookings`, RLS) dan *Setup Midtrans Route API* (Bagian 3). Jika sudah selesai, suruh user beralih ke Gemini 3.1.
- Jika kamu **Gemini 3.1**, fokus pada UI/UX, Lenis Smooth Scroll, integrasi Web3Forms, Framer Motion, dan merakit antarmuka popup Midtrans (Bagian 2 & PRD). Jika UI/Desain selesai, suruh user memanggil skill `voxy-design-reviewer`.

---

## 1. STANDARD PRD: STRUKTUR HALAMAN WEB TRAVEL

Struktur standar untuk *Landing Page* biro travel (misalnya Al-Hijrah Travel):
1. **Hero Section:** Judul utama penarik perhatian (misal: "Ibadah Khusyuk, Fasilitas Nyaman"), CTA "Lihat Paket Umroh", *background* premium Ka'bah/Mekkah beresolusi tinggi.
2. **Why Choose Us:** Poin *trust* (Berizin Kemenag, Pembimbing Tersertifikasi).
3. **Katalog Paket:** Tampilkan minimal 3 paket menggunakan data dari Supabase (misal: Umroh Reguler, Umroh Plus Turki). Tampilkan harga, durasi, dan CTA "Pesan Sekarang".
4. **Testimoni:** Carousel *review* jamaah. Sangat krusial untuk *trust*.
5. **Galeri & FAQ:** Foto jamaah di Tanah Suci dan tanya-jawab operasional.
6. **Footer & Floating WA:** Akses kontak Web3Forms dan *Floating Icon WhatsApp* di sudut layar (wajib).
*(Catatan: Terapkan prinsip "Anti-Vibe Code". Gunakan font Serif berkelas untuk judul dan hindari komponen standar murahan).*

---

## 2. Resep Frontend (Untuk Gemini 3.1)

### A. WhatsApp & Web3Forms (Essential Plan)
- **Floating WA:** Buat komponen *fixed* di `bottom-8 right-8 z-50` menggunakan SVG icon.
- **Web3Forms:** Gunakan *fetch API* ke endpoint Web3Forms untuk form *leads* cepat tanpa backend.

### B. Lenis & Framer Motion (Professional Plan)
- **Smooth Scroll:** Wajib menggunakan `@studio-freight/react-lenis`.
- **Reveal Animasi:** Gunakan `framer-motion` dengan *Fade-in Up* (`opacity: 0, y: 20`) pada setiap section agar website harga 3 Juta tidak terlihat kaku.

---

## 3. Resep Backend (Untuk Claude Opus 4.6)

### A. Supabase Database Schema
Skema dasar yang **WAJIB** dibuat:
1. **Tabel `travel_packages`**: `id` (uuid), `title` (text), `price` (numeric), `description` (text), `image_url` (text), `created_at` (timestamptz).
2. **Tabel `bookings`**: `id` (uuid), `package_id` (uuid, fk), `customer_name` (text), `email` (text), `phone` (text), `status` (text: 'PENDING', 'PAID'), `created_at` (timestamptz).
- **RLS Policy:** `travel_packages` bebas dibaca (*public SELECT*). Transaksi insert ke `bookings` bisa dilakukan oleh anonim, tapi *update/delete* hanya oleh *Service Role* / Admin. 

### B. Integrasi Midtrans (Enterprise Plan)
Panduan spesifik agar sistem *Booking Online* berfungsi nyata:
1. **Pendaftaran Booking:** Saat user *submit* form di UI, lakukan `supabase.from('bookings').insert()`.
2. **Route API Tokenize (`/api/tokenize`):**
   Buat API Route Next.js yang menerima `booking_id`, `price`, dan data pelanggan.
   Panggil API Midtrans (Snap) dari sisi server (gunakan Server Key Midtrans).
   Kembalikan `token` transaksi ke Frontend.
3. **Trigger Popup (Frontend Handoff):**
   Berikan instruksi ke Gemini bahwa pada bagian Frontend, ia harus me-load script Midtrans (`https://app.sandbox.midtrans.com/snap/snap.js`) dan memanggil `window.snap.pay(token)`.
4. **Webhook:** Buat endpoint `/api/webhook/midtrans` untuk menerima notifikasi dari server Midtrans dan mengubah status tabel `bookings` di Supabase menjadi `'PAID'`.
