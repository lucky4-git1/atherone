import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { soundEngine } from "@/lib/audio-synthesizer"
import { useBag } from "@/context/bag-context"

const NAV_LINKS = [
  { label: "Acoustics", href: "#philosophy" },
  { label: "3D Inspector", href: "#inspector" },
  { label: "Audition Lab", href: "#audition" },
  { label: "Customizer", href: "#configure" },
  { label: "Specs", href: "#specifications" },
]

export function Navbar({ isScrolled, onOpenDemo }) {
  const [activeSection, setActiveSection] = useState("overview")
  const [isAudioActive, setIsAudioActive] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { totalItemCount, setIsBagOpen } = useBag()

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sectionIds = ["overview", "philosophy", "inspector", "anatomy", "audition", "configure", "specifications", "support"]
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: "-30% 0px -60% 0px" }
    )

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  // Keyboard shortcut for Demo & Escape to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        onOpenDemo?.()
      }
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isMobileMenuOpen, onOpenDemo])

  const toggleSound = () => {
    const muted = soundEngine.toggleMute()
    setIsAudioActive(!muted)
  }

  const handleLinkClick = () => {
    soundEngine.playClick()
    setIsMobileMenuOpen(false)
  }

  const handleBagClick = () => {
    soundEngine.playClick()
    setIsBagOpen(true)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-40 transition-all duration-300">
      <motion.div
        initial={false}
        animate={{
          backgroundColor: isScrolled ? "rgba(4, 8, 20, 0.92)" : "rgba(8, 12, 28, 0.65)",
          borderColor: isScrolled ? "rgba(255, 255, 255, 0.12)" : "rgba(255, 255, 255, 0.08)",
          boxShadow: isScrolled
            ? "0 20px 40px -15px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
            : "0 10px 30px -10px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
        }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto mt-3 flex h-14 w-[calc(100%-1.5rem)] max-w-6xl items-center justify-between rounded-full border px-4 backdrop-blur-xl sm:mt-4 sm:h-16 sm:px-6 lg:px-8"
      >
        {/* Brand Mark */}
        <a
          href="#overview"
          className="flex items-center gap-2.5 group"
          onClick={() => soundEngine.playClick()}
        >
          <div className="relative flex h-3 w-3 items-center justify-center">
            <span className="absolute h-full w-full rounded-full bg-sky-400 opacity-75 animate-ping" />
            <span className="relative h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,1)]" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-[0.26em] text-white transition-colors group-hover:text-sky-300">
            Aether One
          </span>
        </a>

        {/* Curated Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2 rounded-full border border-white/6 bg-white/[0.02] p-1">
          {NAV_LINKS.map((item) => {
            const isActive = activeSection === item.href.replace("#", "")
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={() => soundEngine.playClick()}
                onMouseEnter={() => soundEngine.playHover()}
                className={`relative px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider rounded-full transition-colors duration-150 ${
                  isActive ? "text-white font-semibold" : "text-white/60 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavPill"
                    className="absolute inset-0 rounded-full bg-white/12 border border-white/15 shadow-inner"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </a>
            )
          })}
        </nav>

        {/* Action Cluster */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Audio Synthesizer Micro EQ */}
          <button
            type="button"
            onClick={toggleSound}
            title={isAudioActive ? "Interactive audio is active" : "Audio muted"}
            className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-[10px] font-mono uppercase tracking-wider text-white/70 hover:border-white/20 hover:text-white transition-colors duration-150 active:scale-95"
          >
            <span className="flex items-center gap-0.5 h-3">
              <span
                className={`w-0.5 rounded-full bg-sky-400 transition-[height,opacity] duration-150 ${
                  isAudioActive ? "h-3 animate-pulse" : "h-1 opacity-40"
                }`}
              />
              <span
                className={`w-0.5 rounded-full bg-sky-400 transition-[height,opacity] duration-150 ${
                  isAudioActive ? "h-2 animate-pulse" : "h-1 opacity-40"
                }`}
              />
              <span
                className={`w-0.5 rounded-full bg-sky-400 transition-[height,opacity] duration-150 ${
                  isAudioActive ? "h-3.5 animate-pulse" : "h-1 opacity-40"
                }`}
              />
            </span>
            <span className="hidden sm:inline text-[9px]">
              {isAudioActive ? "Sound" : "Mute"}
            </span>
          </button>

          {/* Shopping Bag Drawer Trigger */}
          <button
            type="button"
            onClick={handleBagClick}
            className="relative flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.06] px-3 py-1.5 text-xs font-mono uppercase text-white hover:border-sky-400/50 hover:bg-white/[0.12] transition-colors duration-150 active:scale-95"
            aria-label={`Open shopping bag (${totalItemCount} items)`}
          >
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-none stroke-current stroke-2">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" />
            </svg>
            <span className="hidden sm:inline">Bag</span>
            {totalItemCount > 0 ? (
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-sky-400 font-mono text-[9px] font-bold text-black shadow-[0_0_8px_rgba(56,189,248,0.9)]">
                {totalItemCount}
              </span>
            ) : null}
          </button>

          {/* Primary Action Button */}
          <button
            type="button"
            onClick={() => {
              soundEngine.playClick()
              onOpenDemo?.()
            }}
            className="group hidden sm:flex items-center gap-1.5 rounded-full border border-sky-400/50 bg-sky-500/20 px-3.5 py-1.5 text-xs font-semibold text-white shadow-[0_0_15px_rgba(56,189,248,0.2)] hover:bg-sky-500/30 transition-colors duration-150 active:scale-95"
          >
            <span>Inquire</span>
            <span className="text-[9px] font-mono text-sky-300 opacity-70">⌘K</span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            onClick={() => {
              soundEngine.playClick()
              setIsMobileMenuOpen(!isMobileMenuOpen)
            }}
            className="flex md:hidden h-8 w-8 items-center justify-center rounded-full border border-white/12 bg-white/[0.06] text-white/80 hover:text-white"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <div className="relative h-3 w-3.5 flex flex-col justify-between">
              <span
                className={`h-0.5 w-full bg-current rounded-full transition-transform duration-200 ${
                  isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
                }`}
              />
              <span
                className={`h-0.5 w-full bg-current rounded-full transition-opacity duration-200 ${
                  isMobileMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`h-0.5 w-full bg-current rounded-full transition-transform duration-200 ${
                  isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </motion.div>

      {/* Mobile Editorial Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col justify-between bg-[#02050e]/98 backdrop-blur-2xl p-6 sm:p-8 md:hidden"
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

            <nav className="my-auto flex flex-col gap-4 py-6">
              {NAV_LINKS.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={handleLinkClick}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.04, duration: 0.2 }}
                  className="text-xl font-semibold tracking-tight text-white/80 hover:text-white hover:translate-x-2 transition-transform duration-150 flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  <span className="text-xs font-mono text-white/30">0{index + 1}</span>
                </motion.a>
              ))}
            </nav>

            <div className="space-y-3 border-t border-white/10 pt-5">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  handleBagClick()
                }}
                className="w-full rounded-full border border-sky-400/50 bg-sky-500/20 py-3 text-center text-sm font-semibold text-white shadow-[0_4px_16px_rgba(56,189,248,0.25)]"
              >
                Open Shopping Bag ({totalItemCount})
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  onOpenDemo?.()
                }}
                className="w-full rounded-full border border-white/15 bg-white/[0.05] py-3 text-center text-xs font-mono uppercase tracking-wider text-white"
              >
                Inquire Studio Demo (⌘K)
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
