"use client"
import { ReactLenis } from "@studio-freight/react-lenis"
import { cancelFrame, frame } from "framer-motion"
import { useEffect, useRef } from "react"

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lenisRef = useRef<any>(null)

  useEffect(() => {
    function update(time: any) {
      lenisRef.current?.lenis?.raf(time?.timestamp || time)
    }

    // Unify Framer Motion and Lenis rAF
    frame.update(update, true)
    return () => cancelFrame(update)
  }, [])

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }}
      autoRaf={false} // Disable Lenis' default rAF
    >
      {/* @ts-expect-error React 19 type incompatibility */}
      {children}
    </ReactLenis>
  )
}
