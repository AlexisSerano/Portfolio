'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

interface SectionHeadingProps {
  title: string
  subtitle?: string
  className?: string
}

const easeOutExpo = [0.16, 1, 0.3, 1] as const

export default function SectionHeading({ title, subtitle, className = '' }: SectionHeadingProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  // Observe the stationary outer wrapper (never the y:108% clipped child!) so IntersectionObserver always fires
  const isInView = useInView(containerRef, { once: true, margin: '0px 0px -24px 0px' })

  if (prefersReducedMotion) {
    return (
      <div className={className}>
        <h2 className="text-[28px] sm:text-[36px] font-bold tracking-[-0.036em] text-[var(--ink)]">
          {title}
        </h2>
        {subtitle && <p className="mt-1.5 text-[15px] text-[var(--ink-secondary)]">{subtitle}</p>}
      </div>
    )
  }

  return (
    <div ref={containerRef} className={className}>
      <div className="overflow-hidden pb-1">
        <motion.h2
          initial={{ y: '108%' }}
          animate={isInView ? { y: '0%' } : { y: '108%' }}
          transition={{ duration: 0.68, ease: easeOutExpo }}
          className="text-[28px] sm:text-[36px] font-bold tracking-[-0.036em] text-[var(--ink)] will-change-transform"
        >
          {title}
        </motion.h2>
      </div>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.56, delay: 0.08, ease: easeOutExpo }}
          className="mt-1 text-[15px] text-[var(--ink-secondary)]"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}
