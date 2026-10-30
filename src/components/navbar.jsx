import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { soundEngine } from "@/lib/audio-synthesizer"

const NAV_LINKS = [
  { label: "Overview", href: "#overview" },
  { label: "Manifesto", href: "#manifesto" },
  { label: "Workbench", href: "#workbench" },
  { label: "Architecture", href: "#experience" },
  { label: "Launch", href: "#cta" },
]

export function Navbar({ isScrolled, onOpenDemo }) {
  const [time, setTime] = useState("")
  const [isAudioActive, setIsAudioActive] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(now.toTimeString().split(" ")[0] + " UTC")
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isMobileMenuOpen])

  const toggleSound = () => {
    const muted = soundEngine.toggleMute()
    setIsAudioActive(!muted)
  }

  const handleLinkClick = () => {
    soundEngine.playClick()
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <motion.div
        initial={false}
        animate={{
          backgroundColor: isScrolled ? "rgba(6, 11, 24, 0.88)" : "rgba(255, 255, 255, 0.03)",
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

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => soundEngine.playClick()}
              onMouseEnter={() => soundEngine.playHover()}
              className="text-xs font-mono uppercase tracking-wider text-white/60 transition-colors duration-150 hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Desktop Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
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

          {/* Book a Demo Trigger */}
          <button
            type="button"
            onClick={() => {
              soundEngine.playClick()
              onOpenDemo?.()
            }}
            className="group hidden sm:flex items-center gap-2 rounded-full border border-white/14 bg-white/[0.08] px-4 py-2 text-xs font-semibold text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.14)] transition-all duration-150 hover:border-sky-400/50 hover:bg-white/[0.14] active:scale-[0.98]"
          >
            <span>Book demo</span>
            <span className="rounded-md border border-white/15 bg-white/10 px-1.5 py-0.5 text-[9px] font-mono text-white/60 group-hover:border-sky-400/40 group-hover:text-sky-300">
              ⌘K
            </span>
          </button>

          {/* Mobile Hamburger Menu Toggle */}
          <button
            type="button"
            onClick={() => {
              soundEngine.playClick()
              setIsMobileMenuOpen(!isMobileMenuOpen)
            }}
            className="flex md:hidden h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-white/[0.06] text-white/80 hover:text-white"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <div className="relative h-3.5 w-4 flex flex-col justify-between">
              <span
                className={`h-0.5 w-full bg-current rounded-full transition-all duration-200 ${
                  isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
                }`}
              />
              <span
                className={`h-0.5 w-full bg-current rounded-full transition-all duration-200 ${
                  isMobileMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`h-0.5 w-full bg-current rounded-full transition-all duration-200 ${
                  isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </motion.div>

      {/* Mobile Menu Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col justify-between bg-[#02050e]/96 backdrop-blur-xl p-6 sm:p-8 md:hidden"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <div className="flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full bg-sky-400" />
                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-white">
                  Aether One Navigation
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-full p-2 text-white/60 hover:text-white"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-current stroke-2 fill-none">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="my-auto flex flex-col gap-5 py-6">
              {NAV_LINKS.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={handleLinkClick}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.2 }}
                  className="text-2xl font-semibold tracking-tight text-white/80 hover:text-white hover:translate-x-2 transition-all flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  <span className="text-xs font-mono text-white/30">0{index + 1}</span>
                </motion.a>
              ))}
            </nav>

            <div className="space-y-4 border-t border-white/10 pt-5">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  onOpenDemo?.()
                }}
                className="w-full rounded-full border border-sky-400/50 bg-sky-500/20 py-3 text-center text-sm font-semibold text-white shadow-[0_4px_16px_rgba(56,189,248,0.25)]"
              >
                Request Studio Demonstration
              </button>

              <div className="flex items-center justify-between font-mono text-[11px] text-white/40">
                <span>{time || "UTC CLOCK"}</span>
                <span>STATUS: NOMINAL</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
