import { motion } from "framer-motion"

const TICKER_ITEMS = [
  "SPATIAL REVEAL ENGINE",
  "60FPS HARDWARE ACCELERATED",
  "PRECISION KINETIC MOTION",
  "ZERO COMPOSITOR DROPS",
  "VOLUMETRIC WEBGL SHADER",
  "INTERACTIVE 3D RUNTIME",
  "AWWWARDS TIER CRAFT",
  "TACTILE SOUND ARCHITECTURE",
]

export function EditorialTicker() {
  return (
    <div className="relative w-full overflow-hidden border-y border-white/10 bg-black/40 py-4.5 backdrop-blur-md">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#020617] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#020617] to-transparent" />

      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
          duration: 28,
        }}
        className="flex w-max items-center gap-10 whitespace-nowrap"
      >
        {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, index) => (
          <div key={`${item}-${index}`} className="flex items-center gap-8">
            <span className="font-mono text-xs font-medium uppercase tracking-[0.32em] text-white/70 hover:text-white transition-colors">
              {item}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-sky-400/80 shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
          </div>
        ))}
      </motion.div>
    </div>
  )
}
