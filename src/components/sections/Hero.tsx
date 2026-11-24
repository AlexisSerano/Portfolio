'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import Magnetic from '@/components/ui/Magnetic'
import { assetPath } from '@/lib/asset'
import { ArrowUpRight, Check, Copy } from 'lucide-react'

const easeOutExpo = [0.16, 1, 0.3, 1] as const

export default function Hero() {
  const { t } = useLanguage()
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('alexis.seranoo@gmail.com')
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2200)
    } catch {
      window.location.href = 'mailto:alexis.seranoo@gmail.com'
    }
  }

  return (
    <section
      id="top"
      className="relative min-h-[calc(100svh-3.5rem)] flex flex-col justify-center py-12 sm:py-16 max-w-[1120px] mx-auto px-6"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
        {/* Left Column (7 cols): Monumental Typography & Actions */}
        <div className="lg:col-span-7">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: easeOutExpo }}
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
                initial={{ y: '108%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.72, delay: 0.12, ease: easeOutExpo }}
                className="block text-[var(--ink)] will-change-transform"
              >
                Alexis
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-2">
              <motion.span
                initial={{ y: '108%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.72, delay: 0.2, ease: easeOutExpo }}
                className="block will-change-transform"
              >
                <span className="text-sakura-sheen">Serano.</span>
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.28, ease: easeOutExpo }}
            className="mt-3 text-[17.5px] sm:text-[20px] font-semibold tracking-[-0.022em] text-[var(--ink)]"
          >
            {t(
              'Développeur Logiciel & Full-Stack · R&D chez Carrier',
              'Software & Full-Stack Developer · R&D at Carrier'
            )}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.34, ease: easeOutExpo }}
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
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.42, ease: easeOutExpo }}
            className="mt-8 flex flex-wrap items-center gap-3.5"
          >
            <Magnetic strength={0.22}>
              <a
                href={assetPath('/images/Alexis_serano.pdf')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--accent-fg)] text-[13.5px] font-semibold pressable shadow-[0_10px_28px_-6px_rgba(242,158,178,0.42)]"
              >
                <span>{t('Consulter mon CV', 'Read my Resume')}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
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
                className="link-editorial inline-flex items-center gap-0.5"
              >
                <span>GitHub</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[var(--ink-muted)]" />
              </a>
              <a href="tel:+33782859504" className="link-editorial tabular-nums">
                +33 7 82 85 95 04
              </a>
            </div>
          </motion.div>
        </div>

        {/* Right Column (5 cols): Open-Space Floating Portrait & Unboxed Key Figures */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.22, ease: easeOutExpo }}
          className="lg:col-span-5 lg:pl-6"
        >
          {/* Portrait + Open Identity */}
          <div className="flex items-center gap-5 sm:gap-6">
            <div
              className="relative w-[116px] h-[150px] sm:w-[134px] sm:h-[172px] rounded-[22px] overflow-hidden shrink-0"
              style={{
                boxShadow:
                  '0 22px 48px -12px rgba(0, 0, 0, 0.45), 0 0 36px -12px var(--bloom-primary)',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={assetPath('/images/alexis-portrait.jpg')}
                alt="Alexis Serano"
                width={313}
                height={679}
                className="w-full h-full object-cover object-[center_46%] contrast-[1.03] saturate-[0.95]"
                fetchPriority="high"
              />
            </div>

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

          {/* Open Unboxed Key Figures — Zero Rectangular Cages */}
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
