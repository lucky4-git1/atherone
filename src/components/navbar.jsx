import { motion } from "framer-motion"

export function Navbar({ isScrolled }) {
  return (
    <header className="fixed inset-x-0 top-0 z-30">
      <motion.div
        initial={false}
        animate={{
          backgroundColor: isScrolled ? "rgba(6, 11, 22, 0.58)" : "rgba(255, 255, 255, 0.04)",
          borderColor: isScrolled ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.08)",
          boxShadow: isScrolled
            ? "0 20px 60px rgba(0,0,0,0.28)"
            : "0 16px 42px rgba(0,0,0,0.16)",
        }}
        transition={{ duration: 0.45, ease: "easeInOut" }}
        className="mx-auto mt-3 flex h-16 w-[calc(100%-1rem)] max-w-7xl items-center justify-between rounded-full border px-4 backdrop-blur-xl sm:mt-4 sm:h-18 sm:w-[calc(100%-2rem)] sm:px-8 lg:px-12"
      >
        <div className="flex items-center gap-3">
          <div className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-sky-400 to-violet-400 shadow-[0_0_18px_rgba(96,165,250,0.8)]" />
          <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/72 sm:text-[11px] sm:tracking-[0.38em]">
            Aether One
          </span>
        </div>

        <nav className="hidden items-center gap-8 md:flex">
          {["Overview", "Experience", "Architecture", "Launch"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm text-white/60 transition-colors duration-300 hover:text-white"
            >
              {item}
            </a>
          ))}
        </nav>

        <a
          href="#cta"
          className="rounded-full border border-white/12 bg-white/[0.06] px-3 py-2 text-xs text-white transition-all duration-300 hover:border-white/20 hover:bg-white/[0.1] hover:text-white sm:px-4 sm:text-sm"
        >
          Book a demo
        </a>
      </motion.div>
    </header>
  )
}
