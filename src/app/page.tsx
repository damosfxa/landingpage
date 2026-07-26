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

        <section id="kontak" className="bg-slate-950 py-24 text-slate-200 relative overflow-hidden">
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="mx-auto max-w-6xl px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="font-serif text-4xl font-bold md:text-6xl text-white leading-tight">
                  Ceritakan dulu kebutuhan website Anda
                </h2>
                <p className="mt-6 text-xl text-slate-400">
                  Isi formulir di samping, dan kami hubungi untuk membahas apa yang sebenarnya
                  Anda butuhkan, termasuk kalau ternyata paket yang lebih kecil sudah cukup.
                </p>

                <div className="mt-10 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <p className="text-slate-300">Biasanya dibalas di hari yang sama pada jam kerja.</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <Handshake className="h-6 w-6 text-primary" />
                    </div>
                    <p className="text-slate-300">Bicara langsung dengan yang mengerjakan, tanpa perantara sales.</p>
                  </div>
                </div>
              </div>

              <div className="lg:pl-10">
                <LeadForm />
              </div>
            </div>
          </div>
        </section>

        <footer className="bg-foreground border-t border-white/10 py-12 px-6 text-muted">
           <div className="max-w-5xl mx-auto mb-10">
             <h2 className="font-serif font-semibold text-white mb-4 text-center">Area Layanan</h2>
             <div className="flex flex-wrap justify-center gap-3">
               {["Jakarta", "Surabaya", "Bandung", "Medan", "Makassar", "Semarang", "Balikpapan", "Palembang", "Denpasar", "Yogyakarta"].map((kota) => (
                 <a
                   key={kota}
                   href={`/layanan/tour-travel/${kota.toLowerCase()}`}
                   className="text-xs hover:text-primary transition-colors bg-white/5 px-3 py-1.5 rounded-full"
                 >
                   {kota}
                 </a>
               ))}
             </div>
           </div>
           <div className="text-center">
             <p className="text-sm">© {new Date().getFullYear()} Voxy.dev. Jasa pembuatan website tour &amp; travel.</p>
           </div>
        </footer>
      </main>
    </>
  )
}
