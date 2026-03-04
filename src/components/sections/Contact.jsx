import { useState } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await emailjs.send(
        'service_u0tlg4j',
        'template_151gzde',
        { name: form.name, email: form.email, message: form.message },
        'SlGX6aBxke3yPGteJ'
      )
      setStatus('sent')
      setForm({ name: '', email: '', message: '' })
      setTimeout(() => setStatus(''), 3000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus(''), 3000)
    }
  }

  const socials = [
    {
      name: 'GitHub',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
        </svg>
      ),
      href: 'https://github.com/uzairrather',
      color: '#ffffff',
    },
    {
      name: 'LinkedIn',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      href: 'https://www.linkedin.com/in/ausif-rth-4014ba271',
      color: '#0077b5',
    },
    {
      name: 'Email',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
      href: 'mailto:uzairrather3147@gmail.com',
      color: '#00ff87',
    },
    {
      name: 'WhatsApp',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
        </svg>
      ),
      href: 'https://wa.me/917051574421',
      color: '#25d366',
    },
  ]

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-mono-custom text-accent text-xs tracking-widest mb-4">GET IN TOUCH</p>
          <h2 className="font-display text-5xl md:text-6xl font-bold">
            Let's <span className="text-gradient">Work Together</span>
          </h2>
          <p className="text-text-dim mt-4 max-w-md mx-auto">
            Open to full-stack MERN projects, React Native apps, and freelance opportunities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-display text-2xl font-bold mb-6">Direct Contact</h3>

            {[
              { label: 'Email', value: 'uzairrather3147@gmail.com', href: 'mailto:uzairrather3147@gmail.com' },
              { label: 'Phone', value: '+91 7051574421', href: 'tel:+917051574421' },
              { label: 'Location', value: 'Kashmir, India', href: null },
              { label: 'Availability', value: 'Open to new projects', href: null },
            ].map(item => (
              <div key={item.label} className="flex items-start gap-4 mb-6">
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                  <span className="w-2 h-2 bg-accent rounded-full" />
                </div>
                <div>
                  <div className="text-text-dim text-xs font-mono-custom tracking-widest mb-0.5">{item.label.toUpperCase()}</div>
                  {item.href ? (
                    <a href={item.href} className="text-text hover:text-accent transition-colors">{item.value}</a>
                  ) : (
                    <span className="text-text">{item.value}</span>
                  )}
                </div>
              </div>
            ))}

            <div className="flex gap-3 mt-8">
              {socials.map(s => (
                <motion.a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-11 h-11 glass border border-border rounded-xl flex items-center justify-center text-text-dim hover:text-accent hover:border-accent/30 transition-colors"
                  title={s.name}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { id: 'name', label: 'Your Name', type: 'text', placeholder: 'John Doe' },
                { id: 'email', label: 'Email Address', type: 'email', placeholder: 'john@example.com' },
              ].map(f => (
                <div key={f.id}>
                  <label className="block text-text-dim text-xs font-mono-custom tracking-widest mb-2">
                    {f.label.toUpperCase()}
                  </label>
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    value={form[f.id]}
                    onChange={e => setForm(p => ({ ...p, [f.id]: e.target.value }))}
                    required
                    className="w-full glass border border-border rounded-xl px-4 py-3 text-text placeholder:text-text-dim focus:outline-none focus:border-accent/50 transition-colors"
                  />
                </div>
              ))}

              <div>
                <label className="block text-text-dim text-xs font-mono-custom tracking-widest mb-2">MESSAGE</label>
                <textarea
                  rows={5}
                  placeholder="Tell me about your project..."
                  value={form.message}
                  onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                  required
                  className="w-full glass border border-border rounded-xl px-4 py-3 text-text placeholder:text-text-dim focus:outline-none focus:border-accent/50 transition-colors resize-none"
                />
              </div>

              {status === 'sent' && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-400 text-sm text-center font-medium py-2 px-4 rounded-xl bg-green-400/10 border border-green-400/20"
                >
                  Message sent successfully! I'll get back to you soon.
                </motion.p>
              )}

              {status === 'error' && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm text-center font-medium py-2 px-4 rounded-xl bg-red-400/10 border border-red-400/20"
                >
                  Something went wrong. Please try again.
                </motion.p>
              )}

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(0,255,135,0.4)' }}
                whileTap={{ scale: 0.98 }}
                disabled={status === 'sending'}
                className="w-full py-4 bg-accent text-bg font-bold rounded-xl text-sm tracking-wide disabled:opacity-60"
              >
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}