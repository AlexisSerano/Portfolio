'use client'
import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  size: number
  baseAlpha: number
  alpha: number
  alphaSpeed: number
  speedY: number
  speedX: number
  angle: number
  color: string
}

const GOLD_COLORS = [
  'rgba(212, 168, 67,',   // Signature Gold
  'rgba(245, 215, 133,',  // Bright Champagne
  'rgba(197, 154, 52,',   // Deep Bronze Gold
  'rgba(255, 235, 170,',  // Golden Shimmer
]

export default function GoldParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)
    let mouse = { x: -1000, y: -1000, active: false }

    const isMobile = width < 768
    const particleCount = isMobile ? 32 : 55

    const createParticle = (initialY?: number): Particle => {
      const size = Math.random() < 0.25 ? Math.random() * 1.5 + 1.8 : Math.random() * 1.2 + 0.8
      const baseAlpha = Math.random() * 0.45 + 0.25
      return {
        x: Math.random() * width,
        y: initialY !== undefined ? initialY : Math.random() * height,
        size,
        baseAlpha,
        alpha: baseAlpha,
        alphaSpeed: (Math.random() * 0.02 + 0.008) * (Math.random() > 0.5 ? 1 : -1),
        speedY: Math.random() * 0.35 + 0.15,
        speedX: (Math.random() - 0.5) * 0.25,
        angle: Math.random() * Math.PI * 2,
        color: GOLD_COLORS[Math.floor(Math.random() * GOLD_COLORS.length)],
      }
    }

    const particles: Particle[] = Array.from({ length: particleCount }, () => createParticle())

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      mouse.active = true
    }

    const handleMouseLeave = () => {
      mouse.active = false
      mouse.x = -1000
      mouse.y = -1000
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)

    let isVisible = true
    const handleVisibilityChange = () => {
      isVisible = !document.hidden
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render)
        return
      }

      ctx.clearRect(0, 0, width, height)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Vertical drift (upward)
        p.y -= p.speedY
        p.angle += 0.015
        p.x += Math.sin(p.angle) * p.speedX

        // Subtle alpha breathing / glimmer
        p.alpha += p.alphaSpeed
        if (p.alpha > p.baseAlpha + 0.25 || p.alpha < p.baseAlpha - 0.2) {
          p.alphaSpeed = -p.alphaSpeed
        }
        const currentAlpha = Math.max(0.08, Math.min(0.85, p.alpha))

        // Gentle cursor push (tactile repulsion within 110px)
        if (mouse.active) {
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 110) {
            const force = (110 - dist) / 110
            p.x += (dx / dist) * force * 1.5
            p.y += (dy / dist) * force * 1.5
          }
        }

        // Wrap around boundaries
        if (p.y < -10) {
          p.y = height + 10
          p.x = Math.random() * width
        }
        if (p.x < -10) p.x = width + 10
        if (p.x > width + 10) p.x = -10

        // Draw glowing particle
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `${p.color}${currentAlpha})`

        if (p.size > 2) {
          ctx.shadowBlur = 6
          ctx.shadowColor = 'rgba(212, 168, 67, 0.7)'
        } else {
          ctx.shadowBlur = 0
        }

        ctx.fill()
      }

      ctx.shadowBlur = 0
      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[1] w-full h-full select-none"
    />
  )
}
