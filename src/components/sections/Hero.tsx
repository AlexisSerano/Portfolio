'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { assetPath } from '@/lib/asset'
import { ArrowUpRight, Check, Copy } from 'lucide-react'

const easeOutCubic = [0.22, 1, 0.36, 1] as const

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
    <section id="top" className="pt-14 sm:pt-20 pb-16 sm:pb-24 max-w-[920px] mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: easeOutCubic }}
      >
        {/* Identity Header with Real Portrait from CV */}
        <div className="flex items-center gap-4 sm:gap-5 mb-8">
          <div
            className="w-16 h-16 sm:w-[74px] sm:h-[74px] rounded-[14px] overflow-hidden shrink-0 bg-[var(--surface)]"
            style={{ boxShadow: 'var(--shadow-card)' }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={assetPath('/images/alexis-portrait.jpg')}
              alt="Alexis Serano"
              width={148}
              height={148}
              className="w-full h-full object-cover object-[center_28%]"
              fetchPriority="high"
            />
          </div>

          <div className="min-w-0">
            <h1 className="text-[26px] sm:text-[34px] font-semibold tracking-[-0.03em] leading-[1.12] text-[var(--ink)]">
              Alexis Serano
            </h1>
            <p className="text-[14.5px] sm:text-[15.5px] text-[var(--ink-secondary)] mt-0.5 leading-snug">
              {t(
                'Développeur Logiciel & Full-Stack · R&D chez Carrier',
                'Software & Full-Stack Developer · R&D at Carrier'
              )}
            </p>
            <p className="text-[13px] text-[var(--ink-muted)] mt-0.5 leading-snug">
              {t(
                'Mobilité Genève & Vaud dès juillet 2027 · Éligible Permis G',
                'Relocating to Geneva & Vaud from July 2027 · Swiss Permit G eligible'
              )}
            </p>
          </div>
        </div>

        {/* Calm Editorial Bio — Zero Buzzwords, Verified CV Facts */}
        <div className="max-w-[660px] space-y-4 text-[15.5px] sm:text-[16.5px] leading-[1.68] text-[var(--ink-secondary)]">
          <p>
            {t(
              "En dernière année de Bachelor / B.U.T. Informatique (180 ECTS) à l'IUT2 de Grenoble, je conçois des applications backend, des APIs REST, des architectures conteneurisées et des interfaces web embarquées.",
              'In my final year of a Computer Science Bachelor degree (180 ECTS) at IUT2 Grenoble, I build backend applications, REST APIs, containerized infrastructure, and embedded web interfaces.'
            )}
          </p>
          <p>
            {t(
              "Au sein du centre R&D de Carrier, je refonds l'application web de commissioning et conçois l'architecture d'authentification OTP sécurisant un parc de 4 millions de régulateurs vendus par an pour la conformité Cyber Resilience Act, après une expérience en infrastructure Kubernetes et automatisation Active Directory au Centre Hospitalier Alpes-Isère.",
              'Within Carrier’s R&D division, I am redesigning the web commissioning application and architecting OTP authentication across a fleet of 4 million controllers sold per year for Cyber Resilience Act compliance, following an infrastructure and Active Directory automation role at Alps-Isère Hospital.'
            )}
          </p>
        </div>

        {/* Tactile Actions & Direct Links — Zero Borders, Zero Pills */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href={assetPath('/images/Alexis_serano.pdf')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-[8px] bg-[var(--ink)] text-[var(--bg)] text-[13.5px] font-medium hover:opacity-90 pressable"
          >
            <span>{t('Consulter mon CV', 'Read my Resume')}</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-75" />
          </a>

          <button
            type="button"
            onClick={handleCopyEmail}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[8px] bg-[var(--surface)] hover:bg-[var(--surface-hover)] text-[var(--ink)] text-[13.5px] font-medium cursor-pointer pressable"
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
                  <Copy className="w-3.5 h-3.5 text-[var(--ink-muted)]" />
                  <span>alexis.seranoo@gmail.com</span>
                </motion.span>
              )}
            </AnimatePresence>
          </button>

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
        </div>
      </motion.div>
    </section>
  )
}
