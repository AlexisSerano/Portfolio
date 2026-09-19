'use client'
import { useState, useEffect, useCallback } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import LoadingScreen from '@/components/sections/LoadingScreen'
import Navbar from '@/components/layout/Navbar'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Skills from '@/components/sections/Skills'
import Experience from '@/components/sections/Experience'
import Projects from '@/components/sections/Projects'
import Terminal from '@/components/sections/Terminal'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/layout/Footer'
import ScrollProgress from '@/components/ui/ScrollProgress'
import GeometricReliefBackground from '@/components/ui/GeometricReliefBackground'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // If previously loaded in this session, skip intro immediately
    const hasLoaded = sessionStorage.getItem('portfolio_intro_played')
    if (hasLoaded) {
      setIsLoading(false)
    }
  }, [])

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false)
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem('portfolio_intro_played', 'true')
      } catch (_) {}
      setTimeout(() => {
        ScrollTrigger.refresh()
      }, 100)
    }
  }, [])

  return (
    <>
      {/* Loading Screen Overlay - only on initial visit */}
      {isLoading && mounted && (
        <LoadingScreen onComplete={handleLoadingComplete} />
      )}

      {/* Geometric Relief Background with Gold Traces */}
      <GeometricReliefBackground />

      {/* Atmospheric Golden Ambient Lighting Layers */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Top Gold Glow (Hero) */}
        <div className="absolute -top-[10%] left-1/2 -translate-x-1/2 w-[900px] h-[550px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(212,168,67,0.15)_0%,transparent_70%)] blur-[100px]" />

        {/* Upper Middle Gold Glow (About / Skills) */}
        <div className="absolute top-[22%] -left-[10%] w-[700px] h-[700px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(212,168,67,0.11)_0%,transparent_70%)] blur-[130px]" />

        {/* Center Right Warm Glow (Experience / Projects) */}
        <div className="absolute top-[52%] -right-[10%] w-[750px] h-[750px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(212,168,67,0.12)_0%,transparent_70%)] blur-[130px]" />

        {/* Bottom Ambient Glow (Terminal / Contact) */}
        <div className="absolute bottom-[3%] left-1/3 -translate-x-1/2 w-[850px] h-[600px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(212,168,67,0.10)_0%,transparent_70%)] blur-[120px]" />
      </div>

      {/* Main Content */}
      <div className="relative min-h-screen z-10">
        <ScrollProgress />
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Terminal />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}
