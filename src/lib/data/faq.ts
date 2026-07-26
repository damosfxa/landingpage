export type FaqItem = {
  q: string
  a: string
}

/**
 * Sumber tunggal untuk FAQ: dipakai oleh FAQSection dan JSON-LD FAQPage,
 * supaya isi yang tampil di halaman selalu sama dengan yang dibaca Google.
 */
export const faqs: FaqItem[] = [
  {
    q: "Berapa lama proses pengerjaan website?",
    a: "Paket Essential biasanya selesai dalam 3-5 hari kerja, dan paket Professional sekitar 7-14 hari kerja. Hitungannya dimulai setelah materi dari Anda (teks profil, foto, dan daftar paket) kami terima lengkap.",
  },
  {
    q: "Apakah saya bisa mengubah harga paket travel sendiri nanti?",
    a: "Bisa, mulai dari paket Professional. Anda mendapat halaman admin terpisah untuk memperbarui harga, jadwal keberangkatan, dan ketersediaan paket kapan saja tanpa perlu menghubungi kami.",
  },
  {
    q: "Apakah harga sudah termasuk domain dan server (hosting)?",
    a: "Ya. Semua paket sudah termasuk pendaftaran domain (.com/.id) dan hosting untuk tahun pertama. Biaya perpanjangan tahun berikutnya kami sampaikan di awal, tanpa markup tersembunyi.",
  },
  {
    q: "Apakah ada garansi atau bantuan setelah website selesai?",
    a: "Ada. Perbaikan bug dan bantuan teknis kami tanggung selama 1 tahun setelah website online. Untuk perubahan yang sifatnya menambah fitur baru, kami buatkan penawaran terpisah.",
  },
  {
    q: "Apakah saya harus menyiapkan foto dan teks tulisan sendiri?",
    a: "Teks profil perusahaan, detail paket, dan harga sebaiknya datang dari Anda karena Anda yang paling paham produknya. Kami bantu merapikan susunan kalimatnya, dan bisa menyediakan foto berlisensi bila dokumentasi Anda belum lengkap.",
  },
  {
    q: "Bagaimana sistem pembayarannya?",
    a: "Dibagi dua tahap: 50% di awal sebelum pengerjaan dimulai, dan 50% sisanya setelah website selesai dan siap dionlinekan.",
  },
  {
    q: "Apakah website ini aman dari serangan peretas?",
    a: "Website dibangun dengan Next.js dan Supabase, tanpa plugin pihak ketiga yang biasanya jadi celah masuk pada instalasi WordPress. Sertifikat SSL aktif otomatis dan pembaruan keamanan kami pantau selama masa dukungan. Tidak ada sistem yang 100% kebal, tapi permukaan serangannya jauh lebih kecil.",
  },
]
