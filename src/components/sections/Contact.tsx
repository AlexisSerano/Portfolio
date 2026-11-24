'use client'

import { useState, type FormEvent } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import FadeIn from '@/components/ui/FadeIn'
import Magnetic from '@/components/ui/Magnetic'
import SectionHeading from '@/components/ui/SectionHeading'
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
    <section id="contact" className="scroll-mt-20 py-20 sm:py-28 max-w-[1120px] mx-auto px-6 border-t border-[var(--divider)]">
      <FadeIn>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Open Left Column (5 cols) */}
          <div className="lg:col-span-5">
            <SectionHeading title={t('Me contacter', 'Get in touch')} />
            <p className="mt-3 text-[15px] leading-[1.68] text-[var(--ink-secondary)]">
              {t(
                'Disponible dès juillet 2027 pour un CDI en développement logiciel sur les cantons de Genève ou de Vaud (nationalité française, permis de conduire, éligible au Permis G frontalier).',
                'Available from July 2027 for a full-time software engineering role in the Cantons of Geneva or Vaud (French national, driver’s license, eligible for the Swiss cross-border Permit G).'
              )}
            </p>

            <div className="mt-7 space-y-3 text-[14px]">
              <div>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[var(--surface)] hover:bg-[var(--accent-soft)] font-medium text-[var(--ink)] transition-colors cursor-pointer pressable"
                >
                  <span>alexis.seranoo@gmail.com</span>
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-[var(--accent)]" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-[var(--accent)]" />
                  )}
                </button>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-x-5 gap-y-2 text-[14px] text-[var(--ink-secondary)]">
                <a href="tel:+33782859504" className="link-editorial tabular-nums">
                  +33 7 82 85 95 04
                </a>

                <a
                  href="https://github.com/AlexisSerano"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-editorial inline-flex items-center gap-0.5"
                >
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[var(--ink-muted)]" />
                </a>

                <a
                  href={assetPath('/images/Alexis_serano.pdf')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-editorial inline-flex items-center gap-0.5"
                >
                  <span>{t('Télécharger le CV (PDF)', 'Download Resume (PDF)')}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[var(--ink-muted)]" />
                </a>
              </div>
            </div>
          </div>

          {/* Open Right Column (7 cols): Clean Soft Inputs */}
          <div className="lg:col-span-7">
            {sent ? (
              <div className="rounded-[18px] bg-[var(--surface)] p-6 text-[14.5px] text-[var(--ink-secondary)]">
                <p className="font-semibold text-[var(--ink)]">
                  {t('Votre client mail s’est ouvert.', 'Your email client has opened.')}
                </p>
                <p className="mt-1">
                  {t(
                    'Vous pouvez également m’écrire directement à alexis.seranoo@gmail.com.',
                    'You can also email alexis.seranoo@gmail.com directly.'
                  )}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSent(false)
                    setFormData({ name: '', email: '', message: '' })
                  }}
                  className="mt-3 link-editorial text-[13.5px] text-[var(--accent)] cursor-pointer"
                >
                  {t('Envoyer un autre message', 'Send another message')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                      className="w-full rounded-[14px] bg-[var(--surface)] px-4 py-3.5 text-[14.5px] text-[var(--ink)] placeholder:text-[var(--ink-muted)] outline-none focus:ring-2 focus:ring-[var(--accent)] transition-shadow"
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
                      className="w-full rounded-[14px] bg-[var(--surface)] px-4 py-3.5 text-[14.5px] text-[var(--ink)] placeholder:text-[var(--ink-muted)] outline-none focus:ring-2 focus:ring-[var(--accent)] transition-shadow"
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
                    className="w-full rounded-[14px] bg-[var(--surface)] px-4 py-3.5 text-[14.5px] text-[var(--ink)] placeholder:text-[var(--ink-muted)] outline-none focus:ring-2 focus:ring-[var(--accent)] transition-shadow resize-none"
                  />
                </div>

                <div className="pt-1">
                  <Magnetic strength={0.2} className="inline-block">
                    <button
                      type="submit"
                      className="roll-btn px-6 py-3 rounded-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--accent-fg)] text-[14px] font-semibold cursor-pointer pressable shadow-[0_10px_28px_-6px_rgba(242,158,178,0.4)]"
                    >
                      <span className="roll-clip">
                        <span className="roll-primary">{t('Envoyer le message', 'Send message')}</span>
                        <span className="roll-clone" aria-hidden="true">
                          {t('Envoyer le message', 'Send message')}
                        </span>
                      </span>
                    </button>
                  </Magnetic>
                </div>
              </form>
            )}
          </div>
        </div>
      </FadeIn>
    </section>
  )
}
