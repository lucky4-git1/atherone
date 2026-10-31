// Precision Web Audio API Acoustic Engine & Real-Time DSP Signal Path
let audioCtx = null
let masterGain = null
let analyserNode = null
let activeSourceNodes = []
let activeDspFilter = null
let activeDspPanner = null

function getAudioContext() {
  if (typeof window === "undefined") return null
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext
    if (AudioContextClass) {
      audioCtx = new AudioContextClass()
      masterGain = audioCtx.createGain()
      masterGain.gain.setValueAtTime(0.08, audioCtx.currentTime)

      analyserNode = audioCtx.createAnalyser()
      analyserNode.fftSize = 512
      analyserNode.smoothingTimeConstant = 0.85

      masterGain.connect(analyserNode)
      analyserNode.connect(audioCtx.destination)
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume()
  }
  return audioCtx
}

export const soundEngine = {
  muted: false,

  toggleMute() {
    this.muted = !this.muted
    if (!this.muted) {
      this.playChime()
    } else {
      this.stopAudition()
    }
    return this.muted
  },

  getAnalyser() {
    getAudioContext()
    return analyserNode
  },

  playClick() {
    if (this.muted) return
    const ctx = getAudioContext()
    if (!ctx) return

    try {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = "sine"
      osc.frequency.setValueAtTime(1200, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(360, ctx.currentTime + 0.035)

      gain.gain.setValueAtTime(0.05, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.035)

      osc.connect(gain)
      gain.connect(masterGain)

      osc.start()
      osc.stop(ctx.currentTime + 0.035)
    } catch {
      // AudioContext policy handled
    }
  },

  playHover() {
    if (this.muted) return
    const ctx = getAudioContext()
    if (!ctx) return

    try {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = "triangle"
      osc.frequency.setValueAtTime(460, ctx.currentTime)
      osc.frequency.linearRampToValueAtTime(680, ctx.currentTime + 0.02)

      gain.gain.setValueAtTime(0.015, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.02)

      osc.connect(gain)
      gain.connect(masterGain)

      osc.start()
      osc.stop(ctx.currentTime + 0.02)
    } catch {
      // AudioContext policy handled
    }
  },

  playChime() {
    const ctx = getAudioContext()
    if (!ctx) return

    try {
      const freqs = [440, 554.37, 659.25, 880] // A major chord
      freqs.forEach((f, i) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = "sine"
        osc.frequency.setValueAtTime(f, ctx.currentTime + i * 0.05)

        gain.gain.setValueAtTime(0.035, ctx.currentTime + i * 0.05)
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + i * 0.05 + 0.35)

        osc.connect(gain)
        gain.connect(masterGain)

        osc.start(ctx.currentTime + i * 0.05)
        osc.stop(ctx.currentTime + i * 0.05 + 0.38)
      })
    } catch {
      // AudioContext policy handled
    }
  },

  // Real-Time DSP Profile Audition (Multi-Oscillator Harmonics + Filter + Spatial Panner)
  playProfileAudition(profileId = "studio-flat", duration = 2.4) {
    if (this.muted) return
    const ctx = getAudioContext()
    if (!ctx) return

    this.stopAudition()

    try {
      // DSP Filter Node
      const filter = ctx.createBiquadFilter()
      activeDspFilter = filter

      // Stereo Panner Node
      let panner = null
      if (ctx.createStereoPanner) {
        panner = ctx.createStereoPanner()
        activeDspPanner = panner
      }

      // Base chord frequencies
      let chord = [220, 277.18, 329.63, 440, 554.37] // A major 9th rich harmonic

      if (profileId === "studio-flat") {
        // Completely neutral studio mastering curve
        filter.type = "allpass"
        filter.frequency.setValueAtTime(1000, ctx.currentTime)
        if (panner) panner.pan.setValueAtTime(0, ctx.currentTime)
      } else if (profileId === "open-soundstage") {
        // High air boost + widened binaural spatial spread + gentle sub-bass
        filter.type = "highshelf"
        filter.frequency.setValueAtTime(7500, ctx.currentTime)
        filter.gain.setValueAtTime(4.5, ctx.currentTime)
        if (panner) {
          panner.pan.setValueAtTime(-0.35, ctx.currentTime)
          panner.pan.linearRampToValueAtTime(0.35, ctx.currentTime + duration * 0.5)
          panner.pan.linearRampToValueAtTime(0.0, ctx.currentTime + duration)
        }
      } else if (profileId === "intimate-acoustic") {
        // Mid-forward presence peak (1.8 kHz) for textured vocals & acoustic instruments
        filter.type = "peaking"
        filter.frequency.setValueAtTime(1800, ctx.currentTime)
        filter.Q.setValueAtTime(1.4, ctx.currentTime)
        filter.gain.setValueAtTime(5.0, ctx.currentTime)
        if (panner) panner.pan.setValueAtTime(0, ctx.currentTime)
      }

      // Connect DSP chain: Sources -> Filter -> Panner -> MasterGain -> Analyser -> Output
      const dspInput = filter
      if (panner) {
        filter.connect(panner)
        panner.connect(masterGain)
      } else {
        filter.connect(masterGain)
      }

      const sources = []
      chord.forEach((freq, idx) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()

        osc.type = idx % 2 === 0 ? "sine" : "triangle"
        osc.frequency.setValueAtTime(freq, ctx.currentTime)

        // Subtle warm vibrato LFO on upper harmonics
        if (idx >= 2) {
          const lfo = ctx.createOscillator()
          const lfoGain = ctx.createGain()
          lfo.frequency.setValueAtTime(4.5, ctx.currentTime)
          lfoGain.gain.setValueAtTime(3.0, ctx.currentTime)
          lfo.connect(lfoGain)
          lfoGain.connect(osc.frequency)
          lfo.start()
          sources.push(lfo)
        }

        const noteGain = 0.035 / (idx + 1)
        gain.gain.setValueAtTime(0.0001, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(noteGain, ctx.currentTime + 0.12)
        gain.gain.exponentialRampToValueAtTime(noteGain * 0.65, ctx.currentTime + duration * 0.6)
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration)

        osc.connect(gain)
        gain.connect(dspInput)

        osc.start(ctx.currentTime)
        osc.stop(ctx.currentTime + duration + 0.05)

        sources.push(osc)
      })

      activeSourceNodes = sources
    } catch {
      // AudioContext policy handled
    }
  },

  // Play continuous pure frequency tone (sweep testing)
  playContinuousTone(frequency = 440) {
    if (this.muted) return
    const ctx = getAudioContext()
    if (!ctx) return

    this.stopAudition()

    try {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = "sine"
      osc.frequency.setValueAtTime(frequency, ctx.currentTime)

      gain.gain.setValueAtTime(0.0001, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 0.05)

      osc.connect(gain)
      gain.connect(masterGain)

      osc.start()
      activeSourceNodes = [osc, gain]
    } catch {
      // AudioContext policy handled
    }
  },

  updateToneFrequency(frequency) {
    const ctx = getAudioContext()
    if (!ctx || activeSourceNodes.length === 0) return
    const osc = activeSourceNodes[0]
    if (osc && osc.frequency) {
      osc.frequency.setValueAtTime(frequency, ctx.currentTime)
    }
  },

  stopAudition() {
    if (activeDspFilter) {
      try {
        activeDspFilter.disconnect()
      } catch {
        // already disconnected
      }
      activeDspFilter = null
    }
    if (activeDspPanner) {
      try {
        activeDspPanner.disconnect()
      } catch {
        // already disconnected
      }
      activeDspPanner = null
    }
    activeSourceNodes.forEach((node) => {
      try {
        if (node.stop) node.stop()
        if (node.disconnect) node.disconnect()
      } catch {
        // already stopped
      }
    })
    activeSourceNodes = []
  },
}
