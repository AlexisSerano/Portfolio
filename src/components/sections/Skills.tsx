'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '@/context/LanguageContext'
import TextReveal from '@/components/ui/TextReveal'
import MarqueeText from '@/components/ui/MarqueeText'
import { skillCategories, allTechMarquee } from '@/data/skills'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Skills() {
  const { lang, t } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const groups = sectionRef.current.querySelectorAll('.skill-group')

    const ctx = gsap.context(() => {
      gsap.fromTo(groups,
        { opacity: 0, y: 25 },
        {
          opacity: 1, y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="skills" className="py-28 px-6 max-w-7xl mx-auto relative z-10">
      {/* Header */}
      <div className="mb-14">
        <span className="text-[#D4A843] font-mono text-xs tracking-widest uppercase mb-3 block flex items-center gap-2">
          <span className="w-8 h-px bg-[#D4A843]/50" />
          {t('02 — Compétences', '02 — Skills')}
        </span>
        <TextReveal tag="h2" className="text-3xl md:text-5xl font-bold text-[#F5F5F5] tracking-tight leading-tight" stagger={0.03}>
          {t('Stack technique.', 'Tech stack.')}
        </TextReveal>
      </div>

      {/* Skills Grid — 6 categories, 3 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {skillCategories.map((cat, i) => (
          <div key={i} className="skill-group opacity-0">
            {/* Category title */}
            <h3 className="text-xs font-mono uppercase tracking-[0.15em] text-[#D4A843] mb-4 pb-3 border-b border-white/[0.06]">
              {lang === 'fr' ? cat.title.fr : cat.title.en}
            </h3>

            {/* Tech tags */}
            <div className="flex flex-wrap gap-2">
              {cat.techs.map(tech => (
                <span
                  key={tech}
                  className="text-xs text-[#A3A3A3] bg-white/[0.03] border border-white/[0.06] hover:border-[#D4A843]/30 hover:text-[#D4A843] px-3 py-1.5 rounded-lg transition-all duration-200 cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Tech Marquee */}
      <div className="border-t border-white/[0.06] pt-6">
        <MarqueeText speed={40} className="opacity-30 hover:opacity-60 transition-opacity duration-500">
          {allTechMarquee.map((tech, i) => (
            <span key={i} className="text-sm font-mono text-[#6B6B6B] mx-4 whitespace-nowrap">
              {tech}
            </span>
          ))}
        </MarqueeText>
      </div>
    </section>
  )
}
