import { useBag } from "@/context/bag-context"
import { PRODUCT_DATA } from "@/data/product-data"
import { soundEngine } from "@/lib/audio-synthesizer"
import { ThreeHeadphoneViewer } from "@/components/ui/three-headphone-viewer"

export function ProductCustomizer() {
  const {
    selectedFinish,
    setFinishById,
    selectedEdition,
    setEditionById,
    addToBag,
  } = useBag()

  const handleFinishClick = (id) => {
    soundEngine.playClick()
    setFinishById(id)
  }

  const handleEditionClick = (id) => {
    soundEngine.playClick()
    setEditionById(id)
  }

  const handleAdd = () => {
    addToBag(selectedFinish, selectedEdition, 1)
  }

  return (
    <section id="configure" className="relative mx-auto max-w-7xl px-6 py-28 sm:px-8 sm:py-36 lg:px-12">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01)),linear-gradient(145deg,rgba(5,9,22,0.95),rgba(2,4,14,0.98))] p-8 sm:p-12 lg:p-16 shadow-[0_30px_100px_rgba(0,0,0,0.6)]">
        <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/35 to-transparent" />

        {/* Section Header */}
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 text-[11px] font-mono uppercase tracking-[0.22em] text-white/60 mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
            <span>Section 06 // Finish Customizer</span>
          </div>
          <h2 className="text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
            Configure your Aether One.
          </h2>
          <p className="mt-3 text-base text-white/65">
            Select an anodized alloy finish and choose between the standard wireless set and the balanced studio reference bundle.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Live 3D Headphone Customizer Stage */}
          <div className="rounded-2xl border border-white/10 bg-black/60 p-6 flex flex-col justify-between h-[30rem] sm:h-[34rem] relative overflow-hidden">
            <div className="flex items-center justify-between text-xs font-mono text-white/50 border-b border-white/8 pb-3 z-10">
              <span>ALLOY SPECIFICATION: {selectedFinish.name.toUpperCase()}</span>
              <span className="text-sky-400 font-semibold">{selectedFinish.badge}</span>
            </div>

            {/* Live 3D Three.js Model with Selected PBR Finish */}
            <div className="relative flex-1 w-full h-full min-h-0">
              <ThreeHeadphoneViewer
                selectedFinishId={selectedFinish.id}
                isExploded={false}
                isRotating={true}
              />
            </div>

            <div className="z-10 text-xs font-mono text-white/40 text-center border-t border-white/8 pt-3 flex items-center justify-between">
              <span>{selectedFinish.description}</span>
              <span className="text-sky-400 font-medium">${selectedEdition.price} USD</span>
            </div>
          </div>

          {/* Configuration Controls */}
          <div className="space-y-8">
            {/* Step 1: Select Finish */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-3">
                01 // Select Alloy Finish
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {PRODUCT_DATA.finishes.map((finish) => (
                  <button
                    key={finish.id}
                    type="button"
                    onClick={() => handleFinishClick(finish.id)}
                    className={`rounded-2xl border p-4 text-left transition-colors duration-150 ${
                      selectedFinish.id === finish.id
                        ? "border-sky-400 bg-sky-500/15 shadow-[0_0_20px_rgba(56,189,248,0.2)]"
                        : "border-white/8 bg-white/[0.02] hover:border-white/16 hover:bg-white/[0.04]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div
                        style={{ backgroundColor: finish.hex }}
                        className="h-4 w-4 rounded-full border border-white/30"
                      />
                      {selectedFinish.id === finish.id && (
                        <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                      )}
                    </div>
                    <p className="text-xs font-semibold text-white truncate">{finish.name}</p>
                    <p className="text-[10px] text-white/45 font-mono mt-0.5">{finish.badge}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Select Acoustic Edition */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-3">
                02 // Select Acoustic Edition
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PRODUCT_DATA.editions.map((edition) => (
                  <button
                    key={edition.id}
                    type="button"
                    onClick={() => handleEditionClick(edition.id)}
                    className={`rounded-2xl border p-4 text-left transition-colors duration-150 ${
                      selectedEdition.id === edition.id
                        ? "border-sky-400 bg-sky-500/15 shadow-[0_0_20px_rgba(56,189,248,0.2)]"
                        : "border-white/8 bg-white/[0.02] hover:border-white/16 hover:bg-white/[0.04]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-sky-400 font-semibold">
                        {edition.badge}
                      </span>
                      <span className="text-sm font-mono font-bold text-white">
                        ${edition.price}
                      </span>
                    </div>
                    <p className="mt-2 text-sm font-semibold text-white">{edition.name}</p>
                    <p className="mt-1 text-xs text-white/60 leading-relaxed">
                      {edition.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Inclusions summary list */}
            <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-4 text-xs font-mono space-y-1.5">
              <span className="text-white/40 uppercase tracking-wider block mb-2">
                Included with {selectedEdition.name}:
              </span>
              {selectedEdition.inclusions.slice(0, 4).map((inc, i) => (
                <div key={i} className="flex items-center gap-2 text-white/70">
                  <span className="text-emerald-400">✓</span>
                  <span>{inc}</span>
                </div>
              ))}
            </div>

            {/* Add to Bag CTA */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleAdd}
                className="w-full rounded-full border border-sky-400/50 bg-sky-500/25 py-4 text-center text-sm font-semibold text-white shadow-[0_8px_30px_rgba(56,189,248,0.3)] hover:bg-sky-500/35 transition-colors duration-150 active:scale-[0.98] flex items-center justify-center gap-3"
              >
                <span>Add to Shopping Bag — ${selectedEdition.price} USD</span>
                <span>→</span>
              </button>
              <p className="mt-2 text-center text-[10px] font-mono text-white/40">
                {PRODUCT_DATA.conceptualNotice}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
