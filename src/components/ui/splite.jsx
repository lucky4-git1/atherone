import { Suspense, lazy, useRef, useState, useEffect } from "react"

const Spline = lazy(() => import("@splinetool/react-spline"))

export function SplineScene({ scene, className = "", ...props }) {
  const containerRef = useRef(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting)
        })
      },
      { rootMargin: "250px 0px" }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} className={`relative h-full w-full ${className}`}>
      {isInView ? (
        <Suspense
          fallback={
            <div className="flex h-full w-full items-center justify-center">
              <span className="loader" />
            </div>
          }
        >
          <Spline
            scene={scene}
            className="h-full w-full"
            renderOnDemand={true}
            {...props}
          />
        </Suspense>
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <span className="loader opacity-40" />
        </div>
      )}
    </div>
  )
}
