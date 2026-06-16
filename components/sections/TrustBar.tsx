"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";

import { useLanguage } from "@/components/LanguageProvider";
import { fade, viewport } from "@/components/motion";

/* Icons are index-coupled to t.trustBar.items */
const icons = [
  (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a13.5 13.5 0 0 1 0 18M12 3a13.5 13.5 0 0 0 0 18" />
    </>
  ),
  <path
    key="chat"
    d="M21 11.5c0 3.6-4 6.5-9 6.5-1.1 0-2.1-.13-3.1-.38L4.5 19.5l1.4-3.1C4.7 15.2 3 13.5 3 11.5 3 7.9 7 5 12 5s9 2.9 9 6.5Z"
  />,
  (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 12.5 2.5 2.5 4.5-5.5" />
    </>
  ),
  (
    <>
      <path d="M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16M3 21h18" />
      <path d="M10 7h1m3 0h1m-5 4h1m3 0h1m-5 4h1m3 0h1" />
    </>
  ),
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
