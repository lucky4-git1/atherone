import { ATHER_DATA } from "@/data/ather-data"
import { soundEngine } from "@/lib/audio-synthesizer"

export function AtherExperience() {
  return (
    <section id="experience" className="relative mx-auto max-w-7xl px-6 py-28 sm:px-8 sm:py-36 lg:px-12">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01)),linear-gradient(145deg,rgba(5,8,20,0.95),rgba(2,4,12,0.98))] p-8 sm:p-12 lg:p-16 shadow-[0_30px_100px_rgba(0,0,0,0.6)]">
        <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/35 to-transparent" />

        {/* Section Header */}
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 text-[11px] font-mono uppercase tracking-[0.24em] text-white/60 mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>Chapter 07 // The Experience</span>
          </div>
          <h2 className="text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl font-sans">
            The cadence of electric urban living.
          </h2>
          <p className="mt-3 text-base text-white/65">
            Four everyday moments in modern metropolitan mobility, where silent instant torque and connected software transform routine journeys into effortless flow.
          </p>
        </div>

        {/* 4 Urban Scenario Cards */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {ATHER_DATA.urbanScenarios.map((scenario, idx) => (
            <div
              key={idx}
              onMouseEnter={() => soundEngine.playHover()}
              className="rounded-2xl border border-white/8 bg-white/[0.02] p-7 sm:p-8 flex flex-col justify-between hover:border-white/16 hover:bg-white/[0.04] transition-colors duration-150 relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/6 font-mono text-xs">
                  <span className="text-emerald-400 font-bold">{scenario.time}</span>
                  <span className="rounded-full bg-white/6 px-2.5 py-0.5 text-[10px] text-white/60">
                    {scenario.stat}
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-bold tracking-tight text-white font-sans">
                  {scenario.title}
                </h3>
                <p className="text-xs font-mono uppercase text-white/45 tracking-wider mt-0.5">
                  {scenario.subtitle}
                </p>

                <p className="mt-4 text-sm text-white/70 leading-relaxed font-sans">
                  {scenario.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/6 flex items-center justify-between font-mono text-[10px] text-white/40">
                <span>SCENARIO 0{idx + 1}</span>
                <span className="text-emerald-400/80">COMMUTER VERIFIED</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
