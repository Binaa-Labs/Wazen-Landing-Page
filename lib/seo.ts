import { dictionary, type Locale } from "@/lib/i18n";

const SITE_URL = "https://wazen.fit";

/* GCC + wider MENA reach, as ISO 3166-1 country codes. Mirrors the
   "UAE, GCC & MENA" positioning used throughout the marketing copy. */
const AREA_SERVED = ["AE", "SA", "KW", "QA", "BH", "OM", "EG", "JO"];

const DESCRIPTION: Record<Locale, string> = {
  en: "Wazen brings your clients, plans, check-ins, progress, and messages into one organized system, built for coaches in the UAE, GCC & MENA, in Arabic and English. Free for your first 5 clients.",
  ar: "يجمع وازن عملاءك وخططك ومتابعاتك وتقدّمهم ورسائلك في نظام واحد منظّم، مصمّم للمدربين في الإمارات والخليج والشرق الأوسط، بالعربية والإنجليزية. مجاني لأول 5 عملاء.",
};

/* Single JSON-LD @graph per page so the entities (Organization, WebSite,
   SoftwareApplication, FAQPage) cross-reference by @id. Rendered server-side
   via <JsonLd>, so it ships in the static HTML for crawlers. The FAQ entities
   are derived from the same dictionary that renders the visible FAQ — they
   stay in sync by construction. */
export function buildJsonLd(locale: Locale) {
  const t = dictionary[locale];
  const inLanguage = locale === "ar" ? "ar" : "en";
  const pageUrl = locale === "ar" ? `${SITE_URL}/ar` : SITE_URL;

  const organization = {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "Binaa Labs",
    url: SITE_URL,
    /* Stable PNG export of the mark (public/brand/, D23) — generated routes
       like /icon can change content-type/shape; crawlers want a fixed file. */
    logo: `${SITE_URL}/brand/wazen-logo-512.png`,
    email: "admin@binaalabs.com",
    foundingLocation: { "@type": "Country", name: "United Arab Emirates" },
    areaServed: AREA_SERVED,
  };

  const website = {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "Wazen",
    inLanguage,
    publisher: { "@id": `${SITE_URL}/#organization` },
  };

  const application = {
    "@type": "SoftwareApplication",
    "@id": `${SITE_URL}/#software`,
    name: "Wazen",
    applicationCategory: "BusinessApplication",
    /* The client app is a PWA — no native iOS/Android builds yet (D8). */
    operatingSystem: "Web (PWA), works on iOS & Android",
    url: pageUrl,
    inLanguage,
    description: DESCRIPTION[locale],
    publisher: { "@id": `${SITE_URL}/#organization` },
    offers: [
      {
        "@type": "Offer",
        name: t.pricing.plans[0].name,
        price: "0",
        priceCurrency: "USD",
      },
      {
        "@type": "Offer",
        name: t.pricing.plans[1].name,
        price: "49",
        priceCurrency: "USD",
      },
      {
        "@type": "Offer",
        name: t.pricing.plans[2].name,
        price: "99",
        priceCurrency: "USD",
      },
    ],
  };

  const faq = {
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    inLanguage,
    mainEntity: t.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [organization, website, application, faq],
  };
}
