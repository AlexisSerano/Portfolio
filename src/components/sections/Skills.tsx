'use client'

import { useLanguage } from '@/context/LanguageContext'
import FadeIn from '@/components/ui/FadeIn'

export default function Skills() {
  const { lang, t } = useLanguage()

  const skillRows = [
    {
      label: { fr: 'Logiciel & Backend', en: 'Software & Backend' },
      items: {
        fr: 'Python (Django, FastAPI), PHP (Symfony), JavaScript & TypeScript (Node.js, React, Next.js, Alpine.js), Java, C/C++, Langage ST (Carel STone), APIs REST',
        en: 'Python (Django, FastAPI), PHP (Symfony), JavaScript & TypeScript (Node.js, React, Next.js, Alpine.js), Java, C/C++, Structured Text (Carel STone), REST APIs',
      },
    },
    {
      label: { fr: 'DevOps, Infra & Données', en: 'DevOps, Infra & Data' },
      items: {
        fr: 'Docker, Kubernetes (K3s), Nginx, Linux, PowerShell, Active Directory, Exchange, PostgreSQL, MySQL / MariaDB, SQLite, Git & GitHub',
        en: 'Docker, Kubernetes (K3s), Nginx, Linux, PowerShell, Active Directory, Exchange, PostgreSQL, MySQL / MariaDB, SQLite, Git & GitHub',
      },
    },
    {
      label: { fr: 'Sécurité & Méthodes', en: 'Security & Practices' },
      items: {
        fr: 'Cybersécurité industrielle (Cyber Resilience Act), Authentification OTP / SSO, Chiffrement AES-256 & Bcrypt, Méthodes Agiles',
        en: 'Industrial cybersecurity (Cyber Resilience Act), OTP / SSO authentication, AES-256 & Bcrypt encryption, Agile methodologies',
      },
    },
    {
      label: { fr: 'Langues', en: 'Languages' },
      items: {
        fr: 'Français (Natif) · Anglais (B2) · Espagnol (A2)',
        en: 'French (Native) · English (B2) · Spanish (A2)',
      },
    },
  ]

  const educationRows = [
    {
      period: '2024 – 2027',
      title: {
        fr: 'B.U.T. Informatique — Grade de Bachelor (180 ECTS)',
        en: 'Bachelor of Technology in Computer Science (180 ECTS)',
      },
      place: {
        fr: 'I.U.T.2 Université Grenoble Alpes · Parcours Réalisation d’Applications (conception, développement, validation)',
        en: 'IUT2 Université Grenoble Alpes · Software Engineering track (architecture, full-stack development, Linux & databases)',
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
    <section id="skills" className="scroll-mt-20 py-14 sm:py-20 max-w-[920px] mx-auto px-6 space-y-20">
      {/* Technical Skills */}
      <div>
        <FadeIn>
          <h2 className="text-[19px] sm:text-[21px] font-semibold tracking-[-0.024em] text-[var(--ink)] mb-8 sm:mb-10">
            {t('Compétences', 'Technical skills')}
          </h2>
        </FadeIn>

        <div className="space-y-6">
          {skillRows.map((row, idx) => (
            <FadeIn key={row.label.en} delay={idx * 0.04}>
              <div className="grid grid-cols-1 md:grid-cols-[185px_1fr] gap-1 md:gap-10 items-baseline">
                <h3 className="text-[14px] font-medium text-[var(--ink)]">
                  {lang === 'fr' ? row.label.fr : row.label.en}
                </h3>
                <p className="text-[14.5px] leading-[1.65] text-[var(--ink-secondary)]">
                  {lang === 'fr' ? row.items.fr : row.items.en}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Education & Personal Interests */}
      <div>
        <FadeIn>
          <h2 className="text-[19px] sm:text-[21px] font-semibold tracking-[-0.024em] text-[var(--ink)] mb-8 sm:mb-10">
            {t('Formation & centres d’intérêt', 'Education & interests')}
          </h2>
        </FadeIn>

        <div className="space-y-8">
          {educationRows.map((edu, idx) => (
            <FadeIn key={edu.period} delay={idx * 0.04}>
              <div className="grid grid-cols-1 md:grid-cols-[185px_1fr] gap-1 md:gap-10 items-baseline">
                <span className="text-[13.5px] tabular-nums text-[var(--ink-muted)]">{edu.period}</span>
                <div>
                  <h3 className="text-[15.5px] font-semibold text-[var(--ink)] tracking-[-0.015em]">
                    {lang === 'fr' ? edu.title.fr : edu.title.en}
                  </h3>
                  <p className="mt-0.5 text-[14px] text-[var(--ink-secondary)] leading-relaxed">
                    {lang === 'fr' ? edu.place.fr : edu.place.en}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}

          <FadeIn delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-[185px_1fr] gap-1 md:gap-10 items-baseline pt-2">
              <span className="text-[13.5px] text-[var(--ink-muted)]">
                {t('Centres d’intérêt', 'Interests')}
              </span>
              <p className="text-[14.5px] text-[var(--ink-secondary)] leading-relaxed">
                {t(
                  'Horlogerie · Trading & investissement · Culture japonaise · Montage vidéo & motion design',
                  'Watchmaking · Trading & investing · Japanese culture · Video editing & motion design'
                )}
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
