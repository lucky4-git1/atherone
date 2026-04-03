import { useRef } from "react"
import { useScroll, useTransform } from "framer-motion"

export function useSectionProgress() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [72, -72])
  const opacity = useTransform(scrollYProgress, [0.08, 0.3, 0.72, 0.95], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.97, 1, 0.985])

  return {
    ref,
    scrollYProgress,
    y,
    opacity,
    scale,
  }
}
