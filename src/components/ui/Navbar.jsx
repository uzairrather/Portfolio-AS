import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = ['Home', 'About', 'Skills', 'Experience', 'Projects', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('Home')
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
  const observers = []
  links.forEach((link) => {
    const el = document.getElementById(link.toLowerCase())
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setActive(link)
      },
      { threshold: 0.1, rootMargin: '-80px 0px -40% 0px' }
    )
    observer.observe(el)
    observers.push(observer)
  })
  return () => observers.forEach(o => o.disconnect())
}, [])

  const scrollTo = (id) => {
    const el = document.getElementById(id.toLowerCase())
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setActive(id)
    setMobileOpen(false)
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass border-b border-border' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          className="font-display text-xl font-bold cursor-pointer"
          whileHover={{ scale: 1.05 }}
          onClick={() => scrollTo('Home')}
        >
          <span className="text-white">AUSIF</span>
          <span className="text-gradient">.</span>
          <span className="text-text-dim font-mono-custom text-xs ml-2 tracking-widest">DEV</span>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className={`relative px-4 py-2 text-sm font-body transition-colors duration-200 ${
                active === link ? 'text-accent' : 'text-text-dim hover:text-text'
              }`}
            >
              {link}
              {active === link && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute bottom-0 left-2 right-2 h-0.5 bg-accent rounded-full"
                  style={{ boxShadow: '0 0 8px #00ff87' }}
                />
              )}
            </button>
          ))}
        </div>

        {/* CTA */}
        <motion.a
          href="/cv.pdf"
          download
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-bold text-bg bg-accent rounded-lg hover:bg-accent/90 transition-colors"
        >
          Download CV
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        </motion.a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-text-dim"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <div className={`w-5 h-0.5 bg-current mb-1 transition-all ${mobileOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
          <div className={`w-5 h-0.5 bg-current mb-1 transition-all ${mobileOpen ? 'opacity-0' : ''}`} />
          <div className={`w-5 h-0.5 bg-current transition-all ${mobileOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="glass border-t border-border px-6 pb-6 flex flex-col gap-2 md:hidden"
          >
            {links.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                className={`text-left py-3 border-b border-border text-sm ${
                  active === link ? 'text-accent' : 'text-text-dim'
                }`}
              >
                {link}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}