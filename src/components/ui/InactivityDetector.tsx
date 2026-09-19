'use client'
import { useEffect, useState, useCallback } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { Compass } from 'lucide-react'

export default function InactivityDetector() {
  const [isIdle, setIsIdle] = useState(false)
  const { t } = useLanguage()
  const originalTitle = 'Alexis Serano | Développeur Full-Stack'

  const resetIdle = useCallback(() => {
    setIsIdle(false)
    document.title = originalTitle
  }, [originalTitle])

  useEffect(() => {
    let timeout: NodeJS.Timeout

    const startTimer = () => {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        setIsIdle(true)
      }, 60000)
    }

    const handleActivity = () => {
      if (isIdle) resetIdle()
      startTimer()
    }

    const handleVisibility = () => {
      if (document.hidden) {
        document.title = t('Alexis Serano — Développeur Full-Stack', 'Alexis Serano — Full-Stack Developer')
      } else {
        document.title = originalTitle
        handleActivity()
      }
    }

    const events = ['mousemove', 'scroll', 'keypress', 'touchstart', 'click']
    events.forEach(e => window.addEventListener(e, handleActivity))
    document.addEventListener('visibilitychange', handleVisibility)
    startTimer()

    return () => {
      clearTimeout(timeout)
      events.forEach(e => window.removeEventListener(e, handleActivity))
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [isIdle, resetIdle, t, originalTitle])

  if (!isIdle) return null

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] animate-[slideUp_0.4s_ease-out]">
      <div className="glass rounded-full px-5 py-2.5 flex items-center gap-3 border border-[rgba(212,168,67,0.3)] shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
        <span className="w-2 h-2 rounded-full bg-[#D4A843] animate-pulse" />
        <span className="text-xs text-[#CBD5E1]">
          {t('Navigation en pause', 'Browsing paused')}
        </span>
        <button
          onClick={resetIdle}
          className="text-xs font-semibold text-[#D4A843] hover:text-[#F5D785] transition-colors cursor-pointer flex items-center gap-1"
        >
          <Compass className="w-3.5 h-3.5" />
          <span>{t('Continuer', 'Resume')}</span>
        </button>
      </div>
    </div>
  )
}

