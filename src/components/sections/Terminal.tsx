'use client'
import { useState, useRef, useEffect, type KeyboardEvent } from 'react'
import { useLanguage } from '@/context/LanguageContext'

function escapeHtml(text: string) {
  return text.replace(/[&<>"']/g, (m) => {
    const map: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }
    return map[m] || m
  })
}

interface TerminalLine {
  type: 'input' | 'output'
  content: string
}

export default function Terminal() {
  const { t } = useLanguage()
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: 'output', content: `${t('Bienvenue sur le terminal interactif.', 'Welcome to the interactive terminal.')}\n${t('Tapez', 'Type')} <span class="text-[#D4A843]">help</span> ${t('pour afficher les commandes.', 'to display available commands.')}` },
  ])
  const [inputValue, setInputValue] = useState('')
  const bodyRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const commands: Record<string, string> = {
    help: `${t('Commandes disponibles', 'Available commands')} :
  <span class="text-[#D4A843]">about</span>       : ${t('Présentation', 'About me')}
  <span class="text-[#D4A843]">carrier</span>     : ${t('Alternance chez Carrier Culoz SA', 'Apprenticeship at Carrier Culoz SA')}
  <span class="text-[#D4A843]">skills</span>      : ${t('Stack technologique', 'Tech stack')}
  <span class="text-[#D4A843]">projects</span>    : ${t('Liste des projets', 'Project list')}
  <span class="text-[#D4A843]">algofy</span>      : ${t('Détails Algofy', 'Algofy details')}
  <span class="text-[#D4A843]">lifeos</span>      : ${t('Détails LifeOS', 'LifeOS details')}
  <span class="text-[#D4A843]">contact</span>     : ${t('Coordonnées', 'Contact info')}
  <span class="text-[#D4A843]">hire</span>        : ???
  <span class="text-[#D4A843]">clear</span>       : ${t('Efface l\'écran', 'Clear screen')}`,
    about: `<span class="text-emerald-400">Alexis Serano</span>
  - ${t('En alternance chez', 'Apprenticeship at')} <span class="text-[#D4A843]">Carrier Culoz SA</span> (${t('Programmation embarquée', 'Embedded programming')})
  - ${t('Étudiant en 3ème année de BUT Informatique à l\'IUT2 de Grenoble', '3rd year CS student at IUT2 Grenoble')}
  - ${t('Localisation', 'Location')} : Culoz (01) & Grenoble (38) | ${t('Permis B', 'Driver\'s License')}
  - ${t('Passionné par le dev applicatif, l\'embarqué, le DevOps et l\'IA', 'Passionate about software dev, embedded systems, DevOps and AI')}`,
    carrier: `<span class="text-emerald-400">[Carrier Culoz SA] — ${t('Alternance Développeur Embarqué', 'Embedded Developer Apprenticeship')}</span>
  <span class="text-[#D4A843]">${t('Période', 'Period')} :</span> 31/08/2026 → 02/07/2027
  <span class="text-[#D4A843]">${t('Missions', 'Missions')} :</span>
  → ${t('Programmation embarquée sur automates (HVAC)', 'Embedded PLC programming (HVAC)')}
  → ${t('Migration logicielle Carrel → STone', 'Software migration Carrel → STone')}
  → ${t('Langage Structured Text (IEC 61131-3)', 'Structured Text language (IEC 61131-3)')}`,
    skills: `<span class="text-[#D4A843]">Stack Technique :</span>
  - Embedded : Langage ST, Automates, C/C++
  - Web      : React, Next.js, TypeScript, PHP, Symfony, Node.js
  - Software : Java, JavaFX, C#, .NET, Python, FastAPI, Django
  - DevOps   : Docker, Kubernetes, PowerShell, Nginx, Linux
  - Data     : PostgreSQL, MySQL, MariaDB, SQLite, Redis
  - Creative : Adobe Premiere Pro, After Effects, Photoshop`,
    projects: `<span class="text-[#D4A843]">${t('Projets Clés', 'Key Projects')} :</span>
  0. <span class="text-emerald-400">❯</span> Carrier Culoz SA (Automates, Langage ST)
  1. <span class="text-emerald-400">❯</span> Stage DSI CHAI (PowerShell, K8s)
  2. <span class="text-emerald-400">❯</span> Algofy (SaaS Trading — Django/React/Docker)
  3. <span class="text-emerald-400">❯</span> LifeOS (Second Brain — FastAPI/React)
  4. Chronia (PHP/SQL — ${t('aide à la personne', 'assisted living app')})
  5. ${t('Agence Voyages', 'Travel Agency')} (JavaFX)
  6. Chatenger (PHP/MySQL — Lycée NSI 2023)
  7. ${t('Modèle Neurone', 'Neural Model')} (TensorFlow/Python)
  ${t('→ Tapez le nom d\'un projet pour plus de détails.', '→ Type a project name for details.')}`,
    algofy: `<span class="text-emerald-400">[Algofy] — ${t('Plateforme SaaS de Trading Algorithmique', 'Algorithmic Trading SaaS Platform')}</span>
  <span class="text-[#D4A843]">Stack :</span> Django REST • React/Vite • Docker • PostgreSQL • Hyperliquid API
  → ${t('Bots de trading 24/7 via systemctl', '24/7 trading bots via systemctl')}
  → ${t('Chiffrement AES-256/Fernet', 'AES-256/Fernet encryption')}
  → ${t('Monétisation Stripe + Affiliation Connect', 'Stripe monetization + Connect affiliates')}
  → ${t('Alertes temps réel via Bot Telegram', 'Real-time alerts via Telegram Bot')}`,
    lifeos: `<span class="text-emerald-400">[LifeOS] — ${t('Operating System Personnel', 'Personal Operating System')}</span>
  <span class="text-[#D4A843]">Stack :</span> FastAPI • React/TypeScript • PostgreSQL • Redis • Celery • Docker
  → +30 modules (Journal, Nutrition, ${t('Santé', 'Health')}, Finances...)
  → ${t('Parseur CSV multi-exchanges', 'Multi-exchange CSV parser')}
  → ${t('Bots de trading autonomes', 'Autonomous trading bots')}
  → ${t('Architecture Docker Compose', 'Docker Compose architecture')}`,
    contact: `<span class="text-emerald-400">${t('Contact & Liens', 'Contact & Links')} :</span>
  - Email  : <a href="mailto:alexis.seranoo@gmail.com" class="text-[#4A9ECA] hover:underline">alexis.seranoo@gmail.com</a>
  - GitHub : <a href="https://github.com/AlexisSerano" target="_blank" class="text-[#4A9ECA] hover:underline">github.com/AlexisSerano</a>
  - Status : ${t('En alternance chez Carrier Culoz SA', 'Apprenticeship at Carrier Culoz SA')}`,
    hire: `<span class="text-[#D4A843]">[SECRET] ${t('Vous avez trouvé la commande secrète !', 'You found the secret command!')}</span>

  ${t('Si vous êtes recruteur, vous savez déjà que je suis le bon candidat.', 'If you\'re a recruiter, you already know I\'m the right fit.')}
  
  Email: <a href="mailto:alexis.seranoo@gmail.com" class="text-[#4A9ECA] hover:underline">alexis.seranoo@gmail.com</a>
  ${t('Construisons quelque chose de grand ensemble.', 'Let\'s build something great together.')}`,
    whoami: 'visitor@portfolio: guest [privileges: read-only]',
    sudo: `<span class="text-[#D4A843]">${t('Permission refusée : Alexis est le seul administrateur ici !', 'Permission denied: Alexis is the only root admin here!')}</span>`,
  }

  const executeCommand = (cmd: string) => {
    const cleanCmd = cmd.trim().toLowerCase()
    
    if (cleanCmd === 'clear') {
      setLines([])
      return
    }

    const newLines: TerminalLine[] = [
      { type: 'input', content: escapeHtml(cmd) },
    ]

    if (commands[cleanCmd]) {
      newLines.push({ type: 'output', content: commands[cleanCmd] })
    } else if (cleanCmd) {
      newLines.push({ type: 'output', content: `${t('Commande non reconnue', 'Unknown command')} : "${escapeHtml(cleanCmd)}". ${t('Tapez', 'Type')} <span class="text-[#D4A843]">help</span>.` })
    }

    setLines(prev => [...prev, ...newLines])
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(inputValue)
      setInputValue('')
    }
  }

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight
    }
  }, [lines])

  const quickCmds = ['about', 'carrier', 'skills', 'projects', 'algofy', 'lifeos', 'contact', 'hire', 'clear']

  return (
    <section id="terminal" className="py-24 px-6 max-w-3xl mx-auto">
      <div className="glass rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-[rgba(255,255,255,0.06)] bg-[rgba(0,0,0,0.3)]">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <span className="text-xs text-[#6B6B6B] font-mono flex-1 text-center">
            alexis@portfolio: ~/interactive-shell
          </span>
        </div>

        {/* Body */}
        <div ref={bodyRef} className="p-4 max-h-[400px] overflow-y-auto font-mono text-sm space-y-2">
          {lines.map((line, i) => (
            <div key={i}>
              {line.type === 'input' ? (
                <div>
                  <span className="text-[#D4A843]">alexis@portfolio:~$</span>{' '}
                  <span className="text-[#F5F5F5]" dangerouslySetInnerHTML={{ __html: line.content }} />
                </div>
              ) : (
                <div className="text-[#A3A3A3] whitespace-pre-wrap leading-relaxed" 
                  dangerouslySetInnerHTML={{ __html: line.content }} />
              )}
            </div>
          ))}

          {/* Input line */}
          <div className="flex items-center gap-2">
            <span className="text-[#D4A843] shrink-0">alexis@portfolio:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-[#F5F5F5] outline-none caret-[#D4A843]"
              placeholder={t('Tapez une commande...', 'Type a command...')}
              autoComplete="off"
              spellCheck={false}
            />
          </div>
        </div>

        {/* Quick commands */}
        <div className="px-4 py-3 border-t border-[rgba(255,255,255,0.06)] flex flex-wrap gap-2">
          <span className="text-[0.65rem] text-[#404040] mr-1 self-center">{t('Rapide:', 'Quick:')}</span>
          {quickCmds.map(cmd => (
            <button
              key={cmd}
              onClick={() => executeCommand(cmd)}
              className="text-[0.65rem] font-mono text-[#A3A3A3] bg-white/5 hover:bg-[rgba(212,168,67,0.1)] hover:text-[#D4A843] px-2 py-1 rounded-md transition-colors"
            >
              {cmd}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
