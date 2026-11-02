'use client'
import { Activity, ShieldCheck, Terminal, Cpu, Server, LineChart, CheckCircle2 } from 'lucide-react'
import Image from 'next/image'
import { assetPath } from '@/lib/asset'

interface ProjectMockupProps {
  slug: string
  title: string
  imageSrc?: string
  className?: string
}

function ProjectImagePlaceholder({ title, className = '' }: Pick<ProjectMockupProps, 'title' | 'className'>) {
  return (
    <div
      aria-hidden="true"
      className={`relative h-full w-full overflow-hidden border border-white/[0.06] bg-[#080B11] ${className}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(212,168,67,0.16),transparent_52%)]" />
      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:32px_32px]" />
      <div className="absolute left-1/2 top-[44%] aspect-square w-36 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#D4A843]/15 shadow-[0_0_80px_rgba(212,168,67,0.08)] sm:w-48">
        <div className="absolute inset-3 rounded-full border border-dashed border-[#D4A843]/20 motion-safe:animate-[spin_36s_linear_infinite]" />
        <div className="absolute inset-8 rounded-full border border-white/[0.08]" />
        <div className="absolute inset-[38%] rounded-full bg-gradient-to-br from-[#F5D785]/70 to-[#A3845B]/20 shadow-[0_0_35px_rgba(212,168,67,0.32)]" />
      </div>
      <div className="absolute bottom-[27%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4A843]/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#080B11] via-[#080B11]/90 to-transparent p-4 pt-10 sm:p-6 sm:pt-12">
        <h4 className="truncate text-sm font-semibold text-[#F8FAFC]">{title}</h4>
        <p className="mt-1 text-xs font-mono text-[#64748B]">Application logicielle</p>
      </div>
    </div>
  )
}

export default function ProjectMockup({ slug, title, imageSrc, className = '' }: ProjectMockupProps) {
  const isCarrier = slug === 'alternance-carrier'
  const isStageCHAI = slug === 'stage-chai'
  const isAlgofy = slug === 'algofy'
  const isLifeOS = slug === 'lifeos'
  const isChatenger = slug === 'chatenger'
  const isChronia = slug === 'chronia'
  const isAgenceJavaFX = slug === 'agence-voyages-javafx'
  const isRefonteMobile = slug === 'refonte-mobile-web'
  const isModeleNeurone = slug === 'modele-neurone'
  const isTrading = slug === 'trading-investissement'
  const isMontageVideo = slug === 'montage-video'

  // Algofy: Trading SaaS Platform UI Mockup
  if (isAlgofy) {
    return (
      <div className={`relative w-full h-full bg-[#080B11] text-[#CBD5E1] font-mono text-[11px] select-none overflow-hidden flex flex-col ${className}`}>
        {/* Browser Topbar */}
        <div className="h-7 bg-[#0E131F] border-b border-white/[0.08] px-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]/80" />
            <span className="ml-2 text-[10px] text-[#64748B] flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              https://app.algofy.trade/terminal/hyperliquid
            </span>
          </div>
          <div className="flex items-center gap-2 text-[10px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400">HL DEX: 8ms</span>
          </div>
        </div>

        {/* Dashboard Body */}
        <div className="flex-1 p-3 grid grid-cols-12 gap-2 overflow-hidden">
          {/* Left panel: Stats & Chart */}
          <div className="col-span-8 flex flex-col gap-2">
            <div className="flex items-center justify-between bg-white/[0.02] border border-white/[0.06] p-2 rounded">
              <div>
                <span className="text-[#64748B] text-[9px] block uppercase">BTC / USD PERP</span>
                <span className="text-sm font-bold text-white tracking-wide">$96,480.50</span>
              </div>
              <div className="text-right">
                <span className="text-[#64748B] text-[9px] block uppercase">ALGO STATE</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <Activity className="w-3 h-3" /> LONG 3X (Active)
                </span>
              </div>
              <div className="text-right">
                <span className="text-[#64748B] text-[9px] block uppercase">24H PNL</span>
                <span className="text-emerald-400 font-bold">+18.4% (+$4,290)</span>
              </div>
            </div>

            {/* Candlestick & Chart lines preview */}
            <div className="flex-1 bg-white/[0.015] border border-white/[0.06] rounded p-2 relative flex flex-col justify-end">
              <div className="absolute top-2 left-2 text-[9px] text-[#D4A843] flex items-center gap-1.5">
                <LineChart className="w-3 h-3" />
                <span>FERNET-AES256 ENGINE // AUTO-EXECUTION</span>
              </div>
              {/* Simulated chart bars */}
              <div className="h-28 flex items-end gap-1.5 px-2">
                {[40, 55, 48, 62, 70, 65, 82, 78, 92, 88, 105, 118, 112, 130, 142, 138, 155].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                    <div className="w-[1px] bg-[#D4A843]/40 h-2" />
                    <div
                      className={`w-full rounded-sm ${i % 3 === 0 ? 'bg-rose-500/80' : 'bg-emerald-500/80'}`}
                      style={{ height: `${Math.min(h, 90)}%` }}
                    />
                    <div className="w-[1px] bg-[#D4A843]/40 h-1.5" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right panel: Systemd daemons & Telegram logs */}
          <div className="col-span-4 flex flex-col gap-2">
            <div className="bg-white/[0.02] border border-white/[0.06] p-2 rounded">
              <span className="text-[9px] text-[#64748B] uppercase block mb-1">DAEMONS STATUS</span>
              <div className="space-y-1 text-[10px]">
                <div className="flex justify-between text-emerald-400">
                  <span>bot-hyperliquid.service</span>
                  <span>RUNNING</span>
                </div>
                <div className="flex justify-between text-[#94A3B8]">
                  <span>telegram-webhook.service</span>
                  <span className="text-emerald-400">ACTIVE</span>
                </div>
                <div className="flex justify-between text-[#94A3B8]">
                  <span>stripe-connect.worker</span>
                  <span className="text-emerald-400">SYNC</span>
                </div>
              </div>
            </div>

            <div className="flex-1 bg-black/50 border border-white/[0.06] p-2 rounded flex flex-col justify-between">
              <div className="text-[9px] text-[#D4A843] mb-1 flex items-center gap-1">
                <Terminal className="w-2.5 h-2.5" />
                <span>TELEGRAM LIVE STREAM</span>
              </div>
              <div className="space-y-1 text-[9px] text-[#94A3B8]">
                <p className="text-emerald-400/90">&gt; [TG BOT] Order #891 Filled</p>
                <p>&gt; Target 1 hit: +4.2%</p>
                <p className="text-amber-400/90">&gt; Trailing SL moved to BE</p>
                <p>&gt; Margin check: 100% OK</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Carrier R&D: Web Commissioning (Alpine.js / REST), OTP Security (4M units/yr, CRA) & Carel STone
  if (isCarrier) {
    return (
      <div className={`relative w-full h-full bg-[#060911] text-[#CBD5E1] font-mono text-[11px] select-none overflow-hidden flex flex-col ${className}`}>
        <div className="h-7 bg-[#0B101C] border-b border-white/[0.08] px-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-[10px]">
            <Cpu className="w-3.5 h-3.5 text-[#D4A843]" />
            <span className="font-bold text-[#F8FAFC]">CARRIER R&amp;D // COMMISSIONING &amp; CAREL STone</span>
          </div>
          <span className="text-[9px] bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded">
            CRA READY · OTP 4M/YR
          </span>
        </div>

        <div className="flex-1 p-3 grid grid-cols-12 gap-2">
          {/* Left: Web Commissioning & OTP Auth */}
          <div className="col-span-6 flex flex-col gap-2">
            <div className="bg-white/[0.02] border border-white/[0.06] p-2.5 rounded">
              <span className="text-[9px] text-[#64748B] uppercase block mb-1.5">WEB COMMISSIONING (ALPINE.JS / REST)</span>
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="p-2 rounded bg-black/40 border border-white/5">
                  <span className="text-[9px] text-[#94A3B8] block">FAMILLES AUTOMATES</span>
                  <span className="text-xs font-bold text-[#D4A843]">Micro PC3 · Aero</span>
                  <span className="text-[8px] text-emerald-400 block mt-0.5">3 Familles Sécurisées</span>
                </div>
                <div className="p-2 rounded bg-black/40 border border-white/5">
                  <span className="text-[9px] text-[#94A3B8] block">AUTHENTIFICATION</span>
                  <span className="text-xs font-bold text-white">OTP Dynamique</span>
                  <span className="text-[8px] text-emerald-400 block mt-0.5">4M Régulateurs/an</span>
                </div>
              </div>
            </div>

            <div className="bg-white/[0.02] border border-white/[0.06] p-2 rounded flex-1">
              <span className="text-[9px] text-[#64748B] uppercase block mb-1">CYBER RESILIENCE ACT (CRA) &amp; STone</span>
              <div className="space-y-1 text-[9px]">
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="w-3 h-3 shrink-0" />
                  <span>Remplacement PIN 4 chiffres → OTP API/Console</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="w-3 h-3 shrink-0" />
                  <span>Migration C-Suite → Carel STone (IEC 61131-3)</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="w-3 h-3 shrink-0" />
                  <span>Formation Git / GitHub (5 développeurs R&amp;D)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Code editor Langage ST & REST API preview */}
          <div className="col-span-6 bg-black/60 border border-white/[0.08] p-2.5 rounded flex flex-col justify-between">
            <div className="flex items-center justify-between text-[9px] text-[#64748B] border-b border-white/5 pb-1 mb-1.5">
              <span>CRA_Auth_STone.st</span>
              <span className="text-[#D4A843]">Carel STone · ST</span>
            </div>
            <pre className="text-[9px] text-[#94A3B8] leading-relaxed overflow-hidden font-mono">
              <span className="text-rose-400">IF</span> FB_VerifyOTP(Token := sApiOtpToken) <span className="text-rose-400">THEN</span>{'\n'}
              {'  '}<span className="text-[#D4A843]">bCommissioningAuth</span> := <span className="text-amber-400">TRUE</span>;{'\n'}
              {'  '}rOutPID := FB_HVAC_Loop(rSetPoint, rTemp);{'\n'}
              <span className="text-rose-400">ELSE</span>{'\n'}
              {'  '}bCommissioningAuth := <span className="text-amber-400">FALSE</span>;{'\n'}
              {'  '}HttpStatus := 401; <span className="text-[#64748B]">// CRA Guard</span>{'\n'}
              <span className="text-rose-400">END_IF;</span>
            </pre>
            <div className="text-[8px] text-emerald-400/90 pt-1 border-t border-white/5">
              ✓ Conformité CRA (Déc. 2027) · API REST &amp; STone OK
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Stage DSI CHAI: K3s High-Availability, AD/Exchange Optimization & Intranet 23 Apps
  if (isStageCHAI) {
    return (
      <div className={`relative w-full h-full bg-[#080C14] text-[#CBD5E1] font-mono text-[11px] select-none overflow-hidden flex flex-col ${className}`}>
        <div className="h-7 bg-[#0F172A] border-b border-white/[0.08] px-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-[10px]">
            <Server className="w-3.5 h-3.5 text-sky-400" />
            <span className="font-bold text-[#F8FAFC]">DSI CH ALPES-ISÈRE // K3s HA &amp; AUTOMATION</span>
          </div>
          <span className="text-[9px] bg-sky-950/60 text-sky-400 border border-sky-500/30 px-2 py-0.5 rounded">
            1 800 PROS · 23 APPS
          </span>
        </div>

        <div className="flex-1 p-3 grid grid-cols-12 gap-2">
          {/* Top Row: K3s, AD/Exchange & Intranet */}
          <div className="col-span-12 grid grid-cols-3 gap-2">
            <div className="p-2 rounded bg-white/[0.02] border border-white/[0.06]">
              <span className="text-[9px] text-[#64748B] block">KUBERNETES (K3s)</span>
              <span className="text-xs font-bold text-white">2 Nœuds · Nginx LB</span>
              <span className="text-[8px] text-emerald-400 block">Docker Compose</span>
            </div>
            <div className="p-2 rounded bg-white/[0.02] border border-white/[0.06]">
              <span className="text-[9px] text-[#64748B] block">AD &amp; EXCHANGE</span>
              <span className="text-xs font-bold text-[#D4A843]">1 800 Professionnels</span>
              <span className="text-[8px] text-sky-400 block">Hashtables · Automap Off</span>
            </div>
            <div className="p-2 rounded bg-white/[0.02] border border-white/[0.06]">
              <span className="text-[9px] text-[#64748B] block">PORTAIL INTRANET</span>
              <span className="text-xs font-bold text-emerald-400">23 Apps Métiers</span>
              <span className="text-[8px] text-[#94A3B8] block">Astra · ACF · CPT UI</span>
            </div>
          </div>

          {/* PowerShell Automation Console */}
          <div className="col-span-12 flex-1 bg-black/60 border border-white/[0.08] p-2.5 rounded flex flex-col justify-between">
            <div className="flex items-center justify-between text-[9px] text-[#64748B] border-b border-white/5 pb-1 mb-1">
              <span className="flex items-center gap-1">
                <Terminal className="w-3 h-3 text-sky-400" />
                <span>PS C:\DSI-CHAI\AD-Exchange-Normalizer.ps1</span>
              </span>
              <span className="text-emerald-400">Indexation O(1) · Zéro lenteur Outlook</span>
            </div>
            <div className="space-y-1 text-[9px] text-[#94A3B8] font-mono">
              <p className="text-sky-300">PS &gt; Invoke-CHAIActiveDirectoryAudit -Users 1800 -DisableAutomapping</p>
              <p>&gt; Normalisation AD &amp; indexation Hashtables Exchange terminées</p>
              <p>&gt; Cluster K3s (2 nœuds) + Nginx Load Balancer + Docker : ONLINE</p>
              <p className="text-emerald-400">&gt; Intranet : 23 applications métiers regroupées + Guide RH livré</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // LifeOS: Personal Operating System & Second Brain
  if (isLifeOS) {
    return (
      <div className={`relative w-full h-full bg-[#0A0D14] text-[#CBD5E1] font-mono text-[11px] select-none overflow-hidden flex flex-col ${className}`}>
        <div className="h-7 bg-[#111622] border-b border-white/[0.08] px-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-[10px]">
            <Activity className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-bold text-[#F8FAFC]">LifeOS // DASHBOARD UNIFIÉ</span>
          </div>
          <span className="text-[9px] bg-amber-950/40 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded">
            +30 MODULES ACTIFS
          </span>
        </div>

        <div className="flex-1 p-3 grid grid-cols-12 gap-2">
          <div className="col-span-7 flex flex-col gap-2">
            <div className="p-2 rounded bg-white/[0.02] border border-white/[0.06] flex items-center justify-between">
              <div>
                <span className="text-[9px] text-[#64748B] block">PARSER MULTI-EXCHANGE</span>
                <span className="text-xs font-bold text-white">Hyperliquid + CEX + Bank</span>
              </div>
              <span className="text-[9px] text-emerald-400">FastAPI · Python</span>
            </div>
            <div className="p-2 rounded bg-white/[0.02] border border-white/[0.06] flex-1">
              <span className="text-[9px] text-[#64748B] block mb-1">ROUTINES &amp; HABIT TRACKING</span>
              <div className="grid grid-cols-7 gap-1 text-center text-[8px]">
                {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day, idx) => (
                  <div key={idx} className="p-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    <div>{day}</div>
                    <div className="font-bold">100%</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-span-5 bg-black/60 border border-white/[0.08] p-2 rounded flex flex-col justify-between">
            <span className="text-[9px] text-[#D4A843] uppercase block mb-1">ARCHITECTURE</span>
            <div className="space-y-1 text-[9px] text-[#94A3B8]">
              <p>• FastAPI (Python)</p>
              <p>• React &amp; TypeScript</p>
              <p>• Parseur CSV Bancaire</p>
              <p>• PostgreSQL &amp; Docker</p>
            </div>
            <div className="text-[8px] text-emerald-400 pt-1 border-t border-white/5">
              Docker Compose · PostgreSQL
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Chatenger: Secure Web Messaging
  if (isChatenger) {
    return (
      <div className={`relative w-full h-full bg-[#0A0E17] text-[#CBD5E1] font-mono text-[11px] select-none overflow-hidden flex flex-col ${className}`}>
        <div className="h-7 bg-[#101826] border-b border-white/[0.08] px-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]/80" />
            <span className="ml-2 text-[10px] text-[#64748B]">Chatenger // Messagerie Sécurisée</span>
          </div>
          <span className="text-[9px] text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded bg-emerald-950/40">
            Projet Terminale NSI (2023)
          </span>
        </div>

        <div className="flex-1 p-3 grid grid-cols-12 gap-2">
          <div className="col-span-4 bg-white/[0.02] border border-white/[0.06] p-2 rounded flex flex-col gap-1">
            <span className="text-[9px] text-[#64748B] uppercase">SALONS ACTIFS</span>
            <div className="text-[10px] text-white p-1 rounded bg-white/5"># Général</div>
            <div className="text-[10px] text-[#94A3B8] p-1"># Cybersécurité</div>
            <div className="text-[10px] text-[#94A3B8] p-1"># Projets NSI</div>
          </div>

          <div className="col-span-8 bg-black/60 border border-white/[0.08] p-2.5 rounded flex flex-col justify-between">
            <div className="space-y-1.5 text-[9px]">
              <div className="flex items-start gap-1.5">
                <span className="text-[#D4A843] font-semibold">Alexis:</span>
                <span className="text-white">Authentification durcie avec Bcrypt &amp; CSRF shield opérationnelle.</span>
              </div>
              <div className="flex items-start gap-1.5">
                <span className="text-sky-400 font-semibold">System:</span>
                <span className="text-[#94A3B8]">Protection XSS &amp; injection SQL validée.</span>
              </div>
            </div>
            <div className="pt-1.5 border-t border-white/5 flex items-center justify-between text-[8px] text-[#64748B]">
              <span>Requêtes Fetch / AJAX asynchrones</span>
              <span className="text-emerald-400">PHP 8 / MySQL</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Chronia: Assisted Living & Agenda Web Platform (PHP / JS / SQL / Agile)
  if (isChronia) {
    return (
      <div className={`relative w-full h-full bg-[#080B12] text-[#CBD5E1] font-mono text-[11px] select-none overflow-hidden flex flex-col ${className}`}>
        <div className="h-7 bg-[#0E1420] border-b border-white/[0.08] px-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-[10px]">
            <Activity className="w-3.5 h-3.5 text-[#D4A843]" />
            <span className="font-bold text-[#F8FAFC]">CHRONIA // PLATEFORME AIDE À LA PERSONNE</span>
          </div>
          <span className="text-[9px] bg-amber-950/50 text-[#D4A843] border border-[#D4A843]/30 px-2 py-0.5 rounded">
            ÉQUIPE AGILE · 6 DEVS
          </span>
        </div>
        <div className="flex-1 p-3 grid grid-cols-12 gap-2">
          <div className="col-span-7 flex flex-col gap-2">
            <div className="p-2 rounded bg-white/[0.02] border border-white/[0.06]">
              <span className="text-[9px] text-[#64748B] block">AGENDA PARTAGÉ AIDANTS / PROCHES</span>
              <div className="mt-1.5 space-y-1 text-[9px]">
                <div className="flex justify-between p-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                  <span>09:30 · Visite Infirmière</span>
                  <span>Confirmé ✓</span>
                </div>
                <div className="flex justify-between p-1 rounded bg-white/5 text-[#CBD5E1]">
                  <span>14:00 · Téléconsultation Médecin</span>
                  <span className="text-[#D4A843]">Rappel SMS</span>
                </div>
              </div>
            </div>
            <div className="p-2 rounded bg-white/[0.02] border border-white/[0.06] flex-1 flex items-center justify-between">
              <div>
                <span className="text-[9px] text-[#64748B] block">ACCESSIBILITÉ SENIOR</span>
                <span className="text-xs font-bold text-white">Contraste AAA · UI Simplifiée</span>
              </div>
              <span className="text-[9px] text-emerald-400">WCAG 2.1</span>
            </div>
          </div>
          <div className="col-span-5 bg-black/60 border border-white/[0.08] p-2.5 rounded flex flex-col justify-between">
            <span className="text-[9px] text-[#D4A843] uppercase block">ARCHITECTURE MVC</span>
            <div className="space-y-1 text-[9px] text-[#94A3B8]">
              <p>• PHP 8 Architecture MVC</p>
              <p>• Base Relationnelle SQL</p>
              <p>• JavaScript Dynamique</p>
              <p>• Gestion des rôles &amp; droits</p>
            </div>
            <div className="text-[8px] text-emerald-400 pt-1 border-t border-white/5">
              IUT2 Grenoble · SAE S3
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Refonte Mobile & Web (Java Android & Symfony REST API)
  if (isRefonteMobile) {
    return (
      <div className={`relative w-full h-full bg-[#070A10] text-[#CBD5E1] font-mono text-[11px] select-none overflow-hidden flex flex-col ${className}`}>
        <div className="h-7 bg-[#0D131F] border-b border-white/[0.08] px-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-[10px]">
            <Cpu className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-bold text-[#F8FAFC]">ANDROID JAVA &amp; SYMFONY REST API</span>
          </div>
          <span className="text-[9px] bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded">
            JSON SYNC · MVC
          </span>
        </div>
        <div className="flex-1 p-3 grid grid-cols-12 gap-2">
          <div className="col-span-5 bg-white/[0.02] border border-white/[0.08] rounded-lg p-2.5 flex flex-col justify-between">
            <span className="text-[9px] text-[#D4A843] uppercase">CLIENT MOBILE (JAVA)</span>
            <div className="my-auto space-y-1.5 text-[9px]">
              <div className="p-1.5 rounded bg-black/50 border border-white/5 text-white">
                📱 Catalogue &amp; Filtres Temps Réel
              </div>
              <div className="p-1.5 rounded bg-black/50 border border-white/5 text-emerald-400">
                ✓ Cache Offline &amp; Auth Token
              </div>
            </div>
            <span className="text-[8px] text-[#64748B]">Android Studio SDK</span>
          </div>
          <div className="col-span-7 bg-black/60 border border-white/[0.08] rounded-lg p-2.5 flex flex-col justify-between">
            <div className="flex justify-between text-[9px] text-[#64748B] border-b border-white/5 pb-1">
              <span>GET /api/v1/resources</span>
              <span className="text-emerald-400">200 OK · 14ms</span>
            </div>
            <pre className="text-[9px] text-[#94A3B8] leading-relaxed font-mono">
              {'{\n'}
              {'  "framework": "Symfony 6",\n'}
              {'  "orm": "Doctrine SQL",\n'}
              {'  "status": "synchronized"\n'}
              {'}'}
            </pre>
            <div className="text-[8px] text-[#D4A843] pt-1 border-t border-white/5">
              Architecture Client/Serveur découplée
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Agence Voyages JavaFX, Modele Neurone, Trading, Montage Video
  if (isAgenceJavaFX || isModeleNeurone || isTrading || isMontageVideo) {
    return (
      <div className={`relative w-full h-full bg-[#070A10] text-[#CBD5E1] font-mono text-[11px] select-none overflow-hidden flex flex-col ${className}`}>
        <div className="h-7 bg-[#0E131F] border-b border-white/[0.08] px-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-[10px]">
            <Terminal className="w-3.5 h-3.5 text-[#D4A843]" />
            <span className="font-bold text-[#F8FAFC] truncate">{title}</span>
          </div>
          <span className="text-[9px] text-[#D4A843] border border-[#D4A843]/30 px-2 py-0.5 rounded bg-[#D4A843]/10">
            {isAgenceJavaFX ? 'JAVA / JAVAFX' : isModeleNeurone ? 'TENSORFLOW / AI' : isTrading ? 'QUANT / CRYPTO' : 'ADOBE SUITE'}
          </span>
        </div>
        <div className="flex-1 p-3 grid grid-cols-12 gap-2 items-center">
          <div className="col-span-12 bg-white/[0.02] border border-white/[0.06] rounded-lg p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[9px] text-[#64748B] uppercase">ARCHITECTURE &amp; RÉALISATION</span>
              <span className="text-[9px] text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Validé
              </span>
            </div>
            <p className="text-xs text-white font-sans leading-relaxed">
              {isAgenceJavaFX && 'Application desktop orientée objet (MVC, JavaFX, JUnit) pour la planification de séjours et réservations.'}
              {isModeleNeurone && 'Entraînement de réseaux de neurones profonds sous Python (TensorFlow, Keras, NumPy) et visualisation des courbes de perte.'}
              {isTrading && 'Analyse quantitative, gestion stricte du risque (Stop-Loss / Sizing) et automatisation de stratégies sur marchés crypto.'}
              {isMontageVideo && '7+ ans de réalisation vidéo, motion design 60fps, sound design et étalonnage sous Premiere Pro & After Effects.'}
            </p>
          </div>
        </div>
      </div>
    )
  }

  return <ProjectImagePlaceholder title={title} className={className} />
}
