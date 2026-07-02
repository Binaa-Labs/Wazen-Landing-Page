"use client";

import { useLanguage } from "@/components/LanguageProvider";
import Logo from "@/components/ui/Logo";

/* Labels are index-coupled to t.footer.links. support@ is a wazen.fit alias;
   set up forwarding to the Binaa Labs inbox before launch. */
const linkHrefs = ["/terms", "/privacy", "mailto:support@wazen.fit"];

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-primary-darker px-6 py-12">
      <div className="mx-auto max-w-content">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <a href="#top">
            <Logo tone="white" />
          </a>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap items-center gap-x-7 gap-y-2">
              {t.footer.links.map((label, i) => (
                <li key={label}>
                  <a
                    href={linkHrefs[i]}
                    className="text-sm text-white/50 transition-colors hover:text-white"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="mt-8 border-t border-white/10 pt-6">
          <p className="text-caption text-white/35">{t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
