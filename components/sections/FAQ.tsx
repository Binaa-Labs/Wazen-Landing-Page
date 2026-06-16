"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import { useLanguage } from "@/components/LanguageProvider";
import { fadeUp, staggerContainer, viewport } from "@/components/motion";
import SectionHeader from "@/components/ui/SectionHeader";

export default function FAQ() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="bg-bg px-6 py-section-mobile md:py-section"
    >
      <div className="mx-auto max-w-content">
        <SectionHeader eyebrow={t.faq.eyebrow} title={t.faq.h2} />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mx-auto mt-12 max-w-3xl"
        >
          {t.faq.items.map((faq, i) => {
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
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-question-${i}`}
                  className={`overflow-hidden transition-[max-height,opacity] duration-[280ms] ease-in-out ${
                    open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="pb-5 text-body text-ink/65">{faq.a}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
