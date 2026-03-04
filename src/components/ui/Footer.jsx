import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="font-display text-lg font-bold">
          AUSIF<span className="text-accent">.</span>
          <span className="text-text-dim font-mono-custom text-xs ml-2 tracking-widest">DEV</span>
        </div>
        <p className="text-text-dim text-sm font-mono-custom">
          Built with React + Vite + Three.js + Framer Motion
        </p>
        <p className="text-text-dim text-sm">
          © {new Date().getFullYear()} — All rights reserved
        </p>
      </div>
    </footer>
  )
}
