"use client"

import { ArrowRight, MessageCircle, MapPin, MonitorSmartphone, Settings2, BarChart3 } from "lucide-react"

export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" as const },
    },
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-28 overflow-hidden bg-background">
      {/* Decorative gradients */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-primary/20 blur-[120px] rounded-full z-0" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-primary/10 blur-[160px] rounded-full z-0" />

      <div
        className="relative z-10 text-center max-w-3xl space-y-8"
      >
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-5 py-2 text-sm font-medium text-primary">
            <MapPin className="h-4 w-4" />
            Spesialis Bisnis Travel & Tour
          </span>
        </div>

        <h1
          className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-foreground"
        >
          Kesan Pertama yang Membuat Tamu Anda <br className="hidden md:block" />
          <span className="text-primary italic">Yakin Sejak Detik Pertama.</span>
        </h1>

        <p
          className="text-lg text-muted-foreground max-w-prose mx-auto leading-relaxed"
        >
          Website bukan sekadar brosur digital, melainkan <strong>Mesin Sales 24 Jam</strong>. Berhenti bakar uang di Ads karena website Anda tidak muncul secara organik. Kami bangun web travel dengan <strong>Skor SEO 100/100</strong> yang langsung menghasilkan konversi.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
          <a
            href="https://wa.me/6285111601910?text=Halo%20Voxy%2C%20saya%20tertarik%20konsultasi%20untuk%20pembuatan%20website%20travel%20premium.%20Bisa%20dibantu%3F"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-foreground px-8 py-4 text-base font-semibold text-background transition-colors hover:bg-foreground/90"
          >
            <MessageCircle className="h-5 w-5" />
            Konsultasi Kebutuhan Anda
          </a>
          <a
            href="#harga"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-background px-8 py-4 text-base font-semibold text-foreground transition-colors hover:bg-secondary"
          >
            Lihat Pilihan Paket
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </div>

      <div
        className="relative z-10 grid grid-cols-1 md:grid-cols-3 mt-20 w-full max-w-4xl gap-6"
      >
        {[
          { icon: <MonitorSmartphone className="h-8 w-8 text-primary" />, title: "Desain Mewah & Responsif" },
          { icon: <Settings2 className="h-8 w-8 text-primary" />, title: "Kelola Konten Super Mudah" },
          { icon: <BarChart3 className="h-8 w-8 text-primary" />, title: "Skor SEO 100/100 (Gacor)" },
        ].map((feat, i) => (
          <div key={i} className="group flex flex-col items-center justify-center rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md hover:border-primary/20">
            <div className="flex items-center justify-center h-14 w-14 mb-4 rounded-xl bg-primary/10 transition-transform group-hover:scale-110">
              {feat.icon}
            </div>
            <h2 className="font-serif text-base font-semibold text-foreground text-center">
              {feat.title}
            </h2>
          </div>
        ))}
      </div>
    </section>
  )
}
