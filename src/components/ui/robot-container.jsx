import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Spotlight } from "./spotlight"
import { SplineScene } from "./splite"

function RobotFallback() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[1.7rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(125,211,252,0.18),rgba(17,24,39,0.08)_40%,rgba(2,6,23,0.92)_85%)]">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_28%,transparent_72%,rgba(255,255,255,0.04))]" />
      <div className="absolute left-6 right-6 top-6 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

      <div className="relative flex h-full flex-col justify-between p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-white/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/18" />
          </div>
          <span className="text-[10px] uppercase tracking-[0.28em] text-white/42">
            Robot stage
          </span>
        </div>

        <div className="relative mt-8 flex flex-1 items-center justify-center">
          <div className="absolute h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(125,211,252,0.28),rgba(129,140,248,0.1)_42%,rgba(2,6,23,0)_72%)] blur-3xl" />
          <div className="relative flex h-64 w-52 items-end justify-center">
            <div className="absolute bottom-0 h-28 w-36 rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.03))] shadow-[0_24px_80px_rgba(0,0,0,0.28)]" />
            <div className="absolute bottom-22 h-24 w-24 rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.14),rgba(255,255,255,0.03))]" />
            <div className="absolute bottom-40 h-20 w-20 rounded-[1.4rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(96,165,250,0.32),rgba(17,24,39,0.18)_58%,rgba(2,6,23,0.92))]" />
            <div className="absolute bottom-46 flex gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-sky-300 shadow-[0_0_12px_rgba(125,211,252,0.9)]" />
              <span className="h-2.5 w-2.5 rounded-full bg-sky-300 shadow-[0_0_12px_rgba(125,211,252,0.9)]" />
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between rounded-[1.2rem] border border-white/10 bg-white/[0.04] px-4 py-3">
          <span className="text-sm text-white/64">Spline-ready robot fallback</span>
          <span className="text-[10px] uppercase tracking-[0.24em] text-white/44">Fallback</span>
        </div>
      </div>
    </div>
  )
}

export function RobotContainer({ scene = "", className = "" }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const parallaxY = useTransform(scrollYProgress, [0, 1], [-32, 32])
  const parallaxScale = useTransform(scrollYProgress, [0, 1], [0.97, 1.03])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.28 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className={`relative h-full min-h-[420px] w-full overflow-hidden rounded-[1.9rem] ${className}`}
    >
      <div className="pointer-events-none absolute inset-0">
        <Spotlight className="-left-24 -top-28" fill="rgba(125,211,252,0.72)" />
        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(125,211,252,0.18),rgba(129,140,248,0.08)_42%,rgba(2,6,23,0)_74%)] blur-3xl" />
      </div>

      <motion.div
        style={{ y: parallaxY, scale: parallaxScale }}
        animate={{ y: [0, -18, 0] }}
        transition={{
          y: {
            duration: 5.2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          },
        }}
        className="relative h-full w-full transform-gpu"
      >
        {scene ? (
          <SplineScene scene={scene} className="h-full w-full" />
        ) : (
          <RobotFallback />
        )}
      </motion.div>
    </motion.div>
  )
}
