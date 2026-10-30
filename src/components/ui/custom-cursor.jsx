import { useEffect, useState } from "react"
import { motion, useSpring } from "framer-motion"

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const cursorX = useSpring(-100, { damping: 28, stiffness: 350, mass: 0.1 })
  const cursorY = useSpring(-100, { damping: 28, stiffness: 350, mass: 0.1 })

  useEffect(() => {
    // Only run on devices with fine pointer (mouse/trackpad), not touch
    if (typeof window === "undefined" || !window.matchMedia("(pointer: fine)").matches) {
      return undefined
    }

    const moveCursor = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseOver = (e) => {
      const target = e.target
      if (
        target &&
        (target.tagName === "BUTTON" ||
          target.tagName === "A" ||
          target.closest("button") ||
          target.closest("a") ||
          target.getAttribute("role") === "button" ||
          target.classList.contains("interactive-hover"))
      ) {
        setIsHovered(true)
      } else {
        setIsHovered(false)
      }
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    window.addEventListener("mousemove", moveCursor)
    window.addEventListener("mouseover", handleMouseOver)
    document.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", moveCursor)
      window.removeEventListener("mouseover", handleMouseOver)
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [cursorX, cursorY, isVisible])

  if (!isVisible) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
      {/* Outer subtle glow ring */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 1.6 : 1,
          opacity: isHovered ? 0.8 : 0.4,
          borderColor: isHovered ? "rgba(56, 189, 248, 0.7)" : "rgba(255, 255, 255, 0.25)",
        }}
        transition={{ duration: 0.15, ease: "easeOut" }}
        className="h-8 w-8 rounded-full border border-white/30 backdrop-blur-[1px] transition-colors"
      />
      {/* Core pinpoint dot */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 0.5 : 1,
          backgroundColor: isHovered ? "rgb(56, 189, 248)" : "rgb(255, 255, 255)",
        }}
        transition={{ duration: 0.12, ease: "easeOut" }}
        className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
      />
    </div>
  )
}
