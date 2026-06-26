import { Inter, Outfit, Tajawal } from "next/font/google";

import "@/app/globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";
import type { Locale } from "@/lib/i18n";

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

/* Runs before paint: applies the saved theme/language to <html> so there's no
   dark-mode flash or RTL layout jump on reload. Must stay blocking (no
   async/defer). The route now sets the correct lang/dir server-side (en at /,
   ar at /ar); this script only re-asserts the user's stored theme + their
   client-side language preference (incl. the ?lang=ar/en shareable override).
   Mirrors the resolve logic in Nav.tsx (theme) and LanguageProvider.tsx (lang). */
const INIT_SCRIPT = `(function(){try{var d=document.documentElement;var t=localStorage.getItem("wazen-theme");if(t==="dark"||(!t&&matchMedia("(prefers-color-scheme: dark)").matches))d.classList.add("dark");var p=location.pathname.replace(/\\/+$/,"");var r=p==="/ar"?"ar":null;var q=new URLSearchParams(location.search).get("lang");var l=r||(q==="ar"||q==="en"?q:localStorage.getItem("wazen-lang"));if(r==="ar"||q==="ar"||q==="en")localStorage.setItem("wazen-lang",l);if(l==="ar"){d.setAttribute("lang","ar");d.setAttribute("dir","rtl");}else{d.setAttribute("lang","en");d.setAttribute("dir","ltr");}}catch(e){}})();`;

export default function RootShell({
  lang,
  children,
}: {
  lang: Locale;
  children: React.ReactNode;
}) {
  return (
    <html
      lang={lang}
      dir={lang === "ar" ? "rtl" : "ltr"}
      suppressHydrationWarning
      className={`${outfit.variable} ${inter.variable} ${tajawal.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">
        <script dangerouslySetInnerHTML={{ __html: INIT_SCRIPT }} />
        <LanguageProvider initialLang={lang}>{children}</LanguageProvider>
      </body>
    </html>
  );
}
