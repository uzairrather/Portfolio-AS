import { useState } from 'react'
import { motion } from 'framer-motion'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { skills, skillCategories } from '../../data/portfolio'

const categoryColors = {
  Frontend: '#00ff87',
  Backend: '#0066ff',
  ERP: '#f59e0b',
  Database: '#ff006e',
  DevOps: '#8b5cf6',
  All: '#00ff87',
}

export default function Skills() {
  const { ref, isVisible } = useScrollReveal(0.1)
  const [active, setActive] = useState('All')

  const filtered = active === 'All' ? skills : skills.filter(s => s.category === active)

  return (
    <section id="skills" className="relative py-32 overflow-hidden">
      {/* Glow blobs */}
      <div className="absolute top-20 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent-2/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-mono-custom text-accent text-xs tracking-widest mb-4">TECHNICAL SKILLS</p>
          <h2 className="font-display text-5xl md:text-6xl font-bold">
            My <span className="text-gradient">Arsenal</span>
          </h2>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {skillCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                active === cat
                  ? 'bg-accent text-bg font-bold'
                  : 'glass border border-border text-text-dim hover:text-text'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Skills grid */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((skill, i) => {
            const color = categoryColors[skill.category] || '#00ff87'
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.06, duration: 0.6 }}
                whileHover={{ scale: 1.01 }}
                className="glass border border-border rounded-xl p-5"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ background: color, boxShadow: `0 0 8px ${color}` }}
                    />
                    <span className="font-display font-semibold text-text">{skill.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className="text-xs px-2 py-0.5 rounded-full border"
                      style={{ color, borderColor: `${color}40`, background: `${color}10` }}
                    >
                      {skill.category}
                    </span>
                    <span className="font-mono-custom text-sm font-bold" style={{ color }}>
                      {skill.level}%
                    </span>
                  </div>
                </div>

                {/* Bar */}
                <div className="h-1.5 bg-bg rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full relative"
                    initial={{ width: 0 }}
                    animate={isVisible ? { width: `${skill.level}%` } : { width: 0 }}
                    transition={{ delay: 0.3 + i * 0.05, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    style={{ background: `linear-gradient(90deg, ${color}80, ${color})` }}
                  >
                    <span
                      className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
                      style={{ background: color, boxShadow: `0 0 10px ${color}` }}
                    />
                  </motion.div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
