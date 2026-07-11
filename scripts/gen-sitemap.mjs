// Build-time sitemap generator — one URL per item plus the homepage.
import { writeFileSync } from "node:fs";
import { ITEMS } from "../src/data/items.js";

const BASE = "https://canirecycleit.com";
const today = new Date().toISOString().slice(0, 10);

const urls = [
  `  <url><loc>${BASE}/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>`,
  `  <url><loc>${BASE}/most-misjudged</loc><changefreq>monthly</changefreq><priority>0.9</priority></url>`,
  ...ITEMS.map(
    (i) =>
      `  <url><loc>${BASE}/item/${i.id}</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`
  ),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`;

writeFileSync(new URL("../public/sitemap.xml", import.meta.url), xml);
console.log(`sitemap.xml written: ${ITEMS.length + 2} URLs`);
