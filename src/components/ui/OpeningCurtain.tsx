'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const splitEase = [0.76, 0, 0.24, 1] as const
const revealEase = [0.16, 1, 0.3, 1] as const

function emitHeroReady() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('portfolio-hero-ready'))
  }
}

export default function OpeningCurtain() {
  const prefersReducedMotion = useReducedMotion()
  const [phase, setPhase] = useState<'checking' | 'intro' | 'splitting' | 'done'>('checking')

  const finish = useCallback(() => {
    emitHeroReady()
    setPhase('done')
    try {
      window.sessionStorage.setItem('portfolio_curtain_v10', '1')
    } catch {
      // Ignore storage errors
    }
  }, [])

  useEffect(() => {
    if (prefersReducedMotion) {
      const id = window.requestAnimationFrame(() => {
        emitHeroReady()
        setPhase('done')
      })
      return () => window.cancelAnimationFrame(id)
    }

    let alreadyPlayed = false
    try {
      alreadyPlayed = window.sessionStorage.setItem !== undefined && window.sessionStorage.getItem('portfolio_curtain_v10') === '1'
    } catch {
      alreadyPlayed = false
    }

    if (alreadyPlayed) {
      const id = window.requestAnimationFrame(() => {
        emitHeroReady()
        setPhase('done')
      })
      return () => window.cancelAnimationFrame(id)
    }

    const startId = window.requestAnimationFrame(() => setPhase('intro'))

    // Trigger Hero entrance right as curtains begin parting so both overlap seamlessly
    const splitTimer = window.setTimeout(() => {
      setPhase('splitting')
      emitHeroReady()
    }, 640)

    const doneTimer = window.setTimeout(() => finish(), 1300)

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
      <motion.div
        initial={{ y: '0%' }}
        animate={{ y: isSplitting ? '-100%' : '0%' }}
        transition={{ duration: 0.64, ease: splitEase }}
        className="absolute inset-x-0 top-0 h-1/2 bg-[#07070B] will-change-transform"
      />

      <motion.div
        initial={{ y: '0%' }}
        animate={{ y: isSplitting ? '100%' : '0%' }}
        transition={{ duration: 0.64, ease: splitEase }}
        className="absolute inset-x-0 bottom-0 h-1/2 bg-[#07070B] will-change-transform"
      />

      <motion.div
        initial={{ opacity: 1, scale: 1 }}
        animate={{ opacity: isSplitting ? 0 : 1, scale: isSplitting ? 0.98 : 1 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
      >
        <div className="overflow-hidden pb-2">
          <motion.div
            initial={{ y: '115%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 0.48, ease: revealEase }}
            className="text-[23px] sm:text-[29px] font-bold tracking-[-0.036em] text-[#F8F5F7]"
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            Alexis <span className="text-[#F29EB2]">Serano.</span>
          </motion.div>
        </div>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.56, delay: 0.05, ease: [0.65, 0, 0.35, 1] }}
          className="w-48 sm:w-60 h-[1px] origin-center will-change-transform"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, #F29EB2 50%, transparent 100%)',
          }}
        />
      </motion.div>
    </div>
  )
}
