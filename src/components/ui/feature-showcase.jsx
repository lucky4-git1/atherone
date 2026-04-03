export function FeatureShowcase({ accent, metrics, title }) {
  return (
    <div className="relative min-w-0 overflow-hidden rounded-[1.7rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02)),linear-gradient(145deg,rgba(2,6,23,0.86),rgba(15,23,42,0.72))] p-4 shadow-[0_26px_100px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:rounded-[2rem] sm:p-5">
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${accent} opacity-55`} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.14),transparent_22%),radial-gradient(circle_at_82%_22%,rgba(96,165,250,0.12),transparent_18%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />

      <div className="relative">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-white/85" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/35" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          </div>
          <span className="text-[9px] uppercase tracking-[0.22em] text-white/45 sm:text-[10px] sm:tracking-[0.32em]">
            Feature spotlight
          </span>
        </div>

        <div className="grid min-w-0 gap-4 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="min-w-0 rounded-[1.5rem] border border-white/10 bg-black/26 p-4 sm:rounded-[1.7rem] sm:p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-white/42">Experience frame</p>
            <h3 className="mt-3 max-w-sm text-xl font-medium tracking-[-0.05em] text-white sm:text-2xl">
              {title}
            </h3>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-6">
              <div className="h-28 rounded-[1.2rem] bg-[radial-gradient(circle_at_top,rgba(96,165,250,0.28),rgba(15,23,42,0.08)_48%,rgba(2,6,23,0.85)_88%)] ring-1 ring-white/10 sm:col-span-4 sm:h-32 sm:rounded-[1.35rem]" />
              <div className="grid grid-cols-2 gap-3 sm:col-span-2 sm:grid-cols-1">
                <div className="rounded-[1.2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))]" />
                <div className="rounded-[1.2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))]" />
              </div>
            </div>
          </div>

          <div className="grid min-w-0 gap-4">
            <div className="rounded-[1.35rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-4 sm:rounded-[1.5rem]">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.3em] text-white/42">Composition</p>
                <span className="text-xs text-white/42">Adaptive</span>
              </div>
              <div className="mt-4 space-y-3">
                {[78, 64, 88].map((value, index) => (
                  <div key={`${value}-${index}`} className="h-2.5 rounded-full bg-white/8">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-300"
                      style={{ width: `${value}%` }}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {metrics.map((metric) => (
                <div
                  key={metric}
                  className="min-w-0 rounded-[1.1rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] px-4 py-4 text-sm text-white/70 sm:rounded-[1.25rem]"
                >
                  <span className="block truncate sm:whitespace-normal">{metric}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
