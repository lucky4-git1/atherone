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
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
      }}
      className="fixed inset-0 z-[80] overflow-hidden bg-[#02030a]/90 backdrop-blur-md"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.14),transparent_30%),radial-gradient(circle_at_75%_22%,rgba(168,85,247,0.1),transparent_25%),linear-gradient(180deg,rgba(2,6,23,0.95),rgba(0,0,0,1))]" />
      <div className="cyber-grid absolute inset-0 opacity-30" />

      <div className="relative flex h-full items-center justify-center px-6">
        <div className="w-full max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-[10px] uppercase tracking-[0.34em] text-white/50">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
            <span>Initializing Experience</span>
          </div>

          <div className="relative inline-block">
            <div className="pointer-events-none absolute -inset-x-8 -top-6 -bottom-6 rounded-[2rem] border border-white/8 bg-white/[0.015]" />
            <div className="pointer-events-none absolute -left-6 top-1/2 h-px w-4 -translate-y-1/2 bg-gradient-to-r from-transparent to-sky-300/75" />
            <div className="pointer-events-none absolute -right-6 top-1/2 h-px w-4 -translate-y-1/2 bg-gradient-to-l from-transparent to-violet-300/75" />
            <h1
              className="cyber-glitch relative text-[clamp(2.8rem,8vw,6.5rem)] font-semibold leading-none tracking-[-0.07em] text-white"
              data-text="AETHER"
            >
              AETHER
            </h1>
          </div>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-white/55 sm:text-base">
            Syncing interface layers, shader field, and cinematic motion systems.
          </p>

          <div className="mx-auto mt-10 w-full max-w-xl">
            <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.03] p-4 shadow-[0_16px_50px_rgba(0,0,0,0.3)] backdrop-blur-md">
              <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.28em] text-white/40">
                <span>System boot</span>
                <span className="tabular-nums font-mono text-white/70">
                  {String(progress).padStart(2, "0")}%
                </span>
              </div>

              <div className="mt-4 overflow-hidden rounded-full border border-white/10 bg-white/[0.04] p-1">
                <div
                  style={{ width: `${progress}%` }}
                  className="relative h-1.5 rounded-full bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.5)] transition-[width] duration-150 ease-out"
                />
              </div>

              <div className="mt-5 grid gap-2 sm:grid-cols-4">
                {bootLabels.map((label, index) => (
                  <div
                    key={label}
                    className={`rounded-[1rem] border px-3 py-3 text-left transition-colors duration-200 ${
                      index <= activeIndex
                        ? "border-sky-400/35 bg-white/[0.05]"
                        : "border-white/6 bg-white/[0.02] opacity-40"
                    }`}
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{
                          backgroundColor:
                            index <= activeIndex ? "rgb(125 211 252)" : "rgba(255,255,255,0.28)",
                          boxShadow:
                            index <= activeIndex
                              ? "0 0 8px rgba(125,211,252,0.8)"
                              : "none",
                        }}
                      />
                      <span className="text-[9px] uppercase tracking-[0.22em] text-white/40">
                        {index < activeIndex ? "Synced" : index === activeIndex ? "Loading" : "Queued"}
                      </span>
                    </div>
                    <p className="text-xs text-white/60">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
