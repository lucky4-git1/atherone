import { motion, useTransform } from "framer-motion"
import { staggerContainer, viewportReveal } from "../components/ui/motion-variants"

export function CTASection({ scrollYProgress }) {
  const glowScale = useTransform(scrollYProgress, [0.72, 1], [0.9, 1.2])

  return (
    <section id="cta" className="relative overflow-hidden px-5 py-24 sm:px-8 sm:py-28 lg:px-12">
      <motion.div
        style={{ scale: glowScale }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(96,165,250,0.24),rgba(15,23,42,0)_68%)] blur-3xl"
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        className="relative mx-auto max-w-5xl overflow-hidden rounded-[1.7rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02)),linear-gradient(145deg,rgba(2,6,23,0.86),rgba(15,23,42,0.72))] px-5 py-12 text-center shadow-[0_26px_100px_rgba(0,0,0,0.42)] backdrop-blur-xl sm:rounded-[2rem] sm:px-10 sm:py-14"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.14),transparent_24%),radial-gradient(circle_at_78%_26%,rgba(96,165,250,0.12),transparent_18%)]" />
        <motion.p
          variants={viewportReveal}
          className="relative text-[11px] uppercase tracking-[0.38em] text-white/45"
        >
          Launch ready
        </motion.p>
        <motion.h2
          variants={viewportReveal}
          className="relative mx-auto mt-5 max-w-3xl text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl lg:text-5xl"
        >
          Turn your product page into a controlled, memorable story.
        </motion.h2>
        <motion.p
          variants={viewportReveal}
          className="relative mx-auto mt-6 max-w-2xl text-sm leading-6 text-white/60 sm:text-base sm:leading-7"
        >
          Modular sections, premium motion, and a living shader backdrop that keeps the page
          immersive without compromising clarity.
        </motion.p>
        <motion.div variants={viewportReveal} className="mt-10 flex justify-center">
          <motion.a
            href="mailto:hello@aetherone.design"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.985 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="relative inline-flex items-center rounded-full border border-white/12 bg-white/[0.07] px-6 py-3 text-sm font-medium text-white backdrop-blur-md transition-colors duration-300 hover:bg-white/[0.12]"
          >
            Contact the studio
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  )
}
