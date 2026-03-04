import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects } from '../../data/portfolio'

export default function Projects() {
  const [hovered, setHovered] = useState(null)
  const [filter, setFilter] = useState('All')

  const categories = ['All', 'Full-Stack', 'Odoo / ERP', 'E-Commerce', 'React / Next.js']
  const filtered = filter === 'All' ? projects : projects.filter(p =>
    p.category.toLowerCase().includes(filter.toLowerCase().replace(' / ', '').split(' ')[0])
  )

  return (
    <section id="projects" className="relative py-32 overflow-hidden">
      {/* Blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent-2/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-mono-custom text-accent text-xs tracking-widest mb-4">PORTFOLIO</p>
          <h2 className="font-display text-5xl md:text-6xl font-bold">
            Featured <span className="text-gradient">Projects</span>
          </h2>
        </motion.div>

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                filter === cat
                  ? 'bg-accent text-bg font-bold'
                  : 'glass border border-border text-text-dim hover:text-text'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Cards grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filtered.map((project, i) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                onHoverStart={() => setHovered(project.title)}
                onHoverEnd={() => setHovered(null)}
                className="project-card glass border border-border rounded-2xl overflow-hidden cursor-pointer group"
                style={{
                  borderColor: hovered === project.title ? `${project.color}30` : undefined,
                }}
              >
                {/* Card header */}
                <div
                  className="p-6 relative overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${project.color}08, transparent)` }}
                >
                  <div
                    className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20"
                    style={{ background: project.color }}
                  />
                  <div className="flex items-start justify-between mb-4 relative z-10">
                    <div className="text-4xl">{project.icon}</div>
                    <span
                      className="text-xs px-2.5 py-1 rounded-full border font-mono-custom tracking-wide"
                      style={{
                        color: project.color,
                        borderColor: `${project.color}40`,
                        background: `${project.color}10`,
                      }}
                    >
                      {project.category}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-text mb-2">{project.title}</h3>
                  <p className="text-text-dim text-sm leading-relaxed">{project.description}</p>
                </div>

                {/* Stats */}
                <div className="px-6 py-4 border-t border-border flex justify-around">
                  {Object.entries(project.stats).map(([key, val]) => (
                    <div key={key} className="text-center">
                      <div className="font-display font-bold text-lg" style={{ color: project.color }}>
                        {val}
                      </div>
                      <div className="text-text-dim text-xs capitalize">{key}</div>
                    </div>
                  ))}
                </div>

                {/* Tech stack */}
                <div className="px-6 pb-5 flex flex-wrap gap-1.5">
                  {project.tech.map(t => (
                    <span
                      key={t}
                      className="text-xs px-2 py-0.5 rounded-lg bg-surface border border-border text-text-dim"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Hover CTA */}
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={hovered === project.title ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-5">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 rounded-xl text-sm font-bold text-bg flex items-center justify-center"
                      style={{ background: project.color }}
                    >
                      View Live
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
