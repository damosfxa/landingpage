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
import { LeadForm } from "@/components/lead-form"
import { Clock, Handshake } from "lucide-react"
import { PortfolioSection } from "@/components/sections/portfolio"
import { createClient } from "@/utils/supabase/server"
import { faqs } from "@/lib/data/faq"

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
}

export default async function Home() {
  const supabase = await createClient()
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(4)
  return (
    <>
      <Navbar />
      <FloatingWA />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <main className="flex min-h-screen flex-col">
        <HeroSection />
        <TrustBanner />
        <section id="tentang">
          <AboutSection />
        </section>
        <FeaturesSection />
        <TechAdvantageSection />
        <PortfolioSection projects={projects || []} />
        <GuaranteeSection />
        <PricingSection />
        <FAQSection />

        <section id="kontak" className="bg-surface-dark py-24">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="font-serif text-3xl font-semibold leading-tight text-surface-dark-foreground md:text-4xl">
                Ceritakan dulu kebutuhan website Anda
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-surface-dark-muted">
                Isi formulir di samping, dan kami hubungi untuk membahas apa yang sebenarnya
                Anda butuhkan, termasuk kalau ternyata paket yang lebih kecil sudah cukup.
              </p>

              <ul className="mt-10 space-y-4">
                <li className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  <span className="text-surface-dark-muted">
                    Biasanya dibalas di hari yang sama pada jam kerja.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Handshake className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  <span className="text-surface-dark-muted">
                    Bicara langsung dengan yang mengerjakan, tanpa perantara sales.
                  </span>
                </li>
              </ul>
            </div>

            <LeadForm />
          </div>
        </section>

        <footer className="border-t border-surface-dark-border bg-surface-dark px-6 py-12">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-serif text-lg font-semibold text-surface-dark-foreground">
              Area layanan
            </h2>
            <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
              {["Jakarta", "Surabaya", "Bandung", "Medan", "Makassar", "Semarang", "Balikpapan", "Palembang", "Denpasar", "Yogyakarta"].map((kota) => (
                <li key={kota}>
                  <a
                    href={`/layanan/tour-travel/${kota.toLowerCase()}`}
                    className="text-sm text-surface-dark-muted transition-colors hover:text-surface-dark-foreground"
                  >
                    {kota}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-10 border-t border-surface-dark-border pt-6 text-sm text-surface-dark-muted">
              © {new Date().getFullYear()} Voxy.dev. Jasa pembuatan website tour &amp; travel.
            </p>
          </div>
        </footer>
      </main>
    </>
  )
}
