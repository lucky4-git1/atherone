import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { PRODUCT_DATA } from "@/data/product-data"
import { soundEngine } from "@/lib/audio-synthesizer"

export function AuditionLab() {
  const [activeProfile, setActiveProfile] = useState(PRODUCT_DATA.soundProfiles[0])
  const [isPlayingAudition, setIsPlayingAudition] = useState(false)
  const canvasRef = useRef(null)
  const animFrameRef = useRef(0)
  const phaseRef = useRef(0)

  // Real-time canvas wave generator
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const render = () => {
      const width = canvas.width
      const height = canvas.height
      ctx.clearRect(0, 0, width, height)

      // Frequency and amplitude modulation according to active profile
      const freqMultiplier = activeProfile.id === "studio-flat" ? 0.015 : activeProfile.id === "open-soundstage" ? 0.025 : 0.035
      const amp = isPlayingAudition ? 32 : 12

      phaseRef.current += isPlayingAudition ? 0.06 : 0.02

      // Draw reference line
      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)"
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(0, height / 2)
      ctx.lineTo(width, height / 2)
      ctx.stroke()

      // Primary harmonic wave
      ctx.strokeStyle = isPlayingAudition ? "#38bdf8" : "rgba(255, 255, 255, 0.35)"
      ctx.lineWidth = 2
      ctx.beginPath()
      for (let x = 0; x < width; x++) {
        const y = height / 2 + Math.sin(x * freqMultiplier + phaseRef.current) * amp * Math.sin((x / width) * Math.PI)
        if (x === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()

      // Secondary overtone
      if (isPlayingAudition) {
        ctx.strokeStyle = "rgba(125, 211, 252, 0.4)"
        ctx.lineWidth = 1
        ctx.beginPath()
        for (let x = 0; x < width; x++) {
          const y = height / 2 + Math.cos(x * (freqMultiplier * 2) - phaseRef.current * 1.5) * (amp * 0.5) * Math.sin((x / width) * Math.PI)
          if (x === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.stroke()
      }

      animFrameRef.current = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animFrameRef.current)
    }
  }, [activeProfile, isPlayingAudition])

  const toggleAudition = () => {
    soundEngine.playClick()
    if (!isPlayingAudition) {
      setIsPlayingAudition(true)
      soundEngine.playTone(activeProfile.freq, 1.8, "sine")
      setTimeout(() => {
        setIsPlayingAudition(false)
      }, 1800)
    } else {
      setIsPlayingAudition(false)
    }
  }

  const selectProfile = (profile) => {
    soundEngine.playClick()
    setActiveProfile(profile)
    setIsPlayingAudition(true)
    soundEngine.playTone(profile.freq, 1.5, "sine")
    setTimeout(() => {
      setIsPlayingAudition(false)
    }, 1500)
  }

  return (
    <section id="audition" className="relative mx-auto max-w-7xl px-6 py-28 sm:px-8 sm:py-36 lg:px-12">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01)),linear-gradient(145deg,rgba(5,8,20,0.95),rgba(2,4,12,0.98))] p-8 sm:p-12 lg:p-16 shadow-[0_30px_100px_rgba(0,0,0,0.6)]">
        <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/35 to-transparent" />

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-8 border-b border-white/8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 text-[11px] font-mono uppercase tracking-[0.22em] text-white/60 mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
              <span>Section 05 // Sound Audition Lab</span>
            </div>
            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
              Audition the acoustic profiles.
            </h2>
            <p className="mt-3 max-w-xl text-base text-white/65">
              Experience the uncolored studio baseline and switch between custom harmonic tunings calibrated for critical mixing and cinematic staging.
            </p>
          </div>

          {/* Audition Trigger Button */}
          <button
            type="button"
            onClick={toggleAudition}
            className={`flex items-center gap-2.5 rounded-full border px-5 py-2.5 text-xs font-semibold tracking-wider uppercase transition-colors duration-150 ${
              isPlayingAudition
                ? "border-emerald-400 bg-emerald-500/20 text-emerald-300 shadow-[0_0_20px_rgba(52,211,153,0.3)] animate-pulse"
                : "border-sky-400/50 bg-sky-500/20 text-white hover:bg-sky-500/30 shadow-[0_4px_16px_rgba(56,189,248,0.2)]"
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-current" />
            <span>{isPlayingAudition ? "Synthesizing Waveform..." : "Audition Harmonic Tone"}</span>
          </button>
        </div>

        {/* Live Audio Oscilloscope Canvas */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-black/60 p-6 flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between text-xs font-mono text-white/50 border-b border-white/8 pb-3 z-10">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-sky-400 animate-pulse" />
              <span>REAL-TIME TRANSDUCER HARMONIC SPECTRUM</span>
            </div>
            <div className="flex items-center gap-4 text-white/40">
              <span>ROOT: {activeProfile.freq} Hz</span>
              <span>CURVE: {activeProfile.curve}</span>
            </div>
          </div>

          <div className="relative h-44 sm:h-52 w-full my-4 flex items-center justify-center">
            <canvas
              ref={canvasRef}
              width={800}
              height={200}
              className="w-full h-full object-contain"
            />
          </div>

          <div className="flex items-center justify-between font-mono text-[11px] text-white/40 pt-2 border-t border-white/6 z-10">
            <span>20 Hz SUB-BASS</span>
            <span>1 kHz MASTERS MID</span>
            <span>20 kHz AIR FREQUENCY</span>
          </div>
        </div>

        {/* Profile Selection Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
          {PRODUCT_DATA.soundProfiles.map((profile) => (
            <motion.div
              key={profile.id}
              whileHover={{ y: -3 }}
              onClick={() => selectProfile(profile)}
              className={`p-6 rounded-2xl border cursor-pointer transition-colors duration-150 ${
                activeProfile.id === profile.id
                  ? "border-sky-400/50 bg-sky-500/15 shadow-[0_4px_24px_rgba(56,189,248,0.15)]"
                  : "border-white/8 bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04]"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase text-sky-400/80">
                  {profile.curve}
                </span>
                <span
                  className={`h-2.5 w-2.5 rounded-full transition-transform ${
                    activeProfile.id === profile.id
                      ? "bg-sky-400 scale-125 shadow-[0_0_8px_rgba(56,189,248,0.8)]"
                      : "bg-white/20"
                  }`}
                />
              </div>

              <h3 className="mt-3 text-base font-semibold text-white">
                {profile.name}
              </h3>

              <p className="mt-2 text-xs text-white/65 leading-relaxed">
                {profile.description}
              </p>

              <div className="mt-5 pt-3 border-t border-white/8 flex items-center justify-between font-mono text-[10px] text-white/45">
                <span>TEST FREQUENCY</span>
                <span className="text-white font-medium">{profile.freq} Hz</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
