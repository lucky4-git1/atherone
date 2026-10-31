import { motion, useTransform } from "framer-motion"
import { staggerContainer, viewportReveal } from "../components/ui/motion-variants"
import { soundEngine } from "@/lib/audio-synthesizer"

export function CTASection({ scrollYProgress, onOpenDemo }) {
  const glowScale = useTransform(scrollYProgress, [0.72, 1], [0.95, 1.15])

  return (
    <section id="cta" className="relative overflow-hidden px-5 py-28 sm:px-8 sm:py-36 lg:px-12">
      <motion.div
        style={{ scale: glowScale }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.18),transparent_65%)] blur-2xl"
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.015)),linear-gradient(145deg,rgba(6,10,24,0.94),rgba(2,5,16,0.98))] px-6 py-16 text-center shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_24px_80px_rgba(0,0,0,0.5)] backdrop-blur-md sm:px-12 sm:py-20"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.1),transparent_24%),radial-gradient(circle_at_78%_26%,rgba(56,189,248,0.08),transparent_20%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />

        <motion.div
          variants={viewportReveal}
          className="relative mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 text-[11px] font-mono uppercase tracking-[0.24em] text-white/60"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
          <span>Flagship Acoustic Hardware // Section 10</span>
        </motion.div>

        <motion.h2
          variants={viewportReveal}
          className="relative mx-auto max-w-3xl text-3xl font-semibold tracking-[-0.045em] text-white sm:text-4xl lg:text-5xl leading-tight"
        >
          Experience sound engineered as an art form.
        </motion.h2>

        <motion.p
          variants={viewportReveal}
          className="relative mx-auto mt-6 max-w-2xl text-base leading-7 text-white/65 sm:text-lg"
        >
          Custom 45mm planar-magnetic transducers, magnesium unibody acoustics, and uncolored studio transparency. Configure your pair or request an acoustic consultation.
        </motion.p>

        <motion.div variants={viewportReveal} className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href="#configure"
            onClick={() => soundEngine.playClick()}
            className="relative inline-flex items-center gap-2 rounded-full border border-sky-400/50 bg-sky-500/20 px-8 py-3.5 text-sm font-semibold text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_8px_24px_rgba(56,189,248,0.25)] backdrop-blur-md transition-colors duration-150 hover:bg-sky-500/30 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            <span>Configure Aether One</span>
            <span>→</span>
          </a>

          <button
            type="button"
            onClick={() => {
              soundEngine.playClick()
              onOpenDemo ? onOpenDemo() : null
            }}
            className="inline-flex items-center rounded-full border border-white/12 bg-white/[0.04] px-7 py-3.5 text-sm font-medium text-white/80 transition-colors duration-150 hover:border-white/20 hover:bg-white/[0.08] hover:text-white active:scale-[0.98]"
          >
            Inquire with Studio Lab
          </button>
        </motion.div>
      </motion.div>
    </section>
  )
}
