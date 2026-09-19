'use client'
import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '@/context/LanguageContext'
import TextReveal from '@/components/ui/TextReveal'
import GlowCard from '@/components/ui/GlowCard'
import ProjectDetailModal from '@/components/ui/ProjectDetailModal'
import { projects, type Project } from '@/data/projects'
import { cn } from '@/lib/utils'
import { assetPath } from '@/lib/asset'
import { ExternalLink, ChevronDown, Eye } from 'lucide-react'
import Image from 'next/image'

const GithubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
)

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

type FilterCategory = 'all' | 'pro' | 'academic' | 'personal' | 'other'

const filters: { key: FilterCategory; fr: string; en: string }[] = [
  { key: 'all', fr: 'Tous', en: 'All' },
  { key: 'pro', fr: 'Pro & Alternance', en: 'Pro & Apprenticeship' },
  { key: 'personal', fr: 'SaaS & Perso', en: 'SaaS & Personal' },
  { key: 'academic', fr: 'Académique', en: 'Academic' },
  { key: 'other', fr: 'Créa & Finance', en: 'Creative & Finance' },
]

const statusConfig = {
  production: { label: { fr: 'En production', en: 'Live in prod' }, color: 'text-emerald-400 bg-emerald-400/10 border-emerald-500/20' },
  'in-progress': { label: { fr: 'En cours', en: 'In progress' }, color: 'text-[#D4A843] bg-[rgba(212,168,67,0.1)] border-[rgba(212,168,67,0.2)]' },
  completed: { label: { fr: 'Terminé', en: 'Completed' }, color: 'text-[#888888] bg-white/5 border-white/10' },
}

