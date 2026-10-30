import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { soundEngine } from "@/lib/audio-synthesizer"

export function Navbar({ isScrolled, onOpenDemo }) {
  const [time, setTime] = useState("")
  const [isAudioActive, setIsAudioActive] = useState(false)

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(
        now.toTimeString().split(" ")[0] + " UTC"
      )
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  const toggleSound = () => {
    const muted = soundEngine.toggleMute()
    setIsAudioActive(!muted)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <motion.div
        initial={false}
        animate={{
          backgroundColor: isScrolled ? "rgba(6, 11, 24, 0.85)" : "rgba(255, 255, 255, 0.03)",
          borderColor: isScrolled ? "rgba(255, 255, 255, 0.14)" : "rgba(255, 255, 255, 0.08)",
          boxShadow: isScrolled
            ? "0 20px 50px rgba(0,0,0,0.4)"
            : "0 10px 30px rgba(0,0,0,0.12)",
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto mt-3 flex h-16 w-[calc(100%-1.2rem)] max-w-7xl items-center justify-between rounded-full border px-4 backdrop-blur-md sm:mt-4 sm:h-18 sm:w-[calc(100%-2rem)] sm:px-8 lg:px-10"
      >
        <div className="flex items-center gap-4">
          <a
            href="#overview"
            className="flex items-center gap-3 group"
            onClick={() => soundEngine.playClick()}
          >
            <div className="h-2.5 w-2.5 rounded-full bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.9)] transition-transform group-hover:scale-125" />
            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-white">
              Aether One
            </span>
          </a>

          <div className="hidden xl:flex items-center gap-2 border-l border-white/10 pl-4 text-[11px] font-mono text-white/45">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>ONLINE // 99.99%</span>
          </div>
        </div>

        <nav className="hidden items-center gap-8 md:flex">
          {["Overview", "Experience", "Architecture", "Launch"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => soundEngine.playClick()}
              onMouseEnter={() => soundEngine.playHover()}
              className="text-xs font-mono uppercase tracking-wider text-white/60 transition-colors duration-150 hover:text-white"
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* Audio Synthesizer Toggle */}
          <button
            type="button"
            onClick={toggleSound}
            title={isAudioActive ? "Mute interactive audio" : "Enable tactile sound"}
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-white/70 hover:border-white/20 hover:text-white transition-all active:scale-95"
          >
            <span className="flex items-center gap-0.5 h-3">
              <span
                className={`w-0.5 rounded-full bg-sky-400 transition-all ${
                  isAudioActive ? "h-3 animate-pulse" : "h-1 opacity-50"
                }`}
              />
              <span
                className={`w-0.5 rounded-full bg-sky-400 transition-all ${
                  isAudioActive ? "h-2 animate-pulse" : "h-1 opacity-50"
                }`}
              />
              <span
                className={`w-0.5 rounded-full bg-sky-400 transition-all ${
                  isAudioActive ? "h-3.5 animate-pulse" : "h-1 opacity-50"
                }`}
              />
            </span>
            <span className="hidden sm:inline">{isAudioActive ? "AUDIO: ON" : "AUDIO: OFF"}</span>
          </button>

          {/* Real-time UTC Time */}
          <span className="hidden lg:inline-block text-[11px] font-mono text-white/40 border-r border-white/10 pr-3">
            {time}
          </span>

          {/* Book a Demo / Launch Command Trigger */}
          <button
            type="button"
            onClick={() => {
              soundEngine.playClick()
              onOpenDemo?.()
            }}
            className="group flex items-center gap-2 rounded-full border border-white/14 bg-white/[0.08] px-4 py-2 text-xs font-semibold text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.14)] transition-all duration-150 hover:border-sky-400/50 hover:bg-white/[0.14] active:scale-[0.98]"
          >
            <span>Book demo</span>
            <span className="hidden sm:inline-block rounded-md border border-white/15 bg-white/10 px-1.5 py-0.5 text-[9px] font-mono text-white/60 group-hover:border-sky-400/40 group-hover:text-sky-300">
              ⌘K
            </span>
          </button>
        </div>
      </motion.div>
    </header>
  )
}
