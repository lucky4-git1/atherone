import { lazy, Suspense, useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useScroll } from "framer-motion"
import { Navbar } from "./components/navbar"
import { Footer } from "./components/footer"
import { LoadingScreen } from "./components/ui/loading-screen"
import { WavesOverlay } from "./components/ui/waves-overlay"
import { useNavbarState } from "./hooks/use-navbar-state"
import { HeroSection } from "./sections/hero-section"
import { FeatureSection } from "./sections/feature-section"
import { CTASection } from "./sections/cta-section"

const ShaderAnimation = lazy(() =>
  import("./components/ui/shader-animation").then((module) => ({
    default: module.ShaderAnimation,
  })),
)

const featureSections = [
  {
    id: "signal",
    label: "Signal",
    title: "A product story paced like cinema.",
    description:
      "Each section lands with intent. Perspective, scale, and motion make the interface feel spatial without losing clarity or restraint.",
    accent: "from-sky-500/25 to-transparent",
    align: "left",
    metrics: ["Perspective-led framing", "Measured reveal timing", "Minimal visual noise"],
  },
  {
    id: "focus",
    label: "Focus",
    title: "Designed to keep attention exactly where it matters.",
    description:
      "The narrative advances section by section. Copy and visuals move together so the product remains the hero throughout the scroll.",
    accent: "from-blue-500/25 to-transparent",
    align: "right",
    metrics: ["Progressive content reveal", "Motion as hierarchy", "Clean visual pacing"],
  },
  {
    id: "depth",
    label: "Depth",
    title: "Atmosphere in the background. Clarity in the foreground.",
    description:
      "The shader stays fullscreen and alive underneath everything, adding energy while the UI layers glide through it with subtle parallax.",
    accent: "from-slate-400/20 to-transparent",
    align: "left",
    metrics: ["Fixed immersive shader", "Controlled depth illusion", "60fps-first composition"],
  },
  {
    id: "command",
    label: "Command",
    title: "Built to present serious software with confidence.",
    description:
      "The architecture stays modular, so the page can evolve from campaign site to flagship product reveal without turning into a monolith.",
    accent: "from-sky-400/20 to-transparent",
    align: "right",
    metrics: ["Reusable section engine", "Client-grade modularity", "Performance-conscious motion"],
  },
]

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const mainRef = useRef(null)
  const { scrollY, scrollYProgress } = useScroll({
    target: mainRef,
    offset: ["start start", "end end"],
  })
  const isScrolled = useNavbarState(scrollY, 48)

  useEffect(() => {
    // Fast, responsive 800ms boot sequence for instant gratification without lag
    const duration = 850
    const start = window.performance.now()
    let frameId = 0

    const tick = (now) => {
      const elapsed = now - start
      const rawProgress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const progress = 1 - Math.pow(1 - rawProgress, 3)
      setLoadingProgress(Math.round(progress * 100))

      if (rawProgress < 1) {
        frameId = window.requestAnimationFrame(tick)
      } else {
        setIsLoading(false)
      }
    }

    frameId = window.requestAnimationFrame(tick)

    return () => {
      window.cancelAnimationFrame(frameId)
    }
  }, [])

  return (
    <div className="overflow-x-clip bg-neutral-950 text-white selection:bg-sky-500/30 selection:text-white">
      <AnimatePresence>
        {isLoading ? <LoadingScreen key="loading-screen" progress={loadingProgress} /> : null}
      </AnimatePresence>

      <Suspense fallback={<div className="fixed inset-0 z-0 bg-black" />}>
        <ShaderAnimation scrollYProgress={scrollYProgress} />
      </Suspense>

      <div className="pointer-events-none fixed inset-0 z-[1]">
        <WavesOverlay className="opacity-40" />
        <div className="ambient-noise opacity-10" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_32%,rgba(2,6,23,0.3)_75%,rgba(2,6,23,0.65))]" />
      </div>

      <Navbar isScrolled={isScrolled} />

      <motion.div
        initial={false}
        animate={{
          opacity: isLoading ? 0.35 : 1,
          scale: isLoading ? 0.99 : 1,
        }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
      >
        <main ref={mainRef} className="relative z-10 overflow-x-clip">
          <HeroSection />

          {featureSections.map((section, index) => (
            <FeatureSection
              key={section.id}
              index={index}
              total={featureSections.length}
              {...section}
            />
          ))}

          <CTASection scrollYProgress={scrollYProgress} />
          <Footer />
        </main>
      </motion.div>
    </div>
  )
}
