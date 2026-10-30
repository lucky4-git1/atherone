import { useEffect, useRef } from "react"
import { useMotionValueEvent, useSpring } from "framer-motion"
import * as THREE from "three"

export function ShaderAnimation({ scrollYProgress }) {
  const containerRef = useRef(null)
  const progressRef = useRef(0)
  const rafRef = useRef(0)
  const springProgress = useSpring(scrollYProgress, {
    damping: 24,
    stiffness: 140,
    mass: 0.15,
  })

  useMotionValueEvent(springProgress, "change", (latest) => {
    progressRef.current = latest
  })

  useEffect(() => {
    const container = containerRef.current
    if (!container) return undefined

    const vertexShader = `
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `

    const fragmentShader = `
      precision mediump float;

      uniform vec2 resolution;
      uniform float time;
      uniform float intensity;

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(
          mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
          mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
          u.y
        );
      }

      void main(void) {
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
        float t = time * 0.045;
        vec2 warped = uv;
        warped.x += sin(uv.y * 2.4 + t * 0.9) * 0.07;
        warped.y += cos(uv.x * 2.0 - t * 0.7) * 0.06;

        float field = noise(warped * 2.2 + vec2(t * 0.25, -t * 0.16));
        float nebula = smoothstep(0.28, 0.92, noise(warped * 1.5 - vec2(t * 0.12, t * 0.09)));
        float haze = smoothstep(0.24, 0.88, noise((warped + vec2(1.5, -2.0)) * 1.1 + vec2(-t * 0.07, t * 0.04)));
        float band = smoothstep(0.0, 1.0, 1.0 - abs(warped.y + sin(warped.x * 1.8 + t * 0.55) * 0.28));
        
        vec3 base = mix(vec3(0.006, 0.012, 0.035), vec3(0.015, 0.035, 0.08), field);
        vec3 auroraA = vec3(0.14, 0.38, 0.82) * (0.18 + intensity * 0.18) * nebula;
        vec3 auroraB = vec3(0.34, 0.16, 0.72) * (0.12 + intensity * 0.12) * haze;
        vec3 mist = vec3(0.12, 0.28, 0.58) * band * 0.08;
        float vig = 1.0 - smoothstep(0.3, 1.35, length(uv));
        vec3 color = base + auroraA + auroraB + mist + vec3(vig * 0.03);

        gl_FragColor = vec4(color, 1.0);
      }
    `

    const camera = new THREE.Camera()
    camera.position.z = 1

    const scene = new THREE.Scene()
    const geometry = new THREE.PlaneGeometry(2, 2)
    const uniforms = {
      time: { value: 0 },
      resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      intensity: { value: 0.18 },
    }

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      depthTest: false,
      depthWrite: false,
    })

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: false,
      powerPreference: "high-performance",
      stencil: false,
      depth: false,
    })
    // Cap pixel ratio to 1.0 for massive GPU performance savings with imperceptible visual difference
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.0))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.domElement.style.pointerEvents = "none"
    renderer.domElement.style.width = "100%"
    renderer.domElement.style.height = "100%"
    container.appendChild(renderer.domElement)

    let resizeTimer = null
    const onResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        const width = window.innerWidth
        const height = window.innerHeight
        renderer.setSize(width, height, false)
        uniforms.resolution.value.set(width, height)
      }, 80)
    }

    const width = window.innerWidth
    const height = window.innerHeight
    renderer.setSize(width, height, false)
    uniforms.resolution.value.set(width, height)

    window.addEventListener("resize", onResize)

    let isVisible = true
    const handleVisibilityChange = () => {
      isVisible = !document.hidden
    }
    document.addEventListener("visibilitychange", handleVisibilityChange)

    let baseTime = 0
    let lastRenderTime = performance.now()

    const animate = (currentTime) => {
      rafRef.current = window.requestAnimationFrame(animate)
      if (!isVisible) return

      const delta = Math.min((currentTime - lastRenderTime) / 1000, 0.1)
      lastRenderTime = currentTime

      const progress = progressRef.current
      baseTime += (0.018 + progress * 0.02) * (delta * 60)
      uniforms.time.value = baseTime
      uniforms.intensity.value = 0.16 + progress * 0.5
      renderer.render(scene, camera)
    }

    rafRef.current = window.requestAnimationFrame(animate)

    return () => {
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current)
      }
      if (resizeTimer) clearTimeout(resizeTimer)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      window.removeEventListener("resize", onResize)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-0 h-screen w-screen bg-black"
    />
  )
}
