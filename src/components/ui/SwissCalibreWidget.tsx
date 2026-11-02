'use client'
import { useEffect, useRef } from 'react'
import { useLanguage } from '@/context/LanguageContext'

export default function SwissCalibreWidget() {
  const { t } = useLanguage()
  const containerRef = useRef<HTMLDivElement>(null)
  const dialRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    const dial = dialRef.current
    if (!el || !dial) return

    let rafId = 0
    const onMove = (e: MouseEvent) => {
      if (rafId) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect()
        const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)
        const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)
        const rotY = Math.max(-10, Math.min(10, x * 6))
        const rotX = Math.max(-10, Math.min(10, -y * 6))
        dial.style.transform = `perspective(900px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg)`
      })
    }

    const onLeave = () => {
      if (rafId) cancelAnimationFrame(rafId)
      dial.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)'
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    el.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div ref={containerRef} className="hidden lg:flex items-center justify-center relative select-none">
      <div
        ref={dialRef}
        className="relative w-[390px] xl:w-[430px] aspect-square flex items-center justify-center transition-transform duration-300 ease-out"
      >
        {/* Ambient golden radial aura */}
        <div className="absolute inset-8 rounded-full bg-[radial-gradient(circle,rgba(212,168,67,0.14)_0%,transparent_70%)] blur-xl pointer-events-none" />

        {/* Swiss Horology Outer Bezel SVG */}
        <svg viewBox="0 0 400 400" className="w-full h-full">
          <defs>
            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F5D785" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#D4A843" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#A3845B" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {/* Outer precision track */}
          <circle cx="200" cy="200" r="186" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          <circle
            cx="200"
            cy="200"
            r="174"
            fill="none"
            stroke="url(#goldGrad)"
            strokeWidth="1.2"
            strokeDasharray="6 10"
            className="origin-center motion-safe:animate-[spin_70s_linear_infinite]"
          />

          {/* 60-minute horology indices (rounded to 2 decimals for SSR hydration parity) */}
          {Array.from({ length: 60 }).map((_, i) => {
            const angle = (i * 6 * Math.PI) / 180
            const isMajor = i % 5 === 0
            const r1 = isMajor ? 154 : 160
            const r2 = 166
            const x1 = (200 + r1 * Math.cos(angle)).toFixed(2)
            const y1 = (200 + r1 * Math.sin(angle)).toFixed(2)
            const x2 = (200 + r2 * Math.cos(angle)).toFixed(2)
            const y2 = (200 + r2 * Math.sin(angle)).toFixed(2)
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={isMajor ? '#D4A843' : 'rgba(255,255,255,0.16)'}
                strokeWidth={isMajor ? '1.6' : '0.8'}
                strokeOpacity={isMajor ? '0.75' : '0.4'}
              />
            )
          })}

          {/* Inner counter-rotating escapement ring */}
          <circle
            cx="200"
            cy="200"
            r="134"
            fill="none"
            stroke="rgba(212,168,67,0.22)"
            strokeWidth="1"
            strokeDasharray="28 14 4 14"
            className="origin-center motion-safe:animate-[spin_45s_linear_infinite_reverse]"
          />

          {/* Core tourbillon bridge */}
          <circle cx="200" cy="200" r="96" fill="rgba(9,12,18,0.85)" stroke="rgba(212,168,67,0.3)" strokeWidth="1" />
          <line x1="104" y1="200" x2="296" y2="200" stroke="rgba(212,168,67,0.15)" strokeWidth="1" />
          <line x1="200" y1="104" x2="200" y2="296" stroke="rgba(212,168,67,0.15)" strokeWidth="1" />
        </svg>

        {/* Center Calibre Core */}
        <div className="absolute flex flex-col items-center justify-center text-center pointer-events-none">
          <span className="text-[9px] font-mono uppercase tracking-[0.28em] text-[#D4A843]">
            BACHELOR 180 ECTS
          </span>
          <span className="text-2xl font-bold text-[#F8FAFC] tracking-tight mt-1">
            GENÈVE &amp; VAUD
          </span>
          <span className="text-[10px] font-mono text-emerald-400 mt-1 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {t('Dispo. Juillet 2027', 'Available July 2027')}
          </span>
        </div>

        {/* Horological Typographic Index 1: Top Left (Carrier R&D) — No boxy card */}
        <div className="absolute top-3 -left-6 text-left pointer-events-none">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4A843]" />
            <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#D4A843]">01 // CARRIER R&amp;D</span>
          </div>
          <span className="text-xs font-semibold text-[#F8FAFC] block mt-0.5 pl-3.5 border-l border-[#D4A843]/40">
            OTP &amp; CRA · 4M régulateurs/an
          </span>
        </div>

        {/* Horological Typographic Index 2: Top Right (Full-Stack & Embarqué) */}
        <div className="absolute top-8 -right-8 text-right pointer-events-none">
          <div className="flex items-center justify-end gap-2">
            <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#94A3B8]">02 // ARCHITECTURE</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          </div>
          <span className="text-xs font-semibold text-[#F8FAFC] block mt-0.5 pr-3.5 border-r border-emerald-400/40">
            Full-Stack, APIs &amp; Embarqué
          </span>
        </div>

        {/* Horological Typographic Index 3: Bottom Left (CHAI Infrastructure) */}
        <div className="absolute bottom-8 -left-6 text-left pointer-events-none">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
            <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#94A3B8]">03 // SYSTÈMES &amp; INFRA</span>
          </div>
          <span className="text-xs font-semibold text-[#F8FAFC] block mt-0.5 pl-3.5 border-l border-sky-400/40">
            K3s · Docker · AD (1 800 pros)
          </span>
        </div>

        {/* Horological Typographic Index 4: Bottom Right (Algofy 24/7) */}
        <div className="absolute bottom-3 -right-6 text-right pointer-events-none">
          <div className="flex items-center justify-end gap-2">
            <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#D4A843]">04 // ALGOFY 24/7</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4A843]" />
          </div>
          <span className="text-xs font-semibold text-[#F8FAFC] block mt-0.5 pr-3.5 border-r border-[#D4A843]/40">
            Django · React · Hyperliquid
          </span>
        </div>
      </div>
    </div>
  )
}
