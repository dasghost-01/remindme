// Builds the RemindMe website (5 languages) into this folder: node store/website/build-site.js
// It writes index.html (English) and tr/de/fr/ar/index.html, style.css, sitemap.xml, robots.txt and llms.txt.
// Nothing here is published by this script. See README.md in this folder for how to put it online.
//
// Search engines and AI assistants read the same things people do: a clear title and description, one H1, plain sentences
// that answer the questions people ask, structured data (schema.org MobileApplication + FAQPage), one page per language
// with hreflang, and llms.txt (a short facts sheet for AI assistants). Every claim below is true of the app today.
const fs = require('fs');
const path = require('path');

const SITE = 'https://dasghost-01.github.io/remindme/'; // change here if the site gets its own domain
const APP_ID = '6818256531';
const STORE_URL = `https://apps.apple.com/app/id${APP_ID}`;
const PRIVACY_URL = 'https://dasghost-01.github.io/remindme-privacy/';
const SUPPORT_EMAIL = 'remindmeadmin@proton.me';
const YEAR = 2026;

const PAGES = [
  {
    code: 'en', dir: 'ltr', folder: '', og: 'en_US',
    title: 'RemindMe: Reminder App for iPhone & iPad (Siri, Alarms)',
    description: 'Turn one sentence into a reminder. RemindMe works with Siri, real alarms, place reminders and widgets. No account, no ads, no tracking.',
    h1: 'Say it. It’s a reminder.',
    sub: 'RemindMe turns one typed or spoken sentence into a reminder with the right date, time and repeat. No menus, no forms.',
    cta: 'Download on the App Store', note: 'Free for iPhone and iPad. No account, no ads.',
    stepsTitle: 'How it works',
    steps: [
      ['Say or type it', '“Remind me to call mom tomorrow at 8 pm.” Tap the microphone or just write.'],
      ['RemindMe understands', 'Date, time, repeat, even several reminders at once, in five languages. If something is missing, it asks.'],
      ['You never forget', 'A notification, or a real alarm that rings even in silent mode (iOS 26).'],
    ],
    examplesTitle: 'Just say it',
    examples: [
      ['Remind me to call mom tomorrow at 8 pm', 'Call mom · tomorrow, 8:00 pm'],
      ['Take my pills every day at 9 and 21', 'Take my pills · every day, 9:00 am and 9:00 pm'],
      ['Drink water every 2 hours between 9 and 21', 'Drink water · every 2 hours, 9:00 am to 9:00 pm'],
      ['Alarm tomorrow at 6:30', 'Alarm · tomorrow, 6:30 am'],
    ],
    featuresTitle: 'Why people use it',
    features: [
      ['Hands-free with Siri', 'Say “Hey Siri, add a reminder with RemindMe”. Siri asks the day and the time and saves it without opening the app.'],
      ['Real alarms', 'On iOS 26 a reminder can ring like a real alarm, even in silent mode or a Focus.'],
      ['Place reminders', 'Pin a place on the map and be reminded when you arrive or leave, even when the app is closed.'],
      ['Your day at a glance', 'A daily plan with only what is left for today, a calendar, streaks and snooze.'],
      ['Private by design', 'No account. No ads. No tracking. Your reminders stay on your iPhone and iPad.'],
      ['Made for iPhone and iPad', 'A roomy layout for big screens, every orientation, Split View, widgets and beautiful themes.'],
    ],
    faqTitle: 'Questions and answers',
    faq: [
      ['What is RemindMe?', 'RemindMe is a reminder app for iPhone and iPad. You type or say one sentence and it creates a reminder with the right date, time and repeat.'],
      ['Is RemindMe free?', 'RemindMe is free to download and has no ads.'],
      ['Do I need an account?', 'No. There is no account and no sign-up. Your reminders stay on your device.'],
      ['Does RemindMe work with Siri?', 'Yes. Say “Hey Siri, add a reminder with RemindMe”. Siri asks for the day and the time and saves the reminder without opening the app. “Add a detailed reminder” and “Add a place reminder” work too.'],
      ['Can a reminder ring like an alarm?', 'On iOS 26 and later, yes. RemindMe can ring a real alarm that sounds even in silent mode or a Focus.'],
      ['Which languages does it understand?', 'Turkish, English, French, German and Arabic, including long sentences and several reminders in one go.'],
      ['Is my data private?', 'Yes. No account, no ads, no tracking, and your reminders stay on your device.'],
    ],
    privacy: 'Privacy policy', contact: 'Contact', otherLanguages: 'Also in',
  },
  {
    code: 'tr', dir: 'ltr', folder: 'tr/', og: 'tr_TR',
    title: 'RemindMe: iPhone ve iPad için Hatırlatıcı (Siri, Alarm)',
    description: 'Tek bir cümleyi hatırlatmaya çevir. RemindMe; Siri, gerçek alarm, konum hatırlatması ve widget ile çalışır. Hesap yok, reklam yok, takip yok.',
    h1: 'Söyle. Hatırlatma hazır.',
    sub: 'RemindMe, yazdığın ya da söylediğin tek bir cümleyi doğru tarih, saat ve tekrarla hatırlatmaya çevirir. Menü yok, form yok.',
    cta: 'App Store’dan indir', note: 'iPhone ve iPad için ücretsiz. Hesap yok, reklam yok.',
    stepsTitle: 'Nasıl çalışır',
    steps: [
      ['Söyle ya da yaz', '“Yarın akşam 8’de annemi ara.” Mikrofona dokun ya da yaz.'],
      ['RemindMe anlar', 'Tarih, saat, tekrar, hatta birden fazla hatırlatma; beş dilde. Eksik bir şey olursa sorar.'],
      ['Hiçbir şeyi unutmazsın', 'Bir bildirim ya da sessiz modda bile çalan gerçek bir alarm (iOS 26).'],
    ],
    examplesTitle: 'Sadece söyle',
    examples: [
      ['Yarın akşam 8’de annemi ara', 'Annemi ara · yarın, 20:00'],
      ['İlaçlarımı her gün 9’da ve 21’de iç', 'İlaçlarımı iç · her gün, 09:00 ve 21:00'],
      ['Her 2 saatte bir su iç, 9 ile 21 arası', 'Su iç · her 2 saatte, 09:00–21:00'],
      ['Yarın sabah 6:30’a alarm kur', 'Alarm · yarın, 06:30'],
    ],
    featuresTitle: 'İnsanlar neden kullanıyor',
    features: [
      ['Siri ile eller serbest', '“Hey Siri, RemindMe ile hatırlatma ekle” de. Siri günü ve saati sorar, uygulamayı açmadan kaydeder.'],
      ['Gerçek alarm', 'iOS 26’da bir hatırlatma gerçek alarm gibi çalabilir; sessiz modda ya da Odak’ta bile.'],
      ['Konum hatırlatması', 'Haritada bir yer seç; vardığında ya da ayrıldığında hatırlat, uygulama kapalıyken bile.'],
      ['Günün bir bakışta', 'Sadece bugün kalanları gösteren günlük plan, takvim, seri ve erteleme.'],
      ['Tasarımı gereği gizli', 'Hesap yok. Reklam yok. Takip yok. Hatırlatmaların iPhone’unda ve iPad’inde kalır.'],
      ['iPhone ve iPad için', 'Büyük ekranlar için ferah bir düzen, her yön, Split View, widget’lar ve güzel temalar.'],
    ],
    faqTitle: 'Sorular ve cevaplar',
    faq: [
      ['RemindMe nedir?', 'RemindMe, iPhone ve iPad için bir hatırlatıcı uygulamasıdır. Tek bir cümle yazarsın ya da söylersin; doğru tarih, saat ve tekrarla hatırlatma oluşturur.'],
      ['RemindMe ücretsiz mi?', 'RemindMe ücretsiz indirilir ve reklam içermez.'],
      ['Hesap açmam gerekiyor mu?', 'Hayır. Hesap ve kayıt yok. Hatırlatmaların cihazında kalır.'],
      ['RemindMe Siri ile çalışır mı?', 'Evet. “Hey Siri, RemindMe ile hatırlatma ekle” de. Siri günü ve saati sorar, hatırlatmayı uygulamayı açmadan kaydeder. “Ayrıntılı hatırlatma ekle” ve “Konum hatırlatması ekle” de çalışır.'],
      ['Hatırlatma alarm gibi çalabilir mi?', 'iOS 26 ve üzerinde evet. RemindMe, sessiz modda ya da Odak’ta bile çalan gerçek bir alarm kurabilir.'],
      ['Hangi dilleri anlıyor?', 'Türkçe, İngilizce, Fransızca, Almanca ve Arapça; uzun cümleleri ve tek seferde birden fazla hatırlatmayı da.'],
      ['Verilerim gizli mi?', 'Evet. Hesap yok, reklam yok, takip yok; hatırlatmaların cihazında kalır.'],
    ],
    privacy: 'Gizlilik politikası', contact: 'İletişim', otherLanguages: 'Diğer diller',
  },
  {
    code: 'de', dir: 'ltr', folder: 'de/', og: 'de_DE',
    title: 'RemindMe: Erinnerungs-App für iPhone & iPad (Siri, Wecker)',
    description: 'Mach aus einem Satz eine Erinnerung. RemindMe funktioniert mit Siri, echten Weckern, Orts-Erinnerungen und Widgets. Kein Konto, keine Werbung, kein Tracking.',
    h1: 'Sag es. Schon erinnert.',
    sub: 'RemindMe macht aus einem getippten oder gesprochenen Satz eine Erinnerung mit dem richtigen Datum, der richtigen Uhrzeit und Wiederholung. Ohne Menüs, ohne Formulare.',
    cta: 'Im App Store laden', note: 'Kostenlos für iPhone und iPad. Kein Konto, keine Werbung.',
    stepsTitle: 'So funktioniert es',
    steps: [
      ['Sagen oder tippen', '„Mama morgen um 20 Uhr anrufen.“ Tippe auf das Mikrofon oder schreibe einfach.'],
      ['RemindMe versteht', 'Datum, Uhrzeit, Wiederholung, sogar mehrere Erinnerungen auf einmal, in fünf Sprachen. Fehlt etwas, fragt die App nach.'],
      ['Nichts mehr vergessen', 'Eine Mitteilung oder ein echter Wecker, der auch im Lautlos-Modus klingelt (iOS 26).'],
    ],
    examplesTitle: 'Einfach sagen',
    examples: [
      ['Mama morgen um 20 Uhr anrufen', 'Mama anrufen · morgen, 20:00 Uhr'],
      ['Tabletten jeden Tag um 9 und 21 Uhr nehmen', 'Tabletten nehmen · täglich, 9:00 und 21:00 Uhr'],
      ['Alle 2 Stunden Wasser trinken, zwischen 9 und 21 Uhr', 'Wasser trinken · alle 2 Stunden, 9:00 bis 21:00 Uhr'],
      ['Wecker morgen um 6:30 Uhr', 'Wecker · morgen, 6:30 Uhr'],
    ],
    featuresTitle: 'Darum nutzen es Leute',
    features: [
      ['Freihändig mit Siri', 'Sag „Hey Siri, füge eine Erinnerung mit RemindMe hinzu“. Siri fragt nach Tag und Uhrzeit und speichert sie, ohne die App zu öffnen.'],
      ['Echte Wecker', 'Mit iOS 26 kann eine Erinnerung wie ein echter Wecker klingeln, auch im Lautlos-Modus oder in einem Fokus.'],
      ['Orts-Erinnerungen', 'Setze einen Ort auf die Karte und werde erinnert, wenn du ankommst oder gehst, auch bei geschlossener App.'],
      ['Dein Tag auf einen Blick', 'Ein Tagesplan mit nur dem, was heute noch offen ist, dazu Kalender, Serien und Schlummern.'],
      ['Privat von Grund auf', 'Kein Konto. Keine Werbung. Kein Tracking. Deine Erinnerungen bleiben auf deinem iPhone und iPad.'],
      ['Für iPhone und iPad gemacht', 'Ein großzügiges Layout für große Bildschirme, jede Ausrichtung, Split View, Widgets und schöne Designs.'],
    ],
    faqTitle: 'Fragen und Antworten',
    faq: [
      ['Was ist RemindMe?', 'RemindMe ist eine Erinnerungs-App für iPhone und iPad. Du tippst oder sagst einen Satz, und die App legt eine Erinnerung mit dem richtigen Datum, der richtigen Uhrzeit und Wiederholung an.'],
      ['Ist RemindMe kostenlos?', 'RemindMe ist kostenlos ladbar und enthält keine Werbung.'],
      ['Brauche ich ein Konto?', 'Nein. Es gibt kein Konto und keine Anmeldung. Deine Erinnerungen bleiben auf deinem Gerät.'],
      ['Funktioniert RemindMe mit Siri?', 'Ja. Sag „Hey Siri, füge eine Erinnerung mit RemindMe hinzu“. Siri fragt nach Tag und Uhrzeit und speichert die Erinnerung, ohne die App zu öffnen. „Detaillierte Erinnerung hinzufügen“ und „Orts-Erinnerung hinzufügen“ funktionieren auch.'],
      ['Kann eine Erinnerung wie ein Wecker klingeln?', 'Mit iOS 26 und neuer, ja. RemindMe kann einen echten Wecker stellen, der auch im Lautlos-Modus oder in einem Fokus klingelt.'],
      ['Welche Sprachen versteht die App?', 'Türkisch, Englisch, Französisch, Deutsch und Arabisch, auch lange Sätze und mehrere Erinnerungen auf einmal.'],
      ['Sind meine Daten privat?', 'Ja. Kein Konto, keine Werbung, kein Tracking, und deine Erinnerungen bleiben auf deinem Gerät.'],
    ],
    privacy: 'Datenschutz', contact: 'Kontakt', otherLanguages: 'Auch auf',
  },
  {
    code: 'fr', dir: 'ltr', folder: 'fr/', og: 'fr_FR',
    title: 'RemindMe : app de rappels pour iPhone et iPad (Siri, alarmes)',
    description: 'Transformez une phrase en rappel. RemindMe fonctionne avec Siri, de vraies alarmes, des rappels de lieu et des widgets. Sans compte, sans pub, sans suivi.',
    h1: 'Dites-le. C’est un rappel.',
    sub: 'RemindMe transforme une phrase, écrite ou dite, en rappel avec la bonne date, la bonne heure et la bonne répétition. Sans menus, sans formulaires.',
    cta: 'Télécharger sur l’App Store', note: 'Gratuit sur iPhone et iPad. Sans compte, sans publicité.',
    stepsTitle: 'Comment ça marche',
    steps: [
      ['Dites-le ou écrivez-le', '« Appeler maman demain à 20 h. » Touchez le micro ou écrivez simplement.'],
      ['RemindMe comprend', 'Date, heure, répétition, même plusieurs rappels à la fois, en cinq langues. S’il manque quelque chose, l’app demande.'],
      ['Vous n’oubliez plus rien', 'Une notification, ou une vraie alarme qui sonne même en mode silencieux (iOS 26).'],
    ],
    examplesTitle: 'Dites-le simplement',
    examples: [
      ['Appeler maman demain à 20 h', 'Appeler maman · demain, 20 h'],
      ['Prendre mes médicaments tous les jours à 9 h et 21 h', 'Prendre mes médicaments · tous les jours, 9 h et 21 h'],
      ['Boire de l’eau toutes les 2 heures entre 9 h et 21 h', 'Boire de l’eau · toutes les 2 heures, de 9 h à 21 h'],
      ['Alarme demain à 6 h 30', 'Alarme · demain, 6 h 30'],
    ],
    featuresTitle: 'Pourquoi on l’utilise',
    features: [
      ['Mains libres avec Siri', 'Dites « Dis Siri, ajoute un rappel avec RemindMe ». Siri demande le jour et l’heure et l’enregistre sans ouvrir l’app.'],
      ['De vraies alarmes', 'Sous iOS 26, un rappel peut sonner comme une vraie alarme, même en mode silencieux ou en Concentration.'],
      ['Rappels de lieu', 'Placez un lieu sur la carte et soyez prévenu à l’arrivée ou au départ, même app fermée.'],
      ['Votre journée en un coup d’œil', 'Un planning avec seulement ce qui reste à faire aujourd’hui, un calendrier, des séries et le report.'],
      ['Confidentiel par conception', 'Pas de compte. Pas de publicité. Pas de suivi. Vos rappels restent sur votre iPhone et votre iPad.'],
      ['Conçu pour iPhone et iPad', 'Une mise en page aérée pour les grands écrans, toutes les orientations, Split View, widgets et beaux thèmes.'],
    ],
    faqTitle: 'Questions et réponses',
    faq: [
      ['Qu’est-ce que RemindMe ?', 'RemindMe est une app de rappels pour iPhone et iPad. Vous écrivez ou dites une phrase et elle crée un rappel avec la bonne date, la bonne heure et la bonne répétition.'],
      ['RemindMe est-il gratuit ?', 'RemindMe se télécharge gratuitement et ne contient pas de publicité.'],
      ['Faut-il un compte ?', 'Non. Il n’y a ni compte ni inscription. Vos rappels restent sur votre appareil.'],
      ['RemindMe fonctionne-t-il avec Siri ?', 'Oui. Dites « Dis Siri, ajoute un rappel avec RemindMe ». Siri demande le jour et l’heure et enregistre le rappel sans ouvrir l’app. « Ajoute un rappel détaillé » et « Ajoute un rappel de lieu » fonctionnent aussi.'],
      ['Un rappel peut-il sonner comme une alarme ?', 'Sous iOS 26 et plus, oui. RemindMe peut faire sonner une vraie alarme, même en mode silencieux ou en Concentration.'],
      ['Quelles langues comprend-il ?', 'Le turc, l’anglais, le français, l’allemand et l’arabe, y compris les longues phrases et plusieurs rappels à la fois.'],
      ['Mes données sont-elles privées ?', 'Oui. Pas de compte, pas de publicité, pas de suivi, et vos rappels restent sur votre appareil.'],
    ],
    privacy: 'Confidentialité', contact: 'Contact', otherLanguages: 'Aussi en',
  },
  {
    code: 'ar', dir: 'rtl', folder: 'ar/', og: 'ar_AR',
    title: 'RemindMe: تطبيق تذكيرات لـ iPhone وiPad (سيري، منبّهات)',
    description: 'حوّل جملة واحدة إلى تذكير. يعمل RemindMe مع سيري ومنبّهات حقيقية وتذكيرات الأماكن والأدوات المصغّرة. بلا حساب وبلا إعلانات وبلا تتبع.',
    h1: 'قلها. وصار تذكيرًا.',
    sub: 'يحوّل RemindMe جملة واحدة، مكتوبة أو منطوقة، إلى تذكير بالتاريخ والوقت والتكرار الصحيحين. دون قوائم أو نماذج.',
    cta: 'نزّله من App Store', note: 'مجاني على iPhone وiPad. بلا حساب وبلا إعلانات.',
    stepsTitle: 'كيف يعمل',
    steps: [
      ['قلها أو اكتبها', '«اتصل بأمي غدًا الساعة 8 مساءً». اضغط على الميكروفون أو اكتب ببساطة.'],
      ['RemindMe يفهم', 'التاريخ والوقت والتكرار وحتى عدة تذكيرات معًا، بخمس لغات. وإذا نقص شيء يسألك.'],
      ['لن تنسى شيئًا', 'إشعار، أو منبّه حقيقي يرنّ حتى في الوضع الصامت (iOS 26).'],
    ],
    examplesTitle: 'قلها فقط',
    examples: [
      ['اتصل بأمي غدًا الساعة 8 مساءً', 'الاتصال بأمي · غدًا، 8:00 مساءً'],
      ['تناول الدواء كل يوم الساعة 9 و21', 'تناول الدواء · كل يوم، 9:00 صباحًا و9:00 مساءً'],
      ['اشرب الماء كل ساعتين بين 9 و21', 'شرب الماء · كل ساعتين، من 9:00 إلى 21:00'],
      ['منبّه غدًا الساعة 6:30', 'منبّه · غدًا، 6:30 صباحًا'],
    ],
    featuresTitle: 'لماذا يستخدمه الناس',
    features: [
      ['دون لمس مع سيري', 'قل «يا سيري، أضف تذكيرًا مع RemindMe». يسأل سيري عن اليوم والوقت ويحفظه دون فتح التطبيق.'],
      ['منبّهات حقيقية', 'في iOS 26 يمكن للتذكير أن يرنّ كمنبّه حقيقي، حتى في الوضع الصامت أو التركيز.'],
      ['تذكيرات الأماكن', 'ضع مكانًا على الخريطة ويذكّرك عند وصولك أو مغادرتك، حتى والتطبيق مغلق.'],
      ['يومك في نظرة', 'خطة يومية تعرض ما تبقّى لهذا اليوم فقط، مع تقويم وسلاسل وتأجيل.'],
      ['خصوصية بالتصميم', 'لا حساب. لا إعلانات. لا تتبع. تبقى تذكيراتك على iPhone وiPad الخاصين بك.'],
      ['مصمَّم لـ iPhone وiPad', 'تخطيط رحب للشاشات الكبيرة، وكل الاتجاهات، وSplit View، وأدوات مصغّرة ومظاهر جميلة.'],
    ],
    faqTitle: 'أسئلة وأجوبة',
    faq: [
      ['ما هو RemindMe؟', 'RemindMe تطبيق تذكيرات لـ iPhone وiPad. تكتب جملة أو تقولها فينشئ تذكيرًا بالتاريخ والوقت والتكرار الصحيحين.'],
      ['هل RemindMe مجاني؟', 'RemindMe مجاني للتنزيل وبلا إعلانات.'],
      ['هل أحتاج إلى حساب؟', 'لا. لا يوجد حساب ولا تسجيل. تبقى تذكيراتك على جهازك.'],
      ['هل يعمل RemindMe مع سيري؟', 'نعم. قل «يا سيري، أضف تذكيرًا مع RemindMe». يسأل سيري عن اليوم والوقت ويحفظ التذكير دون فتح التطبيق. كما يعمل «أضف تذكيرًا مفصّلًا» و«أضف تذكير مكان».'],
      ['هل يمكن للتذكير أن يرنّ كمنبّه؟', 'في iOS 26 وما بعده، نعم. يستطيع RemindMe تشغيل منبّه حقيقي يرنّ حتى في الوضع الصامت أو التركيز.'],
      ['ما اللغات التي يفهمها؟', 'التركية والإنجليزية والفرنسية والألمانية والعربية، بما في ذلك الجمل الطويلة وعدة تذكيرات دفعة واحدة.'],
      ['هل بياناتي خاصة؟', 'نعم. لا حساب ولا إعلانات ولا تتبع، وتبقى تذكيراتك على جهازك.'],
    ],
    privacy: 'سياسة الخصوصية', contact: 'تواصل', otherLanguages: 'متوفر أيضًا بـ',
  },
];

