"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";

import { useLanguage } from "@/components/LanguageProvider";
import { fade, viewport } from "@/components/motion";

/* Pass 2.1 restyle: the same honest claims (verbatim — standing constraint),
   compressed from an iconed band into a quiet single-row strip that reads as
   a footnote to the product-proof section above it: no top border, hairline
   separators, caption type. Wraps on mobile without widening the viewport. */

export default function TrustBar() {
  const { t } = useLanguage();

  return (
    <section className="border-b border-ink/8 bg-bg pb-9 pt-1">
      <motion.div
        variants={fade}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="mx-auto max-w-content px-6"
      >
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {t.trustBar.items.map((label, i) => (
            <Fragment key={label}>
              {i > 0 && (
                <li aria-hidden className="hidden h-3.5 w-px bg-ink/12 md:block" />
              )}
              <li className="text-caption text-ink/60">{label}</li>
            </Fragment>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
