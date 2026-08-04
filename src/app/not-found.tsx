import Link from "next/link";
import { Home, MessageCircle } from "lucide-react";
import { waLink } from "@/lib/constants";

export default function NotFound() {
  return (
    <main id="konten-utama" className="flex min-h-screen flex-col items-center justify-center bg-background px-6 py-24 text-center">
      <span className="font-serif text-8xl font-bold text-primary/20">404</span>
      <h1 className="mt-4 font-serif text-3xl font-bold text-foreground md:text-4xl">
        Halaman ini tidak ditemukan
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        Halaman yang Anda cari mungkin sudah dipindahkan atau alamatnya salah ketik.
        Coba kembali ke beranda, atau langsung hubungi kami lewat WhatsApp.
      </p>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-md bg-foreground px-8 py-4 text-base font-semibold text-background transition-colors hover:bg-foreground/90"
        >
          <Home className="h-5 w-5" />
          Kembali ke Beranda
        </Link>
        <a
          href={waLink(
            "Halo Voxy, saya nyasar dari halaman yang tidak ditemukan. Boleh dibantu?",
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-background px-8 py-4 text-base font-semibold text-foreground transition-colors hover:bg-secondary"
        >
          <MessageCircle className="h-5 w-5" />
          Chat WhatsApp
        </a>
      </div>
    </main>
  );
}
