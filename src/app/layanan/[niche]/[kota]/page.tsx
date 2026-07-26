import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/sections/hero"
import { TrustBanner } from "@/components/trust-banner"
import { AboutSection } from "@/components/sections/about"
import { FeaturesSection } from "@/components/sections/features"
import { GuaranteeSection } from "@/components/sections/guarantee"
import { PricingSection } from "@/components/sections/pricing"
import { FAQSection } from "@/components/sections/faq"
import { FloatingWA } from "@/components/floating-wa"
import { TechAdvantageSection } from "@/components/sections/tech-advantage"
import { targetCities, targetNiches } from "@/lib/data/seo-data"
import { Metadata } from "next"

type Props = {
  params: Promise<{ niche: string; kota: string }>
}

function formatKota(kota: string | undefined) {
  const value = kota || "Indonesia"
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const nicheData = targetNiches.find(n => n.slug === resolvedParams.niche) || targetNiches[0]
  const kotaFormatted = formatKota(resolvedParams.kota)

  const title = `Jasa Pembuatan Website ${nicheData.name} di ${kotaFormatted}`
  const description = `Jasa pembuatan website ${nicheData.name.toLowerCase()} di ${kotaFormatted}. Desain kustom, halaman cepat dibuka, dan struktur SEO yang tertata.`

  return {
    title,
    description,
    alternates: {
      canonical: `/layanan/${resolvedParams.niche}/${(resolvedParams.kota || "").toLowerCase()}`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.byvoxy.com/layanan/${resolvedParams.niche}/${(resolvedParams.kota || "").toLowerCase()}`,
    }
  }
}

export function generateStaticParams() {
  const paths: { niche: string, kota: string }[] = []

  targetNiches.forEach(niche => {
    targetCities.forEach(kota => {
      paths.push({
        niche: niche.slug,
        kota: kota.toLowerCase()
      })
    })
  })

  return paths
}

export default async function ProgrammaticSEOPage({ params }: Props) {
  const resolvedParams = await params;
  const nicheData = targetNiches.find(n => n.slug === resolvedParams.niche) || targetNiches[0]
  const kotaFormatted = formatKota(resolvedParams.kota)

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: `Pembuatan Website ${nicheData.name}`,
    provider: {
      "@type": "ProfessionalService",
      name: "Voxy Web Studio",
    },
    areaServed: {
      "@type": "City",
      name: kotaFormatted,
    },
    description: `Jasa pembuatan website ${nicheData.name.toLowerCase()} di wilayah ${kotaFormatted}.`,
  }

  return (
    <>
      <Navbar />
      <FloatingWA />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      <main className="flex min-h-screen flex-col">
        <HeroSection
          title={
            <>
              Jasa Pembuatan Website {nicheData.name} <br className="hidden md:block" />
              <span className="text-primary italic">di {kotaFormatted}</span>
            </>
          }
          description={
            <>
              Kami mengerjakan website untuk bisnis {nicheData.name.toLowerCase()} di{" "}
              {kotaFormatted} dan sekitarnya: desain dibuat dari nol mengikuti brand Anda,
              halamannya cepat dibuka, dan setiap pengunjung punya jalur jelas menuju
              WhatsApp admin Anda.
            </>
          }
        />

        <TrustBanner />
        <section id="tentang">
          <AboutSection />
        </section>
        <FeaturesSection />
        <TechAdvantageSection />
        <GuaranteeSection />
        <PricingSection />
        <FAQSection />

        <section id="kontak" className="bg-foreground py-24 text-background">
          <div className="mx-auto max-w-2xl text-center px-6">
            <h2 className="font-serif text-3xl font-bold md:text-5xl">Mulai dari obrolan singkat</h2>
            <p className="mt-6 text-lg text-muted">
              Ceritakan kebutuhan bisnis Anda di {kotaFormatted}. Kami bantu petakan dulu apa
              yang perlu dan apa yang belum perlu dibuat.
            </p>
            <a
              href={`https://wa.me/6285111601910?text=${encodeURIComponent(`Halo Voxy, saya dari ${kotaFormatted}. Saya ingin konsultasi pembuatan website ${nicheData.name}.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center justify-center rounded-xl bg-primary px-8 py-4 text-base font-bold text-primary-foreground transition-all hover:bg-primary/90 hover:scale-[1.02]"
            >
              Konsultasi Gratis via WhatsApp
            </a>
          </div>
        </section>
      </main>
    </>
  )
}
