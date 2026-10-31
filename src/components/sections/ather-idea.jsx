import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { soundEngine } from "@/lib/audio-synthesizer"

const MANIFESTO_WORDS = [
  "Mobility",
  "is",
  "not",
  "mere",
  "transportation.",
  "It",
  "is",
  "the",
  "physical",
  "dialogue",
  "between",
  "machine,",
  "rider,",
  "and",
  "the",
  "urban",
  "grid.",
  "We",
  "strip",
  "away",
  "combustion",
  "friction,",
  "anchoring",
  "instantaneous",
  "torque",
  "into",
  "an",
  "aluminum",
  "monocoque",
  "engineered",
  "for",
  "precision",
  "flow.",
]

function ManifestoWord({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.18, 1])
  const y = useTransform(progress, range, [6, 0])

  return (
    <span className="relative inline-block mr-[0.3em] last:mr-0">
      <motion.span style={{ opacity, y }} className="inline-block transition-colors duration-200">
        {children}
      </motion.span>
    </span>
  )
}

export function AtherIdea() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.35"],
  })

  const tenets = [
    {
      num: "01",
      title: "Structural Honesty",
      subtitle: "Die-cast aluminum integrity",
      desc: "Unlike mass-market commuters wrapped in fragile decorative plastics, the Ather platform exposes its cast-aluminum subframe as functional visual geometry. Every structural member resists twisting while maintaining a featherlight 111.6 kg mass.",
      stat: "Zero Frame Flex",
    },
    {
      num: "02",
      title: "Instantaneous Kinetic Energy",
      subtitle: "Zero transmission delay",
      desc: "Internal combustion engines waste critical seconds building RPM through gears. The permanent magnet mid-drive releases its entire 26 Nm torque curve from 0 RPM through a silent Gates carbon belt, producing immediate forward impulse.",
      stat: "26 Nm @ 0 RPM",
    },
    {
      num: "03",
      title: "Connected Intelligence",
      subtitle: "AtherStack™ 6.0 operating system",
      desc: "Hardware without software is inert. Onboard Snapdragon processing evaluates cell temperatures, lean angles, and regenerative reverse-twist deceleration in real time, serving turn-by-turn routes on a sunlight-readable dashboard.",
      stat: "Snapdragon Quad-Core",
    },
  ]

  return (
    <section id="idea" ref={containerRef} className="relative mx-auto max-w-7xl px-6 py-28 sm:px-8 sm:py-36 lg:px-12">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01)),linear-gradient(145deg,rgba(5,9,22,0.95),rgba(2,4,14,0.98))] p-8 sm:p-12 lg:p-16 shadow-[0_30px_100px_rgba(0,0,0,0.6)]">
        <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/35 to-transparent" />

        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/8 pb-6 mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 text-[11px] font-mono uppercase tracking-[0.24em] text-white/60">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>Chapter 02 // The Kinetic Philosophy</span>
          </div>

          <div className="font-mono text-xs text-white/40">
            <span>ELECTRIC URBAN ARCHITECTURE</span>
          </div>
        </div>

        {/* Scroll-Scrubbed Editorial Headline */}
        <h2 className="max-w-5xl text-3xl font-semibold leading-[1.12] tracking-[-0.045em] text-white sm:text-4xl md:text-5xl lg:text-6xl font-sans">
          {MANIFESTO_WORDS.map((word, i) => {
            const start = i / MANIFESTO_WORDS.length
            const end = start + 1 / MANIFESTO_WORDS.length
            return (
              <ManifestoWord key={`${word}-${i}`} progress={scrollYProgress} range={[start, end]}>
                {word}
              </ManifestoWord>
            )
          })}
        </h2>

        {/* 3 Core Tenets */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-white/8 pt-12">
          {tenets.map((tenet) => (
            <div
              key={tenet.num}
              onMouseEnter={() => soundEngine.playHover()}
              className="rounded-2xl border border-white/8 bg-white/[0.02] p-6 sm:p-7 flex flex-col justify-between hover:border-white/16 hover:bg-white/[0.04] transition-colors duration-150"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-white/6">
                  <span className="font-mono text-xs text-emerald-400 font-semibold">{tenet.num}</span>
                  <span className="font-mono text-[10px] text-white/50 uppercase">{tenet.stat}</span>
                </div>

                <h3 className="mt-4 text-lg font-semibold tracking-tight text-white font-sans">
                  {tenet.title}
                </h3>
                <p className="text-xs font-mono text-white/45 uppercase tracking-wider mt-0.5">
                  {tenet.subtitle}
                </p>

                <p className="mt-4 text-xs sm:text-sm text-white/65 leading-relaxed font-sans">
                  {tenet.desc}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-white/6 font-mono text-[10px] text-white/40 flex justify-between">
                <span>PLATFORM STANDARD</span>
                <span className="text-emerald-400">VERIFIED SPEC</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
