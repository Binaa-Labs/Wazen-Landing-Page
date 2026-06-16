"use client";

import {
  createContext,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react";

import { dictionary, type Dictionary, type Locale } from "@/lib/i18n";

/* Language lives in localStorage and is read as an external store — the same
   pattern Nav uses for theme. This avoids the `set-state-in-effect` lint rule
   and gives a correct value during hydration via getServerSnapshot. The
   reload flash for returning AR users is removed by step 18's init script. */
const LANG_EVENT = "wazen-lang-change";

function subscribe(callback: () => void) {
  window.addEventListener(LANG_EVENT, callback);
  window.addEventListener("storage", callback); // cross-tab sync
  return () => {
    window.removeEventListener(LANG_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot(): Locale {
  return localStorage.getItem("wazen-lang") === "ar" ? "ar" : "en";
}

function getServerSnapshot(): Locale {
  return "en";
}

function persistLang(lang: Locale) {
  localStorage.setItem("wazen-lang", lang);
  /* Mirror onto <html> imperatively. On first load the init script in
     layout.tsx owns these attributes (pre-paint); this covers runtime
     toggles. No effect re-asserts SSR defaults, so there's no flash. */
  const el = document.documentElement;
  el.setAttribute("lang", lang);
  el.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
  window.dispatchEvent(new Event(LANG_EVENT));
}

type LanguageContextValue = {
  lang: Locale;
  setLang: (lang: Locale) => void;
  toggleLang: () => void;
  t: Dictionary;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const value: LanguageContextValue = {
    lang,
    setLang: persistLang,
    toggleLang: () => persistLang(lang === "en" ? "ar" : "en"),
    t: dictionary[lang],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
}
