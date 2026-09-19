'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '@/context/LanguageContext'
import TextReveal from '@/components/ui/TextReveal'
import MarqueeText from '@/components/ui/MarqueeText'
import TechIcon from '@/components/ui/TechIcon'
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
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
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
        <span className="text-[#D4A843] font-mono text-xs tracking-widest uppercase mb-3 flex items-center gap-2">
          <span className="w-8 h-px bg-[#D4A843]/50" />
          {t('02 — Compétences', '02 — Skills')}
        </span>
        <TextReveal tag="h2" className="text-3xl md:text-5xl font-bold text-[#F8FAFC] tracking-tight leading-tight" stagger={0.03}>
          {t('Stack technique.', 'Tech stack.')}
        </TextReveal>
      </div>

      {/* Skills Grid — 6 categories, clean icon + text flow without boxy rectangles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16">
        {skillCategories.map((cat, i) => (
          <div key={i} className="skill-group opacity-0">
            {/* Category title with subtle line */}
            <div className="flex items-center gap-3 mb-4 pb-2 border-b border-white/[0.08]">
              <span className="text-xs font-mono uppercase tracking-[0.18em] text-[#D4A843] font-semibold">
                {lang === 'fr' ? cat.title.fr : cat.title.en}
              </span>
              <span className="text-[10px] font-mono text-[#64748B] ml-auto">0{i + 1}</span>
            </div>

            {/* Tech list: Authentic icon + label, completely borderless & modern */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
              {cat.techs.map(tech => (
                <div
                  key={tech}
                  className="flex items-center gap-2.5 py-1 text-xs text-[#94A3B8] hover:text-[#F8FAFC] transition-colors group cursor-default"
                >
                  <div className="shrink-0 transition-transform duration-200 group-hover:scale-115">
                    <TechIcon name={tech} size={18} />
                  </div>
                  <span className="truncate group-hover:text-[#F5D785] transition-colors font-medium">
                    {tech}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Tech Marquee */}
      <div className="border-t border-white/[0.08] pt-6">
        <MarqueeText speed={35} className="opacity-40 hover:opacity-80 transition-opacity duration-500">
          {allTechMarquee.map((tech, i) => (
            <span key={i} className="inline-flex items-center gap-2 text-xs font-mono text-[#64748B] hover:text-[#D4A843] mx-6 whitespace-nowrap transition-colors">
              <TechIcon name={tech} size={15} />
              <span>{tech}</span>
            </span>
          ))}
        </MarqueeText>
      </div>
    </section>
  )
}

