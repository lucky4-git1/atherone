import { PRODUCT_DATA } from "@/data/product-data"

export function SpecificationsTable() {
  return (
    <section id="specifications" className="relative mx-auto max-w-7xl px-6 py-28 sm:px-8 sm:py-36 lg:px-12">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01)),linear-gradient(145deg,rgba(5,9,22,0.95),rgba(2,4,14,0.98))] p-8 sm:p-12 lg:p-16 shadow-[0_30px_100px_rgba(0,0,0,0.6)]">
        <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/35 to-transparent" />

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-8 border-b border-white/8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 text-[11px] font-mono uppercase tracking-[0.22em] text-white/60 mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
              <span>Section 08 // Technical Specifications</span>
            </div>
            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
              Calibrated engineering data.
            </h2>
            <p className="mt-3 max-w-xl text-base text-white/65">
              Verified acoustic tolerances and hardware telemetry across the circumaural architecture.
            </p>
          </div>

          <div className="font-mono text-xs text-white/40">
            TEST FIXTURE: SIMULATED GRAS 45CA
          </div>
        </div>

        {/* 3x3 Spec Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCT_DATA.specs.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-white/8 bg-white/[0.02] p-6 hover:border-white/15 hover:bg-white/[0.04] transition-all flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-sky-400/80">
                  SPEC 0{idx + 1}
                </span>
                <h3 className="mt-2 text-xs font-mono uppercase text-white/50">
                  {item.label}
                </h3>
                <p className="mt-2 text-xl font-bold tracking-tight text-white font-sans">
                  {item.value}
                </p>
              </div>
              <p className="mt-4 text-xs text-white/60 font-mono border-t border-white/6 pt-3">
                {item.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Conceptual disclaimer banner */}
        <div className="mt-10 rounded-2xl border border-white/8 bg-black/40 p-5 text-center font-mono text-[11px] text-white/45">
          <span>{PRODUCT_DATA.conceptualNotice}</span>
        </div>
      </div>
    </section>
  )
}
