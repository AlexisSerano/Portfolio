'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { useTheme } from '@/context/ThemeContext'
import { assetPath } from '@/lib/asset'
import { Sun, Moon, ArrowUpRight } from 'lucide-react'

const navItems = [
  { href: '#experience', fr: 'Expérience', en: 'Experience' },
  { href: '#projects', fr: 'Projets', en: 'Projects' },
  { href: '#skills', fr: 'Compétences', en: 'Skills' },
  { href: '#contact', fr: 'Contact', en: 'Contact' },
]

export default function Navbar() {
  const { lang, toggleLang, t } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const [hoveredHref, setHoveredHref] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    if (href === '#top') {
      if (window.portfolioLenis) {
        window.portfolioLenis.scrollTo(0)
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
      return
    }
    const target = document.querySelector(href)
    if (target) {
      if (window.portfolioLenis) {
        window.portfolioLenis.scrollTo(target as HTMLElement, { offset: -72 })
      } else {
        target.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <header
      className="sticky top-0 z-40 transition-shadow duration-200"
      style={{
        backgroundColor: 'var(--nav-bg)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        boxShadow: scrolled ? '0 1px 0 0 var(--divider)' : 'none',
      }}
    >
      <div className="max-w-[920px] mx-auto px-6 h-14 flex items-center justify-between gap-4">
        {/* Wordmark */}
        <a
          href="#top"
          onClick={(e) => scrollTo(e, '#top')}
          className="text-[14px] font-semibold tracking-[-0.02em] text-[var(--ink)] hover:opacity-75 transition-opacity"
        >
          Alexis Serano
        </a>

        {/* Center Navigation (Desktop) — Gliding borderless hover pill */}
        <nav
          aria-label={t('Navigation principale', 'Primary navigation')}
          onMouseLeave={() => setHoveredHref(null)}
          className="hidden md:flex items-center gap-0.5"
        >
          {navItems.map((item) => {
            const isHovered = hoveredHref === item.href
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => scrollTo(e, item.href)}
                onMouseEnter={() => setHoveredHref(item.href)}
                className="relative px-3 py-1.5 text-[13.5px] text-[var(--ink-secondary)] hover:text-[var(--ink)] transition-colors rounded-[7px]"
              >
                {isHovered && (
                  <motion.span
                    layoutId="nav-hover-pill"
                    transition={{ type: 'spring', stiffness: 460, damping: 36 }}
                    className="absolute inset-0 rounded-[7px] bg-[var(--surface)] -z-10"
                  />
                )}
                {lang === 'fr' ? item.fr : item.en}
              </a>
            )
          })}
        </nav>

        {/* Right Controls: Language, Theme, CV */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={toggleLang}
            aria-label={t('Passer en anglais', 'Switch to French')}
            className="px-2 py-1 rounded-[7px] text-[12.5px] font-medium text-[var(--ink-secondary)] hover:text-[var(--ink)] hover:bg-[var(--surface)] transition-colors cursor-pointer pressable"
          >
            <span className={lang === 'fr' ? 'text-[var(--ink)] font-semibold' : 'text-[var(--ink-muted)]'}>FR</span>
            <span className="mx-1 text-[var(--ink-muted)] opacity-50">/</span>
            <span className={lang === 'en' ? 'text-[var(--ink)] font-semibold' : 'text-[var(--ink-muted)]'}>EN</span>
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              theme === 'light'
                ? t('Activer le thème sombre', 'Switch to dark theme')
                : t('Activer le thème clair', 'Switch to light theme')
            }
            className="w-8 h-8 rounded-[7px] flex items-center justify-center text-[var(--ink-secondary)] hover:text-[var(--ink)] hover:bg-[var(--surface)] transition-colors cursor-pointer pressable"
          >
            {theme === 'light' ? <Moon className="w-[15px] h-[15px]" /> : <Sun className="w-[15px] h-[15px]" />}
          </button>

          <a
            href={assetPath('/images/Alexis_serano.pdf')}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 inline-flex items-center gap-1 px-3 py-1.5 rounded-[7px] bg-[var(--surface)] hover:bg-[var(--surface-hover)] text-[13px] font-medium text-[var(--ink)] cursor-pointer pressable"
          >
            <span>CV</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[var(--ink-muted)]" />
          </a>
        </div>
      </div>
    </header>
  )
}
