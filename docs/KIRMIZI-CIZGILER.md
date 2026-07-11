# Kırmızı Çizgiler — CanIRecycleIt

İhlal edilemez proje kuralları. Her katkı bunlara uyar. (Katkı akışı için: CONTRIBUTING.md)

## 1. Veri & doğruluk (en kritik)
- **Kaynaksız hüküm yasak.** Her kalemin recyclable kararı yetkili kaynağa dayanır
  (Sıfır Atık, EPA, belediye A–Z, sektör kuruluşu). Kaynak yoksa kalem eklenmez veya ⚑ FLAG'lenir.
- **Uydurma tespit edilince kullanılmaz.** Şüpheli iddia çapraz doğrulanır, asılsızsa atılır.
- **Kesin ülke hükmü iddia edilmez.** Zayıf/çelişkili kaynakta talimat "check locally" dilini taşır.
- **Çelişki gizlenmez.** İki kaynak çelişince ikisi de yazılır ve "check locally" dili kullanılır.

## 2. Tasarım & tema
- **Kategori renkleri yalnız `docs/renk-token-tablosu.md`'den** — TR Sıfır Atık hue eşlemesi,
  M3 opak tonal sistem. Alfa-bindirme yasak.
- **Zümrüt/yeşil vurgu yalnız "Recyclable" rozetinin.** Kategori tinti kutu rengini söyler, durumu değil.
- **Emoji yok. Tek ikon ailesi (lucide), her ikon grep'le doğrulanır.** Uydurma ikon adı yasak.
- **Kontrast hesaplanır, göz kararı değil:** gövde metni ≥4.5:1, ikon ≥3:1.

## 3. Kalite kapısı
- **QA bağımsız ölçümle yapılır:** şema, her arama sorgusu, kaynak tutarlılığı, ikon export,
  iki temada render, regresyon ayrı ayrı doğrulanır.
- **`id` tekil, build temiz (`npm run build`) geçmeden PR açılmaz.**

_canirecycleit.com_
