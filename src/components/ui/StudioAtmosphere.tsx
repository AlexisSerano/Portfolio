'use client'

import { useEffect, useRef } from 'react'

export default function StudioAtmosphere() {
  const cursorOrbRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse), (prefers-reduced-motion: reduce)').matches) {
      return
    }

    let targetX = window.innerWidth * 0.5
    let targetY = window.innerHeight * 0.3
    let currentX = targetX
    let currentY = targetY
    let rafId = 0

    const onMove = (e: PointerEvent) => {
      targetX = e.clientX
      targetY = e.clientY
    }

    const tick = () => {
      currentX += (targetX - currentX) * 0.08
      currentY += (targetY - currentY) * 0.08
      if (cursorOrbRef.current) {
        cursorOrbRef.current.style.transform = `translate3d(${currentX - 340}px, ${currentY - 340}px, 0)`
      }
      rafId = window.requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    rafId = window.requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('pointermove', onMove)
      window.cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div aria-hidden="true" className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Warm Brushed Champagne Key Light (Top Left) */}
      <div
        className="animate-studio-a absolute -top-[18%] -left-[10%] w-[68vw] h-[62vh] rounded-full"
        style={{
          background: 'radial-gradient(ellipse at center, var(--beam-champagne) 0%, transparent 68%)',
        }}
      />

      {/* Smoked Sakura Twilight Rim Light (Top Right) */}
      <div
        className="animate-studio-b absolute top-[4%] -right-[12%] w-[56vw] h-[54vh] rounded-full"
        style={{
          background: 'radial-gradient(ellipse at center, var(--beam-sakura) 0%, transparent 68%)',
        }}
      />

      {/* Subtle Bottom Horizon Warmth */}
      <div
        className="absolute -bottom-[24%] left-[20%] w-[60vw] h-[45vh] rounded-full opacity-60"
        style={{
          background: 'radial-gradient(ellipse at center, var(--beam-champagne) 0%, transparent 72%)',
        }}
      />

      {/* Zero-Paint GPU Cursor Ambient Light */}
      <div
        ref={cursorOrbRef}
        className="hidden md:block absolute top-0 left-0 w-[680px] h-[680px] rounded-full will-change-transform"
        style={{
          background: 'radial-gradient(circle, var(--cursor-glow) 0%, transparent 65%)',
        }}
      />
    </div>
  )
}
