"use client"
import { motion } from "framer-motion"
import Image from "next/image"

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
    <section id="tentang" className="bg-secondary py-24 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col lg:flex-row items-center gap-16"
        >
          {/* Left Side: Cards */}
          <div className="flex-1 w-full relative">
            <div className="space-y-6 max-w-md mx-auto lg:mx-0 relative z-10">
              {[
                {
                  iconSrc: "/icons/code.svg",
                  title: "Performa Cepat Tanpa Jeda",
                  desc: "Website ringan dan responsif, memastikan calon tamu nyaman mengeksplorasi paket Anda tanpa frustrasi.",
                },
                {
                  iconSrc: "/icons/palette.svg",
                  title: "Dirancang untuk Navigasi Alami",
                  desc: "Saya menata informasi agar pengunjung mudah menemukan paket yang mereka cari dan langsung terhubung dengan tim Anda.",
                },
                {
                  iconSrc: "/icons/smartphone.svg",
                  title: "Optimal di Segala Perangkat",
                  desc: "Karena riset travel banyak dilakukan melalui ponsel, website Anda akan tampil sempurna di layar apa pun.",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="flex items-start gap-4 rounded-2xl bg-card p-6 shadow-sm border border-border transition-transform hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-transparent">
                    <Image src={item.iconSrc} alt={item.title} width={56} height={56} className="h-full w-full object-contain" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-serif text-lg font-bold text-foreground">{item.title}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Background blur decorative */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 blur-[80px] rounded-full z-0 pointer-events-none" />
          </div>

          {/* Right Side: Text */}
          <div className="flex-1 text-center lg:text-left space-y-6 z-10">
            <motion.div variants={itemVariants}>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">Mengapa Kredibilitas Digital Itu Penting?</p>
              <h2 className="mt-4 font-serif text-4xl font-bold leading-tight text-foreground md:text-5xl">
                Calon tamu Anda mempercayakan <br className="hidden lg:block" />
                <span className="italic text-primary">puluhan juta rupiah.</span>
              </h2>
            </motion.div>

            <motion.p variants={itemVariants} className="text-lg leading-relaxed text-muted-foreground">
              Keputusan untuk membeli paket umrah atau liburan keluarga bukanlah hal kecil. Saat calon klien mengunjungi website Anda, mereka mencari rasa aman dan profesionalisme. 
            </motion.p>

            <motion.p variants={itemVariants} className="text-lg leading-relaxed text-muted-foreground">
              Pastikan website Anda mencerminkan kualitas layanan Anda. Saya hadir untuk merancang ruang digital yang membangun kepercayaan sejak klik pertama.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
