'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '@/context/LanguageContext'
import TextReveal from '@/components/ui/TextReveal'
import ProjectDetailModal from '@/components/ui/ProjectDetailModal'
import ProjectMockup from '@/components/ui/ProjectMockup'
import TechIcon from '@/components/ui/TechIcon'
import TiltCard from '@/components/ui/TiltCard'
import { projects, type Project } from '@/data/projects'
import { cn } from '@/lib/utils'
import {
  ExternalLink,
  Eye,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  Sliders,
  Sparkles
} from 'lucide-react'

const GithubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
)

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

type FilterCategory = 'all' | 'pro' | 'academic' | 'personal' | 'other'
type ViewMode = 'carousel' | 'overview'

const filters: { key: FilterCategory; fr: string; en: string }[] = [
  { key: 'all', fr: 'Tous les projets', en: 'All Projects' },
  { key: 'pro', fr: 'Pro & Alternance', en: 'Pro & Apprenticeship' },
  { key: 'personal', fr: 'SaaS & Perso', en: 'SaaS & Personal' },
  { key: 'academic', fr: 'Académique', en: 'Academic' },
  { key: 'other', fr: 'Finance & Créa', en: 'Finance & Creative' },
]

const statusConfig = {
  production: { label: { fr: 'En production', en: 'Live in prod' }, color: 'text-emerald-400 bg-emerald-400/10 border-emerald-500/30' },
  'in-progress': { label: { fr: 'En cours', en: 'In progress' }, color: 'text-[#D4A843] bg-[rgba(212,168,67,0.12)] border-[rgba(212,168,67,0.3)]' },
  completed: { label: { fr: 'Terminé', en: 'Completed' }, color: 'text-[#94A3B8] bg-white/5 border-white/10' },
}

