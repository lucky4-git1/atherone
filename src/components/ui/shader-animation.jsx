import { useEffect, useRef } from "react"
import { useMotionValueEvent, useSpring } from "framer-motion"
import * as THREE from "three"

export function ShaderAnimation({ scrollYProgress }) {
  const containerRef = useRef(null)
  const progressRef = useRef(0)
  const rafRef = useRef(0)
  const springProgress = useSpring(scrollYProgress, {
    damping: 22,
    stiffness: 120,
    mass: 0.18,
  })

  useMotionValueEvent(springProgress, "change", (latest) => {
    progressRef.current = latest
  })

  useEffect(() => {
    const container = containerRef.current
    if (!container) {
      return undefined
    }

    const vertexShader = `
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `

    const fragmentShader = `
      precision highp float;

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

        float field = noise(warped * 2.4 + vec2(t * 0.28, -t * 0.18));
        float nebula = smoothstep(0.28, 0.92, noise(warped * 1.55 - vec2(t * 0.14, t * 0.1)));
        float haze = smoothstep(0.22, 0.88, noise((warped + vec2(1.7, -2.4)) * 1.15 + vec2(-t * 0.08, t * 0.05)));
        float band = smoothstep(0.0, 1.0, 1.0 - abs(warped.y + sin(warped.x * 1.8 + t * 0.55) * 0.28));
        float drift = sin(uv.y * 5.0 + t * 2.0) * 0.03 + cos(uv.x * 4.0 - t * 1.6) * 0.02;
        vec3 base = mix(vec3(0.008, 0.014, 0.04), vec3(0.018, 0.04, 0.09), field);
        vec3 auroraA = vec3(0.14, 0.38, 0.82) * (0.18 + intensity * 0.18) * nebula;
        vec3 auroraB = vec3(0.34, 0.16, 0.72) * (0.12 + intensity * 0.12) * haze;
        vec3 mist = vec3(0.12, 0.28, 0.58) * band * 0.08;
        vec3 vignette = vec3(1.0 - smoothstep(0.2, 1.25, length(uv + drift)));
        vec3 color = base + auroraA + auroraB + mist + vignette * 0.04;

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
    })

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.domElement.style.pointerEvents = "none"
    container.appendChild(renderer.domElement)

    const onResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      renderer.setSize(width, height, false)
      uniforms.resolution.value.set(width, height)
    }

    onResize()
    window.addEventListener("resize", onResize)

    let baseTime = 0

    const animate = () => {
      const progress = progressRef.current
      baseTime += 0.018 + progress * 0.018
      uniforms.time.value = baseTime
      uniforms.intensity.value = 0.16 + progress * 0.5
      renderer.render(scene, camera)
      rafRef.current = window.requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.cancelAnimationFrame(rafRef.current)
      window.removeEventListener("resize", onResize)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [springProgress])

  return <div ref={containerRef} className="pointer-events-none fixed inset-0 z-0 h-screen w-screen bg-black" />
}
