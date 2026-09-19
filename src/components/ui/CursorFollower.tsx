'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function CursorFollower() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const dot = cursorDotRef.current
    if (!cursor || !dot) return

    // Check if device has fine pointer (not touch)
    if (!window.matchMedia('(pointer: fine)').matches) {
      cursor.style.display = 'none'
      dot.style.display = 'none'
      return
    }

    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.4, ease: 'power3.out' })
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.4, ease: 'power3.out' })
    const dotXTo = gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'power2.out' })
    const dotYTo = gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'power2.out' })

    const onMouseMove = (e: MouseEvent) => {
      cursor.style.opacity = '1'
      dot.style.opacity = '1'
      xTo(e.clientX)
      yTo(e.clientY)
      dotXTo(e.clientX)
      dotYTo(e.clientY)
    }

    const onMouseLeaveWindow = () => {
      cursor.style.opacity = '0'
      dot.style.opacity = '0'
    }

    // Event delegation: scales when hovering any link, button, or [data-cursor] element
    const onMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a, button, [data-cursor], input, textarea')
      if (target) {
        gsap.to(cursor, { scale: 2.2, opacity: 0.6, duration: 0.25, ease: 'power2.out' })
      } else {
        gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.25, ease: 'power2.out' })
      }
    }

    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseleave', onMouseLeaveWindow)
    document.addEventListener('mouseover', onMouseOver)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeaveWindow)
      document.removeEventListener('mouseover', onMouseOver)
    }
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-6 h-6 rounded-full border pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference transition-opacity duration-300 opacity-0"
        style={{ borderColor: 'rgba(212,168,67,0.7)' }}
      />
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 opacity-0"
        style={{ backgroundColor: '#D4A843' }}
      />
    </>
  )
}
