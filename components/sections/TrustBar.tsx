"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";

import { useLanguage } from "@/components/LanguageProvider";
import { fade, viewport } from "@/components/motion";

/* Icons are index-coupled to t.trustBar.items:
   founding coaches / Arabic & English / free tier / fast setup */
const icons = [
  (
    <>
      <circle cx="9" cy="7.5" r="3.5" />
      <path d="M3 19.5c0-3 2.7-5 6-5s6 2 6 5" />
      <path d="M16 4.6a3.5 3.5 0 0 1 0 5.8M17.5 14.7c2.1.6 3.5 2.2 3.5 4.8" />
    </>
  ),
  (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a13.5 13.5 0 0 1 0 18M12 3a13.5 13.5 0 0 0 0 18" />
    </>
  ),
  (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 12.5 2.5 2.5 4.5-5.5" />
    </>
  ),
  <path key="zap" d="M13 3 5 13.5h6L11 21l8-10.5h-6L13 3Z" />,
];

export default function TrustBar() {
  const { t } = useLanguage();

  return (
    <section className="border-y border-ink/8 bg-bg py-6">
      <motion.div
        variants={fade}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="mx-auto max-w-content px-6"
      >
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {t.trustBar.items.map((label, i) => (
            <Fragment key={label}>
              {i > 0 && (
                <li
                  aria-hidden
                  className="hidden w-px self-stretch bg-ink/8 md:block"
                />
              )}
              <li className="flex items-center gap-2 text-[0.85rem] text-ink/70">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-4 shrink-0 text-primary"
                  aria-hidden
                >
                  {icons[i]}
                </svg>
                {label}
              </li>
            </Fragment>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
