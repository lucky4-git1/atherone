import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { soundEngine } from "@/lib/audio-synthesizer"

export function DemoModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    category: "Spatial Web Experience",
  })

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose()
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        if (isOpen) onClose()
        else {
          soundEngine.playClick()
        }
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  const handleSubmit = (e) => {
    e.preventDefault()
    soundEngine.playChime()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      onClose()
    }, 2200)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg overflow-hidden rounded-[2rem] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.01)),linear-gradient(145deg,rgba(10,15,30,0.96),rgba(4,8,18,0.98))] p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.14),0_30px_100px_rgba(0,0,0,0.7)] sm:p-8"
          >
            <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/50 to-transparent" />

            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.8)]" />
                <span className="text-xs font-mono uppercase tracking-[0.24em] text-white/60">
                  Aether One // Studio Access
                </span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full p-1.5 text-white/50 hover:bg-white/10 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-current stroke-2 fill-none">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-sky-400/40 bg-sky-400/10 text-sky-400">
                  <svg viewBox="0 0 24 24" className="h-7 w-7 stroke-current stroke-2 fill-none">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <h3 className="mt-5 text-2xl font-semibold tracking-tight text-white">
                  Demo request dispatched
                </h3>
                <p className="mt-2 text-sm text-white/60">
                  Our architecture team will contact you within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <h3 className="text-2xl font-semibold tracking-[-0.03em] text-white">
                    Experience the future of launch storytelling
                  </h3>
                  <p className="mt-1.5 text-sm text-white/60">
                    Schedule a private walkthrough of the spatial motion engine.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-white/50 mb-1.5">
                      Your Name
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Alex Vance"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder-white/25 shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)] focus:border-sky-400/60 focus:bg-white/[0.07] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-white/50 mb-1.5">
                      Work Email
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="alex@company.design"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder-white/25 shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)] focus:border-sky-400/60 focus:bg-white/[0.07] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-white/50 mb-1.5">
                      Company / Studio
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Acme Kinetic Labs"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder-white/25 shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)] focus:border-sky-400/60 focus:bg-white/[0.07] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-white/50 mb-1.5">
                      Focus Area
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-[#080d1e] px-4 py-2.5 text-sm text-white focus:border-sky-400/60 focus:outline-none"
                    >
                      <option value="Spatial Web Experience">Spatial Web Experience</option>
                      <option value="Flagship Product Campaign">Flagship Product Campaign</option>
                      <option value="3D Interactive Architecture">3D Interactive Architecture</option>
                      <option value="High-Performance Enterprise Motion">High-Performance Enterprise Motion</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-white/40">ESC to cancel</span>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-full border border-sky-400/50 bg-sky-500/20 px-6 py-2.5 text-sm font-semibold text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_4px_16px_rgba(56,189,248,0.25)] transition-all duration-150 hover:bg-sky-500/30 active:scale-[0.98]"
                  >
                    <span>Request Demonstration</span>
                    <span>→</span>
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
