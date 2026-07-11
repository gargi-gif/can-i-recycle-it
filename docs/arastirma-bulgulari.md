# Araştırma bulguları — renk sistemi (2026-07-07)

## Bölüm 1: Açık/koyu tema renk tutarlılığı (renk bilimi agent'ı — TAMAMLANDI)

### Doğrulanmış teknikler
1. **Material Design 3 tonal/container sistemi** — Her hue için tone ölçeği (0-100).
   Roller açık/koyu temada farklı tone'a sabitlenir: `primaryContainer` = tone 90 (açık) / tone 30 (koyu);
   `onPrimaryContainer` = tone 10 (açık) / tone 90 (koyu). "Tonal elevation" şeffaflık değil, opak ton kaydırması.
   Kaynak: https://m3.material.io/styles/color/roles · https://m3.material.io/blog/tone-based-surface-color-m3
2. **Apple HIG** — Özel renkler için açık/koyu varyant AYRI tanımlanmalı; tek sabit hex "avoid".
   Kaynak: https://developer.apple.com/design/human-interface-guidelines/dark-mode
3. **Radix Colors** — 12 step; step 3-5 bileşen zemini, step 9 solid, step 11-12 metin.
   Açık/koyu skalalar ayrı kalibre edilir; aynı step iki temada aynı işi görür.
   Kaynak: https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale
4. **Alfa bindirme sorunu** — `sonuç = alfa×renk + (1−alfa)×zemin`; %6 alfada sonuç ≈ zemin.
   Koyu zemin chroma'yı yutar. Çözüm: temaya özel önceden kalibre edilmiş OPAK tonlar.
   Kaynak: https://en.wikipedia.org/wiki/Alpha_compositing · https://ciechanow.ski/alpha-compositing/
5. **OKLCH** — hue sabit, L/C basamakları kalibre edilir; koyu temada aynı dizinin zıt ucundan seçilir.
   Kaynak: https://evilmartians.com/chronicles/better-dynamic-themes-in-tailwind-with-oklch-color-magic
6. **WCAG** — metin ≥4.5:1 (1.4.3); ikon/non-text ≥3:1 (1.4.11).
   Kaynak: https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html

### Tek net tavsiye (araştırma çıktısı)
Alfa bindirmeyi bırak; kategori başına 6 OPAK token (surface/icon/tile × açık/koyu):
hue sabit, açık tema zemini yüksek-L düşük-C (M3 tone~90 muadili), koyu tema zemini düşük-orta-L
biraz daha yüksek C (tone~30 muadili), ikon rengi her temada kendi zeminine karşı hesaplanır.

## Bölüm 2: Kutu renk standartları (standartlar agent'ı — TAMAMLANDI)

### Evrensel standart var mı?
**Hayır.** AB Komisyonu Policy Lab: her üye devlet kendi renk sistemini kullanıyor; aynı yeşil
Berlin'de organik, ABD'de karışık dönüşüm, UK'nin bazı belediyelerinde genel çöp demek.
EN 840 konteyner boyut/mekanizma tanımlar, renk tanımlamaz. ISO 14001 renk kodu içermez (yaygın blog yanlışı).
Kaynak: https://policy-lab.ec.europa.eu/stories/harmonising-waste-sorting-labels-across-eu-2023-05-02_en
· https://www.europarl.europa.eu/doceo/document/E-8-2018-002987_EN.html

### TR Sıfır Atık eşlemesi (ikincil kaynaklardan çapraz doğrulama; ilk 5 satır 3+ bağımsız kaynakla tutarlı)
| Kategori | Renk | Güven | Not |
|---|---|---|---|
| Kâğıt/karton | Mavi | Yüksek | |
| Plastik | Sarı | Yüksek | |
| Cam | Yeşil | Yüksek | |
| Metal | Gri | Yüksek | |
| Organik | Kahverengi | Yüksek | |
| Tehlikeli | Kırmızı (öneri) | Düşük — kaynaklar çelişkili | TR tıbbi atık poşeti kırmızı; OSHA biyohazard kırmızı/turuncu |
| Elektronik | STANDART YOK — serbest seçim | — | WEEE Direktifi ayrı toplama ister, renk tanımlamaz |
| Tekstil | Pembe (zayıf/orta) — serbest sayılabilir | Düşük | Resmî metin doğrulanamadı |
Kaynak: https://www.dosab.org.tr/Detay/1350/Sifir-Atik-Yonetmeligi-Kapsaminda-Renk-ve-Piktogram-Standartlari (resmî genelgeye atıflı OSB duyurusu)

### Sınırlamalar
- Resmî PDF'ler (sifiratik.gov.tr, csb.gov.tr) taranmış görüntü olduğundan birebir okunamadı;
  bulgular çapraz doğrulanmış ikincil kaynaklardandır.
- RAL/hex kodu iddiaları (RAL 5002 vb.) hiçbir resmî belgede doğrulanamadı — **kullanma**.
- Tehlikeli ve e-atık renk seçimleri uygulamada "tasarım kararı" olarak etiketlenmeli, resmî standart iddia edilmemeli.

## Lider kararı (2026-07-07)
Hue seti: kâğıt=mavi, plastik=sarı, cam=yeşil, metal=gri, organik=kahverengi,
tehlikeli=kırmızı (tasarım kararı), elektronik=mor (tasarım kararı — standart yok),
tekstil=pembe/gül (tasarım kararı). Açık/koyu işleme: Bölüm 1'deki opak tonal reçete
(M3 container mantığı: açık=yüksek-L düşük-C, koyu=düşük-L yüksek-C, hue sabit).
