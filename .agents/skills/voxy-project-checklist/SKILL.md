---
name: voxy-project-checklist
description: Checklist lengkap yang harus diperiksa Rizky setiap kali membangun website untuk klien Voxy, dari sebelum mulai coding sampai setelah rilis. Mencakup fondasi teknis, SEO, keamanan, dan menjaga janji ke klien. Gunakan skill ini di awal proyek klien baru, dan sekali lagi sebelum website diserahkan.
---

# Voxy Client Project Checklist

Skill ini kumpulan pelajaran nyata dari proyek landing page Voxy sendiri — termasuk beberapa
kesalahan yang sempat kejadian di situ dan baru ketahuan belakangan. Tujuannya supaya kesalahan
yang sama tidak terulang di proyek klien.

Skill ini soal **fondasi & proses**, bukan estetika. Untuk urusan desain/vibe, tetap pakai
`voxy-premium-standard`. Untuk QA visual sebelum serah terima, tetap pakai `voxy-design-reviewer`.

---

## 1. Sebelum Mulai Coding

- **Cocokkan janji dengan paket.** Kalau di skrip sales/chat menjanjikan sesuatu ("revisi tanpa
  batas", "garansi X"), pastikan itu **benar-benar sama** dengan yang tertulis di halaman harga
  situs. Klien pegang omongan chat, bukan cuma dokumen resmi — beda janji antara chat dan
  kontrak/pricing itu sumber sengketa paling umum.
- **Minta konten asli klien di awal**, bukan di akhir: nama bisnis, daftar paket/harga, foto,
  nomor WA aktif, alamat (kalau ada toko fisik). Jangan isi placeholder/mockup lalu lupa ganti —
  ini pernah kejadian di situs Voxy sendiri (portofolio masih pakai data contoh yang dilabeli
  jelas "Konsep desain", bukan diaku-aku sebagai kerja klien asli).
- **Tentukan niche dan JANGAN generalisasi tanpa isi yang beda.** Kalau bikin halaman khusus per
  kota/kategori (programmatic SEO), setiap halaman **wajib** punya isi yang benar-benar berbeda,
  bukan cuma ganti nama kota di template yang sama. Situs Voxy sendiri pernah punya 45 halaman
  kota dengan isi 99,6% identik — Google anggap itu *doorway pages* dan bisa menahan seluruh
  domain agar tidak naik peringkat. Kalau tidak ada bahan konten yang benar-benar beda per
  halaman, jangan bikin halaman itu sama sekali; cukup satu halaman utama yang kuat.

## 2. Fondasi Teknis & SEO (wajib per proyek)

- Satu `<h1>` per halaman, isinya relevan dengan halaman itu.
- Metadata (`title`, `description`) unik per halaman, bukan disalin sama persis.
- `sitemap.xml` dan `robots.txt` benar, dan `/admin` atau rute login di-`disallow`.
- Canonical tag ada di setiap halaman, termasuk halaman utama (bukan cuma halaman turunan).
- JSON-LD (structured data) kalau dipakai, isinya **harus sinkron** dengan konten yang benar-benar
  tampil di halaman — jangan sampai beda dari apa yang dibaca pengunjung.
- Semua gambar pakai `next/image` dengan `alt` yang deskriptif, bukan kosong.
- OG image (gambar preview link) pakai file sendiri di `/public`, bukan hotlink ke situs orang
  lain (misalnya Unsplash) — hotlink bisa berhenti kerja kapan saja di luar kendali kita.

## 3. Keamanan Baseline (wajib per proyek, bukan opsional)

- **RLS policy dan SQL `GRANT` harus benar-benar cocok.** Jangan `GRANT ALL` ke role `anon`
  "biar aman" terus mengandalkan RLS doang buat nutupnya — kalau nanti ada yang tidak sengaja
  hapus/ubah satu policy, `GRANT` yang longgar itu langsung jadi pintu terbuka tanpa lapisan
  pertahanan kedua. Beri `GRANT` cuma untuk operasi yang memang dimaksudkan (contoh: publik cuma
  boleh `INSERT` ke tabel lead, bukan `SELECT/UPDATE/DELETE`).
- **Double-check auth di dua tempat**: middleware/proxy untuk redirect awal, DAN validasi ulang
  di dalam setiap server action (`requireAdmin()` atau setara). Middleware bisa berubah aturan
  matcher-nya kapan saja, jadi action tidak boleh percaya begitu saja.
- **Validasi semua input publik pakai Zod** (atau setara): batasi panjang teks, format nomor
  telepon, tipe & ukuran file upload. Jangan percaya apa pun yang datang dari form publik.
- **Pasang honeypot minimal di form publik** yang bisa diisi siapa saja tanpa login (form
  kontak/lead). Field tersembunyi (posisi off-screen + `tabIndex={-1}`, bukan cuma
  `display:none`) yang kalau terisi berarti itu bot, bukan manusia. Gratis, tidak butuh layanan
  pihak ketiga, dan menahan sebagian besar spam otomatis.
- **`.env*` wajib masuk `.gitignore`**, cek `git ls-files | grep env` sebelum push pertama kali
  untuk mastiin tidak ada yang kebawa ke Git.
- **`npm audit` sebelum serah terima**, dan pasang `.github/dependabot.yml` supaya klien (atau
  kita) otomatis dapat notifikasi kalau ada celah keamanan baru di dependency setelah proyek
  jalan lama.
- Header keamanan dasar (`X-Frame-Options`, `X-Content-Type-Options`) kalau ada halaman
  login/form sensitif.

## 4. Sebelum Serah Terima ke Klien

- `npm run build` lolos tanpa error, dan `npm run lint` bersih.
- Coba isi form dari sisi pengunjung publik (bukan cuma dari akun admin) — pastikan data
  benar-benar masuk ke database, bukan cuma tampil "berhasil" di layar.
- Cek tampilan di HP, bukan cuma di layar laptop — banyak klien travel/UMKM pengunjungnya
  mayoritas dari HP.
- Kalau proyek pakai Supabase, jalankan semacam `verify-rls.mjs` (skrip yang mensimulasikan
  akses publik/anon) sebelum serah terima, bukan cuma percaya RLS policy "kelihatannya benar".
- Setelah domain jadi milik klien: bantu daftarkan ke **Google Search Console** (verifikasi
  domain lewat DNS TXT record, submit sitemap, minta indexing halaman utama) dan **Google
  Business Profile** kalau bisnisnya B2C/lokal. Ini gratis dan sering lebih menentukan
  dibanding SEO artikel untuk bisnis baru.

## 5. Soal Menjaga Janji ke Klien (jujur, bukan sekadar sopan)

- **Jangan janjikan hasil SEO instan.** Domain baru itu butuh waktu, biasanya **3-6 bulan**
  minimal sebelum mulai kelihatan hasil organik yang nyata, bisa lebih lama tergantung
  persaingan kata kunci. Ini bukan basa-basi menenangkan klien, ini fakta yang berlaku juga di
  situs Voxy sendiri.
- **Jangan pakai angka yang tidak bisa dibuktikan** ("Skor SEO 100/100", "Loading 0.8 detik")
  kalau itu bukan hasil pengukuran nyata dari proyek yang sedang dikerjakan. Kalau memang belum
  diukur, jangan disebut sebagai fakta.
- **Sarankan klien fokus outreach langsung untuk klien pertama mereka**, jangan cuma
  mengandalkan website+SEO buat dapat pelanggan pertama — itu jalur yang jauh lebih lambat
  dibanding kontak langsung/jaringan pribadi/Google Business Profile.
- Kalau paket punya batas revisi (misal 2x atau 5x), **jangan bilang "revisi tanpa batas"** di
  chat kalau kontraknya tidak begitu. Kalau memang mau kasih fleksibilitas ekstra, itu keputusan
  sadar per kasus, bukan janji default yang diucapkan berulang ke semua klien.

## 6. Setelah Rilis

- Ingatkan klien: hasil SEO butuh waktu, jangan panik kalau minggu pertama sepi.
- Kalau ada notifikasi lead baru (WhatsApp/Telegram/email), pastikan itu benar-benar jalan
  sebelum serah terima — jangan diuji cuma sekali waktu development lalu diasumsikan tetap
  jalan di production.
- Simpan checklist ini tetap relevan: kalau nemu kesalahan baru di proyek mana pun (Voxy sendiri
  atau proyek klien), tambahkan pelajarannya ke sini supaya tidak terulang di proyek berikutnya.
