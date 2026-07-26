import type { ReactNode } from "react"
import { ArrowRight, MessageCircle, MapPin, MonitorSmartphone, Settings2, BarChart3 } from "lucide-react"

type HeroSectionProps = {
  /**
   * Halaman SEO per kota mengoper judul & deskripsinya sendiri ke sini,
   * supaya tetap ada tepat satu h1 per halaman.
   */
  title?: ReactNode
  description?: ReactNode
}

const defaultTitle = "Website travel yang membuat calon pelanggan percaya sebelum menghubungi Anda"

const defaultDescription = (
  <>
    Kami membangun website untuk biro tour &amp; travel: tampilannya rapi, halamannya
    terbuka cepat, dan setiap pengunjung punya jalur jelas menuju WhatsApp admin Anda.
    Struktur SEO-nya disiapkan sejak awal, supaya paket perjalanan Anda juga ditemukan
    lewat pencarian Google, bukan hanya lewat iklan berbayar.
  </>
)

const highlights = [
  { icon: MonitorSmartphone, title: "Tampil rapi di HP dan desktop" },
  { icon: Settings2, title: "Harga & paket bisa Anda ubah sendiri" },
  { icon: BarChart3, title: "Struktur SEO disiapkan sejak awal" },
]

export function HeroSection({ title, description }: HeroSectionProps = {}) {
  return (
    <section className="border-b border-border bg-background px-6 pt-36 pb-20">
      <div className="mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-2 border border-border bg-secondary px-3 py-1.5 text-sm font-medium text-muted-foreground rounded-md">
          <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
          Spesialis bisnis travel &amp; tour
        </span>

        <h1 className="mt-8 font-serif text-4xl font-semibold leading-[1.15] tracking-tight text-foreground md:text-5xl">
          {title ?? defaultTitle}
        </h1>

        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          {description ?? defaultDescription}
        </p>

        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href="https://wa.me/6285111601910?text=Halo%20Voxy%2C%20saya%20tertarik%20konsultasi%20untuk%20pembuatan%20website%20travel.%20Bisa%20dibantu%3F"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            Konsultasi kebutuhan Anda
          </a>
          <a
            href="#harga"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-background px-6 py-3 text-base font-semibold text-foreground transition-colors hover:bg-secondary"
          >
            Lihat pilihan paket
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </a>
        </div>
      </div>

      <ul className="mx-auto mt-20 grid w-full max-w-4xl grid-cols-1 gap-px border border-border bg-border sm:grid-cols-3">
        {highlights.map(({ icon: Icon, title: label }) => (
          <li key={label} className="flex flex-col items-center gap-3 bg-card px-6 py-8 text-center">
            <Icon className="h-6 w-6 text-primary" strokeWidth={1.5} aria-hidden="true" />
            <span className="text-sm font-medium text-foreground">{label}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
