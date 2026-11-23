'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import FadeIn from '@/components/ui/FadeIn'
import ProjectStage from '@/components/ui/ProjectStage'
import ProjectDetailModal from '@/components/ui/ProjectDetailModal'
import { projects, type Project } from '@/data/projects'
import { ArrowUpRight } from 'lucide-react'

const flagshipOrder = [
  'alternance-carrier',
  'stage-chai',
  'algofy',
  'lifeos',
  'refonte-mobile-web',
]

export default function Projects() {
  const { lang, t } = useLanguage()
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const flagshipProjects = flagshipOrder
    .map((slug) => projects.find((p) => p.slug === slug))
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

  return (
    <section id="projects" className="scroll-mt-20 py-14 sm:py-20 max-w-[920px] mx-auto px-6">
      <FadeIn>
        <div className="mb-10 sm:mb-14">
          <h2 className="text-[19px] sm:text-[21px] font-semibold tracking-[-0.024em] text-[var(--ink)]">
            {t('Projets sélectionnés', 'Selected projects')}
          </h2>
          <p className="mt-1 text-[14.5px] text-[var(--ink-muted)]">
            {t(
              'Applications R&D, infrastructures critiques et produits développés de bout en bout.',
              'R&D software, critical infrastructure, and end-to-end products.'
            )}
          </p>
        </div>
      </FadeIn>

      {/* 5 Flagship Showcases — Open Typography + Soft Tonal Stages */}
      <div className="space-y-16 sm:space-y-24">
        {flagshipProjects.map((project) => {
          const title = lang === 'fr' ? project.title.fr : project.title.en
          const desc = lang === 'fr' ? project.description.fr : project.description.en

          return (
            <FadeIn key={project.slug}>
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
                className="group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-[14px]"
              >
                <ProjectStage slug={project.slug} title={title} />

                <div className="mt-5 px-0.5">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-[17px] sm:text-[18.5px] font-semibold tracking-[-0.02em] text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors">
                      {title}
                    </h3>
                    <span className="inline-flex items-center gap-1 text-[13.5px] text-[var(--ink-muted)] tabular-nums shrink-0">
                      <span>{project.year}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--ink)]" />
                    </span>
                  </div>

                  <p className="mt-1.5 text-[14.5px] sm:text-[15px] leading-[1.65] text-[var(--ink-secondary)] max-w-[740px]">
                    {desc}
                  </p>

                  <p className="mt-2.5 text-[13px] text-[var(--ink-muted)] leading-relaxed">
                    {project.tags.join(' · ')}
                  </p>
                </div>
              </article>
            </FadeIn>
          )
        })}
      </div>

      {/* Pure-Text Editorial Archive (Rauno Freiberg Sibling-Dimming Spotlight Hover) */}
      <div className="mt-20 sm:mt-28">
        <FadeIn>
          <h3 className="text-[16px] font-semibold tracking-[-0.018em] text-[var(--ink)] mb-5">
            {t('Autres projets & travaux', 'Other projects & work')}
          </h3>
        </FadeIn>

        <div className="group/archive space-y-0.5">
          {archiveProjects.map((project, idx) => {
            const title = lang === 'fr' ? project.title.fr : project.title.en
            const desc = lang === 'fr' ? project.description.fr : project.description.en

            return (
              <FadeIn key={project.slug} delay={idx * 0.03}>
                <div className="-mx-3.5">
                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="w-full text-left py-3.5 px-3.5 rounded-[10px] hover:bg-[var(--surface)] transition-all duration-200 group-hover/archive:opacity-55 hover:!opacity-100 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="text-[14.5px] font-medium text-[var(--ink)]">{title}</span>
                      <span className="inline-flex items-center gap-1 text-[13px] text-[var(--ink-muted)] tabular-nums shrink-0">
                        <span>{project.year}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                    <p className="mt-0.5 text-[13.5px] text-[var(--ink-secondary)] leading-relaxed max-w-[680px]">
                      {desc}
                    </p>
                  </button>
                </div>
              </FadeIn>
            )
          })}
        </div>
      </div>

      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onNavigate={handleNavigate}
        hasPrev={hasPrev}
        hasNext={hasNext}
      />
    </section>
  )
}
