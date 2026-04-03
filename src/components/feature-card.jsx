import { motion } from "framer-motion"
import { cardReveal, staggerContainer } from "./ui/motion-variants"

export function FeatureCard({ accent, metrics }) {
  return (
    <motion.div
      variants={cardReveal}
      className="liquid-glass rounded-[2rem] p-6"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${accent} opacity-80`} />
      <div className="absolute inset-x-6 top-6 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

      <div className="relative space-y-6">
        <div className="grid grid-cols-2 gap-3 text-[11px] uppercase tracking-[0.28em] text-white/55">
          <span>Realtime</span>
          <span className="text-right">Adaptive</span>
        </div>

        <div className="liquid-glass-soft rounded-[1.6rem] p-4">
          <div className="mb-4 flex items-center justify-between text-xs text-white/45">
            <span>Experience engine</span>
            <span>Live</span>
          </div>

          <div className="space-y-3">
            <div className="h-28 rounded-[1.3rem] bg-[radial-gradient(circle_at_top,rgba(125,211,252,0.22),rgba(17,24,39,0.08)_40%,rgba(2,6,23,0.85)_80%)] ring-1 ring-white/8" />
            <div className="grid grid-cols-3 gap-3">
              <div className="liquid-glass-soft h-18 rounded-2xl" />
              <div className="liquid-glass-soft h-18 rounded-2xl" />
              <div className="liquid-glass-soft h-18 rounded-2xl" />
            </div>
          </div>
        </div>

        <motion.div
          variants={staggerContainer}
          className="grid gap-3 text-sm text-white/72 sm:grid-cols-3"
        >
          {metrics.map((metric) => (
            <motion.div
              key={metric}
              variants={cardReveal}
              className="liquid-glass-soft rounded-2xl px-4 py-3"
            >
              {metric}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}
