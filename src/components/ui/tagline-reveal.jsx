import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

const WORDS = [
  "Interfaces",
  "engineered",
  "without",
  "compromise.",
  "We",
  "fuse",
  "spatial",
  "depth,",
  "sixty",
  "frames",
  "per",
  "second",
  "kinetic",
  "rhythm,",
  "and",
  "ruthless",
  "architectural",
  "restraint",
  "into",
  "software",
  "built",
  "to",
  "dominate",
  "the",
  "screen.",
]

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.18, 1])
  const y = useTransform(progress, range, [6, 0])

  return (
    <span className="relative inline-block mr-[0.32em] last:mr-0">
      <motion.span
        style={{ opacity, y }}
        className="inline-block transition-colors duration-200"
      >
        {children}
      </motion.span>
    </span>
  )
}

export function TaglineReveal() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.35"],
  })

  return (
    <section
      ref={containerRef}
      className="relative mx-auto max-w-7xl px-6 py-28 sm:px-8 sm:py-36 lg:px-12"
      style={{ contain: "layout paint" }}
    >
      <div className="relative rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01)),linear-gradient(145deg,rgba(6,10,24,0.92),rgba(2,5,16,0.98))] p-8 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_24px_80px_rgba(0,0,0,0.5)] sm:p-14 lg:p-20">
        <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

        <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/8 pb-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 text-[10px] font-mono uppercase tracking-[0.26em] text-white/60">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
            <span>01 // Architecture Manifesto</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-white/40">
            <span>DISPATCH: PROD_V2</span>
            <span>•</span>
            <span>FRAME ACCELERATED</span>
          </div>
        </div>

        <h2 className="max-w-5xl text-3xl font-semibold leading-[1.12] tracking-[-0.045em] text-white sm:text-4xl md:text-5xl lg:text-6xl">
          {WORDS.map((word, i) => {
            const start = i / WORDS.length
            const end = start + 1 / WORDS.length
            return (
              <Word key={`${word}-${i}`} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            )
          })}
        </h2>

        <div className="mt-14 grid gap-6 border-t border-white/8 pt-8 sm:grid-cols-3">
          <div>
            <p className="text-[11px] font-mono uppercase tracking-wider text-white/40">Response Benchmark</p>
            <p className="mt-2 text-2xl font-semibold tracking-tight text-white">&lt; 8ms</p>
            <p className="mt-1 text-xs text-white/55">Global edge latency dispatch with zero layout shifts</p>
          </div>
          <div>
            <p className="text-[11px] font-mono uppercase tracking-wider text-white/40">Runtime Budget</p>
            <p className="mt-2 text-2xl font-semibold tracking-tight text-white">60 FPS Flat</p>
            <p className="mt-1 text-xs text-white/55">Zero dropped frames on sustained gesture interactions</p>
          </div>
          <div>
            <p className="text-[11px] font-mono uppercase tracking-wider text-white/40">Visual Integrity</p>
            <p className="mt-2 text-2xl font-semibold tracking-tight text-white">100% Native</p>
            <p className="mt-1 text-xs text-white/55">Hardware compositor-first rendering architecture</p>
          </div>
        </div>
      </div>
    </section>
  )
}
