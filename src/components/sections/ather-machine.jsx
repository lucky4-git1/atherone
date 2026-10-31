import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ATHER_DATA } from "@/data/ather-data"
import { soundEngine } from "@/lib/audio-synthesizer"
import { ThreeAtherMachine } from "@/components/ui/three-ather-machine"

export function AtherMachine() {
  const [selectedColorway, setSelectedColorway] = useState(ATHER_DATA.colorways[0])
  const [activeHotspotId, setActiveHotspotId] = useState("chassis")
  const [isRotating, setIsRotating] = useState(true)

  const handleSelectColorway = (colorway) => {
    soundEngine.playClick()
    setSelectedColorway(colorway)
  }

  const handleSelectHotspot = (id) => {
    soundEngine.playClick()
    setActiveHotspotId(id)
  }

  const toggleRotation = () => {
    soundEngine.playClick()
    setIsRotating(!isRotating)
  }

  return (
    <section id="machine" className="relative mx-auto max-w-7xl px-6 py-28 sm:px-8 sm:py-36 lg:px-12">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01)),linear-gradient(145deg,rgba(5,8,20,0.95),rgba(2,4,12,0.98))] p-6 sm:p-10 lg:p-14 shadow-[0_30px_100px_rgba(0,0,0,0.6)]">
        <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/35 to-transparent" />

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-8 border-b border-white/8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 text-[11px] font-mono uppercase tracking-[0.24em] text-white/60 mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>Chapter 03 // The Machine</span>
            </div>
            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl font-sans">
              Real-time WebGL physical architecture.
            </h2>
            <p className="mt-3 max-w-xl text-base text-white/65">
              Drag to orbit 360° around the Ather 450 platform. Inspect die-cast aluminum frame geometry, PMSM mid-drive mounting, and select bespoke factory colorways.
            </p>
          </div>

          {/* Colorway Switcher */}
          <div className="flex items-center gap-2 rounded-full border border-white/12 bg-black/40 p-1.5">
            {ATHER_DATA.colorways.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => handleSelectColorway(c)}
                className={`flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors duration-150 ${
                  selectedColorway.id === c.id
                    ? "bg-white/15 text-white shadow-inner border border-white/20"
                    : "text-white/50 hover:text-white"
                }`}
              >
                <span
                  style={{ backgroundColor: c.hex }}
                  className="h-2.5 w-2.5 rounded-full border border-white/30"
                />
                <span>{c.name.split(" ")[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 3D WebGL Viewport & Callout HUD */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1.35fr_0.65fr] gap-8 items-center">
          {/* Three.js Interactive Canvas Container */}
          <div className="relative h-[26rem] sm:h-[32rem] lg:h-[38rem] rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_50%_35%,rgba(15,23,42,0.6),rgba(2,6,15,0.98)_80%)] overflow-hidden flex flex-col justify-between">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,229,153,0.06),transparent_65%)]" />

            {/* Stage HUD Top Bar */}
            <div className="z-10 px-6 pt-6 flex items-center justify-between text-[11px] font-mono text-white/50">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(0,229,153,0.8)]" />
                <span>THREE.JS 3D STAGE // PBR MATERIALS</span>
              </div>

              <button
                type="button"
                onClick={toggleRotation}
                className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[10px] font-mono uppercase text-white/70 hover:text-white hover:bg-white/10 transition-colors duration-150"
              >
                {isRotating ? "Pause Spin" : "Auto Spin"}
              </button>
            </div>

            {/* Three.js Canvas */}
            <div className="relative flex-1 w-full h-full min-h-0">
              <ThreeAtherMachine
                selectedColorwayId={selectedColorway.id}
                activeHotspotId={activeHotspotId}
                onSelectHotspot={handleSelectHotspot}
                isRotating={isRotating}
              />
            </div>

            {/* Bottom Orbit Guidance */}
            <div className="z-10 pb-5 px-6 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-white/35 border-t border-white/6 pt-3">
              <span>Drag to orbit complete 3D scooter</span>
              <span>Click 3D pins to focus camera</span>
            </div>
          </div>

          {/* Interactive Hardware Subsystem Details Card */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-white/50 border-b border-white/8 pb-2">
              <span>Subsystem Architecture</span>
              <span className="text-emerald-400 font-semibold">{selectedColorway.tag}</span>
            </div>

            <div className="space-y-3">
              {ATHER_DATA.hardwareDetails.map((item) => {
                const isActive = activeHotspotId === item.id
                return (
                  <div
                    key={item.id}
                    onClick={() => handleSelectHotspot(item.id)}
                    className={`p-4 rounded-2xl border transition-colors duration-150 cursor-pointer ${
                      isActive
                        ? "border-emerald-400/50 bg-emerald-500/10 shadow-[0_4px_20px_rgba(0,229,153,0.15)]"
                        : "border-white/8 bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                        {item.category}
                      </span>
                      <span className="font-mono text-[10px] text-white/50">{item.metric}</span>
                    </div>

                    <h4 className="mt-1 text-sm font-semibold text-white font-sans">
                      {item.title}
                    </h4>

                    <AnimatePresence>
                      {isActive && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="mt-2.5 text-xs text-white/70 leading-relaxed overflow-hidden font-sans"
                        >
                          {item.description}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>

            <div className="pt-2">
              <a
                href="#details"
                onClick={() => soundEngine.playClick()}
                className="block w-full rounded-full border border-emerald-400/40 bg-emerald-500/20 py-3 text-center text-xs font-semibold uppercase tracking-wider text-white shadow-[0_4px_16px_rgba(0,229,153,0.2)] hover:bg-emerald-500/30 transition-colors duration-150"
              >
                Inspect Hardware Engineering →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
