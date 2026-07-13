"use client"
import { motion } from "framer-motion"
import { ShieldCheck, RefreshCw, HeartHandshake } from "lucide-react"

export function GuaranteeSection() {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  return (
    <section className="bg-background py-24 lg:py-32 overflow-hidden border-t border-b border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="rounded-3xl bg-primary text-primary-foreground p-8 md:p-16 text-center shadow-2xl relative overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-black/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 mx-auto max-w-3xl">
            <ShieldCheck className="w-16 h-16 mx-auto mb-6 text-primary-foreground/90" />
            <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6">
              Garansi Kepuasan 100%
            </h2>
            <p className="text-lg md:text-xl text-primary-foreground/90 mb-10 leading-relaxed">
              Sebagai spesialis yang berdedikasi secara personal untuk Anda, saya mempertaruhkan reputasi saya di setiap baris kode. Jika Anda tidak puas dengan hasil desainnya, saya akan melakukan revisi sampai Anda benar-benar jatuh cinta, atau uang Anda kembali.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6 text-left max-w-2xl mx-auto">
              <div className="flex flex-col items-start gap-2">
                <RefreshCw className="w-8 h-8 mb-2 text-primary-foreground" />
                <h3 className="font-bold text-xl">Revisi Tanpa Batas</h3>
                <p className="text-primary-foreground/90 text-sm leading-relaxed max-w-xs">Sampai desain benar-benar mencerminkan standar kemewahan brand travel Anda.</p>
              </div>
              <div className="flex flex-col items-start gap-2">
                <HeartHandshake className="w-8 h-8 mb-2 text-primary-foreground" />
                <h3 className="font-bold text-xl">Bebas Risiko</h3>
                <p className="text-primary-foreground/90 text-sm leading-relaxed max-w-xs">Tidak ada biaya tersembunyi. Dedikasi penuh dari saya, langsung tanpa perantara.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
