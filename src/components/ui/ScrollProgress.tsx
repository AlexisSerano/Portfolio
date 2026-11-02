'use client'
import { useEffect, useRef } from 'react'

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let rafId = 0

    const updateProgress = () => {
      if (!barRef.current) return
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const ratio = height > 0 ? Math.min(1, Math.max(0, winScroll / height)) : 0
      barRef.current.style.transform = `scaleX(${ratio})`
      rafId = 0
    }

    const onScroll = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(updateProgress)
      }
    }

    updateProgress()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (rafId) window.cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 right-0 h-[2px] z-[100] origin-left will-change-transform"
      style={{
        transform: 'scaleX(0)',
        background: 'linear-gradient(90deg, #D4A843, #F5D785, #A3845B)',
        boxShadow: '0 0 12px rgba(212, 168, 67, 0.55)',
      }}
    />
  )
}
