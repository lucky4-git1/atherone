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

  const rotateX = useTransform(scrollYProgress, [0, 0.45, 1], [22, 4, -10])
  const scale = useTransform(scrollYProgress, [0, 0.45, 1], [0.9, 1, 0.96])
  const translateY = useTransform(scrollYProgress, [0, 0.45, 1], [90, 0, -50])
  const opacity = useTransform(scrollYProgress, [0.06, 0.18, 0.85, 1], [0, 1, 1, 0.58])

  return (
    <div ref={ref} className={`min-w-0 [perspective:1600px] ${className}`}>
      <motion.div
        style={{ rotateX, scale, y: translateY, opacity }}
        className={`min-w-0 transform-gpu [transform-style:preserve-3d] ${containerClassName}`}
      >
        <div className={`min-w-0 ${contentClassName}`}>{children}</div>
      </motion.div>
    </div>
  )
}
