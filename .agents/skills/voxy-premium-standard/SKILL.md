---
name: voxy-premium-standard
description: Standar mutlak pengembangan web Voxy: Anti-AI Vibe, Aestetika Premium (Warna, Layout, Font), dan SEO level dewa (Next.js 100/100).
---

# Voxy Premium & SEO Standard

Skill ini adalah pedoman mutlak untuk desain, *copywriting*, dan arsitektur SEO pada setiap *website* (baik proyek internal maupun pesanan klien) yang dikerjakan oleh AI Voxy. Tujuannya adalah menjadikan *website* sebagai "Mesin Sales" kelas atas.

## 1. Aturan Anti-"AI Vibe" (Human-Touch)
Klien B2B membayar mahal untuk desain yang dikerjakan manusia, bukan *template* robot.
- **NO EMOJI:** Dilarang keras menggunakan emoji standar bawaan *keyboard* (seperti 🚀, 🔥, 💼) di dalam desain *website* final. Anda **WAJIB** menggantinya dengan *icon* profesional dari *library* seperti `lucide-react` atau SVG kustom yang sewarna dengan tema.
- **NO LOREM IPSUM:** Jangan pernah menggunakan teks "Lorem Ipsum" atau teks asal-asalan. Hasilkan draf *copywriting* awal yang masuk akal dan relevan dengan industri klien (menggunakan bahasa Indonesia yang formal, persuasif, dan elegan).

## 2. Aestetika Premium (Desain Mewah)
- **Palet Warna:** Dilarang menggunakan warna HTML dasar (`red`, `blue`, `green`). Selalu gunakan warna *hex/hsl* yang dikurasi (contoh: *Slate-900* untuk *dark mode*, aksen *Neon Blue*, atau *Rose Gold* untuk travel premium).
- **Tipografi:** Jangan gunakan *font default browser*. Selalu pasang *font* modern dari Google Fonts (Rekomendasi: `Inter`, `Plus Jakarta Sans`, atau `Outfit`).
- **Layout & Interaksi:** Harus *Mobile-First*. Wajib mengimplementasikan *micro-interactions* (seperti efek *hover* yang mulus, *glassmorphism* transparan pada *navbar*, atau animasi *fade-in* ringan menggunakan Framer Motion / Tailwind).

## 3. SEO Gacor (Mesin Pencari & Konversi)
*Website* harus dirancang agar "Disayang Google" dan bisa menyaingi atau menghancurkan kompetitor yang memakai WordPress.
- **Next.js Metadata:** Setiap halaman wajib memiliki `metadata` (Judul dan Deskripsi) yang disuntikkan secara dinamis di `layout.tsx` atau `page.tsx`.
- **Open Graph (OG Tags):** Wajib dikonfigurasi agar *link* yang dibagikan di WhatsApp/Facebook menampilkan *thumbnail* dan judul yang cantik.
- **Semantic HTML:** Struktur kode tidak boleh hanya berisi tumpukan `<div>`. Gunakan tag spesifik seperti `<header>`, `<main>`, `<section>`, dan `<article>`. Pastikan hanya ada satu `<h1>` per halaman.
- **Skor Lighthouse 100/100:** Semua gambar WAJIB menggunakan komponen `<Image>` bawaan Next.js (`next/image`) agar formatnya otomatis menjadi WebP dan *loading*-nya secepat kilat.

## 4. Manajemen Aset Visual
Jika *user* / klien mengirimkan file foto asli:
- Pindahkan foto tersebut ke dalam folder `public/images/`.
- Panggil foto tersebut di komponen dengan *path* absolut seperti `/images/nama-foto.jpg`.
- Pastikan rasio gambar tidak gepeng (*gunakan object-fit: cover*).
