import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { soundEngine } from "@/lib/audio-synthesizer"

// 01. SIGNAL SHOWCASE: Real-Time Audio & Spatial Waveform Spectrum
export function SignalShowcase() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [activePreset, setActivePreset] = useState("Cinematic Pace")

  const togglePlayback = () => {
    soundEngine.playClick()
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="relative min-w-0 overflow-hidden rounded-[2rem] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.01)),linear-gradient(145deg,rgba(6,10,24,0.92),rgba(2,5,16,0.98))] p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_24px_80px_rgba(0,0,0,0.5)] backdrop-blur-sm sm:p-7">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/35 to-transparent" />

      <div className="flex items-center justify-between pb-5 border-b border-white/8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={togglePlayback}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-sky-400/40 bg-sky-400/10 text-sky-400 hover:bg-sky-400/20 active:scale-95 transition-all"
            aria-label="Toggle waveform stream"
          >
            {isPlaying ? (
              <span className="block h-2.5 w-2.5 rounded-xs bg-sky-400" />
            ) : (
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current translate-x-0.5">
                <path d="M5 3l14 9-14 9V3z" />
              </svg>
            )}
          </button>
          <div>
            <span className="block text-[11px] font-mono uppercase tracking-[0.22em] text-white/50">
              Audio Telemetry Stream
            </span>
            <span className="text-xs font-semibold text-white">48kHz Spatial Soundscape</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {["Cinematic Pace", "Fast Cut", "Slow Burn"].map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => {
                soundEngine.playHover()
                setActivePreset(preset)
              }}
              className={`rounded-full px-2.5 py-1 text-[10px] font-mono transition-colors ${
                activePreset === preset
                  ? "bg-white/12 text-white font-medium border border-white/20"
                  : "text-white/45 hover:text-white/80"
              }`}
            >
              {preset}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-white/10 bg-black/40 p-4">
        <div className="flex items-end justify-between gap-1.5 h-32 px-2">
          {[42, 65, 84, 52, 90, 72, 38, 96, 60, 48, 88, 76, 58, 92, 45, 68, 82, 94, 56, 78, 62, 85].map(
            (height, i) => (
              <motion.div
                key={i}
                onClick={() => {
                  soundEngine.playTone(280 + i * 36, 0.14)
                }}
                title={`Frequency bin ${i + 1} (${280 + i * 36}Hz) - Click to audition`}
                animate={
                  isPlaying
                    ? { height: [`${height * 0.4}%`, `${height}%`, `${height * 0.6}%`] }
                    : { height: `${height}%` }
                }
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 0.8 + (i % 4) * 0.2,
                  ease: "easeInOut",
                }}
                className="w-full rounded-t-sm bg-gradient-to-t from-sky-500/30 to-sky-400/90 cursor-pointer hover:brightness-125 transition-all"
              />
            ),
          )}
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3 border-t border-white/8 pt-5 text-center">
        <div className="rounded-xl border border-white/8 bg-white/[0.02] p-2.5">
          <span className="block text-[10px] font-mono uppercase text-white/40">Framer Sync</span>
          <span className="mt-1 block text-sm font-semibold text-white">60.00 FPS</span>
        </div>
        <div className="rounded-xl border border-white/8 bg-white/[0.02] p-2.5">
          <span className="block text-[10px] font-mono uppercase text-white/40">Spectral Purity</span>
          <span className="mt-1 block text-sm font-semibold text-white">99.8% THD</span>
        </div>
        <div className="rounded-xl border border-white/8 bg-white/[0.02] p-2.5">
          <span className="block text-[10px] font-mono uppercase text-white/40">Phase Jitter</span>
          <span className="mt-1 block text-sm font-semibold text-white">&lt; 0.2ms</span>
        </div>
      </div>
    </div>
  )
}

