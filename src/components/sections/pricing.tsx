"use client"
import { motion } from "framer-motion"
import { Check, ArrowRight } from "lucide-react"
import { trackWhatsAppClick } from "@/lib/analytics"
import { BRAND_NAME, waLink } from "@/lib/constants"

export function PricingSection() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
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

  const plans = [
    {
      name: "Essential Plan",
      price: "1.5 Jt",
      priceIDR: 1_500_000,
      desc: "Untuk travel agent yang baru mulai membangun kehadiran digital.",
      features: [
        "1 Halaman (Landing Page Panjang)",
        "Desain Responsif (Rapi di HP & Desktop)",
        "Gratis Domain (.com/.id) 1 Tahun",
        "Gratis Hosting Standar 1 Tahun",
        "Tombol WhatsApp Terintegrasi",
        "Formulir Kontak Sederhana",
        "Integrasi Google Maps",
        "Keamanan SSL (HTTPS)",
        "Revisi Desain Maksimal 2x"
      ],
      popular: false,
    },
    {
      name: "Professional Plan",
      price: "3 Jt",
      priceIDR: 3_000_000,
      desc: "Untuk biro travel yang perlu memperbarui paket dan harganya sendiri.",
      features: [
        "Website Multi-Halaman (S/d 5 Halaman)",
        "Desain Kustom dengan Animasi Halus",
        "Navigasi Mulus (Smooth Scroll)",
        "Sistem Admin: Kelola Harga & Paket Sendiri",
        "Optimasi SEO Dasar (Ramah Google)",
        "Gratis Domain & Hosting Premium 1 Tahun",
        "Email Perusahaan (halo@travelanda.com)",
        "Keamanan SSL & Backup Data",
        "Revisi Desain Maksimal 5x"
      ],
      popular: true,
    },
    {
      name: "Enterprise Plan",
      price: "7.5+ Jt",
      // Harga mulai dari, bukan harga tetap -- lihat pricingJsonLd di bawah.
      priceIDR: 7_500_000,
      desc: "Untuk yang butuh pemesanan dan pembayaran berjalan otomatis.",
      features: [
        "Jumlah Halaman Menyesuaikan Kebutuhan",
        "Sistem Booking Online Terintegrasi",
        "Pembayaran Otomatis (Payment Gateway)",
        "Desain UI/UX Kustom dari Nol",
        "Sistem Admin Lanjutan (Manajemen Peserta)",
        "Optimasi SEO Lanjutan & Google Analytics",
        "Server Cloud Terkelola",
        "Prioritas Support & Maintenance",
        "Revisi Desain Bebas Selama Masa Pengerjaan"
      ],
      popular: false,
    }
  ]

  // Structured data untuk paket harga. `priceIDR` numerik dipakai di sini,
  // terpisah dari `price` (string tampilan seperti "7.5+ Jt") supaya JSON-LD
  // tidak bergantung pada parsing teks yang gampang meleset.
  const pricingJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Jasa Pembuatan Website Tour & Travel",
    provider: {
      "@type": "Organization",
      name: BRAND_NAME,
    },
    areaServed: "Indonesia",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Paket Website Voxy",
      itemListElement: plans.map((plan) => ({
        "@type": "Offer",
        name: plan.name,
        description: plan.desc,
        price: String(plan.priceIDR),
        priceCurrency: "IDR",
      })),
    },
  }

  return (
    <section id="harga" className="scroll-mt-24 bg-secondary py-24 lg:py-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pricingJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <span className="block text-sm font-semibold uppercase tracking-widest text-primary mb-4">Transparansi Harga</span>
          <h2 className="mt-4 font-serif text-4xl font-bold leading-tight text-foreground md:text-5xl">
            Pilih paket yang sesuai skala bisnis Anda
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Harga di bawah sudah termasuk domain dan hosting tahun pertama. Kalau kebutuhan
            Anda berada di antara dua paket, kami sesuaikan penawarannya.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-3"
        >
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className={`relative flex flex-col rounded-xl p-8 ${
                plan.popular
                  ? "border-2 border-primary bg-primary-container text-primary-container-foreground shadow-lg md:-translate-y-4"
                  : "border border-border bg-card shadow-sm"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-bold uppercase tracking-widest text-primary-foreground">
                  Direkomendasikan
                </span>
              )}

              <h3 className="font-serif text-2xl font-bold">{plan.name}</h3>
              <span className={`mt-4 text-sm ${plan.popular ? "opacity-90" : "text-muted-foreground"}`}>{plan.desc}</span>

              <div className="mt-8">
                <span className="font-serif text-3xl font-bold">Rp {plan.price}</span>
              </div>

              <a
                href={waLink(
                  `Halo Voxy, saya tertarik dengan ${plan.name} untuk pembuatan website travel. Boleh minta info lebih lanjut?`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick(`pricing_${plan.name}`)}
                className={`mt-8 flex items-center justify-center gap-2 rounded-md px-6 py-4 text-base font-semibold transition-all ${
                  plan.popular
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground"
                }`}
              >
                Tanya {plan.name} <ArrowRight className="h-4 w-4" />
              </a>

              <ul className="mt-10 flex-1 space-y-4">
                {i > 0 && (
                  <li className={`mb-2 border-b pb-2 text-sm font-bold ${plan.popular ? "border-primary/20" : "border-border/50 text-foreground"}`}>
                    Semua fitur di paket {i === 1 ? "Essential" : "Essential & Professional"}, ditambah:
                  </li>
                )}
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex gap-3">
                    <Check className="h-5 w-5 shrink-0 text-primary" strokeWidth={2} />
                    <span className={`text-sm ${plan.popular ? "font-medium" : "text-muted-foreground"}`}>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
