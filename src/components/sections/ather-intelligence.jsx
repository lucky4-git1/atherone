import { ATHER_DATA } from "@/data/ather-data"
import { AtherDashboardSimulator } from "@/components/ui/ather-dashboard-simulator"

export function AtherIntelligence() {
  return (
    <section id="intelligence" className="relative mx-auto max-w-7xl px-6 py-28 sm:px-8 sm:py-36 lg:px-12">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01)),linear-gradient(145deg,rgba(5,8,20,0.95),rgba(2,4,12,0.98))] p-8 sm:p-12 lg:p-16 shadow-[0_30px_100px_rgba(0,0,0,0.6)]">
        <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/35 to-transparent" />

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-8 border-b border-white/8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 text-[11px] font-mono uppercase tracking-[0.24em] text-white/60 mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>Chapter 06 // The Intelligence</span>
            </div>
            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl font-sans">
              AtherStack™ connected cockpit.
            </h2>
            <p className="mt-3 max-w-xl text-base text-white/65">
              Interact with the 7.0-inch capacitive touchscreen simulator. Toggle dynamic ride profiles, inspect onboard Google Maps turn routing, and test AutoHold incline braking.
            </p>
          </div>

          <div className="font-mono text-xs text-white/40">
            OS PLATFORM: ATHERSTACK™ 6.0
          </div>
        </div>

        {/* Cockpit Touchscreen Simulator Mount */}
        <div className="mt-12">
          <AtherDashboardSimulator />
        </div>

        {/* 4 Ride Modes Overview Strip */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 border-t border-white/8 pt-10">
          {ATHER_DATA.rideModes.map((mode) => (
            <div
              key={mode.id}
              className="rounded-2xl border border-white/8 bg-white/[0.02] p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-white/6">
                  <span
                    style={{ color: mode.accentColor }}
                    className="font-mono text-xs font-bold uppercase tracking-wider"
                  >
                    {mode.name} Mode
                  </span>
                  <span className="font-mono text-[10px] text-white/50">{mode.powerRating}</span>
                </div>

                <div className="mt-4 flex items-baseline justify-between">
                  <span className="text-2xl font-bold font-mono text-white">{mode.range}</span>
                  <span className="text-xs font-mono text-white/40">Top: {mode.topSpeed}</span>
                </div>

                <p className="mt-3 text-xs text-white/65 leading-relaxed font-sans">
                  {mode.character}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
