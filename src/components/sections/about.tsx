"use client"
import { motion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"

export function AboutSection() {
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
    <section className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:gap-x-16 lg:items-center"
        >
          <div>
            <motion.span variants={itemVariants} className="block text-sm font-semibold uppercase tracking-widest text-primary">
              Tentang Kami
            </motion.span>
            <motion.h2 variants={itemVariants} className="mt-4 font-serif text-3xl font-bold leading-tight text-foreground md:text-5xl">
              Lebih Dekat dengan Voxy.dev
            </motion.h2>
            <motion.p variants={itemVariants} className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Voxy.dev mengerjakan website untuk biro tour &amp; travel di Indonesia. Kami
              memilih fokus di satu bidang karena kebutuhannya cukup khas: paket yang sering
              berubah, harga yang perlu diperbarui sendiri, dan calon pelanggan yang menilai
              kredibilitas dari tampilan halaman sebelum menghubungi.
            </motion.p>

            <motion.ul variants={itemVariants} className="mt-8 space-y-4">
              {[
                "Fokus di satu bidang: website tour & travel",
                "Desain dibuat dari nol mengikuti brand Anda",
                "Halaman ringan dan struktur SEO yang tertata",
                "Dukungan teknis dan garansi revisi sesuai paket",
              ].map((item, i) => (
                <li key={i} className="flex gap-x-3 text-muted-foreground">
                  <CheckCircle2 className="h-6 w-6 flex-none text-primary" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </motion.ul>
          </div>

          <motion.div variants={itemVariants} className="relative rounded-3xl bg-secondary p-8 md:p-12 border border-border overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent z-0" />
            <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-6">
               <h3 className="text-2xl font-serif font-bold text-foreground">Cara Kami Bekerja</h3>
               <p className="text-muted-foreground leading-relaxed">
                 Kami mulai dari pertanyaan yang sama di setiap proyek: siapa yang akan membuka
                 halaman ini, dan apa yang mereka cari sebelum memutuskan. Desain, struktur
                 halaman, dan penempatan tombol kontak menyusul dari jawaban itu.
               </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