const LANGUAGE_NAMES = { en: 'English', tr: 'Türkçe', de: 'Deutsch', fr: 'Français', ar: 'العربية' };

const esc = (text) => String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const urlOf = (page) => `${SITE}${page.folder}`;

function jsonLd(page) {
  const graph = [
    {
      '@type': 'MobileApplication',
      '@id': `${SITE}#app`,
      name: 'RemindMe',
      alternateName: 'RemindMe: Personal Assistant',
      url: urlOf(page),
      description: page.description,
      applicationCategory: 'ProductivityApplication',
      operatingSystem: 'iOS, iPadOS',
      inLanguage: ['tr', 'en', 'fr', 'de', 'ar'],
      downloadUrl: STORE_URL,
      installUrl: STORE_URL,
      image: `${SITE}img/icon-512.png`,
      screenshot: [1, 2, 3].map((n) => `${SITE}img/${page.code}-${n}.jpg`),
      featureList: page.features.map((f) => f[0]),
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      publisher: { '@type': 'Organization', name: 'RemindMe', email: SUPPORT_EMAIL },
    },
    {
      '@type': 'FAQPage',
      mainEntity: page.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
    },
  ];
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
}

function render(page) {
  const prefix = page.folder ? '../' : '';
  const alternates = PAGES.map((p) => `<link rel="alternate" hreflang="${p.code}" href="${urlOf(p)}">`).join('\n');
  const others = PAGES.filter((p) => p.code !== page.code)
    .map((p) => `<a href="${prefix}${p.folder}" hreflang="${p.code}" lang="${p.code}">${LANGUAGE_NAMES[p.code]}</a>`)
    .join(' · ');
  return `<!doctype html>
<html lang="${page.code}" dir="${page.dir}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(page.title)}</title>
<meta name="description" content="${esc(page.description)}">
<link rel="canonical" href="${urlOf(page)}">
${alternates}
<link rel="alternate" hreflang="x-default" href="${SITE}">
<meta name="apple-itunes-app" content="app-id=${APP_ID}">
<meta name="theme-color" content="#0A8FC7">
<meta property="og:type" content="website">
<meta property="og:site_name" content="RemindMe">
<meta property="og:title" content="${esc(page.title)}">
<meta property="og:description" content="${esc(page.description)}">
<meta property="og:url" content="${urlOf(page)}">
<meta property="og:image" content="${SITE}img/og.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="${page.og}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(page.title)}">
<meta name="twitter:description" content="${esc(page.description)}">
<meta name="twitter:image" content="${SITE}img/og.jpg">
<link rel="icon" href="${prefix}img/icon-512.png">
<link rel="apple-touch-icon" href="${prefix}img/icon-512.png">
<link rel="stylesheet" href="${prefix}style.css">
<script type="application/ld+json">${jsonLd(page)}</script>
</head>
<body>
<header class="wrap top">
  <a class="brand" href="${prefix}${page.folder}"><img src="${prefix}img/icon-512.png" width="40" height="40" alt="">RemindMe</a>
  <a class="btn small" href="${STORE_URL}">${esc(page.cta)}</a>
</header>
<main>
  <section class="wrap hero">
    <div>
      <h1>${esc(page.h1)}</h1>
      <p class="lead">${esc(page.sub)}</p>
      <p><a class="btn" href="${STORE_URL}">${esc(page.cta)}</a></p>
      <p class="note">${esc(page.note)}</p>
    </div>
    <div class="shots">
      ${[1, 2, 3].map((n) => `<img src="${prefix}img/${page.code}-${n}.jpg" width="420" height="913" alt="RemindMe ${n}" ${n > 1 ? 'loading="lazy"' : ''}>`).join('\n      ')}
    </div>
  </section>
  <section class="wrap">
    <h2>${esc(page.stepsTitle)}</h2>
    <ol class="steps">
      ${page.steps.map(([t, d]) => `<li><strong>${esc(t)}</strong><span>${esc(d)}</span></li>`).join('\n      ')}
    </ol>
  </section>
  <section class="wrap">
    <h2>${esc(page.examplesTitle)}</h2>
    <ul class="examples">
      ${page.examples.map(([say, result]) => `<li><q>${esc(say)}</q><span>${esc(result)}</span></li>`).join('\n      ')}
    </ul>
  </section>
  <section class="wrap">
    <h2>${esc(page.featuresTitle)}</h2>
    <div class="grid">
      ${page.features.map(([t, d]) => `<article><h3>${esc(t)}</h3><p>${esc(d)}</p></article>`).join('\n      ')}
    </div>
  </section>
  <section class="wrap">
    <h2>${esc(page.faqTitle)}</h2>
    ${page.faq.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('\n    ')}
  </section>
  <section class="wrap center">
    <a class="btn" href="${STORE_URL}">${esc(page.cta)}</a>
  </section>
</main>
<footer class="wrap foot">
  <p>${esc(page.otherLanguages)}: ${others}</p>
  <p><a href="${PRIVACY_URL}">${esc(page.privacy)}</a> · <a href="mailto:${SUPPORT_EMAIL}">${esc(page.contact)}: ${SUPPORT_EMAIL}</a></p>
  <p>© ${YEAR} RemindMe</p>
</footer>
</body>
</html>
`;
}

