"use client"
import { motion } from "framer-motion"
import { Gauge, ShieldCheck, LineChart, Headset } from "lucide-react"

export function FeaturesSection() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" as const },
    },
  }

  return (
    <section id="kelebihan" className="scroll-mt-24 bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <span className="block text-sm font-semibold uppercase tracking-widest text-primary mb-4">Yang Anda Dapatkan</span>
          <h2 className="mt-4 font-serif text-4xl font-bold leading-tight text-foreground md:text-5xl">
            Fondasi teknis yang biasanya baru terasa saat dibutuhkan
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Empat hal di bawah ini kami kerjakan di setiap proyek, bukan sebagai tambahan
            berbayar di kemudian hari.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {[
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
          ].map((item, i) => {
            const Icon = item.icon;
            return (
            <motion.div
              key={i}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/30"
            >
              <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-primary transition-transform duration-500 ease-out group-hover:scale-x-100" />
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10">
                <Icon className="h-8 w-8 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-xl font-bold text-foreground">{item.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
            </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
