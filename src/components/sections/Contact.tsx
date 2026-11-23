'use client'

import { useState, type FormEvent } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import FadeIn from '@/components/ui/FadeIn'
import { assetPath } from '@/lib/asset'
import { ArrowUpRight, Check, Copy } from 'lucide-react'

export default function Contact() {
  const { t } = useLanguage()
  const [copied, setCopied] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [sent, setSent] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('alexis.seranoo@gmail.com')
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2200)
    } catch {
      window.location.href = 'mailto:alexis.seranoo@gmail.com'
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return

    const subject = encodeURIComponent(`Contact — ${formData.name}`)
    const body = encodeURIComponent(
      `Bonjour Alexis,\n\n${formData.message}\n\n— ${formData.name} (${formData.email})`
    )
    window.location.href = `mailto:alexis.seranoo@gmail.com?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <section id="contact" className="scroll-mt-20 py-14 sm:py-24 max-w-[920px] mx-auto px-6">
      <FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-[185px_1fr] gap-4 md:gap-10 items-baseline">
          <div>
            <h2 className="text-[19px] sm:text-[21px] font-semibold tracking-[-0.024em] text-[var(--ink)]">
              Contact
            </h2>
          </div>

          <div className="max-w-[580px]">
            <p className="text-[15px] leading-[1.68] text-[var(--ink-secondary)]">
              {t(
                'Disponible dès juillet 2027 pour un CDI en développement logiciel sur les cantons de Genève ou de Vaud (nationalité française, permis de conduire, éligible au Permis G frontalier).',
                'Available from July 2027 for a full-time software engineering role in the Cantons of Geneva or Vaud (French national, driver’s license, eligible for the Swiss cross-border Permit G).'
              )}
            </p>

            {/* Direct Coordinates — Pure Typography, Zero Boxes */}
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2.5 text-[14px]">
              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex items-center gap-1.5 font-medium text-[var(--ink)] hover:text-[var(--accent)] transition-colors cursor-pointer"
              >
                <span>alexis.seranoo@gmail.com</span>
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-[var(--accent)]" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-[var(--ink-muted)]" />
                )}
              </button>

              <a href="tel:+33782859504" className="link-editorial text-[var(--ink-secondary)] tabular-nums">
                +33 7 82 85 95 04
              </a>

              <a
                href="https://github.com/AlexisSerano"
                target="_blank"
                rel="noopener noreferrer"
                className="link-editorial inline-flex items-center gap-0.5 text-[var(--ink-secondary)]"
              >
                <span>GitHub</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[var(--ink-muted)]" />
              </a>

              <a
                href={assetPath('/images/Alexis_serano.pdf')}
                target="_blank"
                rel="noopener noreferrer"
                className="link-editorial inline-flex items-center gap-0.5 text-[var(--ink-secondary)]"
              >
                <span>{t('Télécharger le CV (PDF)', 'Download Resume (PDF)')}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[var(--ink-muted)]" />
              </a>
            </div>

            {/* Borderless Soft-Surface Form */}
            {sent ? (
              <div className="mt-10 rounded-[10px] bg-[var(--surface)] p-5 text-[14px] text-[var(--ink-secondary)]">
                <p className="font-medium text-[var(--ink)]">
                  {t('Votre client mail s’est ouvert.', 'Your email client has opened.')}
                </p>
                <p className="mt-1">
                  {t(
                    'Vous pouvez également écrire directement à alexis.seranoo@gmail.com.',
                    'You can also email alexis.seranoo@gmail.com directly.'
                  )}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSent(false)
                    setFormData({ name: '', email: '', message: '' })
                  }}
                  className="mt-3 link-editorial text-[13px] text-[var(--ink)] cursor-pointer"
                >
                  {t('Envoyer un autre message', 'Send another message')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-10 space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label htmlFor="contact-name" className="sr-only">
                      {t('Nom', 'Name')}
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={t('Votre nom', 'Your name')}
                      className="w-full rounded-[8px] bg-[var(--surface)] px-3.5 py-2.5 text-[14px] text-[var(--ink)] placeholder:text-[var(--ink-muted)] outline-none focus:ring-2 focus:ring-[var(--accent)] transition-shadow"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="sr-only">
                      Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={t('Votre email', 'Your email')}
                      className="w-full rounded-[8px] bg-[var(--surface)] px-3.5 py-2.5 text-[14px] text-[var(--ink)] placeholder:text-[var(--ink-muted)] outline-none focus:ring-2 focus:ring-[var(--accent)] transition-shadow"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className="sr-only">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t('Votre message', 'Your message')}
                    className="w-full rounded-[8px] bg-[var(--surface)] px-3.5 py-2.5 text-[14px] text-[var(--ink)] placeholder:text-[var(--ink-muted)] outline-none focus:ring-2 focus:ring-[var(--accent)] transition-shadow resize-none"
                  />
                </div>

                <div className="pt-1">
                  <button
                    type="submit"
                    className="px-4.5 py-2.5 rounded-[8px] bg-[var(--ink)] text-[var(--bg)] text-[13.5px] font-medium hover:opacity-90 cursor-pointer pressable"
                  >
                    {t('Envoyer le message', 'Send message')}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </FadeIn>
    </section>
  )
}
