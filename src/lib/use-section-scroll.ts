"use client";

import { useLenis } from "lenis/react";
import type { MouseEvent } from "react";

/**
 * Tinggi navbar fixed (`h-20` = 80px) plus sedikit ruang bernapas.
 *
 * Harus sejalan dengan `scroll-mt-24` (96px) di setiap section target, supaya
 * anchor native dan Lenis mendarat di titik yang sama. Tanpa offset ini, judul
 * section selalu tertutup navbar setelah diklik.
 */
export const SECTION_SCROLL_OFFSET = 96;

/**
 * Satu perilaku untuk semua navigasi anchor di landing page.
 *
 * Sebelumnya navbar memakai `lenis.scrollTo` sementara hero dan modal portofolio
 * memakai anchor native, sehingga aksi yang sama terasa berbeda tergantung dari
 * mana diklik.
 */
export function useSectionScroll() {
  const lenis = useLenis();

  return function scrollToSection(event: MouseEvent<HTMLAnchorElement>, href: string) {
    if (!href.startsWith("#")) return;

    // Kalau Lenis belum siap, biarkan browser menangani anchor-nya. Mencegat
    // klik lalu gagal scroll (bug lama tombol logo) lebih buruk daripada
    // lompatan instan.
    if (!lenis) return;

    event.preventDefault();

    if (href === "#") {
      lenis.scrollTo(0);
      return;
    }

    lenis.scrollTo(href, { offset: -SECTION_SCROLL_OFFSET });
  };
}
