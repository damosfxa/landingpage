import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { WA_NUMBER, WA_NUMBER_DISPLAY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Kebijakan Privasi",
  description:
    "Data apa yang Voxy Web Studio kumpulkan dari pengunjung dan calon klien, untuk apa, dan bagaimana cara meminta penghapusannya.",
};

export default function PrivacyPolicyPage() {
  return (
    <main id="konten-utama" className="bg-background px-6 py-24">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Beranda
        </Link>

        <h1 className="mt-8 font-serif text-4xl font-bold text-foreground">
          Kebijakan Privasi
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">Terakhir diperbarui: 4 Agustus 2026</p>

        <div className="mt-10 space-y-10 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="font-serif text-xl font-bold text-foreground mb-3">
              Data apa yang kami kumpulkan
            </h2>
            <p>
              Lewat formulir konsultasi di halaman ini, kami mengumpulkan nama, nomor
              WhatsApp, dan nama perusahaan (opsional) yang Anda isikan sendiri. Kami tidak
              meminta data ini lewat cara lain.
            </p>
            <p className="mt-3">
              Kalau Google Analytics aktif di situs ini, kami juga menerima data kunjungan
              umum secara otomatis: halaman yang dibuka dan tombol yang diklik (misalnya
              tombol WhatsApp). Data ini tidak memuat nama atau kontak Anda, dan diproses
              oleh Google sesuai kebijakan privasi mereka sendiri.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-foreground mb-3">
              Untuk apa data ini dipakai
            </h2>
            <p>
              Satu-satunya tujuan: menghubungi Anda kembali untuk membahas kebutuhan
              website yang Anda tanyakan. Data dari formulir tersimpan di database kami
              (Supabase) dan sebuah notifikasi otomatis dikirim ke Telegram tim kami supaya
              lead baru cepat ditindaklanjuti.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-foreground mb-3">
              Siapa yang bisa mengakses
            </h2>
            <p>
              Hanya admin Voxy yang login dan terdaftar sebagai admin yang bisa membaca
              daftar prospek ini, dibatasi lewat kontrol akses di level database. Kami
              tidak menjual, menyewakan, atau membagikan data Anda ke pihak ketiga mana
              pun di luar yang disebutkan di halaman ini (Telegram untuk notifikasi
              internal, Google Analytics untuk statistik kunjungan bila aktif).
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-foreground mb-3">
              Berapa lama data disimpan
            </h2>
            <p>
              Data dari formulir disimpan selama diperlukan untuk keperluan tindak lanjut
              bisnis, dan dihapus atas permintaan Anda kapan pun.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-foreground mb-3">
              Hak Anda
            </h2>
            <p>
              Anda berhak meminta salinan data yang kami simpan tentang Anda, atau meminta
              data itu dihapus. Kirim permintaannya lewat WhatsApp ke{" "}
              <a
                href={`https://wa.me/${WA_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-2 hover:text-primary/80"
              >
                {WA_NUMBER_DISPLAY}
              </a>{" "}
              dengan nomor yang sama dengan yang Anda isikan di formulir, dan kami proses
              secepatnya.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-foreground mb-3">
              Perubahan kebijakan ini
            </h2>
            <p>
              Kalau ada perubahan berarti pada cara kami mengumpulkan atau memakai data,
              halaman ini akan diperbarui dan tanggal di atas akan ikut berubah.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
