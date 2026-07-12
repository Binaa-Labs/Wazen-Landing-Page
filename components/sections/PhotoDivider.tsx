"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { useLanguage } from "@/components/LanguageProvider";
import { photoReveal, viewport } from "@/components/motion";

/* Photo divider ① (Stage 2, D30): a pure <figure> band between Features and
   HowItWorks — it restores people after the page's longest people-free run.
   No section semantics, no id, no heading; the one overlay line REUSES
   t.features.tabs[1].caption (sage rail accent) — no new strings by design
   (§2.3). The whole band enters with photoReveal and nothing else;
   MotionConfig degrades it to opacity-only under reduced motion.

   D-1 landed in Pass 2.3a as a v1 with an owner-accepted narrative
   mismatch (battle-ropes action, not the resting-with-phone brief — see
   the 2.3a D-row; D15-swappable class). The subject sits right-of-center
   in the 1920×822 file; object-position keeps him reading at the 340/260
   band heights. Decorative (alt="" — the overlay line carries the
   semantics, D42 class). Band is self-dark — identical in both themes. */

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
        <Image
          src="/photos/divider-d1.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[68%_35%]"
        />
        {/* Shared duotone + scrim (horizontally symmetric, RTL-safe —
            the caption sits bottom-START, which is the subject side under
            RTL, so the veil + bottom stops are tuned for the D-1 photo's
            brightness: strengthened at the 2.3a review after the raw
            photo washed out the band and AR caption contrast. */}
        <div
          aria-hidden
          className="absolute inset-0 bg-photo-duotone mix-blend-color"
        />
        <div aria-hidden className="absolute inset-0 bg-primary-dark/35" />
        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-t from-primary-darker/85 via-primary-dark/45 via-45% to-primary-dark/55"
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
