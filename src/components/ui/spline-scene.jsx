import { Suspense, lazy, memo } from "react"

const Spline = lazy(() => import("@splinetool/react-spline"))

function SplineSceneComponent({ scene, className }) {
  return (
    <Suspense
      fallback={
        <div className="flex h-full w-full items-center justify-center">
          <span className="loader" />
        </div>
      }
    >
      <Spline scene={scene} className={className} />
    </Suspense>
  )
}

export const SplineScene = memo(SplineSceneComponent)
