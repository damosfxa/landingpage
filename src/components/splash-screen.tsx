"use client"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

export function SplashScreen() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {loading && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground"
            exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <motion.span
            className="text-4xl md:text-6xl font-bold font-serif tracking-tight text-background"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Voxy<span className="text-primary">.dev</span>
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
