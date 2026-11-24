'use client'

import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import ProjectStage from '@/components/ui/ProjectStage'
import type { Project } from '@/data/projects'
import { X, ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'

interface ProjectDetailModalProps {
  project: Project | null
  direction: number
  onClose: () => void
  onNavigate: (direction: 'prev' | 'next') => void
  hasPrev: boolean
  hasNext: boolean
  currentIndex: number
  totalCount: number
}

const visualSlugs = new Set([
  'alternance-carrier',
  'stage-chai',
  'algofy',
  'lifeos',
  'refonte-mobile-web',
  'chronia',
])

const easeOutExpo = [0.16, 1, 0.3, 1] as const

export default function ProjectDetailModal({
  project,
  direction,
  onClose,
  onNavigate,
  hasPrev,
  hasNext,
  currentIndex,
  totalCount,
}: ProjectDetailModalProps) {
  const { lang, t } = useLanguage()
  const scrollBodyRef = useRef<HTMLDivElement>(null)
  const isOpen = Boolean(project)

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('portfolio-modal-toggle', { detail: { isOpen } }))
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    if (scrollBodyRef.current) {
      scrollBodyRef.current.scrollTop = 0
    }
  }, [project?.slug])

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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 md:p-10">
          {/* Frosted Cinema Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/72 backdrop-blur-lg will-change-[opacity]"
          />

          {/* Centered Wide Cinema Modal */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={lang === 'fr' ? project.title.fr : project.title.en}
            initial={{ opacity: 0, scale: 0.94, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.34, ease: easeOutExpo }}
            className="relative z-10 w-full max-w-[900px] max-h-[88dvh] rounded-[24px] bg-[var(--bg)] text-[var(--ink)] flex flex-col overflow-hidden will-change-transform"
            style={{ boxShadow: 'var(--shadow-modal)' }}
          >
            {/* Top Cinema Bar */}
            <div className="px-6 sm:px-8 h-14 flex items-center justify-between border-b border-[var(--divider)] shrink-0 bg-[var(--bg)]">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onNavigate('prev')}
                  disabled={!hasPrev}
                  aria-label={t('Projet précédent', 'Previous project')}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[var(--ink-secondary)] hover:text-[var(--ink)] hover:bg-[var(--surface)] disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer pressable"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <span className="text-[12.5px] text-[var(--ink-muted)] tabular-nums px-1">
                  {currentIndex + 1} / {totalCount}
                </span>
                <button
                  type="button"
                  onClick={() => onNavigate('next')}
                  disabled={!hasNext}
                  aria-label={t('Projet suivant', 'Next project')}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[var(--ink-secondary)] hover:text-[var(--ink)] hover:bg-[var(--surface)] disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer pressable"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label={t('Fermer', 'Close')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] text-[var(--ink-secondary)] hover:text-[var(--ink)] hover:bg-[var(--surface)] transition-colors cursor-pointer pressable"
              >
                <span>{t('Fermer', 'Close')}</span>
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Case Study Body — Instant 0ms Switch with Directional Glide */}
            <div ref={scrollBodyRef} data-lenis-prevent className="flex-1 overflow-y-auto px-6 sm:px-9 py-7 sm:py-8">
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, x: direction * 18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.24, ease: easeOutExpo }}
              >
                  <div className="max-w-[760px]">
                    <div className="text-[13px] font-medium text-[var(--accent)] tabular-nums">
                      {project.year} · {lang === 'fr' ? project.details.duration.fr : project.details.duration.en}
                    </div>
                    <h2 className="mt-1.5 text-[24px] sm:text-[30px] font-bold tracking-[-0.032em] leading-[1.16] text-[var(--ink)]">
                      {lang === 'fr' ? project.title.fr : project.title.en}
                    </h2>
                  </div>

                  {visualSlugs.has(project.slug) && (
                    <div className="mt-6">
                      <ProjectStage
                        slug={project.slug}
                        title={lang === 'fr' ? project.title.fr : project.title.en}
                        interactive
                      />
                    </div>
                  )}

                  <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                    <div className="lg:col-span-4 space-y-5">
                      <div>
                        <div className="text-[12px] text-[var(--ink-muted)] mb-1">
                          {t('Rôle', 'Role')}
                        </div>
                        <div className="text-[14px] font-medium text-[var(--ink)] leading-snug">
                          {lang === 'fr' ? project.details.role.fr : project.details.role.en}
                        </div>
                      </div>

                      <div>
                        <div className="text-[12px] text-[var(--ink-muted)] mb-1.5">
                          {t('Environnement technique', 'Technical stack')}
                        </div>
                        <p className="text-[13.5px] text-[var(--ink-secondary)] leading-relaxed">
                          {project.tags.join(' · ')}
                        </p>
                      </div>

                      {(project.links.live || project.links.github) && (
                        <div className="pt-1 flex flex-wrap items-center gap-3 text-[13.5px]">
                          {project.links.live && (
                            <a
                              href={project.links.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[var(--accent)] text-[var(--accent-fg)] font-semibold pressable"
                            >
                              <span>{t('Ouvrir le projet', 'Open live project')}</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </a>
                          )}
                          {project.links.github && (
                            <a
                              href={project.links.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="link-editorial inline-flex items-center gap-0.5 text-[var(--ink-secondary)]"
                            >
                              <span>GitHub</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="lg:col-span-8 space-y-6">
                      <div>
                        <h3 className="text-[14px] font-semibold text-[var(--ink)] mb-2">
                          {t('Contexte', 'Context')}
                        </h3>
                        <p className="text-[14.5px] leading-[1.68] text-[var(--ink-secondary)]">
                          {lang === 'fr' ? project.details.context.fr : project.details.context.en}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-[14px] font-semibold text-[var(--ink)] mb-2.5">
                          {t('Réalisations clés', 'Key engineering work')}
                        </h3>
                        <ul className="space-y-2.5 text-[14.5px] leading-[1.66] text-[var(--ink-secondary)]">
                          {(lang === 'fr' ? project.details.highlights.fr : project.details.highlights.en).map(
                            (bullet, idx) => (
                              <li key={idx} className="pl-4 relative">
                                <span
                                  aria-hidden="true"
                                  className="absolute left-0 top-[0.68em] w-1.5 h-[1.5px] bg-[var(--accent)]"
                                />
                                {bullet}
                              </li>
                            )
                          )}
                        </ul>
                      </div>

                      {project.details.learnings && (
                        <div className="pt-2 border-t border-[var(--divider)]">
                          <h3 className="text-[14px] font-semibold text-[var(--ink)] mb-1.5">
                            {t('Apport principal', 'Key takeaway')}
                          </h3>
                          <p className="text-[14.5px] leading-[1.66] text-[var(--ink-secondary)]">
                            {lang === 'fr' ? project.details.learnings.fr : project.details.learnings.en}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  )
}
