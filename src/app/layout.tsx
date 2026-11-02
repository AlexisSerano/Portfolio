import type { Metadata } from 'next'
import { LanguageProvider } from '@/context/LanguageContext'
import SmoothScroll from '@/components/layout/SmoothScroll'
import CursorFollower from '@/components/ui/CursorFollower'
import InactivityDetector from '@/components/ui/InactivityDetector'
import './globals.css'

export const metadata: Metadata = {
  title: 'Alexis Serano | Développeur Logiciel R&D & Full-Stack (Genève & Vaud)',
  description: "Portfolio d'Alexis Serano, Développeur Logiciel R&D chez Carrier (4M d'unités/an, CRA, OTP) et B.U.T. Informatique (Grade de Bachelor - 180 ECTS). Cantons de Genève & Vaud dès juillet 2027.",
  keywords: ['Alexis Serano', 'Développeur Logiciel', 'Full-Stack', 'Backend', 'Genève', 'Vaud', 'Suisse', 'Carrier R&D', 'Bachelor 180 ECTS', 'Kubernetes K3s'],
  authors: [{ name: 'Alexis Serano' }],
  openGraph: {
    title: 'Alexis Serano | Développeur Logiciel R&D & Full-Stack',
    description: "Portfolio d'Alexis Serano — Développeur Logiciel R&D @ Carrier · Bachelor 180 ECTS · Cantons de Genève & Vaud",
    type: 'website',
    locale: 'fr_FR',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="grain bg-geo bg-grid font-sans antialiased">
        <LanguageProvider>
          <SmoothScroll>
            <CursorFollower />
            <InactivityDetector />
            {children}
          </SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  )
}

