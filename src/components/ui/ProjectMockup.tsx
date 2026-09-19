'use client'
import React from 'react'
import Image from 'next/image'
import { assetPath } from '@/lib/asset'
import { Activity, ShieldCheck, Terminal, Cpu, Database, Server, LineChart, CheckCircle2 } from 'lucide-react'

interface ProjectMockupProps {
  slug: string
  title: string
  imageSrc?: string
  priority?: boolean
  className?: string
}

export default function ProjectMockup({ slug, title, imageSrc, priority = false, className = '' }: ProjectMockupProps) {
  // If a real screenshot exists that isn't just a generic logo, we can use it with fallback or render dedicated mockups
  const isCarrier = slug === 'alternance-carrier'
  const isStageCHAI = slug === 'stage-chai'
  const isAlgofy = slug === 'algofy'
  const isLifeOS = slug === 'lifeos'
  const isChatenger = slug === 'chatenger'
  const isChronia = slug === 'chronia'

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

  // Carrier Culoz SA: Industrial Embedded STone SCADA Mockup
  if (isCarrier) {
    return (
      <div className={`relative w-full h-full bg-[#060911] text-[#CBD5E1] font-mono text-[11px] select-none overflow-hidden flex flex-col ${className}`}>
        <div className="h-7 bg-[#0B101C] border-b border-white/[0.08] px-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-[10px]">
            <Cpu className="w-3.5 h-3.5 text-[#D4A843]" />
            <span className="font-bold text-[#F8FAFC]">CARRIER CULOZ SA // STone PLATFORM</span>
          </div>
          <span className="text-[9px] bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded">
            PLC ONLINE · IEC 61131-3
          </span>
        </div>

        <div className="flex-1 p-3 grid grid-cols-12 gap-2">
          {/* Left SCADA Gauges */}
          <div className="col-span-6 flex flex-col gap-2">
            <div className="bg-white/[0.02] border border-white/[0.06] p-2.5 rounded">
              <span className="text-[9px] text-[#64748B] uppercase block mb-1.5">REGULATION BOUCLE CVC</span>
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="p-2 rounded bg-black/40 border border-white/5">
                  <span className="text-[9px] text-[#94A3B8] block">TEMPÉRATURE</span>
                  <span className="text-base font-bold text-[#D4A843]">21.4 °C</span>
                  <span className="text-[8px] text-emerald-400 block mt-0.5">CONSIGNE: 21.0 °C</span>
                </div>
                <div className="p-2 rounded bg-black/40 border border-white/5">
                  <span className="text-[9px] text-[#94A3B8] block">DÉBIT D'AIR</span>
                  <span className="text-base font-bold text-white">4 850 m³/h</span>
                  <span className="text-[8px] text-emerald-400 block mt-0.5">VANNE: 64%</span>
                </div>
              </div>
            </div>

            <div className="bg-white/[0.02] border border-white/[0.06] p-2 rounded flex-1">
              <span className="text-[9px] text-[#64748B] uppercase block mb-1">MIGRATION CARREL → STone</span>
              <div className="space-y-1 text-[9px]">
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="w-3 h-3 shrink-0" />
                  <span>Portage des blocs fonctions PID</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="w-3 h-3 shrink-0" />
                  <span>Gestion des alarmes incendie &amp; gel</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="w-3 h-3 shrink-0" />
                  <span>Validation sur banc d'essai industriel</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Code editor Langage ST preview */}
          <div className="col-span-6 bg-black/60 border border-white/[0.08] p-2.5 rounded flex flex-col justify-between">
            <div className="flex items-center justify-between text-[9px] text-[#64748B] border-b border-white/5 pb-1 mb-1.5">
              <span>Main_HVAC_Control.st</span>
              <span className="text-[#D4A843]">Langage ST</span>
            </div>
            <pre className="text-[9px] text-[#94A3B8] leading-relaxed overflow-hidden font-mono">
              <span className="text-rose-400">IF</span> bSafetyInterlock = <span className="text-amber-400">FALSE</span> <span className="text-rose-400">THEN</span>{'\n'}
              {'  '}<span className="text-[#D4A843]">rOutPID</span> := FB_PID(Setpoint := rSetPoint,{'\n'}
              {'                  '}Actual := rCurrentTemp);{'\n'}
              {'  '}Vanne_Proportionnelle := rOutPID;{'\n'}
              <span className="text-rose-400">ELSE</span>{'\n'}
              {'  '}Vanne_Proportionnelle := 0.0;{'\n'}
              {'  '}bAlarmActive := <span className="text-amber-400">TRUE</span>;{'\n'}
              <span className="text-rose-400">END_IF;</span>
            </pre>
            <div className="text-[8px] text-emerald-400/90 pt-1 border-t border-white/5">
              ✓ Compilation STone 0 erreurs · Temps cycle: 20ms
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Stage DSI CHAI: Kubernetes & PowerShell Hospital System Mockup
  if (isStageCHAI) {
    return (
      <div className={`relative w-full h-full bg-[#080C14] text-[#CBD5E1] font-mono text-[11px] select-none overflow-hidden flex flex-col ${className}`}>
        <div className="h-7 bg-[#0F172A] border-b border-white/[0.08] px-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-[10px]">
            <Server className="w-3.5 h-3.5 text-sky-400" />
            <span className="font-bold text-[#F8FAFC]">DSI CH ALPES-ISÈRE // INFRASTRUCTURE CRITIQUE</span>
          </div>
          <span className="text-[9px] bg-sky-950/60 text-sky-400 border border-sky-500/30 px-2 py-0.5 rounded">
            HA 24/7 · 1800+ USERS
          </span>
        </div>

        <div className="flex-1 p-3 grid grid-cols-12 gap-2">
          {/* Top Row: Kubernetes & AD metrics */}
          <div className="col-span-12 grid grid-cols-3 gap-2">
            <div className="p-2 rounded bg-white/[0.02] border border-white/[0.06]">
              <span className="text-[9px] text-[#64748B] block">CLUSTER KUBERNETES</span>
              <span className="text-xs font-bold text-white">4 Nœuds · 48 Pods</span>
              <span className="text-[8px] text-emerald-400 block">Uptime: 99.98%</span>
            </div>
            <div className="p-2 rounded bg-white/[0.02] border border-white/[0.06]">
              <span className="text-[9px] text-[#64748B] block">ACTIVE DIRECTORY</span>
              <span className="text-xs font-bold text-[#D4A843]">1 840 Comptes</span>
              <span className="text-[8px] text-sky-400 block">GPO Hospitalières Sync</span>
            </div>
            <div className="p-2 rounded bg-white/[0.02] border border-white/[0.06]">
              <span className="text-[9px] text-[#64748B] block">BASES MARIADB</span>
              <span className="text-xs font-bold text-emerald-400">Haute Dispo Sync</span>
              <span className="text-[8px] text-[#94A3B8] block">Dossiers Patients Sécurisés</span>
            </div>
          </div>

          {/* PowerShell Automation Console */}
          <div className="col-span-12 flex-1 bg-black/60 border border-white/[0.08] p-2.5 rounded flex flex-col justify-between">
            <div className="flex items-center justify-between text-[9px] text-[#64748B] border-b border-white/5 pb-1 mb-1">
              <span className="flex items-center gap-1">
                <Terminal className="w-3 h-3 text-sky-400" />
                <span>PS C:\DSI-Automation\CHAI-Maintenance.ps1</span>
              </span>
              <span className="text-emerald-400">Automatisation (-70% temps)</span>
            </div>
            <div className="space-y-1 text-[9px] text-[#94A3B8] font-mono">
              <p className="text-sky-300">PS &gt; Invoke-HospitalUserSync -Domain "CHAI.LOCAL" -AuditReport</p>
              <p>&gt; Scan 1842 comptes médicaux... 100% vérifiés</p>
              <p>&gt; Rotation des certificats SSL/TLS Kubernetes effectuée</p>
              <p className="text-emerald-400">&gt; Cluster Status: HEALTHY [Control-Plane: OK, Workers: OK]</p>
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
              <span className="text-[9px] text-emerald-400">FastAPI Async · Celery</span>
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
            <span className="text-[9px] text-[#D4A843] uppercase block mb-1">STACK MICROSERVICES</span>
            <div className="space-y-1 text-[9px] text-[#94A3B8]">
              <p>• FastAPI Async Core</p>
              <p>• Redis Message Broker</p>
              <p>• Celery Worker Queues</p>
              <p>• PostgreSQL Persistence</p>
            </div>
            <div className="text-[8px] text-emerald-400 pt-1 border-t border-white/5">
              Docker Compose: 6 containers
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

  // Fallback: If image exists, display image nicely framed
  if (imageSrc) {
    return (
      <div className={`relative w-full h-full bg-[#080808] overflow-hidden ${className}`}>
        <Image
          src={assetPath(imageSrc)}
          alt={title}
          fill
          className="object-cover"
          priority={priority}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-black/30 to-transparent" />
      </div>
    )
  }

  // Generic clean developer window preview
  return (
    <div className={`relative w-full h-full bg-[#0A0A0A] border border-white/[0.06] flex items-center justify-center p-6 ${className}`}>
      <div className="text-center">
        <Terminal className="w-8 h-8 text-[#D4A843] mx-auto mb-2 opacity-80" />
        <h4 className="text-sm font-semibold text-[#F8FAFC]">{title}</h4>
        <p className="text-xs text-[#64748B] font-mono mt-1">Application logicielle</p>
      </div>
    </div>
  )
}
