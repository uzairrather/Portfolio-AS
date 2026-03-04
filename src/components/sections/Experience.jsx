import { motion } from 'framer-motion'
import { experiences } from '../../data/portfolio'

export default function Experience() {
  return (
    <section id="experience" className="relative py-32 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="font-mono-custom text-accent text-xs tracking-widest mb-4">CAREER JOURNEY</p>
          <h2 className="font-display text-5xl md:text-6xl font-bold">
            Experience <span className="text-gradient">&</span> Work
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-px">
            <div className="timeline-line w-full h-full opacity-30" />
          </div>

          {experiences.map((exp, i) => {
            const isLeft = i % 2 === 0
            return (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className={`relative flex mb-12 ${
                  isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                } flex-row pl-12 md:pl-0`}
              >
                {/* Dot */}
                <div className="absolute left-0 md:left-1/2 top-6 w-8 h-8 md:-translate-x-4 -translate-x-4 rounded-full bg-bg border-2 border-accent flex items-center justify-center z-10"
                  style={{ boxShadow: '0 0 20px rgba(0,255,135,0.4)' }}
                >
                  <span className="w-2 h-2 bg-accent rounded-full" />
                </div>

                {/* Card */}
                <div className={`w-full md:w-[calc(50%-2rem)] ${isLeft ? 'md:pr-8' : 'md:pl-8'}`}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="glass border border-border rounded-2xl p-6 hover:border-accent/30 transition-colors"
                  >
                    {/* Period badge */}
                    <span className="inline-block px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-mono-custom tracking-widest mb-4">
                      {exp.period}
                    </span>

                    <h3 className="font-display text-xl font-bold text-text mb-1">{exp.role}</h3>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-accent font-semibold text-sm">{exp.company}</span>
                      <span className="text-text-dim text-xs">· {exp.location}</span>
                    </div>

                    <p className="text-text-dim text-sm leading-relaxed mb-4">{exp.description}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-lg bg-surface border border-border text-text-dim text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
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
