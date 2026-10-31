import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useBag } from "@/context/bag-context"
import { soundEngine } from "@/lib/audio-synthesizer"

export function DemoCheckoutModal() {
  const { isCheckoutOpen, setIsCheckoutOpen, items, subtotal, clearBag } = useBag()

  const [step, setStep] = useState("shipping") // "shipping" | "review" | "confirmed"
  const [formData, setFormData] = useState({
    name: "Alex Mercer",
    email: "alex.mercer@studio.internal",
    address: "742 Evergreen Terrace, Suite 4B",
    city: "San Francisco",
    postalCode: "94107",
    country: "United States",
    paymentMethod: "applepay", // "applepay" | "card" | "wire"
  })
  const [orderRef, setOrderRef] = useState("")

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isCheckoutOpen) {
        setIsCheckoutOpen(false)
        setStep("shipping")
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isCheckoutOpen, setIsCheckoutOpen])

  const handleInputChange = (field, val) => {
    setFormData((prev) => ({ ...prev, [field]: val }))
  }

  const handleProceedToReview = (e) => {
    e.preventDefault()
    soundEngine.playClick()
    setStep("review")
  }

  const handlePlaceOrder = () => {
    soundEngine.playChime()
    const refId = "AO-" + Math.floor(100000 + Math.random() * 900000)
    setOrderRef(refId)
    setStep("confirmed")
    clearBag()
  }

  const handleClose = () => {
    soundEngine.playClick()
    setIsCheckoutOpen(false)
    setStep("shipping")
  }

  return (
    <AnimatePresence>
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl overflow-hidden rounded-[2rem] border border-white/14 bg-[#050814] p-6 sm:p-8 shadow-2xl text-white z-10 my-8"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.8)]" />
                <div>
                  <h3 className="text-base font-semibold tracking-tight text-white">
                    {step === "confirmed" ? "Order Confirmed" : "Studio Checkout Prototype"}
                  </h3>
                  <p className="text-[11px] font-mono text-white/45">
                    {step === "confirmed"
                      ? `DISPATCH REFERENCE: ${orderRef}`
                      : "STAGE 01: SIMULATED HARDWARE DISPATCH"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="rounded-full p-2 text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close checkout"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-current stroke-2 fill-none">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Step 1: Shipping Details Form */}
            {step === "shipping" && (
              <form onSubmit={handleProceedToReview} className="mt-6 space-y-4">
                <div className="rounded-xl border border-sky-400/20 bg-sky-500/10 p-3.5 text-xs text-sky-200">
                  <p className="font-medium">Portfolio Prototype Notice</p>
                  <p className="text-sky-300/70 text-[11px] mt-0.5">
                    This is a conceptual demonstration. No actual commercial transactions or financial processing take place.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-white/60 mb-1.5">
                      Recipient Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="w-full rounded-xl border border-white/12 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white placeholder-white/30 focus:border-sky-400 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-white/60 mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="w-full rounded-xl border border-white/12 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white placeholder-white/30 focus:border-sky-400 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-white/60 mb-1.5">
                    Delivery Address
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    className="w-full rounded-xl border border-white/12 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white placeholder-white/30 focus:border-sky-400 focus:outline-none transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="col-span-1">
                    <label className="block text-xs font-mono uppercase text-white/60 mb-1.5">
                      City
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      className="w-full rounded-xl border border-white/12 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white placeholder-white/30 focus:border-sky-400 focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="col-span-1">
                    <label className="block text-xs font-mono uppercase text-white/60 mb-1.5">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.postalCode}
                      onChange={(e) => handleInputChange("postalCode", e.target.value)}
                      className="w-full rounded-xl border border-white/12 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white placeholder-white/30 focus:border-sky-400 focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-xs font-mono uppercase text-white/60 mb-1.5">
                      Country
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.country}
                      onChange={(e) => handleInputChange("country", e.target.value)}
                      className="w-full rounded-xl border border-white/12 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white placeholder-white/30 focus:border-sky-400 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Simulated Payment Selector */}
                <div className="pt-2">
                  <label className="block text-xs font-mono uppercase text-white/60 mb-2">
                    Simulated Payment Method
                  </label>
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    {[
                      { id: "applepay", label: "Apple Pay" },
                      { id: "card", label: "Credit Card" },
                      { id: "wire", label: "Direct Studio" },
                    ].map((method) => (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => {
                          soundEngine.playClick()
                          handleInputChange("paymentMethod", method.id)
                        }}
                        className={`rounded-xl border p-2.5 text-center text-xs font-medium transition-colors duration-150 ${
                          formData.paymentMethod === method.id
                            ? "border-sky-400 bg-sky-500/20 text-white font-semibold shadow-inner"
                            : "border-white/10 bg-white/[0.03] text-white/60 hover:text-white"
                        }`}
                      >
                        {method.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Subtotal preview */}
                <div className="flex items-center justify-between border-t border-white/10 pt-4 text-sm">
                  <span className="text-white/60">Estimated Total:</span>
                  <span className="font-mono text-base font-semibold text-sky-400">
                    ${subtotal} USD
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-full border border-sky-400/50 bg-sky-500/20 py-3.5 text-center text-sm font-semibold text-white shadow-[0_4px_20px_rgba(56,189,248,0.25)] hover:bg-sky-500/30 transition-colors duration-150 active:scale-[0.98]"
                >
                  Review Order &amp; Dispatch →
                </button>
              </form>
            )}

            {/* Step 2: Review Order */}
            {step === "review" && (
              <div className="mt-6 space-y-5">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 space-y-3">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-white/50 border-b border-white/8 pb-2">
                    Dispatch Destination
                  </h4>
                  <div className="text-sm space-y-1">
                    <p className="font-semibold text-white">{formData.name}</p>
                    <p className="text-white/70">{formData.address}</p>
                    <p className="text-white/70">
                      {formData.city}, {formData.postalCode} • {formData.country}
                    </p>
                    <p className="text-white/50 text-xs font-mono mt-1">{formData.email}</p>
                  </div>
                </div>

                {/* Items in order */}
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 space-y-3">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-white/50 border-b border-white/8 pb-2">
                    Hardware Inclusions ({items.length} items)
                  </h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                    {items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between text-xs py-1 border-b border-white/4 last:border-0"
                      >
                        <div>
                          <span className="font-medium text-white">{item.editionName}</span>
                          <span className="text-white/45 ml-2 font-mono">({item.finishName})</span>
                        </div>
                        <div className="font-mono text-white/80">
                          {item.quantity} × ${item.price} = ${item.quantity * item.price}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-white/10 bg-black/40 p-4 space-y-2 text-xs">
                  <div className="flex justify-between text-white/60">
                    <span>Subtotal</span>
                    <span className="font-mono text-white font-medium">${subtotal}</span>
                  </div>
                  <div className="flex justify-between text-white/60">
                    <span>Expedited Studio Courier</span>
                    <span className="font-mono text-emerald-400">Complimentary ($0)</span>
                  </div>
                  <div className="flex justify-between text-sm font-semibold text-white pt-2 border-t border-white/8">
                    <span>Total Authorization</span>
                    <span className="font-mono text-sky-400 text-base">${subtotal} USD</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      soundEngine.playClick()
                      setStep("shipping")
                    }}
                    className="flex-1 rounded-full border border-white/15 bg-white/[0.05] py-3 text-center text-xs font-mono uppercase tracking-wider text-white hover:bg-white/10 transition-colors"
                  >
                    ← Back to Details
                  </button>
                  <button
                    type="button"
                    onClick={handlePlaceOrder}
                    className="flex-[2] rounded-full border border-sky-400/50 bg-sky-500/25 py-3 text-center text-sm font-semibold text-white shadow-[0_4px_20px_rgba(56,189,248,0.3)] hover:bg-sky-500/35 transition-colors duration-150 active:scale-[0.98]"
                  >
                    Authorize Prototype Order
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Order Confirmed */}
            {step === "confirmed" && (
              <div className="mt-6 py-6 text-center space-y-5">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-500/10 text-emerald-400 shadow-[0_0_24px_rgba(52,211,153,0.3)]">
                  <svg viewBox="0 0 24 24" className="h-8 w-8 fill-none stroke-current stroke-2">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>

                <div>
                  <h4 className="text-xl font-bold tracking-tight text-white">
                    Simulated Dispatch Order Logged
                  </h4>
                  <p className="mt-1 font-mono text-xs text-sky-400">
                    REFERENCE ID: {orderRef}
                  </p>
                  <p className="mt-3 text-xs text-white/60 max-w-md mx-auto leading-relaxed">
                    Thank you for testing the Aether One purchasing flow prototype. In an actual production environment, a signed dispatch confirmation with calibration charts would be generated for {formData.email}.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 max-w-sm mx-auto text-left font-mono text-xs text-white/70 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-white/40">Status:</span>
                    <span className="text-emerald-400">Simulated / Verified</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/40">Total Amount:</span>
                    <span className="text-white">${subtotal} USD</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/40">Carrier:</span>
                    <span>Direct Air Courier</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleClose}
                  className="rounded-full border border-white/20 bg-white/10 px-8 py-3 text-xs font-mono uppercase tracking-wider text-white hover:bg-white/20 transition-colors"
                >
                  Return to Product Showcase
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