// 02. FOCUS SHOWCASE: Spatial HUD Telemetry with Interactive Crosshair Coordinates
export function FocusShowcase() {
  const [coords, setCoords] = useState({ x: 180, y: 110 })
  const containerRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setCoords({
      x: Math.round(e.clientX - rect.left),
      y: Math.round(e.clientY - rect.top),
    })
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-w-0 overflow-hidden rounded-[2rem] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.01)),linear-gradient(145deg,rgba(6,10,24,0.92),rgba(2,5,16,0.98))] p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_24px_80px_rgba(0,0,0,0.5)] backdrop-blur-sm sm:p-7"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/35 to-transparent" />

      <div className="flex items-center justify-between pb-5 border-b border-white/8">
        <div className="flex items-center gap-2.5">
          <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
          <span className="text-xs font-mono uppercase tracking-[0.22em] text-white/50">
            Target Focus Engine
          </span>
        </div>
        <span className="text-xs font-mono text-white/60">
          COORD: [ {coords.x}PX , {coords.y}PX ]
        </span>
      </div>

      <div className="relative mt-6 h-56 rounded-xl border border-white/10 bg-black/40 overflow-hidden flex items-center justify-center">
        {/* Subtle coordinate grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />

        {/* Dynamic Crosshair Center */}
        <div
          style={{ transform: `translate(${coords.x - 140}px, ${coords.y - 100}px)` }}
          className="pointer-events-none absolute flex items-center justify-center transition-transform duration-75 ease-out"
        >
          <div className="h-16 w-16 rounded-full border border-sky-400/60 flex items-center justify-center animate-pulse">
            <div className="h-1.5 w-1.5 rounded-full bg-sky-400" />
          </div>
          <div className="absolute -top-3 text-[9px] font-mono text-sky-400 uppercase tracking-widest whitespace-nowrap">
            LOCKED // OPTICAL TRACK
          </div>
        </div>

        {/* Telemetry nodes */}
        <div className="absolute left-6 bottom-5 space-y-1 text-left font-mono text-[10px] text-white/45">
          <div>NODE_ALPHA: 104.244.42.1</div>
          <div>EDGE_RTT: 4.82ms</div>
          <div>JITTER: 0.00%</div>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-white/8 pt-5 text-xs text-white/60">
        <span className="font-mono text-white/40">HIERARCHY ENGINE</span>
        <span className="font-medium text-white">Dynamic Visual Gravity Applied</span>
      </div>
    </div>
  )
}

// 03. DEPTH SHOWCASE: Interactive Multi-Plane Perspective Stack
export function DepthShowcase() {
  const [tilt, setTilt] = useState({ rx: 6, ry: -8 })

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ rx: -y * 22, ry: x * 22 })
  }

  const handleMouseLeave = () => {
    setTilt({ rx: 6, ry: -8 })
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-w-0 overflow-hidden rounded-[2rem] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.01)),linear-gradient(145deg,rgba(6,10,24,0.92),rgba(2,5,16,0.98))] p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_24px_80px_rgba(0,0,0,0.5)] backdrop-blur-sm sm:p-7"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/35 to-transparent" />

      <div className="flex items-center justify-between pb-5 border-b border-white/8">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.8)]" />
          <span className="text-xs font-mono uppercase tracking-[0.22em] text-white/50">
            Spatial Depth Stack
          </span>
        </div>
        <span className="text-xs font-mono text-white/50">TILT: 3-AXIS PARALLAX</span>
      </div>

      <div className="relative mt-6 h-60 [perspective:1000px] flex items-center justify-center">
        <div
          style={{
            transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
            transformStyle: "preserve-3d",
          }}
          className="relative h-44 w-72 rounded-2xl border border-white/20 bg-white/[0.04] p-4 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-md transition-transform duration-100 ease-out flex flex-col justify-between"
        >
          {/* Layer 1 (Foreground) */}
          <div
            style={{ transform: "translateZ(35px)" }}
            className="flex items-center justify-between border-b border-white/10 pb-3"
          >
            <span className="text-xs font-semibold text-white">UI Viewport Plane</span>
            <span className="rounded-full bg-sky-400/20 px-2 py-0.5 text-[9px] font-mono text-sky-300">
              Z: +35PX
            </span>
          </div>

          {/* Layer 2 (Mid-ground) */}
          <div
            style={{ transform: "translateZ(20px)" }}
            className="space-y-2 py-2"
          >
            <div className="h-2 rounded-full bg-white/12 w-3/4" />
            <div className="h-2 rounded-full bg-white/8 w-1/2" />
          </div>

          {/* Layer 3 (Base) */}
          <div
            style={{ transform: "translateZ(5px)" }}
            className="flex items-center justify-between text-[10px] font-mono text-white/40 border-t border-white/8 pt-2"
          >
            <span>ATMOSPHERE BASE</span>
            <span>SHADOW SHADER</span>
          </div>
        </div>
      </div>

      <div className="mt-5 border-t border-white/8 pt-5 text-center">
        <p className="text-xs text-white/60">
          Move cursor across frame to test perspective isolation.
        </p>
      </div>
    </div>
  )
}

