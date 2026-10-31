import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { soundEngine } from "@/lib/audio-synthesizer"
import { ATHER_DATA } from "@/data/ather-data"

export function AtherArrival({ onOpenDemo }) {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const copyOpacity = useTransform(scrollYProgress, [0, 0.15, 0.65], [0.85, 1, 1])
  const copyY = useTransform(scrollYProgress, [0, 0.2], [15, 0])
  const glowScale = useTransform(scrollYProgress, [0, 1], [0.95, 1.2])

  return (
    <section
      ref={containerRef}
      id="arrival"
      className="relative min-h-[100dvh] flex items-center justify-center px-5 pt-28 pb-16 sm:px-8 sm:pt-32 lg:px-12 overflow-hidden"
    >
      {/* Cinematic Ambient Glow */}
      <motion.div
        style={{ scale: glowScale }}
        className="pointer-events-none absolute left-1/2 top-[42%] h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,229,153,0.12),transparent_70%)] blur-3xl sm:h-[36rem] sm:w-[36rem]"
      />

      <div className="relative z-10 mx-auto max-w-6xl w-full text-center flex flex-col items-center">
        {/* Independent Concept Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-1.5 text-[11px] font-mono uppercase tracking-[0.22em] text-emerald-300"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(0,229,153,1)]" />
          <span>Independent Portfolio Concept // Ather Electric Mobility</span>
        </motion.div>

        {/* Master Editorial Display Headline */}
        <motion.div style={{ opacity: copyOpacity, y: copyY }} className="max-w-5xl">
          <h1 className="text-[clamp(2.8rem,8.5vw,6.4rem)] font-bold tracking-[-0.05em] text-white leading-[0.94] uppercase font-sans">
            Engineered <br />
            <span className="text-white/45">For The Movement.</span>
          </h1>

          <p className="mt-7 max-w-2xl mx-auto text-base text-white/65 sm:text-lg sm:leading-8 font-sans">
            {ATHER_DATA.subheadline}
          </p>
        </motion.div>

        {/* Primary Interaction Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#machine"
            onClick={() => soundEngine.playClick()}
            className="inline-flex items-center gap-2.5 rounded-full border border-emerald-400/50 bg-emerald-500/20 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_0_24px_rgba(0,229,153,0.3)] backdrop-blur-md transition-colors duration-150 hover:bg-emerald-500/30 active:scale-[0.98]"
          >
            <span>Explore the Machine</span>
            <span>→</span>
          </a>

          <a
            href="#intelligence"
            onClick={() => soundEngine.playHover()}
            className="inline-flex items-center rounded-full border border-white/12 bg-white/[0.04] px-7 py-3.5 text-sm font-medium text-white/80 transition-colors duration-150 hover:border-white/25 hover:bg-white/[0.08] hover:text-white active:scale-[0.98]"
          >
            AtherStack™ Cockpit
          </a>

          {onOpenDemo && (
            <button
              type="button"
              onClick={() => {
                soundEngine.playClick()
                onOpenDemo()
              }}
              className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.02] px-4 py-3.5 text-xs font-mono uppercase text-white/50 hover:text-white hover:border-white/20 transition-colors duration-150"
            >
              <span>Project Specs ⌘K</span>
            </button>
          )}
        </motion.div>

        {/* Verified Telemetry Ticker Strip */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 border-t border-white/8 pt-8 max-w-4xl w-full text-left font-mono">
          <div>
            <span className="text-[10px] uppercase text-white/40 block">0 – 40 km/h</span>
            <span className="text-xl sm:text-2xl font-bold text-white mt-1 block">3.3 Sec</span>
            <span className="text-[10px] text-emerald-400 mt-0.5 block">Warp Instant Torque</span>
          </div>

          <div>
            <span className="text-[10px] uppercase text-white/40 block">Peak Torque</span>
            <span className="text-xl sm:text-2xl font-bold text-white mt-1 block">26 Nm</span>
            <span className="text-[10px] text-white/50 mt-0.5 block">From 0 RPM Linear</span>
          </div>

          <div>
            <span className="text-[10px] uppercase text-white/40 block">Certified Range</span>
            <span className="text-xl sm:text-2xl font-bold text-white mt-1 block">150 km</span>
            <span className="text-[10px] text-white/50 mt-0.5 block">3.7 kWh IP67 Battery</span>
          </div>

          <div>
            <span className="text-[10px] uppercase text-white/40 block">Mass Balance</span>
            <span className="text-xl sm:text-2xl font-bold text-white mt-1 block">47:53</span>
            <span className="text-[10px] text-sky-400 mt-0.5 block">Low Polar Inertia</span>
          </div>
        </div>
      </div>
    </section>
  )
}
