'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import FadeIn from '@/components/ui/FadeIn'
import ProjectStage from '@/components/ui/ProjectStage'
import ProjectDetailModal from '@/components/ui/ProjectDetailModal'
import { projects, type Project } from '@/data/projects'
import { ArrowUpRight } from 'lucide-react'

const flagshipOrder = [
  'alternance-carrier',
  'algofy',
  'lifeos',
  'stage-chai',
  'refonte-mobile-web',
]

export default function Projects() {
  const { lang, t } = useLanguage()
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [hoveredArchive, setHoveredArchive] = useState<string | null>(null)

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
      if (found) setSelectedProject(found)
    }

    window.addEventListener('portfolio-open-project', handleGlobalOpen)
    return () => window.removeEventListener('portfolio-open-project', handleGlobalOpen)
  }, [])

  const selectedIndex = selectedProject ? orderedAll.findIndex((p) => p.slug === selectedProject.slug) : -1
  const hasPrev = selectedIndex > 0
  const hasNext = selectedIndex >= 0 && selectedIndex < orderedAll.length - 1

  const handleNavigate = (direction: 'prev' | 'next') => {
    if (selectedIndex === -1) return
    if (direction === 'prev' && hasPrev) {
      setSelectedProject(orderedAll[selectedIndex - 1])
    } else if (direction === 'next' && hasNext) {
      setSelectedProject(orderedAll[selectedIndex + 1])
    }
  }

  const renderFlagshipCard = (project: Project, compact = false) => {
    const title = lang === 'fr' ? project.title.fr : project.title.en
    const desc = lang === 'fr' ? project.description.fr : project.description.en

    return (
      <article
        role="button"
        tabIndex={0}
        onClick={() => setSelectedProject(project)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            setSelectedProject(project)
          }
        }}
        aria-label={t(`Ouvrir le projet ${project.title.fr}`, `Open project ${project.title.en}`)}
        className="group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-[22px] flex flex-col h-full"
      >
        <ProjectStage slug={project.slug} title={title} compact={compact} />

        <div className="mt-4 px-1 flex-1 flex flex-col">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="text-[18px] sm:text-[19.5px] font-bold tracking-[-0.024em] text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors">
              {title}
            </h3>
            <span className="inline-flex items-center gap-1 text-[13px] font-medium text-[var(--ink-muted)] group-hover:text-[var(--accent)] tabular-nums shrink-0 transition-colors">
              <span>{project.year}</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
      <FadeIn>
        <div className="mb-12 sm:mb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <h2 className="text-[28px] sm:text-[36px] font-bold tracking-[-0.036em] text-[var(--ink)]">
              {t('Projets sélectionnés', 'Selected projects')}
            </h2>
            <p className="mt-1.5 text-[15px] text-[var(--ink-secondary)]">
              {t(
                'Applications R&D, infrastructures critiques et produits développés de bout en bout.',
                'R&D software, critical infrastructure, and end-to-end products.'
              )}
            </p>
          </div>
          <span className="text-[13px] text-[var(--accent)] font-medium">
            {t('Cliquer sur un projet pour ouvrir l’aperçu complet', 'Click any project to open full view')}
          </span>
        </div>
      </FadeIn>

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

      {/* Open-Space Spotlight Archive (Zero Enclosing Box) */}
      <div className="mt-24 sm:mt-28">
        <FadeIn>
          <h3 className="text-[20px] sm:text-[22px] font-bold tracking-[-0.028em] text-[var(--ink)] mb-6">
            {t('Autres projets & travaux', 'Other projects & work')}
          </h3>
        </FadeIn>

        <FadeIn delay={0.05}>
          <div
            onMouseLeave={() => setHoveredArchive(null)}
            className="-mx-4 group/archive divide-y divide-[var(--divider)] border-t border-[var(--divider)]"
          >
            {archiveProjects.map((project) => {
              const title = lang === 'fr' ? project.title.fr : project.title.en
              const desc = lang === 'fr' ? project.description.fr : project.description.en
              const isHovered = hoveredArchive === project.slug

              return (
                <button
                  key={project.slug}
                  type="button"
                  onMouseEnter={() => setHoveredArchive(project.slug)}
                  onClick={() => setSelectedProject(project)}
                  className="relative w-full text-left py-4 px-4 transition-opacity duration-200 group-hover/archive:opacity-55 hover:!opacity-100 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                >
                  {isHovered && (
                    <motion.span
                      layoutId="archive-spotlight"
                      transition={{ type: 'spring', stiffness: 460, damping: 38 }}
                      className="absolute inset-x-0 inset-y-1 rounded-[14px] bg-[var(--accent-soft)] -z-0"
                    />
                  )}
                  <div className="relative z-10">
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="text-[15px] font-semibold text-[var(--ink)]">
                        {title}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[13px] text-[var(--accent)] tabular-nums shrink-0">
                        <span>{project.year}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                    <p className="mt-0.5 text-[14px] text-[var(--ink-secondary)] leading-relaxed max-w-[780px]">
                      {desc}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>
        </FadeIn>
      </div>

      <ProjectDetailModal
        project={selectedProject}
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
