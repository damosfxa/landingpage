"use client"
import { motion } from "framer-motion"
import { Zap, ShieldCheck, Rocket, Headset } from "lucide-react"

export function FeaturesSection() {
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
    <section id="kelebihan" className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Standar Baru Website Travel</p>
          <h2 className="mt-4 font-serif text-4xl font-bold leading-tight text-foreground md:text-5xl">
            Lebih dari Sekadar Kartu Nama Digital. <span className="italic text-primary">Ini Etalase Bisnis Anda.</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Saya melengkapi website Anda dengan fondasi teknis esensial, memastikan bisnis Anda siap bersaing dan berkembang di dunia digital.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {[
            {
              icon: Zap,
              title: "Skor SEO & Performa 100/100",
              desc: "Website dioptimalkan penuh untuk Google. Kecepatan muat kilat memastikan calon jamaah tidak kabur ke kompetitor.",
              color: "text-blue-600",
              bg: "bg-blue-100",
            },
            {
              icon: ShieldCheck,
              title: "Legalitas & Integrasi Siskopatuh",
              desc: "Tampilkan izin resmi Kemenag, sertifikat, dan integrasi Siskopatuh untuk membangun tingkat kepercayaan (Trust) jamaah hingga 100%.",
              color: "text-emerald-600",
              bg: "bg-emerald-100",
            },
            {
              icon: Rocket,
              title: "Mesin Sales 24/7 (WA & CRM)",
              desc: "Setiap pengunjung langsung diarahkan ke WhatsApp Admin Anda. Website ini bukan brosur, tapi mesin closing otomatis.",
              color: "text-rose-600",
              bg: "bg-rose-100",
            },
            {
              icon: Headset,
              title: "Dukungan Teknis Penuh",
              desc: "Fokuslah melayani calon jamaah. Urusan pemeliharaan server, keamanan, dan update sistem biarkan Voxy yang menangani.",
              color: "text-purple-600",
              bg: "bg-purple-100",
            },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
            <motion.div
              key={i}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/30"
            >
              <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-primary transition-transform duration-500 ease-out group-hover:scale-x-100" />
              <motion.div 
                className={`mb-6 flex h-16 w-16 items-center justify-center rounded-xl ${item.bg} transition-colors`}
                whileHover={{ scale: 1.15, rotate: i % 2 === 0 ? 5 : -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <Icon className={`h-8 w-8 ${item.color}`} strokeWidth={1.5} />
              </motion.div>
              <h3 className="font-serif text-xl font-bold text-foreground">{item.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
            </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
