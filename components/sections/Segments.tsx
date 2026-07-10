"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";

import { useLanguage } from "@/components/LanguageProvider";
import { photoReveal, viewport } from "@/components/motion";
import SectionHeader from "@/components/ui/SectionHeader";

/* Stage-2 redesign (D32): the three photo-top cards become an asymmetric
   mosaic of duotone photo panels with the copy ON the photo over a
   bottom scrim — the deliberate mini-hero echo (same three personas as the
   hero slider; both read t.segments.cards[i].title, so the labels
   verbatim-match by construction). Fitness (F-3) is the large panel;
   nutrition (F-5) + health (F-6) stack beside it. Panels are self-dark
   (photo + scrim) — identical in both themes.

   R1 (owner review requirement): each panel's bottom scrim must yield AA
   contrast for the copy over the LIGHTEST region of ITS photo, verified
   per photo with sampled ratios — hence per-panel scrim strengths below
   (F-5's light clipboard/table region is the known hard case). Scrims are
   horizontal-symmetric and bottom-anchored: direction-neutral, RTL-safe.

   Copy-on-photo panels are Segments-only on the page (§6 anti-uniformity
   contract; the divider's overlay is one line, not a copy block). */

/* Structural panel data — photo + per-panel scrim. Index-coupled to
   t.segments.cards for title/body; keys are structural ids (learning #1).
   The photos are decorative in this composition (alt="") — the on-photo
   copy carries the persona semantics; the photoAlt dictionary keys retire
   in the 2.2c i18n pass. */
const PANEL_META = [
  {
    id: "fitness",
    photoSrc: "/photos/f-3.webp",
    big: true,
    scrim:
      "bg-linear-to-t from-primary-darker/90 from-8% via-primary-darker/45 via-42% to-primary-darker/5",
  },
  {
    id: "nutrition",
    /* F-5's clipboard/table region is the page's lightest copy backdrop —
       strongest scrim of the three (R1). */
    photoSrc: "/photos/f-5.webp",
    big: false,
    scrim:
      "bg-linear-to-t from-primary-darker/95 from-12% via-primary-darker/60 via-48% to-primary-darker/10",
  },
  {
    id: "health",
    /* F-6's bright wall sits exactly behind the EN title's tail — the mid
       stop is the one that matters here (measured 4.01:1 at via-50%). */
    photoSrc: "/photos/f-6.webp",
    big: false,
    scrim:
      "bg-linear-to-t from-primary-darker/90 from-8% via-primary-darker/62 via-55% to-primary-darker/5",
  },
] as const;

/* Mosaic stagger — photography register: slower step than the default
   0.08 container so the three photoReveals read as a sequence. */
const mosaicStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

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
          variants={mosaicStagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mt-11 grid gap-3.5 md:mt-16 md:grid-cols-[1.15fr_1fr] md:gap-[18px]"
        >
          {PANEL_META.map((panel, i) => (
            <motion.div
              key={panel.id}
              variants={photoReveal}
              className={`group relative overflow-hidden rounded-3xl bg-primary-dark shadow-lg transition-shadow duration-300 hover:shadow-xl ${
                panel.big
                  ? "h-[300px] md:row-span-2 md:h-auto md:min-h-[584px]"
                  : "h-[240px] md:h-auto md:min-h-[283px]"
              }`}
            >
              {/* Hover = slow scale of the IMAGE inside the fixed frame —
                  CSS transform on the img itself, so it never fights the
                  panel's Framer entrance; motion-safe keeps it off under
                  reduced motion. */}
              <Image
                src={panel.photoSrc}
                alt=""
                fill
                sizes={
                  panel.big
                    ? "(min-width: 768px) 55vw, calc(100vw - 48px)"
                    : "(min-width: 768px) 45vw, calc(100vw - 48px)"
                }
                className="object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out motion-safe:group-hover:scale-[1.03]"
              />
              {/* Shared duotone + the panel's own bottom scrim (R1) */}
              <div
                aria-hidden
                className="absolute inset-0 bg-photo-duotone mix-blend-color"
              />
              <div aria-hidden className={`absolute inset-0 ${panel.scrim}`} />

              <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
                <div
                  aria-hidden
                  className="h-[3px] w-11 rounded-pill bg-secondary"
                />
                <h3 className="mt-3.5 text-h3 text-white">
                  {t.segments.cards[i].title}
                </h3>
                <p className="mt-2 max-w-[420px] text-body text-white/80">
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
