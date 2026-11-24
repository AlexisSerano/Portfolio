import type { Metadata } from 'next'
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google'
import { LanguageProvider } from '@/context/LanguageContext'
import { ThemeProvider } from '@/context/ThemeContext'
import SmoothScroll from '@/components/layout/SmoothScroll'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'Alexis Serano — Développeur Logiciel R&D & Full-Stack',
  description:
    "Portfolio d'Alexis Serano, Développeur Logiciel R&D chez Carrier (4M d'unités/an, conformité CRA, OTP) et B.U.T. Informatique (Grade de Bachelor - 180 ECTS). Disponible dès juillet 2027 sur Genève et Vaud.",
  keywords: [
    'Alexis Serano',
    'Développeur Logiciel',
    'Full-Stack',
    'Backend',
    'Genève',
    'Vaud',
    'Suisse',
    'Carrier R&D',
    'Bachelor 180 ECTS',
    'Kubernetes K3s',
  ],
  authors: [{ name: 'Alexis Serano' }],
  openGraph: {
    title: 'Alexis Serano — Développeur Logiciel R&D & Full-Stack',
    description:
      'Développeur Logiciel R&D chez Carrier · Bachelor Informatique (180 ECTS) · Mobilité Genève & Vaud (juillet 2027)',
    type: 'website',
    locale: 'fr_FR',
  },
}

const themeInitScript = `
(function() {
  try {
    var saved = localStorage.getItem('portfolio-theme-v7');
    var theme = saved === 'light' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();
`

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="fr"
      data-theme="dark"
      className={`${inter.variable} ${jakarta.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="antialiased selection:bg-[var(--accent-soft)] selection:text-[var(--ink)]">
        <ThemeProvider>
          <LanguageProvider>
            <SmoothScroll>{children}</SmoothScroll>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
