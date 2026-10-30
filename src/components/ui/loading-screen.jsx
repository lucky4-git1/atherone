import { motion } from "framer-motion"

export function LoadingScreen({ progress = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
      }}
      className="fixed inset-0 z-[100] flex flex-col justify-between overflow-hidden bg-[#030611] px-6 py-8 sm:px-12 sm:py-12"
    >
      {/* Top shutter panel for split cinematic exit */}
      <motion.div
        exit={{ y: "-100%" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-[#02050e]"
      />
      {/* Bottom shutter panel for split cinematic exit */}
      <motion.div
        exit={{ y: "100%" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-[#02050e]"
      />

      {/* Luminous laser horizon line */}
      <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-sky-400/40 to-transparent" />

      {/* Top Header Telemetry */}
      <div className="relative z-10 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.24em] text-white/50">
        <div className="flex items-center gap-2.5">
          <span className="h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
          <span className="text-white font-medium">Aether One</span>
          <span className="text-white/30">•</span>
          <span>Spatial Interface Engine</span>
        </div>
        <div className="hidden sm:flex items-center gap-6 text-white/40">
          <span>LAT: 37.7749° N</span>
          <span>WEBGL 2.0</span>
          <span>DISPATCH: PROD</span>
        </div>
      </div>

      {/* Center Cinematic Stage */}
      <div className="relative z-10 mx-auto w-full max-w-4xl text-center">
        <div className="inline-block">
          <p className="text-[10px] font-mono uppercase tracking-[0.34em] text-white/45 mb-4">
            System Initialization Sequence
          </p>
          <div className="flex items-baseline justify-center gap-2">
            <h1 className="font-mono text-7xl font-bold tracking-tighter text-white sm:text-9xl">
              {String(progress).padStart(2, "0")}
            </h1>
            <span className="font-mono text-2xl font-light text-sky-400/80 sm:text-4xl">%</span>
          </div>
        </div>

        {/* Precision Progress Bar */}
        <div className="mx-auto mt-8 max-w-md">
          <div className="h-1 w-full overflow-hidden rounded-full bg-white/8">
            <motion.div
              style={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-sky-400 to-sky-300 shadow-[0_0_12px_rgba(56,189,248,0.8)] transition-all duration-100 ease-out"
            />
          </div>
          <div className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase text-white/40">
            <span>Loading Spatial Pipeline</span>
            <span>{progress >= 100 ? "Ready // Entering" : "Compiling Viewport"}</span>
          </div>
        </div>
      </div>

      {/* Bottom Telemetry Footer */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/6 pt-4 font-mono text-[10px] uppercase text-white/40">
        <div>Architecture: Hardware Accelerated 60FPS</div>
        <div className="flex items-center gap-4">
          <span>Mem: &lt; 42MB</span>
          <span>Jitter: 0.00%</span>
        </div>
      </div>
    </motion.div>
  )
}
