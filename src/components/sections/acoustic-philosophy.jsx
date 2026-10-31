import { motion } from "framer-motion"
import { soundEngine } from "@/lib/audio-synthesizer"

export function AcousticPhilosophy() {
  const pillars = [
    {
      num: "01",
      title: "Uniform Planar Wavefronts",
      subtitle: "Eliminating cone breakup distortion",
      desc: "Traditional dynamic drivers push air from a single central voice coil, causing micro-flexing and harmonic distortion. Aether One's 45mm planar diaphragm is driven uniformly across its entire surface by dual neodymium arrays, yielding linear phase alignment.",
      metric: "< 0.05% THD",
    },
    {
      num: "02",
      title: "CNC Magnesium Unibody",
      subtitle: "Zero structural resonance",
      desc: "Plastics resonate at critical audible mid-range frequencies. We machine every gimbal and acoustic shell from an ultra-dense magnesium-aluminum alloy, dampening internal reflections and delivering absolute transient clarity.",
      metric: "385g Mass",
    },
    {
      num: "03",
      title: "Passive Zero-Latency Bypass",
      subtitle: "Direct analog transducer control",
      desc: "When connected via balanced 4.4mm Pentaconn or 3.5mm analog input, all active DSP and Bluetooth hardware is completely bypassed. The planar motor receives pure analog voltage directly from your dedicated amplifier.",
      metric: "0.0ms Latency",
    },
  ]

  return (
    <section id="philosophy" className="relative mx-auto max-w-7xl px-6 py-28 sm:px-8 sm:py-36 lg:px-12">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01)),linear-gradient(145deg,rgba(6,10,24,0.9),rgba(2,4,14,0.95))] p-8 sm:p-12 lg:p-16 shadow-[0_30px_100px_rgba(0,0,0,0.5)]">
        <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/35 to-transparent" />

        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 text-[11px] font-mono uppercase tracking-[0.22em] text-white/60 mb-5">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
            <span>Section 02 // Acoustic Architecture</span>
          </div>

          <h2 className="text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl leading-[1.05]">
            Sound, uncolored. <br />
            <span className="text-white/50">Physics, uncompromised.</span>
          </h2>

          <p className="mt-6 text-base text-white/70 sm:text-lg leading-relaxed">
            Most consumer audio artificially boosts resonant frequencies to disguise driver limitations. Aether One was designed from the transducer outwards to preserve the natural timbral decay of recorded instruments with uncolored studio transparency.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 border-t border-white/8 pt-12">
          {pillars.map((pillar) => (
            <motion.div
              key={pillar.num}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              onMouseEnter={() => soundEngine.playHover()}
              className="rounded-2xl border border-white/8 bg-white/[0.02] p-6 lg:p-7 flex flex-col justify-between hover:border-white/16 hover:bg-white/[0.04] transition-all"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/6">
                  <span className="font-mono text-xs text-sky-400/80 font-semibold">{pillar.num}</span>
                  <span className="rounded-full bg-white/6 px-2.5 py-0.5 font-mono text-[10px] text-white/60">
                    {pillar.metric}
                  </span>
                </div>

                <h3 className="mt-5 text-lg font-semibold tracking-tight text-white">
                  {pillar.title}
                </h3>
                <p className="text-xs font-mono text-white/45 uppercase tracking-wider mt-1">
                  {pillar.subtitle}
                </p>

                <p className="mt-4 text-xs sm:text-sm text-white/65 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/6 flex items-center justify-between text-[11px] font-mono text-white/40">
                <span>ACOUSTIC STANDARD</span>
                <span className="text-emerald-400/80">LAB VERIFIED</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Real-world Frequency Range Banner */}
        <div className="mt-10 rounded-2xl border border-white/8 bg-black/40 p-5 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-white/60">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            <span>FREQUENCY RESPONSE: 10 Hz – 48,000 Hz LINEAR</span>
          </div>
          <div className="flex items-center gap-4 text-white/40">
            <span>IMPEDANCE: 32 OHMS</span>
            <span>SENSITIVITY: 98 dB / 1mW</span>
            <span className="text-sky-400/80">PASSIVE ANALOG COMPLIANT</span>
          </div>
        </div>
      </div>
    </section>
  )
}
