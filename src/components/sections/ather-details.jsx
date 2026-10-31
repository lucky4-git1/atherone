import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ATHER_DATA } from "@/data/ather-data"
import { soundEngine } from "@/lib/audio-synthesizer"

export function AtherDetails() {
  const [activeComponentId, setActiveComponentId] = useState("chassis")

  const componentDetails = {
    chassis: {
      title: "Hybrid Die-Cast Aluminum Monocoque",
      subtitle: "Structural Torsional Stiffness",
      specs: [
        { label: "Material Composition", value: "A383 High-Tensile Die-Cast Aluminum" },
        { label: "Front-to-Rear Distribution", value: "47% Front / 53% Rear" },
        { label: "Center of Mass", value: "Under-Floor Battery Axis" },
        { label: "Frame Flex Resistance", value: "+38% vs Tubular Steel Commuters" },
      ],
      description:
        "The Ather chassis marries a die-cast aluminum subframe with a high-tensile steel trellis spine. By placing the heavy lithium battery pack horizontally beneath the rider's feet, the center of gravity drops significantly, granting neutral cornering turn-in and effortless low-speed balance.",
    },
    motor: {
      title: "Permanent Magnet Synchronous Motor (PMSM)",
      subtitle: "Mid-Drive Central Propulsion",
      specs: [
        { label: "Peak Power Output", value: "6.4 kW @ 5,000 RPM" },
        { label: "Instant Wheel Torque", value: "26 Nm Linear from 0 RPM" },
        { label: "Transmission Type", value: "Gates Carbon-Fiber Reinforced Belt" },
        { label: "Water & Dust Rating", value: "IP66 High-Pressure Wash Ingress" },
      ],
      description:
        "Unlike hub motors mounted inside wheels that increase unsprung mass and degrade ride quality, Ather mounts its PMSM motor centrally within the chassis frame. Torque is delivered instantaneously through a high-efficiency Gates carbon synchronous belt that requires zero lubrication or adjustment.",
    },
    battery: {
      title: "IP67 Sealed Lithium-ion Battery Pack",
      subtitle: "Thermal Potting & Waterproof Protection",
      specs: [
        { label: "Installed Capacity", value: "3.7 kWh Nominal Storage" },
        { label: "Certified Ingress", value: "IP67 (Submersible to 1 meter)" },
        { label: "Thermal Dissipation", value: "Aluminum Heat Sink Enclosure" },
        { label: "Cell Configuration", value: "High-Energy NMC Chemistry" },
      ],
      description:
        "The battery pack is the heart of the scooter, engineered inside a sealed die-cast aluminum enclosure with structural active potting that absorbs road shocks. It is certified IP67 to withstand flooded city roads and monsoonal deluges without electrical shorts or degradation.",
    },
    cockpit: {
      title: "7.0-Inch Capacitive Touchscreen Cockpit",
      subtitle: "AtherStack™ Connected Intelligence",
      specs: [
        { label: "Display Diagonal", value: "7.0\" Color TFT Multi-Touch" },
        { label: "Display Durability", value: "IP65 Weatherproof Bonded Glass" },
        { label: "Processor Platform", value: "Snapdragon Quad-Core CPU" },
        { label: "Operating System", value: "AtherStack™ 6.0 Real-Time OS" },
      ],
      description:
        "Mounted securely behind the front handlebar fairing, the optically bonded touchscreen display remains readable under harsh tropical sunlight. It handles navigation, live range computation, and OTA vehicle updates natively without requiring smartphone screen mirroring.",
    },
    regenerative: {
      title: "Magic Twist™ Electronic Braking",
      subtitle: "Kinetic Recuperation via Reverse Throttle",
      specs: [
        { label: "Deceleration Control", value: "Reverse Twist Throttle Grip" },
        { label: "Brake Pad Wear Reduction", value: "Up to 40% Extended Lifespan" },
        { label: "Energy Recuperation", value: "Progressive Battery Regeneration" },
        { label: "Slope Operation", value: "Brings vehicle to complete standstill" },
      ],
      description:
        "Rolling off the throttle past neutral activates the PMSM motor's regenerative braking phase. It progressively retards forward momentum, transferring kinetic energy back into the lithium pack while coming to a complete stop even on downward slopes without squeezing hydraulic levers.",
    },
  }

  const activeData = componentDetails[activeComponentId] || componentDetails.chassis

  return (
    <section id="details" className="relative mx-auto max-w-7xl px-6 py-28 sm:px-8 sm:py-36 lg:px-12">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01)),linear-gradient(145deg,rgba(5,9,22,0.95),rgba(2,4,14,0.98))] p-8 sm:p-12 lg:p-16 shadow-[0_30px_100px_rgba(0,0,0,0.6)]">
        <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/35 to-transparent" />

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-8 border-b border-white/8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 text-[11px] font-mono uppercase tracking-[0.24em] text-white/60 mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>Chapter 04 // The Details</span>
            </div>
            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl font-sans">
              Mechanical &amp; electrical anatomy.
            </h2>
            <p className="mt-3 max-w-xl text-base text-white/65">
              Select each component tier to inspect how precision die-cast aluminum, mid-drive propulsion, and sealed lithium storage form a cohesive machine.
            </p>
          </div>

          <div className="font-mono text-xs text-white/40">
            ENGINEERING TOLERANCE: ±0.02MM
          </div>
        </div>

        {/* Component Selector Tabs */}
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-5 gap-3">
          {[
            { id: "chassis", label: "Aluminum Chassis", tag: "Structure" },
            { id: "motor", label: "PMSM Motor", tag: "Propulsion" },
            { id: "battery", label: "IP67 Battery", tag: "Storage" },
            { id: "cockpit", label: "7\" Touchscreen", tag: "Interface" },
            { id: "regenerative", label: "Magic Twist™", tag: "Recuperation" },
          ].map((tab) => {
            const isSelected = activeComponentId === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  soundEngine.playClick()
                  setActiveComponentId(tab.id)
                }}
                className={`p-4 rounded-2xl border text-left transition-colors duration-150 ${
                  isSelected
                    ? "border-emerald-400/50 bg-emerald-500/15 text-white shadow-inner"
                    : "border-white/8 bg-white/[0.02] text-white/50 hover:border-white/15 hover:text-white"
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className={isSelected ? "text-emerald-300 font-bold" : "text-white/40"}>
                    {tab.tag}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-current opacity-60" />
                </div>
                <p className="mt-3 text-sm font-semibold text-white truncate font-sans">
                  {tab.label}
                </p>
              </button>
            )
          })}
        </div>

        {/* Selected Component Technical Telemetry Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeData.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="mt-8 rounded-2xl border border-white/10 bg-black/50 p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 items-center"
          >
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-mono text-emerald-300">
                <span>VERIFIED PLATFORM ARCHITECTURE</span>
              </div>

              <h3 className="mt-4 text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans">
                {activeData.title}
              </h3>
              <p className="mt-1 text-xs font-mono uppercase tracking-wider text-white/50">
                {activeData.subtitle}
              </p>

              <p className="mt-5 text-sm sm:text-base text-white/70 leading-relaxed font-sans">
                {activeData.description}
              </p>
            </div>

            {/* Spec Matrix */}
            <div className="rounded-xl border border-white/8 bg-white/[0.02] p-5 space-y-3 font-mono text-xs">
              <h4 className="text-white/40 uppercase tracking-wider border-b border-white/8 pb-2">
                Engineering Specifications
              </h4>
              {activeData.specs.map((s, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between py-1.5 border-b border-white/4 last:border-0"
                >
                  <span className="text-white/60">{s.label}</span>
                  <span className="text-white font-medium">{s.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
