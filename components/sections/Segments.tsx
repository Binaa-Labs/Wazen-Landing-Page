"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { useLanguage } from "@/components/LanguageProvider";
import { fadeUp, scaleIn, staggerContainer, viewport } from "@/components/motion";
import SectionHeader from "@/components/ui/SectionHeader";

/* Structural card data — icon + §7 sourced photo. Index-coupled to
   t.segments.cards for title/body/photoAlt. */
const CARD_META = [
  {
    id: "fitness",
    photoSrc: "/photos/f-3.webp",
    icon: (
      // Dumbbell
      <>
        <path d="M7 8v8M4.5 9.5v5M17 8v8M19.5 9.5v5" />
        <path d="M7 12h10" />
      </>
    ),
  },
  {
    id: "nutrition",
    photoSrc: "/photos/f-5.webp",
    icon: (
      // Apple
      <>
        <path d="M12 7c-3.5-2-7 .5-7 4.5 0 3.6 2.6 7 5 7 .9 0 1.3-.5 2-.5s1.1.5 2 .5c2.4 0 5-3.4 5-7C19 7.5 15.5 5 12 7Z" />
        <path d="M12 7c0-2 1.5-3.5 3-4" />
      </>
    ),
  },
  {
    id: "health",
    photoSrc: "/photos/f-6.webp",
    icon: (
      // Heart + pulse
      <>
        <path d="M12 20.5C7 16.5 3.5 13 3.5 9.3 3.5 6.4 5.7 4.5 8 4.5c1.6 0 3.1.8 4 2.2.9-1.4 2.4-2.2 4-2.2 2.3 0 4.5 1.9 4.5 4.8 0 3.7-3.5 7.2-8.5 11.2Z" />
        <path d="M7 12h3l1.5-2.5 2 4L15 11h2" />
      </>
    ),
  },
];

export default function Segments() {
  const { t } = useLanguage();

  return (
    <section
      id="segments"
      className="bg-bg px-6 py-section-compact-mobile md:py-section-compact"
    >
      <div className="mx-auto max-w-content">
        <SectionHeader
          eyebrow={t.segments.eyebrow}
          title={t.segments.h2}
          description={t.segments.description}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mt-14 grid gap-6 md:grid-cols-3"
        >
          {CARD_META.map((card, i) => (
            <motion.div
              key={card.id}
              variants={fadeUp}
              whileHover={{
                y: -4,
                boxShadow: "var(--shadow-lg)",
                transition: { duration: 0.25, ease: "easeOut" },
              }}
              className="flex flex-col overflow-hidden rounded-card border border-primary/10 bg-surface shadow-sm"
            >
              <motion.div
                variants={scaleIn}
                className="relative aspect-[3/2] overflow-hidden"
              >
                <Image
                  src={card.photoSrc}
                  alt={t.segments.cards[i].photoAlt}
                  fill
                  sizes="(min-width: 768px) 33vw, calc(100vw - 48px)"
                  className="object-cover"
                />
              </motion.div>
              <div className="flex flex-1 flex-col gap-2.5 p-7">
                <span className="flex size-11 items-center justify-center rounded-full bg-primary-light text-primary">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-5"
                    aria-hidden
                  >
                    {card.icon}
                  </svg>
                </span>
                <h3 className="mt-1.5 text-h3 text-ink">
                  {t.segments.cards[i].title}
                </h3>
                <p className="text-body text-ink/60">
                  {t.segments.cards[i].body}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
