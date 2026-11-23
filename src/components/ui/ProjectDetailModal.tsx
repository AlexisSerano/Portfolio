'use client'

import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import ProjectStage from '@/components/ui/ProjectStage'
import type { Project } from '@/data/projects'
import { X, ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'

interface ProjectDetailModalProps {
  project: Project | null
  onClose: () => void
  onNavigate: (direction: 'prev' | 'next') => void
  hasPrev: boolean
  hasNext: boolean
}

const visualSlugs = new Set(['alternance-carrier', 'stage-chai', 'algofy', 'lifeos', 'refonte-mobile-web', 'chronia'])

export default function ProjectDetailModal({
  project,
  onClose,
  onNavigate,
  hasPrev,
  hasNext,
}: ProjectDetailModalProps) {
  const { lang, t } = useLanguage()

  useEffect(() => {
    const isOpen = Boolean(project)
    window.dispatchEvent(new CustomEvent('portfolio-modal-toggle', { detail: { isOpen } }))
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [project])

  useEffect(() => {
    if (!project) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft' && hasPrev) onNavigate('prev')
      if (e.key === 'ArrowRight' && hasNext) onNavigate('next')
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [project, onClose, onNavigate, hasPrev, hasNext])

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          {/* Soft Translucent Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/25 dark:bg-black/60 backdrop-blur-[2px]"
          />

          {/* Slide-Over Sheet (Vaul / Emil Kowalski Spring Physics) */}
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label={lang === 'fr' ? project.title.fr : project.title.en}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 380, damping: 38 }}
            className="relative z-10 w-full max-w-[600px] h-dvh bg-[var(--bg)] text-[var(--ink)] flex flex-col overflow-hidden"
            style={{ boxShadow: 'var(--shadow-sheet)' }}
          >
            {/* Minimal Sticky Header */}
            <div className="px-6 sm:px-8 h-14 flex items-center justify-between shrink-0 bg-[var(--bg)]">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => onNavigate('prev')}
                  disabled={!hasPrev}
                  aria-label={t('Projet précédent', 'Previous project')}
                  className="w-8 h-8 rounded-[7px] flex items-center justify-center text-[var(--ink-secondary)] hover:text-[var(--ink)] hover:bg-[var(--surface)] disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('next')}
                  disabled={!hasNext}
                  aria-label={t('Projet suivant', 'Next project')}
                  className="w-8 h-8 rounded-[7px] flex items-center justify-center text-[var(--ink-secondary)] hover:text-[var(--ink)] hover:bg-[var(--surface)] disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label={t('Fermer', 'Close')}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-[7px] text-[13px] text-[var(--ink-secondary)] hover:text-[var(--ink)] hover:bg-[var(--surface)] transition-colors cursor-pointer"
              >
                <span>{t('Fermer', 'Close')}</span>
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Case Study Content */}
            <div data-lenis-prevent className="flex-1 overflow-y-auto px-6 sm:px-8 pt-4 pb-16">
              <div className="text-[13px] text-[var(--ink-muted)] tabular-nums">
                {project.year} · {lang === 'fr' ? project.details.duration.fr : project.details.duration.en}
              </div>

              <h2 className="mt-1.5 text-[22px] sm:text-[26px] font-semibold tracking-[-0.028em] leading-[1.2] text-[var(--ink)]">
                {lang === 'fr' ? project.title.fr : project.title.en}
              </h2>

              <p className="mt-1.5 text-[14px] text-[var(--ink-secondary)]">
                {lang === 'fr' ? project.details.role.fr : project.details.role.en}
              </p>

              {/* External Links if Present */}
              {(project.links.live || project.links.github) && (
                <div className="mt-4 flex flex-wrap items-center gap-4 text-[13.5px]">
                  {project.links.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3.5 py-2 rounded-[8px] bg-[var(--ink)] text-[var(--bg)] font-medium pressable"
                    >
                      <span>{t('Voir le projet en ligne', 'Open live project')}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
                    </a>
                  )}
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-editorial inline-flex items-center gap-0.5 text-[var(--ink-secondary)]"
                    >
                      <span>{t('Code source sur GitHub', 'Source code on GitHub')}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              )}

              {/* Visual Stage ONLY for Real Screenshots & Custom R&D/CHAI Stages (No Stock Photos) */}
              {visualSlugs.has(project.slug) && (
                <div className="mt-7">
                  <ProjectStage
                    slug={project.slug}
                    title={lang === 'fr' ? project.title.fr : project.title.en}
                    interactive
                  />
                </div>
              )}

              {/* Context */}
              <div className="mt-8">
                <h3 className="text-[13.5px] font-semibold text-[var(--ink)] mb-2">
                  {t('Contexte', 'Context')}
                </h3>
                <p className="text-[14.5px] leading-[1.68] text-[var(--ink-secondary)]">
                  {lang === 'fr' ? project.details.context.fr : project.details.context.en}
                </p>
              </div>

              {/* Highlights */}
              <div className="mt-7">
                <h3 className="text-[13.5px] font-semibold text-[var(--ink)] mb-2.5">
                  {t('Réalisations techniques', 'Key engineering work')}
                </h3>
                <ul className="space-y-2.5 text-[14.5px] leading-[1.65] text-[var(--ink-secondary)]">
                  {(lang === 'fr' ? project.details.highlights.fr : project.details.highlights.en).map(
                    (bullet, idx) => (
                      <li key={idx} className="pl-4 relative">
                        <span
                          aria-hidden="true"
                          className="absolute left-0 top-[0.68em] w-1.5 h-[1px] bg-[var(--ink-muted)]"
                        />
                        {bullet}
                      </li>
                    )
                  )}
                </ul>
              </div>

              {/* Learnings */}
              {project.details.learnings && (
                <div className="mt-7">
                  <h3 className="text-[13.5px] font-semibold text-[var(--ink)] mb-2">
                    {t('Apport principal', 'Key takeaway')}
                  </h3>
                  <p className="text-[14.5px] leading-[1.68] text-[var(--ink-secondary)]">
                    {lang === 'fr' ? project.details.learnings.fr : project.details.learnings.en}
                  </p>
                </div>
              )}

              {/* Stack */}
              <div className="mt-7">
                <h3 className="text-[13.5px] font-semibold text-[var(--ink)] mb-1.5">
                  {t('Environnement technique', 'Technical stack')}
                </h3>
                <p className="text-[13.5px] text-[var(--ink-muted)] leading-relaxed">
                  {project.tags.join(' · ')}
                </p>
              </div>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>,
    document.body
  )
}
