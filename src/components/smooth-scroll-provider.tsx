"use client"
import { ReactLenis, type LenisRef } from "lenis/react"
import { MotionConfig, cancelFrame, frame, useReducedMotion } from "framer-motion"
import { useEffect, useRef } from "react"

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<LenisRef>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    function update(time: number | { timestamp: number }) {
      lenisRef.current?.lenis?.raf(typeof time === 'number' ? time : time?.timestamp)
    }

    // Unify Framer Motion and Lenis rAF
    frame.update(update, true)
    return () => cancelFrame(update)
  }, [])

  return (
    // `reducedMotion="user"` mematikan animasi transform di SEMUA komponen
    // motion di bawahnya (setiap `whileInView` di sections) begitu sistem
    // pengunjung meminta, tanpa perlu menyentuh tiap section satu per satu.
    // Animasi opacity tetap jalan, jadi kontennya tidak muncul mendadak.
    <MotionConfig reducedMotion="user">
      <ReactLenis
        ref={lenisRef}
        root
        options={{
          // Smooth scroll yang membajak scroll native adalah pemicu klasik bagi
          // pengguna dengan gangguan vestibular, dan sebelumnya tidak ada cara
          // mematikannya. Lenis tetap dipasang (supaya scrollTo dan scroll-lock
          // modal tetap satu jalur), hanya penghalusannya yang dinonaktifkan.
          lerp: prefersReducedMotion ? 1 : 0.1,
          duration: prefersReducedMotion ? 0 : 1.2,
          smoothWheel: !prefersReducedMotion,
          autoRaf: false,
        }}
      >
        {children}
      </ReactLenis>
    </MotionConfig>
  )
}
