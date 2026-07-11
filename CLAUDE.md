# CanIRecycleIt — project guide

"Can I Recycle It?" — a user searches for a household item and gets an instant Yes/No
(recyclable) answer plus a one-sentence disposal instruction. Live at **canirecycleit.com**.
Static React SPA · Vite · Tailwind v4 · lucide-react.

## Architecture
- `src/data/items.js` — all data: 270+ items (`id`, `name`, `keywords`, `category`,
  `recyclable`, `instruction`, `icon`) + `CATEGORIES` (9 categories with color tokens).
- `src/App.jsx` — search UI, deep-linking (`/item/<id>`).
- `src/GuidePage.jsx` — the `/most-misjudged` guide page.
- `src/main.jsx` — routing (`/most-misjudged` → GuidePage, everything else → App).
- `scripts/gen-sitemap.mjs` — build-time sitemap generator.
- `docs/` — sourced research notes behind every ruling (data provenance).

## Non-negotiable rules (see docs/KIRMIZI-CIZGILER.md)
1. **Data:** no unsourced verdicts. Every `recyclable` decision cites an authoritative
   source (zero-waste authority, EPA, municipal A–Z, industry body). No source → don't add
   it, or flag it. When sources conflict, keep both and use "check locally" language rather
   than claiming a universal ruling.
2. **Theme:** category colors come only from `docs/renk-token-tablosu.md`. Emerald/green
   accent is reserved for the "Recyclable" badge. No emoji; one icon family (lucide) — verify
   every icon name exists. Check contrast (body text ≥4.5:1, icons ≥3:1).
3. **Quality gate:** `id` must be unique and `npm run build` must pass cleanly before shipping.

## Workflow
Work on a branch, open a PR. `main` is production (deployed on Vercel). See CONTRIBUTING.md
for the item schema and sourcing rules.
