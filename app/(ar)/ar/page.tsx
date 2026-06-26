import type { Metadata } from "next";

import JsonLd from "@/components/JsonLd";
import LandingPage from "@/components/LandingPage";
import { buildJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "وازن — أدِر عملك التدريبي من مكان واحد منظّم",
  description:
    "وازن يجمع عملاءك وخططك ومتابعاتك وتقدّمهم ورسائلك في نظام واحد، مصمّم للمدربين في الإمارات والخليج والشرق الأوسط. مجاني لأول 5 عملاء.",
  alternates: {
    canonical: "https://wazen.fit/ar",
    languages: {
      en: "https://wazen.fit",
      ar: "https://wazen.fit/ar",
      "x-default": "https://wazen.fit",
    },
  },
  openGraph: {
    title: "وازن — منصة تدريب عربية وإنجليزية للمدربين",
    description:
      "مجاني لأول 5 عملاء. منصة واحدة للخطط والمتابعات والتقدّم والمراسلة.",
    url: "https://wazen.fit/ar",
    siteName: "Wazen",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Wazen coaching platform preview",
      },
    ],
    locale: "ar_AE",
    alternateLocale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "وازن — منصة تدريب للمدربين في الإمارات والخليج",
    description:
      "مجاني لأول 5 عملاء. الخطط والمتابعات والتقدّم والمراسلة في مكان واحد.",
    images: ["/twitter-image"],
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
