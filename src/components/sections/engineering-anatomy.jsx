import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { soundEngine } from "@/lib/audio-synthesizer"

export function EngineeringAnatomy() {
  const [activeLayer, setActiveLayer] = useState("transducer")

  const layers = [
    {
      id: "transducer",
      number: "01",
      title: "Planar Transducer Engine",
      subtitle: "2-Micron Polyimide Diaphragm",
      specs: [
        { label: "Diaphragm Substrate", val: "2.0 µm Polyimide" },
        { label: "Motor Structure", val: "Push-Pull N52 Neodymium" },
        { label: "Magnetic Flux", val: "1.2 Tesla Uniform" },
        { label: "Trace Conductor", val: "Vapor-Deposited Aluminum" },
      ],
      description:
        "Unlike conventional cone drivers driven from a central voice coil, our planar-magnetic diaphragm is energized evenly across its full 45mm surface. This eliminates modal cone breakup, keeping phase distortion under 0.05% even at high acoustic pressure.",
    },
    {
      id: "acoustic-cavity",
      number: "02",
      title: "Dual Damping Chambers",
      subtitle: "Acoustic Back-Wave Dissipation",
      specs: [
        { label: "Chamber Volume", val: "42 cm³ Tuned Cavity" },
        { label: "Damping Material", val: "Open-Cell Sintered Felt" },
        { label: "Porting Geometry", val: "Aperiodic Resistive Slot" },
        { label: "Standing Waves", val: "-38 dB Attenuation" },
      ],
      description:
        "Rear acoustic pressure waves inside earcups reflect back through the driver, blurring transient notes. Our dual-chamber architecture channels rear energy through laser-cut micro-perforations into an internal dissipative chamber.",
    },
    {
      id: "rotary-crown",
      number: "03",
      title: "Continuous Rotary Crown",
      subtitle: "Micro-Knurled Physical Dial",
      specs: [
        { label: "Material", val: "Aircraft 6063 Aluminum" },
        { label: "Encoder Resolution", val: "128 Counts / Revolution" },
        { label: "Tactile Feedback", val: "Calibrated Micro-Detents" },
        { label: "Mute Mechanism", val: "Physical Gold-Contact Slider" },
      ],
      description:
        "Touch surfaces fail in high-focus creative sessions. Aether One features a knurled rotary crown providing stepless volume adjustment with subtle tactile detents and a positive-action mechanical mute slider.",
    },
    {
      id: "chassis-gimbal",
      number: "04",
      title: "Silent Friction Gimbal",
      subtitle: "CNC Magnesium Unibody",
      specs: [
        { label: "Alloy Composition", val: "AZ91D Magnesium-Aluminum" },
        { label: "Bearing Type", val: "PTFE Self-Lubricating Bushing" },
        { label: "Clamping Force", val: "4.2 Newtons Distributed" },
        { label: "Mechanical Creak", val: "0 dB Measured Microphonics" },
      ],
      description:
        "Headphone creak disrupts critical listening. We CNC-machine the complete yoke assembly from a single billet of magnesium-aluminum, seated on dual PTFE friction washers for silent articulated positioning.",
    },
  ]

  const activeData = layers.find((l) => l.id === activeLayer) || layers[0]

  return (
    <section id="anatomy" className="relative mx-auto max-w-7xl px-6 py-28 sm:px-8 sm:py-36 lg:px-12">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01)),linear-gradient(145deg,rgba(5,9,22,0.95),rgba(2,4,14,0.98))] p-8 sm:p-12 lg:p-16 shadow-[0_30px_100px_rgba(0,0,0,0.6)]">
        <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/35 to-transparent" />

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-8 border-b border-white/8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 text-[11px] font-mono uppercase tracking-[0.22em] text-white/60 mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
              <span>Section 04 // Engineering Deep Dive</span>
            </div>
            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
              Micro-mechanics of acoustic transparency.
            </h2>
            <p className="mt-3 max-w-xl text-base text-white/65">
              Select each structural tier to inspect how precision CNC machining and planar acoustics isolate pure signal from mechanical noise.
            </p>
          </div>

          <div className="font-mono text-xs text-white/40">
            TOLERANCE SPEC: ±0.015MM
          </div>
        </div>

        {/* Layer Selector Tabs */}
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3">
          {layers.map((layer) => (
            <button
              key={layer.id}
              type="button"
              onClick={() => {
                soundEngine.playClick()
                setActiveLayer(layer.id)
              }}
              className={`p-4 rounded-2xl border text-left transition-all ${
                activeLayer === layer.id
                  ? "border-sky-400/50 bg-sky-500/15 text-white shadow-inner"
                  : "border-white/8 bg-white/[0.02] text-white/50 hover:border-white/15 hover:text-white"
              }`}
            >
              <div className="flex items-center justify-between text-xs font-mono">
                <span className={activeLayer === layer.id ? "text-sky-300 font-bold" : "text-white/40"}>
                  {layer.number}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-current opacity-60" />
              </div>
              <p className="mt-3 text-sm font-semibold text-white truncate">{layer.title}</p>
              <p className="text-[11px] font-mono text-white/40 uppercase tracking-wider truncate mt-0.5">
                {layer.subtitle}
              </p>
            </button>
          ))}
        </div>

        {/* Selected Layer Technical Detail Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeData.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="mt-8 rounded-2xl border border-white/10 bg-black/50 p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 items-center"
          >
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-500/10 px-3 py-1 text-[11px] font-mono text-sky-300">
                <span>COMPONENT TIER: {activeData.number}</span>
              </div>

              <h3 className="mt-4 text-2xl sm:text-3xl font-bold tracking-tight text-white">
                {activeData.title}
              </h3>
              <p className="mt-1 text-xs font-mono uppercase tracking-wider text-white/50">
                {activeData.subtitle}
              </p>

              <p className="mt-5 text-sm sm:text-base text-white/70 leading-relaxed">
                {activeData.description}
              </p>
            </div>

            {/* Spec readout matrix */}
            <div className="rounded-xl border border-white/8 bg-white/[0.02] p-5 space-y-3 font-mono text-xs">
              <h4 className="text-white/40 uppercase tracking-wider border-b border-white/8 pb-2">
                Mechanical Telemetry
              </h4>
              {activeData.specs.map((s, idx) => (
                <div key={idx} className="flex items-center justify-between py-1 border-b border-white/4 last:border-0">
                  <span className="text-white/60">{s.label}</span>
                  <span className="text-white font-medium">{s.val}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
