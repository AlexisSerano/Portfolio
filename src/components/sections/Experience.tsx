'use client'

import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import FadeIn from '@/components/ui/FadeIn'
import SectionHeading from '@/components/ui/SectionHeading'
import { ArrowUpRight } from 'lucide-react'

interface JourneyItem {
  id: string
  period: { fr: string; en: string }
  location?: string
  title: { fr: string; en: string }
  organization: { fr: string; en: string }
  context?: { fr: string; en: string }
  bullets?: { fr: string[]; en: string[] }
  summary?: { fr: string; en: string }
  stack?: string
  projectSlug?: string
}

const journeyItems: JourneyItem[] = [
  {
    id: 'carrier',
    period: { fr: 'Août 2026 – Juil. 2027', en: 'Aug 2026 – Jul 2027' },
    location: 'Culoz, France',
    title: { fr: 'Développeur Logiciel R&D (Alternance)', en: 'R&D Software Developer (Apprenticeship)' },
    organization: { fr: 'Carrier', en: 'Carrier' },
    context: {
      fr: 'Service Recherche & Développement · Leader mondial de la climatisation (47 000 employés, 21,75 Mrd$ CA, ~150 pays, 4M d’unités vendues/an)',
      en: 'Research & Development · Global HVAC leader (47,000 employees, $21.75B revenue, ~150 countries, 4M units sold/yr)',
    },
    bullets: {
      fr: [
        'Refonte de l’application web de commissioning (Alpine.js, Tailwind CSS) consommant l’API REST de l’automate pour sécuriser plusieurs familles de régulateurs (Micro PC3, AeroConnect) dans le cadre du Cyber Resilience Act (échéance déc. 2027).',
        'Conception d’une architecture d’authentification OTP remplaçant le mot de passe statique à 4 chiffres sur un parc de 4 millions de régulateurs vendus par an, sécurisant l’accès console et les routes API.',
        'Participation à la migration de la régulation du legacy C-Suite vers Carel STone (Langage ST) ; initiation et formation de 5 développeurs R&D aux workflows Git et GitHub (branches, issues, pull requests).',
      ],
      en: [
        'Redesigning the web commissioning application (Alpine.js, Tailwind CSS) consuming the PLC REST API to secure multiple controller families (Micro PC3, AeroConnect) for European Cyber Resilience Act compliance (Dec 2027 deadline).',
        'Architecting OTP authentication replacing the static 4-digit PIN across a fleet of 4 million controllers sold per year, securing console access and API endpoints.',
        'Contributing to the control logic migration from legacy C-Suite to Carel STone (Structured Text); onboarding and training 5 R&D developers on Git and GitHub workflows (branching, issues, pull requests).',
      ],
    },
    stack: 'Alpine.js · Tailwind CSS · API REST · Cybersécurité (CRA) · Auth OTP · Carel STone · Langage ST · Git/GitHub',
    projectSlug: 'alternance-carrier',
  },
  {
    id: 'chai',
    period: { fr: 'Mai – Juin 2026', en: 'May – Jun 2026' },
    location: 'St-Égrève, France',
    title: { fr: 'Stage — Déploiement & Automatisation', en: 'Deployment & Automation Intern' },
    organization: { fr: 'Centre Hospitalier Alpes-Isère (CHAI)', en: 'Alps-Isère Hospital (CHAI)' },
    context: {
      fr: 'Direction des Systèmes d’Information · Établissement public de santé (1 800 professionnels, 50 structures extra-hospitalières, ~300 lits)',
      en: 'IT & Infrastructure Department · Public healthcare institution (1,800 professionals, 50 outpatient centers, ~300 beds)',
    },
    bullets: {
      fr: [
        'Développement d’un script d’automatisation PowerShell de normalisation Active Directory pour fiabiliser et mettre en conformité l’annuaire couvrant 1 800 professionnels.',
        'Optimisation de la gestion de la messagerie Exchange et de l’indexation des requêtes annuaire (Hashtables) avec désactivation de l’automapping Outlook, éliminant les ralentissements sur les postes clients.',
        'Refonte complète de la page d’accueil de l’Intranet sous WordPress (Astra, ACF, CPT UI) intégrant 23 applications métiers, accompagnée d’un guide d’administration garantissant l’autonomie de l’équipe RH.',
        'Déploiement d’une architecture DevOps en haute disponibilité (Docker Compose, Nginx Load Balancer, réplication MariaDB et orchestration Kubernetes / K3s sur 2 nœuds virtuels).',
      ],
      en: [
        'Developed a PowerShell Active Directory normalization script to standardize and audit accounts across 1,800 healthcare staff members.',
        'Optimized Exchange mailbox management and directory query indexing (Hashtables) while disabling Outlook automapping to eliminate client workstation slowdowns.',
        'Redesigned the hospital Intranet home portal on WordPress (Astra, ACF, CPT UI) integrating 23 internal applications, with an administration guide enabling HR autonomy.',
        'Deployed a high-availability DevOps stack (Docker Compose, Nginx Load Balancer, MariaDB replication, and 2-node Kubernetes / K3s orchestration).',
      ],
    },
    stack: 'Kubernetes (K3s) · Docker Compose · Nginx · MariaDB · PowerShell · Active Directory · Exchange · WordPress',
    projectSlug: 'stage-chai',
  },
  {
    id: 'but',
    period: { fr: '2024 – 2027', en: '2024 – 2027' },
    location: 'Grenoble, France',
    title: {
      fr: 'B.U.T. Informatique — Grade de Bachelor (180 ECTS)',
      en: 'Bachelor of Technology in Computer Science (180 ECTS)',
    },
    organization: {
      fr: 'I.U.T.2 Université Grenoble Alpes',
      en: 'IUT2 Université Grenoble Alpes',
    },
    summary: {
      fr: 'Parcours Réalisation d’Applications : architecture logicielle, développement Full-Stack (Python, PHP/Symfony, Java, JS), bases de données SQL, systèmes Linux et méthodes Agiles.',
      en: 'Software Engineering track: software architecture, Full-Stack development (Python, PHP/Symfony, Java, JS), SQL databases, Linux systems, and Agile methodologies.',
    },
  },
  {
    id: 'bac',
    period: { fr: '2021 – 2024', en: '2021 – 2024' },
    title: {
      fr: 'Baccalauréat Général — Mathématiques & NSI',
      en: 'General Baccalaureate — Mathematics & Computer Science',
    },
    organization: {
      fr: 'Mention Assez Bien',
      en: 'With Honors',
    },
    summary: {
      fr: 'Spécialités Mathématiques et Numérique & Sciences Informatiques (algorithmique, structures de données en Python, POO et réseaux).',
      en: 'Mathematics and Computer Science specialties (algorithms, Python data structures, OOP, and networking).',
    },
  },
]

