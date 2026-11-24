'use client'

import { useEffect, useRef } from 'react'

interface Petal {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  vx: number
  vy: number
  angle: number
  spin: number
  tumble: number
  tumbleSpeed: number
  swayPhase: number
  swayAmp: number
  opacity: number
}

interface TrailPoint {
  x: number
  y: number
  age: number
}

// Authentic notched single sakura petal path in local unit coordinates (-1..1)
function drawSakuraPetal(ctx: CanvasRenderingContext2D, size: number) {
  ctx.beginPath()
  ctx.moveTo(0, size * 0.85)
  ctx.bezierCurveTo(size * 0.62, size * 0.42, size * 0.82, -size * 0.35, size * 0.26, -size * 0.88)
  ctx.lineTo(0, -size * 0.64) // Iconic V-notch at tip of cherry blossom petal
  ctx.lineTo(-size * 0.26, -size * 0.88)
  ctx.bezierCurveTo(-size * 0.82, -size * 0.35, -size * 0.62, size * 0.42, 0, size * 0.85)
  ctx.closePath()
}

export default function StudioAtmosphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    // Create 14 sparse, delicate depth-of-field petals that drift continuously on their own
    const petalCount = width < 640 ? 8 : 14
    const petals: Petal[] = Array.from({ length: petalCount }, (_, i) => {
      const depth = i % 3 // 0 = far, 1 = mid, 2 = soft foreground
      const size = depth === 0 ? 5.5 : depth === 1 ? 8.5 : 12.5
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        size,
        speedX: -0.18 - Math.random() * 0.24 - depth * 0.06,
        speedY: 0.26 + Math.random() * 0.32 + depth * 0.08,
        vx: 0,
        vy: 0,
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.008,
        tumble: Math.random() * Math.PI * 2,
        tumbleSpeed: 0.012 + Math.random() * 0.014,
        swayPhase: Math.random() * Math.PI * 2,
        swayAmp: 0.22 + Math.random() * 0.28,
        opacity: depth === 0 ? 0.16 : depth === 1 ? 0.26 : 0.19,
      }
    })

    // Smooth cursor aura + silky trail
    let pointerActive = false
    let targetX = width * 0.5
    let targetY = height * 0.35
    let smoothX = targetX
    let smoothY = targetY
    let prevX = targetX
    let prevY = targetY
    const trail: TrailPoint[] = []

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return
      if (!pointerActive) {
        pointerActive = true
        smoothX = e.clientX
        smoothY = e.clientY
        prevX = e.clientX
        prevY = e.clientY
      }
      targetX = e.clientX
      targetY = e.clientY
    }
    window.addEventListener('pointermove', onPointerMove, { passive: true })

    let rafId = 0
    let frame = 0

    const render = () => {
      frame++
      ctx.clearRect(0, 0, width, height)

      const isLight = document.documentElement.getAttribute('data-theme') === 'light'

      // Update smooth pointer & append trail point when moving
      if (pointerActive) {
        smoothX += (targetX - smoothX) * 0.16
        smoothY += (targetY - smoothY) * 0.16
        const dx = smoothX - prevX
        const dy = smoothY - prevY
        const speed = Math.hypot(dx, dy)

        if (speed > 0.6) {
          trail.push({ x: smoothX, y: smoothY, age: 0 })
          if (trail.length > 26) trail.shift()
        }

        // Draw soft ambient cursor halo (visible in BOTH Dark & Light modes)
        const auraRadius = 260
        const aura = ctx.createRadialGradient(smoothX, smoothY, 0, smoothX, smoothY, auraRadius)
        if (isLight) {
          aura.addColorStop(0, 'rgba(212, 82, 116, 0.11)')
          aura.addColorStop(0.45, 'rgba(226, 120, 148, 0.045)')
          aura.addColorStop(1, 'rgba(226, 120, 148, 0)')
        } else {
          aura.addColorStop(0, 'rgba(242, 158, 178, 0.085)')
          aura.addColorStop(0.45, 'rgba(218, 128, 156, 0.03)')
          aura.addColorStop(1, 'rgba(242, 158, 178, 0)')
        }
        ctx.fillStyle = aura
        ctx.fillRect(smoothX - auraRadius, smoothY - auraRadius, auraRadius * 2, auraRadius * 2)

        // Draw silky tapered Sakura ribbon trail
        for (let i = trail.length - 1; i >= 0; i--) {
          trail[i].age += 0.038
          if (trail[i].age >= 1) {
            trail.splice(i, 1)
          }
        }

        if (trail.length > 3) {
          // Layered continuous quadratic Bézier ribbons — zero joint overlap artifacts
          const layers = [0, 0.28, 0.54, 0.76]
          for (const startFrac of layers) {
            const startIdx = Math.floor(trail.length * startFrac)
            if (trail.length - startIdx < 3) continue

            ctx.beginPath()
            ctx.moveTo(trail[startIdx].x, trail[startIdx].y)
            for (let i = startIdx + 1; i < trail.length - 1; i++) {
              const midX = (trail[i].x + trail[i + 1].x) * 0.5
              const midY = (trail[i].y + trail[i + 1].y) * 0.5
              ctx.quadraticCurveTo(trail[i].x, trail[i].y, midX, midY)
            }
            const last = trail[trail.length - 1]
            ctx.lineTo(last.x, last.y)

            const weight = 0.25 + startFrac * 0.75
            const alpha = (isLight ? 0.065 : 0.055) * (0.6 + startFrac)
            ctx.strokeStyle = isLight
              ? `rgba(204, 72, 108, ${alpha})`
              : `rgba(244, 166, 185, ${alpha})`
            ctx.lineWidth = weight * 11
            ctx.lineCap = 'round'
            ctx.lineJoin = 'round'
            ctx.stroke()
          }
        }

        prevX = smoothX
        prevY = smoothY
      }

      // Update & draw drifting 3D Sakura petals
      for (const p of petals) {
        p.swayPhase += 0.014
        p.tumble += p.tumbleSpeed
        p.angle += p.spin + Math.sin(p.swayPhase) * 0.003

        // Gentle breeze nudge from cursor
        if (pointerActive) {
          const distX = p.x - smoothX
          const distY = p.y - smoothY
          const distSq = distX * distX + distY * distY
          if (distSq < 19600 && distSq > 1) {
            const dist = Math.sqrt(distSq)
            const force = (1 - dist / 140) * 0.045
            p.vx += (distX / dist) * force
            p.vy += (distY / dist) * force
          }
        }

        p.vx *= 0.96
        p.vy *= 0.96

        p.x += p.speedX + Math.sin(p.swayPhase) * p.swayAmp + p.vx
        p.y += p.speedY + Math.cos(p.swayPhase * 0.7) * 0.08 + p.vy

        // Seamless wrap around viewport
        if (p.y > height + 24) {
          p.y = -24
          p.x = Math.random() * (width + 120)
        }
        if (p.x < -30) {
          p.x = width + 24
        } else if (p.x > width + 30) {
          p.x = -24
        }

        const scaleY = Math.max(0.22, Math.abs(Math.cos(p.tumble)))
        const shimmer = 0.85 + 0.15 * Math.sin(frame * 0.02 + p.swayPhase)
        const alpha = p.opacity * shimmer * (isLight ? 1.25 : 1)

        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.angle)
        ctx.scale(1, scaleY)

        drawSakuraPetal(ctx, p.size)
        ctx.fillStyle = isLight
          ? `rgba(214, 90, 124, ${alpha})`
          : `rgba(245, 174, 192, ${alpha})`
        ctx.fill()
        ctx.restore()
      }

      rafId = window.requestAnimationFrame(render)
    }

    rafId = window.requestAnimationFrame(render)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
      window.cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div aria-hidden="true" className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Warm Sakura Atmospheric Halo (Top Right / Hero Backdrop) */}
      <div
        className="animate-aura-pulse absolute -top-[14%] right-[-8%] w-[640px] h-[640px] sm:w-[860px] sm:h-[860px] rounded-full flex items-center justify-center"
        style={{
          background:
            'radial-gradient(circle, var(--bloom-primary) 0%, var(--bloom-secondary) 38%, transparent 70%)',
        }}
      >
        {/* Subtle Architectural 5-Petal Sakura Silhouette Merged Into Halo */}
        <svg
          viewBox="-200 -200 400 400"
          className="animate-sakura-bloom w-[76%] h-[76%] opacity-55 dark:opacity-40"
          style={{
            maskImage: 'radial-gradient(circle, rgba(0,0,0,0.95) 18%, rgba(0,0,0,0.35) 56%, transparent 78%)',
            WebkitMaskImage:
              'radial-gradient(circle, rgba(0,0,0,0.95) 18%, rgba(0,0,0,0.35) 56%, transparent 78%)',
          }}
        >
          <defs>
            <linearGradient id="sakuraBloomFill" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.03" />
              <stop offset="55%" stopColor="var(--accent)" stopOpacity="0.18" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.32" />
            </linearGradient>
          </defs>

          {[0, 72, 144, 216, 288].map((deg) => (
            <g key={deg} transform={`rotate(${deg})`}>
              {/* Authentic notched Japanese Sakura petal */}
              <path
                d="M 0 -10 C 26 -42, 72 -96, 42 -154 C 28 -176, 10 -168, 0 -146 C -10 -168, -28 -176, -42 -154 C -72 -96, -26 -42, 0 -10 Z"
                fill="url(#sakuraBloomFill)"
                stroke="var(--accent)"
                strokeOpacity="0.28"
                strokeWidth="0.85"
              />
              {/* Delicate botanical stamen line */}
              <line
                x1="0"
                y1="-12"
                x2="0"
                y2="-64"
                stroke="var(--accent)"
                strokeOpacity="0.22"
                strokeWidth="0.65"
              />
              <circle cx="0" cy="-66" r="1.6" fill="var(--accent)" fillOpacity="0.32" />
            </g>
          ))}
          <circle cx="0" cy="0" r="5" fill="var(--accent)" fillOpacity="0.22" />
        </svg>
      </div>

      {/* Soft Secondary Sakura Counter-Glow (Bottom Left) */}
      <div
        className="absolute -bottom-[20%] -left-[12%] w-[60vw] h-[55vh] rounded-full opacity-75"
        style={{
          background: 'radial-gradient(ellipse at center, var(--bloom-primary) 0%, transparent 70%)',
        }}
      />

      {/* 120fps Hardware Canvas: Continuous 3D Drifting Petals + Silky Trail */}
      <canvas ref={canvasRef} className="absolute inset-0 block" />
    </div>
  )
}
