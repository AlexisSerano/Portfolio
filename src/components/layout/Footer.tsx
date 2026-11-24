'use client'

import { useLanguage } from '@/context/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="relative z-10 max-w-[1120px] mx-auto px-6 pt-6 pb-14 text-[13px] text-[var(--ink-muted)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
      <span className="font-medium text-[var(--ink-secondary)]">Alexis Serano</span>
      <span>
        {t(
          'Frontière genevoise · Mobilité Genève & Vaud (juillet 2027)',
          'Geneva border · Relocating to Geneva & Vaud (July 2027)'
        )}
      </span>
    </footer>
  )
}
