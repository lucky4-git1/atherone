import { motion } from "framer-motion"
import { ContainerScroll } from "../components/ui/container-scroll"
import { FeatureShowcase } from "../components/ui/feature-showcase"
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

  return (
    <section
      id={index === 0 ? "experience" : index === total - 1 ? "architecture" : id}
      className="relative flex min-h-screen items-center overflow-hidden px-6 py-24 sm:px-8 lg:px-12"
    >
      <div
        className={`pointer-events-none absolute ${align === "left" ? "-left-10 sm:-left-16" : "-right-10 sm:-right-16"} top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-gradient-to-br ${accent} blur-3xl opacity-70 sm:h-72 sm:w-72 lg:h-80 lg:w-80`}
      />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-18">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.28 }}
          className={`min-w-0 max-w-xl ${textOrder}`}
        >
          <motion.p
            variants={viewportReveal}
            className="mb-5 text-[11px] font-medium uppercase tracking-[0.36em] text-white/48"
          >
            {label}
          </motion.p>
          <motion.h2
            variants={viewportReveal}
            className="text-3xl font-semibold leading-tight tracking-[-0.05em] text-white sm:text-4xl lg:text-5xl"
          >
            {title}
          </motion.h2>
          <motion.p variants={viewportReveal} className="mt-6 text-base leading-7 text-white/62">
            {description}
          </motion.p>

          <motion.div variants={staggerContainer} className="mt-8 grid gap-3">
            {metrics.map((metric) => (
              <motion.div
                key={metric}
                variants={viewportReveal}
                className="flex min-w-0 items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/70 backdrop-blur-md"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-white/65" />
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
            <FeatureShowcase accent={accent} metrics={metrics} title={title} />
          </ContainerScroll>
        </div>
      </div>
    </section>
  )
}
