'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '@/context/LanguageContext'
import MagneticButton from '@/components/ui/MagneticButton'
import { Mail, Copy } from 'lucide-react'

const GithubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
)

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const typewriterPhrases = {
  fr: [
    'Développeur Full-Stack & DevOps',
    'Étudiant en 3ème année BUT Informatique',
    'Alternant @ Carrier Culoz SA',
    'Créateur de systèmes autonomes',
  ],
  en: [
    'Full-Stack & DevOps Developer',
    '3rd Year Computer Science Student',
    'Apprentice @ Carrier Culoz SA',
    'Builder of Autonomous Systems',
  ],
}

export default function Hero() {
  const { lang, t } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const nameRef = useRef<HTMLDivElement>(null)
  const typewriterRef = useRef<HTMLSpanElement>(null)
  const cursorRef = useRef<HTMLSpanElement>(null)

  // Animations with gsap.context
  useEffect(() => {
    const ctx = gsap.context(() => {
      const letters = nameRef.current?.querySelectorAll('.hero-letter')
      if (letters && letters.length > 0) {
        gsap.fromTo(letters,
          { opacity: 0, y: 50, rotateX: -60 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.7,
            stagger: 0.03,
            ease: 'power4.out',
            delay: 0.1,
          }
        )
      }

      // Dot bounce at end
      const dot = nameRef.current?.querySelector('.hero-dot')
      if (dot) {
        gsap.fromTo(dot,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: 'elastic.out(1, 0.5)', delay: 0.6 }
        )
      }

      gsap.fromTo('.hero-status', { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.5, delay: 0.1, ease: 'power2.out' })
      gsap.fromTo('.hero-bio', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5, delay: 0.5, ease: 'power2.out' })
      gsap.fromTo('.hero-actions', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5, delay: 0.7, ease: 'power2.out' })
      gsap.fromTo('.hero-scroll', { opacity: 0 }, { opacity: 1, duration: 0.5, delay: 0.9, ease: 'power2.out' })

      // Parallax on name
      if (nameRef.current && sectionRef.current) {
        gsap.to(nameRef.current, {
          y: 80,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.5,
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Typewriter effect
  useEffect(() => {
    const el = typewriterRef.current
    if (!el) return
    const phrases = typewriterPhrases[lang]
    let phraseIndex = 0
    let charIndex = 0
    let isDeleting = false
    let timeout: NodeJS.Timeout

    function type() {
      const phrase = phrases[phraseIndex]
      if (isDeleting) {
        charIndex--
        el!.textContent = phrase.substring(0, charIndex)
      } else {
        charIndex++
        el!.textContent = phrase.substring(0, charIndex)
      }

      let speed = isDeleting ? 30 : 60

      if (!isDeleting && charIndex === phrase.length) {
        speed = 2500
        isDeleting = true
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false
        phraseIndex = (phraseIndex + 1) % phrases.length
        speed = 400
      }

      timeout = setTimeout(type, speed)
    }

    const startDelay = setTimeout(type, 1200)
    return () => { clearTimeout(timeout); clearTimeout(startDelay) }
  }, [lang])

  // Cursor blink
  useEffect(() => {
    if (!cursorRef.current) return
    gsap.to(cursorRef.current, {
      opacity: 0,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut',
    })
  }, [])

  const splitName = (text: string) => {
    return text.split('').map((char, i) => (
      <span key={i} className="hero-letter inline-block opacity-0" style={{ perspective: '500px' }}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ))
  }

  const copyEmail = () => {
    navigator.clipboard.writeText('alexis.seranoo@gmail.com')
  }

  return (
    <section ref={sectionRef} id="hero" className="relative min-h-screen flex flex-col justify-center px-6 max-w-7xl mx-auto">
      {/* Status badge */}
      <div className="hero-status flex items-center gap-2 mb-6 opacity-0">
        <span className="w-2 h-2 rounded-full bg-[#D4A843]" style={{ animation: 'glow-pulse 2s ease-in-out infinite' }} />
        <span className="text-sm text-[#A3A3A3] tracking-wide">
          {t('En alternance — Carrier Culoz SA', 'Apprenticeship — Carrier Culoz SA')}
        </span>
      </div>

      {/* Name — massive typography */}
      <div ref={nameRef} className="mb-4">
        <h1 className="font-bold leading-[1.05] tracking-[-0.03em]" style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}>
          <span className="text-[#F5F5F5]">{splitName('Alexis')}</span>
          <br />
          <span className="text-[#F5F5F5]">{splitName('Serano')}</span>
          <span className="hero-dot text-gradient-gold inline-block opacity-0">.</span>
        </h1>
      </div>

      {/* Typewriter */}
      <div className="mb-4 h-8 flex items-center">
        <span ref={typewriterRef} className="text-[#A3A3A3] text-lg font-mono" />
        <span ref={cursorRef} className="inline-block w-[2px] h-5 bg-[#D4A843] ml-1" />
      </div>

      {/* Bio */}
      <p className="hero-bio text-[#6B6B6B] text-base max-w-xl mb-8 opacity-0">
        {t(
          'Architecture logicielle · Infrastructure · Trading algorithmique',
          'Software Architecture · Infrastructure · Algorithmic Trading'
        )}
      </p>

      {/* Actions */}
      <div className="hero-actions flex flex-wrap items-center gap-4 opacity-0">
        <MagneticButton
          href="#projects"
          className="px-6 py-3 rounded-full bg-[#D4A843] text-[#050505] font-semibold text-sm hover:shadow-[0_0_30px_rgba(212,168,67,0.3)] transition-all"
        >
          {t('Explorer mes projets', 'Explore my projects')}
        </MagneticButton>

        <MagneticButton
          href="/images/Alexis_serano.pdf"
          target="_blank"
          className="px-6 py-3 rounded-full border border-[rgba(255,255,255,0.12)] text-[#A3A3A3] text-sm font-medium hover:border-[#D4A843] hover:text-[#D4A843] transition-all"
        >
          {t('Consulter mon CV', 'View my Resume')}
        </MagneticButton>

        <div className="flex items-center gap-2">
          <button
            onClick={copyEmail}
            className="w-10 h-10 rounded-full border border-[rgba(255,255,255,0.06)] flex items-center justify-center text-[#6B6B6B] hover:text-[#D4A843] hover:border-[rgba(212,168,67,0.3)] transition-all"
            title={t('Copier email', 'Copy email')}
          >
            <Copy className="w-4 h-4" />
          </button>
          <a
            href="https://github.com/AlexisSerano"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full border border-[rgba(255,255,255,0.06)] flex items-center justify-center text-[#6B6B6B] hover:text-[#D4A843] hover:border-[rgba(212,168,67,0.3)] transition-all"
            title="GitHub"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href="mailto:alexis.seranoo@gmail.com"
            className="w-10 h-10 rounded-full border border-[rgba(255,255,255,0.06)] flex items-center justify-center text-[#6B6B6B] hover:text-[#D4A843] hover:border-[rgba(212,168,67,0.3)] transition-all"
            title="Email"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0">
        <span className="text-[#404040] text-[0.65rem] uppercase tracking-[0.3em]">scroll</span>
        <div className="w-[1px] h-10 bg-[rgba(255,255,255,0.06)] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full bg-[#D4A843]" 
            style={{ animation: 'scrollLine 2s ease-in-out infinite', height: '100%', transformOrigin: 'top' }} />
        </div>
      </div>

      <style jsx>{`
        @keyframes scrollLine {
          0% { transform: scaleY(0); transform-origin: top; }
          50% { transform: scaleY(1); transform-origin: top; }
          51% { transform: scaleY(1); transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; }
        }
      `}</style>
    </section>
  )
}
