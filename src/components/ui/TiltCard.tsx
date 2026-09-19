'use client'
import React, { useRef, useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface TiltCardProps {
  children: ReactNode
  className?: string
  maxTilt?: number
  scale?: number
  glareOpacity?: number
  onClick?: () => void
}

export default function TiltCard({
  children,
  className = '',
  maxTilt = 10,
  scale = 1.02,
  glareOpacity = 0.15,
  onClick,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [transformStyle, setTransformStyle] = useState('')
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 })
  const [isHovered, setIsHovered] = useState(false)

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

    setTransformStyle(
      `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, 1)`
    )

    setGlarePos({
      x: (mouseX / width) * 100,
      y: (mouseY / height) * 100,
      opacity: glareOpacity,
    })
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setTransformStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)')
    setGlarePos(prev => ({ ...prev, opacity: 0 }))
  }

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transformStyle,
        transformStyle: 'preserve-3d',
        transition: isHovered
          ? 'transform 0.1s ease-out'
          : 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
      }}
      className={cn(
        'relative group/tilt will-change-transform',
        className
      )}
    >
      {/* Specular Glare Overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-30 rounded-[inherit] transition-opacity duration-300"
        style={{
          opacity: glarePos.opacity,
          background: `radial-gradient(400px circle at ${glarePos.x}% ${glarePos.y}%, rgba(245, 215, 133, 0.22), transparent 70%)`,
          mixBlendMode: 'screen',
        }}
      />

      {/* Dynamic Gold Edge Highlight */}
      <div
        className="pointer-events-none absolute -inset-[1px] z-20 rounded-[inherit] opacity-0 group-hover/tilt:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(350px circle at ${glarePos.x}% ${glarePos.y}%, rgba(212, 168, 67, 0.4), transparent 60%)`,
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
