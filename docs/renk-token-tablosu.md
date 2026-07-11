# Renk token tablosu — Sorted kategori renkleri (2026-07-07)

Kaynak reçete: `docs/arastirma-bulgulari.md` (opak tonal sistem, M3 container mantığı;
alfa bindirme kaldırıldı). Hue seti liderin kararı. Tüm oranlar WCAG 2.x bağıl parlaklık
formülüyle hesaplandı (betik özeti en altta) — göz kararı değer yok.

Şema: mevcut `CATEGORIES` formatı — tek string içinde `açık dark:koyu`.

## Token tablosu

| Kategori | tint (kart zemini) | iconTint (ikon) | tile (ikon kutusu) |
|---|---|---|---|
| plastic | `bg-yellow-100 dark:bg-yellow-950` | `text-yellow-700 dark:text-yellow-400` | `bg-yellow-200 dark:bg-yellow-900` |
| paper | `bg-blue-100 dark:bg-blue-950` | `text-blue-600 dark:text-blue-400` | `bg-blue-200 dark:bg-blue-900` |
| glass | `bg-green-100 dark:bg-green-950` | `text-green-700 dark:text-green-400` | `bg-green-200 dark:bg-green-900` |
| metal | `bg-zinc-100 dark:bg-zinc-900` | `text-zinc-600 dark:text-zinc-300` | `bg-zinc-200 dark:bg-zinc-800` |
| organic | `bg-amber-100 dark:bg-amber-950` | `text-amber-700 dark:text-amber-400` | `bg-amber-200 dark:bg-amber-900` |
| electronics | `bg-violet-100 dark:bg-violet-950` | `text-violet-600 dark:text-violet-400` | `bg-violet-200 dark:bg-violet-900` |
| hazardous | `bg-red-100 dark:bg-red-950` | `text-red-600 dark:text-red-400` | `bg-red-200 dark:bg-red-900` |
| textile | `bg-rose-100 dark:bg-rose-950` | `text-rose-600 dark:text-rose-400` | `bg-rose-200 dark:bg-rose-900` |

Standart notları:
- plastic/paper/glass/metal/organic: TR Sıfır Atık eşlemesi (araştırma tablosu, güven "Yüksek").
- hazardous (kırmızı): **standart yok / kaynaklar çelişkili — tasarım kararı** (TR tıbbi atık poşeti kırmızı geleneğine yaslanır).
- electronics (mor): **standart yok — tasarım kararı** (WEEE renk tanımlamaz; mor diğer 7 hue ile çakışmayan tek belirgin aile).
- textile (gül): **standart yok / resmî metin doğrulanamadı — tasarım kararı** (ikincil kaynaklardaki "pembe" eğilimiyle uyumlu).

## Hesaplanmış kontrast oranları

