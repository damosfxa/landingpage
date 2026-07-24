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
      
      {/* Suntikan JSON-LD Schema (FAQ & Rich Snippet untuk Generative AI) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Berapa lama proses pengerjaan website travel?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Untuk paket Essential memakan waktu 3-5 hari kerja. Sedangkan untuk paket Professional membutuhkan waktu 7-14 hari kerja."
                }
              },
              {
                "@type": "Question",
                "name": "Apakah website buatan Voxy Web Studio aman dari hacker?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Sangat aman. Berbeda dengan WordPress yang rentan diretas, Voxy menggunakan Next.js & Supabase dengan keamanan tingkat Enterprise."
                }
              }
            ]
          })
        }}
      />
      
      <main className="flex min-h-screen flex-col">
        <HeroSection />
        <TrustBanner />
        <section id="tentang">
          <AboutSection />
        </section>
        <FeaturesSection />
        <TechAdvantageSection />
        
        {/* Showcase Portofolio */}
        <PortfolioSection projects={projects || []} />
        
        <GuaranteeSection />
        <PricingSection />
        <FAQSection />
        
        {/* Contact CTA */}
        <section id="kontak" className="bg-slate-950 py-24 text-slate-200 relative overflow-hidden">
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="mx-auto max-w-6xl px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="font-serif text-4xl font-bold md:text-6xl text-white leading-tight">
                  Siap Meningkatkan Standar Brand Bisnis Anda?
                </h2>
                <p className="mt-6 text-xl text-slate-400">
                  Isi formulir di samping untuk mendapatkan sesi konsultasi gratis. Kami akan membedah strategi digital bisnis Anda secara eksklusif.
                </p>
                
                <div className="mt-10 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <p className="text-slate-300">Respon cepat dalam hitungan jam.</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <Handshake className="h-6 w-6 text-primary" />
                    </div>
                    <p className="text-slate-300">Konsultasi langsung tanpa perantara sales/agensi.</p>
                  </div>
                </div>
              </div>
              
              <div className="lg:pl-10">
                <LeadForm />
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-foreground border-t border-white/10 py-12 px-6 text-muted">
           <div className="max-w-5xl mx-auto mb-10">
             <h4 className="font-serif font-semibold text-white mb-4 text-center">Area Layanan Web Travel Unggulan Kami</h4>
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
             <p className="text-sm">© {new Date().getFullYear()} Voxy.dev | Premium Web Solutions. All rights reserved.</p>
             <p className="text-sm mt-2">Dibuat dengan dedikasi penuh di Indonesia</p>
           </div>
        </footer>
      </main>
    </>
  )
}