// 04. COMMAND SHOWCASE: Interactive Live Terminal & Code Matrix
export function CommandShowcase() {
  const [activeTab, setActiveTab] = useState("init")
  const [copied, setCopied] = useState(false)

  const snippets = {
    init: `import { createAetherEngine } from "@aether/core";

const engine = createAetherEngine({
  spatial: true,
  compositor: "hardware-60fps",
  observability: "realtime"
});

await engine.mount("#app-root");`,
    config: `// Aether Runtime Architecture Config
export default {
  camera: { fov: 45, damping: 0.16 },
  shader: { precision: "mediump", bloom: 0.4 },
  telemetry: { targetJitterMs: 0.2 }
};`,
    bench: `[BENCHMARK REPORT // V2.4]
✓ WebGL Context: 1 Instance Active
✓ Draw Calls: 12 / Frame (Budget: 60)
✓ Heap Allocation: 42 MB (Zero Leaks)
✓ Status: CERTIFIED READY FOR SHIP`,
  }

  const handleCopy = () => {
    soundEngine.playChime()
    navigator.clipboard?.writeText(snippets[activeTab])
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative min-w-0 overflow-hidden rounded-[2rem] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.01)),linear-gradient(145deg,rgba(6,10,24,0.92),rgba(2,5,16,0.98))] p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_24px_80px_rgba(0,0,0,0.5)] backdrop-blur-sm sm:p-7">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/35 to-transparent" />

      <div className="flex items-center justify-between pb-4 border-b border-white/8">
        <div className="flex items-center gap-2">
          {["init", "config", "bench"].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => {
                soundEngine.playHover()
                setActiveTab(tab)
              }}
              className={`rounded-lg px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-all ${
                activeTab === tab
                  ? "border border-white/20 bg-white/10 text-white font-semibold"
                  : "text-white/45 hover:text-white/80"
              }`}
            >
              {tab === "init" ? "aether.init()" : tab === "config" ? "config.ts" : "benchmark.log"}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-mono text-white/70 hover:bg-white/10 active:scale-95 transition-all"
        >
          {copied ? "COPIED ✓" : "COPY CODE"}
        </button>
      </div>

      <div className="mt-4 rounded-xl border border-white/10 bg-black/60 p-4 font-mono text-xs leading-relaxed text-sky-200/90 overflow-x-auto min-h-[170px]">
        <pre className="selection:bg-sky-500/40">
          <code>{snippets[activeTab]}</code>
        </pre>
      </div>

      <div className="mt-4 flex items-center justify-between text-[11px] font-mono text-white/40 pt-2 border-t border-white/6">
        <span>TARGET: PRODUCTION EDGE</span>
        <span>MODULAR // SDK V2.4.9</span>
      </div>
    </div>
  )
}
