"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import { useLanguage } from "@/components/LanguageProvider";
import { fadeUp, staggerContainer, viewport } from "@/components/motion";
import SectionHeader from "@/components/ui/SectionHeader";

type FaqItem = { q: string; a: string };

/* Accordion state lives here so that keying this component by language
   (in FAQ below) remounts it on switch — closing any open item and
   replaying the stagger, without a render-phase reset or effect. */
function FaqAccordion({ items }: { items: readonly FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className="mx-auto mt-12 max-w-3xl"
    >
      {items.map((faq, i) => {
        const open = openIndex === i;
        return (
          <motion.div
            key={faq.q}
            variants={fadeUp}
            className="border-b border-ink/8"
          >
            <h3>
              <button
                onClick={() => setOpenIndex(open ? null : i)}
                aria-expanded={open}
                aria-controls={`faq-panel-${i}`}
                id={`faq-question-${i}`}
                className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-start text-[1.05rem] font-medium text-ink transition-colors hover:text-primary"
              >
                {faq.q}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                  className={`size-4 shrink-0 text-ink/40 transition-transform duration-[280ms] ease-in-out ${
                    open ? "rotate-180" : ""
                  }`}
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
            </h3>
            <motion.div
              id={`faq-panel-${i}`}
              role="region"
              aria-labelledby={`faq-question-${i}`}
              initial={false}
              animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
              transition={{ duration: 0.28, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <p className="pb-5 text-body text-ink/65">{faq.a}</p>
            </motion.div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

export default function FAQ() {
  const { t, lang } = useLanguage();

  return (
    <section
      id="faq"
      className="bg-bg px-6 py-section-compact-mobile md:py-section-compact"
    >
      <div className="mx-auto max-w-content">
        <SectionHeader eyebrow={t.faq.eyebrow} title={t.faq.h2} />
        <FaqAccordion key={lang} items={t.faq.items} />
      </div>
    </section>
  );
}
