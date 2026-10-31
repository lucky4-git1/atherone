import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { SplineScene } from "./splite"
import { soundEngine } from "@/lib/audio-synthesizer"

const HERO_ROBOT_SCENE = "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"

function HeroRobotFallback() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[radial-gradient(circle_at_top,rgba(96,165,250,0.18),rgba(15,23,42,0.08)_42%,rgba(6,10,20,0.92)_88%)]">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),transparent_30%,transparent_70%,rgba(255,255,255,0.04))]" />
      <div className="pointer-events-none absolute inset-x-5 top-5 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />
      <div className="pointer-events-none absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[9px] uppercase tracking-[0.24em] text-white/50 backdrop-blur-sm">
        <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
        Interactive Robot Engine
      </div>
      <div className="pointer-events-none absolute inset-x-4 bottom-4 grid grid-cols-[0.95fr_1.05fr] gap-3">
        <div className="rounded-[1rem] border border-white/10 bg-black/30 p-3 backdrop-blur-md">
          <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-white/40">Motion Index</p>
          <div className="mt-3 space-y-2">
            <div className="h-2 rounded-full bg-white/8">
              <div className="h-full w-[72%] rounded-full bg-sky-400" />
            </div>
            <div className="h-2 rounded-full bg-white/8">
              <div className="h-full w-[54%] rounded-full bg-white/60" />
            </div>
          </div>
        </div>
        <div className="rounded-[1rem] border border-white/10 bg-black/30 p-3 backdrop-blur-md">
          <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-white/40">Density</p>
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

export function ScrollExpansionHero({
  eyebrow,
  title,
  description,
  ctaLabel,
  ctaHref = "#configure",
  secondaryHref = "#philosophy",
  onOpenDemo,
}) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  })

  // Smooth GPU composited properties
  const frameScale = useTransform(scrollYProgress, [0, 0.2, 0.6], [0.86, 0.98, 1.02])
  const stageY = useTransform(scrollYProgress, [0, 0.22, 0.8], [70, 0, -30])
  const copyOpacity = useTransform(scrollYProgress, [0, 0.05, 0.65], [0.6, 1, 1])
  const copyY = useTransform(scrollYProgress, [0, 0.12], [20, 0])
  const glowScale = useTransform(scrollYProgress, [0, 1], [0.95, 1.15])
  const cardOpacity = useTransform(scrollYProgress, [0, 0.08, 0.7], [0.82, 0.98, 1])
  const detailOpacity = useTransform(scrollYProgress, [0, 0.08, 0.7], [0.6, 0.92, 1])

  return (
    <section ref={ref} id="overview" className="relative h-[200vh] sm:h-[210vh] lg:h-[220vh]">
      <div className="sticky top-0 flex min-h-[100dvh] items-center overflow-hidden px-5 pt-24 sm:px-8 sm:pt-28 lg:px-12">
        <motion.div
          style={{ scale: glowScale }}
          className="pointer-events-none absolute left-1/2 top-[46%] h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.12),transparent_70%)] blur-2xl sm:h-[30rem] sm:w-[30rem] lg:h-[34rem] lg:w-[34rem]"
        />

        <div className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:gap-14">
          <motion.div
            style={{ opacity: copyOpacity, y: copyY }}
            className="relative z-10 min-w-0 max-w-2xl"
          >
            {eyebrow && (
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 text-[11px] font-mono uppercase tracking-[0.22em] text-white/60">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                <span>{eyebrow}</span>
              </div>
            )}

            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-5xl text-[clamp(2.8rem,8.5vw,6rem)] font-semibold leading-[0.93] tracking-[-0.055em] text-white"
            >
              {title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 max-w-xl text-base leading-7 text-white/65 sm:mt-7 sm:text-lg sm:leading-8"
            >
              {description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 flex flex-wrap items-center gap-4 sm:mt-10"
            >
              <a
                href={ctaHref}
                onClick={() => soundEngine.playClick()}
                className="inline-flex items-center gap-2 rounded-full border border-sky-400/50 bg-sky-500/20 px-6 py-3.5 text-sm font-semibold text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_8px_24px_rgba(56,189,248,0.25)] backdrop-blur-md transition-all duration-150 hover:bg-sky-500/30 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
              >
                <span>{ctaLabel}</span>
                <span>→</span>
              </a>

              <a
                href={secondaryHref}
                onClick={() => soundEngine.playHover()}
                className="inline-flex items-center rounded-full border border-white/12 bg-white/[0.04] px-6 py-3.5 text-sm font-medium text-white/80 transition-all duration-150 hover:border-white/22 hover:bg-white/[0.08] hover:text-white active:scale-[0.98]"
              >
                Explore Acoustics
              </a>

              {onOpenDemo && (
                <button
                  type="button"
                  onClick={() => {
                    soundEngine.playClick()
                    onOpenDemo()
                  }}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-3.5 text-xs font-mono uppercase text-white/50 hover:text-white hover:border-white/20 transition-all active:scale-[0.98]"
                >
                  <span>Inquire ⌘K</span>
                </button>
              )}
            </motion.div>

            <div className="mt-10 flex flex-wrap items-center gap-6 border-t border-white/8 pt-6 text-xs font-mono text-white/45">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>45MM PLANAR-MAGNETIC</span>
              </div>
              <div>CNC MAGNESIUM UNIBODY</div>
              <div>10 HZ – 48 KHZ</div>
            </div>
          </motion.div>

          <div className="relative min-w-0 h-[26rem] sm:h-[30rem] lg:h-[42rem]">
            <motion.div
              style={{
                scale: frameScale,
                y: stageY,
                opacity: cardOpacity,
                willChange: "transform, opacity",
              }}
              className="absolute inset-0 origin-bottom transform-gpu overflow-hidden rounded-[2rem] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02)),linear-gradient(145deg,rgba(17,24,39,0.72),rgba(9,14,28,0.54))] shadow-[0_24px_80px_rgba(8,15,30,0.32)]"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(125,211,252,0.14),transparent_28%),radial-gradient(circle_at_80%_18%,rgba(129,140,248,0.14),transparent_22%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent_30%)]" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

              <div className="relative flex h-full flex-col p-4 sm:p-5 lg:p-6">
                <div className="flex items-center justify-between gap-3 pb-3 border-b border-white/8">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-white/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/35" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.28em] text-white/50">
                    Spatial 3D Stage // Active
                  </span>
                </div>

                <motion.div style={{ opacity: detailOpacity }} className="mt-4 flex flex-1">
                  <div className="relative h-full w-full overflow-hidden rounded-[1.6rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(96,165,250,0.16),rgba(15,23,42,0.08)_42%,rgba(6,10,20,0.85)_88%)]">
                    {HERO_ROBOT_SCENE ? (
                      <SplineScene
                        scene={HERO_ROBOT_SCENE}
                        className="hero-spline-stage h-full w-full"
                      />
                    ) : (
                      <HeroRobotFallback />
                    )}
                    <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_50%_8%,rgba(125,211,252,0.1),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_16%,transparent_84%,rgba(2,6,23,0.12))]" />
                    <div className="pointer-events-none absolute inset-x-5 top-5 z-10 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />
                    <div className="pointer-events-none absolute left-4 right-4 top-4 z-10 flex items-center justify-between">
                      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[9px] font-mono uppercase tracking-[0.24em] text-white/60 backdrop-blur-sm">
                        <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                        Interactive 3D
                      </div>
                      <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[9px] font-mono uppercase tracking-[0.24em] text-white/50 backdrop-blur-sm">
                        DRAG TO ROTATE
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
