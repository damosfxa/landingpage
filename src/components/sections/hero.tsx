"use client"

import { ImageWithSkeleton } from "@/components/image-with-skeleton"
import { ArrowRight, MessageCircle } from "lucide-react"
import { useSectionScroll } from "@/lib/use-section-scroll"
import { trackWhatsAppClick } from "@/lib/analytics"
import { waLink } from "@/lib/constants"

export function HeroSection() {
  const scrollToSection = useSectionScroll()

  return (
    <section className="relative flex min-h-[85vh] items-center overflow-hidden py-28">
      <div className="absolute inset-0 z-0">
        <ImageWithSkeleton
          src="/images/hero-bromo.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Gradien dari kiri, bukan overlay gelap merata di seluruh foto --
            teksnya perlu kontras, tapi fotonya sendiri tetap jadi elemen utama. */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/75 to-background/10" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
        <div className="max-w-2xl space-y-8">
          <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Dapatkan Kepercayaan Traveler Sebelum Mereka Mengirim Pesan.
          </h1>

          <p className="max-w-prose text-lg leading-relaxed text-muted-foreground md:text-xl">
            Desain website yang meyakinkan calon klien bahwa biro travel Anda adalah pilihan
            yang profesional, aman, dan bisa diandalkan untuk perjalanan mereka.
          </p>

          <div className="flex flex-col gap-4 pt-2 sm:flex-row">
            <a
              href={waLink(
                "Halo Voxy, saya tertarik konsultasi untuk pembuatan website travel. Bisa dibantu?",
              )}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick("hero")}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <MessageCircle className="h-5 w-5" />
              Konsultasi via WhatsApp
            </a>
            <a
              href="#harga"
              onClick={(e) => scrollToSection(e, "#harga")}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-primary bg-background/80 px-8 py-4 text-base font-semibold text-primary transition-colors hover:bg-secondary"
            >
              Lihat Paket Harga
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
