'use client'

import { useLanguage } from '@/context/LanguageContext'
import FadeIn from '@/components/ui/FadeIn'
import { ArrowUpRight } from 'lucide-react'

interface WorkEntry {
  period: { fr: string; en: string }
  location: string
  role: { fr: string; en: string }
  company: string
  context: { fr: string; en: string }
  bullets: { fr: string[]; en: string[] }
  stack: string
  projectSlug: string
}

const workEntries: WorkEntry[] = [
  {
    period: { fr: 'Août 2026 – Juil. 2027', en: 'Aug 2026 – Jul 2027' },
    location: 'Culoz, France',
    role: { fr: 'Développeur Logiciel R&D (Alternance)', en: 'R&D Software Developer (Apprenticeship)' },
    company: 'Carrier',
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
    period: { fr: 'Mai – Juin 2026', en: 'May – Jun 2026' },
    location: 'St-Égrève, France',
    role: { fr: 'Stage — Déploiement & Automatisation', en: 'Deployment & Automation Intern' },
    company: 'Centre Hospitalier Alpes-Isère (CHAI)',
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
]

export default function Experience() {
  const { lang, t } = useLanguage()

  const openProject = (slug: string) => {
    window.dispatchEvent(new CustomEvent('portfolio-open-project', { detail: { slug } }))
  }

  return (
    <section id="experience" className="scroll-mt-20 py-14 sm:py-20 max-w-[920px] mx-auto px-6">
      <FadeIn>
        <h2 className="text-[19px] sm:text-[21px] font-semibold tracking-[-0.024em] text-[var(--ink)] mb-10 sm:mb-12">
          {t('Expérience professionnelle', 'Work experience')}
        </h2>
      </FadeIn>

      <div className="space-y-14 sm:space-y-16">
        {workEntries.map((entry, idx) => (
          <FadeIn key={entry.projectSlug} delay={idx * 0.06}>
            <article className="grid grid-cols-1 md:grid-cols-[185px_1fr] gap-2 md:gap-10 items-baseline">
              {/* Left Column: Calm Tabular Dates & Location */}
              <div className="text-[13.5px] leading-relaxed">
                <div className="text-[var(--ink-secondary)] tabular-nums font-medium md:font-normal">
                  {lang === 'fr' ? entry.period.fr : entry.period.en}
                </div>
                <div className="text-[var(--ink-muted)] text-[13px]">{entry.location}</div>
              </div>

              {/* Right Column: Role, Context, Achievements, Stack */}
              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-[16px] sm:text-[17px] font-semibold text-[var(--ink)] tracking-[-0.018em]">
                    {lang === 'fr' ? entry.role.fr : entry.role.en}{' '}
                    <span className="text-[var(--ink-muted)] font-normal">·</span>{' '}
                    <span>{entry.company}</span>
                  </h3>

                  <button
                    type="button"
                    onClick={() => openProject(entry.projectSlug)}
                    className="link-editorial inline-flex items-center gap-0.5 text-[13px] text-[var(--ink-muted)] hover:text-[var(--ink)] cursor-pointer"
                  >
                    <span>{t('Détails', 'Details')}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <p className="mt-1 text-[13.5px] text-[var(--ink-muted)] leading-relaxed">
                  {lang === 'fr' ? entry.context.fr : entry.context.en}
                </p>

                <ul className="mt-4 space-y-2.5 text-[14.5px] leading-[1.65] text-[var(--ink-secondary)]">
                  {(lang === 'fr' ? entry.bullets.fr : entry.bullets.en).map((bullet, bIdx) => (
                    <li key={bIdx} className="pl-4 relative">
                      <span
                        aria-hidden="true"
                        className="absolute left-0 top-[0.68em] w-1.5 h-[1px] bg-[var(--ink-muted)]"
                      />
                      {bullet}
                    </li>
                  ))}
                </ul>

                <p className="mt-4 text-[13px] text-[var(--ink-muted)] leading-relaxed">{entry.stack}</p>
              </div>
            </article>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
