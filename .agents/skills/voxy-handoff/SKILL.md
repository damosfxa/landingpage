---
name: voxy-handoff
description: Panduan serah terima website ke klien setelah selesai dikerjakan, termasuk cara pegang akses/domain yang aman dari sengketa, skrip follow-up kalau klien menghilang setelah bayar DP, cara menangani permintaan fitur tambahan setelah web sudah rilis, dan pengingat perpanjangan domain/hosting. Gunakan skill ini setelah website klien selesai dibangun dan siap diserahkan, atau saat klien tiba-tiba tidak membalas chat.
---

# Voxy Handoff & Post-Launch (Serah Terima & Setelah Rilis)

Skill ini menutup celah yang tidak dicakup `voxy-sales-script` (yang berhenti di momen closing/DP)
dan `voxy-project-checklist` (yang fokus ke teknis sebelum rilis). Ini soal momen serah terima
itu sendiri, dan apa yang terjadi di hubungan dengan klien setelahnya.

---

## 1. Sebelum Serah Terima: Siapa Pegang Apa

Ini keputusan yang **harus** jelas sebelum web dikirim, bukan sesudah ada masalah.

- **Domain:** sebisa mungkin daftarkan **atas nama/akun klien sendiri** (Rizky cuma bantu proses
  pendaftarannya), bukan atas akun Voxy yang cuma "dipinjamkan". Kalau nanti hubungan dengan
  klien berakhir tidak baik, developer yang pegang domain klien itu salah satu sumber reputasi
  buruk paling umum di industri jasa web ("developer sandera domain klien"). Kalau karena alasan
  teknis domain terpaksa didaftarkan di akun Voxy dulu, catat jelas di invoice/chat bahwa itu
  **milik klien** dan wajib ditransfer penuh begitu diminta.
- **Hosting/Vercel/server:** sama prinsipnya — kalau bisa, project di-deploy ke akun Vercel milik
  klien (Rizky cuma jadi kolaborator), bukan akun Vercel pribadi Rizky yang menampung banyak
  proyek klien berbeda. Kalau terpaksa satu akun untuk banyak klien, pastikan klien tahu dan
  setuju.
- **Kode sumber (source code):** kasih akses repo (GitHub/GitLab) ke klien, minimal read-only,
  idealnya klien jadi pemilik repo dan Rizky kolaborator. Klien berhak punya kode yang mereka
  bayar.
- **Kredensial (password admin, dsb.):** jangan dikirim polos di chat WA yang tersimpan
  selamanya di riwayat. Kalau memang harus lewat WA, ingatkan klien untuk ganti password admin
  setelah pertama kali login.

## 2. Paket Serah Terima (Handoff Package)

Kirim satu pesan ringkas berisi semua yang klien butuhkan, jangan dicicil beberapa hari yang
bikin klien bingung mana yang sudah mana yang belum.

> **Template Pesan Serah Terima:**
> "Alhamdulillah Pak/Bu [Nama], website [Nama Bisnis] sudah 100% selesai dan sudah live di
> [domain] 🎉
>
> Ini info lengkap yang perlu Bapak/Ibu simpan:
> 1. **Link website:** [url]
> 2. **Login admin:** [url]/login — email: [email], password sementara: [password]. Mohon
>    langsung diganti password-nya setelah login pertama ya Pak/Bu, demi keamanan.
> 3. **Cara ubah harga/paket sendiri:** [link video singkat atau langkah singkat kalau ada]
> 4. **Domain & hosting:** aktif sampai [tanggal], nanti saya ingatkan lagi sebelum masa aktifnya
>    habis.
> 5. **Garansi:** perbaikan bug gratis sampai [tanggal, 1 tahun dari rilis]. Kalau ada yang error
>    atau aneh, langsung chat saya saja.
>
> Boleh diintip-intip dulu Pak/Bu, kalau ada yang masih kurang pas saya siap bantu revisi sesuai
> jatah paketnya. Terima kasih sudah percaya sama Voxy.dev 🙏"

Setelah kirim ini, **tunggu konfirmasi klien** ("sudah dicoba, oke") sebelum menganggap proyek
resmi selesai. Diam bukan berarti setuju.

## 3. Klien Menghilang (Sebelum atau Sesudah DP)

**Kalau menghilang setelah DP tapi sebelum web selesai** — ini situasi paling riskan karena Anda
sudah mulai kerja tapi belum lunas.

