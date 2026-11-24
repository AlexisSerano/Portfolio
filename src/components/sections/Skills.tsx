'use client'

import { useLanguage } from '@/context/LanguageContext'
import FadeIn from '@/components/ui/FadeIn'
import SectionHeading from '@/components/ui/SectionHeading'

interface TechItem {
  name: string
  core?: boolean
}

interface SkillGroup {
  category: { fr: string; en: string }
  techs: TechItem[]
}

const skillGroups: SkillGroup[] = [
  {
    category: { fr: 'Backend & Logiciel', en: 'Backend & Software' },
    techs: [
      { name: 'Python (Django, FastAPI)', core: true },
      { name: 'PHP (Symfony)', core: true },
      { name: 'APIs REST', core: true },
      { name: 'Java', core: true },
      { name: 'C / C++' },
      { name: 'Langage ST (Carel STone)' },
    ],
  },
  {
    category: { fr: 'Frontend & Mobile', en: 'Frontend & Mobile' },
    techs: [
      { name: 'JavaScript (ES6+)', core: true },
      { name: 'TypeScript', core: true },
      { name: 'React & Next.js', core: true },
      { name: 'Alpine.js', core: true },
      { name: 'Tailwind CSS' },
      { name: 'Android (Java)' },
    ],
  },
  {
    category: { fr: 'DevOps, Infra & Données', en: 'DevOps, Infra & Data' },
    techs: [
      { name: 'Docker', core: true },
      { name: 'Kubernetes (K3s)', core: true },
      { name: 'Linux', core: true },
      { name: 'PostgreSQL', core: true },
      { name: 'Nginx' },
      { name: 'PowerShell' },
      { name: 'Active Directory & Exchange' },
      { name: 'MySQL / MariaDB' },
      { name: 'Git & GitHub' },
    ],
  },
  {
    category: { fr: 'Sécurité & Méthodes', en: 'Security & Practices' },
    techs: [
      { name: 'Cybersécurité (CRA)', core: true },
      { name: 'Authentification OTP / SSO', core: true },
      { name: 'Chiffrement AES-256 & Bcrypt' },
      { name: 'Méthodes Agiles' },
    ],
  },
]

const interests = [
  { fr: 'Culture japonaise', en: 'Japanese culture' },
  { fr: 'Horlogerie', en: 'Watchmaking' },
  { fr: 'Trading & investissement', en: 'Trading & investing' },
  { fr: 'Entrepreneuriat', en: 'Entrepreneurship' },
  { fr: 'Longévité & sport', en: 'Longevity & fitness' },
  { fr: 'Montage vidéo & motion design', en: 'Video editing & motion design' },
]

export default function Skills() {
  const { lang, t } = useLanguage()

  return (
    <section id="skills" className="scroll-mt-20 py-20 sm:py-28 max-w-[1120px] mx-auto px-6 space-y-24">
      {/* Open-Space Technical Stack */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-12">
          <SectionHeading
            title={t('Compétences techniques', 'Technical skills')}
            subtitle={t(
              'Technologies principales mises en avant et outils pratiqués en production.',
              'Core technologies highlighted alongside daily production tools.'
            )}
          />

          <div className="inline-flex items-center gap-2 text-[12.5px] text-[var(--ink-muted)]">
            <span className="w-2 h-2 rotate-45 bg-[var(--accent)] inline-block" />
            <span>{t('Technologie principale', 'Core technology')}</span>
          </div>
        </div>

        <div className="divide-y divide-[var(--divider)] border-y border-[var(--divider)]">
          {skillGroups.map((group, idx) => (
            <FadeIn key={group.category.en} delay={idx * 0.04}>
              <div className="py-7 grid grid-cols-1 md:grid-cols-[230px_1fr] gap-3 md:gap-10 items-baseline">
                <h3 className="text-[15px] font-semibold text-[var(--accent)] tracking-[-0.015em]">
                  {lang === 'fr' ? group.category.fr : group.category.en}
                </h3>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-2.5 text-[15px]">
                  {group.techs.map((tech) => (
                    <span
                      key={tech.name}
                      className={
                        tech.core
                          ? 'inline-flex items-center gap-2 font-semibold text-[var(--ink)]'
                          : 'text-[var(--ink-secondary)]'
                      }
                    >
                      {tech.core && (
                        <span
                          aria-hidden="true"
                          className="w-1.5 h-1.5 rotate-45 bg-[var(--accent)] shrink-0"
                        />
                      )}
                      {tech.name}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}

          {/* Languages Row */}
          <FadeIn delay={0.16}>
            <div className="py-7 grid grid-cols-1 md:grid-cols-[230px_1fr] gap-3 md:gap-10 items-baseline">
              <h3 className="text-[15px] font-semibold text-[var(--accent)] tracking-[-0.015em]">
                {t('Langues', 'Languages')}
              </h3>
              <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-[15px]">
                <span>
                  <strong className="font-semibold text-[var(--ink)]">{t('Français', 'French')}</strong>{' '}
                  <span className="text-[var(--ink-secondary)]">— {t('Natif', 'Native')}</span>
                </span>
                <span>
                  <strong className="font-semibold text-[var(--ink)]">{t('Anglais', 'English')}</strong>{' '}
                  <span className="text-[var(--ink-secondary)]">— B2</span>
                </span>
                <span>
                  <strong className="font-semibold text-[var(--ink)]">{t('Espagnol', 'Spanish')}</strong>{' '}
                  <span className="text-[var(--ink-secondary)]">— A2</span>
                </span>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Sober, Expressive Personal Interests — Clean Bold Statements Without Filler Fluff */}
      <div>
        <SectionHeading
          title={t('Centres d’intérêt', 'Personal interests')}
          className="mb-10"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-6">
          {interests.map((item, idx) => (
            <FadeIn key={item.en} delay={idx * 0.04}>
              <div className="group py-2 pl-4 border-l-2 border-[var(--accent-border)] hover:border-[var(--accent)] transition-colors">
                <span className="text-[17px] sm:text-[18px] font-bold text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors tracking-[-0.022em] inline-block transition-transform duration-300 group-hover:translate-x-1">
                  {lang === 'fr' ? item.fr : item.en}
                </span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
