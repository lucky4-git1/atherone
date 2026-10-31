import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { PRODUCT_DATA } from "@/data/product-data"
import { soundEngine } from "@/lib/audio-synthesizer"

export function AuditionLab() {
  const [activeProfile, setActiveProfile] = useState(PRODUCT_DATA.soundProfiles[0])
  const [isPlayingAudition, setIsPlayingAudition] = useState(false)
  const [isSweeping, setIsSweeping] = useState(false)
  const [sweepFreq, setSweepFreq] = useState(440)

  const canvasRef = useRef(null)
  const animFrameRef = useRef(0)
  const idlePhaseRef = useRef(0)

  // Real-Time Audio Oscilloscope Canvas connected to Web Audio AnalyserNode
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const analyser = soundEngine.getAnalyser()
    const bufferLength = analyser ? analyser.frequencyBinCount : 256
    const dataArray = new Uint8Array(bufferLength)

    const render = () => {
      const width = canvas.width
      const height = canvas.height
      ctx.clearRect(0, 0, width, height)

      // Draw subtle background grid lines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.05)"
      ctx.lineWidth = 1
      for (let y = 0.25; y <= 0.75; y += 0.25) {
        ctx.beginPath()
        ctx.moveTo(0, height * y)
        ctx.lineTo(width, height * y)
        ctx.stroke()
      }

      if (isPlayingAudition || isSweeping) {
        if (analyser) {
          analyser.getByteTimeDomainData(dataArray)
        }

        // Draw live physical audio wave from Web Audio Analyser
        ctx.strokeStyle = "#38bdf8"
        ctx.lineWidth = 2.5
        ctx.shadowColor = "rgba(56, 189, 248, 0.75)"
        ctx.shadowBlur = 10
        ctx.beginPath()

        const sliceWidth = width / bufferLength
        let x = 0

        for (let i = 0; i < bufferLength; i++) {
          const v = dataArray[i] / 128.0
          const y = (v * height) / 2

          if (i === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
          x += sliceWidth
        }
        ctx.stroke()
        ctx.shadowBlur = 0
      } else {
        // Idle ambient kinetic wave
        idlePhaseRef.current += 0.03
        ctx.strokeStyle = "rgba(255, 255, 255, 0.3)"
        ctx.lineWidth = 1.5
        ctx.beginPath()

        for (let xPos = 0; xPos < width; xPos += 2) {
          const envelope = Math.sin((xPos / width) * Math.PI)
          const yPos =
            height / 2 +
            Math.sin(xPos * 0.02 + idlePhaseRef.current) * 14 * envelope +
            Math.cos(xPos * 0.05 - idlePhaseRef.current * 0.7) * 6 * envelope

          if (xPos === 0) ctx.moveTo(xPos, yPos)
          else ctx.lineTo(xPos, yPos)
        }
        ctx.stroke()
      }

      animFrameRef.current = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animFrameRef.current)
    }
  }, [isPlayingAudition, isSweeping])

  const handleAuditionToggle = (profile = activeProfile) => {
    soundEngine.playClick()
    if (isSweeping) {
      soundEngine.stopAudition()
      setIsSweeping(false)
    }

    if (isPlayingAudition && profile.id === activeProfile.id) {
      soundEngine.stopAudition()
      setIsPlayingAudition(false)
    } else {
      setActiveProfile(profile)
      setIsPlayingAudition(true)
      soundEngine.playProfileAudition(profile.id, 3.2)

      setTimeout(() => {
        setIsPlayingAudition(false)
      }, 3200)
    }
  }

  const toggleSweepGenerator = () => {
    soundEngine.playClick()
    if (isPlayingAudition) {
      soundEngine.stopAudition()
      setIsPlayingAudition(false)
    }

    if (isSweeping) {
      soundEngine.stopAudition()
      setIsSweeping(false)
    } else {
      setIsSweeping(true)
      soundEngine.playContinuousTone(sweepFreq)
    }
  }

  const handleSweepChange = (e) => {
    const val = Number(e.target.value)
    setSweepFreq(val)
    if (isSweeping) {
      soundEngine.updateToneFrequency(val)
    }
  }

  const getPitchLabel = (f) => {
    if (f < 60) return "Sub-Bass Body"
    if (f < 250) return "Bass Warmth"
    if (f < 500) return "Vocal Fundamental (A4)"
    if (f < 2000) return "Mid Presence"
    if (f < 6000) return "Treble Transient"
    return "Ultra-High Air"
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
              Audition the acoustic engine live.
            </h2>
            <p className="mt-3 max-w-xl text-base text-white/65">
              Listen to real-time Web Audio DSP filters in your browser and test linear planar response with the continuous frequency generator.
            </p>
          </div>

          {/* Master Audition Trigger */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleAuditionToggle(activeProfile)}
              className={`flex items-center gap-2.5 rounded-full border px-5 py-2.5 text-xs font-semibold tracking-wider uppercase transition-colors duration-150 ${
                isPlayingAudition
                  ? "border-emerald-400 bg-emerald-500/20 text-emerald-300 shadow-[0_0_20px_rgba(52,211,153,0.4)]"
                  : "border-sky-400/50 bg-sky-500/20 text-white hover:bg-sky-500/30 shadow-[0_4px_16px_rgba(56,189,248,0.2)]"
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  isPlayingAudition ? "bg-emerald-400 animate-ping" : "bg-sky-400"
                }`}
              />
              <span>{isPlayingAudition ? "Synthesizing DSP Signal..." : "Audition Harmonic Chord"}</span>
            </button>
          </div>
        </div>

        {/* Real-time Oscilloscope Canvas Container */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-black/60 p-6 flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between text-xs font-mono text-white/50 border-b border-white/8 pb-3 z-10">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-sky-400 animate-pulse" />
              <span>WEB AUDIO OSCILLOSCOPE // REAL-TIME TRANSDUCER TELEMETRY</span>
            </div>
            <div className="flex items-center gap-4 text-white/40">
              <span>PROFILE: {activeProfile.name.toUpperCase()}</span>
              <span>FILTER: {activeProfile.curve}</span>
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
            <span>1,000 Hz MID TRANSPARENCY</span>
            <span>20,000 Hz ULTRASONIC AIR</span>
          </div>
        </div>

        {/* 3 Interactive DSP Tuning Profiles */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
          {PRODUCT_DATA.soundProfiles.map((profile) => {
            const isCurrent = activeProfile.id === profile.id
            return (
              <motion.div
                key={profile.id}
                whileHover={{ y: -3 }}
                onClick={() => handleAuditionToggle(profile)}
                className={`p-6 rounded-2xl border cursor-pointer transition-colors duration-150 ${
                  isCurrent
                    ? "border-sky-400/50 bg-sky-500/15 shadow-[0_4px_24px_rgba(56,189,248,0.15)]"
                    : "border-white/8 bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase text-sky-400/80 font-bold">
                    {profile.curve}
                  </span>
                  <span
                    className={`h-2.5 w-2.5 rounded-full transition-transform ${
                      isCurrent
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
                  <span>DSP ACTION</span>
                  <span className="text-sky-300 font-medium">Click to Audition →</span>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Live Frequency Sweep Generator */}
        <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-md">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-sky-400 uppercase tracking-wider mb-1">
              <span>Linear Transducer Sweep Test</span>
            </div>
            <h4 className="text-base font-semibold text-white">
              Continuous Frequency Sweep
            </h4>
            <p className="text-xs text-white/60 mt-1 leading-relaxed">
              Drag the pitch slider to sweep pure sine waves from 20 Hz sub-bass up through 18,000 Hz. Hear planar driver linearity without cone breakup.
            </p>
          </div>

          <div className="flex-1 max-w-lg space-y-3">
            <div className="flex items-center justify-between font-mono text-xs text-white/70">
              <span className="text-sky-300 font-bold text-sm">{sweepFreq} Hz</span>
              <span className="text-white/40">{getPitchLabel(sweepFreq)}</span>
            </div>

            <input
              type="range"
              min="20"
              max="16000"
              step="10"
              value={sweepFreq}
              onChange={handleSweepChange}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-sky-400"
            />

            <div className="flex items-center justify-between font-mono text-[10px] text-white/40">
              <span>20 Hz</span>
              <span>440 Hz (A4)</span>
              <span>5,000 Hz</span>
              <span>16,000 Hz</span>
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={toggleSweepGenerator}
              className={`rounded-full border px-6 py-3 text-xs font-mono uppercase tracking-wider transition-colors duration-150 ${
                isSweeping
                  ? "border-emerald-400 bg-emerald-500/25 text-emerald-300 shadow-[0_0_16px_rgba(52,211,153,0.4)]"
                  : "border-white/15 bg-white/[0.05] text-white hover:bg-white/10"
              }`}
            >
              {isSweeping ? "Stop Tone Generator" : "Start Pitch Sweep"}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
