# Contributing to Can I Recycle It?

Thank you for helping make recycling guidance clearer and more trustworthy! The single
most valuable contribution is **adding items or correcting rulings — always with a source.**

## The one hard rule: no unsourced verdicts

Every `recyclable` decision must be backed by an **authoritative source**:

- a national recycling / zero-waste authority,
- the US EPA or an equivalent government body,
- a municipal A–Z recycling guide, or
- a relevant industry association.

If you can't cite a source, please don't add the item. If sources **conflict**, say so in
your PR and phrase the instruction with "check locally" rather than claiming a universal ruling.
Recycling rules vary by locality — we prefer honest "it depends" over a confident wrong answer.

## Adding or editing an item

All data lives in [`src/data/items.js`](src/data/items.js). An item looks like this:

```js
{
  id: "plastic-bottle",          // unique, kebab-case, stable (it becomes the /item/<id> URL)
  name: "Plastic Bottle",
  keywords: ["pet", "water bottle", "soda bottle"],  // help search find it
  category: "plastic",           // one of the categories below
  recyclable: true,              // true | false
  instruction: "Empty it, rinse it, and crush it flat before it goes in the recycling bin.",
  icon: Milk,                    // a lucide-react icon — import it at the top of the file
}
```

### Categories

`plastic` · `paper` · `glass` · `metal` · `organic` · `electronics` · `hazardous` · `textile` · `other`

### Checklist before opening a PR

- [ ] `id` is unique and kebab-case (search the file to confirm it's new).
- [ ] `recyclable` verdict is backed by a source — **link it in the PR description.**
- [ ] `instruction` is a single, actionable sentence.
- [ ] `icon` is a real [lucide-react](https://lucide.dev/icons/) icon, imported at the top of `items.js`. No emoji.
- [ ] Region-dependent? Use "check locally" language instead of a universal claim.
- [ ] `npm run build` passes cleanly.

## Data provenance

The `docs/` folder holds the sourced research notes behind the dataset (the `kalem-arastirma-*`
files — research notes, written in Turkish). New rulings should be reproducible the same way:
a claim, its source, and a note when sources disagree.

## Development

```bash
npm install
npm run dev      # dev server
npm run build    # sitemap + production build (must pass before submitting)
```

By contributing you agree that your contributions are licensed under the [MIT License](LICENSE).
