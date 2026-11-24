'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'

const easeOutExpo = [0.16, 1, 0.3, 1] as const

export default function ImpactStrip() {
  const { lang } = useLanguage()
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const isInView = useInView(ref, { once: true, margin: '0px 0px -30px 0px' })

  const metrics = [
    {
      figure: '4M',
      suffix: { fr: '/ an', en: '/ yr' },
      accent: true,
      label: {
        fr: 'Régulateurs industriels sécurisés chez Carrier R&D (conformité CRA & OTP)',
        en: 'Industrial controllers secured per year at Carrier R&D (CRA & OTP)',
      },
    },
    {
      figure: '1 800',
      suffix: { fr: '', en: '' },
      accent: false,
      label: {
        fr: 'Professionnels hospitaliers couverts au CHAI (Active Directory & cluster K3s)',
        en: 'Healthcare staff supported at CHAI Hospital (Active Directory & K3s)',
      },
    },
    {
      figure: '23',
      suffix: { fr: ' apps', en: ' apps' },
      accent: false,
      label: {
        fr: 'Applications métiers unifiées sur le nouveau portail intranet hospitalier',
        en: 'Internal business apps unified on the redesigned hospital intranet',
      },
    },
    {
      figure: '180',
      suffix: { fr: ' ECTS', en: ' ECTS' },
      accent: false,
      label: {
        fr: 'Grade de Bachelor en Informatique — IUT2 Université Grenoble Alpes',
        en: 'Bachelor Degree in Computer Science — IUT2 Grenoble Alpes University',
      },
    },
  ]

  return (
    <section aria-label="Chiffres clés" className="py-10 sm:py-14 max-w-[1120px] mx-auto px-6">
      <div
        ref={ref}
        className="py-10 sm:py-12 border-y border-[var(--divider)] grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10"
      >
        {metrics.map((m, idx) => {
          const suffix = lang === 'fr' ? m.suffix.fr : m.suffix.en
          const label = lang === 'fr' ? m.label.fr : m.label.en

          return (
            <div key={m.figure} className="min-w-0">
              <div className="overflow-hidden pb-1">
                <motion.div
                  initial={prefersReducedMotion ? false : { y: '110%' }}
                  animate={prefersReducedMotion || isInView ? { y: '0%' } : { y: '110%' }}
                  transition={{ duration: 0.72, delay: idx * 0.06, ease: easeOutExpo }}
                  className="font-extrabold tracking-[-0.042em] tabular-nums leading-none will-change-transform"
                  style={{ fontSize: 'clamp(2.25rem, 4.2vw, 3.35rem)' }}
                >
                  <span className={m.accent ? 'text-sakura-sheen' : 'text-[var(--ink)]'}>
                    {m.figure}
                  </span>
                  {suffix && (
                    <span className="text-[16px] sm:text-[19px] font-semibold text-[var(--ink-muted)] ml-1">
                      {suffix}
                    </span>
                  )}
                </motion.div>
              </div>

              <motion.p
                initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                animate={prefersReducedMotion || isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                transition={{ duration: 0.56, delay: 0.12 + idx * 0.06, ease: easeOutExpo }}
                className="mt-2.5 text-[13px] sm:text-[13.5px] leading-[1.55] text-[var(--ink-secondary)]"
              >
                {label}
              </motion.p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
