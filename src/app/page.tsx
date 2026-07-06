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

export default function Home() {
  return (
    <>
      <Navbar />
      <FloatingWA />
      <main className="flex min-h-screen flex-col">
        <HeroSection />
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
            <h2 className="font-serif text-3xl font-bold md:text-5xl">Siap Meningkatkan Standar Brand Travel Anda?</h2>
            <p className="mt-6 text-lg text-muted">Diskusikan visi bisnis Anda langsung dengan saya. Tanpa perantara, tanpa birokrasi agensi yang rumit.</p>
            <a
              href="https://wa.me/6285111601910?text=Halo%2C%20saya%20melihat%20iklan%20di%20FB%2FIG.%20Saya%20ingin%20konsultasi%20pembuatan%20website%20travel%20premium."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center justify-center rounded-xl bg-primary px-8 py-4 text-base font-bold text-primary-foreground transition-all hover:bg-primary/90 hover:scale-[1.02]"
            >
              Jadwalkan Konsultasi Gratis (Via WhatsApp)
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-foreground border-t border-white/10 py-12 text-center text-muted">
           <p className="text-sm">© {new Date().getFullYear()} Voxy.dev | Premium Web Solutions. All rights reserved.</p>
           <p className="text-sm mt-2">Dibuat dengan dedikasi penuh di Indonesia</p>
        </footer>
      </main>
    </>
  )
}
