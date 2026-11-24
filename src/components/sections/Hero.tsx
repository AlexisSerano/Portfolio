'use client'

import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import Magnetic from '@/components/ui/Magnetic'
import { assetPath } from '@/lib/asset'
import { ArrowUpRight, Check, Copy } from 'lucide-react'

const easeOutExpo = [0.16, 1, 0.3, 1] as const

export default function Hero() {
  const { t } = useLanguage()
  const prefersReducedMotion = useReducedMotion()
  const [copied, setCopied] = useState(false)
  const [heroReady, setHeroReady] = useState(false)

  // Subtle 3D portrait spring parallax
  const portraitRef = useRef<HTMLDivElement>(null)
  const rawRotateX = useMotionValue(0)
  const rawRotateY = useMotionValue(0)
  const rotateX = useSpring(rawRotateX, { stiffness: 260, damping: 24, mass: 0.4 })
  const rotateY = useSpring(rawRotateY, { stiffness: 260, damping: 24, mass: 0.4 })

  useEffect(() => {
    if (prefersReducedMotion) {
      const id = window.requestAnimationFrame(() => setHeroReady(true))
      return () => window.cancelAnimationFrame(id)
    }

    const onReady = () => setHeroReady(true)
    window.addEventListener('portfolio-hero-ready', onReady)

    // Safety fallback so Hero is never stuck hidden
    const fallback = window.setTimeout(() => setHeroReady(true), 780)

    return () => {
      window.removeEventListener('portfolio-hero-ready', onReady)
      window.clearTimeout(fallback)
    }
  }, [prefersReducedMotion])

  const handlePortraitMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || e.pointerType === 'touch' || !portraitRef.current) return
    const rect = portraitRef.current.getBoundingClientRect()
    const nx = (e.clientX - rect.left) / rect.width - 0.5
    const ny = (e.clientY - rect.top) / rect.height - 0.5
    rawRotateY.set(nx * 9)
    rawRotateX.set(-ny * 9)
  }

  const handlePortraitLeave = () => {
    rawRotateX.set(0)
    rawRotateY.set(0)
  }

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('alexis.seranoo@gmail.com')
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2200)
    } catch {
      window.location.href = 'mailto:alexis.seranoo@gmail.com'
    }
  }

  const cvLabel = t('Consulter mon CV', 'Read my Resume')

  return (
    <section
      id="top"
      className="relative min-h-[calc(100svh-3.5rem)] flex flex-col justify-center py-12 sm:py-16 max-w-[1120px] mx-auto px-6"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
        {/* Left Column (7 cols): Choreographed Monumental Entrance */}
        <div className="lg:col-span-7">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={heroReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.58, delay: 0.04, ease: easeOutExpo }}
            className="text-[13.5px] sm:text-[14px] font-medium text-[var(--accent)] tracking-[-0.01em] mb-3"
          >
            {t(
              'Cantons de Genève & Vaud · CDI dès juillet 2027 · Éligible Permis G',
              'Geneva & Vaud Cantons · Full-time from July 2027 · Swiss Permit G eligible'
            )}
          </motion.p>

          <h1
            className="font-extrabold tracking-[-0.045em] leading-[0.97]"
            style={{ fontSize: 'clamp(3.3rem, 7vw, 6rem)' }}
          >
            <span className="block overflow-hidden pb-1">
              <motion.span
                initial={{ y: '112%' }}
                animate={heroReady ? { y: '0%' } : { y: '112%' }}
                transition={{ duration: 0.78, delay: 0.08, ease: easeOutExpo }}
                className="block text-[var(--ink)] will-change-transform"
              >
                Alexis
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-2">
              <motion.span
                initial={{ y: '112%' }}
                animate={heroReady ? { y: '0%' } : { y: '112%' }}
                transition={{ duration: 0.78, delay: 0.16, ease: easeOutExpo }}
                className="block will-change-transform"
              >
                <span className="text-sakura-sheen">Serano.</span>
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={heroReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            transition={{ duration: 0.62, delay: 0.24, ease: easeOutExpo }}
            className="mt-3 text-[17.5px] sm:text-[20px] font-semibold tracking-[-0.022em] text-[var(--ink)]"
          >
            {t(
              'Développeur Logiciel & Full-Stack · R&D chez Carrier',
              'Software & Full-Stack Developer · R&D at Carrier'
            )}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={heroReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.66, delay: 0.30, ease: easeOutExpo }}
            className="mt-5 space-y-3.5 text-[15px] sm:text-[15.75px] leading-[1.68] text-[var(--ink-secondary)] max-w-[590px]"
          >
            <p>
              {t(
                "En dernière année de Bachelor / B.U.T. Informatique (180 ECTS) à l'IUT2 de Grenoble, je conçois des applications backend, des APIs REST, des architectures DevOps et des interfaces web embarquées.",
                'In my final year of a Computer Science Bachelor degree (180 ECTS) at IUT2 Grenoble, I build backend applications, REST APIs, DevOps architectures, and embedded web interfaces.'
              )}
            </p>
            <p>
              {t(
                "Au sein du pôle R&D de Carrier, je refonds l'application web de commissioning et conçois l'authentification OTP sécurisant un parc de 4 millions de régulateurs vendus par an (Cyber Resilience Act), après une expérience en infrastructure Kubernetes et automatisation Active Directory au Centre Hospitalier Alpes-Isère.",
                'Within Carrier’s R&D division, I am redesigning the web commissioning application and architecting OTP authentication across 4 million controllers sold per year (Cyber Resilience Act), following a Kubernetes and Active Directory automation role at Alps-Isère Hospital.'
              )}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={heroReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.66, delay: 0.38, ease: easeOutExpo }}
            className="mt-8 flex flex-wrap items-center gap-3.5"
          >
            <Magnetic strength={0.22}>
              <a
                href={assetPath('/images/Alexis_serano.pdf')}
                target="_blank"
                rel="noopener noreferrer"
                className="roll-btn group inline-flex items-center gap-1.5 px-5 py-3 rounded-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--accent-fg)] text-[13.5px] font-semibold pressable shadow-[0_10px_28px_-6px_rgba(242,158,178,0.42)]"
              >
                <span className="roll-clip">
                  <span className="roll-primary">{cvLabel}</span>
                  <span className="roll-clone" aria-hidden="true">
                    {cvLabel}
                  </span>
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Magnetic>

            <Magnetic strength={0.16}>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-4.5 py-3 rounded-full bg-[var(--surface)] hover:bg-[var(--surface-hover)] text-[var(--ink)] text-[13.5px] font-medium cursor-pointer pressable"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {copied ? (
                    <motion.span
                      key="copied"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.14 }}
                      className="inline-flex items-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5 text-[var(--accent)]" />
                      <span>{t('Email copié', 'Email copied')}</span>
                    </motion.span>
                  ) : (
                    <motion.span
                      key="email"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.14 }}
                      className="inline-flex items-center gap-1.5"
                    >
                      <Copy className="w-3.5 h-3.5 text-[var(--accent)]" />
                      <span>alexis.seranoo@gmail.com</span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </Magnetic>

            <div className="flex items-center gap-4 pl-1 sm:pl-2 text-[13.5px] text-[var(--ink-secondary)]">
              <a
                href="https://github.com/AlexisSerano"
                target="_blank"
                rel="noopener noreferrer"
                className="link-editorial inline-flex items-center gap-0.5 group"
              >
                <span>GitHub</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[var(--ink-muted)] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--accent)]" />
              </a>
              <a href="tel:+33782859504" className="link-editorial tabular-nums">
                +33 7 82 85 95 04
              </a>
            </div>
          </motion.div>
        </div>

        {/* Right Column (5 cols): Interactive 3D Micro-Tilt Portrait & Open Figures */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={heroReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
          transition={{ duration: 0.78, delay: 0.2, ease: easeOutExpo }}
          className="lg:col-span-5 lg:pl-6"
        >
          <div className="flex items-center gap-5 sm:gap-6" style={{ perspective: '800px' }}>
            <motion.div
              ref={portraitRef}
              onPointerMove={handlePortraitMove}
              onPointerLeave={handlePortraitLeave}
              style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
                boxShadow:
                  '0 22px 48px -12px rgba(0, 0, 0, 0.45), 0 0 36px -12px var(--bloom-primary)',
              }}
              className="relative w-[116px] h-[150px] sm:w-[134px] sm:h-[172px] rounded-[22px] overflow-hidden shrink-0 will-change-transform"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={assetPath('/images/alexis-portrait.jpg')}
                alt="Alexis Serano"
                width={313}
                height={679}
                className="w-full h-full object-cover object-[center_46%] contrast-[1.03] saturate-[0.95] transition-transform duration-500 hover:scale-[1.03]"
                fetchPriority="high"
              />
            </motion.div>

            <div className="space-y-2 text-[13.5px]">
              <div className="text-[16px] font-bold text-[var(--ink)] tracking-[-0.02em]">
                {t('Frontière genevoise', 'Geneva border')}
              </div>
              <p className="text-[var(--ink-secondary)] leading-relaxed">
                {t('20 ans · Nationalité française', '20 y/o · French national')}
                <br />
                {t('Permis B · Éligible Permis G', 'Driver license · Permit G')}
                <br />
                <span className="text-[var(--accent)] font-medium">
                  {t('Disponible dès juillet 2027', 'Available from July 2027')}
                </span>
              </p>
            </div>
          </div>

          <div className="mt-9 pt-7 border-t border-[var(--divider)] grid grid-cols-3 gap-5">
            <div>
              <div className="text-[24px] sm:text-[28px] font-extrabold tracking-[-0.035em] text-[var(--accent)] tabular-nums leading-none">
                4M<span className="text-[14px] font-medium text-[var(--ink-muted)]">/an</span>
              </div>
              <div className="mt-2 text-[12px] text-[var(--ink-secondary)] leading-snug">
                {t('Régulateurs sécurisés chez Carrier', 'Controllers secured at Carrier')}
              </div>
            </div>

            <div>
              <div className="text-[24px] sm:text-[28px] font-extrabold tracking-[-0.035em] text-[var(--ink)] tabular-nums leading-none">
                1 800
              </div>
              <div className="mt-2 text-[12px] text-[var(--ink-secondary)] leading-snug">
                {t('Professionnels couverts au CHAI', 'Hospital staff supported')}
              </div>
            </div>

            <div>
              <div className="text-[24px] sm:text-[28px] font-extrabold tracking-[-0.035em] text-[var(--ink)] tabular-nums leading-none">
                180
              </div>
              <div className="mt-2 text-[12px] text-[var(--ink-secondary)] leading-snug">
                {t('Crédits ECTS · Grade Bachelor', 'ECTS · Bachelor Degree')}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
