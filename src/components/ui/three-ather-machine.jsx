import { useEffect, useRef, useState, useCallback } from "react"
import * as THREE from "three"
import { soundEngine } from "@/lib/audio-synthesizer"

const COLORWAY_PRESETS = {
  "hyper-white": {
    bodyColor: 0xf4f6fb,
    frameColor: 0x94a3b8,
    accentColor: 0x00e599, // Ather electric mint green
    seatColor: 0x1e293b,
    roughness: 0.2,
    metalness: 0.1,
    clearcoat: 0.6,
  },
  "space-grey": {
    bodyColor: 0x475569,
    frameColor: 0x334155,
    accentColor: 0x38bdf8, // Cyan telemetry
    seatColor: 0x0f172a,
    roughness: 0.3,
    metalness: 0.45,
    clearcoat: 0.4,
  },
  "stealth-black": {
    bodyColor: 0x090d16,
    frameColor: 0x1e293b,
    accentColor: 0xef4444, // Crimson Apex
    seatColor: 0x05070a,
    roughness: 0.35,
    metalness: 0.2,
    clearcoat: 0.3,
  },
  "indiglo-blue": {
    bodyColor: 0x1e3a8a,
    frameColor: 0x64748b,
    accentColor: 0x60a5fa,
    seatColor: 0x0f172a,
    roughness: 0.25,
    metalness: 0.35,
    clearcoat: 0.5,
  },
}