Metinler: gövde açık `zinc-600` (#52525c) / koyu `zinc-300` (#d4d4d8);
başlık açık `zinc-900` (#18181b) / koyu `zinc-50` (#fafafa).
Eşikler: metin ≥4.5:1 (WCAG 1.4.3), ikon ≥3:1 (WCAG 1.4.11).

### Açık tema

| Kategori | tint hex | gövde@tint | başlık@tint | tile hex | ikon hex | ikon@tile | tint vs sayfa #fafafa |
|---|---|---|---|---|---|---|---|
| plastic | #fef9c2 | 7.18 | 16.49 | #fff085 | #a65f00 | 4.24 | 1.03 (hue ayırır) |
| paper | #dbeafe | 6.33 | 14.52 | #bedbff | #155dfc | 3.69 | 1.17 |
| glass | #dcfce7 | 7.03 | 16.13 | #b9f8cf | #008236 | 4.10 | 1.05 (hue ayırır) |
| metal | #f4f4f5 | 7.02 | 16.12 | #e4e4e7 | #52525c | 6.08 | 1.05 ⚑ bkz. FLAG |
| organic | #fef3c6 | 6.93 | 15.90 | #fee685 | #bb4d00 | 4.04 | 1.07 (hue ayırır) |
| electronics | #ede9fe | 6.50 | 14.92 | #ddd6ff | #7f22fe | 4.25 | 1.14 |
| hazardous | #ffe2e2 | 6.33 | 14.54 | #ffc9c9 | #e7000b | 3.28 | 1.17 |
| textile | #ffe4e6 | 6.43 | 14.76 | #ffccd3 | #ec003f | 3.20 | 1.15 |

### Koyu tema

| Kategori | tint hex | gövde@tint | başlık@tint | tile hex | ikon hex | ikon@tile | tint vs sayfa #09090b |
|---|---|---|---|---|---|---|---|
| plastic | #432004 | 9.82 | 13.90 | #733e0a | #fdc700 | 5.51 | 1.37 (hue ayırır) |
| paper | #162456 | 10.00 | 14.16 | #1c398e | #51a2ff | 3.93 | 1.35 |
| glass | #032e15 | 10.11 | 14.31 | #0d542b | #05df72 | 5.09 | 1.33 |
| metal | #18181b | 11.99 | 16.97 | #27272a | #d4d4d8 | 10.08 | 1.12 ⚑ bkz. FLAG |
| organic | #461901 | 10.15 | 14.37 | #7b3306 | #ffb900 | 5.26 | 1.33 |
| electronics | #2f0d68 | 10.31 | 14.60 | #4d179a | #a684ff | 3.87 | 1.31 |
| hazardous | #460809 | 10.94 | 15.49 | #82181a | #ff6467 | 3.47 | 1.23 |
| textile | #4d0218 | 10.62 | 15.04 | #8b0836 | #ff637e | 3.36 | 1.27 |

Tüm zorunlu eşikler GEÇİYOR: gövde metni her tint'te ≥6.33 (açık) / ≥9.82 (koyu);
ikonlar her tile'da ≥3.20 (açık) / ≥3.36 (koyu). En dar marjlar: textile açık ikon 3.20
ve hazardous açık ikon 3.28 (eşik 3.0 — geçer; daha geniş marj istenirse 700 basamağı
rose-700=4.26, red-700=4.42 verir, chroma bir miktar düşer).

## Kaydırılan tonlar (aday → final, hesap gerekçesiyle)

- **Koyu tint 900 yerine 950:** 900 basamakları da metni geçiyordu (gövde 5.87–7.46) ama
  tam kart zemini için fazla doygun; 950'ler hem daha yüksek metin kontrastı (9.82–11.99)
  hem sayfadan yeterli ayrım (1.23–1.37 + chroma) veriyor. "950 ölü kalır" endişesi
  doğrulanmadı — Tailwind v4 950'leri belirgin chroma taşıyor (ör. blue-950 #162456).
- **Açık ikon yellow/green/amber 600 → 700:** 600 basamakları tile-200 üzerinde 2.53 / 2.67 / 2.57
  ile eşik altı kaldı; 700'ler 4.24 / 4.10 / 4.04 ile geçti.
- **Metal koyu tint zinc-950 → zinc-900:** zinc-950 (#09090b) sayfa zeminiyle BİREBİR aynı hex;
  kart görünmez olurdu. zinc-900 tint / zinc-800 tile / zinc-300 ikon: 11.99 ve 10.08 ile geçer.

## ⚑ FLAG'ler (kontrast faili yok; görsel ayrım notları — lidere)

1. **⚑ metal:** Nötr ailede hue ayrımı olmadığından kart-sayfa ayrımı yalnız parlaklık
   farkına dayanıyor: açık zinc-100 vs #fafafa = 1.05, koyu zinc-900 vs #09090b = 1.12.
   Zorunlu eşik tanımlı değil ve tüm metin/ikon eşikleri geçiyor; ancak kart kenarlığı/gölgesi
   yoksa metal kartı zeminde eriyebilir. Seçenek: açıkta zinc-200 tint + zinc-300 tile
   (gövde 6.08 ✓, zinc-700 ikon @ zinc-300 ≈ 7 ✓). Karar liderin.
2. Sarı/yeşil/amber açık tint'lerin sayfa ile parlaklık oranı ~1.03–1.07 — bunlar güçlü
   chroma taşıdığından (ör. yellow-100 #fef9c2) görsel ayrım nettir, fail değildir; bilgi amaçlı.

## Hesap yöntemi ve hex kaynakları

- **Hex kaynağı:** `recycle-lookup/node_modules/tailwindcss/theme.css` (Tailwind v4 varsayılan
  paleti, OKLCH). Betik OKLCH → OKLab → LMS → lineer sRGB → gamma (CSS Color 4 referans
  matrisleri) dönüşümüyle 8-bit hex üretti. Sanity: blue-500 → #2b7fff, tailwindcss.com v4
  yayın değeriyle birebir. zinc-600 dönüşümü #52525c çıktı (yayın #52525b; 1/255 yuvarlama,
  kontrast etkisi 3. ondalıkta — ihmal edilebilir).
- **Kontrast:** WCAG bağıl parlaklık — kanal başına `v≤0.03928 ? v/12.92 : ((v+0.055)/1.055)^2.4`,
  L = 0.2126R + 0.7152G + 0.0722B; oran = (L1+0.05)/(L2+0.05). Node betiği:
  scratchpad `contrast.mjs` / `final.mjs` (geçici; bu dosyadaki tablolar tam çıktıdır).
- Sayfa zeminleri görevden: açık #fafafa (zinc-50), koyu #09090b (zinc-950).

Uygulama `renk-uygulama`'ya aittir; bu belge yalnız token kararı + kanıttır.

## Lider kararları (2026-07-07) — FİNAL TABLO BU BÖLÜMDÜR

1. ⚑ metal FLAG'i kabul: açık tema `bg-zinc-200` tint + `bg-zinc-300` tile + `text-zinc-700` ikon
   (gövde@tint 6.08 ✓, ikon@tile 7.07 ✓, sayfa ayrımı 1.22). Koyu tema agent önerisi kalır
   (zinc-900 / zinc-800 / zinc-300) — kart kenarlığı ayrımı taşıyor.
2. organic: amber → **orange**. Gerekçe: amber-100 (#fef3c6) ile plastic yellow-100 (#fef9c2)
   ve amber ikonlarla sarı ikonlar görsel olarak ayrıştırılamıyor; orange hem plastikten ayrışır
   hem kahverengiyi daha iyi okutur. Hesap: gövde@orange-100 6.73, @orange-950 10.59;
   orange-800@orange-200 5.41, orange-300@orange-900 5.54 — hepsi ✓.
3. İkon basamakları tek düzen: açık `700`, koyu `300` (istisna: yellow koyu `400` — yellow-300
   fazla soluk; 5.51 ✓). Dar marjlı 600'ler (textile 3.20, hazardous 3.28) yerine ≥4.1 marj.

| kategori | tint | iconTint | tile |
|---|---|---|---|
| plastic | `bg-yellow-100 dark:bg-yellow-950` | `text-yellow-700 dark:text-yellow-400` | `bg-yellow-200 dark:bg-yellow-900` |
| paper | `bg-blue-100 dark:bg-blue-950` | `text-blue-700 dark:text-blue-300` | `bg-blue-200 dark:bg-blue-900` |
| glass | `bg-green-100 dark:bg-green-950` | `text-green-700 dark:text-green-300` | `bg-green-200 dark:bg-green-900` |
| metal | `bg-zinc-200 dark:bg-zinc-900` | `text-zinc-700 dark:text-zinc-300` | `bg-zinc-300 dark:bg-zinc-800` |
| organic | `bg-orange-100 dark:bg-orange-950` | `text-orange-800 dark:text-orange-300` | `bg-orange-200 dark:bg-orange-900` |
| electronics | `bg-violet-100 dark:bg-violet-950` | `text-violet-700 dark:text-violet-300` | `bg-violet-200 dark:bg-violet-900` |
| hazardous | `bg-red-100 dark:bg-red-950` | `text-red-700 dark:text-red-300` | `bg-red-200 dark:bg-red-900` |
| textile | `bg-rose-100 dark:bg-rose-950` | `text-rose-700 dark:text-rose-300` | `bg-rose-200 dark:bg-rose-900` |
| other ⁴ | `bg-stone-200 dark:bg-stone-900` | `text-stone-700 dark:text-stone-300` | `bg-stone-300 dark:bg-stone-800` |

4. other ("General Waste") 2026-07-07 Tur 2'de eklendi. Hue dayanağı: TR standardı "diğer = siyah/koyu
   gri" (arastirma-bulgulari.md Bölüm 2). Stone (sıcak gri) metal'in zinc'inden (soğuk gri) ayrışır.
   Hesap: gövde@tintA 6.15, ikon@tileA 6.90, gövde@tintK 11.83, ikon@tileK 10.18 — hepsi ✓.
