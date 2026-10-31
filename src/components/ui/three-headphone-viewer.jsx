import { useEffect, useRef, useState, useCallback } from "react"
import * as THREE from "three"
import { soundEngine } from "@/lib/audio-synthesizer"

// PBR Finish Palette Definitions
const FINISH_PRESETS = {
  obsidian: {
    metalColor: 0x121620,
    trimColor: 0x222a38,
    cushionColor: 0x0c0e14,
    accentColor: 0x38bdf8,
    roughness: 0.26,
    metalness: 0.92,
    clearcoat: 0.35,
  },
  silver: {
    metalColor: 0xdde3ec,
    trimColor: 0x9ba8b8,
    cushionColor: 0x2e3540,
    accentColor: 0x38bdf8,
    roughness: 0.18,
    metalness: 0.96,
    clearcoat: 0.5,
  },
  sand: {
    metalColor: 0xc8b8a2,
    trimColor: 0x8a7760,
    cushionColor: 0x221f1b,
    accentColor: 0xd97706,
    roughness: 0.38,
    metalness: 0.3,
    clearcoat: 0.2,
  },
}

export function ThreeHeadphoneViewer({
  selectedFinishId = "obsidian",
  activeCalloutId = "driver",
  onSelectCallout,
  isExploded = false,
  isRotating = true,
}) {
  const containerRef = useRef(null)
  const [screenHotspots, setScreenHotspots] = useState([])

  // Three.js internal references
  const sceneRef = useRef(null)
  const cameraRef = useRef(null)
  const rendererRef = useRef(null)
  const headphoneGroupRef = useRef(null)
  const leftEarcupGroupRef = useRef(null)
  const rightEarcupGroupRef = useRef(null)
  const leftCushionRef = useRef(null)
  const rightCushionRef = useRef(null)
  const leftDriverRef = useRef(null)
  const rightDriverRef = useRef(null)
  const leftOuterCupRef = useRef(null)
  const rightOuterCupRef = useRef(null)
  const pbrMaterialsRef = useRef([])

  // Interactive interaction state
  const isDraggingRef = useRef(false)
  const prevPointerRef = useRef({ x: 0, y: 0 })
  const rotationVelocityRef = useRef({ x: 0, y: 0 })
  const explodeTargetRef = useRef(isExploded ? 1 : 0)
  const explodeCurrentRef = useRef(isExploded ? 1 : 0)

  // Hotspot 3D anchor points
  const hotspotAnchorsRef = useRef([
    { id: "driver", pos: new THREE.Vector3(-3.2, 0, 0), label: "Planar Driver" },
    { id: "crown", pos: new THREE.Vector3(-2.8, 1.2, 0.9), label: "Rotary Crown" },
    { id: "gimbal", pos: new THREE.Vector3(-2.6, 2.5, 0), label: "CNC Gimbal" },
    { id: "cushions", pos: new THREE.Vector3(3.4, 0, 0), label: "Magnetic Cushions" },
  ])

  // Sync explosion target
  useEffect(() => {
    explodeTargetRef.current = isExploded ? 1 : 0
  }, [isExploded])

  // Update PBR Materials dynamically when finish changes
  const updateMaterials = useCallback((finishId) => {
    const preset = FINISH_PRESETS[finishId] || FINISH_PRESETS.obsidian
    if (!pbrMaterialsRef.current) return

    pbrMaterialsRef.current.forEach(({ type, mat }) => {
      if (type === "chassis") {
        mat.color.setHex(preset.metalColor)
        mat.roughness = preset.roughness
        mat.metalness = preset.metalness
        mat.clearcoat = preset.clearcoat
      } else if (type === "trim") {
        mat.color.setHex(preset.trimColor)
        mat.roughness = preset.roughness + 0.1
        mat.metalness = preset.metalness * 0.9
      } else if (type === "cushion") {
        mat.color.setHex(preset.cushionColor)
        mat.roughness = 0.85
        mat.metalness = 0.05
      } else if (type === "goldTrace") {
        mat.color.setHex(0xd4af37)
        mat.roughness = 0.2
        mat.metalness = 0.95
      }
    })
  }, [])

  useEffect(() => {
    updateMaterials(selectedFinishId)
  }, [selectedFinishId, updateMaterials])

  // Setup Three.js WebGL Scene
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const width = container.clientWidth
    const height = container.clientHeight

    // Scene
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Camera
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100)
    camera.position.set(0, 0.4, 11)
    cameraRef.current = camera

    // WebGL Renderer with pixel-perfect antialiasing
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.3
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    rendererRef.current = renderer

    container.appendChild(renderer.domElement)

    // Lighting Studio Rig
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2)
    keyLight.position.set(5, 8, 7)
    keyLight.castShadow = true
    scene.add(keyLight)

    const rimLight = new THREE.DirectionalLight(0x7dd3fc, 2.8) // Sky cyan rim light
    rimLight.position.set(-6, -2, -5)
    scene.add(rimLight)

    const fillLight = new THREE.DirectionalLight(0xfff5ea, 1.2) // Warm studio fill
    fillLight.position.set(-4, 5, 4)
    scene.add(fillLight)

    const ambientLight = new THREE.AmbientLight(0x182030, 1.4)
    scene.add(ambientLight)

    // Ground Contact Shadow
    const shadowGeo = new THREE.PlaneGeometry(14, 14)
    const shadowMat = new THREE.ShadowMaterial({ opacity: 0.45 })
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat)
    shadowPlane.rotation.x = -Math.PI / 2
    shadowPlane.position.y = -3.8
    shadowPlane.receiveShadow = true
    scene.add(shadowPlane)

    // Master Headphone Group
    const headphoneGroup = new THREE.Group()
    scene.add(headphoneGroup)
    headphoneGroupRef.current = headphoneGroup

    // Register PBR Materials
    const preset = FINISH_PRESETS[selectedFinishId] || FINISH_PRESETS.obsidian
    const pbrList = []

    const chassisMat = new THREE.MeshPhysicalMaterial({
      color: preset.metalColor,
      metalness: preset.metalness,
      roughness: preset.roughness,
      clearcoat: preset.clearcoat,
      clearcoatRoughness: 0.1,
      reflectivity: 0.9,
    })
    pbrList.push({ type: "chassis", mat: chassisMat })

    const trimMat = new THREE.MeshPhysicalMaterial({
      color: preset.trimColor,
      metalness: preset.metalness * 0.9,
      roughness: preset.roughness + 0.1,
    })
    pbrList.push({ type: "trim", mat: trimMat })

    const cushionMat = new THREE.MeshStandardMaterial({
      color: preset.cushionColor,
      roughness: 0.85,
      metalness: 0.05,
    })
    pbrList.push({ type: "cushion", mat: cushionMat })

    const goldTraceMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.95,
      roughness: 0.22,
    })
    pbrList.push({ type: "goldTrace", mat: goldTraceMat })

    const darkGrilleMat = new THREE.MeshStandardMaterial({
      color: 0x05070a,
      roughness: 0.9,
      metalness: 0.3,
      wireframe: true,
    })

    const ledMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x38bdf8,
      emissiveIntensity: 2.0,
      roughness: 0.2,
    })

    pbrMaterialsRef.current = pbrList

    // ----------------------------------------------------
    // 01. HEADBAND ARCH (Extruded Curved Tube)
    // ----------------------------------------------------
    const headbandCurve = new THREE.CubicBezierCurve3(
      new THREE.Vector3(-2.6, 1.4, 0),
      new THREE.Vector3(-1.8, 4.3, 0),
      new THREE.Vector3(1.8, 4.3, 0),
      new THREE.Vector3(2.6, 1.4, 0)
    )
    const headbandGeo = new THREE.TubeGeometry(headbandCurve, 64, 0.12, 16, false)
    const headbandMesh = new THREE.Mesh(headbandGeo, chassisMat)
    headbandMesh.castShadow = true
    headphoneGroup.add(headbandMesh)

    // Inner Headband Cushion Pad
    const cushionPadCurve = new THREE.CubicBezierCurve3(
      new THREE.Vector3(-2.1, 1.7, 0),
      new THREE.Vector3(-1.4, 4.05, 0),
      new THREE.Vector3(1.4, 4.05, 0),
      new THREE.Vector3(2.1, 1.7, 0)
    )
    const cushionPadGeo = new THREE.TubeGeometry(cushionPadCurve, 48, 0.18, 16, false)
    const cushionPadMesh = new THREE.Mesh(cushionPadGeo, cushionMat)
    headphoneGroup.add(cushionPadMesh)

    // ----------------------------------------------------
    // 02. GIMBALS & YOKES (Left & Right)
    // ----------------------------------------------------
    const createYoke = (side) => {
      const yokeGroup = new THREE.Group()
      const xPos = side === "left" ? -2.6 : 2.6

      // Slider Block
      const sliderGeo = new THREE.BoxGeometry(0.35, 0.65, 0.28)
      const slider = new THREE.Mesh(sliderGeo, trimMat)
      slider.position.set(0, 0, 0)
      yokeGroup.add(slider)

      // CNC Fork Arch (holds earcup)
      const forkCurve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(side === "left" ? -0.4 : 0.4, -1.2, 0),
        new THREE.Vector3(0, -2.2, 0)
      )
      const forkGeo = new THREE.TubeGeometry(forkCurve, 24, 0.08, 12, false)
      const forkMesh = new THREE.Mesh(forkGeo, chassisMat)
      yokeGroup.add(forkMesh)

      yokeGroup.position.set(xPos, 1.4, 0)
      return yokeGroup
    }

    const leftYoke = createYoke("left")
    const rightYoke = createYoke("right")
    headphoneGroup.add(leftYoke)
    headphoneGroup.add(rightYoke)

    // ----------------------------------------------------
    // 03. CIRCUMAURAL EARCUP ASSEMBLIES
    // ----------------------------------------------------
    const createEarcupAssembly = (side) => {
      const assemblyGroup = new THREE.Group()
      const isLeft = side === "left"

      // Outer Magnesium Acoustic Housing
      const outerCupGeo = new THREE.CylinderGeometry(1.45, 1.55, 0.65, 48)
      outerCupGeo.rotateZ(Math.PI / 2)
      const outerCup = new THREE.Mesh(outerCupGeo, chassisMat)
      outerCup.castShadow = true
      assemblyGroup.add(outerCup)

      // Chamfered Accent Ring
      const ringGeo = new THREE.TorusGeometry(1.5, 0.04, 16, 48)
      ringGeo.rotateY(Math.PI / 2)
      const ring = new THREE.Mesh(ringGeo, trimMat)
      assemblyGroup.add(ring)

      // Open-Back Acoustic Grille
      const grilleGeo = new THREE.CircleGeometry(1.3, 32)
      grilleGeo.rotateY(isLeft ? -Math.PI / 2 : Math.PI / 2)
      const grille = new THREE.Mesh(grilleGeo, darkGrilleMat)
      grille.position.x = isLeft ? -0.34 : 0.34
      assemblyGroup.add(grille)

      // Planar-Magnetic Transducer Sub-assembly
      const driverGroup = new THREE.Group()
      const diaphragmGeo = new THREE.CircleGeometry(1.15, 32)
      diaphragmGeo.rotateY(isLeft ? Math.PI / 2 : -Math.PI / 2)
      const diaphragm = new THREE.Mesh(diaphragmGeo, goldTraceMat)
      driverGroup.add(diaphragm)

      // Push-Pull Neodymium Magnet Array Bars
      for (let i = -3; i <= 3; i++) {
        const barGeo = new THREE.BoxGeometry(0.04, 0.12, 1.8 - Math.abs(i) * 0.25)
        const bar = new THREE.Mesh(barGeo, trimMat)
        bar.position.set(0, i * 0.28, 0)
        driverGroup.add(bar)
      }
      driverGroup.position.x = isLeft ? 0.05 : -0.05
      assemblyGroup.add(driverGroup)

      // Toroidal Memory Foam Cushion
      const cushionGeo = new THREE.TorusGeometry(1.4, 0.42, 24, 48)
      cushionGeo.rotateY(Math.PI / 2)
      const cushion = new THREE.Mesh(cushionGeo, cushionMat)
      cushion.position.x = isLeft ? 0.38 : -0.38
      cushion.castShadow = true
      assemblyGroup.add(cushion)

      // Hardware Controls (Knurled Crown on Left Earcup)
      if (isLeft) {
        const crownGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.18, 24)
        crownGeo.rotateZ(Math.PI / 2)
        const crown = new THREE.Mesh(crownGeo, trimMat)
        crown.position.set(-0.25, 1.25, 0.8)
        assemblyGroup.add(crown)

        // LED Status Indicator Ring
        const ledGeo = new THREE.SphereGeometry(0.06, 16, 16)
        const led = new THREE.Mesh(ledGeo, ledMat)
        led.position.set(-0.4, 1.25, 0.8)
        assemblyGroup.add(led)
      } else {
        // 3.5mm Passive Bypass Socket on Right Earcup
        const jackGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.15, 16)
        const jack = new THREE.Mesh(jackGeo, trimMat)
        jack.position.set(0, -1.4, 0)
        assemblyGroup.add(jack)
      }

      // Default resting coordinates
      const restingX = isLeft ? -2.7 : 2.7
      assemblyGroup.position.set(restingX, -0.2, 0)

      return {
        assembly: assemblyGroup,
        cushion,
        driver: driverGroup,
        outerCup,
        baseX: restingX,
      }
    }

    const leftData = createEarcupAssembly("left")
    const rightData = createEarcupAssembly("right")

    headphoneGroup.add(leftData.assembly)
    headphoneGroup.add(rightData.assembly)

    leftEarcupGroupRef.current = leftData.assembly
    rightEarcupGroupRef.current = rightData.assembly
    leftCushionRef.current = leftData.cushion
    rightCushionRef.current = rightData.cushion
    leftDriverRef.current = leftData.driver
    rightDriverRef.current = rightData.driver
    leftOuterCupRef.current = leftData.outerCup
    rightOuterCupRef.current = rightData.outerCup

    // Subtle initial turntable pose
    headphoneGroup.rotation.y = THREE.MathUtils.degToRad(35)
    headphoneGroup.rotation.x = THREE.MathUtils.degToRad(12)

    // Animation Loop
    let animationFrameId
    const clock = new THREE.Clock()

    const animate = () => {
      const delta = clock.getDelta()

      // Smoothly interpolate explosion state
      explodeCurrentRef.current += (explodeTargetRef.current - explodeCurrentRef.current) * 0.08
      const exp = explodeCurrentRef.current

      // Exploded physical displacements
      if (leftCushionRef.current && rightCushionRef.current) {
        leftCushionRef.current.position.x = 0.38 + exp * 1.8
        rightCushionRef.current.position.x = -0.38 - exp * 1.8
      }
      if (leftDriverRef.current && rightDriverRef.current) {
        leftDriverRef.current.position.x = 0.05 + exp * 0.95
        rightDriverRef.current.position.x = -0.05 - exp * 0.95
      }
      if (leftOuterCupRef.current && rightOuterCupRef.current) {
        leftOuterCupRef.current.position.x = -exp * 0.5
        rightOuterCupRef.current.position.x = exp * 0.5
      }

      // Apply inertial rotation & velocity damping
      if (headphoneGroupRef.current) {
        if (!isDraggingRef.current) {
          if (isRotating) {
            headphoneGroupRef.current.rotation.y += 0.45 * delta
          }
          // Inertial decay
          headphoneGroupRef.current.rotation.y += rotationVelocityRef.current.y
          headphoneGroupRef.current.rotation.x += rotationVelocityRef.current.x
          rotationVelocityRef.current.x *= 0.92
          rotationVelocityRef.current.y *= 0.92
        }
      }

      // Project 3D Hotspot Coordinates to 2D Screen Coordinates
      if (cameraRef.current && containerRef.current && headphoneGroupRef.current) {
        const cWidth = containerRef.current.clientWidth
        const cHeight = containerRef.current.clientHeight
        const spots = hotspotAnchorsRef.current.map((anchor) => {
          const worldPos = anchor.pos.clone()
          worldPos.applyMatrix4(headphoneGroupRef.current.matrixWorld)
          worldPos.project(cameraRef.current)

          const x = ((worldPos.x + 1) * cWidth) / 2
          const y = ((-worldPos.y + 1) * cHeight) / 2
          const isFrontFacing = worldPos.z < 1.0

          return {
            id: anchor.id,
            label: anchor.label,
            x,
            y,
            visible: isFrontFacing && x > 20 && x < cWidth - 20 && y > 20 && y < cHeight - 20,
          }
        })
        setScreenHotspots(spots)
      }

      renderer.render(scene, camera)
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    // Resize Handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameId)
      if (renderer.domElement && container) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [selectedFinishId, isRotating])

  // Mouse & Touch Orbit Interactions
  const handlePointerDown = (e) => {
    isDraggingRef.current = true
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0
    const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0
    prevPointerRef.current = { x: clientX, y: clientY }
    rotationVelocityRef.current = { x: 0, y: 0 }
  }

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0
    const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0

    const deltaX = clientX - prevPointerRef.current.x
    const deltaY = clientY - prevPointerRef.current.y

    if (headphoneGroupRef.current) {
      headphoneGroupRef.current.rotation.y += deltaX * 0.008
      headphoneGroupRef.current.rotation.x += deltaY * 0.006

      // Clamp vertical tilt to avoid inversion
      headphoneGroupRef.current.rotation.x = Math.max(
        -0.7,
        Math.min(0.7, headphoneGroupRef.current.rotation.x)
      )
    }

    rotationVelocityRef.current = {
      x: deltaY * 0.0015,
      y: deltaX * 0.002,
    }

    prevPointerRef.current = { x: clientX, y: clientY }
  }

  const handlePointerUp = () => {
    isDraggingRef.current = false
  }

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      className="relative w-full h-full overflow-hidden select-none cursor-grab active:cursor-grabbing"
    >
      {/* 2D Projected Hotspot Pins */}
      {screenHotspots.map((spot) => {
        if (!spot.visible) return null
        const isActive = activeCalloutId === spot.id

        return (
          <button
            key={spot.id}
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              soundEngine.playClick()
              onSelectCallout?.(spot.id)
            }}
            style={{
              transform: `translate(${spot.x}px, ${spot.y}px) translate(-50%, -50%)`,
            }}
            className={`absolute top-0 left-0 z-20 flex items-center gap-2 rounded-full border px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider backdrop-blur-md transition-colors duration-150 ${
              isActive
                ? "border-sky-400 bg-sky-500/25 text-white shadow-[0_0_16px_rgba(56,189,248,0.6)]"
                : "border-white/15 bg-black/60 text-white/70 hover:border-white/35 hover:text-white"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                isActive ? "bg-sky-400 animate-ping" : "bg-white/60"
              }`}
            />
            <span className="hidden sm:inline font-semibold">{spot.label}</span>
          </button>
        )
      })}
    </div>
  )
}
