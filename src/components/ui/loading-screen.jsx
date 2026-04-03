import { motion } from "framer-motion"

const bootLabels = ["Shader field", "Motion engine", "Spline runtime", "UI composition"]

export function LoadingScreen({ progress = 0 }) {
  const activeIndex = Math.min(
    bootLabels.length - 1,
    Math.floor((progress / 100) * bootLabels.length),
  )

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        backdropFilter: "blur(0px)",
        transition: { duration: 0.95, ease: [0.22, 1, 0.36, 1] },
      }}
      className="fixed inset-0 z-[80] overflow-hidden bg-[#02030a]/82 backdrop-blur-xl"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.16),transparent_24%),radial-gradient(circle_at_75%_22%,rgba(168,85,247,0.12),transparent_22%),linear-gradient(180deg,rgba(2,6,23,0.95),rgba(0,0,0,1))]" />
      <div className="cyber-grid absolute inset-0 opacity-45" />
      <div className="cyber-scanline absolute inset-0 opacity-40" />
      <div className="cyber-noise absolute inset-0 opacity-25" />
      <motion.div
        animate={{ scale: [0.92, 1.06, 0.94], opacity: [0.55, 0.9, 0.62] }}
        transition={{ duration: 5.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(96,165,250,0.16),rgba(96,165,250,0)_68%)] blur-3xl"
      />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/6"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 24, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky-400/8"
      />
      <div className="cyber-shards absolute inset-0 opacity-55" />

      <div className="relative flex h-full items-center justify-center px-6">
        <div className="w-full max-w-3xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 text-[11px] uppercase tracking-[0.46em] text-white/45"
          >
            Initializing Experience
          </motion.p>

          <div className="relative inline-block">
            <motion.div
              initial={{ opacity: 0, scaleX: 0.75 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.85, delay: 0.04, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-none absolute -inset-x-8 -top-6 -bottom-6 rounded-[2rem] border border-white/8 bg-white/[0.015] backdrop-blur-sm"
            />
            <div className="pointer-events-none absolute -left-6 top-1/2 h-px w-4 -translate-y-1/2 bg-gradient-to-r from-transparent to-sky-300/75" />
            <div className="pointer-events-none absolute -right-6 top-1/2 h-px w-4 -translate-y-1/2 bg-gradient-to-l from-transparent to-violet-300/75" />
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="cyber-glitch relative text-[clamp(3rem,9vw,7rem)] font-semibold leading-none tracking-[-0.08em] text-white"
              data-text="AETHER"
            >
              AETHER
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-5 max-w-xl text-sm leading-6 text-white/56 sm:text-base"
          >
            Syncing interface layers, shader field, and cinematic motion systems.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-12 w-full max-w-xl"
          >
            <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.03] p-4 shadow-[0_20px_80px_rgba(0,0,0,0.22)] backdrop-blur-md">
              <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.28em] text-white/38">
                <span>System boot</span>
                <motion.span
                  key={progress}
                  initial={{ opacity: 0.2 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.24, ease: "easeOut" }}
                >
                  {String(progress).padStart(2, "0")}%
                </motion.span>
              </div>

              <div className="mt-4 overflow-hidden rounded-full border border-white/10 bg-white/[0.04] p-1">
                <motion.div
                  initial={false}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="relative h-1.5 rounded-full bg-gradient-to-r from-sky-400 via-cyan-300 to-violet-400"
                >
                  <motion.div
                    animate={{ x: ["-10%", "110%"] }}
                    transition={{ duration: 1.8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="absolute inset-y-0 w-12 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.75),transparent)] blur-[2px]"
                  />
                </motion.div>
              </div>

              <div className="mt-5 grid gap-2 sm:grid-cols-4">
                {bootLabels.map((label, index) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{
                      opacity: index <= activeIndex ? 1 : 0.42,
                      y: 0,
                      borderColor:
                        index === activeIndex
                          ? "rgba(125,211,252,0.4)"
                          : "rgba(255,255,255,0.08)",
                    }}
                    transition={{
                      duration: 0.4,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="rounded-[1rem] border border-white/8 bg-white/[0.03] px-3 py-3 text-left"
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <span
                        className="h-1.5 w-1.5 rounded-full shadow-[0_0_10px_rgba(125,211,252,0.8)]"
                        style={{
                          backgroundColor:
                            index <= activeIndex ? "rgb(125 211 252)" : "rgba(255,255,255,0.28)",
                        }}
                      />
                      <span className="text-[9px] uppercase tracking-[0.24em] text-white/38">
                        {index < activeIndex ? "Synced" : index === activeIndex ? "Loading" : "Queued"}
                      </span>
                    </div>
                    <p className="text-xs text-white/58">{label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
