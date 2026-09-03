import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/sections/hero"
import { CredibilityStrip } from "@/components/credibility-strip"
import { AboutSection } from "@/components/sections/about"
import { FeaturesSection } from "@/components/sections/features"
import { GuaranteeSection } from "@/components/sections/guarantee"
import { PricingSection } from "@/components/sections/pricing"
import { FAQSection } from "@/components/sections/faq"
import { FloatingWA } from "@/components/floating-wa"
import { LeadForm } from "@/components/lead-form"
import { Clock, Handshake } from "lucide-react"
import { MIN_CLIENT_PROJECTS, PortfolioSection } from "@/components/sections/portfolio"
import { createPublicClient } from "@/utils/supabase/public"
import { faqs } from "@/lib/data/faq"

// Portofolio berubah jarang (lewat /admin), jadi cukup regenerasi setiap jam.
// Wajib disetel: tanpa ini, halaman tetap statis di build pertama tapi tidak
// pernah menyerap project baru sampai deploy ulang.
export const revalidate = 3600

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
  const supabase = createPublicClient()
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false })
    // Harus di atas ambang mockup, kalau tidak PortfolioSection tidak akan pernah
    // melihat cukup proyek untuk berhenti menampilkan contoh desain.
    .limit(MIN_CLIENT_PROJECTS + 1)
  return (
    <>
      <Navbar />
      <FloatingWA />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }}
      />

      <main id="konten-utama" className="flex min-h-screen flex-col">
        <HeroSection />
        <CredibilityStrip />
        <section id="tentang" className="scroll-mt-24">
          <AboutSection />
        </section>
        <FeaturesSection />
        <PortfolioSection projects={projects || []} />
        <GuaranteeSection />
        <PricingSection />
        <FAQSection />

        <section id="kontak" className="scroll-mt-24 bg-primary py-24 text-primary-foreground">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="font-serif text-4xl font-bold md:text-6xl leading-tight">
                  Ceritakan dulu kebutuhan website Anda
                </h2>
                <p className="mt-6 text-xl opacity-90">
                  Isi formulir di samping, dan kami hubungi untuk membahas apa yang sebenarnya
                  Anda butuhkan, termasuk kalau ternyata paket yang lebih kecil sudah cukup.
                </p>

                <div className="mt-10 space-y-4">
                  <div className="flex items-center gap-4">
                    <Clock className="h-6 w-6 shrink-0 text-tertiary" />
                    <p>Biasanya dibalas di hari yang sama pada jam kerja.</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Handshake className="h-6 w-6 shrink-0 text-tertiary" />
                    <p>Bicara langsung dengan yang mengerjakan, tanpa perantara sales.</p>
                  </div>
                </div>
              </div>

              <div className="lg:pl-10">
                <LeadForm />
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer situs adalah saudara <main>, bukan anaknya: isinya berlaku untuk
          seluruh halaman, bukan bagian dari konten utama. */}
      <footer className="bg-foreground border-t border-white/10 py-12 px-6 text-muted">
           <div className="max-w-5xl mx-auto mb-10">
             <h2 className="font-serif font-semibold text-white mb-4 text-center">Area Layanan</h2>
             <p className="text-xs text-center max-w-2xl mx-auto leading-relaxed">
               Kami mengerjakan proyek untuk biro travel di seluruh Indonesia, termasuk
               Jakarta, Surabaya, Bandung, Medan, Makassar, Semarang, Balikpapan,
               Palembang, Denpasar, dan Yogyakarta. Koordinasi berjalan jarak jauh,
               jadi lokasi Anda tidak jadi kendala.
             </p>
           </div>
           <div className="text-center">
             {/* Aman dengan `revalidate` di atas: Next menjalankan ulang komponen
                 ini (jadi `getFullYear()` ikut terhitung ulang) begitu ada
                 request setelah jendela revalidate lewat -- bukan cuma sekali
                 saat build. */}
             <p className="text-sm">© {new Date().getFullYear()} Voxy Web Studio. Jasa pembuatan website tour &amp; travel.</p>
             <Link href="/privasi" className="mt-2 inline-block text-xs text-muted hover:text-white transition-colors">
               Kebijakan Privasi
             </Link>
           </div>
      </footer>
    </>
  )
}
