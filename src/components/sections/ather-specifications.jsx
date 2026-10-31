import { useState } from "react"
import { ATHER_DATA } from "@/data/ather-data"
import { soundEngine } from "@/lib/audio-synthesizer"

export function AtherSpecifications() {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0)

  const activeCategory = ATHER_DATA.specifications[activeCategoryIndex]

  return (
    <section id="specifications" className="relative mx-auto max-w-7xl px-6 py-28 sm:px-8 sm:py-36 lg:px-12">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01)),linear-gradient(145deg,rgba(5,9,22,0.95),rgba(2,4,14,0.98))] p-8 sm:p-12 lg:p-16 shadow-[0_30px_100px_rgba(0,0,0,0.6)]">
        <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/35 to-transparent" />

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-8 border-b border-white/8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 text-[11px] font-mono uppercase tracking-[0.24em] text-white/60 mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>Chapter 08 // The Specifications</span>
            </div>
            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl font-sans">
              Verified platform telemetry.
            </h2>
            <p className="mt-3 max-w-xl text-base text-white/65">
              Accurate factory technical parameters across powertrain, energy storage, structural chassis, and AtherStack connected systems.
            </p>
          </div>

          <div className="font-mono text-xs text-white/40">
            DATA SOURCE: ATHER 450 PLATFORM SPECIFICATION
          </div>
        </div>

        {/* Category Selector Tabs */}
        <div className="mt-8 flex flex-wrap gap-2.5">
          {ATHER_DATA.specifications.map((cat, idx) => (
            <button
              key={cat.category}
              type="button"
              onClick={() => {
                soundEngine.playClick()
                setActiveCategoryIndex(idx)
              }}
              className={`rounded-full px-5 py-2 text-xs font-mono uppercase tracking-wider transition-colors duration-150 ${
                activeCategoryIndex === idx
                  ? "border border-emerald-400/50 bg-emerald-500/20 text-white font-bold shadow-[0_0_15px_rgba(0,229,153,0.3)]"
                  : "border border-white/10 bg-white/[0.03] text-white/60 hover:text-white hover:bg-white/10"
              }`}
            >
              {cat.category}
            </button>
          ))}
        </div>

        {/* Specifications Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeCategory.specs.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-white/8 bg-white/[0.02] p-6 hover:border-white/16 hover:bg-white/[0.04] transition-colors duration-150 flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-[10px] text-emerald-400/80 uppercase tracking-wider">
                  PARAM 0{idx + 1}
                </span>
                <h3 className="mt-2 text-xs font-mono uppercase text-white/50">
                  {item.label}
                </h3>
                <p className="mt-2 text-xl sm:text-2xl font-bold tracking-tight text-white font-sans">
                  {item.value}
                </p>
              </div>

              <p className="mt-4 text-xs text-white/60 font-mono border-t border-white/6 pt-3">
                {item.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Source Methodology Disclaimer */}
        <div className="mt-12 rounded-2xl border border-white/8 bg-black/40 p-5 text-center font-mono text-[11px] text-white/45">
          <span>{ATHER_DATA.independentNotice}</span>
        </div>
      </div>
    </section>
  )
}
