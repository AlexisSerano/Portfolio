'use client'
import { Heart } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { assetPath } from '@/lib/asset'

export default function Footer() {
  const { lang, t } = useLanguage()

  const navItems = [
    { label: t('À propos', 'About'), href: '#about' },
    { label: t('Compétences', 'Skills'), href: '#skills' },
    { label: t('Expériences', 'Experience'), href: '#experience' },
    { label: t('Projets', 'Projects'), href: '#projects' },
    { label: t('Terminal', 'Terminal'), href: '#terminal' },
    { label: t('Contact', 'Contact'), href: '#contact' },
  ]

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const id = href.replace('#', '')
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
    <footer className="border-t border-white/[0.06] py-16 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <a
              href="#hero"
              onClick={handleScrollTop}
              className="text-gradient-gold font-bold text-2xl tracking-tight cursor-pointer inline-block"
            >
              A.S
            </a>
            <p className="text-[#A3A3A3] text-sm mt-3 max-w-xs leading-relaxed">
              {t(
                'Développeur Full-Stack & DevOps. Alternant @ Carrier Culoz SA & Étudiant en 3ème année BUT Informatique.',
                'Full-Stack & DevOps Developer. Apprentice @ Carrier Culoz SA & 3rd Year CS Student.'
              )}
            </p>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#6B6B6B] mb-4 font-mono">
              {t('Navigation', 'Navigation')}
            </h4>
            <ul className="space-y-2.5">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => handleScrollTo(e, item.href)}
                    className="text-sm text-[#A3A3A3] hover:text-[#D4A843] transition-colors cursor-pointer"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#6B6B6B] mb-4 font-mono">
              {t('Contact & Réseaux', 'Contact & Socials')}
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="mailto:alexis.seranoo@gmail.com"
                  className="text-sm text-[#A3A3A3] hover:text-[#D4A843] transition-colors"
                >
                  alexis.seranoo@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/AlexisSerano"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#A3A3A3] hover:text-[#D4A843] transition-colors"
                >
                  GitHub (AlexisSerano)
                </a>
              </li>
              <li>
                <a
                  href={assetPath('/images/Alexis_serano.pdf')}
                  target="_blank"
                  className="text-sm text-[#A3A3A3] hover:text-[#D4A843] transition-colors"
                >
                  {t('Curriculum Vitae (PDF)', 'Resume / CV (PDF)')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="h-[1px] w-full"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(212,168,67,0.35), transparent)',
          }}
        />

        <div className="flex flex-col md:flex-row justify-between items-center mt-8 gap-4">
          <p className="text-xs text-[#6B6B6B] font-mono">
            © 2026 Alexis Serano. Culoz &amp; Grenoble.
          </p>
          <p className="text-xs text-[#6B6B6B] flex items-center gap-1 font-mono">
            {t('Conçu avec Next.js 16, TypeScript & GSAP', 'Built with Next.js 16, TypeScript & GSAP')}
          </p>
        </div>
      </div>
    </footer>
  )
}
