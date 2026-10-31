import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useBag } from "@/context/bag-context"
import { PRODUCT_DATA } from "@/data/product-data"
import { soundEngine } from "@/lib/audio-synthesizer"
import { ThreeHeadphoneViewer } from "@/components/ui/three-headphone-viewer"

export function InteractiveInspector() {
  const { selectedFinish, setFinishById, addToBag } = useBag()
  const [selectedCallout, setSelectedCallout] = useState(PRODUCT_DATA.anatomyCallouts[0])
  const [isRotating, setIsRotating] = useState(true)
  const [isExploded, setIsExploded] = useState(false)

  const handleSelectCalloutById = (id) => {
    const found = PRODUCT_DATA.anatomyCallouts.find((c) => c.id === id)
    if (found) {
      setSelectedCallout(found)
    }
  }

  const toggleRotation = () => {
    soundEngine.playClick()
    setIsRotating(!isRotating)
  }

  const toggleExploded = () => {
    soundEngine.playClick()
    setIsExploded(!isExploded)
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
              Real-time WebGL physical inspector.
            </h2>
            <p className="mt-3 max-w-xl text-base text-white/65">
              Inspect circumaural geometry in full 3D. Orbit 360°, trigger the exploded acoustic view, and click callout markers directly in WebGL space.
            </p>
          </div>

          {/* Finish Quick Switcher */}
          <div className="flex items-center gap-2 rounded-full border border-white/12 bg-black/40 p-1.5">
            {PRODUCT_DATA.finishes.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFinishById(f.id)}
                className={`flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors duration-150 ${
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

        {/* Interactive 3D Stage & Callout Panel */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-8 items-center">
          {/* True WebGL Three.js Viewport */}
          <div className="relative h-[26rem] sm:h-[32rem] lg:h-[38rem] rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_50%_35%,rgba(15,23,42,0.6),rgba(2,6,15,0.98)_80%)] overflow-hidden flex flex-col justify-between">
            {/* Ambient Lighting Rings */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.06),transparent_65%)]" />

            {/* Stage HUD Top Bar */}
            <div className="z-10 px-6 pt-6 flex items-center justify-between text-[11px] font-mono text-white/50">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                <span>THREE.JS WEBGL // PBR RENDERING</span>
              </div>

              {/* Action Controls */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggleExploded}
                  className={`rounded-full border px-3 py-1 text-[10px] font-mono uppercase tracking-wider transition-colors duration-150 ${
                    isExploded
                      ? "border-sky-400 bg-sky-500/25 text-white shadow-[0_0_12px_rgba(56,189,248,0.5)] font-bold"
                      : "border-white/10 bg-white/[0.05] text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {isExploded ? "Exploded Anatomy (Active)" : "Explode Anatomy"}
                </button>

                <button
                  type="button"
                  onClick={toggleRotation}
                  className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[10px] font-mono uppercase text-white/70 hover:text-white hover:bg-white/10 transition-colors duration-150"
                >
                  {isRotating ? "Pause Spin" : "Auto Spin"}
                </button>
              </div>
            </div>

            {/* 3D WebGL Canvas Component */}
            <div className="relative flex-1 w-full h-full min-h-0">
              <ThreeHeadphoneViewer
                selectedFinishId={selectedFinish.id}
                activeCalloutId={selectedCallout.id}
                onSelectCallout={handleSelectCalloutById}
                isExploded={isExploded}
                isRotating={isRotating}
              />
            </div>

            {/* Drag helper hint */}
            <div className="z-10 pb-5 px-6 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-white/35 border-t border-white/6 pt-3">
              <span>Drag to rotate 3D orbit</span>
              <span>Click any 3D pin to inspect component</span>
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
