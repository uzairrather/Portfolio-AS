import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LoadingScreen from './components/ui/LoadingScreen'
import ParticleField from './components/ui/ParticleField'
import Navbar from './components/ui/Navbar'
import Footer from './components/ui/Footer'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Skills from './components/sections/Skills'
import Experience from './components/sections/Experience'
import Projects from './components/sections/Projects'
import Contact from './components/sections/Contact'
import { useCustomCursor } from './hooks/useCustomCursor'

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const { dotRef, ringRef } = useCustomCursor()

  return (
    <>
      {/* Custom cursor */}
      <div ref={dotRef} className="cursor-dot hidden md:block" />
      <div ref={ringRef} className="cursor-ring hidden md:block" />

      {/* Loading */}
      <LoadingScreen onComplete={() => setLoaded(true)} />

      {/* Main content */}
      <AnimatePresence>
        {loaded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <ParticleField />
            <Navbar />

            <main className="relative z-10">
              <Hero />
              <About />
              <Skills />
              <Experience />
              <Projects />
              <Contact />
            </main>

            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
