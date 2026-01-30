# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** Clawbot
**Generated:** 2026-01-30 00:00:00
**Category:** Personal AI Assistant Ecosystem

---

## Global Rules

### Color Palette

| Role | Hex | CSS Variable |
|------|-----|--------------|
| Primary | `#0B0F16` | `--color-primary` |
| Secondary | `#3B4151` | `--color-secondary` |
| CTA/Accent | `#0EA5E9` | `--color-cta` |
| Background | `#E6ECF6` | `--color-background` |
| Text | `#0B0F16` | `--color-text` |

**Color Notes:** Monochrome + blue accent

### Typography

- **Heading Font:** Space Grotesk
- **Body Font:** DM Sans
- **Mood:** modern, crisp, technical, futuristic, precise
- **Google Fonts:** [Space Grotesk + DM Sans](https://fonts.google.com/share?selection.family=DM+Sans:wght@400;500;700|Space+Grotesk:wght@400;500;600;700)

**CSS Import:**
```css
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');
```

### Spacing Variables

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | `4px` / `0.25rem` | Tight gaps |
| `--space-sm` | `8px` / `0.5rem` | Icon gaps, inline spacing |
| `--space-md` | `16px` / `1rem` | Standard padding |
| `--space-lg` | `24px` / `1.5rem` | Section padding |
| `--space-xl` | `32px` / `2rem` | Large gaps |
| `--space-2xl` | `48px` / `3rem` | Section margins |
| `--space-3xl` | `64px` / `4rem` | Hero padding |

### Shadow Depths

| Level | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle lift |
| `--shadow-md` | `0 4px 6px rgba(0,0,0,0.1)` | Cards, buttons |
| `--shadow-lg` | `0 10px 15px rgba(0,0,0,0.1)` | Modals, dropdowns |
| `--shadow-xl` | `0 20px 25px rgba(0,0,0,0.15)` | Hero images, featured cards |

---

## Component Specs

### Buttons

```css
/* Primary Button */
.btn-primary {
  background: #0EA5E9;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: box-shadow 200ms ease, filter 200ms ease;
  cursor: pointer;
}

.btn-primary:hover {
  filter: brightness(0.98);
  box-shadow: 0 10px 24px rgba(14, 165, 233, 0.2);
}

/* Secondary Button */
.btn-secondary {
  background: transparent;
  color: #0B0F16;
  border: 2px solid #0B0F16;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: background 200ms ease, border-color 200ms ease;
  cursor: pointer;
}
```

### Cards

```css
.card {
  background: #FFFFFF;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 10px 30px rgba(11, 15, 22, 0.06);
  border: 1px solid #E5E7EB;
  transition: box-shadow 200ms ease, border-color 200ms ease;
  cursor: pointer;
}

.card:hover {
  box-shadow: 0 16px 36px rgba(11, 15, 22, 0.08);
  border-color: #CBD5F5;
}
```

### Inputs

```css
.input {
  padding: 12px 16px;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 200ms ease;
}

.input:focus {
  border-color: #18181B;
  outline: none;
  box-shadow: 0 0 0 3px #18181B20;
}
```

### Modals

```css
.modal-overlay {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

.modal {
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: var(--shadow-xl);
  max-width: 500px;
  width: 90%;
}
```

---

## Style Guidelines

**Style:** Futuristic Minimalism

**Keywords:** crisp geometry, high contrast, subtle glow, negative space, precise typography, gridlines

**Best For:** AI products, developer tools, personal assistant platforms, modern SaaS

**Key Effects:** font-size: clamp(2.8rem 8vw 6rem), letter-spacing: -0.03em, soft glow accents, fine grid background

### Page Pattern

**Pattern Name:** Minimal Single Column

- **Conversion Strategy:** Single CTA focus. Large typography. Lots of whitespace. No nav clutter. Mobile-first.
- **CTA Placement:** Center, large CTA button
- **Section Order:** 1. Hero headline, 2. Short description, 3. Benefit bullets (3 max), 4. CTA, 5. Footer

---

## Anti-Patterns (Do NOT Use)

- ❌ Poor map UX
- ❌ Hidden costs

### Additional Forbidden Patterns

- ❌ **Emojis as icons** — Use SVG icons (Heroicons, Lucide, Simple Icons)
- ❌ **Missing cursor:pointer** — All clickable elements must have cursor:pointer
- ❌ **Layout-shifting hovers** — Avoid scale transforms that shift layout
- ❌ **Low contrast text** — Maintain 4.5:1 minimum contrast ratio
- ❌ **Instant state changes** — Always use transitions (150-300ms)
- ❌ **Invisible focus states** — Focus states must be visible for a11y

---

## Pre-Delivery Checklist

Before delivering any UI code, verify:

- [ ] No emojis used as icons (use SVG instead)
- [ ] All icons from consistent icon set (Heroicons/Lucide)
- [ ] `cursor-pointer` on all clickable elements
- [ ] Hover states with smooth transitions (150-300ms)
- [ ] Light mode: text contrast 4.5:1 minimum
- [ ] Focus states visible for keyboard navigation
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive: 375px, 768px, 1024px, 1440px
- [ ] No content hidden behind fixed navbars
- [ ] No horizontal scroll on mobile
