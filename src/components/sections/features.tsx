import { Gauge, ShieldCheck, LineChart, Headset } from "lucide-react"

const items = [
  {
    icon: Gauge,
    title: "Cepat dibuka, mudah dibaca Google",
    desc: "Halaman dirender di server, jadi isinya sudah lengkap sejak permintaan pertama. Pengunjung tidak perlu menunggu dan mesin pencari tidak perlu menebak.",
  },
  {
    icon: ShieldCheck,
    title: "Ruang untuk legalitas & kredibilitas",
    desc: "Izin usaha, sertifikat, mitra resmi, dan dokumentasi perjalanan punya tempatnya sendiri. Ini yang pertama dicari calon pelanggan sebelum mereka transfer.",
  },
  {
    icon: LineChart,
    title: "Jalur langsung ke WhatsApp Anda",
    desc: "Tombol WhatsApp dan formulir kontak tersedia di setiap bagian penting, lengkap dengan pesan awal yang sudah terisi sesuai paket yang dilihat.",
  },
  {
    icon: Headset,
    title: "Pemeliharaan tetap di tangan kami",
    desc: "Server, sertifikat keamanan, dan pembaruan sistem kami yang urus selama masa dukungan, jadi Anda bisa fokus melayani pelanggan.",
  },
]

export function FeaturesSection() {
  return (
    <section id="kelebihan" className="border-b border-border bg-background py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <h2 className="font-serif text-3xl font-semibold leading-tight text-foreground md:text-4xl">
            Fondasi teknis yang biasanya baru terasa saat dibutuhkan
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Empat hal di bawah ini kami kerjakan di setiap proyek, bukan sebagai tambahan
            berbayar di kemudian hari.
          </p>
        </div>

        <ul className="mt-14 grid gap-px border border-border bg-border sm:grid-cols-2">
          {items.map(({ icon: Icon, title, desc }) => (
            <li key={title} className="bg-card p-8">
              <Icon className="h-6 w-6 text-primary" strokeWidth={1.5} aria-hidden="true" />
              <h3 className="mt-5 font-serif text-xl font-semibold text-foreground">{title}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
