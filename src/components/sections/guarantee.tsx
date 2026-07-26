"use client"
import { motion } from "framer-motion"
import { ShieldCheck, RefreshCw, Award } from "lucide-react"

export function GuaranteeSection() {
  return (
    <section className="bg-background py-24 lg:py-32 overflow-hidden border-t border-b border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl bg-primary text-primary-foreground p-8 md:p-16 text-center shadow-2xl relative overflow-hidden"
        >
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-black/10 rounded-full blur-3xl"></div>

          <div className="relative z-10 mx-auto max-w-3xl">
            <ShieldCheck className="w-16 h-16 mx-auto mb-6 text-primary-foreground/90" />
            <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6">
              Kesepakatan yang jelas sejak awal
            </h2>
            <p className="text-lg md:text-xl text-primary-foreground/90 mb-10 leading-relaxed">
              Sebelum pengerjaan dimulai, kita sepakati dulu lingkup kerja, jadwal, dan jumlah
              revisi yang tercakup dalam paket. Semuanya tertulis, jadi tidak ada tagihan
              tambahan yang muncul di tengah jalan.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 text-left max-w-2xl mx-auto">
              <div className="flex flex-col items-start gap-2">
                <RefreshCw className="w-8 h-8 mb-2 text-primary-foreground" />
                <h3 className="font-bold text-xl">Revisi Sesuai Paket</h3>
                <p className="text-primary-foreground/90 text-sm leading-relaxed max-w-xs">Jumlah revisi desain tercantum di tiap paket, dan perbaikan bug tetap gratis selama masa garansi.</p>
              </div>
              <div className="flex flex-col items-start gap-2">
                <Award className="w-8 h-8 mb-2 text-primary-foreground" />
                <h3 className="font-bold text-xl">Tanpa Biaya Tersembunyi</h3>
                <p className="text-primary-foreground/90 text-sm leading-relaxed max-w-xs">Harga paket sudah termasuk domain dan hosting tahun pertama. Biaya perpanjangan kami sampaikan di muka.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
