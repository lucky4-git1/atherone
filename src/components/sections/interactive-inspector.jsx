import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useBag } from "@/context/bag-context"
import { PRODUCT_DATA } from "@/data/product-data"
import { soundEngine } from "@/lib/audio-synthesizer"

export function InteractiveInspector() {
  const { selectedFinish, setFinishById, addToBag } = useBag()
  const [selectedCallout, setSelectedCallout] = useState(PRODUCT_DATA.anatomyCallouts[0])
  const [isRotating, setIsRotating] = useState(true)
  const [rotationAngle, setRotationAngle] = useState(25)
  const isDraggingRef = useRef(false)
  const startXRef = useRef(0)

  // Turntable animation loop
  useEffect(() => {
    let animId
    const spin = () => {
      if (isRotating && !isDraggingRef.current) {
        setRotationAngle((prev) => (prev + 0.35) % 360)
      }
      animId = requestAnimationFrame(spin)
    }
    animId = requestAnimationFrame(spin)
    return () => cancelAnimationFrame(animId)
  }, [isRotating])

  const handlePointerDown = (e) => {
    isDraggingRef.current = true
    startXRef.current = e.clientX || (e.touches && e.touches[0].clientX) || 0
  }

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return
    const currentX = e.clientX || (e.touches && e.touches[0].clientX) || 0
    const delta = currentX - startXRef.current
    setRotationAngle((prev) => (prev + delta * 0.4 + 360) % 360)
    startXRef.current = currentX
  }

  const handlePointerUp = () => {
    isDraggingRef.current = false
  }

  // Visual cues based on selected finish
  const finishStyles = {
    obsidian: {
      chassis: "from-[#1a1f2c] via-[#0d1017] to-[#05070a]",
      accentRing: "#38bdf8",
      cushion: "#12151c",
      metalTrim: "#475569",
    },
    silver: {
      chassis: "from-[#e2e8f0] via-[#cbd5e1] to-[#94a3b8]",
      accentRing: "#64748b",
      cushion: "#334155",
      metalTrim: "#f8fafc",
    },
    sand: {
      chassis: "from-[#d5c7b3] via-[#bfae98] to-[#9c8971]",
      accentRing: "#d97706",
      cushion: "#292524",
      metalTrim: "#fef3c7",
    },
  }[selectedFinish.id] || {
    chassis: "from-[#1a1f2c] via-[#0d1017] to-[#05070a]",
    accentRing: "#38bdf8",
    cushion: "#12151c",
    metalTrim: "#475569",
  }

  return (
    <section id="inspector" className="relative mx-auto max-w-7xl px-6 py-28 sm:px-8 sm:py-36 lg:px-12">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01)),linear-gradient(145deg,rgba(5,8,20,0.95),rgba(2,4,12,0.98))] p-6 sm:p-10 lg:p-14 shadow-[0_30px_100px_rgba(0,0,0,0.6)]">
        <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/35 to-transparent" />

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-8 border-b border-white/8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 text-[11px] font-mono uppercase tracking-[0.22em] text-white/60 mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
              <span>Section 03 // 3D Hardware Inspector</span>
            </div>
            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
              Inspect the physical architecture.
            </h2>
            <p className="mt-3 max-w-xl text-base text-white/65">
              Drag to rotate 360°, inspect individual acoustic subsystems, and select bespoke finishes in real time.
            </p>
          </div>

          {/* Finish Quick Switcher */}
          <div className="flex items-center gap-2 rounded-full border border-white/12 bg-black/40 p-1.5">
            {PRODUCT_DATA.finishes.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFinishById(f.id)}
                className={`flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                  selectedFinish.id === f.id
                    ? "bg-white/15 text-white shadow-inner border border-white/20"
                    : "text-white/50 hover:text-white"
                }`}
              >
                <span
                  style={{ backgroundColor: f.hex }}
                  className="h-2.5 w-2.5 rounded-full border border-white/30"
                />
                <span>{f.name.split(" ")[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Turntable Viewport */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-8 items-center">
          {/* 3D Stage Simulation Canvas */}
          <div
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            className="relative h-[24rem] sm:h-[30rem] lg:h-[34rem] rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_50%_35%,rgba(30,41,59,0.5),rgba(2,6,15,0.95)_75%)] overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
          >
            {/* Ambient Lighting Rings */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.06),transparent_65%)]" />

            {/* Stage HUD Top Bar */}
            <div className="pointer-events-none absolute left-6 top-6 right-6 flex items-center justify-between text-[11px] font-mono text-white/45">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                <span>360° TURNTABLE // {rotationAngle.toFixed(0)}°</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    soundEngine.playClick()
                    setIsRotating(!isRotating)
                  }}
                  className="pointer-events-auto rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-0.5 text-[10px] text-white/70 hover:text-white hover:bg-white/10"
                >
                  {isRotating ? "PAUSE ROTATION" : "RESUME SPIN"}
                </button>
              </div>
            </div>

            {/* Simulated Headphone Geometry with CSS 3D Transforms */}
            <div className="relative w-72 h-80 sm:w-80 sm:h-96 [perspective:1000px] flex items-center justify-center pointer-events-none">
              <motion.div
                style={{
                  transform: `rotateY(${rotationAngle}deg)`,
                  transformStyle: "preserve-3d",
                }}
                className="relative w-64 h-80 flex flex-col items-center justify-center"
              >
                {/* Headband Arc */}
                <div
                  className={`w-52 h-36 rounded-t-full border-t-8 border-x-4 border-slate-700/80 shadow-[0_10px_30px_rgba(0,0,0,0.8)] bg-gradient-to-b ${finishStyles.chassis} relative flex items-start justify-center pt-2`}
                >
                  {/* Headband breathable knit cushion */}
                  <div className="w-40 h-3 rounded-full bg-white/10 backdrop-blur-sm" />
                </div>

                {/* Left & Right Yokes & Earcups */}
                <div className="w-full flex justify-between items-center -mt-6 px-1">
                  {/* Left Earcup */}
                  <div
                    className={`relative w-24 h-36 rounded-[2.5rem] border-2 border-white/15 bg-gradient-to-br ${finishStyles.chassis} shadow-2xl flex flex-col items-center justify-center p-2`}
                  >
                    {/* Outer acoustic grille */}
                    <div className="w-16 h-24 rounded-[1.8rem] border border-white/10 bg-black/60 shadow-inner flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:6px_6px]" />
                      <span className="font-mono text-[9px] text-white/40 z-10 font-bold">45mm</span>
                    </div>

                    {/* Rotary Crown indicator on left */}
                    <div className="absolute -top-1 -right-1 h-5 w-5 rounded-full border border-white/20 bg-gradient-to-r from-slate-400 to-slate-600 shadow-md flex items-center justify-center">
                      <div className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                    </div>
                  </div>

                  {/* Right Earcup */}
                  <div
                    className={`relative w-24 h-36 rounded-[2.5rem] border-2 border-white/15 bg-gradient-to-bl ${finishStyles.chassis} shadow-2xl flex flex-col items-center justify-center p-2`}
                  >
                    {/* Outer acoustic grille */}
                    <div className="w-16 h-24 rounded-[1.8rem] border border-white/10 bg-black/60 shadow-inner flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:6px_6px]" />
                      <span className="font-mono text-[9px] text-white/40 z-10 font-bold">PLANAR</span>
                    </div>

                    {/* Passive bypass jack indicator */}
                    <div className="absolute -bottom-1 -left-1 h-3.5 w-3.5 rounded-full border border-white/20 bg-black shadow-md" />
                  </div>
                </div>

                {/* Pedestal shadow */}
                <div className="absolute -bottom-8 w-48 h-6 rounded-full bg-black/80 blur-md" />
              </motion.div>
            </div>

            {/* Drag helper hint */}
            <div className="pointer-events-none absolute bottom-5 inset-x-0 text-center font-mono text-[10px] uppercase tracking-wider text-white/35">
              Drag horizontally to inspect complete 360° chassis
            </div>
          </div>

          {/* Interactive Callout Selector & Specifications */}
          <div className="space-y-4">
            <h3 className="text-sm font-mono uppercase tracking-wider text-white/50 border-b border-white/8 pb-2">
              Subsystem Anatomy Callouts
            </h3>

            <div className="space-y-3">
              {PRODUCT_DATA.anatomyCallouts.map((callout) => (
                <div
                  key={callout.id}
                  onClick={() => {
                    soundEngine.playClick()
                    setSelectedCallout(callout)
                  }}
                  className={`p-4 rounded-2xl border transition-colors duration-150 cursor-pointer ${
                    selectedCallout.id === callout.id
                      ? "border-sky-400/40 bg-sky-500/10 shadow-[0_4px_20px_rgba(56,189,248,0.15)]"
                      : "border-white/8 bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-wider text-sky-400/80">
                      {callout.tag}
                    </span>
                    <span
                      className={`h-2 w-2 rounded-full transition-transform ${
                        selectedCallout.id === callout.id
                          ? "bg-sky-400 scale-125 shadow-[0_0_8px_rgba(56,189,248,0.8)]"
                          : "bg-white/20"
                      }`}
                    />
                  </div>

                  <h4 className="mt-1 text-sm font-semibold text-white">
                    {callout.title}
                  </h4>

                  <AnimatePresence>
                    {selectedCallout.id === callout.id && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-2 text-xs text-white/70 leading-relaxed overflow-hidden"
                      >
                        {callout.description}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Quick Action Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => addToBag(selectedFinish)}
                className="w-full rounded-full border border-sky-400/50 bg-sky-500/20 py-3 text-center text-xs font-semibold uppercase tracking-wider text-white shadow-[0_4px_16px_rgba(56,189,248,0.2)] hover:bg-sky-500/30 transition-colors duration-150 active:scale-[0.98]"
              >
                Add {selectedFinish.name} to Bag ($449)
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
