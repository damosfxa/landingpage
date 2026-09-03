"use client"
import { motion } from "framer-motion"
import { Quote } from "lucide-react"

export function GuaranteeSection() {
  return (
    <section className="border-y border-border bg-muted py-24 lg:py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-4xl px-6 text-center"
      >
        <Quote className="mx-auto mb-6 h-10 w-10 text-tertiary" strokeWidth={1.5} />
        <p className="font-serif text-2xl font-semibold leading-tight text-foreground md:text-4xl lg:text-5xl">
          Komitmen kami: cakupan kerja yang transparan, jadwal pengerjaan pasti, dan jumlah
          revisi yang disepakati tertulis sebelum kami mulai bekerja. Tanpa biaya tersembunyi.
        </p>
        <p className="mt-8 text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Janji Profesionalisme
        </p>
      </motion.div>
    </section>
  )
}
