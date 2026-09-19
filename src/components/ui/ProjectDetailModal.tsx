'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useLanguage } from '@/context/LanguageContext'
import type { Project } from '@/data/projects'
import { X, ExternalLink, Calendar, Briefcase, CheckCircle2, ChevronLeft, ChevronRight, Award } from 'lucide-react'

const GithubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
)

interface ProjectDetailModalProps {
  project: Project | null
  onClose: () => void
  onNavigate?: (direction: 'prev' | 'next') => void
  hasPrev?: boolean
  hasNext?: boolean
}

export default function ProjectDetailModal({
  project,
  onClose,
  onNavigate,
  hasPrev = false,
  hasNext = false,
}: ProjectDetailModalProps) {
  const { lang, t } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!project) return

    // Notify smooth scroll to lock background
    window.dispatchEvent(new CustomEvent('portfolio-modal-toggle', { detail: { isOpen: true } }))
    document.body.style.overflow = 'hidden'

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft' && onNavigate && hasPrev) onNavigate('prev')
      if (e.key === 'ArrowRight' && onNavigate && hasNext) onNavigate('next')
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.dispatchEvent(new CustomEvent('portfolio-modal-toggle', { detail: { isOpen: false } }))
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [project, onClose, onNavigate, hasPrev, hasNext])

  if (!project || !mounted) return null

  const isFr = lang === 'fr'
  const title = isFr ? project.title.fr : project.title.en
  const desc = isFr ? project.description.fr : project.description.en
  const context = isFr ? project.details.context.fr : project.details.context.en
  const role = isFr ? project.details.role.fr : project.details.role.en
  const duration = isFr ? project.details.duration.fr : project.details.duration.en
  const highlights = isFr ? project.details.highlights.fr : project.details.highlights.en
  const learnings = project.details.learnings
    ? isFr
      ? project.details.learnings.fr
      : project.details.learnings.en
    : null

  return (
    <div
      data-lenis-prevent="true"
      className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 overflow-hidden"
    >
      {/* Subtle Backdrop - gentle blur, deep luxury dark */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-[4px] transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Dialog with smooth entrance */}
      <div
        data-lenis-prevent="true"
        className="relative w-full max-w-3xl max-h-[90vh] flex flex-col bg-[#10141F] border border-[rgba(212,168,67,0.3)] rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.85)] overflow-hidden z-10 animate-modal-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          {onNavigate && (
            <div className="flex items-center bg-[#050505]/80 backdrop-blur-md border border-white/10 rounded-full p-1 shadow-md">
              <button
                onClick={() => onNavigate('prev')}
                disabled={!hasPrev}
                aria-label="Projet précédent"
                className="p-1.5 rounded-full text-[#94A3B8] hover:text-[#D4A843] hover:bg-white/5 disabled:opacity-25 disabled:pointer-events-none transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate('next')}
                disabled={!hasNext}
                aria-label="Projet suivant"
                className="p-1.5 rounded-full text-[#94A3B8] hover:text-[#D4A843] hover:bg-white/5 disabled:opacity-25 disabled:pointer-events-none transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          <button
            onClick={onClose}
            aria-label="Fermer la fenêtre"
            className="p-2 rounded-full bg-[#050505]/80 backdrop-blur-md border border-white/10 text-[#94A3B8] hover:text-[#F8FAFC] hover:border-[#D4A843] transition-all cursor-pointer shadow-md"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Banner Preview */}
        <div className="relative aspect-[21/9] w-full bg-[#07090F] overflow-hidden border-b border-white/10 shrink-0">
          <Image
            src={project.image}
            alt={title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#10141F] via-transparent to-black/30" />

          {/* Badges on Banner */}
          <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-[0.7rem] uppercase tracking-wider bg-[#050505]/80 backdrop-blur-md border border-white/10 text-[#D4A843] font-mono px-3 py-1 rounded-full">
                {project.category === 'pro'
                  ? t('Expérience Pro', 'Professional')
                  : project.category === 'academic'
                  ? t('Académique', 'Academic')
                  : project.category === 'personal'
                  ? t('SaaS & Perso', 'SaaS & Personal')
                  : t('Créa & Finance', 'Creative & Finance')}
              </span>
              <span className="text-[0.7rem] font-mono bg-[#050505]/80 backdrop-blur-md border border-white/10 text-[#CBD5E1] px-3 py-1 rounded-full">
                {project.year}
              </span>
            </div>

            <span
              className={`text-[0.7rem] font-mono px-3 py-1 rounded-full border ${
                project.status === 'production'
                  ? 'border-emerald-500/40 text-emerald-400 bg-emerald-950/50'
                  : project.status === 'in-progress'
                  ? 'border-[#D4A843]/40 text-[#D4A843] bg-[rgba(212,168,67,0.12)]'
                  : 'border-white/10 text-[#94A3B8] bg-white/5'
              }`}
            >
              {project.status === 'production'
                ? t('● En production', '● Live in production')
                : project.status === 'in-progress'
                ? t('● En cours', '● In progress')
                : t('✓ Terminé', '✓ Completed')}
            </span>
          </div>
        </div>

        {/* Modal Scrollable Body - receives direct wheel events */}
        <div
          data-lenis-prevent="true"
          className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6 scroll-smooth overscroll-contain"
        >
          {/* Title & Short Description */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#F8FAFC] tracking-tight mb-2">
              {title}
            </h2>
            <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
              {desc}
            </p>
          </div>

          {/* Metadata Row: Role & Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/5">
            <div className="flex items-start gap-3">
              <Briefcase className="w-4 h-4 text-[#D4A843] mt-0.5 shrink-0" />
              <div>
                <span className="text-xs text-[#64748B] block uppercase tracking-wider font-mono">
                  {t('Rôle / Responsabilité', 'Role / Responsibility')}
                </span>
                <span className="text-xs sm:text-sm text-[#F8FAFC] font-medium">
                  {role}
                </span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Calendar className="w-4 h-4 text-[#D4A843] mt-0.5 shrink-0" />
              <div>
                <span className="text-xs text-[#64748B] block uppercase tracking-wider font-mono">
                  {t('Période & Cadre', 'Period & Timeline')}
                </span>
                <span className="text-xs sm:text-sm text-[#F8FAFC] font-medium">
                  {duration}
                </span>
              </div>
            </div>
          </div>

          {/* Context Section */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-[#D4A843] mb-2">
              {t('// Contexte & Enjeux', '// Context & Challenge')}
            </h3>
            <p className="text-sm text-[#CBD5E1] leading-relaxed">
              {context}
            </p>
          </div>

          {/* Key Highlights / Achievements */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-[#D4A843] mb-3">
              {t('// Réalisations Clés & Architecture', '// Key Highlights & Architecture')}
            </h3>
            <ul className="space-y-2.5">
              {highlights.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[#E2E8F0]">
                  <CheckCircle2 className="w-4 h-4 text-[#D4A843] mt-0.5 shrink-0" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Learnings Note if present */}
          {learnings && (
            <div className="p-4 rounded-xl bg-[rgba(212,168,67,0.06)] border border-[rgba(212,168,67,0.2)] flex items-start gap-3">
              <Award className="w-5 h-5 text-[#D4A843] mt-0.5 shrink-0" />
              <div>
                <span className="text-xs font-semibold text-[#F5D785] block mb-1 font-mono">
                  {t('Valeur & Impact Technique', 'Technical Impact & Takeaway')}
                </span>
                <p className="text-xs sm:text-sm text-[#E2E8F0] leading-relaxed">
                  {learnings}
                </p>
              </div>
            </div>
          )}

          {/* Tech Stack Tags */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-[#64748B] mb-2.5">
              {t('Technologies & Outils', 'Technologies & Tools')}
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-[#CBD5E1] bg-white/[0.04] border border-white/10 px-3 py-1 rounded-md font-mono"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 bg-[#050505] border-t border-white/10 flex flex-wrap items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#D4A843] text-[#050505] text-xs sm:text-sm font-semibold hover:shadow-[0_0_25px_rgba(212,168,67,0.4)] transition-all cursor-pointer"
              >
                <span>{t('Accéder au projet en ligne', 'View Live Project')}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}

            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 text-[#F8FAFC] hover:border-[#D4A843] hover:text-[#D4A843] text-xs sm:text-sm font-medium transition-all cursor-pointer"
              >
                <GithubIcon className="w-4 h-4" />
                <span>{t('Code Source GitHub', 'GitHub Repository')}</span>
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="text-xs text-[#64748B] hover:text-[#94A3B8] font-mono px-4 py-2 transition-colors ml-auto cursor-pointer"
          >
            {t('Fermer [Échap]', 'Close [Esc]')}
          </button>
        </div>
      </div>
    </div>
  )
}
