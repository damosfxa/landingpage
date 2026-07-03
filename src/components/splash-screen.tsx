"use client"
import { motion, AnimatePresence, Variants } from "framer-motion"
import { useState, useEffect } from "react"

export function SplashScreen() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Durasi dipercepat jadi 1.2 detik (1200ms) agar LCP dan Speed Index PageSpeed hijau 100%
    const timer = setTimeout(() => setLoading(false), 1200)
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
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex text-4xl md:text-6xl font-bold font-serif tracking-[0.2em] text-background"
          >
            {voxy.map((char, index) => (
              <motion.span key={`v-${index}`} variants={letterVariants}>
                {char}
              </motion.span>
            ))}
            <div className="text-primary flex">
              {dev.map((char, index) => (
                <motion.span key={`d-${index}`} variants={letterVariants}>
                  {char}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
