# Design System — NH HUYNH Developer Portfolio

## 1. Visual Direction & Philosophy

- **Inspiration**: Apple Product Pages × Premium Editorial (Monocle, Linear) × Modern Software Engineering.
- **Atmosphere**: Confident, restrained, minimal, and refined. High signal-to-noise ratio.
- **Rule of Thumb**: Avoid unnecessary decorations, neon glow, excessive 3D, or generic AI gradients. Focus on typography, spacious layout, clear visual rhythm, and micro-interactions.

---

## 2. Color Palette

| Token | Hex | Role | Usage |
| --- | --- | --- | --- |
| `--background` | `#F7F7F5` | Primary Light Background | Main page canvas, warm paper tint |
| `--surface` | `#FFFFFF` | Card & Elevated Surface | Cards, dialogs, form controls |
| `--surface-dark` | `#101114` | Dark Accent Canvas | Hero artwork, terminal containers, dark mode |
| `--ink` | `#17191C` | Primary Typography | Headings, strong text, high-contrast labels |
| `--muted` | `#74777E` | Secondary Typography | Body text, captions, secondary details |
| `--border` | `#E5E5E7` | Subtle Dividers | Card outlines, table borders, dividers |
| `--accent` | `#3268D8` | Apple Accent Blue | Primary interactive elements, links, active states |
| `--accent-soft` | `#EAF0FC` | Soft Accent Tint | Badge backgrounds, hover states |
| `--danger` | `#E53E3E` | Destructive Action | Delete confirmations, critical error notices |
| `--success` | `#2E7D32` | Success Indicator | Sent status, active indicators |

### Project Themes
Each featured project possesses a distinctive accent color for badges, cards, and storytelling accents:
1. **Ticket Concert Agentic RAG**: Electric Violet (`#7C3AED` / `#F5F3FF`)
2. **Fashion Nail Morley**: Champagne Rose (`#D9777F` / `#FFF1F2`)
3. **ExamPlatform AI**: Deep Blue (`#1D4ED8` / `#EFF6FF`)
4. **VK Digital Hub**: Emerald Green (`#059669` / `#ECFDF5`)
5. **NH Huynh Portfolio**: Graphite & Silver (`#4B5563` / `#F3F4F6`)

---

## 3. Typography Hierarchy

- **Font Family**: `-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Geist", "Inter", sans-serif`.
- **Vietnamese Character Support**: Full diacritics support with balanced line-heights.
- **Scale**:
  - `Display / Hero H1`: `clamp(40px, 5.5vw, 72px)` | Line-height `1.1` | Letter-spacing `-0.05em`
  - `Section H2`: `clamp(28px, 3.5vw, 44px)` | Line-height `1.15` | Letter-spacing `-0.04em`
  - `Subheading H3`: `clamp(20px, 2.2vw, 26px)` | Line-height `1.25` | Letter-spacing `-0.03em`
  - `Body`: `16px` (Desktop) / `15px` (Mobile) | Line-height `1.65` | Color `--muted`
  - `Eyebrow / Overline`: `11px` | Line-height `1.2` | Uppercase | Letter-spacing `0.1em` | Font-weight `650`

---

## 4. Spacing, Grid & Container System

- **Container Max Width**: `1200px` with fluid margins: `width: min(1200px, calc(100% - 48px))` (mobile) / `calc(100% - 96px)` (desktop).
- **Desktop Grid**: 12-column layout for complex storytelling, 2-column for case study sections, 3-column for project showcases.
- **Section Padding**: `clamp(64px, 8vw, 112px)` vertical rhythm.
- **Card Radius**: `16px` to `20px` with 1px border (`#E5E5E7`) and ultra-soft shadow (`0 2px 8px rgba(0,0,0,0.03)`).

---

## 5. Animation Guidelines

- **Transitions**: Smooth bezier curves: `cubic-bezier(0.16, 1, 0.3, 1)` (350ms duration).
- **Hover States**: Subtle `translateY(-3px)` and slight border contrast enhancement.
- **Scroll Reveals**: Natural upward slide (`12px`) with gentle opacity fade.
- **Accessibility**: Strict compliance with `@media (prefers-reduced-motion: reduce)` which disables transforms and transitions.
