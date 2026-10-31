import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ATHER_DATA } from "@/data/ather-data"
import { soundEngine } from "@/lib/audio-synthesizer"

export function AtherDashboardSimulator() {
  const [selectedMode, setSelectedMode] = useState(ATHER_DATA.rideModes[3]) // Warp mode default
  const [activeTab, setActiveTab] = useState("telemetry") // "telemetry" | "navigation" | "controls"
  const [speed, setSpeed] = useState(42)
  const [powerKw, setPowerKw] = useState(4.8)
  const [autoHold, setAutoHold] = useState(true)
  const [regenEnabled, setRegenEnabled] = useState(true)

  // Subtle live telemetry pulse
  useEffect(() => {
    const timer = setInterval(() => {
      setSpeed((prev) => {
        const delta = (Math.random() - 0.48) * 3
        const targetMax = selectedMode.id === "eco" ? 50 : selectedMode.id === "ride" ? 70 : selectedMode.id === "sport" ? 85 : 90
        return Math.max(28, Math.min(targetMax, Math.round(prev + delta)))
      })
      setPowerKw((prev) => {
        const delta = (Math.random() - 0.5) * 0.4
        return Math.max(1.2, Math.min(6.4, Number((prev + delta).toFixed(1))))
      })
    }, 800)
    return () => clearInterval(timer)
  }, [selectedMode])

  const handleSelectMode = (mode) => {
    soundEngine.playClick()
    setSelectedMode(mode)
  }

  const handleTabChange = (tab) => {
    soundEngine.playClick()
    setActiveTab(tab)
  }

  return (
    <div className="relative w-full max-w-4xl mx-auto rounded-[2rem] border-2 border-slate-700/60 bg-gradient-to-b from-[#0a0f1d] to-[#04060d] p-3 sm:p-5 shadow-[0_25px_80px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.15)]">
      {/* 7-Inch Bezel Edge Frame */}
      <div className="relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#060a14] p-4 sm:p-6 text-white min-h-[380px] sm:min-h-[420px] flex flex-col justify-between select-none">
        {/* Dynamic Mode Accent Ambient Gradient */}
        <div
          style={{
            background: `radial-gradient(circle at 50% 0%, ${selectedMode.accentColor}18, transparent 70%)`,
          }}
          className="pointer-events-none absolute inset-0 transition-colors duration-500"
        />

        {/* Top Status Bar */}
        <div className="z-10 flex items-center justify-between border-b border-white/8 pb-3 text-xs font-mono text-white/60">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-white">09:42 AM</span>
            <span className="hidden sm:inline text-white/30">•</span>
            <span className="hidden sm:inline text-emerald-400">4G LTE CONNECTED</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-white/40">SOC</span>
              <span className="font-bold text-white">82%</span>
              <div className="h-3 w-6 rounded border border-white/30 p-0.5 flex items-center">
                <div className="h-full w-[82%] rounded-sm bg-emerald-400" />
              </div>
            </div>
            <div className="border-l border-white/10 pl-3">
              <span style={{ color: selectedMode.accentColor }} className="font-bold">
                {selectedMode.range}
              </span>
              <span className="text-[10px] text-white/40 ml-1">EST.</span>
            </div>
          </div>
        </div>

        {/* Middle Screen Viewports */}
        <div className="my-auto py-4 z-10">
          <AnimatePresence mode="wait">
            {/* View 1: Telemetry Dashboard */}
            {activeTab === "telemetry" && (
              <motion.div
                key="telemetry"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center"
              >
                {/* Left Dial: Power Output */}
                <div className="space-y-1 text-center md:text-left">
                  <span className="text-[10px] font-mono uppercase text-white/40 tracking-wider">
                    Instantaneous Power
                  </span>
                  <div className="text-3xl sm:text-4xl font-bold font-mono tracking-tight text-white">
                    {powerKw} <span className="text-xs text-white/50 font-normal">kW</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden mt-2">
                    <div
                      style={{
                        width: `${(powerKw / 6.4) * 100}%`,
                        backgroundColor: selectedMode.accentColor,
                      }}
                      className="h-full rounded-full transition-all duration-300"
                    />
                  </div>
                  <span className="text-[10px] font-mono text-white/40 block mt-1">
                    PEAK MOTOR LIMIT: {selectedMode.powerRating}
                  </span>
                </div>

                {/* Center Main Speedometer */}
                <div className="text-center">
                  <div className="relative inline-flex flex-col items-center justify-center">
                    <span className="text-[clamp(4.2rem,11vw,6.8rem)] font-bold font-mono leading-none tracking-tighter text-white">
                      {speed}
                    </span>
                    <span className="text-xs font-mono uppercase tracking-[0.2em] text-white/50 -mt-1">
                      KM / H
                    </span>

                    {/* Mode Badge Pill */}
                    <div
                      style={{
                        borderColor: `${selectedMode.accentColor}66`,
                        backgroundColor: `${selectedMode.accentColor}18`,
                        color: selectedMode.accentColor,
                      }}
                      className="mt-3 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-xs uppercase font-bold tracking-wider"
                    >
                      <span
                        style={{ backgroundColor: selectedMode.accentColor }}
                        className="h-1.5 w-1.5 rounded-full animate-ping"
                      />
                      <span>{selectedMode.name} MODE ACTIVE</span>
                    </div>
                  </div>
                </div>

                {/* Right Dial: Torque & Regen */}
                <div className="space-y-1 text-center md:text-right">
                  <span className="text-[10px] font-mono uppercase text-white/40 tracking-wider">
                    Regenerative Energy
                  </span>
                  <div className="text-3xl sm:text-4xl font-bold font-mono tracking-tight text-emerald-400">
                    +1.2 <span className="text-xs text-white/50 font-normal">kWh/100km</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden mt-2 flex justify-end">
                    <div className="h-full w-[65%] rounded-full bg-emerald-400" />
                  </div>
                  <span className="text-[10px] font-mono text-white/40 block mt-1">
                    MAGIC TWIST™: STANDBY
                  </span>
                </div>
              </motion.div>
            )}

            {/* View 2: Navigation Map Simulator */}
            {activeTab === "navigation" && (
              <motion.div
                key="navigation"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="rounded-2xl border border-white/10 bg-black/60 p-5 flex flex-col sm:flex-row gap-6 items-center justify-between"
              >
                <div className="flex-1 space-y-2">
                  <div className="inline-flex items-center gap-2 rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/30 px-3 py-0.5 text-xs font-mono">
                    <span>TURN-BY-TURN ROUTE</span>
                  </div>
                  <h4 className="text-xl font-bold text-white">
                    In 250m, turn left onto 100 Feet Road
                  </h4>
                  <p className="text-xs text-white/60">
                    Destination: Indiranagar Hub • 4.8 km remaining (12 mins)
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4 text-left font-mono text-xs space-y-1.5 min-w-[220px]">
                  <div className="text-white/40 uppercase text-[10px]">Ather Grid Fast Charger</div>
                  <div className="text-emerald-400 font-bold flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>2 SLOTS AVAILABLE</span>
                  </div>
                  <div className="text-white/70">1.2 km away on current route</div>
                  <div className="text-sky-400 text-[11px] pt-1">Charge speed: 1.5 km/min</div>
                </div>
              </motion.div>
            )}

            {/* View 3: Connected Smart Controls */}
            {activeTab === "controls" && (
              <motion.div
                key="controls"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4"
              >
                {/* AutoHold Toggle */}
                <div
                  onClick={() => {
                    soundEngine.playClick()
                    setAutoHold(!autoHold)
                  }}
                  className={`p-4 rounded-xl border cursor-pointer transition-colors duration-150 ${
                    autoHold
                      ? "border-emerald-400 bg-emerald-500/15"
                      : "border-white/10 bg-white/[0.02]"
                  }`}
                >
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-white/60">AUTOHOLD™</span>
                    <span className={autoHold ? "text-emerald-400 font-bold" : "text-white/30"}>
                      {autoHold ? "ENGAGED" : "OFF"}
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-semibold text-white">Brake-Free Incline Hold</p>
                  <p className="mt-1 text-[11px] text-white/50">Holds vehicle stationary on slopes without brake grip.</p>
                </div>

                {/* Magic Twist Regen Toggle */}
                <div
                  onClick={() => {
                    soundEngine.playClick()
                    setRegenEnabled(!regenEnabled)
                  }}
                  className={`p-4 rounded-xl border cursor-pointer transition-colors duration-150 ${
                    regenEnabled
                      ? "border-sky-400 bg-sky-500/15"
                      : "border-white/10 bg-white/[0.02]"
                  }`}
                >
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-white/60">MAGIC TWIST™</span>
                    <span className={regenEnabled ? "text-sky-300 font-bold" : "text-white/30"}>
                      {regenEnabled ? "ACTIVE" : "OFF"}
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-semibold text-white">Throttle Deceleration</p>
                  <p className="mt-1 text-[11px] text-white/50">Reverse twist recuperates power and slows scooter.</p>
                </div>

                {/* TPMS Sensors */}
                <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02] text-xs font-mono space-y-2">
                  <span className="text-white/40 uppercase block">Tyre Pressure (TPMS)</span>
                  <div className="flex justify-between text-white">
                    <span>Front Tyre:</span>
                    <span className="text-emerald-400 font-bold">30.2 PSI (Nominal)</span>
                  </div>
                  <div className="flex justify-between text-white">
                    <span>Rear Tyre:</span>
                    <span className="text-emerald-400 font-bold">32.4 PSI (Nominal)</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Screen Navigation Bar & Ride Modes */}
        <div className="z-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/8 pt-3">
          {/* Touchscreen Tabs */}
          <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1">
            {[
              { id: "telemetry", label: "Dashboard" },
              { id: "navigation", label: "Navigation" },
              { id: "controls", label: "Controls" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabChange(tab.id)}
                className={`rounded-full px-3 py-1 text-xs font-mono uppercase tracking-wider transition-colors duration-150 ${
                  activeTab === tab.id
                    ? "bg-white/15 text-white font-semibold"
                    : "text-white/50 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Ride Mode Selector Pills */}
          <div className="flex items-center gap-1.5">
            {ATHER_DATA.rideModes.map((mode) => (
              <button
                key={mode.id}
                type="button"
                onClick={() => handleSelectMode(mode)}
                style={{
                  borderColor: selectedMode.id === mode.id ? mode.accentColor : "transparent",
                  backgroundColor: selectedMode.id === mode.id ? `${mode.accentColor}25` : "rgba(255,255,255,0.03)",
                  color: selectedMode.id === mode.id ? "#ffffff" : "rgba(255,255,255,0.5)",
                }}
                className="rounded-full border px-3 py-1 font-mono text-xs uppercase font-bold tracking-wider transition-colors duration-150 hover:text-white"
              >
                {mode.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Cockpit Simulation Sub-Bar */}
      <div className="mt-3 flex items-center justify-between px-3 text-[11px] font-mono text-white/40">
        <span>ATHERSTACK™ 6.0 COCKPIT SIMULATION</span>
        <span>TOUCH/CLICK MODE PILLS TO TEST REAL-TIME VEHICLE PROFILES</span>
      </div>
    </div>
  )
}
