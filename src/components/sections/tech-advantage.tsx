import { Check, X } from "lucide-react"

const templateSite = [
  "Perlu mengunduh banyak file sebelum tampil.",
  "Sempat menampilkan halaman kosong saat dibuka.",
  "Isi halaman baru muncul setelah skrip selesai jalan.",
  "Mesin pencari perlu usaha ekstra untuk membacanya.",
]

const voxySite = [
  "Tampil hampir seketika, tanpa jeda halaman kosong.",
  "HTML sudah utuh, jadi mudah dibaca mesin pencari.",
  "Judul, deskripsi, dan data terstruktur tertata rapi.",
  "Pengunjung tidak keburu menutup halaman karena lambat.",
]

export function TechAdvantageSection() {
  return (
    <section id="teknologi" className="border-b border-border bg-secondary py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <h2 className="font-serif text-3xl font-semibold leading-tight text-foreground md:text-4xl">
            Kenapa dua website bisa terlihat mirip tapi hasilnya berbeda
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Perbedaannya ada di cara halaman dikirim ke browser. Berikut alasan teknisnya,
            tanpa istilah yang bikin pusing.
          </p>
        </div>

        <div className="mt-14 grid gap-px border border-border bg-border md:grid-cols-2">
          <div className="bg-card p-8">
            <h3 className="font-serif text-xl font-semibold text-foreground">Website template biasa</h3>
            <p className="mt-3 text-muted-foreground">
              Halaman dirakit di browser pengunjung (client-side rendering), sering di atas
              template CMS dengan banyak plugin tambahan.
            </p>
            <ul className="mt-6 space-y-3">
              {templateSite.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-destructive" aria-hidden="true" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-card p-8">
            <h3 className="font-serif text-xl font-semibold text-foreground">Website Voxy.dev</h3>
            <p className="mt-3 text-muted-foreground">
              Halaman disiapkan di server lebih dulu dengan{" "}
              <strong className="font-semibold text-foreground">Next.js</strong>, lalu dikirim
              dalam keadaan sudah jadi.
            </p>
            <ul className="mt-6 space-y-3">
              {voxySite.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
