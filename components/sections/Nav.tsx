"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { useLanguage } from "@/components/LanguageProvider";
import Button from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";
import { APP_URLS } from "@/lib/links";

const linkHrefs = ["#features", "#how-it-works", "#pricing", "#faq"] as const;

function SunIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className="size-4"
      aria-hidden
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32 1.41-1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
      aria-hidden
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79Z" />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className="size-5"
      aria-hidden
    >
      {open ? (
        <path d="M6 6l12 12M18 6L6 18" />
      ) : (
        <path d="M4 7h16M4 12h16M4 17h16" />
      )}
    </svg>
  );
}

function subscribeToScroll(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}

/* Theme pref lives in localStorage and is read as an external store. Language
   now lives in the i18n context (LanguageProvider); step 18 adds the no-flash
   theme init script. */
const PREF_EVENT = "wazen-pref-change";

function subscribeToPrefs(callback: () => void) {
  window.addEventListener(PREF_EVENT, callback);
  return () => window.removeEventListener(PREF_EVENT, callback);
}

function setPref(key: string, value: string) {
  localStorage.setItem(key, value);
  window.dispatchEvent(new Event(PREF_EVENT));
}

type NavProps = {
  /* "overHero": transparent over the hero photo until ~80px of scroll, then
     solid. "solid" (default): solid always — any non-hero surface must never
     get the transparent treatment (D24). Only LandingPage passes overHero. */
  variant?: "overHero" | "solid";
};

export default function Nav({ variant = "solid" }: NavProps) {
  const { t, lang, toggleLang } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  /* Dismissal parity with the X button: Escape and backdrop/outside clicks
     close the drawer, and focus returns to the menu button so keyboard
     users aren't dropped at the top of the document. */
  const closeMenu = () => {
    setMenuOpen(false);
    menuButtonRef.current?.focus();
  };

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const links = linkHrefs.map((href, i) => ({
    href,
    label: [t.nav.features, t.nav.howItWorks, t.nav.pricing, t.nav.faq][i],
  }));

  const scrolled = useSyncExternalStore(
    subscribeToScroll,
    () => window.scrollY > 80,
    () => false,
  );

  /* The <html> class is the source of truth — set pre-paint by the init
     script in layout.tsx, then flipped imperatively on toggle below. Reading
     it here keeps the icon in sync (incl. the prefers-color-scheme fallback)
     without a second source of truth. */
  const theme = useSyncExternalStore(
    subscribeToPrefs,
    () =>
      document.documentElement.classList.contains("dark") ? "dark" : "light",
    () => "light",
  );

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    document.documentElement.classList.toggle("dark", next === "dark");
    setPref("wazen-theme", next);
  };

  /* On-photo styling only while the transparent bar sits over the hero. */
  const onPhoto = variant === "overHero" && !scrolled;

  const linkClasses = onPhoto
    ? "text-sm text-white/80 transition-colors hover:text-white"
    : "text-sm text-ink/70 transition-colors hover:text-ink";

  const iconButtonClasses = onPhoto
    ? "flex size-9 cursor-pointer items-center justify-center rounded-pill border border-white/25 text-white/85 transition-colors hover:bg-white/10 hover:text-white"
    : "flex size-9 cursor-pointer items-center justify-center rounded-pill border border-primary/10 text-ink/70 transition-colors hover:bg-primary/5 hover:text-ink";

  /* Solid-panel controls (mobile dropdown) never change with the bar state */
  const panelIconButtonClasses =
    "flex size-9 cursor-pointer items-center justify-center rounded-pill border border-primary/10 text-ink/70 transition-colors hover:bg-primary/5 hover:text-ink";

  return (
    <nav aria-label="Main" className="fixed inset-x-0 top-0 z-50">
      {/* Invisible backdrop while the drawer is open: any outside click
          closes it. Painted under the bar + panel (earlier in DOM order). */}
      {menuOpen && (
        <div
          aria-hidden
          onClick={closeMenu}
          className="fixed inset-0 md:hidden"
        />
      )}
      <div
        className={`relative border-b transition-[background-color,box-shadow,border-color] duration-300 ${
          onPhoto
            ? "border-transparent bg-transparent"
            : "border-ink/5 bg-bg shadow-sm"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-content items-center justify-between gap-4 px-6">
          <a href="#top">
            <Logo tone={onPhoto ? "onPhoto" : "ink"} />
          </a>

          <div className="hidden items-center gap-6 md:flex">
            {links.map((link) => (
              <a key={link.href} href={link.href} className={linkClasses}>
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <button
              onClick={toggleLang}
              className={iconButtonClasses}
              aria-label={lang === "en" ? t.nav.switchToAr : t.nav.switchToEn}
            >
              {lang === "en" ? (
                <span className="font-arabic text-sm leading-none">ع</span>
              ) : (
                <span className="text-xs font-medium leading-none">EN</span>
              )}
            </button>
            <button
              onClick={toggleTheme}
              className={iconButtonClasses}
              aria-label={theme === "light" ? t.nav.toDark : t.nav.toLight}
            >
              {theme === "light" ? <MoonIcon /> : <SunIcon />}
            </button>
            {/* Quiet text treatment in both bar states (D25) */}
            <a href={APP_URLS.login} className={`${linkClasses} ms-2 me-1`}>
              {t.nav.login}
            </a>
            <Button
              href={APP_URLS.signup}
              size="sm"
              variant={onPhoto ? "glass" : "primary"}
            >
              {t.nav.startFree}
            </Button>
          </div>

          <button
            ref={menuButtonRef}
            onClick={() => setMenuOpen((open) => !open)}
            className={`${iconButtonClasses} md:hidden`}
            aria-label={t.nav.menu}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="absolute inset-x-4 top-full mt-2 rounded-card border border-primary/10 bg-surface p-5 shadow-lg md:hidden"
            >
              <div className="flex flex-col gap-1">
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-badge px-3 py-2.5 text-body text-ink/80 transition-colors hover:bg-primary/5 hover:text-ink"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href={APP_URLS.login}
                  className="rounded-badge px-3 py-2.5 text-body text-ink/80 transition-colors hover:bg-primary/5 hover:text-ink"
                >
                  {t.nav.login}
                </a>
              </div>
              <div className="mt-4 flex items-center gap-2 border-t border-primary/10 pt-4">
                <button
                  onClick={toggleLang}
                  className={panelIconButtonClasses}
                  aria-label={lang === "en" ? t.nav.switchToAr : t.nav.switchToEn}
                >
                  {lang === "en" ? (
                    <span className="font-arabic text-sm leading-none">ع</span>
                  ) : (
                    <span className="text-xs font-medium leading-none">EN</span>
                  )}
                </button>
                <button
                  onClick={toggleTheme}
                  className={panelIconButtonClasses}
                  aria-label={theme === "light" ? t.nav.toDark : t.nav.toLight}
                >
                  {theme === "light" ? <MoonIcon /> : <SunIcon />}
                </button>
                <Button href={APP_URLS.signup} size="sm" className="flex-1">
                  {t.nav.startFree}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
