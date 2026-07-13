"use client"
import { motion } from "framer-motion"
import { Check, Star, ArrowRight } from "lucide-react"

export function PricingSection() {
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

  const plans = [
    {
      name: "Essential Plan",
      price: "1.5 Jt",
      originalPrice: "3 Jt",
      desc: "Cocok untuk travel agent yang baru merintis kehadiran digital.",
      features: [
        "1 Halaman (Landing Page Panjang)",
        "Desain Responsif (Tampil Sempurna di HP)",
        "Gratis Domain (.com/.id) 1 Tahun",
        "Gratis Hosting Standar 1 Tahun",
        "Tombol WhatsApp Terintegrasi",
        "Formulir Kontak Sederhana",
        "Integrasi Google Maps",
        "Keamanan SSL (HTTPS)",
        "Revisi Desain Maksimal 2x"
      ],
      popular: false,
    },
    {
      name: "Professional Plan",
      price: "3 Jt",
      originalPrice: "5.5 Jt",
      desc: "Solusi lengkap untuk brand travel yang ingin tampil mewah.",
      features: [
        "Website Multi-Halaman (S/d 5 Halaman)",
        "Desain Premium dengan Animasi Elegan",
        "Navigasi Mulus (Smooth Scroll)",
        "Sistem Admin: Kelola Harga & Paket Sendiri",
        "Optimasi SEO Dasar (Ramah Google)",
        "Gratis Domain & Hosting Premium 1 Tahun",
        "Email Perusahaan (halo@travelanda.com)",
        "Keamanan SSL & Backup Data",
        "Revisi Desain Maksimal 5x"
      ],
      popular: true,
    },
    {
      name: "Enterprise Plan",
      price: "7.5+ Jt",
      originalPrice: "12 Jt",
      desc: "Sistem khusus dengan fitur booking dan pembayaran otomatis.",
      features: [
        "Halaman Website Tanpa Batas (Unlimited)",
        "Sistem Booking Online Terintegrasi",
        "Pembayaran Otomatis (Payment Gateway)",
        "Desain UI/UX Eksklusif & Kustom 100%",
        "Sistem Admin Lanjutan (Manajemen Jamaah)",
        "Optimasi SEO Lanjutan & Google Analytics",
        "Gratis Server Cloud (Performa Maksimal)",
        "Prioritas Support & Maintenance VIP",
        "Garansi Revisi Tanpa Batas"
      ],
      popular: false,
    }
  ]

  return (
    <section id="harga" className="bg-secondary py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <span className="block text-sm font-semibold uppercase tracking-widest text-primary mb-4">Transparansi Harga</span>
          <h2 className="mt-4 font-serif text-4xl font-bold leading-tight text-foreground md:text-5xl">
            Pilih Paket yang Sesuai <br className="hidden md:block" />
            <span className="italic text-primary">dengan Skala Bisnis Anda</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Tidak ada biaya tersembunyi. Semua paket dirancang secara personal oleh saya untuk memberikan standar kualitas terbaik bagi brand Anda.
          </p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mt-8 inline-flex items-center gap-2 bg-destructive/10 text-destructive border border-destructive/20 rounded-full px-4 py-1.5 text-sm font-medium"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-destructive"></span>
            </span>
            Promo Harga Spesial Berakhir Bulan Ini
          </motion.div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-3"
        >
          {plans.map((plan, i) => (
            <motion.div 
              key={i} 
              variants={itemVariants} 
              className={`relative flex flex-col rounded-3xl border ${plan.popular ? 'border-2 border-primary bg-card shadow-xl shadow-primary/10' : 'border-border bg-card shadow-sm'} p-8`}
            >
              {plan.popular && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 rounded-full bg-primary px-4 py-1 text-xs font-bold uppercase tracking-widest text-primary-foreground">
                  <Star className="h-3 w-3 fill-current" /> Pilihan Eksekutif
                </span>
              )}
              
              <h2 className="font-serif text-2xl font-bold text-foreground">{plan.name}</h2>
              <span className="mt-4 text-sm text-muted-foreground">{plan.desc}</span>
              
              <div className="mt-8 flex items-baseline gap-2">
                <span className="text-xl font-semibold text-muted-foreground line-through decoration-destructive/50">Rp {plan.originalPrice}</span>
              </div>
              <div className="mt-1 flex items-baseline gap-x-1">
                <h2 className="text-2xl font-bold font-serif text-foreground mb-2">Rp {plan.price}</h2>
              </div>
              
              <a
                href={`https://wa.me/6285111601910?text=${encodeURIComponent(`Halo Voxy, saya tertarik dengan ${plan.name} untuk pembuatan website travel. Boleh minta info lebih lanjut?`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-8 flex items-center justify-center gap-2 rounded-xl px-6 py-4 text-base font-semibold transition-all ${
                  plan.popular
                    ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-[1.02]"
                    : "border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground"
                }`}
              >
                Ambil {plan.name} <ArrowRight className="h-4 w-4" />
              </a>
              
              <ul className="mt-10 flex-1 space-y-4">
                {i > 0 && (
                  <li className="mb-2 pb-2 text-sm font-bold text-foreground border-b border-border/50">
                    Semua fitur di paket {i === 1 ? "Essential" : "Essential & Professional"}, ditambah:
                  </li>
                )}
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex gap-4">
                    <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${plan.popular ? 'bg-primary/20' : 'bg-primary/10'} text-primary`}>
                      <Check className="h-4 w-4" />
                    </div>
                    <span className={`text-sm ${plan.popular ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
