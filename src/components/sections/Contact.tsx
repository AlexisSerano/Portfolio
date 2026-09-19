'use client'
import { useState, type FormEvent } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import TextReveal from '@/components/ui/TextReveal'
import { assetPath } from '@/lib/asset'
import { Mail, FileText, Copy, Check, Send, CheckCircle2, AlertCircle } from 'lucide-react'

const GithubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
)

export default function Contact() {
  const { t } = useLanguage()
  const [copied, setCopied] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const copyEmail = () => {
    navigator.clipboard.writeText('alexis.seranoo@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error')
      return
    }

    setStatus('submitting')
    // Open email client with pre-filled subject and body
    setTimeout(() => {
      const subject = encodeURIComponent(formData.subject || `Message de ${formData.name}`)
      const body = encodeURIComponent(
        `Bonjour Alexis,\n\n${formData.message}\n\n---\nEnvoyé par: ${formData.name} (${formData.email})`
      )
      window.location.href = `mailto:alexis.seranoo@gmail.com?subject=${subject}&body=${body}`
      setStatus('success')
    }, 600)
  }

  return (
    <section id="contact" className="py-28 px-6 max-w-7xl mx-auto relative z-10">
      {/* Header */}
      <div className="mb-16">
        <span className="text-[#D4A843] font-mono text-xs tracking-widest uppercase mb-3 flex items-center gap-2">
          <span className="w-8 h-px bg-[#D4A843]/50" />
          {t('05 — Contact', '05 — Contact')}
        </span>
        <TextReveal tag="h2" className="text-3xl md:text-5xl font-bold text-[#F8FAFC] tracking-tight leading-tight" stagger={0.03}>
          {t('Travaillons ensemble.', "Let's work together.")}
        </TextReveal>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Direct Links & Info (5 cols) */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <h3 className="text-xl font-bold text-[#F8FAFC] mb-3">
              {t('Un projet, une alternance ou un CDI ?', 'A project, apprenticeship or job offer?')}
            </h3>
            <p className="text-[#94A3B8] text-sm leading-relaxed mb-6">
              {t(
                "Actuellement en alternance chez Carrier Culoz SA et diplômé en 2027, je suis à l'écoute d'opportunités ambitieuses en développement logiciel, architecture full-stack et DevOps.",
                "Currently an apprentice at Carrier Culoz SA graduating in 2027, I am open to ambitious opportunities in software engineering, full-stack architecture, and DevOps."
              )}
            </p>
          </div>

          {/* Contact Direct Items */}
          <div className="space-y-4">
            {/* Email Card with explicit Copy Feedback */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-[#D4A843]/30 transition-colors">
              <span className="text-[10px] uppercase font-mono text-[#64748B] block mb-1">
                {t('Email professionnel', 'Direct Email')}
              </span>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <a
                  href="mailto:alexis.seranoo@gmail.com"
                  className="text-sm font-mono text-[#F8FAFC] hover:text-[#D4A843] transition-colors"
                >
                  alexis.seranoo@gmail.com
                </a>
                <button
                  onClick={copyEmail}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-white/5 hover:bg-[#D4A843]/10 text-[#94A3B8] hover:text-[#F5D785] border border-white/10 transition-colors cursor-pointer"
                  title={t("Copier l'email", 'Copy email')}
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#D4A843]" />}
                  <span>{copied ? t('Copié !', 'Copied!') : t('Copier l\'email', 'Copy email')}</span>
                </button>
              </div>
            </div>

            {/* GitHub */}
            <a
              href="https://github.com/AlexisSerano"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-[#D4A843]/30 transition-colors flex items-center justify-between group block"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[#64748B] group-hover:text-[#D4A843] transition-colors">
                  <GithubIcon className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono text-[#64748B] block">GitHub</span>
                  <span className="text-sm text-[#F8FAFC] group-hover:text-[#D4A843] transition-colors">
                    github.com/AlexisSerano
                  </span>
                </div>
              </div>
              <span className="text-xs text-[#64748B] group-hover:text-[#D4A843] transition-colors font-mono">
                ↗
              </span>
            </a>

            {/* CV Download */}
            <a
              href={assetPath('/images/Alexis_serano.pdf')}
              target="_blank"
              className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-[#D4A843]/30 transition-colors flex items-center justify-between group block"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[#64748B] group-hover:text-[#D4A843] transition-colors">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono text-[#64748B] block">Curriculum Vitae</span>
                  <span className="text-sm text-[#F8FAFC] group-hover:text-[#D4A843] transition-colors">
                    {t('Télécharger mon CV (PDF)', 'Download Resume (PDF)')}
                  </span>
                </div>
              </div>
              <span className="text-xs text-[#64748B] group-hover:text-[#D4A843] transition-colors font-mono">
                PDF ↗
              </span>
            </a>
          </div>
        </div>

        {/* Right Column: Functional Contact Form (7 cols) */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 rounded-2xl bg-[#090C12]/80 border border-white/[0.08] backdrop-blur-md shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
            <h4 className="text-lg font-bold text-[#F8FAFC] mb-2">
              {t('Envoyer un message direct', 'Send a direct message')}
            </h4>
            <p className="text-xs text-[#94A3B8] mb-6">
              {t('Remplissez le formulaire ci-dessous pour me contacter rapidement.', 'Fill out the form below to reach out directly.')}
            </p>

            {status === 'success' ? (
              <div className="p-6 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h5 className="text-base font-bold text-white">
                  {t('Message prêt !', 'Message ready!')}
                </h5>
                <p className="text-xs text-[#CBD5E1] leading-relaxed max-w-md mx-auto">
                  {t(
                    'Votre client de messagerie a été ouvert avec les informations pré-remplies. Vous pouvez également m\'écrire directement à alexis.seranoo@gmail.com.',
                    'Your email client has been opened with your pre-filled message. You can also email alexis.seranoo@gmail.com directly.'
                  )}
                </p>
                <button
                  onClick={() => {
                    setStatus('idle')
                    setFormData({ name: '', email: '', subject: '', message: '' })
                  }}
                  className="mt-2 text-xs font-mono text-[#D4A843] hover:underline cursor-pointer"
                >
                  {t('Envoyer un autre message', 'Send another message')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="text-[11px] font-mono text-[#94A3B8] uppercase block mb-1.5">
                      {t('Nom / Entreprise', 'Name / Company')} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={t('Ex: Jean Dupont', 'e.g. John Doe')}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white/[0.03] border border-white/10 focus:border-[#D4A843] focus:outline-none text-xs text-[#F8FAFC] placeholder-[#64748B] transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="text-[11px] font-mono text-[#94A3B8] uppercase block mb-1.5">
                      {t('Adresse Email', 'Email Address')} *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={t('jean.dupont@example.com', 'john@example.com')}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white/[0.03] border border-white/10 focus:border-[#D4A843] focus:outline-none text-xs text-[#F8FAFC] placeholder-[#64748B] transition-colors"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="text-[11px] font-mono text-[#94A3B8] uppercase block mb-1.5">
                    {t('Sujet du message', 'Subject')}
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder={t('Ex: Opportunité CDI / Proposition de projet', 'e.g. Job Opportunity / Project proposal')}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white/[0.03] border border-white/10 focus:border-[#D4A843] focus:outline-none text-xs text-[#F8FAFC] placeholder-[#64748B] transition-colors"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="text-[11px] font-mono text-[#94A3B8] uppercase block mb-1.5">
                    {t('Votre Message', 'Your Message')} *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t('Décrivez votre projet ou opportunité...', 'Describe your project or opportunity...')}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white/[0.03] border border-white/10 focus:border-[#D4A843] focus:outline-none text-xs text-[#F8FAFC] placeholder-[#64748B] transition-colors resize-none"
                  />
                </div>

                {status === 'error' && (
                  <div className="flex items-center gap-2 text-xs text-rose-400 bg-rose-950/30 p-2.5 rounded border border-rose-500/20">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{t('Veuillez renseigner tous les champs obligatoires.', 'Please complete all required fields.')}</span>
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full py-3 px-6 rounded-xl bg-[#D4A843] hover:bg-[#F5D785] text-[#050505] font-semibold text-xs sm:text-sm transition-all shadow-[0_0_25px_rgba(212,168,67,0.3)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{status === 'submitting' ? t('Préparation...', 'Preparing...') : t('Transmettre mon message', 'Send message')}</span>
                </button>

                <p className="text-[11px] text-[#64748B] text-center font-mono pt-2">
                  {t('Temps de réponse moyen : sous 24h · Culoz & Grenoble', 'Average response time: within 24h')}
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

