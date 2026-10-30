# Aether One // Design System Specification

## 1. Visual Philosophy: Sculpted Obsidian & Spatial Clarity
Aether One rejects generic AI aesthetics (saturated multi-stop purple/magenta gradients, blurry cards, cartoonish radiuses). The design language is rooted in **deep obsidian mineral tones, crisp sub-pixel highlights, and purposeful kinetic rhythm**.

## 2. Color Palette & Surface Tokens
- **Base Ground:** Obsidian Deep Space `#02050e` / `#020617`
- **Surface Elevation 1 (Card Backgrounds):** `rgba(6, 10, 24, 0.94)` / `rgba(2, 5, 16, 0.98)`
- **Surface Elevation 2 (Nested Panels):** `rgba(255, 255, 255, 0.03)` with `rgba(0, 0, 0, 0.4)`
- **Sub-Pixel Highlight (Inset Light):** `shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12)]`
- **Crisp Structural Borders:** `border border-white/10` or `border border-white/14`
- **Signature Accent:** Ice Cobalt / Cyan `#38BDF8` (`rgb(56 189 248)`)
- **Telemetry Status Accents:**
  - Online / Nominal: `#34D399` (Emerald 400)
  - Caution / Active: `#F59E0B` (Amber 400)
  - Primary Laser: `#38BDF8` (Sky 400)

## 3. Typography Hierarchy
- **Primary Typeface:** `Geist`, sans-serif (Geometric, high-legibility, tight negative tracking)
- **Monospace Telemetry:** `Geist Mono`, ui-monospace (HUD coordinates, benchmark metrics, code matrices)
- **Display Headings:** `font-semibold tracking-[-0.055em] leading-[0.93]` with `text-wrap: balance`
- **Body Copy:** `text-base leading-7 text-white/65` with `text-wrap: pretty` (max measure 65–75ch)
- **Technical Badges:** `text-[10px]` or `text-[11px] font-mono uppercase tracking-[0.22em] text-white/60`

## 4. Tactile Physics & Motion Grammar (Emil Kowalski Standard)
- **Interactive Push Physics:** `active:scale-[0.98]` on buttons and actionable cards.
- **Timing Functions:** Exponential ease-out `cubic-bezier(0.16, 1, 0.3, 1)` for layout and position transitions; `duration-150` for crisp feedback.
- **Strict Compositor Rule:** Motion animates *only* GPU-composited properties: `transform: translate3d/scale/rotate` and `opacity`. Zero layout-triggering properties (`width`, `height`, `top`, `borderRadius`) during scroll.
- **Reduced Motion:** When `prefers-reduced-motion` is active, animations fall back to immediate or subtle opacity cross-fades.

## 5. Browser Surfaces & Accessibility
- **Themed Selection:** `selection:bg-sky-500/25 selection:text-white`
- **Themed Scrollbar:** 6px rounded thumb in `rgba(255, 255, 255, 0.14)` over `#020617` track
- **Focus Rings:** Explicit, high-contrast `focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:outline-none`
- **Keyboard Navigation:** Full modal and drawer support with `Escape` dismiss and `⌘K` command shortcut
