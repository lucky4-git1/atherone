import { motion, useTransform } from "framer-motion"
import { staggerContainer, viewportReveal } from "../components/ui/motion-variants"

export function CTASection({ scrollYProgress }) {
  const glowScale = useTransform(scrollYProgress, [0.72, 1], [0.95, 1.15])

  return (
    <section id="cta" className="relative overflow-hidden px-5 py-24 sm:px-8 sm:py-28 lg:px-12">
      <motion.div
        style={{ scale: glowScale }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(96,165,250,0.2),transparent_65%)] blur-2xl"
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.015)),linear-gradient(145deg,rgba(2,6,23,0.88),rgba(15,23,42,0.76))] px-6 py-14 text-center shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_24px_80px_rgba(0,0,0,0.4)] backdrop-blur-md sm:px-12 sm:py-16"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_24%),radial-gradient(circle_at_78%_26%,rgba(96,165,250,0.1),transparent_20%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />

        <motion.div
          variants={viewportReveal}
          className="relative mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 text-[11px] font-medium tracking-[0.24em] text-white/60"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
          <span>Launch ready</span>
        </motion.div>

        <motion.h2
          variants={viewportReveal}
          className="relative mx-auto max-w-3xl text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl lg:text-5xl"
        >
          Turn your product page into a controlled, memorable story.
        </motion.h2>

        <motion.p
          variants={viewportReveal}
          className="relative mx-auto mt-6 max-w-2xl text-base leading-7 text-white/65"
        >
          Modular sections, cinematic motion, and an optimized living shader backdrop that keeps
          the experience fluid without sacrificing performance.
        </motion.p>

        <motion.div variants={viewportReveal} className="mt-10 flex justify-center">
          <a
            href="mailto:hello@aetherone.design"
            className="relative inline-flex items-center rounded-full border border-white/14 bg-white/[0.08] px-7 py-3.5 text-sm font-medium text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.14),0_8px_20px_-4px_rgba(0,0,0,0.3)] backdrop-blur-md transition-all duration-150 hover:bg-white/[0.14] hover:border-white/24 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            Contact the studio
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}
