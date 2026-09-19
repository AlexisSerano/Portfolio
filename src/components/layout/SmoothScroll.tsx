'use client'
import { useEffect, useRef, type ReactNode } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    })

    lenisRef.current = lenis
    ;(window as any).lenis = lenis
    lenis.on('scroll', ScrollTrigger.update)

    const updateRaf = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(updateRaf)
    gsap.ticker.lagSmoothing(0)

    // Listen for modal state changes to pause/resume background smooth scroll
    const handleModalToggle = (e: any) => {
      if (e.detail?.isOpen) {
        lenis.stop()
      } else {
        lenis.start()
      }
    }

    window.addEventListener('portfolio-modal-toggle', handleModalToggle)

    return () => {
      window.removeEventListener('portfolio-modal-toggle', handleModalToggle)
      gsap.ticker.remove(updateRaf)
      lenis.destroy()
      delete (window as any).lenis
    }
  }, [])

  return <>{children}</>
}
