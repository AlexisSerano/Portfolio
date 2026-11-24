'use client'

import { useEffect, useRef } from 'react'

interface PetalState {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  vx: number
  vy: number
  rotZ: number
  spinZ: number
  tumble: number
  tumbleSpeed: number
  swayPhase: number
  swayAmp: number
  baseOpacity: number
}

interface TrailPoint {
  x: number
  y: number
  age: number
}

// Bake the 5-petal botanical Sakura bloom + halo ONCE into a static GPU texture canvas
function paintStaticBloom(canvas: HTMLCanvasElement, isLight: boolean) {
  const size = 680
  canvas.width = size
  canvas.height = size
  const c = canvas.getContext('2d')
  if (!c) return

  c.clearRect(0, 0, size, size)
  const half = size / 2

  const halo = c.createRadialGradient(half, half, 0, half, half, half)
  if (isLight) {
    halo.addColorStop(0, 'rgba(228, 86, 126, 0.32)')
    halo.addColorStop(0.45, 'rgba(206, 114, 174, 0.15)')
    halo.addColorStop(0.80, 'rgba(228, 86, 126, 0)')
  } else {
    halo.addColorStop(0, 'rgba(242, 158, 178, 0.135)')
    halo.addColorStop(0.44, 'rgba(196, 132, 204, 0.055)')
    halo.addColorStop(0.78, 'rgba(242, 158, 178, 0)')
  }
  c.fillStyle = halo
  c.fillRect(0, 0, size, size)

  const flowerLayer = document.createElement('canvas')
  flowerLayer.width = size
  flowerLayer.height = size
  const fc = flowerLayer.getContext('2d')
  if (!fc) return

  fc.translate(half, half)
  fc.scale(1.48, 1.48)
  const strokeRgb = isLight ? '206, 61, 100' : '242, 158, 178'

  for (let k = 0; k < 5; k++) {
    fc.save()
    fc.rotate((k * 72 * Math.PI) / 180)

    const pGrad = fc.createLinearGradient(0, -10, 0, -172)
    pGrad.addColorStop(0, `rgba(${strokeRgb}, ${isLight ? 0.03 : 0.015})`)
    pGrad.addColorStop(0.55, `rgba(${strokeRgb}, ${isLight ? 0.17 : 0.07})`)
    pGrad.addColorStop(1, `rgba(${strokeRgb}, ${isLight ? 0.28 : 0.12})`)

    fc.beginPath()
    fc.moveTo(0, -10)
    fc.bezierCurveTo(26, -42, 72, -96, 42, -154)
    fc.bezierCurveTo(28, -176, 10, -168, 0, -146)
    fc.bezierCurveTo(-10, -168, -28, -176, -42, -154)
    fc.bezierCurveTo(-72, -96, -26, -42, 0, -10)
    fc.closePath()

    fc.fillStyle = pGrad
    fc.fill()
    fc.strokeStyle = `rgba(${strokeRgb}, ${isLight ? 0.30 : 0.13})`
    fc.lineWidth = isLight ? 0.95 : 0.8
    fc.stroke()

    fc.beginPath()
    fc.moveTo(0, -12)
    fc.lineTo(0, -64)
    fc.strokeStyle = `rgba(${strokeRgb}, ${isLight ? 0.24 : 0.10})`
    fc.lineWidth = 0.65
    fc.stroke()

    fc.beginPath()
    fc.arc(0, -66, 1.7, 0, Math.PI * 2)
    fc.fillStyle = `rgba(${strokeRgb}, ${isLight ? 0.36 : 0.17})`
    fc.fill()

    fc.restore()
  }

  fc.beginPath()
  fc.arc(0, 0, 4.4, 0, Math.PI * 2)
  fc.fillStyle = `rgba(${strokeRgb}, ${isLight ? 0.28 : 0.14})`
  fc.fill()

  fc.setTransform(1, 0, 0, 1, 0, 0)
  fc.globalCompositeOperation = 'destination-in'
  const mask = fc.createRadialGradient(half, half, size * 0.08, half, half, size * 0.44)
  mask.addColorStop(0, 'rgba(0,0,0,0.95)')
  mask.addColorStop(0.65, 'rgba(0,0,0,0.45)')
  mask.addColorStop(1, 'rgba(0,0,0,0)')
  fc.fillStyle = mask
  fc.fillRect(0, 0, size, size)

  c.drawImage(flowerLayer, 0, 0)
}

const PETAL_COUNT = 12

