'use client'
import { useEffect, useState, useCallback } from 'react'
import { useLanguage } from '@/context/LanguageContext'

export default function InactivityDetector() {
  const [isIdle, setIsIdle] = useState(false)
  const { t } = useLanguage()
  const originalTitle = 'Alexis Serano | Portfolio'

  const resetIdle = useCallback(() => {
    setIsIdle(false)
    document.title = originalTitle
  }, [])

  useEffect(() => {
    let timeout: NodeJS.Timeout

    const startTimer = () => {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        setIsIdle(true)
        document.title = t('Toujours là ? 👀', 'Still there? 👀')
      }, 45000)
    }

    const handleActivity = () => {
      if (isIdle) resetIdle()
      startTimer()
    }

    const handleVisibility = () => {
      if (document.hidden) {
        document.title = t('Reviens ! 👋', 'Come back! 👋')
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
  }, [isIdle, resetIdle, t])

  if (!isIdle) return null

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] animate-[slideUp_0.5s_ease-out]">
      <div className="glass rounded-full px-6 py-3 flex items-center gap-4 glow-gold">
        <span className="text-sm text-[#A3A3A3]">
          {t('Tu es encore là ? Le site t\'attend...', 'Are you still here? The site is waiting...')}
        </span>
        <button
          onClick={resetIdle}
          className="text-sm font-semibold text-[#D4A843] hover:text-[#F5D785] transition-colors"
        >
          {t('Je suis là !', 'I\'m here!')}
        </button>
      </div>
    </div>
  )
}
