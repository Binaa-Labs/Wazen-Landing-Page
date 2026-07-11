"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import { useLanguage } from "@/components/LanguageProvider";
import { fadeUp, photoReveal, staggerContainer, viewport } from "@/components/motion";
import Badge from "@/components/ui/Badge";
import BrowserFrame from "@/components/ui/BrowserFrame";
import Lightbox from "@/components/ui/Lightbox";
import { getShot } from "@/lib/screenshots";

/* Stage-2 redesign (D35): the four stacked symmetric blocks become one
   two-column editorial spread. Start column = the narrative: start-aligned
   header + numbered pillars (Latin digits, D12) with the hero's serif
   accent — Fraunces italic sage on EN, Tajawal 800 sage on AR, no italic
   and no Fraunces on Arabic EVER, keyed to the LIVE language state (the
   D18 hero mechanic; reuses the existing --font-serif instance) — + the
   bilingual badge. End column = layered collage, back-to-front: F-7
   duotone panel · coachProfile browser frame overlapping it · founder
   pull-quote card overlapping the frame's bottom corner — the stat-row
   overlap is DELIBERATE (the frame's lightbox keeps the full capture one
   click away). All insets logical; the quote border flips under RTL.

   Collage layers enter back-to-front with stepped delays on existing
   variant shapes (no new motion.ts vocabulary, §3). MotionConfig strips
   transforms but NOT delays, so the delays themselves are zeroed via
   useReducedMotion — reduced motion is opacity-only AND unsequenced. */

/* Product-register settle with a step delay (local variant — the CTA
   fadeUpDelayed precedent). */
const settleIn = (duration: number, delay: number): Variants => ({
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration, ease: [0.16, 1, 0.3, 1], delay },
  },
});

export default function WhyWazen() {
  const { t, lang } = useLanguage();
  const profile = getShot("coachProfile", lang);
  const reducedMotion = useReducedMotion();
  const frameDelay = reducedMotion ? 0 : 0.3;
  const quoteDelay = reducedMotion ? 0 : 0.55;

  /* Serif accent classes (D18): conditional on the live language state —
     the runtime toggle re-points <html> without navigation. */
  const serifAccent =
    lang === "en"
      ? "font-serif font-medium italic"
      : "font-extrabold";

  return (
    <section
      id="why-wazen"
      className="bg-bg px-6 py-section-compact-mobile md:py-section-compact"
    >
      <div className="mx-auto grid max-w-content items-start gap-12 lg:grid-cols-[minmax(0,44fr)_minmax(0,56fr)] lg:gap-18">
        {/* ── Start column: editorial narrative ─────────────────────── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {/* Start-aligned header built in-component: SectionHeader's
              align="left" is physical and out of this pass's touch list —
              logical alignment comes free from normal flow here. */}
          <motion.div variants={fadeUp}>
            <Badge variant="eyebrow" tone="primary">
              {t.why.eyebrow}
            </Badge>
            <h2 className="mt-4 text-h2 text-ink">{t.why.h2}</h2>
            <p className="mt-4 text-body-lg text-ink/60">
              {t.why.description}
            </p>
          </motion.div>

          {/* Index keys (learning #1): translated-string keys would remount
              these on language switch and they'd mount hidden inside the
              already-revealed parent. */}
          <div className="mt-11 flex flex-col gap-7">
            {t.why.pillars.map((pillar, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="grid grid-cols-[56px_1fr] items-start gap-4 sm:grid-cols-[64px_1fr]"
              >
                <span
                  aria-hidden
                  className={`pt-0.5 text-[2.4rem] leading-none text-secondary-dark ${serifAccent}`}
                >
                  {`0${i + 1}`}
                </span>
                <div>
                  <h3 className="text-h3 text-primary">{pillar.title}</h3>
                  <p className="mt-1.5 max-w-md text-body text-ink/60">
                    {pillar.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeUp} className="mt-10">
            <Badge variant="pill" tone="sage" className="px-5 py-2">
              {t.why.bilingualBadge}
            </Badge>
          </motion.div>
        </motion.div>

        {/* ── End column: layered collage (lg) / stacked flow (below) ── */}
        <div className="relative min-w-0 lg:h-[742px]">
          {/* Layer 1 — F-7 duotone panel (photography register) */}
          <motion.div
            variants={photoReveal}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="relative aspect-[3/2] overflow-hidden rounded-3xl shadow-lg lg:absolute lg:end-0 lg:top-0 lg:aspect-[4/5] lg:w-[62%]"
          >
            <Image
              src="/photos/f-7.webp"
              alt={t.why.regionalPhotoAlt}
              fill
              sizes="(min-width: 1024px) 420px, calc(100vw - 48px)"
              className="object-cover object-[50%_30%] lg:object-center"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-photo-duotone mix-blend-color"
            />
          </motion.div>

          {/* Layer 2 — coach-profile frame overlapping the photo (0.7s,
              +0.3s after it; delay zeroed under reduced motion).
              Mobile (2.2c.1, Option A): pulled-up overlap stack — the frame
              rides −64px over the photo's bottom band, start-aligned at 92%;
              flow layout, no absolute positioning, so AR text growth can
              never break it. max-lg-scoped: desktop stays pixel-identical. */}
          <motion.div
            variants={settleIn(0.7, frameDelay)}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="relative -mt-16 min-w-0 max-lg:z-[1] max-lg:w-[92%] max-lg:me-auto lg:absolute lg:start-0 lg:top-[172px] lg:mt-0 lg:w-[72%]"
          >
            <BrowserFrame url="app.wazen.fit/coach/karim">
              <Lightbox
                src={profile.src}
                alt={t.why.profileAlt}
                width={profile.width}
                height={profile.height}
                className="relative aspect-[16/10] w-full"
              >
                <Image
                  src={profile.src}
                  alt={t.why.profileAlt}
                  fill
                  sizes="(min-width: 1024px) 480px, calc(100vw - 48px)"
                  className="object-cover object-top dark:opacity-90"
                />
              </Lightbox>
            </BrowserFrame>
          </motion.div>

          {/* Layer 3 — founder pull-quote overlapping the frame's bottom
              corner; the covered stat row stays one lightbox-click away.
              Mobile (Option A): −48px over the frame's bottom, end-aligned
              at 88% — the stat-row overlap survives the collapse. */}
          <motion.div
            variants={settleIn(0.5, quoteDelay)}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="relative -mt-12 rounded-2xl border border-primary/10 border-s-4 border-s-secondary bg-surface p-6 shadow-xl max-lg:z-[2] max-lg:w-[88%] max-lg:ms-auto sm:p-7 lg:absolute lg:bottom-0 lg:end-[6%] lg:mt-0 lg:w-[66%]"
          >
            <Badge variant="eyebrow" tone="sage">
              {t.why.founderEyebrow}
            </Badge>
            <blockquote
              className={`mt-3.5 text-[1.02rem] leading-relaxed text-ink/80 ${
                lang === "en" ? "font-serif italic" : "font-extrabold"
              }`}
            >
              {t.why.founderQuote}
            </blockquote>
            <div className="mt-5 flex items-center gap-3">
              <span
                aria-hidden
                className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary font-display text-sm font-semibold text-white"
              >
                NS
              </span>
              <p className="text-sm text-ink/60">{t.why.founderName}</p>
            </div>
          </motion.div>

          {/* Collage annotation — small, bottom-start */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="relative mt-5 lg:absolute lg:bottom-3 lg:start-0 lg:mt-0 lg:w-[26%]"
          >
            <p className="text-caption leading-relaxed text-ink/55">
              {t.why.profileCaption}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
