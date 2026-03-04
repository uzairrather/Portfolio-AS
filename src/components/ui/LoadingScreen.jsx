import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval)
          setTimeout(() => { setDone(true); onComplete?.() }, 400)
          return 100
        }
        return p + Math.random() * 12
      })
    }, 80)
    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] bg-bg flex flex-col items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="font-display text-5xl font-bold mb-2">
              A<span className="text-accent">.</span>
            </div>
            <div className="font-mono-custom text-text-dim text-xs tracking-widest mb-10">
              LOADING PORTFOLIO
            </div>

            <div className="w-48 h-0.5 bg-surface rounded-full overflow-hidden mb-4">
              <motion.div
                className="loading-bar h-full rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>

            <div className="font-mono-custom text-accent text-sm">
              {Math.min(Math.round(progress), 100)}%
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
