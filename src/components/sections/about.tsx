import { Check } from "lucide-react"

const points = [
  "Fokus di satu bidang: website tour & travel",
  "Desain dibuat dari nol mengikuti brand Anda",
  "Halaman ringan dan struktur SEO yang tertata",
  "Dukungan teknis dan garansi revisi sesuai paket",
]

export function AboutSection() {
  return (
    <section className="border-b border-border bg-background py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className="font-serif text-3xl font-semibold leading-tight text-foreground md:text-4xl">
            Lebih dekat dengan Voxy.dev
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Voxy.dev mengerjakan website untuk biro tour &amp; travel di Indonesia. Kami
            memilih fokus di satu bidang karena kebutuhannya cukup khas: paket yang sering
            berubah, harga yang perlu diperbarui sendiri, dan calon pelanggan yang menilai
            kredibilitas dari tampilan halaman sebelum menghubungi.
          </p>

          <ul className="mt-8 space-y-3">
            {points.map((point) => (
              <li key={point} className="flex gap-3 text-muted-foreground">
                <Check className="mt-1 h-4 w-4 flex-none text-primary" aria-hidden="true" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-l-2 border-primary bg-secondary p-8 md:p-10">
          <h3 className="font-serif text-2xl font-semibold text-foreground">Cara kami bekerja</h3>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Kami mulai dari pertanyaan yang sama di setiap proyek: siapa yang akan membuka
            halaman ini, dan apa yang mereka cari sebelum memutuskan. Desain, struktur
            halaman, dan penempatan tombol kontak menyusul dari jawaban itu.
          </p>
        </div>
      </div>
    </section>
  )
}
