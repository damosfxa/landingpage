import { Check, ArrowRight } from "lucide-react"

const plans = [
  {
    name: "Essential Plan",
    price: "1.5 Jt",
    originalPrice: "3 Jt",
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
      "Revisi Desain Maksimal 2x",
    ],
    popular: false,
  },
  {
    name: "Professional Plan",
    price: "3 Jt",
    originalPrice: "5.5 Jt",
    desc: "Untuk biro travel yang perlu memperbarui paket dan harganya sendiri.",
    features: [
      "Website Multi-Halaman (S/d 5 Halaman)",
      "Desain Kustom dengan Animasi Halus",
      "Sistem Admin: Kelola Harga & Paket Sendiri",
      "Optimasi SEO Dasar (Ramah Google)",
      "Gratis Domain & Hosting Premium 1 Tahun",
      "Email Perusahaan (halo@travelanda.com)",
      "Keamanan SSL & Backup Data",
      "Revisi Desain Maksimal 5x",
    ],
    popular: true,
  },
  {
    name: "Enterprise Plan",
    price: "7.5+ Jt",
    originalPrice: "12 Jt",
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
      "Revisi Desain Bebas Selama Masa Pengerjaan",
    ],
    popular: false,
  },
]

export function PricingSection() {
  return (
    <section id="harga" className="border-b border-border bg-secondary py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <h2 className="font-serif text-3xl font-semibold leading-tight text-foreground md:text-4xl">
            Pilih paket yang sesuai skala bisnis Anda
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Harga di bawah sudah termasuk domain dan hosting tahun pertama. Kalau kebutuhan
            Anda berada di antara dua paket, kami sesuaikan penawarannya.
          </p>
        </div>

        <div className="mt-14 grid gap-px border border-border bg-border lg:grid-cols-3">
          {plans.map((plan, i) => (
            <div key={plan.name} className="flex flex-col bg-card p-8">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-serif text-2xl font-semibold text-foreground">{plan.name}</h3>
                {plan.popular && (
                  <span className="shrink-0 border border-primary px-2 py-0.5 text-xs font-semibold text-primary rounded-sm">
                    Paling sering dipilih
                  </span>
                )}
              </div>

              <p className="mt-3 text-muted-foreground">{plan.desc}</p>

              <p className="mt-6 text-sm text-muted-foreground">
                Harga normal <span className="line-through">Rp {plan.originalPrice}</span>
              </p>
              <p className="mt-1 font-serif text-3xl font-semibold text-foreground">
                Rp {plan.price}
              </p>

              <a
                href={`https://wa.me/6285111601910?text=${encodeURIComponent(`Halo Voxy, saya tertarik dengan ${plan.name} untuk pembuatan website travel. Boleh minta info lebih lanjut?`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-7 flex items-center justify-center gap-2 rounded-md px-5 py-3 font-semibold transition-colors ${
                  plan.popular
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "border border-border text-foreground hover:bg-secondary"
                }`}
              >
                Tanya {plan.name}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>

              <ul className="mt-8 flex-1 space-y-3 border-t border-border pt-6">
                {i > 0 && (
                  <li className="pb-1 text-sm font-semibold text-foreground">
                    Semua fitur di paket {i === 1 ? "Essential" : "Essential & Professional"}, ditambah:
                  </li>
                )}
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-3">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
