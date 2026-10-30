// Lightweight zero-asset Web Audio API synthesizer for tactile UI sound design
let audioCtx = null

function getAudioContext() {
  if (typeof window === "undefined") return null
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext
    if (AudioContextClass) {
      audioCtx = new AudioContextClass()
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume()
  }
  return audioCtx
}

export const soundEngine = {
  muted: true,

  toggleMute() {
    this.muted = !this.muted
    if (!this.muted) {
      this.playChime()
    }
    return this.muted
  },

  playClick() {
    if (this.muted) return
    const ctx = getAudioContext()
    if (!ctx) return

    try {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = "sine"
      osc.frequency.setValueAtTime(1100, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.04)

      gain.gain.setValueAtTime(0.04, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start()
      osc.stop(ctx.currentTime + 0.04)
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
      osc.frequency.setValueAtTime(420, ctx.currentTime)
      osc.frequency.linearRampToValueAtTime(620, ctx.currentTime + 0.025)

      gain.gain.setValueAtTime(0.012, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.025)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start()
      osc.stop(ctx.currentTime + 0.025)
    } catch {
      // AudioContext policy handled
    }
  },

  playModeSwitch() {
    if (this.muted) return
    const ctx = getAudioContext()
    if (!ctx) return

    try {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = "sine"
      osc.frequency.setValueAtTime(350, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.06)

      gain.gain.setValueAtTime(0.03, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.06)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start()
      osc.stop(ctx.currentTime + 0.06)
    } catch {
      // AudioContext policy handled
    }
  },

  playTone(frequency = 440, duration = 0.1) {
    if (this.muted) return
    const ctx = getAudioContext()
    if (!ctx) return

    try {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = "sine"
      osc.frequency.setValueAtTime(frequency, ctx.currentTime)

      gain.gain.setValueAtTime(0.035, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start()
      osc.stop(ctx.currentTime + duration)
    } catch {
      // AudioContext policy handled
    }
  },

  playChime() {
    const ctx = getAudioContext()
    if (!ctx) return

    try {
      const freqs = [523.25, 659.25, 783.99, 1046.5] // C E G C chord
      freqs.forEach((f, i) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = "sine"
        osc.frequency.setValueAtTime(f, ctx.currentTime + i * 0.06)

        gain.gain.setValueAtTime(0.025, ctx.currentTime + i * 0.06)
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + i * 0.06 + 0.35)

        osc.connect(gain)
        gain.connect(ctx.destination)

        osc.start(ctx.currentTime + i * 0.06)
        osc.stop(ctx.currentTime + i * 0.06 + 0.4)
      })
    } catch {
      // AudioContext policy handled
    }
  },
}
