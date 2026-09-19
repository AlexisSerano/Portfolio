'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface TextRevealProps {
  children: string
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'
  className?: string
  stagger?: number
  delay?: number
}

export default function TextReveal({
  children,
  tag: Tag = 'h2',
  className = '',
  stagger = 0.05,
  delay = 0,
}: TextRevealProps) {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const words = container.querySelectorAll('.word-inner')

    gsap.fromTo(words,
      { yPercent: 110 },
      {
        yPercent: 0,
        duration: 0.8,
        ease: 'power4.out',
        stagger,
        delay,
        scrollTrigger: {
          trigger: container,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === container) st.kill()
      })
    }
  }, [children, stagger, delay])

  const words = children.split(' ')

  return (
    <Tag ref={containerRef as any} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
          <span className="word-inner inline-block">{word}</span>
        </span>
      ))}
    </Tag>
  )
}
