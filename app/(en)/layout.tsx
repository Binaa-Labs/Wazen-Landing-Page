import type { Metadata, Viewport } from "next";
import { Fraunces } from "next/font/google";

import RootShell from "@/components/RootShell";

/* Hero serif accent (D18) — italic style only, EN route only. The /ar route
   never loads Fraunces: the Arabic accent is Tajawal 800 (no italic), and
   globals.css gives --font-serif a Georgia fallback for the runtime
   EN-toggle-on-/ar edge case. */
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: "italic",
  display: "swap",
  /* Decorative accent, not body text: keep it OFF the preload critical path
     so it queues behind the LCP text's fonts instead of ahead of them —
     display:swap shows the Georgia fallback until it arrives. */
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://wazen.fit"),
  /* Tab title owner-set to the bare brand (Pass 2.4, D52 scope extension);
     og/twitter share titles keep the promise-led wording (D16). */
  title: "Wazen",
  description:
    "Coaching platform & personal trainer software for the UAE, GCC & MENA. Clients, plans, check-ins, progress and messaging in one place. Free for 5 clients.",
  keywords: [
    "coaching platform",
    "coach app",
    "client management",
    "UAE coach",
    "GCC fitness coach",
    "منصة تدريب",
    "تطبيق مدرب",
  ],
  openGraph: {
    title: "Wazen — One calm, organized place for your coaching practice",
    description:
      "Free for your first 5 clients. Built for coaches in UAE, GCC & MENA. Arabic & English.",
    url: "https://wazen.fit",
    siteName: "Wazen",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Wazen coaching platform preview",
      },
    ],
    locale: "en_US",
    alternateLocale: "ar_AE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wazen — Coaching platform for UAE & GCC",
    description:
      "Free for your first 5 clients. Plans, check-ins, progress, messaging — all in one place.",
    images: ["/twitter-image"],
  },
  alternates: {
    canonical: "https://wazen.fit",
    languages: {
      en: "https://wazen.fit",
      ar: "https://wazen.fit/ar",
      "x-default": "https://wazen.fit",
    },
  },
  robots: { index: true, follow: true },
};

// Theme-color follows the light page background / dark section background so
// the mobile browser chrome matches whichever theme is active.
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f2f2f2" },
    { media: "(prefers-color-scheme: dark)", color: "#1b2b2e" },
  ],
};

export default function EnLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <RootShell lang="en" fontVariables={fraunces.variable}>
      {children}
    </RootShell>
  );
}
