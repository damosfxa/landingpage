import { RefreshCw, Receipt } from "lucide-react"

const terms = [
  {
    icon: RefreshCw,
    title: "Revisi sesuai paket",
    desc: "Jumlah revisi desain tercantum di tiap paket, dan perbaikan bug tetap gratis selama masa garansi.",
  },
  {
    icon: Receipt,
    title: "Tanpa biaya tersembunyi",
    desc: "Harga paket sudah termasuk domain dan hosting tahun pertama. Biaya perpanjangan kami sampaikan di muka.",
  },
]

export function GuaranteeSection() {
  return (
    <section className="border-b border-border bg-background py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <h2 className="font-serif text-3xl font-semibold leading-tight text-foreground md:text-4xl">
            Kesepakatan yang jelas sejak awal
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Sebelum pengerjaan dimulai, kita sepakati dulu lingkup kerja, jadwal, dan jumlah
            revisi yang tercakup dalam paket. Semuanya tertulis, jadi tidak ada tagihan
            tambahan yang muncul di tengah jalan.
          </p>
        </div>

        <dl className="mt-14 grid gap-px border border-border bg-border sm:grid-cols-2">
          {terms.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-card p-8">
              <Icon className="h-6 w-6 text-primary" strokeWidth={1.5} aria-hidden="true" />
              <dt className="mt-5 font-serif text-xl font-semibold text-foreground">{title}</dt>
              <dd className="mt-3 leading-relaxed text-muted-foreground">{desc}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
