"use client"
import { motion } from "framer-motion"
import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { faqs } from "@/lib/data/faq"

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="block text-sm font-semibold uppercase tracking-widest text-primary mb-4">Tanya Jawab</span>
          <h2 className="mt-4 font-serif text-3xl font-bold leading-tight text-foreground md:text-5xl">
            Pertanyaan yang Sering Diajukan
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              key={i}
              className="border border-border rounded-2xl bg-card overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
                aria-controls={`faq-answer-${i}`}
                className="flex w-full items-start justify-between p-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
              >
                <span className="font-serif text-lg font-bold text-foreground pr-4">{faq.q}</span>
                <ChevronDown className={`h-5 w-5 mt-1 flex-shrink-0 text-primary transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`} />
              </button>
              <div
                id={`faq-answer-${i}`}
                // Jawaban yang tertutup hanya disembunyikan lewat max-height dan
                // opacity, jadi teksnya tetap ada di DOM dan tetap diumumkan
                // pembaca layar berurutan seolah semua akordion terbuka.
                // `inert` mencabutnya dari accessibility tree tanpa mengganggu
                // transisi, dan tidak menghalangi Google membaca isinya.
                inert={openIndex !== i}
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === i ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="px-6 pb-6 text-muted-foreground leading-relaxed max-w-prose">
                  {faq.a}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
