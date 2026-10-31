import { lazy, Suspense, useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useScroll } from "framer-motion"
import { BagProvider } from "./context/bag-context"
import { ShoppingBagDrawer } from "./components/bag/shopping-bag-drawer"
import { DemoCheckoutModal } from "./components/bag/demo-checkout-modal"
import { Navbar } from "./components/navbar"
import { Footer } from "./components/footer"
import { LoadingScreen } from "./components/ui/loading-screen"
import { WavesOverlay } from "./components/ui/waves-overlay"
import { CustomCursor } from "./components/ui/custom-cursor"
import { EditorialTicker } from "./components/ui/editorial-ticker"
import { TaglineReveal } from "./components/ui/tagline-reveal"
import { DemoModal } from "./components/ui/demo-modal"
import { useNavbarState } from "./hooks/use-navbar-state"
import { HeroSection } from "./sections/hero-section"
import { AcousticPhilosophy } from "./components/sections/acoustic-philosophy"
import { InteractiveInspector } from "./components/sections/interactive-inspector"
import { EngineeringAnatomy } from "./components/sections/engineering-anatomy"
import { AuditionLab } from "./components/sections/audition-lab"
import { ProductCustomizer } from "./components/sections/product-customizer"
import { ComparisonMatrix } from "./components/sections/comparison-matrix"
import { SpecificationsTable } from "./components/sections/specifications-table"
import { SupportAndCare } from "./components/sections/support-and-care"
import { CTASection } from "./sections/cta-section"
import { soundEngine } from "./lib/audio-synthesizer"

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
    <BagProvider>
      <div className="relative overflow-x-clip bg-[#02050e] text-white selection:bg-sky-500/25 selection:text-white">
        {/* Accessible skip link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-sky-400 focus:text-black focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:font-bold focus:shadow-lg focus:outline-none"
        >
          Skip to content
        </a>

        {/* Fine-pointer trailing custom cursor */}
        <CustomCursor />

        {/* Cinematic Monolith Aperture Loader */}
        <AnimatePresence>
          {isLoading ? <LoadingScreen key="loading-screen" progress={loadingProgress} /> : null}
        </AnimatePresence>

        {/* Studio Inquiry Demo Modal */}
        <DemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />

        {/* Interactive Shopping Bag Slide-Over Drawer */}
        <ShoppingBagDrawer />

        {/* Complete Simulated Prototype Checkout Modal */}
        <DemoCheckoutModal />

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
          <main id="main-content" ref={mainRef} className="relative z-10 overflow-x-clip">
            {/* Section 01: Spatial 3D Hero */}
            <HeroSection onOpenDemo={() => setIsDemoOpen(true)} />

            {/* Precision Kinetic Audio Hardware Ticker */}
            <EditorialTicker />

            {/* Acoustic Manifesto Word-by-Word Scrubbed Typography */}
            <TaglineReveal />

            {/* Section 02: Acoustic Philosophy & Architecture */}
            <AcousticPhilosophy />

            {/* Section 03: 3D Hardware Inspector & Turntable */}
            <InteractiveInspector />

            {/* Section 04: Engineering Anatomy Deep Dive */}
            <EngineeringAnatomy />

            {/* Section 05: Sound Audition Lab with Live Oscilloscope */}
            <AuditionLab />

            {/* Section 06: Finish Customizer & Bag Integration */}
            <ProductCustomizer />

            {/* Section 07: Standard vs Studio Reference Comparison Matrix */}
            <ComparisonMatrix />

            {/* Section 08: Technical Specifications Grid */}
            <SpecificationsTable />

            {/* Section 09: Longevity, Repairability & FAQ */}
            <SupportAndCare />

            {/* Section 10: Closing Studio CTA */}
            <CTASection
              scrollYProgress={scrollYProgress}
              onOpenDemo={() => setIsDemoOpen(true)}
            />

            {/* Comprehensive Studio Footer */}
            <Footer onOpenDemo={() => setIsDemoOpen(true)} />
          </main>
        </motion.div>
      </div>
    </BagProvider>
  )
}
