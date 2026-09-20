'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '@/context/LanguageContext'
import TextReveal from '@/components/ui/TextReveal'
import { experiences, type Experience as ExperienceType } from '@/data/experiences'
import TiltCard from '@/components/ui/TiltCard'
import { cn } from '@/lib/utils'
import {
  Building2,
  Activity,
  GraduationCap,
  School,
  TrendingUp,
  Film,
  ExternalLink
} from 'lucide-react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const iconMap = {
  Building2,
  Activity,
  GraduationCap,
  School,
  TrendingUp,
  Film,
}

export default function Experience() {
  const { lang, t } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  // Animate the golden line fill on scroll
  useEffect(() => {
    if (!lineRef.current || !sectionRef.current) return

    gsap.fromTo(lineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          end: 'bottom 40%',
          scrub: 0.3,
        },
      }
    )
  }, [])

  // Animate cards
  useEffect(() => {
    if (!sectionRef.current) return
    const items = sectionRef.current.querySelectorAll('.timeline-item')

    items.forEach((item, i) => {
      const direction = i % 2 === 0 ? -30 : 30
      gsap.fromTo(item,
        { opacity: 0, x: direction },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    })
  }, [])

  const handleOpenProjectModal = (slug: string) => {
    window.dispatchEvent(new CustomEvent('portfolio-open-project', { detail: { slug } }))
  }

  return (
    <section ref={sectionRef} id="experience" className="py-28 px-6 max-w-7xl mx-auto relative z-10">
      {/* Header */}
      <div className="mb-14">
        <span className="text-[#D4A843] font-mono text-xs tracking-widest uppercase mb-3 flex items-center gap-2">
          <span className="w-8 h-px bg-[#D4A843]/50" />
          {t('03 — Parcours', '03 — Journey')}
        </span>
        <TextReveal tag="h2" className="text-3xl md:text-5xl font-bold text-[#F8FAFC] tracking-tight leading-tight" stagger={0.03}>
          {t('Expériences & formation.', 'Experience & education.')}
        </TextReveal>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Center line */}
        <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-white/[0.06]">
          <div
            ref={lineRef}
            className="absolute top-0 left-0 w-full origin-top"
            style={{
              background: 'linear-gradient(180deg, #D4A843, #A3845B)',
              height: '100%',
              transform: 'scaleY(0)',
            }}
          />
        </div>

        {/* Items */}
        <div className="space-y-12">
          {experiences.map((exp, i) => {
            const IconComponent = iconMap[exp.icon] || Building2

            return (
              <div
                key={i}
                className={cn(
                  'timeline-item relative opacity-0',
                  'pl-12 md:pl-0',
                  i % 2 === 0 ? 'md:pr-[52%]' : 'md:pl-[52%]'
                )}
              >
                {/* Dot on timeline */}
                <div className={cn(
                  'absolute top-6 w-3 h-3 rounded-full border-2 z-10',
                  'left-[10px] md:left-1/2 md:-translate-x-1/2',
                  exp.current
                    ? 'bg-[#D4A843] border-[#D4A843] shadow-[0_0_12px_rgba(212,168,67,0.5)]'
                    : 'bg-[#0A0A0A] border-white/20'
                )} />

                {/* Card with 3D Tilt */}
                <TiltCard maxTilt={6} scale={1.01} className="rounded-xl overflow-hidden">
                  <div className="glass rounded-xl p-6 hover:border-[rgba(212,168,67,0.35)] transition-all duration-300 group">
                    {/* Date + Badge */}
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-[#D4A843] font-mono text-xs font-semibold">{exp.date}</span>
                      {exp.current && (
                        <span className="text-[0.6rem] uppercase tracking-widest text-[#D4A843] bg-[#D4A843]/10 px-2 py-0.5 rounded-full border border-[#D4A843]/20"
                          style={{ animation: 'glow-pulse 2s ease-in-out infinite' }}>
                          {t('En cours', 'Current')}
                        </span>
                      )}
                    </div>

                    {/* Title with sleek Lucide Icon */}
                    <h3 className="text-lg font-bold text-[#F8FAFC] mb-1 flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[#D4A843] shrink-0">
                        <IconComponent className="w-3.5 h-3.5" />
                      </div>
                      <span>{lang === 'fr' ? exp.title.fr : exp.title.en}</span>
                    </h3>

                    {/* Subtitle */}
                    <p className="text-xs text-[#94A3B8] mb-3 ml-9">
                      {lang === 'fr' ? exp.subtitle.fr : exp.subtitle.en}
                    </p>

                    {/* Description */}
                    <p className="text-sm text-[#CBD5E1] mb-4 leading-relaxed ml-9">
                      {lang === 'fr' ? exp.description.fr : exp.description.en}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 ml-9">
                      {exp.tags.map(tag => (
                        <span key={tag} className="text-[0.65rem] font-mono text-[#94A3B8] bg-white/[0.03] border border-white/[0.06] px-2 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Interactive Button: Opens Project Modal cleanly (no 404!) */}
                    {exp.projectSlug && (
                      <div className="ml-9 mt-4 pt-3 border-t border-white/[0.06]">
                        <button
                          onClick={() => handleOpenProjectModal(exp.projectSlug!)}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D4A843] hover:text-[#F5D785] transition-colors cursor-pointer group/btn"
                        >
                          <span>{t('Voir le projet associé', 'View associated project')}</span>
                          <span className="transition-transform group-hover/btn:translate-x-1">→</span>
                        </button>
                      </div>
                    )}
                  </div>
                </TiltCard>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

