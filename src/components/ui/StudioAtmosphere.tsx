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

function drawSakuraPetal(ctx: CanvasRenderingContext2D, size: number) {
  ctx.beginPath()
  ctx.moveTo(0, size * 0.85)
  ctx.bezierCurveTo(size * 0.62, size * 0.42, size * 0.82, -size * 0.35, size * 0.26, -size * 0.88)
  ctx.lineTo(0, -size * 0.64)
  ctx.lineTo(-size * 0.26, -size * 0.88)
  ctx.bezierCurveTo(-size * 0.82, -size * 0.35, -size * 0.62, size * 0.42, 0, size * 0.85)
  ctx.closePath()
}

// Pre-renders the 5-petal botanical Sakura bloom + soft radial halo ONCE to an offscreen bitmap
function createBloomSprite(isLight: boolean): HTMLCanvasElement {
  const size = 720
  const off = document.createElement('canvas')
  off.width = size
  off.height = size
  const c = off.getContext('2d')
  if (!c) return off

  const half = size / 2

  // 1. Soft atmospheric radial halo
  const halo = c.createRadialGradient(half, half, 0, half, half, half)
  if (isLight) {
    halo.addColorStop(0, 'rgba(224, 108, 138, 0.20)')
    halo.addColorStop(0.42, 'rgba(204, 132, 184, 0.09)')
    halo.addColorStop(0.76, 'rgba(224, 108, 138, 0)')
  } else {
    halo.addColorStop(0, 'rgba(242, 158, 178, 0.125)')
    halo.addColorStop(0.42, 'rgba(196, 132, 204, 0.05)')
    halo.addColorStop(0.76, 'rgba(242, 158, 178, 0)')
  }
  c.fillStyle = halo
  c.fillRect(0, 0, size, size)

  // 2. Botanical 5-notched-petal Sakura geometry on a separate layer for radial edge fade
  const flowerLayer = document.createElement('canvas')
  flowerLayer.width = size
  flowerLayer.height = size
  const fc = flowerLayer.getContext('2d')
  if (fc) {
    fc.translate(half, half)
    const scale = 1.55
    fc.scale(scale, scale)

    const strokeRgb = isLight ? '201, 74, 106' : '242, 158, 178'

    for (let k = 0; k < 5; k++) {
      fc.save()
      fc.rotate((k * 72 * Math.PI) / 180)

      const pGrad = fc.createLinearGradient(0, -10, 0, -172)
      pGrad.addColorStop(0, `rgba(${strokeRgb}, 0.015)`)
      pGrad.addColorStop(0.55, `rgba(${strokeRgb}, ${isLight ? 0.10 : 0.065})`)
      pGrad.addColorStop(1, `rgba(${strokeRgb}, ${isLight ? 0.17 : 0.115})`)

      fc.beginPath()
      fc.moveTo(0, -10)
      fc.bezierCurveTo(26, -42, 72, -96, 42, -154)
      fc.bezierCurveTo(28, -176, 10, -168, 0, -146)
      fc.bezierCurveTo(-10, -168, -28, -176, -42, -154)
      fc.bezierCurveTo(-72, -96, -26, -42, 0, -10)
      fc.closePath()

      fc.fillStyle = pGrad
      fc.fill()
      fc.strokeStyle = `rgba(${strokeRgb}, ${isLight ? 0.18 : 0.12})`
      fc.lineWidth = 0.75
      fc.stroke()

      // Fine stamen filament
      fc.beginPath()
      fc.moveTo(0, -12)
      fc.lineTo(0, -64)
      fc.strokeStyle = `rgba(${strokeRgb}, ${isLight ? 0.15 : 0.10})`
      fc.lineWidth = 0.6
      fc.stroke()

      fc.beginPath()
      fc.arc(0, -66, 1.5, 0, Math.PI * 2)
      fc.fillStyle = `rgba(${strokeRgb}, ${isLight ? 0.24 : 0.16})`
      fc.fill()

      fc.restore()
    }

    fc.beginPath()
    fc.arc(0, 0, 4.2, 0, Math.PI * 2)
    fc.fillStyle = `rgba(${strokeRgb}, ${isLight ? 0.18 : 0.13})`
    fc.fill()

    // Soft radial fade mask baked once
    fc.setTransform(1, 0, 0, 1, 0, 0)
    fc.globalCompositeOperation = 'destination-in'
    const mask = fc.createRadialGradient(half, half, size * 0.08, half, half, size * 0.44)
    mask.addColorStop(0, 'rgba(0,0,0,0.95)')
    mask.addColorStop(0.65, 'rgba(0,0,0,0.42)')
    mask.addColorStop(1, 'rgba(0,0,0,0)')
    fc.fillStyle = mask
    fc.fillRect(0, 0, size, size)

    c.drawImage(flowerLayer, 0, 0)
  }

  return off
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

    // Pre-cache Dark and Light Sakura bloom sprites once (zero per-frame SVG/mask compositing!)
    const darkBloom = createBloomSprite(false)
    const lightBloom = createBloomSprite(true)

    // 14 sparse depth-of-field petals with frame-rate-independent dt physics
    const petalCount = width < 640 ? 8 : 14
    const petals: Petal[] = Array.from({ length: petalCount }, (_, i) => {
      const depth = i % 3
      const size = depth === 0 ? 5.5 : depth === 1 ? 8.5 : 12.2
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        size,
        speedX: -0.20 - Math.random() * 0.22 - depth * 0.05,
        speedY: 0.28 + Math.random() * 0.30 + depth * 0.07,
        vx: 0,
        vy: 0,
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.008,
        tumble: Math.random() * Math.PI * 2,
        tumbleSpeed: 0.013 + Math.random() * 0.013,
        swayPhase: Math.random() * Math.PI * 2,
        swayAmp: 0.24 + Math.random() * 0.26,
        opacity: depth === 0 ? 0.16 : depth === 1 ? 0.26 : 0.19,
      }
    })

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
    let lastNow = performance.now()

    const render = (now: number) => {
      // Normalized to 60fps baseline (dt = 1.0 at 60Hz, 0.5 at 120Hz, 0.25 at 240Hz)
      const dt = Math.min(Math.max((now - lastNow) / 16.6667, 0.1), 2.5)
      lastNow = now

      ctx.clearRect(0, 0, width, height)

      const isLight = document.documentElement.getAttribute('data-theme') === 'light'
      const bloomSprite = isLight ? lightBloom : darkBloom

      // 1. Draw slowly rotating, breathing cached Sakura Bloom in top-right sky
      const bloomDrawSize = Math.min(Math.max(width * 0.58, 560), 860)
      const bloomCenterX = width * 0.80
      const bloomCenterY = height * 0.26
      const breath = 1 + 0.03 * Math.sin(now * 0.00045)
      const rot = (now * 0.000055) % (Math.PI * 2)

      ctx.save()
      ctx.translate(bloomCenterX, bloomCenterY)
      ctx.rotate(rot)
      ctx.scale(breath, breath)
      ctx.drawImage(
        bloomSprite,
        -bloomDrawSize / 2,
        -bloomDrawSize / 2,
        bloomDrawSize,
        bloomDrawSize
      )
      ctx.restore()

      // 2. Subtle counter-glow in bottom-left
      const counterR = Math.max(width * 0.42, 380)
      const counterGrad = ctx.createRadialGradient(
        width * 0.08,
        height * 0.92,
        0,
        width * 0.08,
        height * 0.92,
        counterR
      )
      counterGrad.addColorStop(
        0,
        isLight ? 'rgba(224, 112, 142, 0.13)' : 'rgba(242, 158, 178, 0.075)'
      )
      counterGrad.addColorStop(1, 'rgba(242, 158, 178, 0)')
      ctx.fillStyle = counterGrad
      ctx.fillRect(0, height - counterR, counterR * 1.15, counterR)

      // 3. Smooth dt-independent cursor aura & silky Bézier ribbon
      if (pointerActive) {
        const lerpFactor = 1 - Math.pow(1 - 0.24, dt)
        smoothX += (targetX - smoothX) * lerpFactor
        smoothY += (targetY - smoothY) * lerpFactor

        const dx = smoothX - prevX
        const dy = smoothY - prevY
        const dist = Math.hypot(dx, dy)

        if (dist > 0.5) {
          // Subdivide fast sweeps so high-speed flicks stay razor-smooth
          const steps = Math.min(Math.ceil(dist / 8), 4)
          for (let s = 1; s <= steps; s++) {
            const frac = s / steps
            trail.push({
              x: prevX + dx * frac,
              y: prevY + dy * frac,
              age: 0,
            })
          }
          while (trail.length > 32) trail.shift()
        }

        const auraRadius = 250
        const aura = ctx.createRadialGradient(smoothX, smoothY, 0, smoothX, smoothY, auraRadius)
        if (isLight) {
          aura.addColorStop(0, 'rgba(212, 82, 116, 0.11)')
          aura.addColorStop(0.45, 'rgba(226, 120, 148, 0.04)')
          aura.addColorStop(1, 'rgba(226, 120, 148, 0)')
        } else {
          aura.addColorStop(0, 'rgba(242, 158, 178, 0.085)')
          aura.addColorStop(0.45, 'rgba(218, 128, 156, 0.028)')
          aura.addColorStop(1, 'rgba(242, 158, 178, 0)')
        }
        ctx.fillStyle = aura
        ctx.fillRect(smoothX - auraRadius, smoothY - auraRadius, auraRadius * 2, auraRadius * 2)

        for (let i = trail.length - 1; i >= 0; i--) {
          trail[i].age += 0.032 * dt
          if (trail[i].age >= 1) {
            trail.splice(i, 1)
          }
        }

        if (trail.length > 3) {
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
            ctx.lineWidth = weight * 10.5
            ctx.lineCap = 'round'
            ctx.lineJoin = 'round'
            ctx.stroke()
          }
        }

        prevX = smoothX
        prevY = smoothY
      }

      // 4. Update & draw 3D drifting Sakura petals (dt-normalized)
      const damping = Math.pow(0.96, dt)
      for (const p of petals) {
        p.swayPhase += 0.014 * dt
        p.tumble += p.tumbleSpeed * dt
        p.angle += (p.spin + Math.sin(p.swayPhase) * 0.003) * dt

        if (pointerActive) {
          const distX = p.x - smoothX
          const distY = p.y - smoothY
          const distSq = distX * distX + distY * distY
          if (distSq < 19600 && distSq > 1) {
            const d = Math.sqrt(distSq)
            const force = (1 - d / 140) * 0.048 * dt
            p.vx += (distX / d) * force
            p.vy += (distY / d) * force
          }
        }

        p.vx *= damping
        p.vy *= damping

        p.x += (p.speedX + Math.sin(p.swayPhase) * p.swayAmp + p.vx) * dt
        p.y += (p.speedY + Math.cos(p.swayPhase * 0.7) * 0.08 + p.vy) * dt

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
        const shimmer = 0.86 + 0.14 * Math.sin(now * 0.0014 + p.swayPhase)
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
      <canvas ref={canvasRef} className="absolute inset-0 block" />
    </div>
  )
}
