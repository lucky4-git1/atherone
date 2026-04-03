import { useEffect, useRef } from "react"
import { createNoise2D } from "simplex-noise"

export function WavesOverlay({
  className = "",
  strokeColor = "rgba(255,255,255,0.16)",
  backgroundColor = "transparent",
  pointerSize = 0.32,
}) {
  const containerRef = useRef(null)
  const svgRef = useRef(null)
  const mouseRef = useRef({
    x: -160,
    y: 0,
    lx: 0,
    ly: 0,
    sx: 0,
    sy: 0,
    v: 0,
    vs: 0,
    a: 0,
    set: false,
  })
  const pathsRef = useRef([])
  const linesRef = useRef([])
  const noiseRef = useRef(null)
  const rafRef = useRef(null)
  const boundingRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    const svg = svgRef.current
    if (!container || !svg) {
      return undefined
    }

    noiseRef.current = createNoise2D()

    const setSize = () => {
      boundingRef.current = container.getBoundingClientRect()
      const { width, height } = boundingRef.current
      svg.style.width = `${width}px`
      svg.style.height = `${height}px`
    }

    const setLines = () => {
      if (!boundingRef.current) {
        return
      }

      const { width, height } = boundingRef.current
      linesRef.current = []

      pathsRef.current.forEach((path) => path.remove())
      pathsRef.current = []

      const xGap = Math.max(14, Math.floor(width / 52))
      const yGap = Math.max(12, Math.floor(height / 42))

      const overscanWidth = width + 160
      const overscanHeight = height + 80
      const totalLines = Math.ceil(overscanWidth / xGap)
      const totalPoints = Math.ceil(overscanHeight / yGap)
      const xStart = (width - xGap * totalLines) / 2
      const yStart = (height - yGap * totalPoints) / 2

      for (let i = 0; i < totalLines; i += 1) {
        const points = []

        for (let j = 0; j < totalPoints; j += 1) {
          points.push({
            x: xStart + xGap * i,
            y: yStart + yGap * j,
            wave: { x: 0, y: 0 },
            cursor: { x: 0, y: 0, vx: 0, vy: 0 },
          })
        }

        const path = document.createElementNS("http://www.w3.org/2000/svg", "path")
        path.setAttribute("fill", "none")
        path.setAttribute("stroke", strokeColor)
        path.setAttribute("stroke-width", "1")
        path.setAttribute("stroke-linecap", "round")
        path.setAttribute("stroke-linejoin", "round")
        svg.appendChild(path)
        pathsRef.current.push(path)
        linesRef.current.push(points)
      }
    }

    const syncPointerVars = () => {
      const mouse = mouseRef.current
      container.style.setProperty("--x", `${mouse.sx}px`)
      container.style.setProperty("--y", `${mouse.sy}px`)
    }

    const updateMousePosition = (x, y) => {
      if (!boundingRef.current) {
        return
      }

      const mouse = mouseRef.current
      mouse.x = x - boundingRef.current.left
      mouse.y = y - boundingRef.current.top

      if (!mouse.set) {
        mouse.sx = mouse.x
        mouse.sy = mouse.y
        mouse.lx = mouse.x
        mouse.ly = mouse.y
        mouse.set = true
      }

      syncPointerVars()
    }

    const onResize = () => {
      setSize()
      setLines()
    }

    const onMouseMove = (event) => {
      updateMousePosition(event.clientX, event.clientY)
    }

    const onTouchMove = (event) => {
      const touch = event.touches[0]
      if (!touch) {
        return
      }
      updateMousePosition(touch.clientX, touch.clientY)
    }

    const moved = (point, withCursorForce = true) => ({
      x: point.x + point.wave.x + (withCursorForce ? point.cursor.x : 0),
      y: point.y + point.wave.y + (withCursorForce ? point.cursor.y : 0),
    })

    const movePoints = (time) => {
      const mouse = mouseRef.current
      const noise = noiseRef.current
      if (!noise) {
        return
      }

      linesRef.current.forEach((points) => {
        points.forEach((point) => {
          const move = noise(
            (point.x + time * 0.009) * 0.0025,
            (point.y + time * 0.004) * 0.0018,
          ) * 7.5

          point.wave.x = Math.cos(move) * 10
          point.wave.y = Math.sin(move) * 6

          const dx = point.x - mouse.sx
          const dy = point.y - mouse.sy
          const d = Math.hypot(dx, dy)
          const l = Math.max(140, mouse.vs * 1.4)

          if (d < l) {
            const s = 1 - d / l
            const f = Math.cos(d * 0.0025) * s
            point.cursor.vx += Math.cos(mouse.a) * f * l * mouse.vs * 0.00018
            point.cursor.vy += Math.sin(mouse.a) * f * l * mouse.vs * 0.00018
          }

          point.cursor.vx += (0 - point.cursor.x) * 0.014
          point.cursor.vy += (0 - point.cursor.y) * 0.014
          point.cursor.vx *= 0.93
          point.cursor.vy *= 0.93
          point.cursor.x += point.cursor.vx
          point.cursor.y += point.cursor.vy
          point.cursor.x = Math.min(34, Math.max(-34, point.cursor.x))
          point.cursor.y = Math.min(34, Math.max(-34, point.cursor.y))
        })
      })
    }

    const drawLines = () => {
      linesRef.current.forEach((points, lineIndex) => {
        if (!points.length || !pathsRef.current[lineIndex]) {
          return
        }

        const first = moved(points[0], false)
        let d = `M ${first.x} ${first.y}`

        for (let i = 1; i < points.length; i += 1) {
          const current = moved(points[i])
          d += ` L ${current.x} ${current.y}`
        }

        pathsRef.current[lineIndex].setAttribute("d", d)
      })
    }

    const tick = (time) => {
      const mouse = mouseRef.current

      mouse.sx += (mouse.x - mouse.sx) * 0.08
      mouse.sy += (mouse.y - mouse.sy) * 0.08

      const dx = mouse.x - mouse.lx
      const dy = mouse.y - mouse.ly
      const d = Math.hypot(dx, dy)

      mouse.v = d
      mouse.vs += (d - mouse.vs) * 0.1
      mouse.vs = Math.min(80, mouse.vs)
      mouse.lx = mouse.x
      mouse.ly = mouse.y
      mouse.a = Math.atan2(dy, dx)

      syncPointerVars()
      movePoints(time)
      drawLines()
      rafRef.current = window.requestAnimationFrame(tick)
    }

    setSize()
    setLines()
    window.addEventListener("resize", onResize)
    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("touchmove", onTouchMove, { passive: true })
    rafRef.current = window.requestAnimationFrame(tick)

    return () => {
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current)
      }
      window.removeEventListener("resize", onResize)
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("touchmove", onTouchMove)
      pathsRef.current.forEach((path) => path.remove())
    }
  }, [backgroundColor, strokeColor])

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{
        backgroundColor,
        "--x": "-4rem",
        "--y": "50%",
      }}
    >
      <svg
        ref={svgRef}
        className="block h-full w-full opacity-80 mix-blend-screen"
        xmlns="http://www.w3.org/2000/svg"
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: `${pointerSize}rem`,
          height: `${pointerSize}rem`,
          borderRadius: "999px",
          background: "rgba(255,255,255,0.85)",
          boxShadow: "0 0 28px rgba(255,255,255,0.55)",
          transform: "translate3d(calc(var(--x) - 50%), calc(var(--y) - 50%), 0)",
          opacity: 0.35,
          willChange: "transform",
        }}
      />
    </div>
  )
}
