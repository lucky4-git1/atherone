// ATHERONE // Single Source of Truth for Electric Mobility & Architecture

export const ATHER_DATA = {
  name: "ATHERONE",
  tagline: "An electric mobility story, told through interaction.",
  headline: "ENGINEERED FOR THE MOVEMENT.",
  subheadline:
    "An exploration of modern electric mobility, industrial product design, and connected vehicle intelligence.",
  independentNotice:
    "Independent creative portfolio concept. Not affiliated with, endorsed by, or sponsored by Ather Energy. All product data reflects verified Ather 450 platform specifications.",

  chapters: [
    { id: "arrival", num: "01", label: "Arrival", title: "Engineered for the Movement" },
    { id: "idea", num: "02", label: "The Idea", title: "Acoustic & Kinetic Philosophy" },
    { id: "machine", num: "03", label: "The Machine", title: "Industrial Architecture" },
    { id: "details", num: "04", label: "The Details", title: "Hardware Explorer" },
    { id: "movement", num: "05", label: "The Movement", title: "Dynamics & Acceleration" },
    { id: "intelligence", num: "06", label: "The Intelligence", title: "AtherStack Cockpit" },
    { id: "experience", num: "07", label: "The Experience", title: "Urban Scenarios" },
    { id: "specifications", num: "08", label: "The Specifications", title: "Telemetry & Data" },
    { id: "conclusion", num: "09", label: "The Conclusion", title: "Closing Impression" },
    { id: "credits", num: "10", label: "Project Credits", title: "Case Study & Attribution" },
  ],

  colorways: [
    {
      id: "hyper-white",
      name: "Hyper White",
      hex: "#f8fafc",
      accent: "#00e599",
      description: "Gloss Arctic White with signature Ather electric green monoshock highlight.",
      tag: "Signature Classic",
    },
    {
      id: "space-grey",
      name: "Space Grey",
      hex: "#64748b",
      accent: "#38bdf8",
      description: "Satin metallic gunmetal with cyan telemetry accents on exposed subframe.",
      tag: "Industrial Modern",
    },
    {
      id: "stealth-black",
      name: "Stealth Black",
      hex: "#0f172a",
      accent: "#ef4444",
      description: "Deep matte black with crimson trellis highlights inspired by Apex edition.",
      tag: "Performance Tier",
    },
    {
      id: "indiglo-blue",
      name: "Indiglo Blue",
      hex: "#1e3a8a",
      accent: "#60a5fa",
      description: "Deep oceanic metallic finish with high-contrast aluminum wheel rims.",
      tag: "Special Edition",
    },
  ],

  hardwareDetails: [
    {
      id: "chassis",
      title: "Hybrid Aluminum Monocoque",
      category: "Structural Engineering",
      metric: "47:53 Balance",
      description:
        "High-tensile die-cast aluminum subframe coupled with a steel trellis core. Engineered with a low center of gravity and 47:53 front-to-rear weight distribution for razor-sharp urban flickability and zero frame flex.",
      calloutPosition: { x: 0, y: 0.2, z: 0 },
    },
    {
      id: "motor",
      title: "PMSM Mid-Drive Powertrain",
      category: "Electric Propulsion",
      metric: "6.4 kW Peak // 26 Nm",
      description:
        "Permanent Magnet Synchronous Motor centrally mounted to eliminate unsprung wheel weight. Transfers instantaneous 26 Nm torque through a zero-maintenance Gates carbon-fiber reinforced synchronous belt drive.",
      calloutPosition: { x: -0.4, y: -0.6, z: 0.5 },
    },
    {
      id: "battery",
      title: "IP67 High-Energy Battery Pack",
      category: "Energy Storage",
      metric: "3.7 kWh // 150 km TrueRange",
      description:
        "Mounted below the floorboard to anchor vehicle center of mass. Encased in a sealed die-cast aluminum enclosure with structural active potting, rated IP67 against monsoonal water submersion.",
      calloutPosition: { x: 0, y: -0.8, z: 0 },
    },
    {
      id: "cockpit",
      title: "7-Inch Sunlight-Readable Cockpit",
      category: "Vehicle Intelligence",
      metric: "AtherStack™ 6.0",
      description:
        "IP65 waterproof capacitive touchscreen powered by an onboard quad-core processor. Displays real-time Google Maps turn-by-turn navigation, ride modes, and live telemetry without smartphone tethering.",
      calloutPosition: { x: 0.6, y: 1.1, z: 0 },
    },
    {
      id: "regenerative",
      title: "Magic Twist™ Electronic Braking",
      category: "Dynamic Recuperation",
      metric: "Up to 40% Brake Relief",
      description:
        "Reverse throttle rotation engages progressive electronic regenerative deceleration. Recovers kinetic energy into the battery while coming to a complete stop on slopes without applying mechanical brake discs.",
      calloutPosition: { x: 0.7, y: 1.0, z: -0.4 },
    },
  ],

  rideModes: [
    {
      id: "eco",
      name: "Eco",
      range: "150 km",
      topSpeed: "50 km/h",
      powerRating: "2.8 kW",
      accentColor: "#00e599",
      bgGradient: "from-emerald-950/40 via-emerald-900/10 to-transparent",
      character: "Smooth linear acceleration calibrated for maximum battery endurance in dense stop-and-go traffic.",
    },
    {
      id: "ride",
      name: "Ride",
      range: "115 km",
      topSpeed: "70 km/h",
      powerRating: "4.2 kW",
      accentColor: "#38bdf8",
      bgGradient: "from-sky-950/40 via-sky-900/10 to-transparent",
      character: "The ideal balance of responsive mid-range overtaking power and predictable commuter range.",
    },
    {
      id: "sport",
      name: "Sport",
      range: "90 km",
      topSpeed: "85 km/h",
      powerRating: "5.4 kW",
      accentColor: "#fbbf24",
      bgGradient: "from-amber-950/40 via-amber-900/10 to-transparent",
      character: "Aggressive throttle curve offering brisk acceleration for arterial highways and open urban avenues.",
    },
    {
      id: "warp",
      name: "Warp",
      range: "75 km",
      topSpeed: "90 km/h",
      powerRating: "6.4 kW",
      accentColor: "#a855f7",
      bgGradient: "from-purple-950/40 via-purple-900/10 to-transparent",
      character: "Unrestricted delivery of 26 Nm instantaneous torque. 0 to 40 km/h in 3.3 seconds with zero transmission lag.",
    },
  ],

  urbanScenarios: [
    {
      time: "06:45 AM",
      title: "The Dawn Departure",
      subtitle: "Silent neighborhood egress",
      description:
        "Instant torque without the mechanical vibration of combustion. The carbon belt drive glides silently through residential streets before the city wakes.",
      stat: "0 dB Combustion Rumble",
    },
    {
      time: "09:15 AM",
      title: "The Arterial Gridlock",
      subtitle: "Low-speed balance & nimble flickability",
      description:
        "The 47:53 weight distribution and low-slung battery place mass exactly between the rider's feet, allowing seamless weaving and effortless foot-up balance.",
      stat: "111.6 kg Kerb Weight",
    },
    {
      time: "02:30 PM",
      title: "The Ather Grid Hypercharge",
      subtitle: "Fast-charging on the fly",
      description:
        "Plugging in at an Ather Grid charging point replenishes range at up to 1.5 km per minute. A quick espresso stop restores enough battery for the evening journey.",
      stat: "1.5 km / Minute Charge",
    },
    {
      time: "11:20 PM",
      title: "The Nocturnal Flyover",
      subtitle: "LED light guide & AutoHold stability",
      description:
        "Dual monocoque LED headlamps cut through coastal mist, while AutoHold locks the wheels on 20-degree flyover incline stops without handbrake fatigue.",
      stat: "20° Gradient Hold",
    },
  ],

  specifications: [
    {
      category: "Powertrain & Dynamics",
      specs: [
        { label: "Motor Architecture", value: "Permanent Magnet Synchronous (PMSM)", detail: "Centrally positioned mid-drive configuration" },
        { label: "Peak Power Output", value: "6.4 kW (8.58 hp)", detail: "Nominal continuous output rated at 3.3 kW" },
        { label: "Instantaneous Wheel Torque", value: "26 Nm Peak", detail: "Delivered instantly from 0 RPM with linear throttle map" },
        { label: "Final Transmission", value: "Gates Carbon Belt Drive", detail: "Zero-chain noise, zero oiling, carbon-reinforced" },
        { label: "Acceleration (0 – 40 km/h)", value: "3.3 Seconds", detail: "Tested under ISO rider payload in Warp mode" },
        { label: "Maximum Velocity", value: "90 km/h", detail: "Electronically limited for optimal thermal envelope" },
      ],
    },
    {
      category: "Battery & Energy Infrastructure",
      specs: [
        { label: "Battery Chemistry", value: "Lithium-ion NMC High-Density", detail: "Automotive-grade pouch cells with active BMS" },
        { label: "Installed Capacity", value: "3.7 kWh Nominal", detail: "Under-floor mounted cast-aluminum casing" },
        { label: "Ingress Protection", value: "IP67 Certified", detail: "Submersible up to 1 meter depth for 30 minutes" },
        { label: "Certified TrueRange™", value: "110 – 150 km", detail: "Eco: 150 km | Ride: 115 km | Warp: 75 km" },
        { label: "Fast Charging Speed", value: "1.5 km / minute", detail: "Ather Grid DC fast-charging network up to 80%" },
        { label: "Home Charge (0 to 80%)", value: "4 Hours 30 Minutes", detail: "Using standard 5A household wall socket" },
      ],
    },
    {
      category: "Chassis & Mechanical Hardware",
      specs: [
        { label: "Chassis Construction", value: "Die-Cast Hybrid Aluminum", detail: "Precision aluminum subframe + steel trellis spine" },
        { label: "Weight Distribution", value: "47% Front / 53% Rear", detail: "Near-neutral road balance with low polar moment" },
        { label: "Front Suspension", value: "Telescopic Hydraulic Fork", detail: "Balanced damping tuned for rough urban asphalt" },
        { label: "Rear Suspension", value: "Symmetric Monoshock", detail: "Directly linked progressive spring-damper unit" },
        { label: "Front Hydraulic Disc", value: "200mm Ventilated Rotor", detail: "Twin-pot caliper with Combined Braking System" },
        { label: "Rear Hydraulic Disc", value: "190mm Rotor + Regen", detail: "Single-pot caliper paired with Magic Twist regen" },
      ],
    },
    {
      category: "AtherStack™ Software & Cockpit",
      specs: [
        { label: "Dashboard Hardware", value: "7.0-inch Capacitive Touch TFT", detail: "IP65 waterproof, bonded for direct sunlight readability" },
        { label: "Processing Core", value: "Snapdragon Quad-Core", detail: "Dedicated GPU acceleration for 60fps UI transitions" },
        { label: "Navigation Engine", value: "Real-Time Google Maps", detail: "Onboard GPS/GLONASS with live traffic & charger routing" },
        { label: "Connectivity", value: "4G LTE eSIM + Bluetooth 4.2", detail: "Seamless OTA firmware updates & companion app sync" },
        { label: "Safety Systems", value: "AutoHold™ & FallSafe™", detail: "Incline hold without brakes; auto-kill on lean threshold" },
        { label: "Braking Recuperation", value: "Magic Twist™ Electronic Decel", detail: "Reverse twist throttle provides progressive regen" },
      ],
    },
  ],

  credits: {
    project: "ATHERONE",
    subtitle: "An Electric Mobility Story, Told Through Interaction",
    classification: "Independent Creative Concept & Technical Demonstration",
    author: "Portfolio Project by Creative Developer",
    disciplines: [
      "Creative & Editorial Art Direction",
      "Interactive Product Architecture",
      "WebGL Three.js 3D Engineering",
      "Web Audio Sound Design & Synthesis",
      "AtherStack Cockpit Touchscreen Simulation",
      "Kinetic Scrollytelling & Accessible UI",
    ],
    technologies: [
      "React 19 & Vite",
      "Three.js WebGL (PBR Shaders & Canvas)",
      "Framer Motion (Kinetic Physics)",
      "Web Audio API (Procedural Synthesizer)",
      "Tailwind CSS (Precision Design Tokens)",
      "Simplex Noise & Hardware Shaders",
    ],
    repository: "https://github.com/lucky4-git1/atherone.git",
    disclaimer:
      "This website is an independent creative design study exploring electric mobility, UI architecture, and frontend engineering. It is not an official website of Ather Energy Ltd., nor is it affiliated with, endorsed by, or sponsored by Ather Energy. All product names, trademarks, and registered trademarks belong to their respective owners.",
  },
}
