'use client'
import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '@/context/LanguageContext'
import TextReveal from '@/components/ui/TextReveal'
import TechIcon from '@/components/ui/TechIcon'
import TiltCard from '@/components/ui/TiltCard'
import {
  MapPin,
  GraduationCap,
  Building2,
  Code2,
  TrendingUp,
  Dumbbell,
  Watch,
  Activity,
  Globe2,
  Film,
  Coins,
  Rocket,
  CheckCircle2
} from 'lucide-react'
import Image from 'next/image'
import { assetPath } from '@/lib/asset'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

function Counter({ value, suffix = '', duration = 1.6 }: { value: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const nodeRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!nodeRef.current) return
    const obj = { val: 0 }
    const st = ScrollTrigger.create({
      trigger: nodeRef.current,
      start: 'top 90%',
      onEnter: () => {
        gsap.to(obj, {
          val: value,
          duration,
          ease: 'power2.out',
          onUpdate: () => {
            setCount(Math.round(obj.val))
          },
        })
      },
      once: true,
    })

    return () => st.kill()
  }, [value, duration])

  return (
    <span ref={nodeRef}>
      {count}{suffix}
    </span>
  )
}

export default function About() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo('.about-fade',
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const interests = [
    { icon: Code2, label: t('Informatique & Dev', 'Computer Science') },
    { icon: TrendingUp, label: t('Trading & Algorithmes', 'Trading & Algorithms') },
    { icon: Dumbbell, label: t('Sport & Musculation', 'Sports & Fitness') },
    { icon: Watch, label: t('Horlogerie', 'Horology & Watches') },
    { icon: Activity, label: t('Longévité & Santé', 'Longevity & Health') },
    { icon: Globe2, label: t('Culture japonaise', 'Japanese Culture') },
    { icon: Film, label: t('Montage vidéo (7+ ans)', 'Video Editing (7+ yrs)') },
    { icon: Coins, label: t('Finance Quant & Crypto', 'Quant Finance & Crypto') },
    { icon: Rocket, label: t('Entrepreneuriat', 'Entrepreneurship') },
  ]

  return (
    <section ref={sectionRef} id="about" className="py-28 px-6 max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="mb-14">
        <span className="text-[#D4A843] font-mono text-xs tracking-widest uppercase mb-3 flex items-center gap-2">
          <span className="w-8 h-px bg-[#D4A843]/50" />
          {t('01 — À propos', '01 — About')}
        </span>
        <TextReveal tag="h2" className="text-3xl md:text-5xl font-bold text-[#F8FAFC] tracking-tight leading-tight" stagger={0.03}>
          {t('Profil & parcours.', 'Profile & background.')}
        </TextReveal>
      </div>

      {/* High-Impact Stat Strip — No bulky rectangles, clean architectural dividers */}
      <div
        ref={statsRef}
        className="about-fade grid grid-cols-2 md:grid-cols-4 gap-6 py-6 px-4 mb-16 border-y border-white/[0.08] bg-white/[0.01]"
      >
        <div className="space-y-1">
          <div className="text-2xl sm:text-3xl font-bold text-[#D4A843] font-mono">
            <Counter value={1} suffix=" an" />
          </div>
          <div className="text-xs text-[#94A3B8] uppercase tracking-wider font-medium">
            {t("D'expérience pro", 'Pro experience')}
          </div>
          <div className="text-[11px] text-[#64748B]">Carrier Culoz SA &amp; DSI CHAI</div>
        </div>

        <div className="space-y-1">
          <div className="text-2xl sm:text-3xl font-bold text-[#F8FAFC] font-mono">
            <Counter value={11} suffix="+" />
          </div>
          <div className="text-xs text-[#94A3B8] uppercase tracking-wider font-medium">
            {t('Projets réalisés', 'Projects built')}
          </div>
          <div className="text-[11px] text-[#64748B]">SaaS, Embarqué, Web &amp; IA</div>
        </div>

        <div className="space-y-1">
          <div className="text-2xl sm:text-3xl font-bold text-[#F8FAFC] font-mono">BUT3</div>
          <div className="text-xs text-[#94A3B8] uppercase tracking-wider font-medium">
            {t('Informatique', 'Computer Science')}
          </div>
          <div className="text-[11px] text-[#64748B]">IUT2 Université Grenoble</div>
        </div>

        <div className="space-y-1">
          <div className="text-2xl sm:text-3xl font-bold text-[#D4A843] font-mono flex items-center gap-1.5">
            <span>24/7</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <div className="text-xs text-[#94A3B8] uppercase tracking-wider font-medium">
            {t('Systèmes autonomes', 'Autonomous systems')}
          </div>
          <div className="text-[11px] text-[#64748B]">Trading &amp; Daemons Linux</div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

        {/* Left Column: Identity, Status & Location (5 cols) with 3D Tilt */}
        <div className="lg:col-span-5 space-y-6">
          <TiltCard maxTilt={7} scale={1.01} className="rounded-xl overflow-hidden">
            <div className="about-fade p-6 border border-white/[0.08] hover:border-[#D4A843]/40 rounded-xl bg-[#090C12]/80 backdrop-blur-md relative overflow-hidden transition-colors duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-[#D4A843]/40 shadow-[0_0_20px_rgba(212,168,67,0.15)] bg-[#050505] shrink-0">
                  <Image
                    src={assetPath('/images/alexis.png')}
                    alt="Alexis Serano"
                    width={64}
                    height={64}
                    className="object-contain"
                    priority
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#F8FAFC]">Alexis Serano</h3>
                  <p className="text-xs text-[#D4A843] font-mono">
                    {t('Développeur Full-Stack & DevOps', 'Full-Stack & DevOps Developer')}
                  </p>
                  <p className="text-[11px] text-[#64748B]">20 ans · Permis B</p>
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-[#94A3B8] pt-4 border-t border-white/[0.06]">
                <div className="flex items-center gap-2.5">
                  <Building2 className="w-4 h-4 text-[#D4A843] shrink-0" />
                  <span>{t('Alternance chez Carrier Culoz SA (R&D STone)', 'Apprenticeship @ Carrier Culoz SA (STone R&D)')}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <GraduationCap className="w-4 h-4 text-[#D4A843] shrink-0" />
                  <span>BUT Informatique — IUT2 Grenoble</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-[#D4A843] shrink-0" />
                  <span>Culoz (01) &amp; Grenoble (38)</span>
                </div>
              </div>

              {/* Improved Dynamic Professional Status (replaces old "Disponible 2027") */}
              <div className="mt-6 pt-4 border-t border-white/[0.06]">
                <div className="flex items-center gap-2 text-xs text-[#CBD5E1]">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  <span className="font-medium text-[#F5D785]">
                    {t('En alternance Carrier · Ouvert aux opportunités (CDI / Missions dès 2027)', 'Carrier Apprentice · Open to opportunities (Full-time / Projects)')}
                  </span>
                </div>
              </div>
            </div>
          </TiltCard>
        </div>

        {/* Right Column: Narrative Biography & Philosophy (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="about-fade space-y-4 text-sm text-[#94A3B8] leading-relaxed">
            <p>
              {t(
                "Étudiant en 3ème année de BUT Informatique à l'IUT2 de Grenoble et alternant chez Carrier Culoz SA, je conçois des logiciels robustes à l'intersection du développement moderne, des systèmes distribués et de l'embarqué temps réel.",
                "Currently in my 3rd year of Computer Science at IUT2 Grenoble and apprentice at Carrier Culoz SA, I build resilient software across modern web systems, distributed infra, and real-time embedded programming."
              )}
            </p>
            <p>
              {t(
                "Chez Carrier, je pilote la migration logicielle d'automates industriels de traitement d'air (plateforme propriétaire Carrel vers STone en Langage ST). Auparavant, mon stage au Centre Hospitalier Alpes-Isère m'a permis d'automatiser l'infrastructure sous PowerShell et de déployer des clusters conteneurisés Kubernetes en haute disponibilité pour plus de 1800 utilisateurs.",
                "At Carrier, I drive the embedded software migration of industrial air handling PLCs from legacy Carrel to modern STone in Structured Text. Previously at Alps-Isère Hospital Center, I automated infrastructure with PowerShell and deployed high-availability Kubernetes clusters supporting 1,800+ users."
              )}
            </p>
            <p>
              {t(
                "En parallèle, je développe des projets SaaS complets comme Algofy (trading algorithmique sur Hyperliquid DEX avec daemons Linux 24/7 et paiements Stripe) et LifeOS (dashboard personnel unifié avec backend asynchrone FastAPI).",
                "Concurrently, I engineer full-lifecycle SaaS platforms such as Algofy (algorithmic trading on Hyperliquid DEX with 24/7 Linux daemons and Stripe billing) and LifeOS (personal unified dashboard powered by async FastAPI)."
              )}
            </p>
          </div>

          {/* Key Engineering Pillars */}
          <div className="about-fade pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              t('Architecture & Code propre', 'Clean Architecture'),
              t('Fiabilité & Automatisation', 'Reliability & Automation'),
              t('Performance temps réel', 'Real-time Performance'),
            ].map((pillar, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-[#CBD5E1] font-mono">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#D4A843] shrink-0" />
                <span>{pillar}</span>
              </div>
            ))}
          </div>

          {/* Interests without emojis, using clean Lucide icons */}
          <div className="about-fade pt-6 border-t border-white/[0.08]">
            <h4 className="text-xs uppercase tracking-[0.15em] text-[#64748B] font-mono mb-3.5">
              {t('Centres d\'intérêt & passions', 'Interests & Passions')}
            </h4>
            <div className="flex flex-wrap gap-2">
              {interests.map((item, i) => {
                const IconComponent = item.icon
                return (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-xs text-[#CBD5E1] hover:text-[#F5D785] px-3 py-1.5 rounded-lg border border-white/[0.06] hover:border-[#D4A843]/30 bg-white/[0.02] transition-colors"
                  >
                    <IconComponent className="w-3.5 h-3.5 text-[#D4A843]" />
                    <span>{item.label}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

