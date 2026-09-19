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
  title: 'Alexis Serano | Développeur Full-Stack & DevOps',
  description: "Portfolio d'Alexis Serano, alternant chez Carrier Culoz SA et étudiant en 3ème année BUT Informatique. Développement logiciel, Full-Stack, DevOps et systèmes autonomes.",
  keywords: ['Alexis Serano', 'Développeur', 'Full-Stack', 'DevOps', 'Portfolio', 'Carrier Culoz', 'BUT Informatique', 'Grenoble'],
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

