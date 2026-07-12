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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const nicheData = targetNiches.find(n => n.slug === resolvedParams.niche) || targetNiches[0]
  
  // Handle undefined safely just in case
  const kotaStr = resolvedParams.kota || 'Indonesia';
  const kotaFormatted = kotaStr.charAt(0).toUpperCase() + kotaStr.slice(1).toLowerCase()
  
  const title = `Jasa Pembuatan Website ${nicheData.name} di ${kotaFormatted} | Voxy Web Studio`
  const description = `Voxy Web Studio: Spesialis Jasa Pembuatan Website ${nicheData.name} Profesional di ${kotaFormatted}. Tingkatkan kredibilitas & omzet bisnis Anda sekarang.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://byvoxy.com/layanan/${resolvedParams.niche}/${kotaStr.toLowerCase()}`,
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
  
  const kotaStr = resolvedParams.kota || 'Indonesia';
  const kotaFormatted = kotaStr.charAt(0).toUpperCase() + kotaStr.slice(1).toLowerCase()

  return (
    <>
      <Navbar />
      <FloatingWA />
      
      {/* Suntikan JSON-LD Schema (LocalBusiness & Service) Spesifik Kota */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": `Pembuatan Website ${nicheData.name}`,
            "provider": {
              "@type": "ProfessionalService",
              "name": "Voxy Web Studio"
            },
            "areaServed": {
              "@type": "City",
              "name": kotaFormatted
            },
            "description": `Jasa Pembuatan Website ${nicheData.name} premium di wilayah ${kotaFormatted}.`
          })
        }}
      />
      
      <main className="flex min-h-screen flex-col">
        <HeroSection />
        
        {/* Dynamic SEO Block for Content Injection */}
        <section className="bg-primary/5 py-12 px-6 text-center border-y border-primary/10">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-serif text-3xl font-bold text-foreground mb-4">
              Jasa Pembuatan Website {nicheData.name} Profesional di {kotaFormatted}
            </h1>
            <p className="text-muted-foreground text-lg">
              Apakah Anda mencari vendor IT tepercaya di <strong>{kotaFormatted}</strong>? Voxy Web Studio siap membantu bisnis <strong>{nicheData.name}</strong> Anda mendominasi pencarian Google dan meningkatkan konversi penjualan.
            </p>
          </div>
        </section>

        <TrustBanner />
        <section id="tentang">
          <AboutSection />
        </section>
        <FeaturesSection />
        <TechAdvantageSection />
        <GuaranteeSection />
        <PricingSection />
        <FAQSection />
        
        {/* Contact CTA */}
        <section id="kontak" className="bg-foreground py-24 text-background">
          <div className="mx-auto max-w-2xl text-center px-6">
            <h2 className="font-serif text-3xl font-bold md:text-5xl">Siap Menguasai Pasar {kotaFormatted}?</h2>
            <p className="mt-6 text-lg text-muted">Diskusikan visi bisnis Anda langsung dengan saya. Tanpa perantara, tanpa birokrasi agensi yang rumit.</p>
            <a
              href={`https://wa.me/6285111601910?text=Halo%2C%20saya%20dari%20${kotaFormatted}.%20Saya%20ingin%20konsultasi%20pembuatan%20website%20${nicheData.name}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center justify-center rounded-xl bg-primary px-8 py-4 text-base font-bold text-primary-foreground transition-all hover:bg-primary/90 hover:scale-[1.02]"
            >
              Jadwalkan Konsultasi Gratis
            </a>
          </div>
        </section>
      </main>
    </>
  )
}
