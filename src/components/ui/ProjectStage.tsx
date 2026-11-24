'use client'

import { useState, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { assetPath } from '@/lib/asset'
import { RefreshCw, ArrowUpRight } from 'lucide-react'

interface ProjectStageProps {
  slug: string
  title: string
  interactive?: boolean
  compact?: boolean
}

const controllers = [
  {
    id: 'micropc3',
    name: 'Micro PC3',
    family: { fr: 'Régulation CVC compacte', en: 'Compact HVAC controller' },
    runtime: 'REST API · TLS',
  },
  {
    id: 'aeroconnect',
    name: 'AeroConnect',
    family: { fr: 'Centrale de traitement d’air', en: 'Air handling unit controller' },
    runtime: 'REST API · CRA',
  },
  {
    id: 'stone',
    name: 'Carel STone',
    family: { fr: 'Migration depuis C-Suite (Langage ST)', en: 'Migrated from legacy C-Suite (ST)' },
    runtime: 'IEC 61131-3 · ST',
  },
] as const

const chaiPillars = [
  {
    id: 'k3s',
    tab: { fr: 'Cluster K3s', en: 'K3s Cluster' },
    metric: { fr: '2 nœuds virtuels · Haute disponibilité', en: '2 virtual nodes · High availability' },
    detail: {
      fr: 'Nginx Load Balancer, Docker Compose et réplication MariaDB assurant une continuité sans interruption.',
      en: 'Nginx Load Balancer, Docker Compose, and MariaDB replication ensuring zero-downtime continuity.',
    },
  },
  {
    id: 'ad',
    tab: { fr: 'Active Directory & Exchange', en: 'Active Directory & Exchange' },
    metric: { fr: '1 800 comptes normalisés', en: '1,800 standardized accounts' },
    detail: {
      fr: 'Automatisation PowerShell, indexation des requêtes par Hashtables et désactivation de l’automapping Outlook.',
      en: 'PowerShell automation, Hashtable query indexing, and disabled Outlook automapping on workstations.',
    },
  },
  {
    id: 'intranet',
    tab: { fr: 'Portail Intranet', en: 'Intranet Portal' },
    metric: { fr: '23 applications métiers', en: '23 business applications' },
    detail: {
      fr: 'Refonte complète sous WordPress (Astra, ACF, CPT UI) avec rédaction du guide d’administration pour l’équipe RH.',
      en: 'Complete WordPress portal redesign (Astra, ACF, CPT UI) paired with an HR administration guide.',
    },
  },
] as const

const otpSamples = ['482 915', '739 204', '164 820', '905 371']

const stageBackgrounds: Record<string, string> = {
  'alternance-carrier': 'var(--stage-carrier)',
  algofy: 'var(--stage-algofy)',
  lifeos: 'var(--stage-lifeos)',
  'stage-chai': 'var(--stage-chai)',
  'refonte-mobile-web': 'var(--stage-stages)',
  chronia: 'var(--stage-chai)',
}

export default function ProjectStage({
  slug,
  title,
  interactive = false,
  compact = false,
}: ProjectStageProps) {
  const { lang, t } = useLanguage()
  const [selectedCtrl, setSelectedCtrl] = useState<number>(0)
  const [selectedPillar, setSelectedPillar] = useState<number>(0)
  const [otpIndex, setOtpIndex] = useState<number>(0)
  const stageRef = useRef<HTMLDivElement>(null)

  const stageBg = stageBackgrounds[slug] ?? 'var(--surface)'

  // Direct DOM pointer tracking for specular Sakura edge light (0 React re-renders!)
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (interactive || e.pointerType === 'touch' || !stageRef.current) return
    const rect = stageRef.current.getBoundingClientRect()
    stageRef.current.style.setProperty('--sx', `${e.clientX - rect.left}px`)
    stageRef.current.style.setProperty('--sy', `${e.clientY - rect.top}px`)
  }

  if (slug === 'alternance-carrier') {
    const active = controllers[selectedCtrl]
    return (
      <div
        ref={stageRef}
        onPointerMove={handlePointerMove}
        className={`${interactive ? '' : 'stage-interactive'} w-full rounded-[22px] p-5 sm:p-8`}
        style={{ background: stageBg }}
      >
        <div
          style={{ boxShadow: 'var(--shadow-stage)' }}
          className="relative z-10 w-full rounded-[15px] bg-[var(--surface-elevated)] p-5 sm:p-7 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-[var(--divider)]">
            <div className="flex items-center gap-3.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={assetPath('/images/projects/carrier.svg')}
                alt="Carrier"
                className="h-6 sm:h-7 w-auto opacity-95 dark:invert"
              />
              <span className="text-[13px] text-[var(--ink-secondary)] font-medium">
                {t('Commissioning Web & Conformité CRA', 'Web Commissioning & CRA Security')}
              </span>
            </div>
            <span className="text-[12.5px] font-semibold text-[var(--accent)] tabular-nums">
              {t('4 000 000 régulateurs / an', '4,000,000 controllers / yr')}
            </span>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-1.5">
            {controllers.map((ctrl, idx) => {
              const isSelected = idx === selectedCtrl
              return (
                <button
                  key={ctrl.id}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedCtrl(idx)
                  }}
                  className={`relative px-3.5 py-1.5 rounded-full text-[12.5px] font-medium transition-colors cursor-pointer ${
                    isSelected
                      ? 'text-[var(--ink)]'
                      : 'text-[var(--ink-muted)] hover:text-[var(--ink-secondary)]'
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      layoutId={`carrier-ctrl-${interactive ? 'modal' : 'stage'}`}
                      transition={{ type: 'spring', stiffness: 460, damping: 36 }}
                      className="absolute inset-0 rounded-full bg-[var(--accent-soft)] -z-0"
                    />
                  )}
                  <span className="relative z-10">{ctrl.name}</span>
                </button>
              )
            })}
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-[12px] bg-[var(--bg)] p-4">
              <div className="text-[12px] text-[var(--ink-muted)]">
                {t('Famille sélectionnée', 'Selected family')}
              </div>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                >
                  <div className="mt-1 text-[14.5px] font-semibold text-[var(--ink)]">{active.name}</div>
                  <div className="mt-0.5 text-[12.5px] text-[var(--ink-secondary)]">
                    {lang === 'fr' ? active.family.fr : active.family.en}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="rounded-[12px] bg-[var(--bg)] p-4">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[12px] text-[var(--ink-muted)]">
                  {t('Authentification OTP', 'OTP Authentication')}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    setOtpIndex((prev) => (prev + 1) % otpSamples.length)
                  }}
                  aria-label={t('Renouveler le jeton OTP', 'Rotate OTP token')}
                  className="text-[var(--ink-muted)] hover:text-[var(--accent)] transition-transform duration-300 active:rotate-180 cursor-pointer p-0.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="mt-1 h-6 overflow-hidden flex items-center">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={otpSamples[otpIndex]}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.16 }}
                    className="text-[15.5px] font-mono font-semibold tracking-wider text-[var(--accent)] tabular-nums"
                  >
                    {otpSamples[otpIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
              <div className="mt-0.5 text-[12.5px] text-[var(--ink-secondary)]">
                {t('Remplace le PIN statique 4 chiffres', 'Replaces legacy static 4-digit PIN')}
              </div>
            </div>

            <div className="rounded-[12px] bg-[var(--bg)] p-4">
              <div className="text-[12px] text-[var(--ink-muted)]">
                {t('Interface & Runtime', 'Interface & Runtime')}
              </div>
              <div className="mt-1 text-[14.5px] font-semibold text-[var(--ink)]">Alpine.js · API REST</div>
              <div className="mt-0.5 text-[12.5px] text-[var(--ink-secondary)]">{active.runtime}</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (slug === 'stage-chai') {
    const pillar = chaiPillars[selectedPillar]
    return (
      <div
        ref={stageRef}
        onPointerMove={handlePointerMove}
        className={`${interactive ? '' : 'stage-interactive'} w-full rounded-[22px] ${compact ? 'p-4 sm:p-5' : 'p-5 sm:p-7'}`}
        style={{ background: stageBg }}
      >
        <div
          style={{ boxShadow: 'var(--shadow-stage)' }}
          className="relative z-10 w-full rounded-[14px] bg-[var(--surface-elevated)] p-5 sm:p-6 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-2 pb-4 border-b border-[var(--divider)]">
            <div>
              <div className="text-[14.5px] font-bold text-[var(--ink)]">
                Centre Hospitalier Alpes-Isère (CHAI)
              </div>
              <div className="text-[12.5px] text-[var(--ink-muted)]">
                {t('DSI · St-Égrève (1 800 professionnels)', 'Hospital IT · 1,800 staff')}
              </div>
            </div>
            <span className="text-[12px] font-semibold text-[var(--accent)] tabular-nums">
              {t('50 structures · ~300 lits', '50 facilities · ~300 beds')}
            </span>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-1.5">
            {chaiPillars.map((item, idx) => {
              const isSelected = idx === selectedPillar
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedPillar(idx)
                  }}
                  className={`relative px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors cursor-pointer ${
                    isSelected
                      ? 'text-[var(--ink)]'
                      : 'text-[var(--ink-muted)] hover:text-[var(--ink-secondary)]'
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      layoutId={`chai-pillar-${interactive ? 'modal' : 'stage'}`}
                      transition={{ type: 'spring', stiffness: 460, damping: 36 }}
                      className="absolute inset-0 rounded-full bg-[var(--accent-soft)] -z-0"
                    />
                  )}
                  <span className="relative z-10">{lang === 'fr' ? item.tab.fr : item.tab.en}</span>
                </button>
              )
            })}
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.16 }}
              className="mt-3.5 rounded-[12px] bg-[var(--bg)] p-4"
            >
              <div className="text-[13.5px] font-semibold text-[var(--ink)]">
                {lang === 'fr' ? pillar.metric.fr : pillar.metric.en}
              </div>
              <p className="mt-1 text-[13px] text-[var(--ink-secondary)] leading-relaxed">
                {lang === 'fr' ? pillar.detail.fr : pillar.detail.en}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    )
  }

  const screenshotMap: Record<string, string> = {
    algofy: '/images/projects/algofy.png',
    lifeos: '/images/projects/lifeos.png',
    'refonte-mobile-web': '/images/projects/refonte-mobile.jpg',
    chronia: '/images/projects/chronia.png',
  }

  const screenshotSrc = screenshotMap[slug]
  if (!screenshotSrc) return null

  return (
    <div
      ref={stageRef}
      onPointerMove={handlePointerMove}
      className={`${interactive ? '' : 'stage-interactive'} w-full rounded-[22px] ${compact ? 'p-4 sm:p-5' : 'p-4 sm:p-7'} overflow-hidden relative`}
      style={{ background: stageBg }}
    >
      <div
        style={{ boxShadow: 'var(--shadow-stage)' }}
        className={`relative z-10 w-full overflow-hidden rounded-[11px] sm:rounded-[13px] bg-[var(--surface-elevated)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1 group-hover:scale-[1.016] ${
          compact ? 'aspect-[2.05/1]' : ''
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={assetPath(screenshotSrc)}
          alt={title}
          loading={interactive ? 'eager' : 'lazy'}
          decoding={interactive ? 'sync' : 'async'}
          className={`w-full block ${compact ? 'h-full object-cover object-top' : 'h-auto object-cover'}`}
        />

        {/* Floating Reveal Pill on Hover */}
        {!interactive && (
          <div className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#09090D]/85 text-[#F8F5F7] text-[12px] font-medium absolute bottom-3 right-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none ring-1 ring-white/10">
            <span>{t('Explorer', 'Explore')}</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#F29EB2]" />
          </div>
        )}
      </div>
    </div>
  )
}
