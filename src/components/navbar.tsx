"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { useSectionScroll } from "@/lib/use-section-scroll"
import { trackWhatsAppClick } from "@/lib/analytics"
import { waLink } from "@/lib/constants"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const scrollToSection = useSectionScroll()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: "Tentang", href: "#tentang" },
    { name: "Yang Anda Dapatkan", href: "#kelebihan" },
    { name: "Harga", href: "#harga" },
  ]

  const waHref = waLink(
    "Halo Voxy, saya ingin konsultasi untuk pembuatan website travel. Boleh dibantu?",
  )

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    scrollToSection(e, href)
    setIsMobileMenuOpen(false)
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" as const }}
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <a href="#" aria-label="Beranda" onClick={(e) => handleNavClick(e, "#")} className="font-serif text-2xl font-bold tracking-tight text-foreground">
            Voxy<span className="text-primary"> Web Studio</span>
          </a>
          
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.name}
              </a>
            ))}
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick("navbar")}
              className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Konsultasi Gratis
            </a>
          </div>

          <button
            className="md:hidden text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        id="mobile-menu"
        initial={false}
        animate={{ height: isMobileMenuOpen ? "auto" : 0, opacity: isMobileMenuOpen ? 1 : 0 }}
        // Panel yang tertutup hanya disembunyikan lewat height/opacity, jadi
        // link di dalamnya tetap ada di DOM. Tanpa `inert`, pengguna keyboard
        // menekan Tab lalu fokusnya hilang ke menu tak kasat mata, dan pembaca
        // layar tetap mengumumkan isinya.
        inert={!isMobileMenuOpen}
        className="overflow-hidden bg-background md:hidden border-b border-border"
      >
        <div className="px-6 py-4 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="block text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              {link.name}
            </a>
          ))}
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              trackWhatsAppClick("navbar_mobile")
              setIsMobileMenuOpen(false)
            }}
            className="block w-full rounded-md bg-primary px-5 py-3 text-center text-sm font-semibold text-primary-foreground"
          >
            Konsultasi Gratis
          </a>
        </div>
      </motion.div>
    </motion.nav>
  )
}