export function ThreeAtherMachine({
  selectedColorwayId = "hyper-white",
  activeHotspotId = "chassis",
  onSelectHotspot,
  isRotating = true,
}) {
  const containerRef = useRef(null)
  const [screenHotspots, setScreenHotspots] = useState([])

  const sceneRef = useRef(null)
  const cameraRef = useRef(null)
  const rendererRef = useRef(null)
  const vehicleGroupRef = useRef(null)
  const bodyMaterialsRef = useRef([])
  const accentMaterialsRef = useRef([])
  const cameraTargetPosRef = useRef(new THREE.Vector3(0, 0.4, 7.5))
  const cameraLookAtRef = useRef(new THREE.Vector3(0, 0, 0))

  const isDraggingRef = useRef(false)
  const prevPointerRef = useRef({ x: 0, y: 0 })
  const rotationVelocityRef = useRef({ x: 0, y: 0 })

  // 3D Hotspot Targets for Ather Architecture
  const hotspotsDataRef = useRef([
    { id: "chassis", pos: new THREE.Vector3(0, 0.2, 0.5), label: "Aluminum Chassis", camOffset: new THREE.Vector3(0, 0.5, 6.2) },
    { id: "motor", pos: new THREE.Vector3(-0.5, -0.6, 0.8), label: "PMSM Mid-Drive", camOffset: new THREE.Vector3(-1.2, -0.3, 5.5) },
    { id: "battery", pos: new THREE.Vector3(0, -0.9, 0), label: "IP67 Battery", camOffset: new THREE.Vector3(0, -0.4, 6.0) },
    { id: "cockpit", pos: new THREE.Vector3(0.8, 1.2, 0), label: "7\" Touchscreen", camOffset: new THREE.Vector3(1.2, 1.5, 4.8) },
    { id: "regenerative", pos: new THREE.Vector3(1.0, 1.3, -0.5), label: "Magic Twist™ Regen", camOffset: new THREE.Vector3(1.4, 1.4, 4.6) },
  ])

  // Update PBR Materials dynamically
  const updateMaterials = useCallback((colorwayId) => {
    const preset = COLORWAY_PRESETS[colorwayId] || COLORWAY_PRESETS["hyper-white"]

    bodyMaterialsRef.current.forEach((mat) => {
      mat.color.setHex(preset.bodyColor)
      mat.roughness = preset.roughness
      mat.metalness = preset.metalness
      mat.clearcoat = preset.clearcoat
    })

    accentMaterialsRef.current.forEach((mat) => {
      mat.color.setHex(preset.accentColor)
      mat.emissive.setHex(preset.accentColor)
    })
  }, [])

  useEffect(() => {
    updateMaterials(selectedColorwayId)
  }, [selectedColorwayId, updateMaterials])

  // Camera focus on hotspot
  useEffect(() => {
    const found = hotspotsDataRef.current.find((h) => h.id === activeHotspotId)
    if (found && cameraTargetPosRef.current) {
      cameraTargetPosRef.current.copy(found.camOffset)
    } else {
      cameraTargetPosRef.current.set(0, 0.4, 7.5)
    }
  }, [activeHotspotId])

  // Initialize Three.js WebGL Scene
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const width = container.clientWidth
    const height = container.clientHeight

    const scene = new THREE.Scene()
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100)
    camera.position.set(0, 0.4, 7.5)
    cameraRef.current = camera

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.35
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    rendererRef.current = renderer

    container.appendChild(renderer.domElement)

    // Studio Lighting
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4)
    keyLight.position.set(5, 7, 6)
    keyLight.castShadow = true
    scene.add(keyLight)

    const rimLight = new THREE.DirectionalLight(0x00e599, 2.2) // Signature electric green rim
    rimLight.position.set(-6, -1, -5)
    scene.add(rimLight)

    const fillLight = new THREE.DirectionalLight(0xe2e8f0, 1.2)
    fillLight.position.set(-4, 5, 4)
    scene.add(fillLight)

    const ambientLight = new THREE.AmbientLight(0x101726, 1.5)
    scene.add(ambientLight)

    // Ground Contact Shadow
    const shadowGeo = new THREE.PlaneGeometry(16, 16)
    const shadowMat = new THREE.ShadowMaterial({ opacity: 0.45 })
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat)
    shadowPlane.rotation.x = -Math.PI / 2
    shadowPlane.position.y = -2.1
    shadowPlane.receiveShadow = true
    scene.add(shadowPlane)

    // Master Vehicle Group
    const vehicleGroup = new THREE.Group()
    scene.add(vehicleGroup)
    vehicleGroupRef.current = vehicleGroup

    // Materials
    const preset = COLORWAY_PRESETS[selectedColorwayId] || COLORWAY_PRESETS["hyper-white"]

    const bodyMat = new THREE.MeshPhysicalMaterial({
      color: preset.bodyColor,
      roughness: preset.roughness,
      metalness: preset.metalness,
      clearcoat: preset.clearcoat,
      clearcoatRoughness: 0.1,
    })
    bodyMaterialsRef.current = [bodyMat]

    const frameMat = new THREE.MeshStandardMaterial({
      color: preset.frameColor,
      metalness: 0.85,
      roughness: 0.28,
    })

    const accentMat = new THREE.MeshStandardMaterial({
      color: preset.accentColor,
      emissive: preset.accentColor,
      emissiveIntensity: 0.8,
      roughness: 0.3,
    })
    accentMaterialsRef.current = [accentMat]

    const darkRubberMat = new THREE.MeshStandardMaterial({
      color: 0x0a0d14,
      roughness: 0.88,
      metalness: 0.05,
    })

    const wheelAlloyMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.9,
      roughness: 0.22,
    })

    const brakeRotorMat = new THREE.MeshStandardMaterial({
      color: 0xd1d5db,
      metalness: 0.95,
      roughness: 0.15,
    })

    const lightBarMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xffffff,
      emissiveIntensity: 2.2,
      roughness: 0.1,
    })

    const screenGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0x050914,
      metalness: 0.1,
      roughness: 0.05,
      transmission: 0.2,
      ior: 1.5,
    })

    // -----------------------------------------------------------
    // 01. WHEELS & TYRES (Front & Rear 12-inch Alloys)
    // -----------------------------------------------------------
    const createWheel = (xPos) => {
      const wheelGroup = new THREE.Group()

      // Rubber Tyre
      const tyreGeo = new THREE.TorusGeometry(0.85, 0.26, 24, 48)
      const tyre = new THREE.Mesh(tyreGeo, darkRubberMat)
      tyre.castShadow = true
      wheelGroup.add(tyre)

      // Alloy Rim
      const rimGeo = new THREE.CylinderGeometry(0.68, 0.68, 0.32, 24)
      rimGeo.rotateX(Math.PI / 2)
      const rim = new THREE.Mesh(rimGeo, wheelAlloyMat)
      wheelGroup.add(rim)

      // Ventilated Disc Brake Rotor
      const rotorGeo = new THREE.RingGeometry(0.3, 0.62, 32)
      const rotor = new THREE.Mesh(rotorGeo, brakeRotorMat)
      rotor.position.z = 0.18
      wheelGroup.add(rotor)

      // Brake Caliper
      const caliperGeo = new THREE.BoxGeometry(0.18, 0.32, 0.14)
      const caliper = new THREE.Mesh(caliperGeo, accentMat)
      caliper.position.set(0.42, 0.35, 0.18)
      wheelGroup.add(caliper)

      wheelGroup.position.set(xPos, -1.05, 0)
      return wheelGroup
    }

    const frontWheel = createWheel(2.2)
    const rearWheel = createWheel(-2.2)
    vehicleGroup.add(frontWheel)
    vehicleGroup.add(rearWheel)

    // -----------------------------------------------------------
    // 02. HYBRID ALUMINUM CHASSIS & FLOORBOARD
    // -----------------------------------------------------------
    // Under-Floor Battery Compartment (Anchors center of mass)
    const batteryGeo = new THREE.BoxGeometry(2.3, 0.42, 1.25)
    const batteryPack = new THREE.Mesh(batteryGeo, frameMat)
    batteryPack.position.set(0, -0.85, 0)
    batteryPack.castShadow = true
    vehicleGroup.add(batteryPack)

    // Flat Rider Floorboard
    const floorboardGeo = new THREE.BoxGeometry(2.5, 0.1, 1.35)
    const floorboard = new THREE.Mesh(floorboardGeo, darkRubberMat)
    floorboard.position.set(0, -0.6, 0)
    vehicleGroup.add(floorboard)

    // Exposed Aluminum Monocoque Trellis Spine
    const trellisCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.8, -0.6, 0),
      new THREE.Vector3(-0.9, -0.1, 0),
      new THREE.Vector3(0.5, 0.2, 0),
      new THREE.Vector3(1.8, 0.8, 0),
    ])
    const trellisGeo = new THREE.TubeGeometry(trellisCurve, 32, 0.14, 12, false)
    const trellis = new THREE.Mesh(trellisGeo, frameMat)
    trellis.castShadow = true
    vehicleGroup.add(trellis)

    // Symmetrical Monoshock Rear Spring
    const shockCurve = new THREE.LineCurve3(
      new THREE.Vector3(-1.6, -0.6, 0.25),
      new THREE.Vector3(-0.8, 0.1, 0.25)
    )
    const shockGeo = new THREE.TubeGeometry(shockCurve, 16, 0.08, 12, false)
    const monoshock = new THREE.Mesh(shockGeo, accentMat)
    vehicleGroup.add(monoshock)

    // PMSM Mid-Drive Motor Casing & Belt
    const motorGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.65, 24)
    motorGeo.rotateZ(Math.PI / 2)
    const motorMesh = new THREE.Mesh(motorGeo, frameMat)
    motorMesh.position.set(-1.0, -0.65, 0.35)
    vehicleGroup.add(motorMesh)

    // Carbon Belt Drive Loop
    const beltCurve = new THREE.EllipseCurve(-1.6, -0.85, 0.7, 0.25, 0, 2 * Math.PI, false, 0)
    const beltPts = beltCurve.getPoints(32).map((p) => new THREE.Vector3(p.x, p.y, 0.42))
    const beltSpline = new THREE.CatmullRomCurve3(beltPts, true)
    const beltGeo = new THREE.TubeGeometry(beltSpline, 32, 0.035, 8, true)
    const beltMesh = new THREE.Mesh(beltGeo, darkRubberMat)
    vehicleGroup.add(beltMesh)

    // -----------------------------------------------------------
    // 03. SCULPTED BODYWORK & AERODYNAMIC APRON
    // -----------------------------------------------------------
    // Front Aerodynamic Apron
    const apronGeo = new THREE.ConeGeometry(1.2, 2.2, 4)
    apronGeo.rotateY(Math.PI / 4)
    apronGeo.rotateZ(-Math.PI / 7)
    const apron = new THREE.Mesh(apronGeo, bodyMat)
    apron.position.set(1.6, 0.2, 0)
    apron.scale.set(0.9, 1.1, 0.95)
    apron.castShadow = true
    vehicleGroup.add(apron)

    // Horizontal Razor LED Headlamp DRL Bar
    const headlightGeo = new THREE.BoxGeometry(0.12, 0.08, 0.95)
    const headlight = new THREE.Mesh(headlightGeo, lightBarMat)
    headlight.position.set(2.05, 0.32, 0)
    vehicleGroup.add(headlight)

    // Sculpted Dual Saddle Seat
    const seatGeo = new THREE.BoxGeometry(2.3, 0.28, 1.05)
    const seat = new THREE.Mesh(seatGeo, darkRubberMat)
    seat.position.set(-0.6, 0.25, 0)
    seat.rotation.z = -0.06
    seat.castShadow = true
    vehicleGroup.add(seat)

    // Upswept Tail Cowl
    const tailGeo = new THREE.ConeGeometry(0.75, 1.6, 4)
    tailGeo.rotateY(Math.PI / 4)
    tailGeo.rotateZ(Math.PI / 3)
    const tailCowl = new THREE.Mesh(tailGeo, bodyMat)
    tailCowl.position.set(-1.7, 0.25, 0)
    tailCowl.scale.set(0.8, 1.0, 0.8)
    vehicleGroup.add(tailCowl)

    // Rear LED Tail Light Bar
    const tailLightGeo = new THREE.BoxGeometry(0.08, 0.06, 0.72)
    const tailLight = new THREE.Mesh(
      tailLightGeo,
      new THREE.MeshStandardMaterial({
        color: 0xef4444,
        emissive: 0xef4444,
        emissiveIntensity: 2.0,
      })
    )
    tailLight.position.set(-2.28, 0.35, 0)
    vehicleGroup.add(tailLight)

    // -----------------------------------------------------------
    // 04. HANDLEBAR COCKPIT & 7-INCH TOUCHSCREEN
    // -----------------------------------------------------------
    // Handlebar Stem
    const stemGeo = new THREE.CylinderGeometry(0.08, 0.08, 1.1, 16)
    stemGeo.rotateZ(-Math.PI / 7)
    const stem = new THREE.Mesh(stemGeo, frameMat)
    stem.position.set(1.9, 0.85, 0)
    vehicleGroup.add(stem)

    // Transverse Handlebar
    const barGeo = new THREE.CylinderGeometry(0.05, 0.05, 1.8, 16)
    barGeo.rotateX(Math.PI / 2)
    const bar = new THREE.Mesh(barGeo, frameMat)
    bar.position.set(2.1, 1.35, 0)
    vehicleGroup.add(bar)

    // 7-inch Touchscreen Dashboard Housing
    const screenCaseGeo = new THREE.BoxGeometry(0.12, 0.52, 0.85)
    screenCaseGeo.rotateZ(-Math.PI / 6)
    const screenCase = new THREE.Mesh(screenCaseGeo, frameMat)
    screenCase.position.set(1.85, 1.38, 0)
    vehicleGroup.add(screenCase)

    // Glass Screen Face with HUD Glow
    const screenFaceGeo = new THREE.PlaneGeometry(0.48, 0.8)
    screenFaceGeo.rotateY(-Math.PI / 2)
    screenFaceGeo.rotateZ(Math.PI / 6)
    const screenFace = new THREE.Mesh(screenFaceGeo, screenGlassMat)
    screenFace.position.set(1.8, 1.4, 0)
    vehicleGroup.add(screenFace)

    // Initial vehicle orientation (dynamic 3/4 beauty angle)
    vehicleGroup.rotation.y = THREE.MathUtils.degToRad(-35)

    // Animation Loop
    let animId
    const clock = new THREE.Clock()

    const animate = () => {
      const delta = clock.getDelta()

      // Smoothly interpolate camera position toward target
      if (cameraRef.current && cameraTargetPosRef.current) {
        cameraRef.current.position.lerp(cameraTargetPosRef.current, 0.05)
        cameraRef.current.lookAt(cameraLookAtRef.current)
      }

      // Smooth inertial turntable rotation
      if (vehicleGroupRef.current) {
        if (!isDraggingRef.current) {
          if (isRotating) {
            vehicleGroupRef.current.rotation.y += 0.35 * delta
          }
          vehicleGroupRef.current.rotation.y += rotationVelocityRef.current.y
          vehicleGroupRef.current.rotation.x += rotationVelocityRef.current.x
          rotationVelocityRef.current.x *= 0.9
          rotationVelocityRef.current.y *= 0.9
        }
      }

      // Project 3D Hotspot Coordinates to 2D Screen Coordinates
      if (cameraRef.current && containerRef.current && vehicleGroupRef.current) {
        const cWidth = containerRef.current.clientWidth
        const cHeight = containerRef.current.clientHeight

        const spots = hotspotsDataRef.current.map((anchor) => {
          const worldPos = anchor.pos.clone()
          worldPos.applyMatrix4(vehicleGroupRef.current.matrixWorld)
          worldPos.project(cameraRef.current)

          const x = ((worldPos.x + 1) * cWidth) / 2
          const y = ((-worldPos.y + 1) * cHeight) / 2
          const isFrontFacing = worldPos.z < 1.0

          return {
            id: anchor.id,
            label: anchor.label,
            x,
            y,
            visible: isFrontFacing && x > 25 && x < cWidth - 25 && y > 25 && y < cHeight - 25,
          }
        })
        setScreenHotspots(spots)
      }

      renderer.render(scene, camera)
      animId = requestAnimationFrame(animate)
    }

    animate()

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
      cancelAnimationFrame(animId)
      if (renderer.domElement && container) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [selectedColorwayId, isRotating])

  // Pointer drag orbit
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

    if (vehicleGroupRef.current) {
      vehicleGroupRef.current.rotation.y += deltaX * 0.007
      vehicleGroupRef.current.rotation.x += deltaY * 0.004

      vehicleGroupRef.current.rotation.x = Math.max(
        -0.4,
        Math.min(0.4, vehicleGroupRef.current.rotation.x)
      )
    }

    rotationVelocityRef.current = {
      x: deltaY * 0.001,
      y: deltaX * 0.0018,
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
      {/* 2D Projected Hotspot Pins in WebGL Space */}
      {screenHotspots.map((spot) => {
        if (!spot.visible) return null
        const isActive = activeHotspotId === spot.id

        return (
          <button
            key={spot.id}
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              soundEngine.playClick()
              onSelectHotspot?.(spot.id)
            }}
            style={{
              transform: `translate(${spot.x}px, ${spot.y}px) translate(-50%, -50%)`,
            }}
            className={`absolute top-0 left-0 z-20 flex items-center gap-2 rounded-full border px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider backdrop-blur-md transition-colors duration-150 ${
              isActive
                ? "border-emerald-400 bg-emerald-500/25 text-white shadow-[0_0_16px_rgba(0,229,153,0.6)]"
                : "border-white/15 bg-black/60 text-white/70 hover:border-white/35 hover:text-white"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                isActive ? "bg-emerald-400 animate-ping" : "bg-white/60"
              }`}
            />
            <span className="hidden sm:inline font-semibold">{spot.label}</span>
          </button>
        )
      })}
    </div>
  )
}
