import { MessageCircle } from "lucide-react"

const waLink =
  "https://wa.me/6285111601910?text=Halo%20Voxy%2C%20saya%20tertarik%20konsultasi%20untuk%20pembuatan%20website%20travel.%20Bisa%20dibantu%3F"

export function FloatingWA() {
  return (
    <a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#075E54] text-white shadow-md transition-colors hover:bg-[#054d45] focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      aria-label="Chat WhatsApp"
    >
      <MessageCircle className="h-6 w-6" aria-hidden="true" />
    </a>
  )
}
