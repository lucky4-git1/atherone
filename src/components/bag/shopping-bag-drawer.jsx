import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useBag } from "@/context/bag-context"
import { soundEngine } from "@/lib/audio-synthesizer"

export function ShoppingBagDrawer() {
  const {
    isBagOpen,
    setIsBagOpen,
    items,
    updateQuantity,
    removeItem,
    subtotal,
    totalItemCount,
    setIsCheckoutOpen,
  } = useBag()

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isBagOpen) {
        setIsBagOpen(false)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isBagOpen, setIsBagOpen])

  const handleCheckoutClick = () => {
    soundEngine.playClick()
    setIsBagOpen(false)
    setIsCheckoutOpen(true)
  }

  return (
    <AnimatePresence>
      {isBagOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsBagOpen(false)}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-screen max-w-md bg-[#050814] border-l border-white/12 shadow-2xl flex flex-col justify-between"
            >
              {/* Header */}
              <div className="px-6 py-6 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-sky-400" />
                  <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">
                    Shopping Bag ({totalItemCount})
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setIsBagOpen(false)}
                  className="rounded-full p-2 text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Close bag"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-current stroke-2 fill-none">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
                {items.length === 0 ? (
                  <div className="py-20 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-white/10 text-white/40">
                      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2">
                        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" />
                      </svg>
                    </div>
                    <p className="mt-4 text-sm text-white/70 font-medium">Your bag is empty</p>
                    <p className="mt-1 text-xs text-white/45 max-w-xs mx-auto">
                      Explore the finishes below and configure your conceptual acoustic pair.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setIsBagOpen(false)
                        const el = document.getElementById("configure")
                        el?.scrollIntoView({ behavior: "smooth" })
                      }}
                      className="mt-6 rounded-full border border-white/15 bg-white/5 px-5 py-2 text-xs font-mono uppercase tracking-wider text-white hover:bg-white/10 transition-colors"
                    >
                      Configure Aether One
                    </button>
                  </div>
                ) : (
                  items.map((item, index) => (
                    <div
                      key={`${item.finishId}-${item.editionId}-${index}`}
                      className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 flex gap-4 items-center"
                    >
                      {/* Swatch circle */}
                      <div
                        style={{ backgroundColor: item.finishHex }}
                        className="h-12 w-12 rounded-xl border border-white/20 shrink-0 shadow-inner flex items-center justify-center font-mono text-[9px] uppercase font-bold text-white/70"
                      >
                        A1
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="text-sm font-semibold text-white truncate">
                              {item.editionName}
                            </h3>
                            <p className="text-xs text-white/50">{item.finishName}</p>
                          </div>
                          <p className="text-sm font-mono font-medium text-white">
                            ${item.price * item.quantity}
                          </p>
                        </div>

                        {/* Controls */}
                        <div className="mt-3 flex items-center justify-between pt-2 border-t border-white/6">
                          <div className="flex items-center gap-2 border border-white/10 rounded-lg px-2 py-0.5 bg-black/40">
                            <button
                              type="button"
                              onClick={() => updateQuantity(index, -1)}
                              className="text-white/60 hover:text-white px-1 font-mono text-xs"
                              aria-label="Decrease quantity"
                            >
                              −
                            </button>
                            <span className="font-mono text-xs text-white min-w-[1rem] text-center">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(index, 1)}
                              className="text-white/60 hover:text-white px-1 font-mono text-xs"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeItem(index)}
                            className="text-xs text-red-400/70 hover:text-red-300 transition-colors font-mono"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer Summary */}
              {items.length > 0 && (
                <div className="p-6 border-t border-white/10 bg-black/40 space-y-4">
                  <div className="space-y-1.5 text-xs text-white/60">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-mono font-medium text-white">${subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Dispatch &amp; Handling</span>
                      <span className="font-mono text-emerald-400">Complimentary (Demo)</span>
                    </div>
                    <div className="flex justify-between text-sm font-semibold text-white pt-2 border-t border-white/8">
                      <span>Total (Conceptual)</span>
                      <span className="font-mono text-sky-400 text-base">${subtotal}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCheckoutClick}
                    className="w-full rounded-full border border-sky-400/50 bg-sky-500/20 py-3.5 text-center text-sm font-semibold text-white shadow-[0_4px_20px_rgba(56,189,248,0.25)] hover:bg-sky-500/30 transition-colors duration-150 active:scale-[0.98]"
                  >
                    Proceed to Demo Checkout →
                  </button>
                  <p className="text-[10px] text-center font-mono text-white/40">
                    Prototype demonstration. No actual commercial transactions occur.
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}
