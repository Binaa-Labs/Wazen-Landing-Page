import type { Metadata, Viewport } from "next";

import RootShell from "@/components/RootShell";

export const metadata: Metadata = {
  metadataBase: new URL("https://wazen.fit"),
  title: "Wazen — Run your coaching practice from one calm, organized place",
  description:
    "Wazen brings your clients, plans, check-ins, progress, and messages into a single system — built for coaches in UAE, GCC & MENA. Free for your first 5 clients.",
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
  return <RootShell lang="en">{children}</RootShell>;
}
