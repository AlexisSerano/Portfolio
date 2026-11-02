import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from 'next/font/google'
import { LanguageProvider } from '@/context/LanguageContext'
import SmoothScroll from '@/components/layout/SmoothScroll'
import CursorFollower from '@/components/ui/CursorFollower'
import InactivityDetector from '@/components/ui/InactivityDetector'
import './globals.css'

const fontDisplay = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

const fontBody = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
})

const fontMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500', '600'],
})

export const metadata: Metadata = {
  title: 'Alexis Serano | Développeur Logiciel R&D, Full-Stack & DevOps (Genève & Vaud)',
  description: "Portfolio d'Alexis Serano, Développeur Logiciel R&D chez Carrier (4M d'unités/an, CRA, OTP) et B.U.T. Informatique (Grade de Bachelor - 180 ECTS). Mobilité Genève & Vaud dès juillet 2027.",
  keywords: ['Alexis Serano', 'Développeur Logiciel', 'Full-Stack', 'DevOps', 'Genève', 'Vaud', 'Suisse', 'Carrier R&D', 'Bachelor 180 ECTS', 'Kubernetes K3s'],
  authors: [{ name: 'Alexis Serano' }],
  openGraph: {
    title: 'Alexis Serano | Développeur Logiciel R&D, Full-Stack & DevOps',
    description: "Portfolio d'Alexis Serano — Développeur Logiciel R&D @ Carrier · Bachelor 180 ECTS · Mobilité Genève & Vaud",
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
    <html lang="fr" className={`${fontDisplay.variable} ${fontBody.variable} ${fontMono.variable}`} suppressHydrationWarning>
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