export default function Experience() {
  const { lang, t } = useLanguage()
  const trackRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 72%', 'end 68%'],
  })
  const scaleY = useSpring(scrollYProgress, { stiffness: 420, damping: 42, mass: 0.25, restDelta: 0.001 })
  const tipTop = useTransform(scaleY, [0, 1], ['0%', '100%'])
  const tipOpacity = useTransform(scaleY, [0, 0.02, 0.98, 1], [0, 1, 1, 0])

  const openProject = (slug: string) => {
    window.dispatchEvent(new CustomEvent('portfolio-open-project', { detail: { slug } }))
  }

  return (
    <section id="experience" className="scroll-mt-20 py-20 sm:py-28 max-w-[1120px] mx-auto px-6">
      <SectionHeading
        title={t('Parcours & formation', 'Experience & education')}
        subtitle={t(
          'Expériences en R&D industrielle, infrastructure hospitalière et cursus universitaire.',
          'Industrial R&D engineering, healthcare IT infrastructure, and academic degree.'
        )}
        className="mb-14 sm:mb-18"
      />

      {/* Open-Space Journey Connected by Scroll-Driven Luminous Sakura Line */}
      <div ref={trackRef} className="relative">
        {/* Continuous Hairline Guide Track */}
        <div
          aria-hidden="true"
          className="absolute left-[5px] md:left-[208px] top-2 bottom-2 w-[1px] bg-[var(--divider)]"
        />

        {/* Scroll-Scrubbed Luminous Sakura Thread ("Ligne Directrice") + Leading Spark */}
        <div aria-hidden="true" className="absolute left-[5px] md:left-[208px] top-2 bottom-2 w-[1.5px]">
          <motion.div
            style={{
              scaleY,
              background: 'linear-gradient(180deg, var(--accent) 0%, var(--accent-deep) 100%)',
              boxShadow: 'var(--line-glow)',
            }}
            className="w-full h-full origin-top will-change-transform"
          />
          <motion.span
            style={{
              top: tipTop,
              opacity: tipOpacity,
              boxShadow: '0 0 14px 3px var(--accent)',
            }}
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-[5px] h-[5px] rounded-full bg-[var(--ink)] will-change-transform"
          />
        </div>

        <div className="space-y-14 sm:space-y-16">
          {journeyItems.map((item, idx) => (
            <FadeIn key={item.id} delay={idx * 0.05}>
              <article className="relative pl-8 md:pl-0 md:grid md:grid-cols-[184px_48px_1fr] items-baseline">
                {/* Left Column (Desktop): Period & Location */}
                <div className="hidden md:block text-right pr-2">
                  <div className="text-[13.5px] font-semibold text-[var(--accent)] tabular-nums">
                    {lang === 'fr' ? item.period.fr : item.period.en}
                  </div>
                  {item.location && (
                    <div className="text-[12.5px] text-[var(--ink-muted)] mt-0.5">{item.location}</div>
                  )}
                </div>

                {/* Axis Node: Geometric Rotated Diamond (Not an "online" dot) */}
                <div aria-hidden="true" className="hidden md:flex justify-center">
                  <span className="inline-block w-[7px] h-[7px] rotate-45 bg-[var(--accent)] translate-y-[-1px]" />
                </div>
                <span
                  aria-hidden="true"
                  className="md:hidden absolute left-[2px] top-[7px] w-[7px] h-[7px] rotate-45 bg-[var(--accent)]"
                />

                {/* Right Column: Open Editorial Content (Zero Rectangular Cages) */}
                <div>
                  {/* Mobile Date */}
                  <div className="md:hidden flex items-center gap-2 text-[13px] mb-1">
                    <span className="font-semibold text-[var(--accent)] tabular-nums">
                      {lang === 'fr' ? item.period.fr : item.period.en}
                    </span>
                    {item.location && (
                      <>
                        <span className="text-[var(--ink-muted)]">·</span>
                        <span className="text-[var(--ink-muted)]">{item.location}</span>
                      </>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 sm:gap-4">
                    <h3 className="text-[18px] sm:text-[20px] font-bold text-[var(--ink)] tracking-[-0.024em] leading-snug">
                      {lang === 'fr' ? item.title.fr : item.title.en}{' '}
                      <span className="text-[var(--ink-muted)] font-normal">—</span>{' '}
                      <span className="text-[var(--accent)]">
                        {lang === 'fr' ? item.organization.fr : item.organization.en}
                      </span>
                    </h3>

                    {item.projectSlug && (
                      <button
                        type="button"
                        onClick={() => openProject(item.projectSlug!)}
                        className="shrink-0 self-start inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[var(--accent-soft)] hover:bg-[var(--accent)] text-[var(--accent)] hover:text-[var(--accent-fg)] text-[12.5px] font-medium cursor-pointer pressable"
                      >
                        <span>{t('Étude de cas', 'Case study')}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {item.context && (
                    <p className="mt-1 text-[13.5px] text-[var(--ink-muted)] leading-relaxed">
                      {lang === 'fr' ? item.context.fr : item.context.en}
                    </p>
                  )}

                  {item.summary && (
                    <p className="mt-2.5 text-[14.5px] leading-[1.66] text-[var(--ink-secondary)] max-w-[720px]">
                      {lang === 'fr' ? item.summary.fr : item.summary.en}
                    </p>
                  )}

                  {item.bullets && (
                    <ul className="mt-4 space-y-2.5 text-[14.5px] leading-[1.68] text-[var(--ink-secondary)] max-w-[760px]">
                      {(lang === 'fr' ? item.bullets.fr : item.bullets.en).map((bullet, bIdx) => (
                        <li key={bIdx} className="pl-4 relative">
                          <span
                            aria-hidden="true"
                            className="absolute left-0 top-[0.68em] w-1.5 h-[1.5px] bg-[var(--accent)] opacity-75"
                          />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}

                  {item.stack && (
                    <p className="mt-4 text-[13px] text-[var(--ink-muted)] leading-relaxed">
                      {item.stack}
                    </p>
                  )}
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
