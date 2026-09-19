'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '@/context/LanguageContext'
import TextReveal from '@/components/ui/TextReveal'
import { experiences } from '@/data/experiences'
import { cn } from '@/lib/utils'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
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

  return (
    <section ref={sectionRef} id="experience" className="py-28 px-6 max-w-7xl mx-auto relative z-10">
      {/* Header */}
      <div className="mb-14">
        <span className="text-[#D4A843] font-mono text-xs tracking-widest uppercase mb-3 block flex items-center gap-2">
          <span className="w-8 h-px bg-[#D4A843]/50" />
          {t('03 — Parcours', '03 — Journey')}
        </span>
        <TextReveal tag="h2" className="text-3xl md:text-5xl font-bold text-[#F5F5F5] tracking-tight leading-tight" stagger={0.03}>
          {t('Expériences & formation.', 'Experience & education.')}
        </TextReveal>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Center line */}
        <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-[rgba(255,255,255,0.06)]">
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
          {experiences.map((exp, i) => (
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
                  : 'bg-[#0D0D0D] border-[rgba(255,255,255,0.2)]'
              )} />

              {/* Card */}
              <div className="glass rounded-2xl p-6 hover:border-[rgba(212,168,67,0.15)] transition-all duration-300 group">
                {/* Date + Badge */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[#D4A843] font-mono text-xs">{exp.date}</span>
                  {exp.current && (
                    <span className="text-[0.6rem] uppercase tracking-widest text-[#D4A843] bg-[rgba(212,168,67,0.1)] px-2 py-0.5 rounded-full"
                      style={{ animation: 'glow-pulse 2s ease-in-out infinite' }}>
                      {t('En cours', 'Current')}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-[#F5F5F5] mb-1 flex items-center gap-2">
                  <span>{exp.icon}</span>
                  {lang === 'fr' ? exp.title.fr : exp.title.en}
                </h3>

                {/* Subtitle */}
                <p className="text-sm text-[#A3A3A3] mb-3">
                  {lang === 'fr' ? exp.subtitle.fr : exp.subtitle.en}
                </p>

                {/* Description */}
                <p className="text-sm text-[#6B6B6B] mb-4 leading-relaxed">
                  {lang === 'fr' ? exp.description.fr : exp.description.en}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {exp.tags.map(tag => (
                    <span key={tag} className="text-[0.65rem] text-[#A3A3A3] bg-white/5 px-2 py-1 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Link */}
                {exp.link && (
                  <a href={exp.link} className="inline-block mt-4 text-xs text-[#D4A843] hover:text-[#F5D785] transition-colors">
                    {t('Explorer →', 'Explore →')}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