export default function Projects() {
  const { lang, t } = useLanguage()
  const [filter, setFilter] = useState<FilterCategory>('all')
  const [viewMode, setViewMode] = useState<ViewMode>('carousel')
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [slideDirection, setSlideDirection] = useState<'next' | 'prev' | 'none'>('none')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const slideRef = useRef<HTMLDivElement>(null)

  const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter)
  const currentProject = filtered[carouselIndex] || filtered[0]

  const prevIndex = (carouselIndex - 1 + filtered.length) % filtered.length
  const nextIndex = (carouselIndex + 1) % filtered.length
  const prevProject = filtered[prevIndex]
  const nextProject = filtered[nextIndex]

  // Reset carousel index when filter changes
  useEffect(() => {
    setCarouselIndex(0)
    setSlideDirection('none')
  }, [filter])

  // Animate slide change with momentum
  useEffect(() => {
    if (slideRef.current && viewMode === 'carousel') {
      const xOffset = slideDirection === 'next' ? 24 : slideDirection === 'prev' ? -24 : 0
      gsap.fromTo(slideRef.current,
        { opacity: 0, x: xOffset, scale: 0.98 },
        { opacity: 1, x: 0, scale: 1, duration: 0.45, ease: 'power3.out' }
      )
    }
  }, [carouselIndex, viewMode, slideDirection])

  // Listen for global open project event from Experience section
  useEffect(() => {
    const handleGlobalOpen = (e: any) => {
      const slug = e.detail?.slug
      if (slug) {
        const found = projects.find(p => p.slug === slug)
        if (found) {
          setSelectedProject(found)
        }
      }
    }

    window.addEventListener('portfolio-open-project', handleGlobalOpen)
    return () => window.removeEventListener('portfolio-open-project', handleGlobalOpen)
  }, [])

  const nextSlide = useCallback(() => {
    setSlideDirection('next')
    setCarouselIndex((prev) => (prev + 1) % filtered.length)
  }, [filtered.length])

  const prevSlide = useCallback(() => {
    setSlideDirection('prev')
    setCarouselIndex((prev) => (prev - 1 + filtered.length) % filtered.length)
  }, [filtered.length])

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
      {/* Header & View Switcher */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <span className="text-[#D4A843] font-mono text-xs tracking-widest uppercase mb-3 flex items-center gap-2">
            <span className="w-8 h-px bg-[#D4A843]/50" />
            {t('04 — Projets', '04 — Projects')}
          </span>
          <TextReveal tag="h2" className="text-3xl md:text-5xl font-bold text-[#F8FAFC] tracking-tight leading-tight" stagger={0.03}>
            {t('Projets sélectionnés.', 'Selected projects.')}
          </TextReveal>
        </div>

        {/* View Mode Toggle: Carousel vs Overview */}
        <div className="flex items-center bg-white/[0.03] border border-white/[0.08] p-1 rounded-full self-start md:self-auto">
          <button
            onClick={() => setViewMode('carousel')}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer',
              viewMode === 'carousel'
                ? 'bg-[#D4A843] text-[#050505] shadow-[0_0_20px_rgba(212,168,67,0.3)]'
                : 'text-[#94A3B8] hover:text-white'
            )}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>{t('Vue Carousel', 'Carousel View')}</span>
          </button>

          <button
            onClick={() => setViewMode('overview')}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer',
              viewMode === 'overview'
                ? 'bg-[#D4A843] text-[#050505] shadow-[0_0_20px_rgba(212,168,67,0.3)]'
                : 'text-[#94A3B8] hover:text-white'
            )}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>{t('Vue d\'ensemble', 'Overview')}</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-black/40">
              {filtered.length}
            </span>
          </button>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2 mb-10">
        {filters.map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={cn(
              'text-xs px-4 py-2 rounded-full transition-all duration-300 cursor-pointer font-medium',
              filter === f.key
                ? 'text-[#050505] bg-[#D4A843] shadow-[0_0_20px_rgba(212,168,67,0.25)]'
                : 'text-[#94A3B8] hover:text-[#F8FAFC] border border-white/5 hover:border-white/15 bg-white/[0.02]'
            )}
          >
            {lang === 'fr' ? f.fr : f.en}
          </button>
        ))}
      </div>

      {/* VIEW 1: INTERACTIVE CAROUSEL SHOWCASE WITH 3D PEEK PREVIEWS */}
      {viewMode === 'carousel' && currentProject && (
        <div className="space-y-6">
          {/* 3D Stage Container */}
          <div className="flex items-center gap-4 xl:gap-6 justify-center">
            {/* Left Peek Preview (Previous Project) */}
            {filtered.length > 1 && prevProject && (
              <div
                onClick={prevSlide}
                role="button"
                tabIndex={0}
                aria-label={t(`Voir projet précédent: ${prevProject.title.fr}`, `View previous project: ${prevProject.title.en}`)}
                className="hidden lg:flex flex-col justify-between w-[180px] xl:w-[220px] shrink-0 h-[480px] rounded-2xl border border-white/10 hover:border-[#D4A843]/60 bg-[#090C12]/50 hover:bg-[#090C12]/90 backdrop-blur-md p-4 transition-all duration-300 opacity-40 hover:opacity-100 hover:-translate-x-1 cursor-pointer group/peek shadow-lg select-none"
              >
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#D4A843] mb-3 group-hover/peek:-translate-x-1 transition-transform">
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>{t('Précédent', 'Previous')}</span>
                  </div>
                  <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-white/10 mb-3 bg-black/40">
                    <ProjectMockup
                      slug={prevProject.slug}
                      title={lang === 'fr' ? prevProject.title.fr : prevProject.title.en}
                      imageSrc={prevProject.image}
                    />
                  </div>
                  <span className="text-[9px] font-mono text-[#D4A843] bg-black/60 px-2 py-0.5 rounded border border-white/10 inline-block mb-2">
                    {prevProject.year}
                  </span>
                  <h4 className="text-xs font-bold text-[#F8FAFC] group-hover/peek:text-[#D4A843] transition-colors line-clamp-2 leading-snug">
                    {lang === 'fr' ? prevProject.title.fr : prevProject.title.en}
                  </h4>
                </div>
                <div className="pt-3 border-t border-white/[0.08] text-[10px] text-[#94A3B8] font-mono flex items-center justify-between">
                  <span>{String(prevIndex + 1).padStart(2, '0')}</span>
                  <span className="text-[#D4A843]">‹</span>
                </div>
              </div>
            )}

            {/* Center Active Project (Full TiltCard) */}
            <div ref={slideRef} className="flex-1 min-w-0 max-w-4xl w-full">
              <TiltCard
                maxTilt={6}
                scale={1.01}
                className="rounded-2xl border border-white/[0.12] hover:border-[#D4A843]/40 bg-[#090C12]/90 backdrop-blur-md overflow-hidden transition-colors duration-300 shadow-[0_20px_60px_rgba(0,0,0,0.7)]"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12">
                  {/* Left/Top: Rich Realistic UI Preview */}
                  <div className="lg:col-span-7 h-[280px] sm:h-[380px] lg:h-[460px] relative border-b lg:border-b-0 lg:border-r border-white/[0.08]">
                    <ProjectMockup
                      slug={currentProject.slug}
                      title={lang === 'fr' ? currentProject.title.fr : currentProject.title.en}
                      imageSrc={currentProject.image}
                      priority
                    />

                    {/* Badges on mockup */}
                    <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
                      {currentProject.featured && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold uppercase tracking-wider bg-[#D4A843] text-black px-2.5 py-1 rounded-md shadow-md">
                          <Sparkles className="w-3 h-3" />
                          {t('En vedette', 'Featured')}
                        </span>
                      )}
                      <span className="text-[10px] font-mono bg-black/80 backdrop-blur-md border border-white/15 text-[#D4A843] px-2.5 py-1 rounded-md">
                        {currentProject.category === 'pro' ? t('Expérience Pro', 'Professional') :
                         currentProject.category === 'academic' ? t('Académique', 'Academic') :
                         currentProject.category === 'personal' ? t('SaaS & Perso', 'SaaS & Personal') :
                         t('Finance & Créa', 'Finance & Creative')}
                      </span>
                    </div>

                    <div className="absolute top-4 right-4 z-10">
                      <span className="text-[10px] font-mono bg-black/80 backdrop-blur-md border border-white/15 text-[#CBD5E1] px-2.5 py-1 rounded-md">
                        {currentProject.year}
                      </span>
                    </div>
                  </div>

                  {/* Right/Bottom: Project Details & Action Triggers */}
                  <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className={cn(
                          'text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full border font-mono',
                          statusConfig[currentProject.status].color
                        )}>
                          {lang === 'fr' ? statusConfig[currentProject.status].label.fr : statusConfig[currentProject.status].label.en}
                        </span>

                        <span className="text-xs font-mono text-[#D4A843]">
                          {String(carouselIndex + 1).padStart(2, '0')} / {String(filtered.length).padStart(2, '0')}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold text-[#F8FAFC] tracking-tight mb-3">
                        {lang === 'fr' ? currentProject.title.fr : currentProject.title.en}
                      </h3>

                      <p className="text-sm text-[#94A3B8] leading-relaxed mb-6">
                        {lang === 'fr' ? currentProject.description.fr : currentProject.description.en}
                      </p>

                      {/* Highlights snippet */}
                      <div className="space-y-2 mb-6">
                        {currentProject.details.highlights[lang === 'fr' ? 'fr' : 'en'].slice(0, 2).map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-[#CBD5E1]">
                            <span className="text-[#D4A843] mt-0.5">❯</span>
                            <span className="leading-snug">{item}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tech stack tags with authentic SVG TechIcon */}
                      <div className="flex flex-wrap gap-2 mb-8">
                        {currentProject.tags.slice(0, 5).map(tag => (
                          <span key={tag} className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#CBD5E1] bg-white/[0.04] border border-white/[0.08] px-2.5 py-1 rounded">
                            <TechIcon name={tag} size={14} />
                            <span>{tag}</span>
                          </span>
                        ))}
                        {currentProject.tags.length > 5 && (
                          <span className="text-[11px] font-mono text-[#64748B] self-center">
                            +{currentProject.tags.length - 5}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions & Modal Trigger */}
                    <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between gap-3">
                      <button
                        onClick={() => setSelectedProject(currentProject)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#D4A843] hover:bg-[#F5D785] text-[#050505] font-semibold text-xs sm:text-sm transition-all shadow-[0_0_20px_rgba(212,168,67,0.25)] cursor-pointer"
                      >
                        <Eye className="w-4 h-4" />
                        <span>{t('Fiche technique complète', 'View project details')}</span>
                      </button>

                      <div className="flex items-center gap-2">
                        {currentProject.links.github && (
                          <a
                            href={currentProject.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-9 h-9 rounded-full border border-white/10 hover:border-[#D4A843] flex items-center justify-center text-[#94A3B8] hover:text-[#D4A843] transition-colors"
                            title="GitHub"
                          >
                            <GithubIcon className="w-4 h-4" />
                          </a>
                        )}
                        {currentProject.links.live && (
                          <a
                            href={currentProject.links.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-9 h-9 rounded-full border border-white/10 hover:border-[#D4A843] flex items-center justify-center text-[#94A3B8] hover:text-[#D4A843] transition-colors"
                            title="Live demo"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </div>

            {/* Right Peek Preview (Next Project) */}
            {filtered.length > 1 && nextProject && (
              <div
                onClick={nextSlide}
                role="button"
                tabIndex={0}
                aria-label={t(`Voir projet suivant: ${nextProject.title.fr}`, `View next project: ${nextProject.title.en}`)}
                className="hidden lg:flex flex-col justify-between w-[180px] xl:w-[220px] shrink-0 h-[480px] rounded-2xl border border-white/10 hover:border-[#D4A843]/60 bg-[#090C12]/50 hover:bg-[#090C12]/90 backdrop-blur-md p-4 transition-all duration-300 opacity-40 hover:opacity-100 hover:translate-x-1 cursor-pointer group/peek shadow-lg select-none"
              >
                <div>
                  <div className="flex items-center justify-end gap-1.5 text-[11px] font-mono text-[#D4A843] mb-3 group-hover/peek:translate-x-1 transition-transform">
                    <span>{t('Suivant', 'Next')}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                  <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-white/10 mb-3 bg-black/40">
                    <ProjectMockup
                      slug={nextProject.slug}
                      title={lang === 'fr' ? nextProject.title.fr : nextProject.title.en}
                      imageSrc={nextProject.image}
                    />
                  </div>
                  <span className="text-[9px] font-mono text-[#D4A843] bg-black/60 px-2 py-0.5 rounded border border-white/10 inline-block mb-2">
                    {nextProject.year}
                  </span>
                  <h4 className="text-xs font-bold text-[#F8FAFC] group-hover/peek:text-[#D4A843] transition-colors line-clamp-2 leading-snug">
                    {lang === 'fr' ? nextProject.title.fr : nextProject.title.en}
                  </h4>
                </div>
                <div className="pt-3 border-t border-white/[0.08] text-[10px] text-[#94A3B8] font-mono flex items-center justify-between">
                  <span className="text-[#D4A843]">›</span>
                  <span>{String(nextIndex + 1).padStart(2, '0')}</span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Peek Preview Chips for Tablet & Mobile (< lg) */}
          {filtered.length > 1 && (
            <div className="flex lg:hidden items-center justify-between gap-3 px-1">
              <button
                onClick={prevSlide}
                className="flex items-center gap-1.5 text-xs font-mono text-[#94A3B8] hover:text-[#D4A843] transition-colors truncate max-w-[48%] py-1 cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5 text-[#D4A843] shrink-0" />
                <span className="truncate">{lang === 'fr' ? prevProject.title.fr : prevProject.title.en}</span>
              </button>
              <button
                onClick={nextSlide}
                className="flex items-center justify-end gap-1.5 text-xs font-mono text-[#94A3B8] hover:text-[#D4A843] transition-colors truncate max-w-[48%] py-1 ml-auto cursor-pointer"
              >
                <span className="truncate">{lang === 'fr' ? nextProject.title.fr : nextProject.title.en}</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#D4A843] shrink-0" />
              </button>
            </div>
          )}

          {/* Carousel Navigation Toolbar */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-[65%]">
              {filtered.map((p, idx) => (
                <button
                  key={p.slug}
                  onClick={() => setCarouselIndex(idx)}
                  className={cn(
                    'h-2 rounded-full transition-all cursor-pointer',
                    idx === carouselIndex
                      ? 'w-8 bg-[#D4A843]'
                      : 'w-2 bg-white/20 hover:bg-white/40'
                  )}
                  aria-label={`Aller au projet ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={prevSlide}
                className="p-2.5 rounded-full border border-white/10 hover:border-[#D4A843] bg-white/[0.02] text-[#94A3B8] hover:text-[#F8FAFC] transition-colors cursor-pointer"
                aria-label="Projet précédent"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextSlide}
                className="p-2.5 rounded-full border border-white/10 hover:border-[#D4A843] bg-white/[0.02] text-[#94A3B8] hover:text-[#F8FAFC] transition-colors cursor-pointer"
                aria-label="Projet suivant"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: FULL OVERVIEW MATRIX (Vue d'ensemble) WITH 3D TILT */}
      {viewMode === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => {
            const status = statusConfig[project.status]

            return (
              <TiltCard
                key={project.slug}
                maxTilt={7}
                scale={1.02}
                className="h-full rounded-xl overflow-hidden cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="border border-white/[0.08] hover:border-[#D4A843]/40 rounded-xl bg-[#090C12]/80 backdrop-blur-md overflow-hidden transition-all duration-300 flex flex-col justify-between group h-full">
                  {/* Mockup Preview Header */}
                  <div className="relative aspect-video w-full border-b border-white/[0.08] overflow-hidden">
                    <ProjectMockup
                      slug={project.slug}
                      title={lang === 'fr' ? project.title.fr : project.title.en}
                      imageSrc={project.image}
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-xs font-semibold text-[#050505] bg-[#D4A843] px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                        <Eye className="w-3.5 h-3.5" />
                        {t('Détails →', 'View Details →')}
                      </span>
                    </div>

                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                      <span className="text-[9px] font-mono bg-black/80 backdrop-blur-md border border-white/15 text-[#D4A843] px-2 py-0.5 rounded">
                        {project.category === 'pro' ? t('Pro', 'Pro') :
                         project.category === 'academic' ? t('Académique', 'Academic') :
                         project.category === 'personal' ? t('SaaS / Perso', 'SaaS / Personal') :
                         t('Créa & Finance', 'Creative')}
                      </span>
                    </div>

                    <div className="absolute top-2.5 right-2.5">
                      <span className="text-[9px] font-mono bg-black/80 backdrop-blur-md border border-white/15 text-[#CBD5E1] px-2 py-0.5 rounded">
                        {project.year}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-base font-bold text-[#F8FAFC] group-hover:text-[#D4A843] transition-colors mb-2 line-clamp-1">
                        {lang === 'fr' ? project.title.fr : project.title.en}
                      </h3>
                      <p className="text-xs text-[#94A3B8] line-clamp-2 leading-relaxed mb-4">
                        {lang === 'fr' ? project.description.fr : project.description.en}
                      </p>
                    </div>

                    <div>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="text-[10px] font-mono text-[#CBD5E1] bg-white/[0.04] border border-white/[0.06] px-2 py-0.5 rounded">
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 3 && (
                          <span className="text-[10px] font-mono text-[#64748B] self-center">
                            +{project.tags.length - 3}
                          </span>
                        )}
                      </div>

                      <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
                        <span className="text-[#94A3B8] group-hover:text-[#D4A843] font-medium transition-colors">
                          {t('Fiche technique →', 'Breakdown →')}
                        </span>
                        <span className={cn('text-[9px] uppercase font-mono px-2 py-0.5 rounded border', status.color)}>
                          {lang === 'fr' ? status.label.fr : status.label.en}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            )
          })}
        </div>
      )}

      {/* Project Detail Modal */}
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

