"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      q: "Berapa lama proses pengerjaan website?",
      a: "Untuk paket Essential biasanya memakan waktu 3-5 hari kerja. Sedangkan untuk paket Professional yang lebih kompleks membutuhkan waktu sekitar 7-14 hari kerja agar hasilnya sempurna."
    },
    {
      q: "Apakah saya bisa mengubah harga paket travel sendiri nanti?",
      a: "Tentu. Saya mengintegrasikan akses administrator yang sangat mudah digunakan (seperti mengoperasikan media sosial). Anda bisa memperbarui harga, jadwal, dan ketersediaan paket kapan saja."
    },
    {
      q: "Apakah harga sudah termasuk domain dan server (hosting)?",
      a: "Ya, seluruh paket yang saya tawarkan sudah termasuk biaya pendaftaran Domain (.com/.id) dan Hosting berkecepatan tinggi gratis selama 1 tahun pertama."
    },
    {
      q: "Apakah ada garansi atau bantuan setelah website selesai?",
      a: "Saya memberikan garansi perbaikan bug dan dukungan teknis selama 1 tahun penuh. Anda bisa langsung menghubungi saya kapan saja jika mengalami kendala teknis."
    },
    {
      q: "Apakah saya harus menyiapkan foto dan teks tulisan sendiri?",
      a: "Saya bisa membantu menyediakan aset visual premium (foto berlisensi) yang relevan dengan travel. Namun untuk teks profil perusahaan, detail paket, dan harga, Anda yang menyediakannya. Jika Anda bingung, saya siap membantu merapikan kata-katanya agar menjual."
    },
    {
      q: "Bagaimana sistem pembayarannya?",
      a: "Untuk menjaga kepercayaan dan komitmen bersama, sistem pembayaran dibagi dua tahap: 50% Uang Muka (DP) sebelum proyek dimulai, dan 50% Pelunasan dibayarkan setelah website selesai 100% dan siap di-online-kan."
    },
    {
      q: "Apakah website ini aman dari serangan peretas (hacker)?",
      a: "Sangat aman. Berbeda dengan website WordPress tradisional yang rentan diretas, saya menggunakan arsitektur modern (Next.js & Supabase) dengan keamanan tingkat tinggi tingkat Enterprise, lengkap dengan sertifikat gembok hijau (SSL) otomatis."
    }
  ]

  return (
    <section className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Tanya Jawab</p>
          <h2 className="mt-4 font-serif text-3xl font-bold leading-tight text-foreground md:text-5xl">
            Pertanyaan yang Sering Diajukan
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              }
              }
              }
              }
              key={i}
              className="border border-border rounded-2xl bg-card overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-start justify-between p-6 text-left focus:outline-none"
              >
                <span className="font-serif text-lg font-bold text-foreground pr-4">{faq.q}</span>
                <ChevronDown className={`h-5 w-5 mt-1 flex-shrink-0 text-primary transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`} />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === i ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="px-6 pb-6 text-muted-foreground leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
