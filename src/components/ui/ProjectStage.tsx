'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { assetPath } from '@/lib/asset'
import { RefreshCw } from 'lucide-react'

interface ProjectStageProps {
  slug: string
  title: string
  interactive?: boolean
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

const otpSamples = ['482 915', '739 204', '164 820', '905 371']

export default function ProjectStage({ slug, title, interactive = false }: ProjectStageProps) {
  const { lang, t } = useLanguage()
  const [selectedCtrl, setSelectedCtrl] = useState<number>(0)
  const [otpIndex, setOtpIndex] = useState<number>(0)

  if (slug === 'alternance-carrier') {
    const active = controllers[selectedCtrl]
    return (
      <div className="w-full rounded-[14px] bg-[var(--surface)] p-5 sm:p-8 transition-colors">
        <div
          className="w-full rounded-[10px] bg-[var(--surface-card)] p-5 sm:p-7 transition-colors"
          style={{ boxShadow: 'var(--shadow-stage)' }}
        >
          {/* Top Header with Authentic Carrier Mark */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-[var(--divider)]">
            <div className="flex items-center gap-3.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={assetPath('/images/projects/carrier.svg')}
                alt="Carrier"
                className="h-6 sm:h-7 w-auto opacity-90 dark:invert"
              />
              <span className="text-[13px] text-[var(--ink-muted)]">
                {t('Commissioning Web & Conformité CRA', 'Web Commissioning & CRA Security')}
              </span>
            </div>
            <span className="text-[12.5px] text-[var(--ink-muted)] tabular-nums">
              {t('Parc : 4M régulateurs / an', 'Fleet: 4M controllers / yr')}
            </span>
          </div>

          {/* Controller Family Tabs */}
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
                  className={`relative px-3 py-1.5 rounded-[7px] text-[12.5px] font-medium transition-colors cursor-pointer ${
                    isSelected
                      ? 'text-[var(--ink)]'
                      : 'text-[var(--ink-muted)] hover:text-[var(--ink-secondary)]'
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      layoutId={`carrier-ctrl-${interactive ? 'sheet' : 'stage'}`}
                      transition={{ type: 'spring', stiffness: 450, damping: 36 }}
                      className="absolute inset-0 rounded-[7px] bg-[var(--surface)] -z-0"
                    />
                  )}
                  <span className="relative z-10">{ctrl.name}</span>
                </button>
              )
            })}
          </div>

          {/* Architectural Summary Grid (Soft Surface Blocks, Zero Harsh Borders) */}
          <div className={`mt-4 grid grid-cols-1 ${interactive ? ' gap-2.5' : 'sm:grid-cols-3 gap-3'}`}>
            <div className="rounded-[8px] bg-[var(--surface)] p-4">
              <div className="text-[12px] text-[var(--ink-muted)]">
                {t('Famille sélectionnée', 'Selected family')}
              </div>
              <div className="mt-1 text-[14px] font-semibold text-[var(--ink)]">{active.name}</div>
              <div className="mt-0.5 text-[12.5px] text-[var(--ink-secondary)]">
                {lang === 'fr' ? active.family.fr : active.family.en}
              </div>
            </div>

            <div className="rounded-[8px] bg-[var(--surface)] p-4">
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
                  className="text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors cursor-pointer p-0.5"
                >
                  <RefreshCw className="w-3 h-3" />
                </button>
              </div>
              <div className="mt-1 text-[15px] font-mono font-medium tracking-wider text-[var(--ink)] tabular-nums">
                {otpSamples[otpIndex]}
              </div>
              <div className="mt-0.5 text-[12.5px] text-[var(--ink-secondary)]">
                {t('Remplace le PIN statique 4 chiffres', 'Replaces legacy static 4-digit PIN')}
              </div>
            </div>

            <div className="rounded-[8px] bg-[var(--surface)] p-4">
              <div className="text-[12px] text-[var(--ink-muted)]">
                {t('Interface & Runtime', 'Interface & Runtime')}
              </div>
              <div className="mt-1 text-[14px] font-semibold text-[var(--ink)]">Alpine.js · API REST</div>
              <div className="mt-0.5 text-[12.5px] text-[var(--ink-secondary)]">{active.runtime}</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (slug === 'stage-chai') {
    return (
      <div className="w-full rounded-[14px] bg-[var(--surface)] p-5 sm:p-8 transition-colors">
        <div
          className="w-full rounded-[10px] bg-[var(--surface-card)] p-5 sm:p-7 transition-colors"
          style={{ boxShadow: 'var(--shadow-stage)' }}
        >
          <div className="flex flex-wrap items-baseline justify-between gap-2 pb-5 border-b border-[var(--divider)]">
            <div>
              <div className="text-[14.5px] font-semibold text-[var(--ink)]">
                Centre Hospitalier Alpes-Isère (CHAI)
              </div>
              <div className="text-[12.5px] text-[var(--ink-muted)]">
                {t(
                  'Direction des Systèmes d’Information · Architecture & Automatisation',
                  'Hospital IT Department · Infrastructure & Automation'
                )}
              </div>
            </div>
            <span className="text-[12.5px] text-[var(--ink-muted)] tabular-nums">
              {t('1 800 professionnels · 50 structures', '1,800 staff · 50 facilities')}
            </span>
          </div>

          <div className={`mt-5 grid grid-cols-1 ${interactive ? 'gap-2.5' : 'sm:grid-cols-3 gap-3'}`}>
            <div className="rounded-[8px] bg-[var(--surface)] p-4">
              <div className="text-[12px] text-[var(--ink-muted)]">
                {t('Haute disponibilité', 'High availability')}
              </div>
              <div className="mt-1 text-[14px] font-semibold text-[var(--ink)]">
                {t('Kubernetes (K3s · 2 nœuds)', 'Kubernetes (K3s · 2 nodes)')}
              </div>
              <p className="mt-1 text-[12.5px] text-[var(--ink-secondary)] leading-relaxed">
                {t(
                  'Nginx Load Balancer, Docker Compose et réplication MariaDB sans interruption.',
                  'Nginx Load Balancer, Docker Compose, and zero-downtime MariaDB replication.'
                )}
              </p>
            </div>

            <div className="rounded-[8px] bg-[var(--surface)] p-4">
              <div className="text-[12px] text-[var(--ink-muted)]">
                {t('Annuaire & Messagerie', 'Directory & Messaging')}
              </div>
              <div className="mt-1 text-[14px] font-semibold text-[var(--ink)]">
                Active Directory & Exchange
              </div>
              <p className="mt-1 text-[12.5px] text-[var(--ink-secondary)] leading-relaxed">
                {t(
                  'Normalisation PowerShell (1 800 comptes), Hashtables et fin des lenteurs Outlook.',
                  'PowerShell normalization (1,800 accounts), Hashtables, and Outlook speedup.'
                )}
              </p>
            </div>

            <div className="rounded-[8px] bg-[var(--surface)] p-4">
              <div className="text-[12px] text-[var(--ink-muted)]">
                {t('Portail interne', 'Internal portal')}
              </div>
              <div className="mt-1 text-[14px] font-semibold text-[var(--ink)]">
                {t('23 applications métiers', '23 internal apps')}
              </div>
              <p className="mt-1 text-[12.5px] text-[var(--ink-secondary)] leading-relaxed">
                {t(
                  'Refonte de l’Intranet (WordPress, ACF, CPT UI) et guide d’administration RH.',
                  'Hospital Intranet redesign (WordPress, ACF, CPT UI) with HR admin handbook.'
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Real product screenshots for Algofy, LifeOS, Gestion de Stages, and Chronia
  const screenshotMap: Record<string, string> = {
    algofy: '/images/projects/algofy.png',
    lifeos: '/images/projects/lifeos.png',
    'refonte-mobile-web': '/images/projects/refonte-mobile.jpg',
    chronia: '/images/projects/chronia.png',
  }

  const screenshotSrc = screenshotMap[slug]
  if (!screenshotSrc) return null

  return (
    <div className="w-full rounded-[14px] bg-[var(--surface)] p-4 sm:p-7 overflow-hidden transition-colors">
      <div
        className="w-full overflow-hidden rounded-[8px] sm:rounded-[10px] bg-[var(--surface-card)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.012]"
        style={{ boxShadow: 'var(--shadow-stage)' }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={assetPath(screenshotSrc)}
          alt={title}
          loading="lazy"
          className="w-full h-auto block object-cover"
        />
      </div>
    </div>
  )
}
