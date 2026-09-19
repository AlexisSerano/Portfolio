import type { Metadata } from 'next'
import { LanguageProvider } from '@/context/LanguageContext'
import SmoothScroll from '@/components/layout/SmoothScroll'
import CursorFollower from '@/components/ui/CursorFollower'
import InactivityDetector from '@/components/ui/InactivityDetector'
import './globals.css'

export const metadata: Metadata = {
  title: 'Alexis Serano | Développeur Full-Stack & DevOps',
  description: "Portfolio d'Alexis Serano, étudiant en BUT Informatique à l'IUT2 de Grenoble. Développement logiciel, Full-Stack, DevOps, IA et projets multimédias.",
  keywords: ['Alexis Serano', 'Développeur', 'Full-Stack', 'DevOps', 'Portfolio', 'BUT Informatique', 'Grenoble'],
  authors: [{ name: 'Alexis Serano' }],
  openGraph: {
    title: 'Alexis Serano | Développeur Full-Stack & DevOps',
    description: "Portfolio d'Alexis Serano — Développeur Full-Stack & DevOps",
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
      <body className="grain bg-geo bg-grid">
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
