import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { soundEngine } from "@/lib/audio-synthesizer"

export function SpatialPlayground() {
  const [activeMode, setActiveMode] = useState("spatial")
  const [depthIntensity, setDepthIntensity] = useState(40)
  const [fps, setFps] = useState(60)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const frameCountRef = useRef(0)
  const lastTimeRef = useRef(performance.now())

  useEffect(() => {
    let animId
    const loop = (now) => {
      frameCountRef.current++
      if (now - lastTimeRef.current >= 1000) {
        setFps(Math.round((frameCountRef.current * 1000) / (now - lastTimeRef.current)))
        frameCountRef.current = 0
        lastTimeRef.current = now
      }
      animId = requestAnimationFrame(loop)
    }
    animId = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(animId)
  }, [])

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({
      x: -y * (depthIntensity * 0.4),
      y: x * (depthIntensity * 0.4),
    })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
  }

  return (
    <section className="relative mx-auto max-w-7xl px-6 py-24 sm:px-8 sm:py-32 lg:px-12">
      <div className="relative overflow-hidden rounded-[2.2rem] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.01)),linear-gradient(145deg,rgba(5,9,22,0.95),rgba(2,4,14,0.98))] p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12),0_30px_100px_rgba(0,0,0,0.6)] sm:p-10 lg:p-14">
        <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/40 to-transparent" />

        {/* Section Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between pb-8 border-b border-white/8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 text-[11px] font-mono uppercase tracking-[0.22em] text-white/60 mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
              <span>Interactive Staging Workbench</span>
            </div>
            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
              Inspect the spatial pipeline in real time.
            </h2>
            <p className="mt-3 max-w-xl text-base text-white/60">
              Switch perspective projection, adjust multi-axis depth vectors, and verify frame budget metrics directly.
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center gap-2 rounded-full border border-white/12 bg-black/40 p-1.5">
            {[
              { id: "spatial", label: "Spatial 3D" },
              { id: "blueprint", label: "Wireframe HUD" },
              { id: "metrics", label: "Telemetry Matrix" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  soundEngine.playClick()
                  setActiveMode(tab.id)
                }}
                className={`rounded-full px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all ${
                  activeMode === tab.id
                    ? "bg-white/15 text-white font-semibold shadow-[inset_0_1px_0_0_rgba(255,255,255,0.16)] border border-white/20"
                    : "text-white/50 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Viewport Stage */}
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative mt-8 h-96 [perspective:1200px] overflow-hidden rounded-2xl border border-white/10 bg-black/60 p-6 flex items-center justify-center cursor-crosshair"
        >
          {/* Coordinate Overlay */}
          <div className="pointer-events-none absolute left-6 top-6 z-20 font-mono text-[11px] text-white/45 space-y-1">
            <div>MODE: {activeMode.toUpperCase()}</div>
            <div>ROTATION: [ X: {tilt.x.toFixed(1)}°, Y: {tilt.y.toFixed(1)}° ]</div>
            <div>Z-DEPTH: {depthIntensity}PX</div>
          </div>

          <div className="pointer-events-none absolute right-6 top-6 z-20 font-mono text-[11px] text-white/45 flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              <span className="text-white font-medium">{fps} FPS</span>
            </div>
            <div>P99.9: 4.2ms</div>
          </div>

          {/* Mode 1: Spatial 3D Multi-Layer Composition */}
          {activeMode === "spatial" && (
            <motion.div
              style={{
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transformStyle: "preserve-3d",
              }}
              className="relative h-64 w-full max-w-md rounded-2xl border border-white/20 bg-white/[0.04] p-5 shadow-[0_30px_80px_rgba(0,0,0,0.7)] backdrop-blur-md transition-transform duration-100 ease-out flex flex-col justify-between"
            >
              <div
                style={{ transform: `translateZ(${depthIntensity * 0.8}px)` }}
                className="flex items-center justify-between border-b border-white/10 pb-3"
              >
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-sky-400" />
                  <span className="text-xs font-semibold text-white">Spatial Viewport Container</span>
                </div>
                <span className="rounded-full bg-sky-400/20 px-2 py-0.5 text-[10px] font-mono text-sky-300">
                  LAYER 01 // Z: +{depthIntensity}PX
                </span>
              </div>

              <div
                style={{ transform: `translateZ(${depthIntensity * 0.4}px)` }}
                className="space-y-3"
              >
                <div className="h-3 w-4/5 rounded-full bg-white/14" />
                <div className="h-3 w-3/5 rounded-full bg-white/8" />
                <div className="flex gap-2 pt-2">
                  <div className="h-8 w-24 rounded-lg bg-sky-400/20 border border-sky-400/30" />
                  <div className="h-8 w-24 rounded-lg bg-white/6 border border-white/10" />
                </div>
              </div>

              <div
                style={{ transform: "translateZ(0px)" }}
                className="flex items-center justify-between text-[10px] font-mono text-white/40 border-t border-white/8 pt-2"
              >
                <span>BASE VOLUMETRIC PLANE</span>
                <span>SUB-PIXEL DAMPED</span>
              </div>
            </motion.div>
          )}

          {/* Mode 2: Blueprint Wireframe HUD */}
          {activeMode === "blueprint" && (
            <div className="relative w-full max-w-lg h-72 border border-sky-400/30 rounded-xl p-5 flex flex-col justify-between font-mono text-xs bg-sky-950/20">
              <div className="flex items-center justify-between text-sky-300 border-b border-sky-400/20 pb-3">
                <span>[ GEOMETRIC SCHEMATIC ]</span>
                <span>MESH: 124 TRIS</span>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center text-white/60">
                <div className="border border-sky-400/20 p-3 rounded-lg">
                  <span className="text-[10px] text-sky-400/70 block">X-AXIS</span>
                  <span className="text-lg font-bold text-white">1920 PX</span>
                </div>
                <div className="border border-sky-400/20 p-3 rounded-lg">
                  <span className="text-[10px] text-sky-400/70 block">Y-AXIS</span>
                  <span className="text-lg font-bold text-white">1080 PX</span>
                </div>
                <div className="border border-sky-400/20 p-3 rounded-lg">
                  <span className="text-[10px] text-sky-400/70 block">ASPECT</span>
                  <span className="text-lg font-bold text-white">16 : 9</span>
                </div>
              </div>
              <div className="text-[11px] text-sky-400/70 border-t border-sky-400/20 pt-2 flex justify-between">
                <span>BUFFER: GL_ARRAY_BUFFER</span>
                <span>VERTICES: HARDWARE LINKED</span>
              </div>
            </div>
          )}

          {/* Mode 3: Telemetry Matrix */}
          {activeMode === "metrics" && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-3xl">
              {[
                { label: "P99.9 Frame Time", value: "4.8 ms", status: "Optimal" },
                { label: "Memory Footprint", value: "38.4 MB", status: "Nominal" },
                { label: "Draw Calls", value: "14 / Frame", status: "Efficient" },
                { label: "Layout Shifts", value: "0.00 CLS", status: "Zero Shift" },
              ].map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-left"
                >
                  <span className="block text-[10px] font-mono uppercase text-white/40">
                    {metric.label}
                  </span>
                  <span className="mt-2 block text-2xl font-bold tracking-tight text-white font-mono">
                    {metric.value}
                  </span>
                  <span className="mt-1 block text-[10px] font-mono text-emerald-400">
                    ✓ {metric.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Interactive Controls */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-6 border-t border-white/8 pt-6">
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono uppercase tracking-wider text-white/50">
              Depth Vector:
            </span>
            <input
              type="range"
              min="10"
              max="90"
              value={depthIntensity}
              onChange={(e) => setDepthIntensity(Number(e.target.value))}
              className="h-1.5 w-36 accent-sky-400 cursor-pointer"
            />
            <span className="text-xs font-mono text-white/70">{depthIntensity}px</span>
          </div>

          <div className="text-xs font-mono text-white/45">
            DRAG MOUSE OVER VIEWPORT TO INSPECT PARALLAX PROJECTION
          </div>
        </div>
      </div>
    </section>
  )
}
