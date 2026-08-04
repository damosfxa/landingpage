"use client"

import { motion } from "framer-motion"
import { CheckCircle2, XCircle, Gauge, Search, Globe, TrendingUp } from "lucide-react"

export function TechAdvantageSection() {
  return (
    <section id="teknologi" className="scroll-mt-24 py-24 bg-background relative overflow-hidden">
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
            Kenapa dua website bisa terlihat mirip <br className="hidden md:block" /> tapi hasilnya berbeda
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-prose mx-auto"
          >
            Perbedaannya ada di cara halaman dikirim ke browser. Berikut alasan teknisnya,
            tanpa istilah yang bikin pusing.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
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
              <h3 className="text-xl font-bold text-foreground">Website Template Biasa</h3>
            </div>

            <p className="text-muted-foreground mb-8">
              Halaman dirakit di browser pengunjung (client-side rendering), sering di atas
              template CMS dengan banyak plugin tambahan.
            </p>

            <ul className="space-y-4 mt-auto">
              {[
                "Perlu mengunduh banyak file sebelum tampil.",
                "Sempat menampilkan halaman kosong saat dibuka.",
                "Isi halaman baru muncul setelah skrip selesai jalan.",
                "Mesin pencari perlu usaha ekstra untuk membacanya.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

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
              <h3 className="text-xl font-bold text-foreground">Website Voxy Web Studio</h3>
            </div>

            <p className="text-muted-foreground mb-8">
              Halaman disiapkan di server lebih dulu dengan <strong className="text-foreground font-semibold">Next.js</strong>,
              lalu dikirim dalam keadaan sudah jadi.
            </p>

            <ul className="space-y-4 mt-auto">
              {[
                { icon: <Gauge className="w-5 h-5 text-primary" />, text: "Tampil hampir seketika, tanpa jeda halaman kosong." },
                { icon: <Search className="w-5 h-5 text-primary" />, text: "HTML sudah utuh, jadi mudah dibaca mesin pencari." },
                { icon: <Globe className="w-5 h-5 text-primary" />, text: "Judul, deskripsi, dan data terstruktur tertata rapi." },
                { icon: <TrendingUp className="w-5 h-5 text-primary" />, text: "Pengunjung tidak keburu menutup halaman karena lambat." },
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
