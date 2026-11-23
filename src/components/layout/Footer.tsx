'use client'

import { useLanguage } from '@/context/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="max-w-[920px] mx-auto px-6 pt-8 pb-14 text-[13px] text-[var(--ink-muted)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
      <span>Alexis Serano</span>
      <span>
        {t(
          'Frontière genevoise · Cantons de Genève & Vaud (juillet 2027)',
          'Geneva border · Cantons of Geneva & Vaud (July 2027)'
        )}
      </span>
    </footer>
  )
}
