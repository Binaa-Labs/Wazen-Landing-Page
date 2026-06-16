import type { Metadata } from "next";
import { Inter, Outfit, Tajawal } from "next/font/google";
import "./globals.css";

import { LanguageProvider } from "@/components/LanguageProvider";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic"],
  weight: ["400", "500", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://wazen.com"),
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
    url: "https://wazen.com",
    siteName: "Wazen",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wazen — Coaching platform for UAE & GCC",
    description:
      "Free for your first 5 clients. Plans, check-ins, progress, messaging — all in one place.",
  },
  alternates: {
    canonical: "https://wazen.com",
    languages: { ar: "https://wazen.com?lang=ar" },
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${outfit.variable} ${inter.variable} ${tajawal.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">
        {/* Runs before paint: applies the saved theme/language to <html> so
            there's no dark-mode flash or RTL layout jump on reload. Must stay
            blocking (no async/defer). Mirrors the resolve logic in
            Nav.tsx (theme) and LanguageProvider.tsx (lang). */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var d=document.documentElement;var t=localStorage.getItem("wazen-theme");if(t==="dark"||(!t&&matchMedia("(prefers-color-scheme: dark)").matches))d.classList.add("dark");if(localStorage.getItem("wazen-lang")==="ar"){d.setAttribute("lang","ar");d.setAttribute("dir","rtl");}}catch(e){}})();`,
          }}
        />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
