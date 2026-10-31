import { motion } from "framer-motion"
import { useBag } from "@/context/bag-context"
import { PRODUCT_DATA } from "@/data/product-data"

export function ComparisonMatrix() {
  const { addToBag, selectedFinish } = useBag()

  const comparisonRows = [
    { feature: "45mm Custom Planar-Magnetic Drivers", standard: "Included", studio: "Included" },
    { feature: "CNC Magnesium-Aluminum Unibody", standard: "Included", studio: "Included" },
    { feature: "Frequency Extension (10Hz – 48kHz)", standard: "Included", studio: "Included" },
    { feature: "Braided USB-C & 3.5mm Cables", standard: "Included", studio: "Included" },
    { feature: "Balanced 4.4mm Pentaconn Cable", standard: "Optional ($65)", studio: "Included in Bundle" },
    { feature: "Storage Enclosure", standard: "Microfiber Travel Pouch", studio: "Molded Ballistic Hard Case" },
    { feature: "Secondary Studio Velour Cushions", standard: "Optional ($45)", studio: "Included in Bundle" },
    { feature: "6.35mm (1/4\") Studio Adapter", standard: "Optional ($15)", studio: "Gold-Plated Included" },
    { feature: "Conceptual 2-Year Warranty", standard: "Full Coverage", studio: "Priority Replacement" },
  ]

  const handleAddStandard = () => {
    addToBag(selectedFinish, PRODUCT_DATA.editions[0], 1)
  }

  const handleAddStudio = () => {
    addToBag(selectedFinish, PRODUCT_DATA.editions[1], 1)
  }

  return (
    <section id="comparison" className="relative mx-auto max-w-7xl px-6 py-28 sm:px-8 sm:py-36 lg:px-12">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01)),linear-gradient(145deg,rgba(5,8,20,0.95),rgba(2,4,12,0.98))] p-8 sm:p-12 lg:p-16 shadow-[0_30px_100px_rgba(0,0,0,0.6)]">
        <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/35 to-transparent" />

        {/* Section Header */}
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 text-[11px] font-mono uppercase tracking-[0.22em] text-white/60 mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
            <span>Section 07 // Edition Comparison</span>
          </div>
          <h2 className="text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
            Choose your acoustic tier.
          </h2>
          <p className="mt-3 text-base text-white/65">
            Every Aether One features identical 45mm planar-magnetic transducers and magnesium construction. The Studio Reference bundle includes balanced balanced cabling and molded ballistic storage.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="mt-12 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-white/12">
                <th className="py-4 text-xs font-mono uppercase text-white/40 tracking-wider">
                  Hardware Feature
                </th>
                <th className="py-4 text-left px-4">
                  <div className="text-sm font-bold text-white">Aether One Standard</div>
                  <div className="text-xs font-mono text-sky-400 mt-0.5">$449 USD</div>
                </th>
                <th className="py-4 text-left px-4 bg-sky-500/[0.04] rounded-t-xl border-t border-x border-sky-400/20">
                  <div className="text-sm font-bold text-white flex items-center gap-2">
                    <span>Aether One Studio Reference</span>
                    <span className="rounded-full bg-sky-400/20 px-2 py-0.5 text-[9px] font-mono text-sky-300">
                      FLAGSHIP
                    </span>
                  </div>
                  <div className="text-xs font-mono text-sky-400 mt-0.5">$549 USD</div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/6 font-mono text-xs">
              {comparisonRows.map((row, i) => (
                <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 text-white/70 font-sans text-sm font-medium">
                    {row.feature}
                  </td>
                  <td className="py-3.5 px-4 text-white/60">
                    {row.standard}
                  </td>
                  <td className="py-3.5 px-4 text-white font-medium bg-sky-500/[0.04] border-x border-sky-400/10">
                    <span className="text-emerald-400 mr-1.5">✓</span>
                    {row.studio}
                  </td>
                </tr>
              ))}
              <tr>
                <td className="py-6" />
                <td className="py-6 px-4">
                  <button
                    type="button"
                    onClick={handleAddStandard}
                    className="w-full rounded-full border border-white/15 bg-white/[0.05] py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-white/10 transition-colors"
                  >
                    Select Standard ($449)
                  </button>
                </td>
                <td className="py-6 px-4 bg-sky-500/[0.04] border-b border-x border-sky-400/20 rounded-b-xl">
                  <button
                    type="button"
                    onClick={handleAddStudio}
                    className="w-full rounded-full border border-sky-400/50 bg-sky-500/25 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-[0_4px_16px_rgba(56,189,248,0.25)] hover:bg-sky-500/35 transition-colors duration-150"
                  >
                    Select Studio Reference ($549)
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
