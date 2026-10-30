import { lazy, Suspense, useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useScroll } from "framer-motion"
import { Navbar } from "./components/navbar"
import { Footer } from "./components/footer"
import { LoadingScreen } from "./components/ui/loading-screen"
import { WavesOverlay } from "./components/ui/waves-overlay"
import { CustomCursor } from "./components/ui/custom-cursor"
import { EditorialTicker } from "./components/ui/editorial-ticker"
import { TaglineReveal } from "./components/ui/tagline-reveal"
import { SpatialPlayground } from "./components/ui/spatial-playground"
import { DemoModal } from "./components/ui/demo-modal"
import { useNavbarState } from "./hooks/use-navbar-state"
import { HeroSection } from "./sections/hero-section"
import { FeatureSection } from "./sections/feature-section"
import { CTASection } from "./sections/cta-section"
import { soundEngine } from "./lib/audio-synthesizer"

const ShaderAnimation = lazy(() =>
  import("./components/ui/shader-animation").then((module) => ({
    default: module.ShaderAnimation,
  })),
)

const featureSections = [
  {
    id: "signal",
    label: "Signal Architecture",
    title: "A product story paced like cinema.",
    description:
      "Each section lands with calibrated intent. Spatial perspective, scale orchestration, and frame-budgeted motion make the interface feel deeply physical without sacrificing performance.",
    accent: "from-sky-500/25 to-transparent",
    align: "left",
    metrics: ["Perspective-led framing", "Measured reveal timing", "Minimal visual noise"],
  },
  {
    id: "focus",
    label: "Optical Ergonomics",
    title: "Designed to keep attention exactly where it matters.",
    description:
      "The narrative advances section by section. Copy, spatial coordinates, and optics move together so your software remains the focal anchor throughout the scroll.",
    accent: "from-blue-500/25 to-transparent",
    align: "right",
    metrics: ["Progressive content reveal", "Motion as hierarchy", "Clean visual pacing"],
  },
  {
    id: "depth",
    label: "Volumetric Depth",
    title: "Atmosphere in the background. Clarity in the foreground.",
    description:
      "The WebGL shader stays fullscreen and alive underneath everything, adding organic energy while the interface layers glide through it with responsive parallax.",
    accent: "from-slate-400/20 to-transparent",
    align: "left",
    metrics: ["Fixed immersive shader", "Controlled depth illusion", "60fps-first composition"],
  },
  {
    id: "command",
    label: "Modular Runtime",
    title: "Built to present serious software with confidence.",
    description:
      "The architecture stays modular, so the page can evolve from campaign release to flagship product reveal without accumulating monolithic technical debt.",
    accent: "from-sky-400/20 to-transparent",
    align: "right",
    metrics: ["Reusable section engine", "Client-grade modularity", "Performance-conscious motion"],
  },
]

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
    const duration = 850
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
    <div className="relative overflow-x-clip bg-[#02050e] text-white selection:bg-sky-500/25 selection:text-white">
      {/* Fine-pointer trailing custom cursor */}
      <CustomCursor />

      {/* Cinematic Monolith Aperture Loader */}
      <AnimatePresence>
        {isLoading ? <LoadingScreen key="loading-screen" progress={loadingProgress} /> : null}
      </AnimatePresence>

      {/* Studio Launch Demo Modal */}
      <DemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />

      {/* Fullscreen Atmospheric Nebula WebGL Shader */}
      <Suspense fallback={<div className="fixed inset-0 z-0 bg-black" />}>
        <ShaderAnimation scrollYProgress={scrollYProgress} />
      </Suspense>

      {/* Hardware-Accelerated Responsive Waves Overlay */}
      <div className="pointer-events-none fixed inset-0 z-[1]">
        <WavesOverlay className="opacity-35" />
        <div className="ambient-noise opacity-10" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_32%,rgba(2,6,23,0.3)_75%,rgba(2,6,23,0.65))]" />
      </div>

      {/* Floating Spatial Navigation Header */}
      <Navbar isScrolled={isScrolled} onOpenDemo={() => setIsDemoOpen(true)} />

      <motion.div
        initial={false}
        animate={{
          opacity: isLoading ? 0.4 : 1,
          scale: isLoading ? 0.99 : 1,
        }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
      >
        <main ref={mainRef} className="relative z-10 overflow-x-clip">
          {/* Spatial 3D Hero Section */}
          <HeroSection onOpenDemo={() => setIsDemoOpen(true)} />

          {/* Precision Kinetic Ticker */}
          <EditorialTicker />

          {/* Word-by-Word Scroll Scrubbed Manifesto */}
          <TaglineReveal />

          {/* Interactive Staging Engine Workbench */}
          <SpatialPlayground />

          {/* 4 Core Pillars with Bespoke Interactive Showcases */}
          {featureSections.map((section, index) => (
            <FeatureSection
              key={section.id}
              index={index}
              total={featureSections.length}
              {...section}
            />
          ))}

          {/* Closing Studio CTA */}
          <CTASection
            scrollYProgress={scrollYProgress}
            onOpenDemo={() => setIsDemoOpen(true)}
          />

          {/* Comprehensive Studio Footer with 3D Terminal */}
          <Footer onOpenDemo={() => setIsDemoOpen(true)} />
        </main>
      </motion.div>
    </div>
  )
}
