'use client'
import { useState, useEffect, useRef } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { assetPath } from '@/lib/asset'
import { Search, FileText, Mail, Terminal, FolderGit2, Compass, Check } from 'lucide-react'

export default function CommandPalette() {
  const { lang, toggleLang, t } = useLanguage()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [copied, setCopied] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen(prev => !prev)
      } else if (e.key === 'Escape') {
        setOpen(false)
      }
    }
    const onCustomOpen = () => setOpen(true)

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('portfolio-open-cmdk', onCustomOpen)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('portfolio-open-cmdk', onCustomOpen)
    }
  }, [])

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50)
    } else {
      setQuery('')
    }
  }, [open])

  const scrollTo = (id: string) => {
    setOpen(false)
    const el = document.getElementById(id)
    if (el) {
      if (window.portfolioLenis) {
        window.portfolioLenis.scrollTo(el, { duration: 1.1 })
      } else {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  const openProject = (slug: string) => {
    setOpen(false)
    scrollTo('projects')
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('portfolio-open-project', { detail: { slug } }))
    }, 350)
  }

  const actions = [
    {
      id: 'cv',
      label: t('Ouvrir le CV (PDF — Genève / Vaud 2027)', 'Open Resume / CV (PDF)'),
      category: t('Actions Rapides', 'Quick Actions'),
      icon: FileText,
      run: () => {
        window.open(assetPath('/images/Alexis_serano.pdf'), '_blank')
        setOpen(false)
      },
    },
    {
      id: 'email',
      label: copied ? t('Email copié dans le presse-papiers !', 'Email copied!') : t('Copier alexis.seranoo@gmail.com', 'Copy alexis.seranoo@gmail.com'),
      category: t('Actions Rapides', 'Quick Actions'),
      icon: copied ? Check : Mail,
      run: () => {
        navigator.clipboard.writeText('alexis.seranoo@gmail.com')
        setCopied(true)
        setTimeout(() => {
          setCopied(false)
          setOpen(false)
        }, 900)
      },
    },
    {
      id: 'proj-carrier',
      label: t('Projet : Carrier R&D (OTP 4M/an, CRA, Carel STone, Commissioning)', 'Project: Carrier R&D (OTP, CRA, Carel STone, Commissioning)'),
      category: t('Projets Clés', 'Key Projects'),
      icon: FolderGit2,
      run: () => openProject('alternance-carrier'),
    },
    {
      id: 'proj-chai',
      label: t('Projet : DSI CH Alpes-Isère (K3s, AD 1 800 pros, 23 apps)', 'Project: CHAI Hospital (K3s, AD 1,800 pros, 23 apps)'),
      category: t('Projets Clés', 'Key Projects'),
      icon: FolderGit2,
      run: () => openProject('stage-chai'),
    },
    {
      id: 'proj-algofy',
      label: t('Projet : Algofy (SaaS Trading Algorithmique 24/7)', 'Project: Algofy (Algorithmic Trading SaaS)'),
      category: t('Projets Clés', 'Key Projects'),
      icon: FolderGit2,
      run: () => openProject('algofy'),
    },
    {
      id: 'proj-lifeos',
      label: t('Projet : LifeOS (FastAPI, React, TypeScript, PostgreSQL, Docker)', 'Project: LifeOS (FastAPI, React, TypeScript, PostgreSQL, Docker)'),
      category: t('Projets Clés', 'Key Projects'),
      icon: FolderGit2,
      run: () => openProject('lifeos'),
    },
    {
      id: 'nav-about',
      label: t('Aller à : À propos & Mobilité Suisse', 'Go to: About & Swiss Mobility'),
      category: 'Navigation',
      icon: Compass,
      run: () => scrollTo('about'),
    },
    {
      id: 'nav-experience',
      label: t('Aller à : Expériences & Formation (180 ECTS)', 'Go to: Experience & Education (180 ECTS)'),
      category: 'Navigation',
      icon: Compass,
      run: () => scrollTo('experience'),
    },
    {
      id: 'nav-terminal',
      label: t('Aller à : Terminal Interactif', 'Go to: Interactive Terminal'),
      category: 'Navigation',
      icon: Terminal,
      run: () => scrollTo('terminal'),
    },
    {
      id: 'lang',
      label: lang === 'fr' ? 'Switch language to English' : 'Passer le site en Français',
      category: 'Préférences',
      icon: Compass,
      run: () => {
        toggleLang()
        setOpen(false)
      },
    },
  ]

  const filtered = actions.filter(a =>
    a.label.toLowerCase().includes(query.toLowerCase()) ||
    a.category.toLowerCase().includes(query.toLowerCase())
  )

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[90] bg-black/75 backdrop-blur-md flex items-start justify-center pt-24 px-4"
      onClick={() => setOpen(false)}
    >
      <div
        className="w-full max-w-xl rounded-2xl bg-[#090C12] border border-[#D4A843]/35 shadow-[0_25px_80px_rgba(0,0,0,0.85)] overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/[0.08]">
          <Search className="w-4 h-4 text-[#D4A843]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={t('Rechercher un projet, une section ou une action...', 'Search projects, sections or actions...')}
            className="flex-1 bg-transparent text-sm text-[#F8FAFC] placeholder-[#64748B] outline-none font-mono"
          />
          <kbd className="text-[10px] font-mono text-[#64748B] bg-white/[0.05] px-2 py-0.5 rounded border border-white/10">
            ESC
          </kbd>
        </div>

        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <p className="text-xs text-[#64748B] font-mono text-center py-6">
              {t('Aucun résultat trouvé.', 'No results found.')}
            </p>
          ) : (
            filtered.map(item => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={item.run}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left hover:bg-[#D4A843]/12 text-[#CBD5E1] hover:text-[#F5D785] transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Icon className="w-4 h-4 text-[#D4A843] shrink-0" />
                    <span className="text-xs font-medium truncate">{item.label}</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#64748B] group-hover:text-[#D4A843] ml-3 shrink-0">
                    {item.category}
                  </span>
                </button>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
