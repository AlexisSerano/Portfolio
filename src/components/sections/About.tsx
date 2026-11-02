'use client'
import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '@/context/LanguageContext'
import TextReveal from '@/components/ui/TextReveal'
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
            <Counter value={4} suffix="M / an" />
          </div>
          <div className="text-xs text-[#94A3B8] uppercase tracking-wider font-medium">
            {t('Régulateurs sécurisés', 'Controllers secured')}
          </div>
          <div className="text-[11px] text-[#64748B]">Carrier R&amp;D · Auth OTP &amp; CRA</div>
        </div>

        <div className="space-y-1">
          <div className="text-2xl sm:text-3xl font-bold text-[#F8FAFC] font-mono">
            <Counter value={1800} suffix="+" />
          </div>
          <div className="text-xs text-[#94A3B8] uppercase tracking-wider font-medium">
            {t('Professionnels couverts', 'Staff supported')}
          </div>
          <div className="text-[11px] text-[#64748B]">DSI CHAI · K3s HA &amp; 23 Apps</div>
        </div>

        <div className="space-y-1">
          <div className="text-2xl sm:text-3xl font-bold text-[#F8FAFC] font-mono">180 ECTS</div>
          <div className="text-xs text-[#94A3B8] uppercase tracking-wider font-medium">
            {t('Grade de Bachelor', 'Bachelor Degree')}
          </div>
          <div className="text-[11px] text-[#64748B]">B.U.T. Informatique — UGA</div>
        </div>

        <div className="space-y-1">
          <div className="text-2xl sm:text-3xl font-bold text-[#D4A843] font-mono flex items-center gap-1.5">
            <span>24/7</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <div className="text-xs text-[#94A3B8] uppercase tracking-wider font-medium">
            {t('Systèmes & APIs', 'Systems & APIs')}
          </div>
          <div className="text-[11px] text-[#64748B]">Docker · Linux · REST</div>
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
                    {t('Développeur Logiciel & Full-Stack', 'Software & Full-Stack Developer')}
                  </p>
                  <p className="text-[11px] text-[#64748B]">20 ans · Permis B</p>
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-[#94A3B8] pt-4 border-t border-white/[0.06]">
                <div className="flex items-center gap-2.5">
                  <Building2 className="w-4 h-4 text-[#D4A843] shrink-0" />
                  <span>{t('Développeur Logiciel R&D @ Carrier (NYSE : CARR)', 'R&D Software Developer @ Carrier (NYSE: CARR)')}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <GraduationCap className="w-4 h-4 text-[#D4A843] shrink-0" />
                  <span>{t('B.U.T. Informatique (Grade de Bachelor - 180 ECTS) — UGA', 'Bachelor in Computer Science (180 ECTS) — UGA')}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-[#D4A843] shrink-0" />
                  <span>{t('Cantons de Genève & Vaud · Permis B', 'Geneva & Vaud Cantons · Driver License')}</span>
                </div>
              </div>

              {/* Improved Dynamic Professional Status */}
              <div className="mt-6 pt-4 border-t border-white/[0.06]">
                <div className="flex items-center gap-2 text-xs text-[#CBD5E1]">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  <span className="font-medium text-[#F5D785]">
                    {t('Disponible dès juillet 2027 (Genève & Vaud)', 'Available July 2027 (Geneva & Vaud)')}
                  </span>
                </div>
              </div>
            </div>
          </TiltCard>
        </div>

        {/* Right Column: Narrative Biography & Philosophy (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="about-fade space-y-3.5 text-sm text-[#94A3B8] leading-relaxed">
            <p>
              {t(
                "En 3e année de B.U.T. Informatique (Grade de Bachelor - 180 ECTS) à l'Université Grenoble Alpes, je développe du logiciel côté backend, des interfaces web embarquées et des outils d'automatisation.",
                "Final-year Computer Science student (Bachelor Degree - 180 ECTS) at Université Grenoble Alpes, I build backend software, embedded web interfaces, and automation tools."
              )}
            </p>
            <p>
              {t(
                "En R&D chez Carrier (47 000 employés, 21,75 Mrd$ CA), je refonds l'application web de commissioning (Alpine.js, Tailwind, API REST), conçois l'authentification OTP sur 3 familles de régulateurs (4M d'unités/an) pour le Cyber Resilience Act (CRA), et migre la régulation vers Carel STone.",
                "In R&D at Carrier (47,000 employees, $21.75B revenue), I redesign the web commissioning app (Alpine.js, Tailwind, REST API), build OTP authentication across 3 controller families (4M units/year) for the Cyber Resilience Act (CRA), and migrate PLC logic to Carel STone."
              )}
            </p>
            <p>
              {t(
                "Lors de mon stage à la DSI du Centre Hospitalier Alpes-Isère (1 800 professionnels), j'ai mis en place un cluster Kubernetes (K3s) sur 2 nœuds avec Nginx et Docker, automatisé l'Active Directory / Exchange en PowerShell et refondu l'intranet regroupant 23 applications métiers.",
                "During my internship at the CHAI Hospital IT Department (1,800 staff), I set up a 2-node Kubernetes (K3s) cluster with Nginx and Docker, automated Active Directory / Exchange via PowerShell, and rebuilt the intranet grouping 23 business apps."
              )}
            </p>
          </div>

          <div className="about-fade pt-2 text-xs text-[#CBD5E1] font-mono flex items-center gap-2">
            <span className="text-[#D4A843]">❯</span>
            <span>
              {t(
                "Ce qui me motive : comprendre ce qui tourne sous le capot et automatiser tout ce qui peut l'être.",
                "What drives me: understanding what happens under the hood and automating everything."
              )}
            </span>
          </div>

          {/* Interests — Editorial flow with gold dots, no boxy AI pills */}
          <div className="about-fade pt-6 border-t border-white/[0.08]">
            <h4 className="text-xs uppercase tracking-[0.15em] text-[#64748B] font-mono mb-3.5">
              {t('Centres d\'intérêt', 'Interests')}
            </h4>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5">
              {interests.map((item, i) => {
                const IconComponent = item.icon
                return (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-xs text-[#CBD5E1] hover:text-[#F5D785] transition-colors cursor-default"
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
