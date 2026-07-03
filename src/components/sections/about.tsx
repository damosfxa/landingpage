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
          {/* Text Content */}
          <div>
            <motion.p variants={itemVariants} className="text-sm font-semibold uppercase tracking-widest text-primary">
              Tentang Kami
            </motion.p>
            <motion.h2 variants={itemVariants} className="mt-4 font-serif text-3xl font-bold leading-tight text-foreground md:text-5xl">
              Lebih Dekat dengan <span className="italic text-primary">Voxy.dev</span>
            </motion.h2>
            <motion.p variants={itemVariants} className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Voxy.dev hadir dengan satu misi sederhana: Membantu biro travel dan bisnis wisata religi di Indonesia beralih dari sekadar promosi konvensional ke ekosistem digital yang elegan, terpercaya, dan berkonversi tinggi.
            </motion.p>
            
            <motion.ul variants={itemVariants} className="mt-8 space-y-4">
              {[
                "Berpengalaman khusus di niche Travel B2B",
                "Desain kustom eksklusif, bukan sekadar template pasaran",
                "Fokus mutlak pada Keamanan dan Kecepatan (SEO 100/100)",
                "Dukungan teknis dan garansi revisi responsif"
              ].map((item, i) => (
                <li key={i} className="flex gap-x-3 text-muted-foreground">
                  <CheckCircle2 className="h-6 w-6 flex-none text-primary" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Image/Visual Card */}
          <motion.div variants={itemVariants} className="relative rounded-3xl bg-secondary p-8 md:p-12 border border-border overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent z-0" />
            <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-6">
               <h3 className="text-2xl font-serif font-bold text-foreground">Berkomitmen pada Kualitas</h3>
               <p className="text-muted-foreground leading-relaxed italic">
                 "Website adalah etalase digital terbesar Anda. Kami memastikannya tidak hanya tampil mewah untuk dilihat, tetapi juga berfungsi sebagai mesin sales 24 jam yang mendatangkan profit nyata."
               </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