export default function Projects() {
  const { lang, t } = useLanguage()
  const [filter, setFilter] = useState<FilterCategory>('all')
  const [showAll, setShowAll] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter)
  const displayed = showAll ? filtered : filtered.slice(0, 6)

  useEffect(() => {
    if (!gridRef.current) return
    const cards = gridRef.current.querySelectorAll('.project-card-item')

    gsap.fromTo(cards,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out',
        overwrite: true,
      }
    )
  }, [filter, showAll])

  const openProjectModal = (p: Project) => {
    setSelectedProject(p)
  }

  const handleNavigateModal = (direction: 'prev' | 'next') => {
    if (!selectedProject) return
    const currentIndex = filtered.findIndex(p => p.slug === selectedProject.slug)
    if (currentIndex === -1) return

    if (direction === 'prev' && currentIndex > 0) {
      setSelectedProject(filtered[currentIndex - 1])
    } else if (direction === 'next' && currentIndex < filtered.length - 1) {
      setSelectedProject(filtered[currentIndex + 1])
    }
  }

  const selectedIndex = selectedProject ? filtered.findIndex(p => p.slug === selectedProject.slug) : -1
  const hasPrev = selectedIndex > 0
  const hasNext = selectedIndex >= 0 && selectedIndex < filtered.length - 1

  return (
    <section id="projects" className="py-28 px-6 max-w-7xl mx-auto relative z-10">
      {/* Header */}
      <div className="mb-12">
        <span className="text-[#D4A843] font-mono text-xs tracking-widest uppercase mb-3 block flex items-center gap-2">
          <span className="w-8 h-px bg-[#D4A843]/50" />
          {t('04 — Projets', '04 — Projects')}
        </span>
        <TextReveal tag="h2" className="text-3xl md:text-5xl font-bold text-[#F5F5F5] tracking-tight leading-tight" stagger={0.03}>
          {t('Projets sélectionnés.', 'Selected projects.')}
        </TextReveal>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-10">
        {filters.map(f => (
          <button
            key={f.key}
            onClick={() => { setFilter(f.key); setShowAll(false) }}
            className={cn(
              'text-xs sm:text-sm px-4 py-2 rounded-full transition-all duration-300 cursor-pointer font-medium',
              filter === f.key
                ? 'text-[#050505] bg-[#D4A843] shadow-[0_0_20px_rgba(212,168,67,0.3)]'
                : 'text-[#888888] hover:text-[#F5F5F5] border border-white/5 hover:border-white/15 bg-white/[0.02]'
            )}
            data-cursor
          >
            {lang === 'fr' ? f.fr : f.en}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {displayed.map((project) => {
          const status = statusConfig[project.status]

          return (
            <div
              key={project.slug}
              onClick={() => openProjectModal(project)}
              className={cn(
                'project-card-item opacity-0 cursor-pointer group text-left',
                project.featured && 'md:col-span-2'
              )}
              data-cursor
            >
              <GlowCard className="overflow-hidden h-full flex flex-col justify-between hover:border-[rgba(212,168,67,0.3)] transition-all duration-300">
                {/* Image / Graphic with hover overlay */}
                <div className={cn(
                  'relative overflow-hidden bg-[#080808]',
                  project.featured ? 'aspect-[21/9]' : 'aspect-video'
                )}>
                  <Image
                    src={assetPath(project.image)}
                    alt={lang === 'fr' ? project.title.fr : project.title.en}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes={project.featured ? '100vw' : '50vw'}
                  />

                  {/* Gradient bottom shadow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-black/20 to-transparent" />

                  {/* Hover action overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                    <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#D4A843] bg-black/80 px-4 py-2 rounded-full border border-[rgba(212,168,67,0.4)] shadow-[0_0_20px_rgba(0,0,0,0.8)] transform translate-y-2 group-hover:translate-y-0 transition-transform">
                      <Eye className="w-3.5 h-3.5" />
                      {t('FICHE TECHNIQUE →', 'TECHNICAL DETAILS →')}
                    </span>
                  </div>

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="text-[0.65rem] uppercase tracking-wider bg-black/70 backdrop-blur-md text-[#D4A843] px-2.5 py-1 rounded-md border border-white/10 font-mono">
                      {project.category === 'pro' ? t('Pro', 'Pro') :
                       project.category === 'academic' ? t('Académique', 'Academic') :
                       project.category === 'personal' ? t('SaaS / Perso', 'SaaS / Personal') :
                       t('Créa & Finance', 'Creative & Finance')}
                    </span>
                    {project.featured && (
                      <span className="text-[0.65rem] uppercase tracking-wider bg-[#D4A843]/20 backdrop-blur-md text-[#F5D785] px-2.5 py-1 rounded-md border border-[#D4A843]/30 font-mono font-semibold">
                        ★ {t('En vedette', 'Featured')}
                      </span>
                    )}
                  </div>

                  <div className="absolute top-3 right-3">
                    <span className="text-[0.65rem] font-mono bg-black/70 backdrop-blur-md text-[#A3A3A3] px-2.5 py-1 rounded-md border border-white/10">
                      {project.year}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-[#F5F5F5] group-hover:text-[#D4A843] transition-colors mb-2">
                      {lang === 'fr' ? project.title.fr : project.title.en}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#A3A3A3] mb-4 line-clamp-2 leading-relaxed">
                      {lang === 'fr' ? project.description.fr : project.description.en}
                    </p>
                  </div>

                  <div>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.tags.slice(0, project.featured ? 6 : 4).map(tag => (
                        <span key={tag} className="text-[0.65rem] font-mono text-[#A3A3A3] bg-white/[0.04] border border-white/5 px-2.5 py-1 rounded-md">
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > (project.featured ? 6 : 4) && (
                        <span className="text-[0.65rem] font-mono text-[#666666] px-1.5 py-1">
                          +{project.tags.length - (project.featured ? 6 : 4)}
                        </span>
                      )}
                    </div>

                    {/* Card Footer: direct links + status */}
                    <div className="flex items-center justify-between pt-3 border-t border-white/5 text-xs">
                      <div className="flex items-center gap-3">
                        <span className="text-[#A3A3A3] text-xs group-hover:text-[#D4A843] transition-colors inline-flex items-center gap-1 font-medium">
                          {t('En savoir plus', 'View breakdown')} →
                        </span>

                        {project.links.github && (
                          <span
                            onClick={(e) => {
                              e.stopPropagation()
                              window.open(project.links.github, '_blank', 'noopener,noreferrer')
                            }}
                            className="text-[#6B6B6B] hover:text-[#D4A843] transition-colors p-1"
                            title="Code GitHub"
                          >
                            <GithubIcon className="w-3.5 h-3.5" />
                          </span>
                        )}
                        {project.links.live && (
                          <span
                            onClick={(e) => {
                              e.stopPropagation()
                              window.open(project.links.live, '_blank', 'noopener,noreferrer')
                            }}
                            className="text-[#6B6B6B] hover:text-[#D4A843] transition-colors p-1"
                            title="Démo Live"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </div>

                      <span className={cn('text-[0.65rem] uppercase tracking-wider px-2.5 py-0.5 rounded-full border font-mono', status.color)}>
                        {lang === 'fr' ? status.label.fr : status.label.en}
                      </span>
                    </div>
                  </div>
                </div>
              </GlowCard>
            </div>
          )
        })}
      </div>

      {/* Load More Button */}
      {filtered.length > 6 && !showAll && (
        <div className="flex justify-center mt-12">
          <button
            onClick={() => setShowAll(true)}
            className="group flex items-center gap-2 text-xs sm:text-sm text-[#A3A3A3] hover:text-[#D4A843] border border-white/10 hover:border-[rgba(212,168,67,0.4)] px-6 py-3 rounded-full transition-all bg-white/[0.02]"
            data-cursor
          >
            <span>{t(`Afficher tous les projets (${filtered.length})`, `Display all projects (${filtered.length})`)}</span>
            <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      )}

      {/* Quick View Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onNavigate={handleNavigateModal}
        hasPrev={hasPrev}
        hasNext={hasNext}
      />
    </section>
  )
}
