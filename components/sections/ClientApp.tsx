"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import { useLanguage } from "@/components/LanguageProvider";
import {
  fadeUp,
  phoneFloat,
  photoReveal,
  staggerContainer,
  viewport,
} from "@/components/motion";
import Badge from "@/components/ui/Badge";
import PhoneShot from "@/components/ui/PhoneShot";
import SectionHeader from "@/components/ui/SectionHeader";
import type { ShotName } from "@/lib/screenshots";

/* Stage-2 redesign (D33/D34): the teal-mist band becomes the page's
   mid-point DARK beat (primary-dark → primary-darker, identical in both
   themes — the Problem/CTA precedent) with the D-2 photo as a low-opacity
   duotone backdrop behind three phones. The third phone carries the
   white-label story: in-app coach branding (logo, name, theme) is REAL
   today (D34 truth boundary) and ships with the real demo capture (2.3b) —
   the FICTIONAL "Apex Coaching" brand; never named, quoted, or captioned
   as a real customer.

   Phones enter staggered at the product register, then idle on phoneFloat
   (§3) — the page's only loop besides the rail timers; MotionConfig strips
   the transform loop under reduced motion (float OFF). Static ±4° tilts
   live on inner divs (2.2a pattern — Framer owns the motion wrappers'
   transforms); tilt angles are direction-neutral and the row order flips
   logically under RTL. */

/* Structural phone data — keys/tilts/caption indices, index-coupled to
   nothing translated (learning #1). Captions follow their captures:
   the check-in capture keeps "Weekly check-in" (phones[1]) and the home
   capture keeps "Today's plan" (phones[0]) — the dictionary order didn't
   change, the ROW order did (mock: check-in · home raised · white-label).
   phones[2] ("Progress") loses its consumer here and is deliberately NOT
   retired — the Req-10 i18n list is exhaustive; flagged in PROJECT.md. */
const PHONE_META: {
  id: string;
  shot: ShotName;
  /** index into t.clientApp.phones; undefined → the D34 white-label caption */
  captionIndex?: number;
  tilt: string;
  raised?: boolean;
}[] = [
  { id: "checkin", shot: "clientMobileCheckin", captionIndex: 1, tilt: "-rotate-4" },
  { id: "home", shot: "clientMobileHome", captionIndex: 0, tilt: "", raised: true },
  { id: "white-label", shot: "clientMobileWhiteLabel", tilt: "rotate-4" },
];

export default function ClientApp() {
  const { t } = useLanguage();
  /* Float OFF entirely under reduced motion (§2.6) — gating the animate
     prop, not just the tween: MotionConfig alone would still APPLY the
     final keyframe as a static translateY(-4px). Same explicit-gate
     precedent as the Features auto-advance (D21). */
  const reducedMotion = useReducedMotion();

  /* D34 Option A string stays byte-verbatim in the dictionary; the bold
     lead is a PRESENTATIONAL split on the first " — " (both locales carry
     it), reassembled exactly around the same separator. */
  const caption = t.clientApp.whiteLabelCaption;
  const dashAt = caption.indexOf(" — ");
  const captionLead = dashAt === -1 ? caption : caption.slice(0, dashAt);
  const captionRest = dashAt === -1 ? "" : caption.slice(dashAt);

  return (
    <section
      id="client-app"
      className="relative overflow-hidden bg-linear-to-b from-primary-dark to-primary-darker px-6 py-section-compact-mobile text-white md:py-section-compact"
    >
      {/* D-2 backdrop (landed 2.3a as an owner-accepted v1 — deadlift
          close-up, deviates from the home-post-workout brief; see the 2.3a
          D-row, D15-swappable). R3 RESOLVED here: opacity judged against
          the real photo via the 2.3a triptych (45/55/65 renders, owner
          pick recorded in the same D-row), and the two-white-phones-read-
          clinical concern was reassessed against it at the 2.3a review.
          Decorative texture under duotone + scrim: alt="". */}
      <motion.div
        aria-hidden
        variants={photoReveal}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="absolute inset-0 opacity-55"
      >
        <Image
          src="/photos/clientapp-d2.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-photo-duotone mix-blend-color" />
      </motion.div>
      {/* Backdrop scrim — static, deepening toward the section's bottom */}
      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-b from-primary-dark/55 via-primary-dark/80 to-primary-darker/90"
      />

      <div className="relative z-[1] mx-auto max-w-content">
        <SectionHeader
          eyebrow={t.clientApp.eyebrow}
          eyebrowTone="sage"
          onDark
          title={t.clientApp.h2}
          description={t.clientApp.description}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mx-auto mt-12 flex max-w-3xl items-end justify-center gap-3 sm:gap-10 md:mt-16"
        >
          {PHONE_META.map((p, i) => (
            <motion.div
              key={p.id}
              variants={fadeUp}
              className={`flex w-full max-w-[190px] flex-col items-center gap-3 sm:gap-4 ${
                p.raised ? "mb-4 sm:mb-7" : ""
              }`}
            >
              {/* Float wrapper is its own motion element so the loop never
                  fights the entrance above or the static tilt below. */}
              <motion.div
                variants={phoneFloat}
                animate={reducedMotion ? undefined : "float"}
                custom={i}
                className="w-full"
              >
                <div className={p.tilt || undefined}>
                  {/* Phone 3 = the real white-label capture (2.3b, D34
                      closed): fictional "Apex Coaching" branding applied
                      in-app. Same PhoneShot lightbox as phones 1–2; alt =
                      the phone's caption, consistent with the others (the
                      D34 claim string for this one). */}
                  <PhoneShot
                    name={p.shot}
                    alt={
                      p.captionIndex !== undefined
                        ? t.clientApp.phones[p.captionIndex]
                        : t.clientApp.whiteLabelCaption
                    }
                    sizes="190px"
                  />
                </div>
              </motion.div>
              {p.captionIndex !== undefined ? (
                <p className="text-center text-[0.68rem] font-medium text-white/65 sm:text-caption">
                  {t.clientApp.phones[p.captionIndex]}
                </p>
              ) : (
                <p className="max-w-[220px] text-center text-[0.68rem] text-white/65 sm:text-caption">
                  <b className="font-semibold text-secondary-pale">
                    {captionLead}
                  </b>
                  {captionRest}
                </p>
              )}
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mt-10 text-center md:mt-14"
        >
          <Badge variant="pill" tone="sage" className="px-5 py-2">
            {t.clientApp.pwaChip}
          </Badge>
        </motion.div>
      </div>
    </section>
  );
}
