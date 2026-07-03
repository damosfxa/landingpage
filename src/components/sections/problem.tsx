"use client"

import { motion } from "framer-motion"
import { AlertCircle, Clock, TrendingDown, Users } from "lucide-react"

const problems = [
  {
    icon: TrendingDown,
    title: "Iklan Boncos, Konversi Rendah",
    description: "Trafik website tinggi dari Facebook/Google Ads, tapi yang chat WhatsApp sedikit karena landing page lambat dan membosankan."
  },
  {
    icon: Users,
    title: "Kalah Kepercayaan dari Kompetitor",
    description: "Jamaah ragu mentransfer puluhan juta karena desain website Anda terlihat seperti template gratisan dari tahun 2010."
  },
  {
    icon: Clock,
    title: "Sistem Manual yang Melelahkan",
    description: "Semua pendaftaran dan pertanyaan diurus manual via chat. Tidak ada sistem otomatis yang memfilter calon jamaah serius."
  }
]

export function ProblemSection() {
  return (
    <section className="bg-secondary/30 py-24" id="problem">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full bg-destructive/10 px-3 py-1 text-sm font-semibold text-destructive ring-1 ring-inset ring-destructive/20 mb-6"
          >
            <AlertCircle className="h-4 w-4" />
            <span>Fakta Lapangan</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Apakah Biro Travel Anda Sedang Mengalami Ini?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg leading-8 text-muted-foreground"
          >
            Banyak biro travel umrah gagal berkembang bukan karena paketnya kurang bagus, melainkan karena presentasi digitalnya yang tidak meyakinkan.
          </motion.p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {problems.map((problem, index) => (
              <motion.div 
                key={problem.title} 
                className="flex flex-col rounded-2xl bg-background p-8 shadow-sm ring-1 ring-border"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <dt className="flex items-center gap-x-3 text-lg font-semibold leading-7 text-foreground">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-destructive/10">
                    <problem.icon className="h-6 w-6 text-destructive" aria-hidden="true" />
                  </div>
                  {problem.title}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">{problem.description}</p>
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
