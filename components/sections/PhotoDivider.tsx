"use client";

import { motion } from "framer-motion";

import { useLanguage } from "@/components/LanguageProvider";
import { photoReveal, viewport } from "@/components/motion";
import PhotoPlaceholder from "@/components/ui/PhotoPlaceholder";

/* Photo divider ① (Stage 2, D30): a pure <figure> band between Features and
   HowItWorks — it restores people after the page's longest people-free run.
   No section semantics, no id, no heading; the one overlay line REUSES
   t.features.tabs[1].caption (sage rail accent) — no new strings by design
   (§2.3). The whole band enters with photoReveal and nothing else;
   MotionConfig degrades it to opacity-only under reduced motion.

   The D-1 photo (man resting between sets, phone in hand — brief activated
   in PHASE2-PHOTO-SOURCING.md) is still unsourced, so the slot renders the
   branded PhotoPlaceholder until Pass 2.3 (approved interim per D30). The
   shared duotone + scrim already sit above it, so the photo swap is a
   drop-in. Band is self-dark — identical in both themes. */

export default function PhotoDivider() {
  const { t } = useLanguage();

  return (
    <figure className="relative h-[260px] overflow-hidden bg-primary-dark md:h-[340px]">
      <motion.div
        variants={photoReveal}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="absolute inset-0"
      >
        {/* D-1 slot. The placeholder bakes in rounded corners; oversizing it
            slightly pushes them under the band's overflow-hidden so the
            interim render stays truly full-bleed. */}
        <div className="absolute -inset-2">
          {/* h/w-full (not absolute): the placeholder root keeps its own
              position and its children are all absolutely positioned, so it
              must be given its box explicitly or it collapses to 0 height. */}
          <PhotoPlaceholder
            label="D-1"
            hint="Man resting between sets, phone in hand"
            tone="dark"
            className="h-full w-full"
          />
        </div>
        {/* Shared duotone + scrim (darkest at the copy's bottom edge;
            horizontally symmetric, RTL-safe) */}
        <div
          aria-hidden
          className="absolute inset-0 bg-photo-duotone mix-blend-color"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-t from-primary-darker/80 via-primary-dark/35 via-45% to-primary-dark/55"
        />

        {/* One overlay line — reused copy, not a copy block (§6) */}
        <figcaption className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-content px-6 pb-8 md:pb-11">
            <div aria-hidden className="h-[3px] w-11 rounded-pill bg-secondary" />
            <p className="mt-4 max-w-[560px] font-display text-xl font-semibold tracking-tight text-white md:text-[1.6rem] md:leading-snug">
              {t.features.tabs[1].caption}
            </p>
          </div>
        </figcaption>
      </motion.div>
    </figure>
  );
}
