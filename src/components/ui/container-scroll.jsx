import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export function ContainerScroll({
  children,
  className = "",
  containerClassName = "",
  contentClassName = "",
}) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // Refined, gentle perspective tilt that stays 60fps on all devices
  const rotateX = useTransform(scrollYProgress, [0, 0.45, 1], [10, 0, -4])
  const scale = useTransform(scrollYProgress, [0, 0.45, 1], [0.94, 1, 0.97])
  const translateY = useTransform(scrollYProgress, [0, 0.45, 1], [60, 0, -30])
  const opacity = useTransform(scrollYProgress, [0.04, 0.18, 0.88, 1], [0.2, 1, 1, 0.7])

  return (
    <div
      ref={ref}
      className={`min-w-0 [perspective:1400px] ${className}`}
      style={{ contain: "layout paint" }}
    >
      <motion.div
        style={{
          rotateX,
          scale,
          y: translateY,
          opacity,
          willChange: "transform, opacity",
        }}
        className={`min-w-0 transform-gpu ${containerClassName}`}
      >
        <div className={`min-w-0 ${contentClassName}`}>{children}</div>
      </motion.div>
    </div>
  )
}
