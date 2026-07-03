"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import Image from "next/image"

const testimonials = [
  {
    body: "Sebelumnya jamaah sering membandingkan harga dan minta diskon karena web kami kelihatan biasa saja. Setelah di-redesign oleh Voxy, brand image kami langsung naik kelas. Closing rate via WhatsApp meningkat 40%.",
    author: {
      name: "H. Ahmad Fauzan",
      handle: "Direktur Utama",
      company: "Al-Hidayah Tour & Travel",
      imageUrl: "/testimonials/ahmad.jpg",
    },
  },
  {
    body: "Sistemnya luar biasa rapi. Integrasi Siskopatuh dan optimasi kecepatan halamannya sangat membantu. Jamaah yang klik iklan langsung betah baca penjelasan paket sampai bawah karena desainnya sangat meyakinkan.",
    author: {
      name: "Siti Rahmawati",
      handle: "VP of Marketing",
      company: "Nurani Wisata Hati",
      imageUrl: "/testimonials/siti.jpg",
    },
  },
  {
    body: "Dulu kami pakai template gratisan, susah banget bersaing di Google. Setelah pakai jasa Voxy, bukan cuma desain yang mewah, tapi SEO-nya jalan. Sekarang banyak calon jamaah organik yang masuk tiap minggu.",
    author: {
      name: "Budi Santoso",
      handle: "Founder",
      company: "Berkah Umrah Mandiri",
      imageUrl: "/testimonials/budi.jpg",
    },
  },
]

export function TestimonialSection() {
  return (
    <section className="bg-background py-24 sm:py-32" id="testimoni">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Dipercaya oleh Biro Travel Profesional
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 text-lg leading-8 text-muted-foreground"
          >
            Mereka telah membuktikan bahwa investasi pada website premium adalah kunci untuk meningkatkan trust dan omzet miliaran.
          </motion.p>
        </div>
        <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={testimonial.author.name} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-2xl bg-secondary/50 p-8 shadow-sm ring-1 ring-border relative"
              >
                <Quote className="absolute top-6 right-6 h-8 w-8 text-primary/20" />
                <div className="flex gap-1 text-primary mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <blockquote className="text-foreground">
                  <p className="text-base leading-7">"{testimonial.body}"</p>
                </blockquote>
                <figcaption className="mt-6 flex flex-col gap-y-1">
                  <div className="font-semibold text-foreground">{testimonial.author.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.author.handle} @ {testimonial.author.company}</div>
                </figcaption>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
