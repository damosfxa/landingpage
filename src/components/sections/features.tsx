"use client"
import { motion } from "framer-motion"

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

  const items = [
    {
      title: "Cepat & Ringan",
      desc: "Halaman terbuka dalam hitungan detik. Calon klien menjelajah paket wisata tanpa hambatan, dan tidak sempat berpindah ke kompetitor.",
    },
    {
      title: "Ruang untuk Legalitas",
      desc: "Tata letak khusus yang menonjolkan izin usaha, sertifikat, dan mitra resmi -- yang pertama dicari calon pelanggan sebelum mereka transfer.",
    },
    {
      title: "Jalur WhatsApp Langsung",
      desc: "Tombol kontak tersedia di setiap bagian penting, lengkap dengan pesan awal yang sudah terisi sesuai paket yang dilihat.",
    },
    {
      title: "Perawatan Rutin",
      desc: "Server, sertifikat keamanan, dan pembaruan sistem kami yang urus selama masa dukungan, jadi Anda bisa fokus melayani pelanggan.",
    },
  ]

  return (
    <section id="kelebihan" className="scroll-mt-24 bg-card py-24 lg:py-32">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <h2 className="mb-16 text-center font-serif text-3xl font-bold leading-tight text-foreground md:text-4xl">
          Yang Anda Dapatkan
        </h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 gap-x-12 gap-y-16 md:grid-cols-2"
        >
          {items.map((item, i) => (
            <motion.div key={i} variants={itemVariants} className={`border-t-2 border-primary pt-6 ${i % 2 === 1 ? "md:mt-12" : ""}`}>
              <h3 className="font-serif text-2xl font-semibold text-foreground">{item.title}</h3>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
