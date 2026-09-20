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
import GoldParticles from '@/components/ui/GoldParticles'

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

      {/* Fullscreen Geometric Black & Gold Background */}
      <GeometricReliefBackground />

      {/* Floating Gold Embers / Particles */}
      <GoldParticles />

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
