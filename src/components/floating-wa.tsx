"use client"
import { MessageCircle } from "lucide-react"
import { trackWhatsAppClick } from "@/lib/analytics"
import { waLink } from "@/lib/constants"

export function FloatingWA() {
  const href = waLink(
    "Halo Voxy, saya tertarik konsultasi untuk pembuatan website travel premium. Bisa dibantu?",
  )

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsAppClick("floating")}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#075E54] text-white shadow-lg shadow-black/20 transition-transform hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-[#075E54]/50"
      aria-label="Chat WhatsApp"
    >
      <MessageCircle className="h-7 w-7" aria-hidden="true" />
    </a>
  )
}