export default function StudioAtmosphere() {
  const bloomCanvasRef = useRef<HTMLCanvasElement>(null)
  const trailCanvasRef = useRef<HTMLCanvasElement>(null)
  const cursorOrbRef = useRef<HTMLDivElement>(null)
  const petalRefs = useRef<(SVGSVGElement | null)[]>([])

  // Zero-rasterization GPU compositor loop for 3D petals + auto-sleeping dirty-rect ribbon
  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = window.innerWidth
    let height = window.innerHeight
    const activePetals = width < 640 ? 7 : PETAL_COUNT

    const petals: PetalState[] = Array.from({ length: PETAL_COUNT }, (_, i) => {
      const depth = i % 3
      const size = depth === 0 ? 11 : depth === 1 ? 15 : 20
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        size,
        speedX: -0.18 - Math.random() * 0.22 - depth * 0.05,
        speedY: 0.26 + Math.random() * 0.28 + depth * 0.07,
        vx: 0,
        vy: 0,
        rotZ: Math.random() * 360,
        spinZ: (Math.random() - 0.5) * 0.45,
        tumble: Math.random() * 360,
        tumbleSpeed: 0.75 + Math.random() * 0.7,
        swayPhase: Math.random() * Math.PI * 2,
        swayAmp: 0.24 + Math.random() * 0.26,
        baseOpacity: i >= activePetals ? 0 : depth === 0 ? 0.18 : depth === 1 ? 0.28 : 0.21,
      }
    })

    const syncThemeVisuals = () => {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light'
      if (bloomCanvasRef.current) {
        paintStaticBloom(bloomCanvasRef.current, isLight)
      }
      const mult = isLight ? 1.65 : 1
      for (let i = 0; i < PETAL_COUNT; i++) {
        const el = petalRefs.current[i]
        if (!el) continue
        const p = petals[i]
        el.style.width = `${p.size}px`
        el.style.height = `${p.size}px`
        el.style.opacity = isReduced ? '0' : String(Math.min(p.baseOpacity * mult, 0.52))
      }
    }

    syncThemeVisuals()
    const obs = new MutationObserver(syncThemeVisuals)
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    if (isReduced) {
      return () => obs.disconnect()
    }

    const trailCanvas = trailCanvasRef.current
    const ctx = trailCanvas?.getContext('2d', { alpha: true, desynchronized: true }) ?? null

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      if (trailCanvas) {
        trailCanvas.width = width
        trailCanvas.height = height
      }
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    let pointerActive = false
    let targetX = width * 0.5
    let targetY = height * 0.35
    let smoothX = targetX
    let smoothY = targetY
    let prevX = targetX
    let prevY = targetY
    const trail: TrailPoint[] = []

    let dirtyMinX = 0
    let dirtyMinY = 0
    let dirtyMaxX = 0
    let dirtyMaxY = 0
    let hasDirtyRect = false

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return
      if (!pointerActive) {
        pointerActive = true
        smoothX = e.clientX
        smoothY = e.clientY
        prevX = e.clientX
        prevY = e.clientY
        if (cursorOrbRef.current) cursorOrbRef.current.style.opacity = '1'
      }
      targetX = e.clientX
      targetY = e.clientY
    }
    window.addEventListener('pointermove', onPointerMove, { passive: true })

    let rafId = 0
    let lastNow = performance.now()

    const tick = (now: number) => {
      const dt = Math.min(Math.max((now - lastNow) / 16.6667, 0.1), 2.5)
      lastNow = now

      if (pointerActive) {
        const lerpFactor = 1 - Math.pow(1 - 0.25, dt)
        smoothX += (targetX - smoothX) * lerpFactor
        smoothY += (targetY - smoothY) * lerpFactor

        if (cursorOrbRef.current) {
          cursorOrbRef.current.style.transform = `translate3d(${smoothX - 250}px, ${smoothY - 250}px, 0)`
        }

        const dx = smoothX - prevX
        const dy = smoothY - prevY
        const dist = Math.hypot(dx, dy)

        if (dist > 0.6) {
          const steps = Math.min(Math.ceil(dist / 9), 4)
          for (let s = 1; s <= steps; s++) {
            const frac = s / steps
            trail.push({
              x: prevX + dx * frac,
              y: prevY + dy * frac,
              age: 0,
            })
          }
          while (trail.length > 28) trail.shift()
        }

        prevX = smoothX
        prevY = smoothY
      }

      if (ctx) {
        if (hasDirtyRect) {
          ctx.clearRect(
            dirtyMinX,
            dirtyMinY,
            dirtyMaxX - dirtyMinX,
            dirtyMaxY - dirtyMinY
          )
          hasDirtyRect = false
        }

        for (let i = trail.length - 1; i >= 0; i--) {
          trail[i].age += 0.035 * dt
          if (trail[i].age >= 1) trail.splice(i, 1)
        }

        if (trail.length > 3) {
          let minX = Infinity
          let minY = Infinity
          let maxX = -Infinity
          let maxY = -Infinity
          for (const pt of trail) {
            if (pt.x < minX) minX = pt.x
            if (pt.y < minY) minY = pt.y
            if (pt.x > maxX) maxX = pt.x
            if (pt.y > maxY) maxY = pt.y
          }
          dirtyMinX = Math.max(0, Math.floor(minX - 20))
          dirtyMinY = Math.max(0, Math.floor(minY - 20))
          dirtyMaxX = Math.min(width, Math.ceil(maxX + 20))
          dirtyMaxY = Math.min(height, Math.ceil(maxY + 20))
          hasDirtyRect = true

          const isLight = document.documentElement.getAttribute('data-theme') === 'light'
          const layers = [0, 0.3, 0.56, 0.78]
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
            // Boosted Light Mode pigment & contrast so the Sakura cursor ribbon pops clearly on white!
            const alpha = (isLight ? 0.165 : 0.056) * (0.6 + startFrac)
            ctx.strokeStyle = isLight
              ? `rgba(218, 56, 102, ${alpha})`
              : `rgba(244, 166, 185, ${alpha})`
            ctx.lineWidth = weight * (isLight ? 12 : 10)
            ctx.lineCap = 'round'
            ctx.lineJoin = 'round'
            ctx.stroke()
          }
        }
      }

      const damping = Math.pow(0.96, dt)
      for (let i = 0; i < activePetals; i++) {
        const p = petals[i]
        const el = petalRefs.current[i]
        if (!el) continue

        p.swayPhase += 0.014 * dt
        p.tumble = (p.tumble + p.tumbleSpeed * dt) % 360
        p.rotZ = (p.rotZ + (p.spinZ + Math.sin(p.swayPhase) * 0.16) * dt) % 360

        if (pointerActive) {
          const distX = p.x - smoothX
          const distY = p.y - smoothY
          const distSq = distX * distX + distY * distY
          if (distSq < 19600 && distSq > 1) {
            const d = Math.sqrt(distSq)
            const force = (1 - d / 140) * 0.05 * dt
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
        if (p.x < -30) p.x = width + 24
        else if (p.x > width + 30) p.x = -24

        el.style.transform = `translate3d(${p.x.toFixed(1)}px, ${p.y.toFixed(1)}px, 0) rotateZ(${p.rotZ.toFixed(1)}deg) rotateX(${p.tumble.toFixed(1)}deg)`
      }

      rafId = window.requestAnimationFrame(tick)
    }

    rafId = window.requestAnimationFrame(tick)

    return () => {
      obs.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
      window.cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ contain: 'strict' }}
    >
      {/* Static Baked Sakura Bloom Quad — Rotated 100% on GPU Compositor Thread */}
      <canvas
        ref={bloomCanvasRef}
        className="gpu-spin-slow absolute -top-[10%] -right-[8%] w-[560px] h-[560px] sm:w-[780px] sm:h-[780px]"
      />

      {/* Static Bottom-Left Ambient Sakura Glow */}
      <div
        className="absolute -bottom-[22%] -left-[12%] w-[56vw] h-[50vh] rounded-full"
        style={{
          background: 'radial-gradient(ellipse at center, var(--bloom-primary) 0%, transparent 70%)',
        }}
      />

      {/* Pure-GPU Cursor Ambient Halo — Uses High-Contrast --cursor-aura in Light Mode */}
      <div
        ref={cursorOrbRef}
        className="hidden md:block absolute top-0 left-0 w-[500px] h-[500px] rounded-full opacity-0 transition-opacity duration-300 will-change-transform"
        style={{
          background: 'radial-gradient(circle, var(--cursor-aura) 0%, transparent 64%)',
        }}
      />

      {/* Dirty-Rect Auto-Sleeping Silk Ribbon Canvas */}
      <canvas ref={trailCanvasRef} className="hidden md:block absolute inset-0" />

      {/* 12 Hardware-Composited 3D Sakura Petals */}
      <div className="absolute inset-0" style={{ perspective: '600px' }}>
        {Array.from({ length: PETAL_COUNT }).map((_, i) => (
          <svg
            key={i}
            ref={(el) => {
              petalRefs.current[i] = el
            }}
            viewBox="-12 -12 24 24"
            className="absolute top-0 left-0 will-change-transform text-[var(--petal-color)]"
            style={{ opacity: 0 }}
          >
            <path
              d="M 0 9.5 C 6.8 4.6, 9.2 -3.8, 3 -9.8 L 0 -7.2 L -3 -9.8 C -9.2 -3.8, -6.8 4.6, 0 9.5 Z"
              fill="currentColor"
            />
          </svg>
        ))}
      </div>
    </div>
  )
}
