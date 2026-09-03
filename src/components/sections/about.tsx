"use client"
import { motion } from "framer-motion"
import { ImageWithSkeleton } from "@/components/image-with-skeleton"

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
              Lebih Dekat dengan Voxy Web Studio
            </motion.h2>
            <motion.p variants={itemVariants} className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Voxy Web Studio mengerjakan website untuk biro tour &amp; travel di Indonesia. Kami
              memilih fokus di satu bidang karena kebutuhannya cukup khas: paket yang sering
              berubah, harga yang perlu diperbarui sendiri, dan calon pelanggan yang menilai
              kredibilitas dari tampilan halaman sebelum menghubungi.
            </motion.p>

            <motion.ul variants={itemVariants} className="mt-8 space-y-3 border-l-2 border-border">
              {[
                "Fokus di satu bidang: website tour & travel",
                "Desain dibuat dari nol mengikuti brand Anda",
                "Halaman ringan dan struktur SEO yang tertata",
                "Dukungan teknis dan garansi revisi sesuai paket",
              ].map((item, i) => (
                <li key={i} className="pl-4 text-muted-foreground">
                  {item}
                </li>
              ))}
            </motion.ul>
          </div>

          <motion.div variants={itemVariants} className="relative">
            <div className="relative z-10 aspect-[4/5] overflow-hidden rounded-xl border border-border shadow-xl">
              <ImageWithSkeleton
                src="/images/about-workspace.jpg"
                alt="Developer sedang membangun halaman website di laptop"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            {/* Bingkai offset -- pengganti panel gradient dekoratif, tanpa
                berpura-pura jadi foto kedua. */}
            <div className="absolute -bottom-6 -right-6 z-0 hidden h-full w-full rounded-xl border-2 border-primary md:block" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