> **Follow-up 1 (3-5 hari tidak ada respons setelah update progress):**
> "Halo Pak/Bu [Nama], mau update progress websitenya — [sebutkan progress]. Ada beberapa hal
> yang perlu saya konfirmasi ke Bapak/Ibu supaya bisa lanjut ke tahap berikutnya: [pertanyaan].
> Ditunggu ya Pak/Bu 🙏"

> **Follow-up 2 (setelah 7-10 hari, masih diam):**
> "Halo Pak/Bu [Nama], permisi menyambung chat kemarin. Pengerjaan websitenya saya pending
> sementara karena menunggu konfirmasi Bapak/Ibu di atas. Kalau ada kendala atau perlu waktu
> lebih, tidak masalah, kabari saja saya kapan bisa dilanjutkan ya Pak/Bu."

> **Follow-up 3 (setelah 2-3 minggu diam total, sebelum benar-benar dianggap batal):**
> "Halo Pak/Bu [Nama], karena sudah cukup lama tidak ada kabar, saya asumsikan proyeknya untuk
> sementara ditunda dari pihak Bapak/Ibu. Tidak masalah sama sekali Pak/Bu. DP yang sudah masuk
> tetap saya simpan sebagai jaminan slot pengerjaan — begitu Bapak/Ibu siap lanjut kapan pun,
> tinggal hubungi saya lagi, progress yang sudah ada tetap saya lanjutkan. Terima kasih Pak/Bu 🙏"

**Catatan buat AI:** jangan pernah menawarkan pengembalian DP secara otomatis di skrip ini —
itu keputusan bisnis Rizky sendiri per kasus, bukan default. Tugas skrip di sini cuma
menjaga komunikasi tetap profesional dan sopan, bukan menentukan kebijakan refund.

## 4. Permintaan Fitur Tambahan Setelah Web Rilis

Beda dari `voxy-sales-script` poin 7 (itu soal nego sebelum deal). Ini soal klien yang **sudah
lunas dan web sudah live**, lalu minta tambahan.

> **Kalau permintaannya kecil (ubah teks, ganti 1 foto, dsb) dan masih dalam masa garansi:**
> "Siap Pak/Bu, ini masuk perbaikan kecil, saya bantu sekarang juga."

> **Kalau permintaannya fitur baru (bukan ada di paket awal):**
> "Untuk yang ini Pak/Bu, ini di luar cakupan paket [nama paket] yang kemarin diambil — masuknya
> fitur tambahan baru. Saya buatkan penawaran terpisah ya Pak/Bu, estimasi biaya dan waktu
> pengerjaannya saya kirim setelah saya cek detail kebutuhannya dulu."

Jangan langsung dikerjakan gratis "karena kasihan" atau "biar hubungan baik" — itu yang bikin
scope creep tanpa akhir dan waktu Rizky habis buat satu klien tanpa bayaran tambahan.

## 5. Pengingat Perpanjangan Domain & Hosting

Set pengingat manual (kalender/notes) di **H-30** sebelum masa aktif domain/hosting klien habis.

> **Template Pengingat:**
> "Halo Pak/Bu [Nama], mau ingetin domain & hosting website [Nama Bisnis] bakal habis masa
> aktifnya tanggal [tanggal]. Supaya websitenya tidak sempat mati/offline, boleh saya bantu
> perpanjang? Biayanya sekitar Rp [nominal] untuk 1 tahun ke depan. Konfirmasi ya Pak/Bu
> sebelum tanggal tersebut 🙏"

Ini bukan cuma soal jaga web tetap hidup — ini juga peluang pemasukan berulang (recurring
revenue) yang sering terlewat sama solo developer yang cuma fokus proyek sekali jalan.

## 6. Fase Evaluasi & Pembelajaran (Dynamic Learning)

**Instruksi Khusus untuk AI**, mengikuti pola yang sama seperti `voxy-sales-script`:
1. Kalau Rizky cerita satu klien akhirnya benar-benar batal/kabur, tanyakan alasannya kalau
   diketahui, lalu update bagian 3 dengan taktik follow-up baru kalau ada pola yang berhasil.
2. Kalau Rizky cerita klien setuju perpanjang domain/hosting, catat itu sebagai bukti template
   di bagian 5 berhasil, dan tanyakan nominal harga yang biasa dipakai supaya template makin
   akurat.
