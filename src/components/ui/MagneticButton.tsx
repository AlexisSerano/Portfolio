'use client'
import { useRef, type ReactNode } from 'react'
import { gsap } from 'gsap'
import { cn } from '@/lib/utils'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  href?: string
  onClick?: () => void
  strength?: number
  target?: string
  rel?: string
}

export default function MagneticButton({
  children,
  className = '',
  href,
  onClick,
  strength = 0.3,
  target,
  rel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) * strength
    const y = (e.clientY - rect.top - rect.height / 2) * strength
    gsap.to(el, { x, y, duration: 0.3, ease: 'power2.out' })
  }

  const handleMouseLeave = () => {
    if (!ref.current) return
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' })
  }

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (href && href.startsWith('#')) {
      e.preventDefault()
      const target = document.querySelector<HTMLElement>(href)
      if (target) {
        const lenis = window.portfolioLenis
        if (lenis) {
          lenis.scrollTo(target, { duration: 1.3, offset: -30 })
        } else {
          target.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }
    onClick?.()
  }

  const commonClassName = cn('inline-block', className)

  if (href) {
    return (
      <a
        ref={(element) => { ref.current = element }}
        href={href}
        target={target}
        rel={rel}
        onClick={handleClick}
        className={commonClassName}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        data-cursor
      >
        {children}
      </a>
    )
  }

  return (
    <button
      ref={(element) => { ref.current = element }}
      type="button"
      onClick={handleClick}
      className={commonClassName}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor
    >
      {children}
    </button>
  )
}
