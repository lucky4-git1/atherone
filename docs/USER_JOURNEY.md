# Aether One // User Journey & Interaction Architecture

---

## 1. Core Narrative Flow

```
┌────────────────────────────────────────────────────────┐
│ 01. DISCOVER // The Hero                               │
│ Question: "What is Aether One?"                       │
│ Outcome: Instant recognition of flagship headphones;   │
│          Hero visual + primary CTA ("Configure Now")   │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│ 02. UNDERSTAND // Acoustic Philosophy                  │
│ Question: "Why does it exist?"                         │
│ Outcome: Acoustic engineering manifesto; planar drivers│
│          and unibody magnesium construction.           │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│ 03. EXPLORE // Interactive 3D Product Inspector        │
│ Question: "What does it look and feel like?"           │
│ Outcome: 360° turntable inspection; component callouts;│
│          finish preview toggle (Obsidian/Silver/Sand). │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│ 04. ENGINEERING // Exploded Transducer Anatomy         │
│ Question: "How is it engineered inside?"               │
│ Outcome: Detailed view of planar diaphragm, magnets,   │
│          cushion geometry, and CNC rotary controls.    │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│ 05. AUDITION // Interactive Sound Profile Laboratory   │
│ Question: "How does it sound?"                         │
│ Outcome: Interactive Web Audio tone player;            │
│          switch profiles (Studio Flat, Soundstage).    │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│ 06. CONFIGURE // Finish & Model Personalization        │
│ Question: "Which edition is right for me?"             │
│ Outcome: Select finish (Obsidian / Silver / Sand),     │
│          Standard ($449) vs Studio Bundle ($549).      │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│ 07. PURCHASE DEMO // Slide-Over Bag & Checkout         │
│ Action: "Add to Bag" -> Review Cart -> Mock Checkout   │
│ Outcome: Reactive shopping bag drawer with quantity    │
│          modifiers, subtotal, and demo confirmation.   │
└────────────────────────────────────────────────────────┘
```

---

## 2. Detailed Interaction States

### Stage 1: Exploration
- **Hotspot Clicks:** Clicking component markers (Planar Driver, Milled Crown, Cushions) reveals technical micro-specifications.
- **Finish Sync:** Toggling finishes updates the 3D model, hero renders, finish name, and configuration state instantly across the entire page.

### Stage 2: Sound Audition
- **Tone Audition:** Visitors can click frequency bands or switch between three conceptual listening curves (Studio Flat, Open Soundstage, Intimate Acoustic) to hear real-time procedural audio synthesis.

### Stage 3: Shopping Bag Experience
- **Drawer Opening:** Triggered from header cart pill or "Add to Bag" buttons.
- **Quantity Controls:** `+` / `-` buttons update subtotal live with optimistic UI updates.
- **Demo Checkout:** Slide-over modal collecting fictional shipping details with instantaneous simulated order dispatch and tracking number generation.
