'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import FadeIn from '@/components/ui/FadeIn'
import SectionHeading from '@/components/ui/SectionHeading'
import ProjectStage from '@/components/ui/ProjectStage'
import ProjectDetailModal from '@/components/ui/ProjectDetailModal'
import { projects, type Project } from '@/data/projects'
import { assetPath } from '@/lib/asset'
import { ArrowUpRight } from 'lucide-react'

const flagshipOrder = [
  'alternance-carrier',
  'algofy',
  'lifeos',
  'stage-chai',
  'refonte-mobile-web',
]

// Custom visual/editorial filmstrip slide metadata for Archive items (zero cheesy stock images)
const archiveLensMeta: Record<
  string,
  {
    screenshot?: string
    eyebrow: string
    headline: { fr: string; en: string }
    gradient: string
  }
> = {
  chronia: {
    eyebrow: 'PHP · AJAX · SQL',
    headline: { fr: 'Aide à la personne & planning partagé', en: 'Caregiving & shared schedule' },
    gradient: 'linear-gradient(135deg, #25131E 0%, #151322 100%)',
  },
  'agence-voyages-javafx': {
    eyebrow: 'Java · JavaFX · MVC / DAO',
    headline: {
      fr: 'Catalogue multicritères, panier & devis JSON',
      en: 'Multi-criteria catalog, cart & JSON quotes',
    },
    gradient: 'linear-gradient(135deg, #171424 0%, #23141E 100%)',
  },
  chatenger: {
    eyebrow: 'PHP · MySQL · Sécurité Web',
    headline: {
      fr: 'Messagerie instantanée, bcrypt & bouclier XSS/SQLi',
      en: 'Live web messaging, bcrypt & XSS/SQLi shield',
    },
    gradient: 'linear-gradient(135deg, #1E131C 0%, #121722 100%)',
  },
  'modele-neurone': {
    eyebrow: 'Python · NumPy · TensorFlow',
    headline: {
      fr: 'Perceptron from scratch, descente de gradient & ReLU',
      en: 'Perceptron from scratch, gradient descent & ReLU',
    },
    gradient: 'linear-gradient(135deg, #121B22 0%, #1D1320 100%)',
  },
  'trading-investissement': {
    eyebrow: 'Finance Quant · DeFi / DEX',
    headline: {
      fr: 'Flux de liquidité, carnet d’ordres & gestion du risque',
      en: 'Liquidity flows, orderbook & strict risk sizing',
    },
    gradient: 'linear-gradient(135deg, #111D1B 0%, #1C131C 100%)',
  },
  'montage-video': {
    screenshot: '/images/projects/montage-video.jpg',
    eyebrow: 'Premiere Pro · After Effects',
    headline: { fr: '7+ ans de montage, motion & sound design', en: '7+ yrs of editing & motion design' },
    gradient: 'linear-gradient(135deg, #1D1422 0%, #14131B 100%)',
  },
}

