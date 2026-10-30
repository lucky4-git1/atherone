import { cn } from "../../lib/utils"

export function Spotlight({ className, fill = "rgba(255,255,255,0.18)" }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "animate-spotlight pointer-events-none absolute z-[1] h-[140%] w-[120%] -translate-y-1/3 -rotate-[22deg] rounded-full opacity-0",
        className,
      )}
      style={{
        background: `radial-gradient(ellipse at 50% 30%, ${fill} 0%, rgba(255,255,255,0.04) 40%, transparent 72%)`,
      }}
    />
  )
}
