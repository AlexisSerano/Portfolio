'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const splitEase = [0.76, 0, 0.24, 1] as const
const revealEase = [0.16, 1, 0.3, 1] as const

export default function OpeningCurtain() {
  const prefersReducedMotion = useReducedMotion()
  const [phase, setPhase] = useState<'checking' | 'intro' | 'splitting' | 'done'>('checking')

  const finish = useCallback(() => {
    setPhase('done')
    try {
      window.sessionStorage.setItem('portfolio_curtain_v7', '1')
    } catch {
      // Ignore storage errors
    }
  }, [])

  useEffect(() => {
    if (prefersReducedMotion) {
      const id = window.requestAnimationFrame(() => setPhase('done'))
      return () => window.cancelAnimationFrame(id)
    }

    let alreadyPlayed = false
    try {
      alreadyPlayed = window.sessionStorage.getItem('portfolio_curtain_v7') === '1'
    } catch {
      alreadyPlayed = false
    }

    if (alreadyPlayed) {
      const id = window.requestAnimationFrame(() => setPhase('done'))
      return () => window.cancelAnimationFrame(id)
    }

    const startId = window.requestAnimationFrame(() => setPhase('intro'))
    const splitTimer = window.setTimeout(() => setPhase('splitting'), 760)
    const doneTimer = window.setTimeout(() => finish(), 1420)

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') finish()
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.cancelAnimationFrame(startId)
      window.clearTimeout(splitTimer)
      window.clearTimeout(doneTimer)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [prefersReducedMotion, finish])

  if (phase === 'done' || phase === 'checking') return null

  const isSplitting = phase === 'splitting'

  return (
    <div
      onClick={finish}
      role="presentation"
      className="fixed inset-0 z-[120] pointer-events-auto select-none overflow-hidden cursor-pointer"
    >
      {/* Top Obsidian Curtain */}
      <motion.div
        initial={{ y: '0%' }}
        animate={{ y: isSplitting ? '-100%' : '0%' }}
        transition={{ duration: 0.64, ease: splitEase }}
        className="absolute inset-x-0 top-0 h-1/2 bg-[#08080B] will-change-transform"
      />

      {/* Bottom Obsidian Curtain */}
      <motion.div
        initial={{ y: '0%' }}
        animate={{ y: isSplitting ? '100%' : '0%' }}
        transition={{ duration: 0.64, ease: splitEase }}
        className="absolute inset-x-0 bottom-0 h-1/2 bg-[#08080B] will-change-transform"
      />

      {/* Center Wordmark & Razor Seam */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: isSplitting ? 0 : 1 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
      >
        <div className="overflow-hidden pb-2">
          <motion.div
            initial={{ y: '115%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 0.52, ease: revealEase }}
            className="text-[22px] sm:text-[28px] font-bold tracking-[-0.035em] text-[#F5F2EC]"
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            Alexis <span className="text-[#D6C09E]">Serano</span>
          </motion.div>
        </div>

        {/* Fine Champagne -> Smoked Sakura Seam */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.62, delay: 0.08, ease: [0.65, 0, 0.35, 1] }}
          className="w-44 sm:w-56 h-[1px] origin-center will-change-transform"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, #D6C09E 45%, #CFA0A8 75%, transparent 100%)',
          }}
        />
      </motion.div>
    </div>
  )
}
