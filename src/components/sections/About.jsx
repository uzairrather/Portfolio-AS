import { motion } from 'framer-motion'
import { useScrollReveal } from '../../hooks/useScrollReveal'

const highlights = [
  { icon: '⚡', label: 'Fast Delivery', desc: 'Production-ready code in record time' },
  { icon: '🔒', label: 'Secure by Default', desc: 'JWT auth, RBAC & 15 attack vectors covered' },
  { icon: '🌍', label: 'Global Clients', desc: 'USA, UK, India — remote-first workflow' },
  { icon: '🚀', label: 'Full Deployment', desc: 'AWS, Vercel, Render — CI/CD pipelines' },
]

export default function About() {
  const { ref, isVisible } = useScrollReveal()

  return (
    <section id="about" className="relative py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left — Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <p className="font-mono-custom text-accent text-xs tracking-widest mb-4">ABOUT ME</p>
              <h2 className="font-display text-5xl md:text-6xl font-bold leading-tight mb-6">
                Turning Ideas{' '}
                <span className="text-gradient">Into</span>
                <br />Real Products
              </h2>
              <p className="text-text-dim text-base leading-relaxed mb-6">
                I'm a Full Stack MERN Developer at <span className="text-accent">GoExalt System LLP</span>, based in Kashmir, India — working with clients across the USA and UK. I build scalable, secure web and mobile applications using React.js, Next.js, Node.js, Express.js, MongoDB, and React Native.
              </p>
              <p className="text-text-dim text-base leading-relaxed mb-8">
                My work includes WonderLeap — a gamified career platform for UK primary schools — AI-powered transcription apps, e-commerce solutions with OpenCart and USPS API integrations, and company websites with 3D animations. I take projects from database design all the way to production deployment with CI/CD, email security (DKIM/SPF/DMARC), and automated API testing with Jest & Supertest.
              </p>

              <div className="flex gap-4">
                <motion.a
                  href="/cv.pdf"
                  download
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 px-6 py-3 bg-accent text-bg font-bold rounded-xl text-sm"
                >
                  Download CV
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                </motion.a>
                <motion.a
                  href="mailto:uzairrather3147@gmail.com"
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 px-6 py-3 border border-border text-text rounded-xl text-sm glass hover:border-accent/40 transition-colors"
                >
                  Get in Touch
                </motion.a>
              </div>
            </motion.div>
          </div>

          {/* Right — Cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {highlights.map((h, i) => (
              <motion.div
                key={h.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
                whileHover={{ y: -4, borderColor: 'rgba(0,255,135,0.3)' }}
                className="glass p-6 rounded-2xl border border-border cursor-default"
              >
                <div className="text-3xl mb-3">{h.icon}</div>
                <div className="font-display font-bold text-text mb-1">{h.label}</div>
                <div className="text-text-dim text-sm">{h.desc}</div>
              </motion.div>
            ))}

            {/* Stats card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 }}
              className="col-span-2 glass p-6 rounded-2xl border border-border"
            >
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="text-center">
                  <div className="font-display text-2xl font-bold text-gradient">3+</div>
                  <div className="text-text-dim text-xs mt-1">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="font-display text-2xl font-bold text-gradient">30+</div>
                  <div className="text-text-dim text-xs mt-1">API Tests Written</div>
                </div>
                <div className="text-center">
                  <div className="font-display text-2xl font-bold text-gradient">5+</div>
                  <div className="text-text-dim text-xs mt-1">Projects Shipped</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center mb-1">
                    <span className="w-3 h-3 bg-accent rounded-full animate-pulse" />
                  </div>
                  <div className="font-mono-custom text-xs text-text-dim">Kashmir, India 🏔️</div>
                  <div className="text-text-dim text-xs">Serving USA & UK</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}