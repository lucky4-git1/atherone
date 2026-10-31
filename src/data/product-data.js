// Aether One // Single Source of Truth for Product Architecture & Specifications
export const PRODUCT_DATA = {
  id: "aether-one",
  name: "Aether One",
  category: "Circumaural Wireless Headphones",
  tagline: "Sound, engineered as an experience.",
  subheadline:
    "Circumaural acoustic headphones with custom 45mm planar-magnetic transducers, CNC magnesium-aluminum unibody chassis, and uncolored studio transparency.",
  conceptualNotice:
    "Conceptual hardware demonstration prototype for portfolio review. All specifications, models, and purchasing flows are simulated design studies.",
  
  finishes: [
    {
      id: "obsidian",
      name: "Obsidian Black",
      hex: "#101319",
      borderHex: "#272e3d",
      textClass: "text-neutral-100",
      description: "Shot-peened anodized aluminum with deep charcoal memory foam trim.",
      badge: "Flagship Edition",
    },
    {
      id: "silver",
      name: "Matte Silver",
      hex: "#d1d7e0",
      borderHex: "#9ca9ba",
      textClass: "text-slate-900",
      description: "Brushed natural magnesium-aluminum with soft fog grey acoustic knit.",
      badge: "Classic Studio",
    },
    {
      id: "sand",
      name: "Warm Sand",
      hex: "#c6b8a3",
      borderHex: "#8f7c65",
      textClass: "text-amber-950",
      description: "Satin ceramic-coated chassis with oatmeal woven headband knit.",
      badge: "Special Edition",
    },
  ],

  editions: [
    {
      id: "standard",
      name: "Aether One Standard",
      price: 449,
      badge: "Standard Edition",
      description: "The complete wireless circumaural acoustic set.",
      inclusions: [
        "Aether One Circumaural Headphones",
        "Braided magnetic USB-C audio & charging cable (1.5m)",
        "3.5mm gold-plated analog auxiliary cable",
        "Magnetic microfiber soft travel pouch",
        "Conceptual 2-Year Studio Warranty",
      ],
    },
    {
      id: "studio",
      name: "Aether One Studio Reference",
      price: 549,
      badge: "Reference Bundle",
      description: "Enhanced with balanced Pentaconn cabling and hard ballistic case.",
      inclusions: [
        "Aether One Circumaural Headphones",
        "Balanced 4.4mm Pentaconn silver-plated copper cable",
        "Molded ballistic nylon hard-shell travel case",
        "Additional pair of ventilated velour studio cushions",
        "6.35mm (1/4\") studio headphone adapter",
        "Braided USB-C and 3.5mm analog cables",
        "Conceptual 2-Year Studio Warranty",
      ],
    },
  ],

  specs: [
    { label: "Transducer Architecture", value: "45mm Custom Planar-Magnetic", detail: "2-micron polyimide diaphragm with N52 neodymium motor" },
    { label: "Frequency Extension", value: "10 Hz – 48,000 Hz", detail: "Linear sub-bass through ultra-high harmonic air" },
    { label: "Harmonic Distortion", value: "< 0.05% THD", detail: "Measured at 1 kHz, 100 dB SPL across entire active band" },
    { label: "Acoustic Chamber", value: "Dual-Chamber Semi-Open", detail: "Controlled back-wave damping with spatial porting" },
    { label: "Battery Endurance", value: "45 Hours Continuous", detail: "Fast USB-C charge: 15 minutes yields 6 hours playback" },
    { label: "Wired Operation", value: "Passive Zero-Latency Bypass", detail: "Operates passively over 3.5mm without battery power" },
    { label: "Digital Audio Decoding", value: "24-bit / 192 kHz Lossless", detail: "Direct USB-C digital-to-analog converter interface" },
    { label: "Chassis Construction", value: "CNC Magnesium-Aluminum", detail: "Shot-peened unibody gimbal with silent friction hinges" },
    { label: "Physical Mass", value: "385 grams", detail: "Distributed cantilever weight distribution across crown" },
  ],

  soundProfiles: [
    {
      id: "studio-flat",
      name: "Studio Reference (Flat)",
      curve: "Neutral 0dB",
      description: "Uncolored, clinical frequency reproduction calibrated for mastering and critical studio monitoring.",
      freq: 440,
      bass: 0,
      mid: 0,
      treble: 0,
    },
    {
      id: "open-soundstage",
      name: "Open Spatial Soundstage",
      curve: "Binaural +2.5dB",
      description: "Expanded binaural width with gentle sub-bass extension, designed for orchestral and cinematic scores.",
      freq: 660,
      bass: 2.5,
      mid: -0.5,
      treble: 3.0,
    },
    {
      id: "intimate-acoustic",
      name: "Intimate Vocal & Acoustic",
      curve: "Mid-Forward +3dB",
      description: "Warm, textured mid-range emphasis bringing vocal nuance, acoustic strings, and jazz brass forward.",
      freq: 523,
      bass: 1.5,
      mid: 3.2,
      treble: -1.0,
    },
  ],

  anatomyCallouts: [
    {
      id: "driver",
      title: "45mm Planar-Magnetic Diaphragm",
      tag: "Acoustic Core",
      description: "A 2-micron ultra-thin polyimide substrate etched with conductive aluminum traces suspended between push-pull neodymium magnet arrays.",
    },
    {
      id: "crown",
      title: "Continuous Rotary Crown",
      tag: "Hardware Control",
      description: "Micro-knurled aluminum dial providing stepless volume adjustment and tactile haptic clicks, accompanied by a physical mute slider.",
    },
    {
      id: "gimbal",
      title: "Silent Friction Gimbal",
      tag: "Mechanical Unibody",
      description: "CNC-machined from aircraft-grade magnesium-aluminum alloy with PTFE internal washers to eliminate mechanical creak during movement.",
    },
    {
      id: "cushions",
      title: "Magnetic Snap Cushions",
      tag: "Ergonomics",
      description: "Slow-recovery memory foam wrapped in breathable protein leather with acoustic mesh grilles, magnetically swappable in seconds.",
    },
  ],

  faqs: [
    {
      q: "Can Aether One be used as a passive wired headphone?",
      a: "Yes. The 3.5mm analog input bypasses all internal digital circuitry and DSP, routing the audio signal directly to the 45mm planar-magnetic transducers even if the battery is fully depleted.",
    },
    {
      q: "How does the planar-magnetic transducer differ from conventional dynamic drivers?",
      a: "Unlike cone-shaped dynamic drivers driven from a single voice coil point, planar-magnetic diaphragms are driven uniformly across their entire surface by parallel magnetic fields. This eliminates cone breakup and lowers total harmonic distortion to under 0.05%.",
    },
    {
      q: "What codecs are supported over wireless transmission?",
      a: "Aether One supports Bluetooth 5.4 with LE Audio, LC3, LC3 Plus, AAC, and aptX Adaptive, delivering low-jitter wireless transmission with sub-20ms latency in low-latency mode.",
    },
    {
      q: "Is this an actual commercial product available for purchase?",
      a: "No. Aether One is a conceptual portfolio design and frontend engineering demonstration. The shopping bag, checkout flow, and product customizer are functional prototypes built to illustrate high-end e-commerce interface craftsmanship.",
    },
    {
      q: "What warranty coverage is conceptualized?",
      a: "The conceptual warranty provides 2-year full hardware coverage, including transducer recalibration, battery service, and magnetic cushion replacement.",
    },
  ],
}
