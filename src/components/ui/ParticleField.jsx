import { useEffect, useRef } from 'react'

export default function ParticleField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId
    const mouse = { x: -9999, y: -9999 }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const nodes = []
    const pulses = []
    let t = 0

    class Node {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.vx = (Math.random() - 0.5) * 0.3
        this.vy = (Math.random() - 0.5) * 0.3
        this.r = Math.random() * 4 + 2
        this.pulse = Math.random() * Math.PI * 2
        this.pulseSpeed = Math.random() * 0.04 + 0.02
        this.color = Math.random() > 0.5 ? '0,255,135' : '0,150,255'
      }
      update() {
        this.pulse += this.pulseSpeed
        this.x += this.vx
        this.y += this.vy
        // mouse attraction
        const dx = mouse.x - this.x
        const dy = mouse.y - this.y
        const d = Math.sqrt(dx * dx + dy * dy)
        if (d < 200) {
          this.vx += dx * 0.0003
          this.vy += dy * 0.0003
        }
        // speed limit
        const spd = Math.sqrt(this.vx * this.vx + this.vy * this.vy)
        if (spd > 0.8) { this.vx *= 0.95; this.vy *= 0.95 }
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1
      }
      draw() {
        const a = 0.5 + 0.5 * Math.sin(this.pulse)
        // glow
        const g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r * 5)
        g.addColorStop(0, `rgba(${this.color},${a * 0.5})`)
        g.addColorStop(1, 'transparent')
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.r * 5, 0, Math.PI * 2)
        ctx.fillStyle = g
        ctx.fill()
        // core
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${this.color},${a})`
        ctx.fill()
        // bright center
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.r * 0.4, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${a * 0.8})`
        ctx.fill()
      }
    }

    class Pulse {
      constructor(from, to) {
        this.from = from
        this.to = to
        this.progress = 0
        this.speed = Math.random() * 0.02 + 0.015
        this.color = Math.random() > 0.5 ? '0,255,135' : '100,200,255'
      }
      update() {
        this.progress += this.speed
        return this.progress < 1
      }
      draw() {
        const x = this.from.x + (this.to.x - this.from.x) * this.progress
        const y = this.from.y + (this.to.y - this.from.y) * this.progress
        const alpha = 1 - this.progress
        // trail
        ctx.beginPath()
        ctx.arc(x, y, 3, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${this.color},${alpha})`
        ctx.fill()
        // glow
        const pg = ctx.createRadialGradient(x, y, 0, x, y, 14)
        pg.addColorStop(0, `rgba(${this.color},${alpha * 0.5})`)
        pg.addColorStop(1, 'transparent')
        ctx.beginPath()
        ctx.arc(x, y, 14, 0, Math.PI * 2)
        ctx.fillStyle = pg
        ctx.fill()
      }
    }

    function drawConnections() {
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < 160) {
            const alpha = (1 - d / 160) * 0.3
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = `rgba(0,200,255,${alpha})`
            ctx.lineWidth = 0.7
            ctx.stroke()
          }
        }
        // mouse connections
        const dx = nodes[i].x - mouse.x
        const dy = nodes[i].y - mouse.y
        const d = Math.sqrt(dx * dx + dy * dy)
        if (d < 200) {
          ctx.beginPath()
          ctx.moveTo(nodes[i].x, nodes[i].y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.strokeStyle = `rgba(0,255,135,${(1 - d / 200) * 0.5})`
          ctx.lineWidth = 0.8
          ctx.stroke()
        }
      }
    }

    resize()

    // create nodes
    for (let i = 0; i < 55; i++) nodes.push(new Node())

    const animate = () => {
      ctx.fillStyle = '#02050f'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // spawn pulses
      if (t % 35 === 0) {
        const a = nodes[Math.floor(Math.random() * nodes.length)]
        const b = nodes[Math.floor(Math.random() * nodes.length)]
        if (a !== b) pulses.push(new Pulse(a, b))
      }

      drawConnections()

      // update & draw pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        pulses[i].draw()
        if (!pulses[i].update()) pulses.splice(i, 1)
      }

      nodes.forEach(n => { n.update(); n.draw() })

      // mouse cursor glow
      if (mouse.x > 0 && mouse.x < canvas.width) {
        const mg = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 100)
        mg.addColorStop(0, 'rgba(0,255,135,0.06)')
        mg.addColorStop(1, 'transparent')
        ctx.beginPath()
        ctx.arc(mouse.x, mouse.y, 100, 0, Math.PI * 2)
        ctx.fillStyle = mg
        ctx.fill()
      }

      t++
      animId = requestAnimationFrame(animate)
    }

    animate()

    const onMouseMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY }
    const onMouseLeave = () => { mouse.x = -9999; mouse.y = -9999 }

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseleave', onMouseLeave)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      id="particle-canvas"
      className="fixed inset-0 pointer-events-none z-0"
    />
  )
}