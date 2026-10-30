import { ScrollExpansionHero } from "../components/ui/scroll-expansion-hero"

export function HeroSection({ onOpenDemo }) {
  return (
    <ScrollExpansionHero
      eyebrow="Spatial Launch Architecture"
      title="A flagship interface that commands attention."
      description="Engineered for serious software reveals. Spatial perspective, cinema-grade kinetic motion, and an atmospheric WebGL backdrop operating in harmonic synchrony."
      ctaLabel="Request demonstration"
      ctaHref="#experience"
      onOpenDemo={onOpenDemo}
    />
  )
}
