import { lazy, Suspense, useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useScroll } from "framer-motion"
import { Navbar } from "./components/navbar"
import { LoadingScreen } from "./components/ui/loading-screen"
import { WavesOverlay } from "./components/ui/waves-overlay"
import { CustomCursor } from "./components/ui/custom-cursor"
import { EditorialTicker } from "./components/ui/editorial-ticker"
import { DemoModal } from "./components/ui/demo-modal"
import { useNavbarState } from "./hooks/use-navbar-state"
import { soundEngine } from "./lib/audio-synthesizer"

// 10-Chapter Interactive Storytelling Suite
import { AtherArrival } from "./components/sections/ather-arrival"
import { AtherIdea } from "./components/sections/ather-idea"
import { AtherMachine } from "./components/sections/ather-machine"
import { AtherDetails } from "./components/sections/ather-details"
import { AtherMovement } from "./components/sections/ather-movement"
import { AtherIntelligence } from "./components/sections/ather-intelligence"
import { AtherExperience } from "./components/sections/ather-experience"
import { AtherSpecifications } from "./components/sections/ather-specifications"
import { AtherConclusion } from "./components/sections/ather-conclusion"
import { AtherCredits } from "./components/sections/ather-credits"

const ShaderAnimation = lazy(() =>
  import("./components/ui/shader-animation").then((module) => ({
    default: module.ShaderAnimation,
  })),
)

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [isDemoOpen, setIsDemoOpen] = useState(false)
  const mainRef = useRef(null)
  const { scrollY, scrollYProgress } = useScroll({
    target: mainRef,
    offset: ["start start", "end end"],
  })
  const isScrolled = useNavbarState(scrollY, 48)

  useEffect(() => {
    const duration = 750
    const start = window.performance.now()
    let frameId = 0

    const tick = (now) => {
      const elapsed = now - start
      const rawProgress = Math.min(elapsed / duration, 1)
      const progress = 1 - Math.pow(1 - rawProgress, 3)
      setLoadingProgress(Math.round(progress * 100))

      if (rawProgress < 1) {
        frameId = window.requestAnimationFrame(tick)
      } else {
        setIsLoading(false)
        soundEngine.playChime()
      }
    }

    frameId = window.requestAnimationFrame(tick)

    return () => {
      window.cancelAnimationFrame(frameId)
    }
  }, [])

  return (
    <div className="relative overflow-x-clip bg-[#030712] text-white selection:bg-emerald-500/30 selection:text-white">
      {/* Accessible skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-emerald-400 focus:text-black focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:font-bold focus:shadow-lg focus:outline-none"
      >
        Skip to content
      </a>

      {/* Fine-pointer trailing custom cursor */}
      <CustomCursor />

      {/* Cinematic Aperture Loader */}
      <AnimatePresence>
        {isLoading ? <LoadingScreen key="loading-screen" progress={loadingProgress} /> : null}
      </AnimatePresence>

      {/* Studio Inquiry / Test-Ride Prototype Modal */}
      <DemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />

      {/* Ambient Shader Canvas in background */}
      <Suspense fallback={<div className="fixed inset-0 z-0 bg-[#030712]" />}>
        <ShaderAnimation scrollYProgress={scrollYProgress} />
      </Suspense>

      {/* Hardware-Accelerated Responsive Atmosphere */}
      <div className="pointer-events-none fixed inset-0 z-[1]">
        <WavesOverlay className="opacity-25" />
        <div className="ambient-noise opacity-10" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(3,7,18,0.4)_75%,rgba(3,7,18,0.75))]" />
      </div>

      {/* Floating Spatial Navigation Header */}
      <Navbar isScrolled={isScrolled} onOpenDemo={() => setIsDemoOpen(true)} />

      <motion.div
        initial={false}
        animate={{
          opacity: isLoading ? 0.3 : 1,
          scale: isLoading ? 0.99 : 1,
        }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
      >
        <main id="main-content" ref={mainRef} className="relative z-10 overflow-x-clip">
          {/* Chapter 01: Arrival */}
          <AtherArrival onOpenDemo={() => setIsDemoOpen(true)} />

          {/* Telemetry Precision Ticker */}
          <EditorialTicker />

          {/* Chapter 02: The Idea */}
          <AtherIdea />

          {/* Chapter 03: The Machine (3D WebGL Vehicle Visualizer) */}
          <AtherMachine />

          {/* Chapter 04: The Details (Hardware & Ergonomics Explorer) */}
          <AtherDetails />

          {/* Chapter 05: The Movement (Hold-to-Accelerate Sprint Engine) */}
          <AtherMovement />

          {/* Chapter 06: The Intelligence (AtherStack™ 6.0 Touch Cockpit) */}
          <AtherIntelligence />

          {/* Chapter 07: The Experience (Urban Mobility Scenarios) */}
          <AtherExperience />

          {/* Chapter 08: The Specifications (Categorized Verified Matrix) */}
          <AtherSpecifications />

          {/* Chapter 09: The Conclusion (Closing Impression & Philosophy) */}
          <AtherConclusion onOpenDemo={() => setIsDemoOpen(true)} />

          {/* Chapter 10: Project Credits & Disclaimers */}
          <AtherCredits />
        </main>
      </motion.div>
    </div>
  )
}
