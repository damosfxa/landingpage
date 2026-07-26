import { ChevronDown } from "lucide-react"
import { faqs } from "@/lib/data/faq"

export function FAQSection() {
  return (
    <section className="border-b border-border bg-background py-24">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="font-serif text-3xl font-semibold leading-tight text-foreground md:text-4xl">
          Pertanyaan yang sering diajukan
        </h2>

        <div className="mt-12 divide-y divide-border border-t border-border">
          {faqs.map((faq, i) => (
            <details key={faq.q} className="group py-5" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-serif text-lg font-semibold text-foreground marker:hidden">
                {faq.q}
                <ChevronDown
                  aria-hidden="true"
                  className="mt-1 h-5 w-5 shrink-0 text-primary transition-transform group-open:rotate-180"
                />
              </summary>
              <p className="mt-3 pr-8 leading-relaxed text-muted-foreground">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
