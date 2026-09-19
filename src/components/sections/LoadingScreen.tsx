'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const topHalfRef = useRef<HTMLDivElement>(null)
  const bottomHalfRef = useRef<HTMLDivElement>(null)
  const isClosingRef = useRef(false)

  // Safe dismiss function
  const dismiss = useCallback(() => {
    if (isClosingRef.current) return
    isClosingRef.current = true

    // Animate curtain split
    if (topHalfRef.current && bottomHalfRef.current) {
      gsap.to(topHalfRef.current, {
        yPercent: -100,
        duration: 0.6,
        ease: 'power4.inOut',
      })
      gsap.to(bottomHalfRef.current, {
        yPercent: 100,
        duration: 0.6,
        ease: 'power4.inOut',
        onComplete: () => {
          onComplete()
        },
      })
    } else {
      onComplete()
    }

    // Fade out loader content fast
    gsap.to('.loader-content', {
      opacity: 0,
      scale: 0.95,
      duration: 0.2,
      ease: 'power2.in',
    })
  }, [onComplete])

  // Instant skip button handler
  const handleInstantSkip = () => {
    isClosingRef.current = true
    onComplete()
  }

  // Keyboard shortcut: Escape to skip
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleInstantSkip()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onComplete])

  // Main animation timeline using gsap.context for flawless React StrictMode support
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          dismiss()
        },
      })

      // Phase 1: Golden pulsing dot appears
      tl.fromTo('.loader-dot',
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.35, ease: 'back.out(2)' },
        0.1
      )

      // Phase 2: Dot morphs into initials
      tl.to('.loader-dot', {
        scale: 0,
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in',
      }, '+=0.15')

      tl.fromTo('.loader-initial',
        { opacity: 0, filter: 'blur(8px)', y: 10 },
        {
          opacity: 1,
          filter: 'blur(0px)',
          y: 0,
          duration: 0.45,
          stagger: 0.08,
          ease: 'power2.out',
        },
        '-=0.05'
      )

      // Phase 3: Subtitle
      tl.fromTo('.loader-subtitle',
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' },
        '-=0.15'
      )

      // Phase 4: Golden line fills
      tl.fromTo('.loader-bar-container',
        { opacity: 0 },
        { opacity: 1, duration: 0.25 },
        '-=0.1'
      )

      const progressObj = { val: 0 }
      tl.to(progressObj, {
        val: 100,
        duration: 0.9,
        ease: 'power2.inOut',
        onUpdate: () => setProgress(Math.round(progressObj.val)),
      }, '-=0.05')
    }, containerRef)

    // Hard fallback safety timer (2.2s max) to guarantee the loader never blocks the user
    const safetyTimeout = setTimeout(() => {
      if (!isClosingRef.current) {
        dismiss()
      }
    }, 2200)

    return () => {
      clearTimeout(safetyTimeout)
      ctx.revert() // Cleanly reverts all GSAP animations when React unmounts in StrictMode
    }
  }, [dismiss])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] select-none pointer-events-auto"
      style={{ background: 'transparent' }}
    >
      {/* Top half split curtain */}
      <div
        ref={topHalfRef}
        className="absolute inset-0 bottom-1/2 bg-[#050505] shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
      />
      {/* Bottom half split curtain */}
      <div
        ref={bottomHalfRef}
        className="absolute inset-0 top-1/2 bg-[#050505] shadow-[0_-10px_30px_rgba(0,0,0,0.5)]"
      />

      {/* Skip button - always accessible and interactive */}
      <button
        onClick={handleInstantSkip}
        type="button"
        aria-label="Passer l'introduction"
        className="absolute top-6 right-6 z-30 text-xs font-mono tracking-wider text-[#A3A3A3] hover:text-[#D4A843] border border-white/10 hover:border-[rgba(212,168,67,0.4)] bg-black/60 backdrop-blur-md px-4 py-2 rounded-full transition-all cursor-pointer shadow-lg"
      >
        Passer [Échap] →
      </button>

      {/* Centered loader content */}
      <div className="loader-content absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
        {/* Pulsing golden dot */}
        <div
          className="loader-dot w-2.5 h-2.5 rounded-full bg-[#D4A843] absolute shadow-[0_0_15px_rgba(212,168,67,0.8)]"
          style={{ animation: 'glow-pulse 1.5s ease-in-out infinite' }}
        />

        {/* Initials */}
        <div className="flex gap-3 mb-3">
          <span
            className="loader-initial text-gradient-gold font-bold opacity-0 tracking-tight"
            style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)' }}
          >
            A
          </span>
          <span
            className="loader-initial text-gradient-gold font-bold opacity-0 tracking-tight"
            style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)' }}
          >
            S
          </span>
        </div>

        {/* Subtitle */}
        <p className="loader-subtitle text-[#6B6B6B] uppercase tracking-[0.3em] text-[0.7rem] sm:text-xs font-mono font-medium opacity-0">
          Développeur Full-Stack &amp; DevOps
        </p>

        {/* Golden line progress bar */}
        <div className="loader-bar-container absolute bottom-[15%] flex flex-col items-center gap-3 opacity-0">
          <div className="w-[180px] sm:w-[220px] h-[2px] bg-white/10 relative overflow-hidden rounded-full">
            <div
              className="absolute inset-y-0 left-0 rounded-full transition-none"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #D4A843, #F5D785, #A3845B)',
                boxShadow: '0 0 10px rgba(212, 168, 67, 0.6)',
              }}
            />
          </div>
          <span className="text-[#6B6B6B] font-mono text-[0.7rem] tracking-wider">
            initialisation... {progress}%
          </span>
        </div>
      </div>
    </div>
  )
}
