# Can I Recycle It?

**Search any household item, get an instant Yes / No answer plus a one-sentence disposal instruction.**

Live: **[canirecycleit.com](https://canirecycleit.com)**

Recycling rules are confusing, contradictory, and change over time. "Can I Recycle It?" is a fast, no-nonsense lookup: type an item, see whether it's recyclable, and read one clear sentence on how to dispose of it correctly. Every ruling in the dataset is backed by an authoritative source — no guesses.

## Features

- 🔎 **Instant search** over 270+ common household items across 9 categories
- ✅ **Clear verdict** — Recyclable / Not recyclable, plus a single disposal instruction
- 🔗 **Deep links** — every item has its own URL (`/item/<id>`)
- 📖 **Most-misjudged guide** — the items people get wrong most often (`/most-misjudged`)
- 🌗 **Light & dark mode**, accessible color system (WCAG contrast checked)
- ⚡ **No backend** — a static React SPA; the entire dataset ships in the client

## Tech stack

React 18 · Vite 6 · Tailwind CSS v4 · lucide-react · deployed on Vercel.

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # generate sitemap + production build
npm run preview  # preview the production build
```

## Project structure

```
src/data/items.js       All item data (id, name, keywords, category, recyclable, instruction, icon) + CATEGORIES
src/App.jsx             Search UI, deep-linking
src/GuidePage.jsx       /most-misjudged guide page
src/main.jsx            Routing
scripts/gen-sitemap.mjs Build-time sitemap generator
docs/                   Sourced research notes behind every ruling (data provenance)
```

## Contributing

**New here? Start with a [`good first issue`](https://github.com/mrdogruu/can-i-recycle-it/labels/good%20first%20issue).** 🌱

The most valuable contribution is **adding items or correcting rulings — with sources.**
Every recyclability verdict must cite an authoritative reference (a national recycling
authority, EPA, a municipal A–Z guide, or an industry body). Unsourced entries are not
accepted. See **[CONTRIBUTING.md](CONTRIBUTING.md)** for the item schema and sourcing rules.

Adding one well-sourced item is a perfect first PR. Comment on an issue to claim it, drop
your source link in the PR, and you're in. 270+ items so far — help us cover the rest.

> Recycling rules vary by locality. This project reflects widely-applicable guidance and
> flags region-dependent items as "check locally" rather than claiming a universal ruling.

## License

[MIT](LICENSE) © 2026 Sefa Doğru
