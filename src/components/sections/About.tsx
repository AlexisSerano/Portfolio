'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '@/context/LanguageContext'
import GlowCard from '@/components/ui/GlowCard'
import TextReveal from '@/components/ui/TextReveal'
import { MapPin, GraduationCap, Building2 } from 'lucide-react'
import Image from 'next/image'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function About() {
  const { t } = useLanguage()
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!gridRef.current) return
    const cards = gridRef.current.querySelectorAll('.bento-item')

    const ctx = gsap.context(() => {
      gsap.fromTo(cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
          },
        }
      )
    }, gridRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" className="py-28 px-6 max-w-7xl mx-auto relative z-10">
      <div className="mb-14">
        <span className="text-[#D4A843] font-mono text-xs tracking-widest uppercase mb-3 block flex items-center gap-2">
          <span className="w-8 h-px bg-[#D4A843]/50" />
          {t('01 — À propos', '01 — About')}
        </span>
        <TextReveal tag="h2" className="text-3xl md:text-5xl font-bold text-[#F5F5F5] tracking-tight leading-tight" stagger={0.03}>
          {t('Alexis Serano.', 'Alexis Serano.')}
        </TextReveal>
      </div>

      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-5">

        {/* Card 1: Photo + Identity — span 1 */}
        <GlowCard className="bento-item p-7">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-[#D4A843]/30 shadow-[0_0_20px_rgba(212,168,67,0.15)] bg-[#0A0A0A] shrink-0">
              <Image
                src="/images/alexis.png"
                alt="Alexis Serano"
                width={64}
                height={64}
                className="object-contain"
                priority
              />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#F5F5F5]">Alexis Serano</h3>
              <p className="text-xs text-[#D4A843] font-mono">
                {t('Développeur Full-Stack', 'Full-Stack Developer')}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-[#A3A3A3]">
              <MapPin className="w-3.5 h-3.5 text-[#D4A843]" />
              <span>Culoz (01) / Grenoble (38)</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#A3A3A3]">
              <Building2 className="w-3.5 h-3.5 text-[#D4A843]" />
              <span>{t('Alternant @ Carrier Culoz SA', 'Apprentice @ Carrier Culoz SA')}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#A3A3A3]">
              <GraduationCap className="w-3.5 h-3.5 text-[#D4A843]" />
              <span>BUT Informatique — IUT2 Grenoble</span>
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-white/[0.06]">
            <span className="inline-flex items-center gap-1.5 text-[0.65rem] font-mono text-[#D4A843] bg-[#D4A843]/10 px-2.5 py-1 rounded-full border border-[#D4A843]/20">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4A843] animate-pulse" />
              {t('Disponible 2027', 'Available 2027')}
            </span>
          </div>
        </GlowCard>

        {/* Card 2: Bio — span 2 */}
        <GlowCard className="bento-item md:col-span-2 p-7 flex flex-col justify-between">
          <div>
            <p className="text-sm text-[#A3A3A3] leading-relaxed mb-4">
              {t(
                "J'ai 20 ans, permis B, et je suis en 3ème année de BUT Informatique à Grenoble. En alternance chez Carrier Culoz SA, je fais de la programmation embarquée sur des automates industriels — migration logicielle vers la plateforme STone en Langage ST.",
                "I'm 20, have a driver's license, and I'm in my 3rd year of a CS degree in Grenoble. As an apprentice at Carrier Culoz SA, I do embedded programming on industrial PLCs — software migration to the STone platform in Structured Text."
              )}
            </p>
            <p className="text-sm text-[#A3A3A3] leading-relaxed">
              {t(
                "En parallèle je construis des projets perso : une plateforme de trading algorithmique (Algofy), un système de gestion de vie (LifeOS), et j'investis en crypto. Avant ça j'ai fait un stage en DSI dans un hôpital — PowerShell, Kubernetes, 1800+ utilisateurs.",
                "On the side I build personal projects: an algorithmic trading platform (Algofy), a life management system (LifeOS), and I invest in crypto. Before that I did an IT internship at a hospital — PowerShell, Kubernetes, 1800+ users."
              )}
            </p>
          </div>

          <div className="mt-6 pt-5 border-t border-white/[0.06] flex flex-wrap gap-2">
            {['React', 'Python', 'Docker', 'TypeScript', 'PostgreSQL', 'Langage ST'].map(tech => (
              <span key={tech} className="text-[0.65rem] font-mono text-[#A3A3A3] bg-white/[0.04] border border-white/[0.06] px-2.5 py-1 rounded-md">
                {tech}
              </span>
            ))}
          </div>
        </GlowCard>

        {/* Card 3: Centres d'intérêt — span 3 (full width) */}
        <GlowCard className="bento-item md:col-span-3 p-7 overflow-hidden">
          <h4 className="text-xs uppercase tracking-[0.15em] text-[#6B6B6B] font-mono mb-5">
            {t('Centres d\'intérêt', 'Interests')}
          </h4>
          <div className="flex flex-wrap gap-3">
            {[
              { emoji: '💻', label: t('Informatique', 'Computer Science') },
              { emoji: '📊', label: t('Trading & Investissement', 'Trading & Investment') },
              { emoji: '🏋️', label: t('Sport & Musculation', 'Sports & Fitness') },
              { emoji: '⌚', label: t('Horlogerie', 'Watches') },
              { emoji: '🧠', label: t('Longévité & Santé', 'Longevity & Health') },
              { emoji: '🇯🇵', label: t('Culture japonaise', 'Japanese Culture') },
              { emoji: '🎬', label: t('Montage vidéo', 'Video Editing') },
              { emoji: '💰', label: t('Finance & Crypto', 'Finance & Crypto') },
              { emoji: '🚀', label: t('Entrepreneuriat', 'Entrepreneurship') },
            ].map((item, i) => (
              <span
                key={i}
                className="flex items-center gap-2 text-sm text-[#A3A3A3] bg-white/[0.03] border border-white/[0.06] hover:border-[#D4A843]/30 hover:text-[#D4A843] px-4 py-2.5 rounded-xl transition-all duration-300 cursor-default"
              >
                <span className="text-base">{item.emoji}</span>
                {item.label}
              </span>
            ))}
          </div>
        </GlowCard>

      </div>
    </section>
  )
}
