"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Home, MessageCircle, RotateCcw } from "lucide-react";
import { trackWhatsAppClick } from "@/lib/analytics";
import { waLink } from "@/lib/constants";

export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error("Unhandled error:", error);
  }, [error]);

  return (
    <main id="konten-utama" className="flex min-h-screen flex-col items-center justify-center bg-background px-6 py-24 text-center">
      <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
        Ada yang tidak berjalan semestinya
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        Halaman gagal dimuat. Coba muat ulang, atau kembali ke beranda dan hubungi
        kami langsung lewat WhatsApp kalau masalahnya berlanjut.
      </p>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <button
          onClick={() => retry()}
          className="inline-flex items-center justify-center gap-2 rounded-md bg-foreground px-8 py-4 text-base font-semibold text-background transition-colors hover:bg-foreground/90"
        >
          <RotateCcw className="h-5 w-5" />
          Coba Lagi
        </button>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-background px-8 py-4 text-base font-semibold text-foreground transition-colors hover:bg-secondary"
        >
          <Home className="h-5 w-5" />
          Kembali ke Beranda
        </Link>
        <a
          href={waLink("Halo Voxy, saya menemukan error di halaman web. Boleh dibantu?")}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWhatsAppClick("error_page")}
          className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-background px-8 py-4 text-base font-semibold text-foreground transition-colors hover:bg-secondary"
        >
          <MessageCircle className="h-5 w-5" />
          Chat WhatsApp
        </a>
      </div>
    </main>
  );
}
