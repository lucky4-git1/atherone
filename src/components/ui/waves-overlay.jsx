import { useEffect, useRef } from "react"
import { createNoise2D } from "simplex-noise"

export function WavesOverlay({
  className = "",
  strokeColor = "rgba(255, 255, 255, 0.16)",
  backgroundColor = "transparent",
  pointerSize = 0.32,
}) {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
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
  const linesRef = useRef([])
  const noiseRef = useRef(null)
  const rafRef = useRef(null)
  const boundingRef = useRef({ width: 0, height: 0, left: 0, top: 0 })

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) {
      return undefined
    }

    const ctx = canvas.getContext("2d", { alpha: true, desynchronized: true })
    if (!ctx) return undefined

    noiseRef.current = createNoise2D()

    const setSize = () => {
      const rect = container.getBoundingClientRect()
      boundingRef.current = {
        width: rect.width,
        height: rect.height,
        left: rect.left,
        top: rect.top,
      }
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = Math.floor(rect.width * dpr)
      canvas.height = Math.floor(rect.height * dpr)
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)
    }

    const setLines = () => {
      const { width, height } = boundingRef.current
      if (!width || !height) return

      linesRef.current = []
      // Slightly optimized grid spacing for great visuals with minimal computation
      const xGap = Math.max(22, Math.floor(width / 36))
      const yGap = Math.max(18, Math.floor(height / 28))

      const overscanWidth = width + 120
      const overscanHeight = height + 60
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
        linesRef.current.push(points)
      }
    }

    const syncPointerVars = () => {
      const mouse = mouseRef.current
      container.style.setProperty("--x", `${mouse.sx}px`)
      container.style.setProperty("--y", `${mouse.sy}px`)
    }

    const updateMousePosition = (x, y) => {
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
    }

    let resizeTimer = null
    const onResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        setSize()
        setLines()
      }, 100)
    }

    const onMouseMove = (event) => {
      updateMousePosition(event.clientX, event.clientY)
    }

    const onTouchMove = (event) => {
      const touch = event.touches[0]
      if (touch) {
        updateMousePosition(touch.clientX, touch.clientY)
      }
    }

    const movePoints = (time) => {
      const mouse = mouseRef.current
      const noise = noiseRef.current
      if (!noise) return

      const lines = linesRef.current
      const mouseSx = mouse.sx
      const mouseSy = mouse.sy
      const mouseVs = mouse.vs
      const mouseA = mouse.a
      const l = Math.max(140, mouseVs * 1.4)
      const cosA = Math.cos(mouseA)
      const sinA = Math.sin(mouseA)
      const t9 = time * 0.009
      const t4 = time * 0.004

      for (let i = 0; i < lines.length; i += 1) {
        const points = lines[i]
        for (let j = 0; j < points.length; j += 1) {
          const point = points[j]
          const move =
            noise((point.x + t9) * 0.0025, (point.y + t4) * 0.0018) * 7.5

          point.wave.x = Math.cos(move) * 10
          point.wave.y = Math.sin(move) * 6

          const dx = point.x - mouseSx
          const dy = point.y - mouseSy
          const d = Math.hypot(dx, dy)

          if (d < l) {
            const s = 1 - d / l
            const f = Math.cos(d * 0.0025) * s
            const force = f * l * mouseVs * 0.00018
            point.cursor.vx += cosA * force
            point.cursor.vy += sinA * force
          }

          point.cursor.vx += -point.cursor.x * 0.014
          point.cursor.vy += -point.cursor.y * 0.014
          point.cursor.vx *= 0.93
          point.cursor.vy *= 0.93
          point.cursor.x += point.cursor.vx
          point.cursor.y += point.cursor.vy
          point.cursor.x = Math.min(34, Math.max(-34, point.cursor.x))
          point.cursor.y = Math.min(34, Math.max(-34, point.cursor.y))
        }
      }
    }

    const drawLines = () => {
      const { width, height } = boundingRef.current
      ctx.clearRect(0, 0, width, height)
      ctx.strokeStyle = strokeColor
      ctx.lineWidth = 1
      ctx.lineCap = "round"
      ctx.lineJoin = "round"

      const lines = linesRef.current
      ctx.beginPath()

      for (let i = 0; i < lines.length; i += 1) {
        const points = lines[i]
        if (!points || points.length === 0) continue

        const p0 = points[0]
        ctx.moveTo(p0.x + p0.wave.x, p0.y + p0.wave.y)

        for (let j = 1; j < points.length; j += 1) {
          const p = points[j]
          ctx.lineTo(p.x + p.wave.x + p.cursor.x, p.y + p.wave.y + p.cursor.y)
        }
      }

      ctx.stroke()
    }

    let isVisible = true
    const handleVisibilityChange = () => {
      isVisible = !document.hidden
    }
    document.addEventListener("visibilitychange", handleVisibilityChange)

    const tick = (time) => {
      if (!isVisible) {
        rafRef.current = window.requestAnimationFrame(tick)
        return
      }

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
    window.addEventListener("mousemove", onMouseMove, { passive: true })
    window.addEventListener("touchmove", onTouchMove, { passive: true })
    rafRef.current = window.requestAnimationFrame(tick)

    return () => {
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current)
      }
      if (resizeTimer) clearTimeout(resizeTimer)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      window.removeEventListener("resize", onResize)
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("touchmove", onTouchMove)
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
      <canvas
        ref={canvasRef}
        className="block h-full w-full opacity-80 mix-blend-screen"
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