const STYLE = `:root{--bg:#06121f;--fg:#eaf4ff;--sub:#a9c2da;--card:#0e2237;--line:#1c3a58;--accent:#12b7ff;--accent2:#0a8fc7}
@media (prefers-color-scheme:light){:root{--bg:#f4f9ff;--fg:#0b2540;--sub:#46627d;--card:#fff;--line:#d3e3f2}}
*{box-sizing:border-box}html{-webkit-text-size-adjust:100%}
body{margin:0;background:var(--bg);color:var(--fg);font:17px/1.6 -apple-system,BlinkMacSystemFont,"SF Pro Text","Segoe UI",Roboto,Helvetica,Arial,sans-serif}
a{color:var(--accent)}img{max-width:100%;height:auto}
.wrap{max-width:1040px;margin:0 auto;padding:0 20px}
.top{display:flex;align-items:center;justify-content:space-between;padding-top:18px;padding-bottom:18px}
.brand{display:flex;align-items:center;gap:10px;font-weight:800;font-size:20px;color:var(--fg);text-decoration:none}.brand img{border-radius:10px}
.btn{display:inline-block;background:linear-gradient(90deg,var(--accent2),var(--accent));color:#fff;font-weight:700;text-decoration:none;padding:14px 26px;border-radius:14px}
.btn.small{padding:9px 16px;font-size:15px}
.hero{display:grid;grid-template-columns:1fr 1.1fr;gap:32px;align-items:center;padding-top:28px;padding-bottom:36px}
h1{font-size:clamp(34px,6vw,56px);line-height:1.08;margin:0 0 14px}h2{font-size:28px;margin:46px 0 16px}h3{margin:0 0 6px;font-size:18px}
.lead{font-size:20px;color:var(--sub);margin:0 0 22px}.note{color:var(--sub);font-size:14px;margin-top:10px}
.shots{display:flex;gap:10px;justify-content:center}.shots img{width:32%;border-radius:18px;border:1px solid var(--line)}
.steps{list-style:none;padding:0;margin:0;display:grid;grid-template-columns:repeat(3,1fr);gap:14px;counter-reset:s}
.steps li{background:var(--card);border:1px solid var(--line);border-radius:16px;padding:18px;counter-increment:s}
.steps li:before{content:counter(s);display:inline-grid;place-items:center;width:30px;height:30px;border-radius:50%;background:var(--accent2);color:#fff;font-weight:800;margin-bottom:8px}
.steps strong,.steps span{display:block}.steps span{color:var(--sub);margin-top:4px}
.examples{list-style:none;margin:0;padding:0;display:grid;gap:10px}
.examples li{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:14px 18px;display:flex;justify-content:space-between;gap:14px;flex-wrap:wrap}
.examples q{font-weight:700}.examples span{color:var(--sub)}
.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
.grid article{background:var(--card);border:1px solid var(--line);border-radius:16px;padding:18px}.grid p{margin:0;color:var(--sub)}
details{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:14px 18px;margin-bottom:10px}
summary{cursor:pointer;font-weight:700}details p{margin:10px 0 0;color:var(--sub)}
.center{text-align:center;padding-top:34px;padding-bottom:10px}
.foot{color:var(--sub);font-size:14px;padding-top:34px;padding-bottom:44px;border-top:1px solid var(--line);margin-top:44px}
@media (max-width:760px){.hero{grid-template-columns:1fr}.steps,.grid{grid-template-columns:1fr}.shots img{width:31%}}
`;

