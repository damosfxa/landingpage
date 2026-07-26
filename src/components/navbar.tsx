"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

const navLinks = [
  { name: "Tentang", href: "#tentang" },
  { name: "Yang Anda dapatkan", href: "#kelebihan" },
  { name: "Harga", href: "#harga" },
]

const waLink =
  "https://wa.me/6285111601910?text=Halo%20Voxy%2C%20saya%20ingin%20konsultasi%20untuk%20pembuatan%20website%20travel.%20Boleh%20dibantu%3F"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 bg-background transition-colors ${
        isScrolled ? "border-b border-border" : ""
      }`}
    >
      <nav className="mx-auto max-w-6xl px-6">
        <div className="flex h-20 items-center justify-between">
          <a href="#" className="font-serif text-2xl font-semibold tracking-tight text-foreground">
            Voxy<span className="text-primary">.dev</span>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.name}
              </a>
            ))}
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Konsultasi gratis
            </a>
          </div>

          <button
            type="button"
            className="text-foreground md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
          >
            {isMobileMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="border-b border-border bg-background md:hidden">
          <div className="space-y-4 px-6 py-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                {link.name}
              </a>
            ))}
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block rounded-md bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground"
            >
              Konsultasi gratis
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
