import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { soundEngine } from "@/lib/audio-synthesizer"

export function AtherMovement() {
  const [isAccelerating, setIsAccelerating] = useState(false)
  const [speed, setSpeed] = useState(0)
  const [sprintTime, setSprintTime] = useState(0)
  const [gForce, setGForce] = useState(0)
  const [hasHit40, setHasHit40] = useState(false)

  const animRef = useRef(0)
  const startTimeRef = useRef(0)
  const canvasRef = useRef(null)

  // Acceleration physics simulation
  useEffect(() => {
    if (isAccelerating) {
      startTimeRef.current = performance.now()
      soundEngine.playContinuousTone(240)

      const loop = (now) => {
        const elapsedSec = (now - startTimeRef.current) / 1000
        setSprintTime(Number(elapsedSec.toFixed(2)))

        // 0 to 40 km/h in exactly 3.3 seconds; then continues up to 90 km/h
        let currentSpeed = 0
        if (elapsedSec <= 3.3) {
          currentSpeed = (elapsedSec / 3.3) * 40
        } else {
          setHasHit40(true)
          const extraTime = elapsedSec - 3.3
          currentSpeed = Math.min(90, 40 + (extraTime / 5.5) * 50)
        }

        setSpeed(Math.round(currentSpeed))

        // Sound pitch increases with speed
        const motorFreq = 240 + currentSpeed * 9.5
        soundEngine.updateToneFrequency(motorFreq)

        // G-force calculation
        const g = currentSpeed < 40 ? 0.42 : Math.max(0.08, 0.42 - (currentSpeed - 40) * 0.006)
        setGForce(Number(g.toFixed(2)))

        if (currentSpeed < 90) {
          animRef.current = requestAnimationFrame(loop)
        }
      }

      animRef.current = requestAnimationFrame(loop)
    } else {
      cancelAnimationFrame(animRef.current)
      soundEngine.stopAudition()

      // Coast down
      const coastInterval = setInterval(() => {
        setSpeed((prev) => {
          if (prev <= 1) {
            clearInterval(coastInterval)
            setGForce(0)
            return 0
          }
          return Math.round(prev * 0.85)
        })
      }, 100)

      return () => clearInterval(coastInterval)
    }

    return () => cancelAnimationFrame(animRef.current)
  }, [isAccelerating])

  // Real-time canvas telemetry graph
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height
    ctx.clearRect(0, 0, width, height)

    // Grid lines
    ctx.strokeStyle = "rgba(255, 255, 255, 0.08)"
    ctx.lineWidth = 1
    for (let y = 0.2; y <= 0.8; y += 0.2) {
      ctx.beginPath()
      ctx.moveTo(0, height * y)
      ctx.lineTo(width, height * y)
      ctx.stroke()
    }

    // Instant Linear Torque Line (Electric PMSM)
    ctx.strokeStyle = "#00e599"
    ctx.lineWidth = 3
    ctx.shadowColor = "rgba(0, 229, 153, 0.8)"
    ctx.shadowBlur = 12
    ctx.beginPath()
    ctx.moveTo(40, height * 0.3)
    ctx.lineTo(width - 40, height * 0.3)
    ctx.stroke()
    ctx.shadowBlur = 0

    // Combustion engine lag curve (Comparison)
    ctx.strokeStyle = "rgba(255, 255, 255, 0.2)"
    ctx.lineWidth = 2
    ctx.setLineDash([5, 5])
    ctx.beginPath()
    ctx.moveTo(40, height * 0.8)
    ctx.quadraticCurveTo(width * 0.4, height * 0.75, width - 40, height * 0.4)
    ctx.stroke()
    ctx.setLineDash([])
  }, [])

  const startAcceleration = () => {
    soundEngine.playClick()
    setHasHit40(false)
    setIsAccelerating(true)
  }

  const stopAcceleration = () => {
    soundEngine.playClick()
    setIsAccelerating(false)
  }

  return (
    <section id="movement" className="relative mx-auto max-w-7xl px-6 py-28 sm:px-8 sm:py-36 lg:px-12">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01)),linear-gradient(145deg,rgba(5,9,22,0.95),rgba(2,4,14,0.98))] p-8 sm:p-12 lg:p-16 shadow-[0_30px_100px_rgba(0,0,0,0.6)]">
        <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/35 to-transparent" />

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-8 border-b border-white/8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 text-[11px] font-mono uppercase tracking-[0.24em] text-white/60 mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>Chapter 05 // The Movement</span>
            </div>
            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl font-sans">
              Kinetic acceleration &amp; road dynamics.
            </h2>
            <p className="mt-3 max-w-xl text-base text-white/65">
              Experience the instantaneous impulse of 26 Nm electric torque. Hold the virtual throttle to simulate the 0 to 40 km/h Warp sprint in real time.
            </p>
          </div>

          <div className="font-mono text-xs text-white/40">
            WARP BENCHMARK: 0-40 IN 3.3 SEC
          </div>
        </div>

        {/* Interactive Sprint Simulator Stage */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center">
          {/* Virtual Sprint Cockpit */}
          <div className="rounded-2xl border border-white/10 bg-black/60 p-6 sm:p-8 flex flex-col justify-between min-h-[360px] relative overflow-hidden">
            <div className="flex items-center justify-between text-xs font-mono text-white/50 border-b border-white/8 pb-3">
              <div className="flex items-center gap-2">
                <span
                  className={`h-2 w-2 rounded-full ${
                    isAccelerating ? "bg-emerald-400 animate-ping" : "bg-white/40"
                  }`}
                />
                <span>PMSM ELECTRIC MOTOR TELEMETRY</span>
              </div>
              <span className="text-emerald-400 font-bold">WARP+ MODE</span>
            </div>

            {/* Central Speed & Timer Readout */}
            <div className="my-auto py-6 text-center">
              <div className="text-[clamp(4.8rem,14vw,8rem)] font-bold font-mono leading-none tracking-tighter text-white">
                {speed}
                <span className="text-base text-white/40 ml-2 font-normal">KM/H</span>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-6 font-mono text-xs">
                <div>
                  <span className="text-white/40 block text-[10px]">SPRINT TIMER</span>
                  <span className="text-xl font-bold text-white mt-0.5 block">{sprintTime}s</span>
                </div>
                <div className="h-6 w-px bg-white/10" />
                <div>
                  <span className="text-white/40 block text-[10px]">PEAK G-FORCE</span>
                  <span className="text-xl font-bold text-emerald-400 mt-0.5 block">{gForce} G</span>
                </div>
                <div className="h-6 w-px bg-white/10" />
                <div>
                  <span className="text-white/40 block text-[10px]">0-40 TARGET</span>
                  <span
                    className={`text-xl font-bold mt-0.5 block ${
                      hasHit40 ? "text-emerald-400" : "text-white/60"
                    }`}
                  >
                    {hasHit40 ? "✓ 3.3s PASS" : "PENDING"}
                  </span>
                </div>
              </div>
            </div>

            {/* Hold-to-Accelerate Throttle Control */}
            <div className="border-t border-white/8 pt-4">
              <button
                type="button"
                onMouseDown={startAcceleration}
                onMouseUp={stopAcceleration}
                onMouseLeave={stopAcceleration}
                onTouchStart={startAcceleration}
                onTouchEnd={stopAcceleration}
                className={`w-full py-4 rounded-full border text-center font-mono text-xs uppercase tracking-widest font-bold select-none transition-colors duration-150 ${
                  isAccelerating
                    ? "border-emerald-400 bg-emerald-500/30 text-white shadow-[0_0_30px_rgba(0,229,153,0.5)] scale-[0.99]"
                    : "border-emerald-400/50 bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/25 shadow-[0_4px_20px_rgba(0,229,153,0.2)]"
                }`}
              >
                {isAccelerating ? "⚡ Full Throttle Engaged (Release to Decel)" : "Press & Hold Throttle to Launch"}
              </button>
              <p className="mt-2 text-center text-[10px] font-mono text-white/35">
                Uses Web Audio synthesizer to generate real-time electric motor spool harmonics.
              </p>
            </div>
          </div>

          {/* Instant Torque Telemetry Chart */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-white/10 bg-black/40 p-6 space-y-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-white/50 uppercase">Torque Delivery Comparison</span>
                <span className="text-emerald-400 font-bold">26 Nm Instantaneous</span>
              </div>

              <div className="relative h-44 w-full">
                <canvas ref={canvasRef} width={600} height={180} className="w-full h-full object-contain" />
              </div>

              <div className="flex items-center justify-between font-mono text-[11px] text-white/50 border-t border-white/6 pt-2">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span>Ather PMSM Electric (Flat 26 Nm from 0 RPM)</span>
                </div>
                <div className="flex items-center gap-2 text-white/40">
                  <span className="h-2 w-2 rounded-full bg-white/40" />
                  <span>Combustion Gear Lag</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-6 space-y-2 font-mono text-xs text-white/70">
              <span className="text-emerald-400 uppercase text-[10px] font-bold tracking-wider block">
                Agility Physics // Low Polar Inertia
              </span>
              <p className="text-sm font-sans text-white/80 leading-relaxed">
                By nesting the heavy 3.7 kWh battery pack beneath the floorboard instead of under the seat, the polar moment of inertia is drastically lowered. The scooter turns in with zero steering resistance and tracks true across grooved concrete flyovers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