function sitemap() {
  const urls = PAGES.map((p) => {
    const links = PAGES.map((o) => `    <xhtml:link rel="alternate" hreflang="${o.code}" href="${urlOf(o)}"/>`).join('\n');
    return `  <url>\n    <loc>${urlOf(p)}</loc>\n${links}\n    <changefreq>monthly</changefreq>\n  </url>`;
  }).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`;
}

function robots() {
  // Everything may be read, by search engines and by the crawlers of AI assistants alike.
  const bots = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-User', 'PerplexityBot', 'Google-Extended', 'Applebot', 'Applebot-Extended', 'Bingbot'];
  return `# RemindMe: all pages may be read by search engines and AI assistants.\nUser-agent: *\nAllow: /\n\n${bots.map((b) => `User-agent: ${b}\nAllow: /\n`).join('\n')}\nSitemap: ${SITE}sitemap.xml\n`;
}

function llms() {
  const en = PAGES[0];
  return `# RemindMe

> RemindMe is a reminder app for iPhone and iPad. You type or say one sentence (for example "remind me to call mom tomorrow at 8 pm") and it creates a reminder with the right date, time and repeat. It works with Siri, can ring a real alarm, reminds you at places, and keeps everything on the device.

## Key facts
- Platforms: iPhone and iPad (App Store): ${STORE_URL}
- Price: free to download; no ads; no account or sign-up
- Languages understood: Turkish, English, French, German, Arabic (long sentences and several reminders at once)
- Privacy: no account, no ads, no tracking; reminders stay on the device. Policy: ${PRIVACY_URL}
- Siri: say "Hey Siri, add a reminder with RemindMe"; Siri asks for the day and the time and saves it without opening the app. "Add a detailed reminder" and "Add a place reminder" also work.
- Alarms: on iOS 26 and later a reminder can ring as a real alarm, even in silent mode or a Focus.
- Place reminders: pin a place on the map and be reminded when arriving or leaving.
- Also: daily plan, calendar, streaks, snooze, checklists, widgets, themes, Face ID app lock.
- Contact: ${SUPPORT_EMAIL}

## Questions it answers
${en.faq.map(([q, a]) => `- ${q} ${a}`).join('\n')}

## Pages
${PAGES.map((p) => `- [${LANGUAGE_NAMES[p.code]}](${urlOf(p)})`).join('\n')}
- [Privacy policy](${PRIVACY_URL})
`;
}

for (const page of PAGES) {
  const folder = path.join(__dirname, page.folder);
  fs.mkdirSync(folder, { recursive: true });
  fs.writeFileSync(path.join(folder, 'index.html'), render(page));
}
fs.writeFileSync(path.join(__dirname, 'style.css'), STYLE);
fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), sitemap());
fs.writeFileSync(path.join(__dirname, 'robots.txt'), robots());
fs.writeFileSync(path.join(__dirname, 'llms.txt'), llms());
console.log(`site written for ${SITE}: ${PAGES.map((p) => p.code).join(', ')}`);
