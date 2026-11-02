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
  <span class="text-[#D4A843]">about</span>       : ${t('Présentation & Bachelor 180 ECTS', 'Profile & Bachelor 180 ECTS')}
  <span class="text-[#D4A843]">carrier</span>     : ${t('Développeur Logiciel R&D @ Carrier', 'R&D Software Developer @ Carrier')}
  <span class="text-[#D4A843]">chai</span>        : ${t('Stage Déploiement & Automatisation @ DSI CHAI', 'Deployment & Automation Intern @ CHAI Hospital')}
  <span class="text-[#D4A843]">suisse</span>      : ${t('Mobilité Genève & Vaud (Juillet 2027)', 'Geneva & Vaud Mobility (July 2027)')}
  <span class="text-[#D4A843]">skills</span>      : ${t('Stack technologique complète', 'Full tech stack')}
  <span class="text-[#D4A843]">projects</span>    : ${t('Liste des projets', 'Project list')}
  <span class="text-[#D4A843]">algofy</span>      : ${t('Détails Algofy', 'Algofy details')}
  <span class="text-[#D4A843]">lifeos</span>      : ${t('Détails LifeOS', 'LifeOS details')}
  <span class="text-[#D4A843]">contact</span>     : ${t('Coordonnées', 'Contact info')}
  <span class="text-[#D4A843]">hire</span>        : ???
  <span class="text-[#D4A843]">clear</span>       : ${t('Efface l\'écran', 'Clear screen')}`,
    about: `<span class="text-emerald-400">Alexis Serano — Développeur Logiciel (Bachelor 180 ECTS)</span>
  - ${t('Développeur Logiciel R&D chez', 'R&D Software Developer at')} <span class="text-[#D4A843]">Carrier</span> (NYSE: CARR, 47 000 employés)
  - ${t('B.U.T. Informatique (Grade de Bachelor - 180 ECTS) — Université Grenoble Alpes', 'Bachelor in Computer Science (180 ECTS) — UGA Grenoble')}
  - ${t('Mobilité', 'Mobility')} : Cantons de Genève & Vaud (${t('Disponible dès juillet 2027', 'Available July 2027')}) | Permis B
  - ${t('Spécialités : Full-Stack, Backend, APIs, Web Embarqué & Cybersécurité (CRA)', 'Specialties: Full-Stack, Backend, APIs, Embedded Web & Cybersecurity (CRA)')}`,
    carrier: `<span class="text-emerald-400">[Carrier — Culoz, FR] — ${t('Développeur Logiciel R&D', 'R&D Software Developer')} (Août 2026 – Juil. 2027)</span>
  → ${t('Interfaces web de commissioning (HTML, Tailwind CSS, Alpine.js, API REST)', 'Web commissioning interfaces (HTML, Tailwind CSS, Alpine.js, REST API)')}
  → ${t('Conformité Cyber Resilience Act (CRA - échéance déc. 2027)', 'Cyber Resilience Act (CRA - Dec 2027) compliance')}
  → ${t('Authentification OTP sur 3 familles d\'automates (4M de régulateurs/an)', 'OTP authentication across 3 PLC families (4M controllers/year)')}
  → ${t('Migration C-Suite → Carel STone & formation Git/GitHub (5 développeurs)', 'C-Suite → Carel STone migration & Git/GitHub training (5 developers)')}`,
    chai: `<span class="text-emerald-400">[CH Alpes-Isère] — ${t('Stage Déploiement & Automatisation (Mai – Juin 2026)', 'Deployment & Automation Intern (May – June 2026)')}</span>
  → ${t('Automatisation PowerShell Active Directory (1 800 professionnels)', 'PowerShell Active Directory automation (1,800 professionals)')}
  → ${t('Optimisation Exchange (Hashtables O(1), désactivation Automapping Outlook)', 'Exchange optimization (O(1) Hashtables, Outlook Automapping disabled)')}
  → ${t('Refonte portail intranet regroupant 23 applications métiers + guide RH', 'Intranet portal redesign grouping 23 business apps + HR guide')}
  → ${t('Cluster Kubernetes (K3s) à 2 nœuds + Nginx Load Balancer + Docker Compose', '2-node Kubernetes (K3s) cluster + Nginx Load Balancer + Docker Compose')}`,
    suisse: `<span class="text-emerald-400">[Mobilité Suisse Romande — Disponible dès Juillet 2027]</span>
  - ${t('Zones cibles', 'Target areas')} : <span class="text-[#D4A843]">Cantons de Genève & Vaud</span>
  - ${t('Diplôme', 'Degree')} : B.U.T. Informatique — Grade de Bachelor (180 ECTS)
  - ${t('Profil', 'Profile')} : Développeur Logiciel Full-Stack, Backend & R&D`,
    skills: `<span class="text-[#D4A843]">Stack Technique :</span>
  - Web & API  : React, Next.js, TypeScript, Tailwind CSS, Alpine.js, Node.js, Symfony, REST
  - Backend    : Python (Django, FastAPI), C#, Java, C/C++, PHP
  - Systèmes   : Docker, Kubernetes (K3s), Nginx, Linux, PowerShell, Active Directory, Exchange
  - R&D & Sec  : Carel STone, Langage ST (IEC 61131-3), Cyber Resilience Act (CRA), Auth OTP
  - Data       : PostgreSQL, MySQL, SQLite`,
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
    lifeos: `<span class="text-emerald-400">[LifeOS] — ${t('Dashboard Personnel', 'Personal Dashboard')}</span>
  <span class="text-[#D4A843]">Stack :</span> FastAPI • React/TypeScript • PostgreSQL • Docker
  → +30 modules (Journal, Nutrition, ${t('Santé', 'Health')}, Finances...)
  → ${t('Parseur CSV multi-exchanges', 'Multi-exchange CSV parser')}
  → ${t('Suivi de portefeuille & routines', 'Portfolio & routine tracking')}
  → ${t('Déploiement Docker Compose', 'Docker Compose deployment')}`,
    contact: `<span class="text-emerald-400">${t('Contact & Liens', 'Contact & Links')} :</span>
  - Email  : <a href="mailto:alexis.seranoo@gmail.com" class="text-[#4A9ECA] hover:underline">alexis.seranoo@gmail.com</a>
  - GitHub : <a href="https://github.com/AlexisSerano" target="_blank" class="text-[#4A9ECA] hover:underline">github.com/AlexisSerano</a>
  - Status : ${t('En alternance chez Carrier Culoz SA', 'Apprenticeship at Carrier Culoz SA')}`,
    hire: `<span class="text-[#D4A843]">[SECRET] ${t('Bien joué, vous avez trouvé la commande secrète !', 'Nice, you found the secret command!')}</span>

  ${t('À la recherche d\'un profil motivé pour une opportunité ou un projet ?', 'Looking for a motivated dev for an opportunity or a project?')}
  
  Email: <a href="mailto:alexis.seranoo@gmail.com" class="text-[#4A9ECA] hover:underline">alexis.seranoo@gmail.com</a>
  ${t('Je réponds généralement en moins de 24h.', 'I usually reply within 24 hours.')}`,
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

  const quickCmds = ['about', 'carrier', 'chai', 'suisse', 'skills', 'projects', 'algofy', 'lifeos', 'contact', 'hire', 'clear']

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
