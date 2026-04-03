import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { SplineScene } from "./splite"

const HERO_ROBOT_SCENE = "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"

function HeroRobotFallback() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[radial-gradient(circle_at_top,rgba(96,165,250,0.2),rgba(15,23,42,0.08)_42%,rgba(6,10,20,0.84)_88%)]">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_30%,transparent_70%,rgba(255,255,255,0.05))]" />
      <div className="pointer-events-none absolute inset-x-5 top-5 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />
      <div className="pointer-events-none absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[9px] uppercase tracking-[0.24em] text-white/45 backdrop-blur-sm">
        <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.95)]" />
        Interactive robot
      </div>
      <div className="pointer-events-none absolute inset-x-4 bottom-4 grid grid-cols-[0.95fr_1.05fr] gap-3">
        <div className="rounded-[1rem] border border-white/10 bg-black/20 p-3 backdrop-blur-md">
          <p className="text-[10px] uppercase tracking-[0.24em] text-white/38">Motion</p>
          <div className="mt-3 space-y-2">
            <div className="h-2 rounded-full bg-white/8">
              <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-sky-400 to-cyan-300" />
            </div>
            <div className="h-2 rounded-full bg-white/8">
              <div className="h-full w-[54%] rounded-full bg-gradient-to-r from-indigo-400 to-violet-300" />
            </div>
          </div>
        </div>
        <div className="rounded-[1rem] border border-white/10 bg-black/20 p-3 backdrop-blur-md">
          <p className="text-[10px] uppercase tracking-[0.24em] text-white/38">Density</p>
          <div className="mt-3 grid grid-cols-4 gap-2">
            <div className="h-8 rounded-lg bg-white/8" />
            <div className="h-8 rounded-lg bg-white/8" />
            <div className="h-8 rounded-lg bg-white/8" />
            <div className="h-8 rounded-lg bg-white/8" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function ScrollExpansionHero({ eyebrow, title, description, ctaLabel, ctaHref }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  })

  const frameScale = useTransform(scrollYProgress, [0, 0.18, 0.52], [0.84, 0.96, 1.02])
  const stageY = useTransform(scrollYProgress, [0, 0.22, 0.8], [96, 10, -40])
  const stageRadius = useTransform(scrollYProgress, [0, 0.28, 0.72], [34, 26, 20])
  const copyOpacity = useTransform(scrollYProgress, [0, 0.04, 0.68], [0.45, 1, 1])
  const copyY = useTransform(scrollYProgress, [0, 0.1], [26, 0])
  const glowScale = useTransform(scrollYProgress, [0, 1], [0.94, 1.18])
  const cardOpacity = useTransform(scrollYProgress, [0, 0.08, 0.7], [0.76, 0.96, 1])
  const detailOpacity = useTransform(scrollYProgress, [0, 0.08, 0.7], [0.45, 0.88, 1])

  return (
    <section ref={ref} id="overview" className="relative h-[200vh] sm:h-[210vh] lg:h-[220vh]">
      <div className="sticky top-0 flex min-h-screen items-center overflow-hidden px-5 pt-24 sm:px-8 sm:pt-28 lg:px-12">
        <motion.div
          style={{ scale: glowScale }}
          className="pointer-events-none absolute left-1/2 top-[46%] h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(148,197,255,0.16),rgba(129,140,248,0.08)_34%,rgba(2,6,23,0)_72%)] blur-3xl sm:h-[30rem] sm:w-[30rem] lg:h-[34rem] lg:w-[34rem]"
        />

        <div className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <motion.div
            style={{ opacity: copyOpacity, y: copyY }}
            className="relative z-10 min-w-0 max-w-2xl"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mb-5 text-[10px] uppercase tracking-[0.32em] text-white/52 sm:mb-6 sm:text-[11px] sm:tracking-[0.42em]"
            >
              {eyebrow}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 42, filter: "blur(14px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-5xl text-[clamp(2.9rem,9vw,6.7rem)] font-semibold leading-[0.9] tracking-[-0.07em] text-white"
            >
              {title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-xl text-sm leading-6 text-white/62 sm:mt-7 sm:text-base sm:leading-7 lg:text-lg"
            >
              {description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 sm:mt-10"
            >
              <motion.a
                href={ctaHref}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.985 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="inline-flex items-center rounded-full border border-white/12 bg-white/[0.07] px-5 py-3 text-sm font-medium text-white backdrop-blur-md transition-colors duration-300 hover:bg-white/[0.12] sm:px-6"
              >
                {ctaLabel}
              </motion.a>
            </motion.div>
          </motion.div>

          <div className="relative min-w-0 h-[26rem] sm:h-[30rem] lg:h-[42rem]">
            <motion.div
              style={{
                scale: frameScale,
                y: stageY,
                borderRadius: stageRadius,
                opacity: cardOpacity,
              }}
              className="absolute inset-0 origin-bottom transform-gpu overflow-hidden border border-white/14 bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(255,255,255,0.025)),linear-gradient(145deg,rgba(17,24,39,0.72),rgba(9,14,28,0.54))] shadow-[0_24px_80px_rgba(8,15,30,0.24)]"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(125,211,252,0.16),transparent_28%),radial-gradient(circle_at_80%_18%,rgba(129,140,248,0.16),transparent_22%),linear-gradient(180deg,rgba(255,255,255,0.05),transparent_30%)]" />
              <div className="absolute inset-[1px] rounded-[inherit] border border-white/8" />
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

              <div className="relative flex h-full flex-col p-4 sm:p-5 lg:p-6">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-white/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/35" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  </div>
                  <span className="text-[9px] uppercase tracking-[0.24em] text-white/45 sm:text-[10px] sm:tracking-[0.32em]">
                    Live product preview
                  </span>
                </div>

                <motion.div style={{ opacity: detailOpacity }} className="mt-4 flex flex-1">
                  <div className="relative h-full w-full overflow-hidden rounded-[1.8rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(96,165,250,0.18),rgba(15,23,42,0.08)_42%,rgba(6,10,20,0.78)_88%)]">
                    {HERO_ROBOT_SCENE ? (
                      <SplineScene
                        scene={HERO_ROBOT_SCENE}
                        className="hero-spline-stage h-full w-full"
                      />
                    ) : (
                      <HeroRobotFallback />
                    )}
                    <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_50%_8%,rgba(125,211,252,0.12),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_16%,transparent_84%,rgba(2,6,23,0.12))]" />
                    <div className="pointer-events-none absolute inset-x-5 top-5 z-10 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />
                    <div className="pointer-events-none absolute left-4 right-4 top-4 z-10 flex items-center justify-between">
                      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[9px] uppercase tracking-[0.24em] text-white/45 backdrop-blur-sm">
                        <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.95)]" />
                        Interactive robot
                      </div>
                      <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[9px] uppercase tracking-[0.24em] text-white/42 backdrop-blur-sm">
                        Hero stage
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
