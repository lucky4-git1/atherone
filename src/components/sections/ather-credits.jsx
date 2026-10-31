import { ATHER_DATA } from "@/data/ather-data"
import { soundEngine } from "@/lib/audio-synthesizer"

export function AtherCredits() {
  const credits = ATHER_DATA.credits

  return (
    <footer id="credits" className="relative mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-24 lg:px-12 border-t border-white/8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Project Context & Vision */}
        <div className="space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 text-[11px] font-mono uppercase tracking-[0.24em] text-white/60">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>Chapter 10 // Project Credits &amp; Attribution</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans">
            {credits.project} // Digital Case Study
          </h3>

          <p className="text-xs sm:text-sm text-white/65 leading-relaxed font-sans max-w-lg">
            An independent portfolio project designed and engineered to explore the boundaries of scrollytelling, real-time 3D WebGL vehicle staging, and tactile audio simulation for modern electric mobility.
          </p>

          <div className="pt-2">
            <a
              href={credits.repository}
              target="_blank"
              rel="noreferrer"
              onClick={() => soundEngine.playClick()}
              className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/[0.05] px-5 py-2.5 text-xs font-mono uppercase tracking-wider text-white hover:border-emerald-400/50 hover:bg-emerald-500/10 transition-colors duration-150"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                <path d="M12 .5C5.372.5 0 5.872 0 12.5c0 5.303 3.438 9.8 8.205 11.387.6.111.82-.26.82-.577 0-.285-.011-1.232-.017-2.234-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.082-.729.082-.729 1.205.085 1.84 1.238 1.84 1.238 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.304.762-1.604-2.665-.304-5.467-1.333-5.467-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.526.117-3.18 0 0 1.008-.323 3.3 1.23A11.46 11.46 0 0 1 12 6.32a11.47 11.47 0 0 1 3.005.404c2.29-1.553 3.296-1.23 3.296-1.23.654 1.654.243 2.877.12 3.18.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.623-5.479 5.921.43.37.823 1.103.823 2.222 0 1.606-.014 2.9-.014 3.293 0 .319.216.694.825.576C20.565 22.296 24 17.801 24 12.5 24 5.872 18.627.5 12 .5Z" />
              </svg>
              <span>Inspect Source on GitHub</span>
              <span>→</span>
            </a>
          </div>
        </div>

        {/* Disciplines & Technology Stack */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-6 space-y-3 font-mono text-xs">
            <span className="text-white/40 uppercase tracking-wider block border-b border-white/6 pb-2">
              Engineering Architecture
            </span>
            <div className="grid grid-cols-2 gap-2 text-white/70">
              {credits.technologies.map((tech, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <span className="text-emerald-400">✓</span>
                  <span>{tech}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-6 space-y-3 font-mono text-xs">
            <span className="text-white/40 uppercase tracking-wider block border-b border-white/6 pb-2">
              Creative Disciplines
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-white/70">
              {credits.disciplines.map((disc, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <span className="text-sky-400">•</span>
                  <span>{disc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mandatory Independent Concept Legal Disclaimer */}
      <div className="mt-14 border-t border-white/6 pt-8 font-mono text-[11px] text-white/40 leading-relaxed text-center sm:text-left">
        <p>{credits.disclaimer}</p>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4 text-white/30 text-[10px]">
          <span>© {new Date().getFullYear()} ATHERONE // INDEPENDENT PORTFOLIO PROJECT</span>
          <div className="flex gap-4">
            <a href="#arrival" className="hover:text-white transition-colors">Return to Top ↑</a>
            <a href="https://github.com/lucky4-git1/atherone.git" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub Repository</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
