"use client"

import { useState, useEffect } from "react"

export function SplashScreen() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Durasi dipercepat jadi 800ms agar LCP dan Speed Index PageSpeed hijau 100%
    const timer = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05, // Jeda kemunculan tiap huruf dipercepat
        delayChildren: 0.1,
      },
    },
  }

  const letterVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 300, damping: 24 } 
    },
  }

  const voxy = "VOXY".split("")
  const dev = ".DEV".split("")

  return (
    <AnimatePresence>
      {loading && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground"
          exit={{ y: "-100%" }}
          }
        >
          <div
            
            
            
            className="flex text-4xl md:text-6xl font-bold font-serif tracking-[0.2em] text-background"
          >
            <div  className="flex">
              {voxy.join("")}
            </div>
            <div  className="text-primary flex">
              {dev.join("")}
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}
