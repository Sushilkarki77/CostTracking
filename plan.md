# UI Modernization Plan — CostTracking

Goal: Move the Angular frontend from a generic "admin template" look to a modern, cohesive,
polished UI without changing app behavior or data flow.

---

## Current State (why it looks traditional)

- **Default system font** — `dashboard.scss` uses `font-family: sans-serif` (browser default).
- **Stock Tailwind blue** palette on gray/white (`styles/variables.scss`) — looks like an unstyled starter.
- **Heavy bordered tables** — `expenses/list.html` uses `border` + `bg-gray-100` headers (dated data grid).
- **Inconsistent styling** — mix of design tokens (`.btn-primary`, `.card`) and hardcoded utilities
  (e.g. `bg-blue-500 ...` Add button in `list.html`).
- **Flat depth** — only 3 basic box-shadows; hard `rgba(0,0,0,0.15)` shadow.
- **Plain states** — `Loading...` text, `No Items` text, fixed 300px login card, gray sidebar.

---

## Design Direction

- Reference feel: clean/minimal (Linear / Stripe / Vercel style). _(Confirm brand color & reference.)_
- Keep existing SCSS-token + CSS-variable architecture; extend, don't replace.
- No behavior/logic changes — purely presentational.

---

## Phases & Tasks

### Phase 1 — Foundation refresh (global, highest impact)
- [ ] Add a modern variable font (Inter or Geist) via self-host or CDN; set as base `font-family`.
- [ ] Establish type scale (sizes, weights, line-height, letter-spacing) in tokens.
- [ ] Refine palette: pick brand color (indigo/emerald or chosen brand), softer borders
      (`gray-200`), near-white app background (`#fafafb`).
- [ ] Replace hard shadows with layered low-opacity shadows (`$shadow-soft/medium/lg`).
- [ ] Standardize border-radius scale (`0.5 / 0.75 / 1rem`) and spacing rhythm.

### Phase 2 — Core components
- [ ] Buttons: unify primary/secondary/danger/outlined on tokens; consistent sizes & focus rings.
- [ ] Inputs: modern focus ring, label spacing, error styles; reuse across forms.
- [ ] Cards: consistent padding, radius, soft shadow; remove fixed 300px constraint.

### Phase 3 — Data table redesign (Expenses + Income)
- [ ] Remove heavy outer border + gray header fill; use subtle header bottom-border.
- [ ] Increase row padding (`py-3`), add `hover:bg-gray-50`, zebra optional.
- [ ] Rounded container with single soft shadow; sticky header optional.
- [ ] Refactor hardcoded utility classes to shared component classes.

### Phase 4 — States & micro-interactions
- [ ] Skeleton loaders / spinner to replace `Loading...`.
- [ ] Proper empty states (icon + message + CTA) to replace `No Items`.
- [ ] Hover/transition polish on cards, rows, sidebar items.
- [ ] Toasts/feedback for create/update/delete (if not present).

### Phase 5 — Layout & navigation
- [ ] Login/Register: center card in full-height layout with subtle background.
- [ ] Sidebar: active-item pill highlight, brand-colored icons, logo/avatar header.
- [ ] Optional top header with page title + user menu.

### Phase 6 — Charts (Analytics/Reports)
- [ ] Restyle ECharts with new palette, rounded bars, soft gridlines, modern tooltips.

### Phase 7 — Optional enhancements
- [ ] Dark mode via `[data-theme="dark"]` overrides (architecture already supports CSS vars).
- [ ] Responsive/mobile pass (collapsible sidebar, stacked tables).
- [ ] Accessibility audit (focus order, contrast, ARIA).

---

## Suggested Execution Order

1. Phase 1 (foundation) — touches every screen at once, low risk.
2. Phase 3 (table) — biggest single-screen visual win.
3. Phases 2 & 4 — component + state polish.
4. Phases 5–6 — layout and charts.
5. Phase 7 — optional, after sign-off.

## Open Questions

- Brand/accent color preference?
- Reference style to match (Linear / Stripe / Notion / Vercel / other)?
- Is dark mode in scope for this round?
- Start with a full global foundation pass, or a single "north star" screen first?

## Constraints

- No changes to NgRx flow, services, routing, or API contracts.
- Keep bundle lean; prefer self-hosted/variable font and CSS over heavy UI libraries.
- Maintain existing token architecture (`styles/variables.scss` → `:root` CSS vars).
