# RemindMe web sitesi (5 dil) — YAYINLANMADI

Bu klasör hazır bir tanıtım sitesidir: `index.html` (İngilizce), `tr/`, `de/`, `fr/`, `ar/`, `style.css`, `img/`, `sitemap.xml`, `robots.txt`, `llms.txt`.
Hiçbir şey internete gönderilmedi. Sen "yayınla" dedikten sonra aşağıdaki adımlar yapılır.

## İçinde ne var (arama motorları ve yapay zekâ için)
- Her dilde ayrı sayfa + `hreflang` + `canonical`; tek `H1`; kısa başlık/açıklama (arama sonucunda kesilmez).
- Yapılandırılmış veri (schema.org `MobileApplication` + `FAQPage`): Google ve yapay zekâ asistanları uygulamayı ve sorulara cevapları doğrudan okur.
- `llms.txt`: yapay zekâ asistanları için tek sayfalık gerçekler listesi (ne yapar, hangi diller, gizlilik, Siri, alarm).
- `robots.txt`: arama motorları ve yapay zekâ tarayıcıları (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot…) her şeyi okuyabilir.
- Open Graph / Twitter kartı (`img/og.jpg`) — bağlantı paylaşılınca güzel önizleme çıkar.
- `apple-itunes-app` başlığı: iPhone Safari'de sayfanın üstünde "Uygulamayı aç" bandı gösterir.
- Hızlı sayfa: tek küçük CSS, resimler 30–70 KB, JavaScript yok.
- Yazılanların hepsi bugünkü uygulamada doğrudur (ücretsiz indirme, hesap/reklam/takip yok, Siri, iOS 26 alarmı, konum hatırlatması).

## Değiştirmek istersen
Metinler `build-site.js` içinde. Değiştir, sonra: `node store/website/build-site.js`
Siteye kendi alan adın olursa `build-site.js` içindeki `SITE` adresini değiştirip yeniden üret.
Resimler (`img/`) mağaza ekran görüntülerinden küçültüldü; ekran görüntüleri değişirse yenilenir.

## Yayınlamak (sana sorarak)
Gizlilik politikası adresi (`https://dasghost-01.github.io/remindme-privacy/`) App Store'da kayıtlı: ona DOKUNMA, bu site ayrı bir depoda olmalı.
1. github.com'da yeni **public** depo: `remindme` (adres: `https://dasghost-01.github.io/remindme/`).
2. Bu klasörün içindekileri (README ve build-site.js hariç olabilir, kalsa da zarar yok) o depoya yükle; Settings > Pages > Branch: main / root.
3. Birkaç dakika sonra site açılır. Sonra:
   - Google Search Console'a ekle, `sitemap.xml` gönder; Bing Webmaster Tools aynı.
   - App Store Connect'te "Marketing URL" olarak bu adresi yaz (bir sonraki sürümde).
   - Aynı adresi GitHub profiline, Product Hunt'a, sosyal hesaplara koy (`store/aso-plan.md`).
4. En iyisi kendi alan adı (ör. remindme uygulaması için kısa bir .app/.com): arama motorlarında `github.io` adreslerinden daha güçlü sayılır. Alan adı satın alma işini ben yapmam; alırsan DNS ayarını anlatırım.
