'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { useTheme } from '@/context/ThemeContext'
import { assetPath } from '@/lib/asset'
import { Sun, Moon, ArrowUpRight } from 'lucide-react'

const navItems = [
  { href: '#experience', id: 'experience', fr: 'Parcours', en: 'Journey' },
  { href: '#projects', id: 'projects', fr: 'Projets', en: 'Projects' },
  { href: '#skills', id: 'skills', fr: 'Compétences', en: 'Skills' },
  { href: '#contact', id: 'contact', fr: 'Contact', en: 'Contact' },
]

export default function Navbar() {
  const { lang, toggleLang, t } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const [hoveredHref, setHoveredHref] = useState<string | null>(null)
  const [activeHref, setActiveHref] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 460, damping: 42, mass: 0.2, restDelta: 0.001 })

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 16)
      if (y < 240) {
        setActiveHref(null)
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    const observer = new IntersectionObserver(
      (entries) => {
        if (window.scrollY < 240) return
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveHref(`#${entry.target.id}`)
          }
        }
      },
      { rootMargin: '-28% 0px -58% 0px', threshold: 0 }
    )

    for (const item of navItems) {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    }

    return () => {
      window.removeEventListener('scroll', onScroll)
      observer.disconnect()
    }
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

  const highlightedHref = hoveredHref ?? activeHref

  return (
    <header
      className="sticky top-0 z-40 transition-shadow duration-200"
      style={{
        backgroundColor: 'var(--nav-bg)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        boxShadow: scrolled ? '0 1px 0 0 var(--divider)' : 'none',
      }}
    >
      <div className="max-w-[1120px] mx-auto px-6 h-14 flex items-center justify-between gap-4">
        <a
          href="#top"
          onClick={(e) => scrollTo(e, '#top')}
          className="text-[14.5px] font-bold tracking-[-0.026em] text-[var(--ink)] hover:text-[var(--accent)] transition-colors"
        >
          Alexis Serano
        </a>

        <nav
          aria-label={t('Navigation principale', 'Primary navigation')}
          onMouseLeave={() => setHoveredHref(null)}
          className="hidden md:flex items-center gap-0.5 p-1 rounded-full"
        >
          {navItems.map((item) => {
            const isHighlighted = highlightedHref === item.href
            const isActive = activeHref === item.href
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => scrollTo(e, item.href)}
                onMouseEnter={() => setHoveredHref(item.href)}
                className={`relative px-3.5 py-1.5 text-[13.5px] transition-colors rounded-full ${
                  isHighlighted || isActive
                    ? 'text-[var(--ink)] font-medium'
                    : 'text-[var(--ink-secondary)] hover:text-[var(--ink)]'
                }`}
              >
                {isHighlighted && (
                  <motion.span
                    layoutId="nav-pill"
                    transition={{ type: 'spring', stiffness: 440, damping: 35 }}
                    className="absolute inset-0 rounded-full bg-[var(--accent-soft)] -z-10"
                  />
                )}
                {lang === 'fr' ? item.fr : item.en}
              </a>
            )
          })}
        </nav>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={toggleLang}
            aria-label={t('Passer en anglais', 'Switch to French')}
            className="px-2 py-1 rounded-full text-[12.5px] font-medium text-[var(--ink-secondary)] hover:text-[var(--ink)] hover:bg-[var(--surface)] transition-colors cursor-pointer pressable"
          >
            <span className={lang === 'fr' ? 'text-[var(--ink)] font-semibold' : 'text-[var(--ink-muted)]'}>FR</span>
            <span className="mx-1 text-[var(--ink-muted)] opacity-50">/</span>
            <span className={lang === 'en' ? 'text-[var(--ink)] font-semibold' : 'text-[var(--ink-muted)]'}>EN</span>
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              theme === 'dark'
                ? t('Activer le thème clair Sakura', 'Switch to Sakura light theme')
                : t('Activer le thème sombre Sakura', 'Switch to Sakura dark theme')
            }
            className="w-8 h-8 rounded-full flex items-center justify-center text-[var(--ink-secondary)] hover:text-[var(--accent)] hover:bg-[var(--accent-soft)] transition-colors cursor-pointer pressable"
          >
            {theme === 'dark' ? <Sun className="w-[15px] h-[15px]" /> : <Moon className="w-[15px] h-[15px]" />}
          </button>

          <a
            href={assetPath('/images/Alexis_serano.pdf')}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-[var(--surface)] hover:bg-[var(--accent-soft)] text-[13px] font-medium text-[var(--ink)] cursor-pointer pressable"
          >
            <span>CV</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[var(--accent)]" />
          </a>
        </div>
      </div>

      {/* Luminous 1px Sakura Scroll Thread */}
      <motion.div
        aria-hidden="true"
        style={{
          scaleX,
          background: 'linear-gradient(90deg, var(--accent) 0%, var(--accent-deep) 100%)',
        }}
        className="h-[1px] w-full origin-left opacity-80 will-change-transform"
      />
    </header>
  )
}
