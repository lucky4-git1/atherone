import { SplineSceneBasic } from "./ui/spline-scene-basic"

export function Footer({ onOpenDemo }) {
  return (
    <footer className="relative overflow-hidden px-5 pb-16 pt-10 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[92rem]">
        <SplineSceneBasic onOpenDemo={onOpenDemo} />
      </div>
    </footer>
  )
}
