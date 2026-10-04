'use client'
import React, { useRef, type KeyboardEvent, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface TiltCardProps {
  children: ReactNode
  className?: string
  maxTilt?: number
  scale?: number
  glareOpacity?: number
  onClick?: () => void
  onKeyDown?: (event: KeyboardEvent<HTMLDivElement>) => void
  role?: string
  tabIndex?: number
  'aria-label'?: string
}

export default function TiltCard({
  children,
  className = '',
  maxTilt = 10,
  scale = 1.02,
  glareOpacity = 0.15,
  onClick,
  onKeyDown,
  role,
  tabIndex,
  'aria-label': ariaLabel,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const glareRef = useRef<HTMLDivElement>(null)
  const edgeRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height

    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    const xPct = (mouseX / width - 0.5) * 2 // -1 to 1
    const yPct = (mouseY / height - 0.5) * 2 // -1 to 1

    const rotateX = -yPct * maxTilt
    const rotateY = xPct * maxTilt

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, 1)`
    const position = `${(mouseX / width) * 100}% ${(mouseY / height) * 100}%`
    if (glareRef.current) {
      glareRef.current.style.background = `radial-gradient(400px circle at ${position}, rgba(245, 215, 133, 0.22), transparent 70%)`
      glareRef.current.style.opacity = String(glareOpacity)
    }
    if (edgeRef.current) {
      edgeRef.current.style.background = `radial-gradient(350px circle at ${position}, rgba(212, 168, 67, 0.4), transparent 60%)`
    }
  }

  const handleMouseEnter = () => {
    if (cardRef.current) cardRef.current.style.transition = 'transform 120ms ease-out'
  }

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transition = 'transform 500ms cubic-bezier(0.23, 1, 0.32, 1)'
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
    }
    if (glareRef.current) glareRef.current.style.opacity = '0'
  }

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onKeyDown={onKeyDown}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role={role}
      tabIndex={tabIndex}
      aria-label={ariaLabel}
      style={{
        transformStyle: 'preserve-3d',
        transition: 'transform 500ms cubic-bezier(0.23, 1, 0.32, 1)',
      }}
      className={cn(
        'relative group/tilt will-change-transform',
        className
      )}
    >
      {/* Specular Glare Overlay */}
      <div
        ref={glareRef}
        className="pointer-events-none absolute inset-0 z-30 rounded-[inherit] transition-opacity duration-300"
        style={{
          opacity: 0,
          background: 'radial-gradient(400px circle at 50% 50%, rgba(245, 215, 133, 0.22), transparent 70%)',
          mixBlendMode: 'screen',
        }}
      />

      {/* Dynamic Gold Edge Highlight */}
      <div
        ref={edgeRef}
        className="pointer-events-none absolute -inset-[1px] z-20 rounded-[inherit] opacity-0 group-hover/tilt:opacity-100 transition-opacity duration-300"
        style={{
          background: 'radial-gradient(350px circle at 50% 50%, rgba(212, 168, 67, 0.4), transparent 60%)',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          padding: '1px',
        }}
      />

      {/* Card Content with 3D depth */}
      <div className="relative z-10 h-full w-full rounded-[inherit]">
        {children}
      </div>
    </div>
  )
}