export default function Projects() {
  const { lang, t } = useLanguage()
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [navDirection, setNavDirection] = useState<number>(1)
  const [hoveredArchiveIdx, setHoveredArchiveIdx] = useState<number | null>(null)

  const archiveWrapRef = useRef<HTMLDivElement>(null)
  const rawLensX = useMotionValue(0)
  const rawLensY = useMotionValue(0)
  const lensX = useSpring(rawLensX, { stiffness: 320, damping: 28, mass: 0.35 })
  const lensY = useSpring(rawLensY, { stiffness: 320, damping: 28, mass: 0.35 })

  const bySlug = (slug: string) => projects.find((p) => p.slug === slug)
  const carrierProject = bySlug('alternance-carrier')
  const algofyProject = bySlug('algofy')
  const lifeosProject = bySlug('lifeos')
  const chaiProject = bySlug('stage-chai')
  const stagesProject = bySlug('refonte-mobile-web')

  const flagshipProjects = flagshipOrder
    .map((slug) => bySlug(slug))
    .filter((p): p is Project => Boolean(p))

  const archiveProjects = projects.filter((p) => !flagshipOrder.includes(p.slug))
  const orderedAll = [...flagshipProjects, ...archiveProjects]

  useEffect(() => {
    const handleGlobalOpen = (event: Event) => {
      if (!(event instanceof CustomEvent)) return
      const detail: unknown = event.detail
      if (typeof detail !== 'object' || detail === null || !('slug' in detail) || typeof detail.slug !== 'string') {
        return
      }
      const found = projects.find((p) => p.slug === detail.slug)
      if (found) {
        setNavDirection(1)
        setSelectedProject(found)
      }
    }

    window.addEventListener('portfolio-open-project', handleGlobalOpen)
    return () => window.removeEventListener('portfolio-open-project', handleGlobalOpen)
  }, [])

  // Warm screenshot cache as soon as any modal opens so <- / -> navigation is 0ms instant
  useEffect(() => {
    if (!selectedProject) return
    const preloadPaths = [
      '/images/projects/algofy.png',
      '/images/projects/lifeos.png',
      '/images/projects/refonte-mobile.jpg',
      '/images/projects/chronia.png',
    ]
    for (const p of preloadPaths) {
      const img = new window.Image()
      img.src = assetPath(p)
    }
  }, [selectedProject])

  const selectedIndex = selectedProject ? orderedAll.findIndex((p) => p.slug === selectedProject.slug) : -1
  const hasPrev = selectedIndex > 0
  const hasNext = selectedIndex >= 0 && selectedIndex < orderedAll.length - 1

  const handleNavigate = (direction: 'prev' | 'next') => {
    if (selectedIndex === -1) return
    if (direction === 'prev' && hasPrev) {
      setNavDirection(-1)
      setSelectedProject(orderedAll[selectedIndex - 1])
    } else if (direction === 'next' && hasNext) {
      setNavDirection(1)
      setSelectedProject(orderedAll[selectedIndex + 1])
    }
  }

  const handleArchivePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'touch' || !archiveWrapRef.current) return
    const rect = archiveWrapRef.current.getBoundingClientRect()
    rawLensX.set(e.clientX - rect.left + 24)
    rawLensY.set(e.clientY - rect.top - 86)
  }

  const renderFlagshipCard = (project: Project, compact = false) => {
    const title = lang === 'fr' ? project.title.fr : project.title.en
    const desc = lang === 'fr' ? project.description.fr : project.description.en

    return (
      <article
        role="button"
        tabIndex={0}
        onClick={() => {
          setNavDirection(1)
          setSelectedProject(project)
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            setNavDirection(1)
            setSelectedProject(project)
          }
        }}
        aria-label={t(`Ouvrir le projet ${project.title.fr}`, `Open project ${project.title.en}`)}
        className="group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-[22px] flex flex-col h-full"
      >
        <ProjectStage slug={project.slug} title={title} compact={compact} />

        <div className="mt-4 px-1 flex-1 flex flex-col">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="text-[18px] sm:text-[19.5px] font-bold tracking-[-0.024em] text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors duration-200">
              {title}
            </h3>
            <span className="inline-flex items-center gap-1 text-[13px] font-medium text-[var(--ink-muted)] group-hover:text-[var(--accent)] tabular-nums shrink-0 transition-colors duration-200">
              <span>{project.year}</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>

          <p className="mt-1.5 text-[14.5px] leading-[1.65] text-[var(--ink-secondary)] max-w-[760px]">
            {desc}
          </p>

          <p className="mt-2.5 text-[12.5px] text-[var(--ink-muted)] leading-relaxed">
            {project.tags.slice(0, compact ? 5 : 8).join(' · ')}
          </p>
        </div>
      </article>
    )
  }

  return (
    <section id="projects" className="scroll-mt-20 py-20 sm:py-28 max-w-[1120px] mx-auto px-6">
      <div className="mb-12 sm:mb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <SectionHeading
          title={t('Projets sélectionnés', 'Selected projects')}
          subtitle={t(
            'Applications R&D, infrastructures critiques et produits développés de bout en bout.',
            'R&D software, critical infrastructure, and end-to-end products.'
          )}
        />
        <span className="text-[13px] text-[var(--accent)] font-medium">
          {t('Cliquer sur un projet pour ouvrir l’aperçu complet', 'Click any project to open full view')}
        </span>
      </div>

      <div className="space-y-16 sm:space-y-20">
        {carrierProject && <FadeIn>{renderFlagshipCard(carrierProject, false)}</FadeIn>}

        {algofyProject && lifeosProject && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-9 items-stretch">
            <FadeIn>{renderFlagshipCard(algofyProject, true)}</FadeIn>
            <FadeIn delay={0.06}>{renderFlagshipCard(lifeosProject, true)}</FadeIn>
          </div>
        )}

        {chaiProject && stagesProject && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-9 items-stretch">
            <FadeIn>{renderFlagshipCard(chaiProject, true)}</FadeIn>
            <FadeIn delay={0.06}>{renderFlagshipCard(stagesProject, true)}</FadeIn>
          </div>
        )}
      </div>

      {/* Open-Space Archive + Awwwards-Style Floating Filmstrip Lens */}
      <div className="mt-24 sm:mt-28">
        <FadeIn>
          <h3 className="text-[22px] sm:text-[26px] font-bold tracking-[-0.032em] text-[var(--ink)] mb-6">
            {t('Autres projets & travaux', 'Other projects & work')}
          </h3>
        </FadeIn>

        <FadeIn delay={0.05}>
          <div
            ref={archiveWrapRef}
            onPointerMove={handleArchivePointerMove}
            onMouseLeave={() => setHoveredArchiveIdx(null)}
            className="relative -mx-4 group/archive divide-y divide-[var(--divider)] border-y border-[var(--divider)]"
          >
            {archiveProjects.map((project, idx) => {
              const title = lang === 'fr' ? project.title.fr : project.title.en
              const desc = lang === 'fr' ? project.description.fr : project.description.en
              const isHovered = hoveredArchiveIdx === idx

              return (
                <button
                  key={project.slug}
                  type="button"
                  onMouseEnter={() => setHoveredArchiveIdx(idx)}
                  onClick={() => {
                    setNavDirection(1)
                    setSelectedProject(project)
                  }}
                  className="group/row relative w-full text-left py-5 px-4 transition-opacity duration-200 group-hover/archive:opacity-50 hover:!opacity-100 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                >
                  {isHovered && (
                    <motion.span
                      layoutId="archive-spotlight"
                      transition={{ type: 'spring', stiffness: 480, damping: 38 }}
                      className="absolute inset-x-0 inset-y-1.5 rounded-[14px] bg-[var(--accent-soft)] -z-0"
                    />
                  )}
                  <div className="relative z-10 flex items-baseline justify-between gap-6">
                    <div className="min-w-0">
                      <span className="text-[16px] sm:text-[17.5px] font-bold tracking-[-0.02em] text-[var(--ink)] group-hover/row:text-[var(--accent)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/row:translate-x-2 inline-block">
                        {title}
                      </span>
                      <p className="mt-0.5 text-[14px] text-[var(--ink-secondary)] leading-relaxed max-w-[700px] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/row:translate-x-2">
                        {desc}
                      </p>
                    </div>

                    <span className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-[var(--accent)] tabular-nums shrink-0">
                      <span>{project.year}</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/row:translate-x-0.5 group-hover/row:-translate-y-0.5" />
                    </span>
                  </div>
                </button>
              )
            })}

            {/* Floating Cursor-Tracking Filmstrip Preview Lens (Desktop) */}
            <motion.div
              aria-hidden="true"
              style={{ x: lensX, y: lensY }}
              initial={false}
              animate={{
                opacity: hoveredArchiveIdx !== null ? 1 : 0,
                scale: hoveredArchiveIdx !== null ? 1 : 0.78,
              }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="hidden lg:block pointer-events-none absolute top-0 left-0 z-30 w-[290px] h-[176px] rounded-[18px] overflow-hidden ring-1 ring-[var(--accent-border)] will-change-transform"
            >
              <div
                className="w-full h-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] will-change-transform"
                style={{
                  transform: `translate3d(0, -${(hoveredArchiveIdx ?? 0) * 100}%, 0)`,
                }}
              >
                {archiveProjects.map((project) => {
                  const meta = archiveLensMeta[project.slug] ?? {
                    eyebrow: project.tags.slice(0, 2).join(' · '),
                    headline: project.title,
                    gradient: 'linear-gradient(135deg, #18131E 0%, #11131B 100%)',
                  }

                  return (
                    <div
                      key={project.slug}
                      className="w-full h-[176px] relative overflow-hidden flex flex-col justify-between p-4 text-[#F8F5F7]"
                      style={{ background: meta.gradient }}
                    >
                      {meta.screenshot && (
                        <>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={assetPath(meta.screenshot)}
                            alt=""
                            loading="lazy"
                            className="absolute inset-0 w-full h-full object-cover opacity-55"
                          />
                          <div
                            className="absolute inset-0"
                            style={{
                              background:
                                'linear-gradient(180deg, rgba(9,9,13,0.35) 0%, rgba(9,9,13,0.88) 100%)',
                            }}
                          />
                        </>
                      )}

                      <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-[#F29EB2]">
                        <span>{meta.eyebrow}</span>
                        <span>{project.year}</span>
                      </div>

                      <div className="relative z-10">
                        <div className="text-[14px] font-bold leading-snug tracking-[-0.015em] text-[#F8F5F7]">
                          {lang === 'fr' ? meta.headline.fr : meta.headline.en}
                        </div>
                        <div className="mt-1 text-[11.5px] text-[#C8C0CC] inline-flex items-center gap-1">
                          <span>{t('Cliquer pour ouvrir', 'Click to inspect')}</span>
                          <ArrowUpRight className="w-3 h-3 text-[#F29EB2]" />
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </FadeIn>
      </div>

      <ProjectDetailModal
        project={selectedProject}
        direction={navDirection}
        onClose={() => setSelectedProject(null)}
        onNavigate={handleNavigate}
        hasPrev={hasPrev}
        hasNext={hasNext}
        currentIndex={selectedIndex}
        totalCount={orderedAll.length}
      />
    </section>
  )
}
