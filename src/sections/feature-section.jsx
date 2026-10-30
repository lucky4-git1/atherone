import { motion } from "framer-motion"
import { ContainerScroll } from "../components/ui/container-scroll"
import {
  SignalShowcase,
  FocusShowcase,
  DepthShowcase,
  CommandShowcase,
} from "../components/ui/feature-showcases"
import { staggerContainer, viewportReveal } from "../components/ui/motion-variants"

export function FeatureSection({
  id,
  label,
  title,
  description,
  metrics,
  accent,
  align = "left",
  index,
  total,
}) {
  const textOrder = align === "right" ? "lg:order-2" : ""
  const visualOrder = align === "right" ? "lg:order-1" : ""

  const renderShowcase = () => {
    switch (id) {
      case "signal":
        return <SignalShowcase />
      case "focus":
        return <FocusShowcase />
      case "depth":
        return <DepthShowcase />
      case "command":
        return <CommandShowcase />
      default:
        return <SignalShowcase />
    }
  }

  return (
    <section
      id={index === 0 ? "experience" : index === total - 1 ? "architecture" : id}
      className="relative flex min-h-screen items-center overflow-hidden px-6 py-24 sm:px-8 lg:px-12"
      style={{ contentVisibility: "auto", containIntrinsicSize: "1px 800px" }}
    >
      <div
        className={`pointer-events-none absolute ${
          align === "left" ? "-left-12 sm:-left-16" : "-right-12 sm:-right-16"
        } top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-gradient-to-br ${accent} blur-2xl opacity-40 sm:h-72 sm:w-72 lg:h-80 lg:w-80`}
      />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-18">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className={`min-w-0 max-w-xl ${textOrder}`}
        >
          {label && (
            <motion.div
              variants={viewportReveal}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 text-[11px] font-mono uppercase tracking-[0.22em] text-white/60"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
              <span>{String(index + 1).padStart(2, "0")} // {label}</span>
            </motion.div>
          )}

          <motion.h2
            variants={viewportReveal}
            className="text-3xl font-semibold leading-tight tracking-[-0.045em] text-white sm:text-4xl lg:text-5xl"
          >
            {title}
          </motion.h2>

          <motion.p variants={viewportReveal} className="mt-6 text-base leading-7 text-white/65">
            {description}
          </motion.p>

          <motion.div variants={staggerContainer} className="mt-8 grid gap-3">
            {metrics.map((metric) => (
              <motion.div
                key={metric}
                variants={viewportReveal}
                className="flex min-w-0 items-center gap-3.5 rounded-full border border-white/10 bg-white/[0.03] px-4.5 py-3 text-sm text-white/80 backdrop-blur-sm transition-all duration-150 hover:bg-white/[0.06] hover:border-white/18"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-sky-400/80 shadow-[0_0_6px_rgba(56,189,248,0.6)]" />
                <span className="truncate">{metric}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <div className={`min-w-0 ${visualOrder}`}>
          <ContainerScroll
            className="w-full"
            containerClassName="w-full"
            contentClassName="w-full"
          >
            {renderShowcase()}
          </ContainerScroll>
        </div>
      </div>
    </section>
  )
}
