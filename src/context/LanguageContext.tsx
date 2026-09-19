'use client'
import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

type Language = 'fr' | 'en'

interface LanguageContextType {
  lang: Language
  toggleLang: () => void
  t: (fr: string, en: string) => string
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('fr')

  const toggleLang = useCallback(() => {
    setLang(prev => prev === 'fr' ? 'en' : 'fr')
  }, [])

  const t = useCallback((fr: string, en: string) => {
    return lang === 'fr' ? fr : en
  }, [lang])

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used within LanguageProvider')
  return context
}
