"use client"

import { motion } from "framer-motion"
import { CheckCircle2, XCircle, Zap, Search, Globe, TrendingUp } from "lucide-react"

export function TechAdvantageSection() {
  return (
    <section id="teknologi" className="py-24 bg-background relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6"
          >
            Bukan Sekadar Desain Cantik,<br className="hidden md:block" /> Tapi <span className="text-primary italic">Mesin Pencetak Omzet.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-prose mx-auto"
          >
            Pengusaha tidak peduli bahasa pemrograman, mereka peduli Traffic dan Order. Inilah alasan teknis mengapa website murah gagal mendatangkan klien.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Card: Web Biasa */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-3xl border border-destructive/20 bg-destructive/5 p-8 flex flex-col h-full"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-full bg-destructive/10 text-destructive">
                <XCircle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Website Murahan / Biasa</h3>
            </div>
            
            <p className="text-muted-foreground mb-8">
              Menggunakan teknologi lama (Client-Side Rendering) atau CMS template gratisan.
            </p>

            <ul className="space-y-4 mt-auto">
              {[
                "Loading lambat karena file membengkak.",
                "Blank screen saat pertama kali dibuka.",
                "Google Bot buta, tidak bisa baca isi website.",
                "SEO Mati, traffic organik nol.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Card: Voxy */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="rounded-3xl border border-primary/20 bg-primary/5 p-8 flex flex-col h-full relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-[100px] -z-10" />
            
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-full bg-primary/10 text-primary">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Website Voxy.dev</h3>
            </div>

            <p className="text-muted-foreground mb-8">
              Menggunakan arsitektur <strong className="text-foreground font-semibold">Next.js (Server-Side Rendering)</strong> kelas enterprise.
            </p>

            <ul className="space-y-4 mt-auto">
              {[
                { icon: <Zap className="w-5 h-5 text-primary" />, text: "Loading instan super cepat (Skor 100/100)." },
                { icon: <Search className="w-5 h-5 text-primary" />, text: "HTML utuh, Google Bot langsung mengenali konten." },
                { icon: <Globe className="w-5 h-5 text-primary" />, text: "SEO Maksimal untuk menguasai Halaman 1 Google." },
                { icon: <TrendingUp className="w-5 h-5 text-primary" />, text: "Konversi tinggi dari pengunjung menjadi pembeli." },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="shrink-0 mt-0.5">{item.icon}</span>
                  <span className="text-sm font-medium text-foreground">{item.text}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
