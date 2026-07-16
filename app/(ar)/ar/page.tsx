import type { Metadata } from "next";

import JsonLd from "@/components/JsonLd";
import LandingPage from "@/components/LandingPage";
import { buildJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  /* Tab title owner-set to the bare brand (Pass 2.4, D52 scope extension);
     og/twitter share titles keep the promise-led wording (D16). */
  title: "وازن",
  description:
    "منصة تدريب وبرنامج للمدربين يجمع عملاءك وخططك ومتابعاتك وتقدّم عملائك ورسائلك في نظام واحد، لمدربي اللياقة والتغذية في الإمارات والخليج والشرق الأوسط. مجاني لأول 5 عملاء.",
  keywords: [
    "منصة تدريب",
    "تطبيق مدرب",
    "إدارة العملاء",
    "مدرب لياقة",
    "مدرب الإمارات",
    "coaching platform",
    "coach app UAE",
  ],
  alternates: {
    canonical: "https://wazen.fit/ar",
    languages: {
      en: "https://wazen.fit",
      ar: "https://wazen.fit/ar",
      "x-default": "https://wazen.fit",
    },
  },
  openGraph: {
    title: "وازن: منصة تدريب عربية وإنجليزية للمدربين",
    description:
      "مجاني لأول 5 عملاء. منصة واحدة للخطط والمتابعات والتقدّم والمراسلة.",
    url: "https://wazen.fit/ar",
    siteName: "Wazen",
    /* og:image is injected by app/(ar)/ar/opengraph-image.tsx (file
       convention) — segment OG routes get hashed URLs, so never hardcode. */
    locale: "ar_AE",
    alternateLocale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "وازن: منصة تدريب للمدربين في الإمارات والخليج",
    description:
      "مجاني لأول 5 عملاء. الخطط والمتابعات والتقدّم والمراسلة في مكان واحد.",
    /* twitter:image injected by app/(ar)/ar/twitter-image.tsx */
  },
};

export default function ArabicHome() {
  // The (ar) root layout already wraps the tree in LanguageProvider
  // initialLang="ar", so the page itself just renders content.
  return (
    <>
      <JsonLd data={buildJsonLd("ar")} />
      <LandingPage />
    </>
  );
}
