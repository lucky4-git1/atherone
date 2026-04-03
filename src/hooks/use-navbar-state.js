import { useState } from "react"
import { useMotionValueEvent } from "framer-motion"

export function useNavbarState(scrollY, threshold = 48) {
  const [isScrolled, setIsScrolled] = useState(false)

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > threshold)
  })

  return isScrolled
}
