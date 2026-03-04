import { useEffect, useRef } from 'react'

export function useCustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const pos = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let animId

    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      dot.style.left = `${e.clientX - 4}px`
      dot.style.top = `${e.clientY - 4}px`
    }

    const animate = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12
      ring.style.left = `${ringPos.current.x - 20}px`
      ring.style.top = `${ringPos.current.y - 20}px`
      animId = requestAnimationFrame(animate)
    }

    const onEnter = () => {
      dot.style.transform = 'scale(3)'
      ring.style.transform = 'scale(1.5)'
      ring.style.opacity = '0.5'
    }
    const onLeave = () => {
      dot.style.transform = 'scale(1)'
      ring.style.transform = 'scale(1)'
      ring.style.opacity = '1'
    }

    document.addEventListener('mousemove', move)
    document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    animId = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', move)
      cancelAnimationFrame(animId)
    }
  }, [])

  return { dotRef, ringRef }
}
