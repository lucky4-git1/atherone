import { ScrollExpansionHero } from "../components/ui/scroll-expansion-hero"

export function HeroSection({ onOpenDemo }) {
  return (
    <ScrollExpansionHero
      eyebrow="Acoustic Hardware Prototype"
      title="Sound, engineered as an experience."
      description="Circumaural acoustic headphones with custom 45mm planar-magnetic transducers, CNC magnesium-aluminum unibody chassis, and uncolored studio transparency."
      ctaLabel="Configure Aether One"
      ctaHref="#configure"
      secondaryHref="#philosophy"
      onOpenDemo={onOpenDemo}
    />
  )
}
