'use client'

import { useState, useEffect, useRef } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import Magnetic from '@/components/ui/Magnetic'
import { assetPath } from '@/lib/asset'
import { ArrowUpRight, Check, Copy } from 'lucide-react'

const easeOutExpo = [0.16, 1, 0.3, 1] as const
const firstNameChars = ['A', 'l', 'e', 'x', 'i', 's']

export default function Hero() {
  const { t } = useLanguage()
  const prefersReducedMotion = useReducedMotion()
  const [copied, setCopied] = useState(false)
  const [heroReady, setHeroReady] = useState(false)

  const sectionRef = useRef<HTMLElement>(null)
  const portraitRef = useRef<HTMLDivElement>(null)

  // Cinema camera scroll-recede transition as user scrolls out of Hero
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const heroScale = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [1, 1] : [1, 0.96])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], prefersReducedMotion ? [1, 1] : [1, 0.28])
  const heroY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, 44])

  // Subtle 3D portrait spring parallax
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
    const fallback = window.setTimeout(() => setHeroReady(true), 760)

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
    rawRotateY.set(nx * 10)
    rawRotateX.set(-ny * 10)
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
      ref={sectionRef}
      id="top"
      className="relative min-h-[calc(100svh-3.5rem)] flex flex-col justify-center py-12 sm:py-16 max-w-[1120px] mx-auto px-6"
    >
      <motion.div
        style={{ scale: heroScale, opacity: heroOpacity, y: heroY }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center origin-top will-change-transform"
      >
        {/* Left Column (7 cols): Kinetic Display Title + Bio + Magnetic CTAs */}
        <div className="lg:col-span-7">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={heroReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.58, delay: 0.03, ease: easeOutExpo }}
            className="text-[13.5px] sm:text-[14px] font-medium text-[var(--accent)] tracking-[-0.01em] mb-3"
          >
            {t(
              'Cantons de Genève & Vaud · CDI dès juillet 2027 · Éligible Permis G',
              'Geneva & Vaud Cantons · Full-time from July 2027 · Swiss Permit G eligible'
            )}
          </motion.p>

          <h1
            aria-label="Alexis Serano."
            className="font-extrabold tracking-[-0.046em] leading-[0.95]"
            style={{ fontSize: 'clamp(3.5rem, 7.6vw, 6.4rem)' }}
          >
            {/* Staggered Character-Level GPU Rise on First Name */}
            <span aria-hidden="true" className="flex overflow-hidden pb-1">
              {firstNameChars.map((ch, idx) => (
                <motion.span
                  key={idx}
                  initial={{ y: '115%' }}
                  animate={heroReady ? { y: '0%' } : { y: '115%' }}
                  transition={{
                    duration: 0.74,
                    delay: 0.06 + idx * 0.028,
                    ease: easeOutExpo,
                  }}
                  className="inline-block text-[var(--ink)] will-change-transform"
                >
                  {ch}
                </motion.span>
              ))}
            </span>

            {/* Luminous Sakura Sheen Last Name */}
            <span aria-hidden="true" className="block overflow-hidden pb-2">
              <motion.span
                initial={{ y: '115%' }}
                animate={heroReady ? { y: '0%' } : { y: '115%' }}
                transition={{ duration: 0.82, delay: 0.20, ease: easeOutExpo }}
                className="block will-change-transform"
              >
                <span className="text-sakura-sheen">Serano.</span>
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={heroReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            transition={{ duration: 0.62, delay: 0.28, ease: easeOutExpo }}
            className="mt-3 text-[17.5px] sm:text-[20.5px] font-semibold tracking-[-0.022em] text-[var(--ink)]"
          >
            {t(
              'Développeur Logiciel & Full-Stack · R&D chez Carrier',
              'Software & Full-Stack Developer · R&D at Carrier'
            )}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={heroReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.66, delay: 0.34, ease: easeOutExpo }}
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
            transition={{ duration: 0.66, delay: 0.42, ease: easeOutExpo }}
            className="mt-8 flex flex-wrap items-center gap-3.5"
          >
            <Magnetic strength={0.22}>
              <a
                href={assetPath('/images/Alexis_serano.pdf')}
                target="_blank"
                rel="noopener noreferrer"
                className="roll-btn group inline-flex items-center gap-1.5 px-5.5 py-3 rounded-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--accent-fg)] text-[13.5px] font-semibold pressable shadow-[0_12px_32px_-6px_rgba(242,158,178,0.45)]"
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

        {/* Right Column (5 cols): 3D Perspective Portrait + Open Swiss Credentials */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={heroReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
          transition={{ duration: 0.8, delay: 0.22, ease: easeOutExpo }}
          className="lg:col-span-5 lg:pl-6"
        >
          <div className="flex items-center gap-5 sm:gap-6" style={{ perspective: '900px' }}>
            <motion.div
              ref={portraitRef}
              onPointerMove={handlePortraitMove}
              onPointerLeave={handlePortraitLeave}
              style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
                boxShadow:
                  '0 24px 52px -12px rgba(0, 0, 0, 0.52), 0 0 42px -10px var(--bloom-primary)',
              }}
              className="group/pic relative w-[120px] h-[156px] sm:w-[138px] sm:h-[178px] rounded-[22px] overflow-hidden shrink-0 will-change-transform ring-1 ring-[var(--accent-border)]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={assetPath('/images/alexis-portrait.jpg')}
                alt="Alexis Serano"
                width={313}
                height={679}
                className="w-full h-full object-cover object-[center_46%] contrast-[1.03] saturate-[0.95] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/pic:scale-[1.04]"
                fetchPriority="high"
              />
            </motion.div>

            <div className="space-y-2 text-[13.5px]">
              <div className="text-[16.5px] font-bold text-[var(--ink)] tracking-[-0.02em]">
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

          <div className="mt-8 pt-6 border-t border-[var(--divider)] grid grid-cols-2 gap-6 text-[13px]">
            <div>
              <div className="text-[var(--ink-muted)]">{t('Poste actuel', 'Current role')}</div>
              <div className="mt-1 font-semibold text-[var(--ink)]">
                {t('Alternant R&D · Carrier', 'R&D Apprentice · Carrier')}
              </div>
            </div>
            <div>
              <div className="text-[var(--ink-muted)]">{t('Langues', 'Languages')}</div>
              <div className="mt-1 font-semibold text-[var(--ink)]">
                {t('Français · Anglais B2', 'French · English B2')}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
