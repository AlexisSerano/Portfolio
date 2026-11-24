'use client'

import { useLanguage } from '@/context/LanguageContext'
import FadeIn from '@/components/ui/FadeIn'
import SpotlightCard from '@/components/ui/SpotlightCard'

export default function Skills() {
  const { lang, t } = useLanguage()

  const skillBlocks = [
    {
      title: { fr: 'Logiciel & Backend', en: 'Software & Backend' },
      lead: 'Python (Django, FastAPI) · PHP (Symfony) · TypeScript / JavaScript',
      rest: {
        fr: 'Node.js, React, Next.js, Alpine.js, Java, C/C++, Langage ST (Carel STone), conception et consommation d’APIs REST.',
        en: 'Node.js, React, Next.js, Alpine.js, Java, C/C++, Structured Text (Carel STone), REST API design and integration.',
      },
    },
    {
      title: { fr: 'DevOps, Infra & Données', en: 'DevOps, Infra & Data' },
      lead: 'Docker · Kubernetes (K3s) · Linux · Nginx · PostgreSQL',
      rest: {
        fr: 'Automatisation PowerShell, administration Active Directory & Exchange, MySQL / MariaDB, SQLite, workflows Git & GitHub.',
        en: 'PowerShell automation, Active Directory & Exchange administration, MySQL / MariaDB, SQLite, Git & GitHub workflows.',
      },
    },
    {
      title: { fr: 'Sécurité & Méthodes', en: 'Security & Practices' },
      lead: 'Conformité Cyber Resilience Act (CRA) · Authentification OTP / SSO',
      rest: {
        fr: 'Chiffrement AES-256 & hachage Bcrypt, sécurisation d’accès console et de routes API industrielles, méthodes Agiles.',
        en: 'AES-256 encryption & Bcrypt hashing, industrial console and API endpoint hardening, Agile methodologies.',
      },
    },
    {
      title: { fr: 'Langues & Savoir-être', en: 'Languages & Strengths' },
      lead:
        lang === 'fr'
          ? 'Français (Natif) · Anglais (B2) · Espagnol (A2)'
          : 'French (Native) · English (B2) · Spanish (A2)',
      rest: {
        fr: 'Rigueur, esprit d’analyse, autonomie et proactivité, résolution de problèmes en environnement R&D international et hospitalier.',
        en: 'Analytical rigor, autonomy and proactivity, problem solving across international R&D and healthcare IT environments.',
      },
    },
  ]

  const educationBlocks = [
    {
      period: '2024 – 2027',
      title: {
        fr: 'B.U.T. Informatique — Grade de Bachelor (180 ECTS)',
        en: 'Bachelor of Technology in Computer Science (180 ECTS)',
      },
      place: {
        fr: 'I.U.T.2 Université Grenoble Alpes · Parcours Réalisation d’Applications',
        en: 'IUT2 Université Grenoble Alpes · Software Engineering Track',
      },
    },
    {
      period: '2021 – 2024',
      title: {
        fr: 'Baccalauréat Général — Mathématiques & NSI',
        en: 'General Baccalaureate — Mathematics & Computer Science',
      },
      place: {
        fr: 'Spécialités Mathématiques et Numérique & Sciences Informatiques · Mention Assez Bien',
        en: 'Mathematics and Computer Science specialties · With Honors',
      },
    },
  ]

  return (
    <section id="skills" className="scroll-mt-20 py-16 sm:py-24 max-w-[1120px] mx-auto px-6 space-y-20">
      <div>
        <FadeIn>
          <h2 className="text-[26px] sm:text-[32px] font-bold tracking-[-0.035em] text-[var(--ink)] mb-8 sm:mb-10">
            {t('Compétences clés', 'Core skills')}
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {skillBlocks.map((block, idx) => (
            <FadeIn key={block.title.en} delay={idx * 0.04}>
              <SpotlightCard className="rounded-[20px] p-6 h-full flex flex-col">
                <h3 className="text-[12.5px] font-semibold text-[var(--accent)] tracking-[-0.01em]">
                  {lang === 'fr' ? block.title.fr : block.title.en}
                </h3>
                <p className="mt-2 text-[15.5px] font-semibold text-[var(--ink)] leading-snug tracking-[-0.018em]">
                  {block.lead}
                </p>
                <p className="mt-2 text-[14px] leading-[1.64] text-[var(--ink-secondary)]">
                  {lang === 'fr' ? block.rest.fr : block.rest.en}
                </p>
              </SpotlightCard>
            </FadeIn>
          ))}
        </div>
      </div>

      <div>
        <FadeIn>
          <h2 className="text-[26px] sm:text-[32px] font-bold tracking-[-0.035em] text-[var(--ink)] mb-8 sm:mb-10">
            {t('Formation & centres d’intérêt', 'Education & interests')}
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {educationBlocks.map((edu, idx) => (
            <FadeIn key={edu.period} delay={idx * 0.04}>
              <SpotlightCard className="rounded-[20px] p-6 h-full">
                <span className="text-[13px] font-medium tabular-nums text-[var(--accent)]">{edu.period}</span>
                <h3 className="mt-1.5 text-[16.5px] font-bold text-[var(--ink)] tracking-[-0.02em]">
                  {lang === 'fr' ? edu.title.fr : edu.title.en}
                </h3>
                <p className="mt-1 text-[14px] text-[var(--ink-secondary)] leading-relaxed">
                  {lang === 'fr' ? edu.place.fr : edu.place.en}
                </p>
              </SpotlightCard>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.08}>
          <p className="mt-6 px-1 text-[14px] text-[var(--ink-secondary)] leading-relaxed">
            <span className="font-semibold text-[var(--ink)]">
              {t('Centres d’intérêt :', 'Interests:')}
            </span>{' '}
            {t(
              'Horlogerie · Culture japonaise · Trading & investissement · Entrepreneuriat · Longévité & sport · Montage vidéo & motion design',
              'Watchmaking · Japanese culture · Trading & investing · Entrepreneurship · Longevity & fitness · Video editing & motion design'
            )}
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
