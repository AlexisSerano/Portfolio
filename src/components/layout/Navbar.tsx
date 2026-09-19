'use client'
import { useState, useEffect, useRef } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { cn } from '@/lib/utils'
import MagneticButton from '@/components/ui/MagneticButton'

const navLinks = [
  { id: 'about', fr: 'À propos', en: 'About' },
  { id: 'skills', fr: 'Compétences', en: 'Skills' },
  { id: 'experience', fr: 'Expériences', en: 'Experience' },
  { id: 'projects', fr: 'Projets', en: 'Projects' },
  { id: 'contact', fr: 'Contact', en: 'Contact' },
]

export default function Navbar() {
  const { lang, toggleLang, t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY
      setScrolled(currentY > 100)
      setHidden(currentY > lastScrollY.current && currentY > 300)
      lastScrollY.current = currentY
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    setMobileOpen(false)
    const el = document.getElementById(id)
    if (el) {
      if ((window as any).lenis) {
        ;(window as any).lenis.scrollTo(el, { duration: 1.2 })
      } else {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  const handleScrollTop = (e: React.MouseEvent) => {
    e.preventDefault()
    if ((window as any).lenis) {
      ;(window as any).lenis.scrollTo(0, { duration: 1.2 })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled ? 'glass py-3' : 'py-5',
          hidden ? '-translate-y-full' : 'translate-y-0',
        )}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a
            href="#hero"
            onClick={handleScrollTop}
            className="text-gradient-gold font-bold text-xl tracking-tight cursor-pointer"
            data-cursor
          >
            A.S
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-sm text-[#A3A3A3] hover:text-[#F5F5F5] transition-colors relative group"
                data-cursor
              >
                {lang === 'fr' ? link.fr : link.en}
                <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-[#D4A843] group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleLang}
              className="text-xs font-mono text-[#6B6B6B] hover:text-[#D4A843] transition-colors px-3 py-1 rounded-full border border-[rgba(255,255,255,0.06)] hover:border-[rgba(212,168,67,0.3)]"
              data-cursor
            >
              {lang === 'fr' ? 'EN' : 'FR'}
            </button>

            <MagneticButton
              href="/images/Alexis_serano.pdf"
              target="_blank"
              className="text-sm font-semibold px-5 py-2 rounded-full bg-[#D4A843] text-[#050505] hover:shadow-[0_0_30px_rgba(212,168,67,0.3)] transition-shadow"
            >
              {t('Mon CV', 'My Resume')}
            </MagneticButton>
          </div>

          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            <span className={cn('w-6 h-[1.5px] bg-[#F5F5F5] transition-all duration-300 origin-center', mobileOpen && 'rotate-45 translate-y-[7.5px]')} />
            <span className={cn('w-6 h-[1.5px] bg-[#F5F5F5] transition-all duration-300', mobileOpen && 'opacity-0')} />
            <span className={cn('w-6 h-[1.5px] bg-[#F5F5F5] transition-all duration-300 origin-center', mobileOpen && '-rotate-45 -translate-y-[7.5px]')} />
          </button>
        </div>
      </header>

      <div
        className={cn(
          'fixed inset-0 z-40 bg-[#050505]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 transition-all duration-500',
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      >
        {navLinks.map((link, i) => (
          <button
            key={link.id}
            onClick={() => scrollTo(link.id)}
            className="text-2xl font-bold text-[#F5F5F5] hover:text-[#D4A843] transition-colors"
            style={{
              transitionDelay: mobileOpen ? `${i * 80}ms` : '0ms',
              opacity: mobileOpen ? 1 : 0,
              transform: mobileOpen ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.4s ease',
            }}
          >
            {lang === 'fr' ? link.fr : link.en}
          </button>
        ))}
        <button
          onClick={toggleLang}
          className="text-sm font-mono text-[#D4A843] border border-[rgba(212,168,67,0.3)] px-4 py-2 rounded-full mt-4"
        >
          {lang === 'fr' ? 'Switch to English' : 'Passer en Français'}
        </button>
      </div>
    </>
  )
}
