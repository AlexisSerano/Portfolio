import OpeningCurtain from '@/components/ui/OpeningCurtain'
import StudioAtmosphere from '@/components/ui/StudioAtmosphere'
import Navbar from '@/components/layout/Navbar'
import Hero from '@/components/sections/Hero'
import ImpactStrip from '@/components/sections/ImpactStrip'
import Experience from '@/components/sections/Experience'
import Projects from '@/components/sections/Projects'
import Skills from '@/components/sections/Skills'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/layout/Footer'

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[var(--bg)] text-[var(--ink)]">
      <OpeningCurtain />
      <StudioAtmosphere />
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <ImpactStrip />
          <Experience />
          <Projects />
          <Skills />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  )
}
