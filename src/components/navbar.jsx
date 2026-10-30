import { motion } from "framer-motion"

export function Navbar({ isScrolled }) {
  return (
    <header className="fixed inset-x-0 top-0 z-30">
      <motion.div
        initial={false}
        animate={{
          backgroundColor: isScrolled ? "rgba(6, 11, 22, 0.72)" : "rgba(255, 255, 255, 0.03)",
          borderColor: isScrolled ? "rgba(255, 255, 255, 0.12)" : "rgba(255, 255, 255, 0.08)",
          boxShadow: isScrolled
            ? "0 20px 50px rgba(0,0,0,0.32)"
            : "0 10px 30px rgba(0,0,0,0.12)",
        }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto mt-3 flex h-16 w-[calc(100%-1.2rem)] max-w-7xl items-center justify-between rounded-full border px-4 backdrop-blur-md sm:mt-4 sm:h-18 sm:w-[calc(100%-2rem)] sm:px-8 lg:px-12"
      >
        <div className="flex items-center gap-3">
          <div className="h-2.5 w-2.5 rounded-full bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.8)]" />
          <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/80 sm:text-[11px] sm:tracking-[0.38em]">
            Aether One
          </span>
        </div>

        <nav className="hidden items-center gap-8 md:flex">
          {["Overview", "Experience", "Architecture", "Launch"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium text-white/65 transition-colors duration-150 hover:text-white"
            >
              {item}
            </a>
          ))}
        </nav>

        <a
          href="#cta"
          className="rounded-full border border-white/14 bg-white/[0.08] px-4 py-2 text-xs font-medium text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.14)] transition-all duration-150 hover:border-white/24 hover:bg-white/[0.14] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 sm:px-5 sm:text-sm"
        >
          Book a demo
        </a>
      </motion.div>
    </header>
  )
}
