'use client'
import { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import TextReveal from '@/components/ui/TextReveal'
import MagneticButton from '@/components/ui/MagneticButton'
import { assetPath } from '@/lib/asset'
import { Mail, FileText, Copy, Check } from 'lucide-react'

const GithubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
)

export default function Contact() {
  const { t } = useLanguage()
  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText('alexis.seranoo@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="contact" className="py-28 px-6 max-w-7xl mx-auto relative z-10">
      {/* Header */}
      <div className="mb-16">
        <span className="text-[#D4A843] font-mono text-xs tracking-widest uppercase mb-3 block flex items-center gap-2">
          <span className="w-8 h-px bg-[#D4A843]/50" />
          {t('05 — Contact', '05 — Contact')}
        </span>
        <TextReveal tag="h2" className="text-3xl md:text-5xl font-bold text-[#F5F5F5] tracking-tight leading-tight" stagger={0.03}>
          {t('Travaillons ensemble.', "Let's work together.")}
        </TextReveal>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Left — Message */}
        <div>
          <h3 className="text-xl font-bold text-[#F5F5F5] mb-4">
            {t('Un projet ? Une opportunité ?', 'A project? An opportunity?')}
          </h3>
          <p className="text-[#A3A3A3] text-sm leading-relaxed mb-8">
            {t(
              'Je suis actuellement en alternance chez Carrier Culoz SA et ouvert aux opportunités futures. N\'hésitez pas à me contacter pour discuter de vos projets ou d\'éventuelles collaborations.',
              'I\'m currently an apprentice at Carrier Culoz SA and open to future opportunities. Feel free to reach out to discuss your projects or potential collaborations.'
            )}
          </p>

          {/* Contact links */}
          <div className="space-y-4">
            <div className="flex items-center gap-4 group">
              <div className="w-10 h-10 rounded-full border border-[rgba(255,255,255,0.06)] flex items-center justify-center text-[#6B6B6B] group-hover:text-[#D4A843] group-hover:border-[rgba(212,168,67,0.3)] transition-all">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <a href="mailto:alexis.seranoo@gmail.com" className="text-sm text-[#F5F5F5] hover:text-[#D4A843] transition-colors">
                  alexis.seranoo@gmail.com
                </a>
                <button onClick={copyEmail} className="ml-2 inline-flex items-center text-xs text-[#6B6B6B] hover:text-[#D4A843] transition-colors">
                  {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span className="ml-1">{copied ? t('Copié !', 'Copied!') : t('Copier', 'Copy')}</span>
                </button>
              </div>
            </div>

            <a href="https://github.com/AlexisSerano" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
              <div className="w-10 h-10 rounded-full border border-[rgba(255,255,255,0.06)] flex items-center justify-center text-[#6B6B6B] group-hover:text-[#D4A843] group-hover:border-[rgba(212,168,67,0.3)] transition-all">
                <GithubIcon className="w-4 h-4" />
              </div>
              <span className="text-sm text-[#F5F5F5] hover:text-[#D4A843] transition-colors">
                github.com/AlexisSerano
              </span>
            </a>

            <a href={assetPath('/images/Alexis_serano.pdf')} target="_blank" className="flex items-center gap-4 group">
              <div className="w-10 h-10 rounded-full border border-[rgba(255,255,255,0.06)] flex items-center justify-center text-[#6B6B6B] group-hover:text-[#D4A843] group-hover:border-[rgba(212,168,67,0.3)] transition-all">
                <FileText className="w-4 h-4" />
              </div>
              <span className="text-sm text-[#F5F5F5] hover:text-[#D4A843] transition-colors">
                {t('Télécharger mon CV (PDF)', 'Download my Resume (PDF)')}
              </span>
            </a>
          </div>
        </div>

        {/* Right — CTA */}
        <div className="flex flex-col items-start justify-center">
          <div className="glass rounded-2xl p-8 w-full">
            <h4 className="text-lg font-bold text-[#F5F5F5] mb-3">
              {t('Envoyez-moi un message', 'Send me a message')}
            </h4>
            <p className="text-sm text-[#6B6B6B] mb-6">
              {t(
                'Le moyen le plus rapide de me joindre est par email.',
                'The fastest way to reach me is by email.'
              )}
            </p>
            <MagneticButton
              href="mailto:alexis.seranoo@gmail.com"
              className="w-full text-center px-6 py-4 rounded-xl bg-[#D4A843] text-[#050505] font-semibold text-sm hover:shadow-[0_0_40px_rgba(212,168,67,0.3)] transition-all block"
            >
              {t('Ouvrir ma boîte mail →', 'Open my inbox →')}
            </MagneticButton>

            <div className="mt-6 pt-6 border-t border-[rgba(255,255,255,0.06)]">
              <p className="text-xs text-[#404040] text-center">
                {t(
                  'Temps de réponse moyen : 24h',
                  'Average response time: 24h'
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
