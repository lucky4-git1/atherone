import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"
import { SplineScene } from "@/components/ui/splite"

const socialLinks = [
  {
    label: "X",
    href: "https://x.com",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
        <path d="M18.901 1.153h3.68l-8.04 9.19 9.458 12.504H16.594l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.153h7.594l5.243 6.932 6.064-6.932Zm-1.29 19.493h2.039L6.486 3.24H4.298l13.313 17.406Z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
        <path d="M4.983 3.5C4.983 4.881 3.87 6 2.497 6A2.503 2.503 0 0 1 0 3.5C0 2.119 1.113 1 2.497 1a2.5 2.5 0 0 1 2.486 2.5ZM.5 8h4V23h-4V8Zm7 0h3.834v2.051h.055c.534-1.013 1.84-2.081 3.79-2.081 4.054 0 4.801 2.66 4.801 6.117V23h-4v-7.007c0-1.671-.03-3.822-2.33-3.822-2.333 0-2.69 1.823-2.69 3.703V23h-4V8Z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
        <path d="M7.75 2h8.5A5.756 5.756 0 0 1 22 7.75v8.5A5.756 5.756 0 0 1 16.25 22h-8.5A5.756 5.756 0 0 1 2 16.25v-8.5A5.756 5.756 0 0 1 7.75 2Zm8.5 1.75h-8.5A4.004 4.004 0 0 0 3.75 7.75v8.5c0 2.21 1.79 4 4 4h8.5c2.21 0 4-1.79 4-4v-8.5c0-2.21-1.79-4-4-4Zm-4.25 2.5A5.75 5.75 0 1 1 6.25 12 5.756 5.756 0 0 1 12 6.25Zm0 1.75A4 4 0 1 0 16 12a4.004 4.004 0 0 0-4-4Zm6.125-2.125a1.125 1.125 0 1 1-1.125 1.125 1.127 1.127 0 0 1 1.125-1.125Z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
        <path d="M12 .5C5.372.5 0 5.872 0 12.5c0 5.303 3.438 9.8 8.205 11.387.6.111.82-.26.82-.577 0-.285-.011-1.232-.017-2.234-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.082-.729.082-.729 1.205.085 1.84 1.238 1.84 1.238 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.304.762-1.604-2.665-.304-5.467-1.333-5.467-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.526.117-3.18 0 0 1.008-.323 3.3 1.23A11.46 11.46 0 0 1 12 6.32a11.47 11.47 0 0 1 3.005.404c2.29-1.553 3.296-1.23 3.296-1.23.654 1.654.243 2.877.12 3.18.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.623-5.479 5.921.43.37.823 1.103.823 2.222 0 1.606-.014 2.9-.014 3.293 0 .319.216.694.825.576C20.565 22.296 24 17.801 24 12.5 24 5.872 18.627.5 12 .5Z" />
      </svg>
    ),
  },
  {
    label: "Gmail",
    href: "mailto:hello@aetherone.design",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
        <path d="M2 5.5A2.5 2.5 0 0 1 4.5 3h15A2.5 2.5 0 0 1 22 5.5v13a2.5 2.5 0 0 1-2.5 2.5h-15A2.5 2.5 0 0 1 2 18.5v-13Zm2.2-.5L12 10.6 19.8 5H4.2ZM20 6.52l-7.42 5.3a1 1 0 0 1-1.16 0L4 6.52V19h16V6.52Z" />
      </svg>
    ),
  },
  {
    label: "Telegram",
    href: "https://telegram.org",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
        <path d="M21.944 4.662c.295-.12.613.145.54.45l-3.055 14.368c-.056.264-.347.39-.58.252l-4.635-2.744-2.363 2.278a.408.408 0 0 1-.688-.236l-.416-4.237L18.84 7.49c.222-.198-.036-.531-.29-.375L8.41 13.46 4.03 12.092a.404.404 0 0 1-.025-.764L21.944 4.662Z" />
      </svg>
    ),
  },
]

export function SplineSceneBasic() {
  return (
    <Card className="relative min-h-[540px] w-full overflow-hidden rounded-[2rem] border-white/10 bg-black/[0.96] shadow-[0_30px_120px_rgba(0,0,0,0.42)] lg:min-h-[580px]">
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_20%),radial-gradient(circle_at_30%_40%,rgba(96,165,250,0.08),transparent_24%)]" />

      <div className="flex h-full flex-col lg:flex-row">
        <div className="relative z-10 flex flex-1 flex-col justify-between border-b border-white/10 p-7 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
          <div>
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
              <span className="h-2.5 w-2.5 rounded-full bg-white/80" />
              <span className="text-[11px] uppercase tracking-[0.32em] text-white/52">
                Closing frame
              </span>
            </div>

            <h2 className="mt-7 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-4xl font-semibold leading-[0.95] tracking-[-0.05em] text-transparent md:text-[2.8rem] xl:text-5xl">
              Built to leave a premium final impression.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-neutral-300">
              A refined footer for product launches, brand films, and immersive digital
              experiences. Calm structure on the left, living 3D presence on the right.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-5">
                <p className="text-[11px] uppercase tracking-[0.28em] text-white/44">Explore</p>
                <div className="mt-4 flex flex-col gap-3 text-sm text-white/68">
                  <a href="#overview" className="transition-colors duration-300 hover:text-white">
                    Overview
                  </a>
                  <a href="#experience" className="transition-colors duration-300 hover:text-white">
                    Experience
                  </a>
                  <a href="#architecture" className="transition-colors duration-300 hover:text-white">
                    Architecture
                  </a>
                </div>
              </div>

              <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-5">
                <p className="text-[11px] uppercase tracking-[0.28em] text-white/44">Contact</p>
                <div className="mt-4 flex flex-col gap-3 text-sm text-white/68">
                  <a href="mailto:sriyuthk122@gmail.com" className="transition-colors duration-300 hover:text-white">
                    sriyuthk122@gmail.com
                  </a>
                  <a href="mailto:pixelforgeuiux@gmail.com" className="transition-colors duration-300 hover:text-white">
                    pixelforgeuiux@gmail.com
                  </a>
                  <span>Remote worldwide</span>
                  <span>Available for launch work</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-white/10 pt-6">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-[0.28em] text-white/42">Social</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={link.label}
                      title={link.label}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/68 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
                    >
                      {link.icon}
                    </a>
                  ))}
                </div>
              </div>

              <a
                href="#overview"
                className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/[0.06] px-5 py-3 text-sm font-medium text-white transition-all duration-300 hover:border-white/20 hover:bg-white/[0.1]"
              >
                Back to top
              </a>
            </div>

            <p className="mt-6 text-sm text-white/42">
              Aether One. Crafted for launches that need precision, atmosphere, and trust.
            </p>
          </div>
        </div>

        <div className="relative min-h-[320px] flex-1 overflow-hidden lg:min-h-[580px]">
          <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_50%_18%,rgba(125,211,252,0.14),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_24%,transparent_78%,rgba(2,6,23,0.16))]" />
          <div className="pointer-events-none absolute inset-x-5 top-5 z-10 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          <div className="pointer-events-none absolute left-5 top-5 z-10 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[9px] uppercase tracking-[0.24em] text-white/42 backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.95)]" />
            Live spline stage
          </div>
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="footer-spline-stage h-full w-full"
          />
        </div>
      </div>
    </Card>
  )
}
