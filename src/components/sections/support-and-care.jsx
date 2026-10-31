import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PRODUCT_DATA } from "@/data/product-data"
import { soundEngine } from "@/lib/audio-synthesizer"

export function SupportAndCare() {
  const [openFaq, setOpenFaq] = useState(0)

  const toggleFaq = (index) => {
    soundEngine.playClick()
    setOpenFaq(openFaq === index ? -1 : index)
  }

  const careTips = [
    {
      title: "Magnetic Snap Cushions",
      desc: "Both velour and protein leather earpads snap off with gentle outwards pull. Clean with damp microfiber cloth. Never submerge in water.",
    },
    {
      title: "Cell Management",
      desc: "For optimal lithium lifespan, store between 20% and 80% charge if unused for extended studio periods. Standard USB-C PD charging recommended.",
    },
    {
      title: "Passive Wired Mode",
      desc: "When connected via analog 3.5mm or balanced 4.4mm cable, battery circuitry is bypassed completely. No battery power is consumed during passive listening.",
    },
  ]

  return (
    <section id="support" className="relative mx-auto max-w-7xl px-6 py-28 sm:px-8 sm:py-36 lg:px-12">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01)),linear-gradient(145deg,rgba(5,8,20,0.95),rgba(2,4,12,0.98))] p-8 sm:p-12 lg:p-16 shadow-[0_30px_100px_rgba(0,0,0,0.6)]">
        <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/35 to-transparent" />

        {/* Section Header */}
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 text-[11px] font-mono uppercase tracking-[0.22em] text-white/60 mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
            <span>Section 09 // Support &amp; Longevity</span>
          </div>
          <h2 className="text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
            Designed for repairability and decades of listening.
          </h2>
          <p className="mt-3 text-base text-white/65">
            Aether One avoids sealed adhesive traps. Every wear surface is modular, replaceable, and built to outlive wireless protocol standards.
          </p>
        </div>

        {/* Care Guidance 3-Column Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {careTips.map((tip, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-white/8 bg-white/[0.02] p-6 flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-[10px] text-sky-400/80 uppercase">
                  LONGEVITY GUIDELINE 0{idx + 1}
                </span>
                <h3 className="mt-2 text-base font-semibold text-white">
                  {tip.title}
                </h3>
                <p className="mt-3 text-xs sm:text-sm text-white/65 leading-relaxed">
                  {tip.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="mt-16 border-t border-white/8 pt-12">
          <h3 className="text-xs font-mono uppercase tracking-wider text-white/40 mb-6">
            Frequently Explored Questions
          </h3>

          <div className="space-y-4">
            {PRODUCT_DATA.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-white/8 bg-white/[0.02] overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-white/[0.03] transition-colors"
                >
                  <span className="text-sm font-semibold text-white">
                    {faq.q}
                  </span>
                  <span className="font-mono text-sm text-sky-400 shrink-0">
                    {openFaq === idx ? "−" : "+"}
                  </span>
                </button>

                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="px-5 pb-5 text-xs sm:text-sm text-white/70 leading-relaxed border-t border-white/6 pt-4"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
