'use client'

import { useEffect, type ReactNode } from 'react'
import Lenis from 'lenis'

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    // Tuned lerp for zero-latency input response and 120Hz/240Hz frame-rate independence
    const lenis = new Lenis({
      lerp: 0.115,
      wheelMultiplier: 0.96,
      orientation: 'vertical',
      smoothWheel: true,
      syncTouch: false,
    })

    window.portfolioLenis = lenis

    let rafId = 0
    const raf = (time: number) => {
      lenis.raf(time)
      rafId = window.requestAnimationFrame(raf)
    }
    rafId = window.requestAnimationFrame(raf)

    const handleModalToggle = (event: Event) => {
      if (!(event instanceof CustomEvent)) return
      const detail: unknown = event.detail
      if (typeof detail !== 'object' || detail === null || !('isOpen' in detail)) return
      if (detail.isOpen === true) {
        lenis.stop()
      } else if (detail.isOpen === false) {
        lenis.start()
      }
    }

    window.addEventListener('portfolio-modal-toggle', handleModalToggle)

    return () => {
      window.removeEventListener('portfolio-modal-toggle', handleModalToggle)
      window.cancelAnimationFrame(rafId)
      lenis.destroy()
      delete window.portfolioLenis
    }
  }, [])

  return <>{children}</>
}
