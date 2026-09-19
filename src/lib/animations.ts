import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export const fadeInUp = {
  from: { opacity: 0, y: 40 },
  to: { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
}

export const fadeInScale = {
  from: { opacity: 0, scale: 0.95 },
  to: { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' },
}

export const staggerReveal = (stagger = 0.1) => ({
  from: { opacity: 0, y: 30 },
  to: { opacity: 1, y: 0, duration: 0.6, stagger, ease: 'power2.out' },
})

export const scrollTriggerDefaults = {
  start: 'top 85%',
  end: 'bottom 15%',
  toggleActions: 'play none none none' as const,
}

export function createBatchReveal(selector: string) {
  ScrollTrigger.batch(selector, {
    onEnter: (batch) => {
      gsap.fromTo(batch,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out', overwrite: true }
      )
    },
    start: 'top 90%',
  })
}
