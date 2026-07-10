"use client";

import { motion, type Variants } from "framer-motion";

import { useLanguage } from "@/components/LanguageProvider";
import { drawLine, fadeUp, staggerContainer, viewport } from "@/components/motion";
import CaptureFragment, {
  type FragmentRegion,
} from "@/components/ui/CaptureFragment";
import PhoneShot from "@/components/ui/PhoneShot";
import SectionHeader from "@/components/ui/SectionHeader";

/* Stage-2 redesign (D31): the three identical cards become a zigzag timeline
   along a vertical sage spine — the page's vertical drawLine moment. Steps
   alternate sides on desktop (logical grid columns, so RTL mirrors free);
   on mobile the spine moves to the start edge with node + title beside it
   and the visual below. Each step's visual is its OWN kind of object
   (anti-uniformity inside the section, §6): a frameless invite-modal
   fragment, the one tilted phone this section is allowed, and a frameless
   wide chart strip. Rotations are static CSS on inner wrappers — Framer
   owns the motion elements' transforms. Node digits stay Latin in both
   locales (D12). Copy verbatim from t.how, read BY INDEX (learning #1). */

/* Fragment regions — physical percentages per locale, calibrated against
   each locale's own capture (AR captures are native-RTL re-captures, not
   mirrors; same convention as the Features chips). */

/* The Invite_Client dialog is viewport-centered in both captures, so the
   two locales' regions genuinely coincide: modal spans ~32.5–67.5% × w,
   ~31.4–68.6% × h in both. Crop a hair inside the modal edges so the
   fragment is all dialog surface — its own rounded frame replaces the
   capture's corners. */
const INVITE_MODAL_REGION: { en: FragmentRegion; ar: FragmentRegion } = {
  en: { x: 33, y: 31.9, w: 34 },
  ar: { x: 33, y: 31.9, w: 34 },
};

/* Adherence-trend card of Analytics_Tab_1 (§5 ledger: chart region). EN
   anchors to the card's start edge — title + chart, the strip's end edge
   cropping mid-chart like the approved mock. The AR card is proportionally
   taller (title would fall off a same-shape box), so its box is wider and
   end-anchored for RTL: title AND full chart incl. date labels stay in. */
const CHART_STRIP_REGION: { en: FragmentRegion; ar: FragmentRegion } = {
  en: { x: 26.8, y: 34.6, w: 52.5 },
  ar: { x: 15.4, y: 28.8, w: 58.1 },
};

/* Node pop — copy register (0.5s), scale is stripped to opacity-only under
   MotionConfig reducedMotion="user". */
const nodePop: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

/* Visuals settle at the product register (0.7s, opacity + small translate) —
   between the copy's 0.5s and the photography 0.9s, same slot Problem's
   fragment uses. */
const visualSettle: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

/* Structural step data — number only; the visuals are bespoke per step and
   rendered by index below. Index-coupled to t.how.steps. */
const STEP_NUMBERS = ["01", "02", "03"] as const;

export default function HowItWorks() {
  const { t } = useLanguage();

  return (
    <section
      id="how-it-works"
      className="overflow-hidden bg-bg px-6 py-section-compact-mobile md:py-section-compact"
    >
      <div className="mx-auto max-w-content">
        <SectionHeader
          eyebrow={t.how.eyebrow}
          title={t.how.h2}
          description={t.how.description}
        />

        <div className="relative mx-auto mt-12 max-w-[980px] md:mt-18">
          {/* ── Spine — draws top→bottom (drawLine, 0.8s) once the timeline
                 enters. Center axis on desktop (direction-neutral), start
                 edge on mobile. The position wrapper is static; Framer owns
                 only the inner element's transform (scaleY). Reduced motion:
                 MotionConfig strips the transform — the line renders static
                 at full height. */}
          <div
            aria-hidden
            className="absolute bottom-2 top-2 start-[19px] w-0.5 md:start-1/2 md:ms-[-1px]"
          >
            <motion.div
              variants={drawLine}
              initial="hiddenY"
              whileInView="visibleY"
              viewport={viewport}
              className="h-full w-full origin-top bg-linear-to-b from-secondary-dark to-secondary-dark/35"
            />
          </div>

          {STEP_NUMBERS.map((number, i) => {
            /* Desktop zigzag: even steps put copy on the start side and the
               visual on the end side; odd steps mirror. Logical grid
               placement — RTL flips the whole composition for free. */
            const copySide = i % 2 === 0;
            return (
              <motion.div
                key={number}
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                className="grid grid-cols-[60px_1fr] items-start gap-y-4 md:grid-cols-[1fr_96px_1fr] md:items-center [&+&]:mt-12 md:[&+&]:mt-16"
              >
                {/* Node — DOM-first so the stagger reads node → copy →
                    visual on both sides. ring-bg masks the spine behind
                    the circle. */}
                <motion.div
                  variants={nodePop}
                  className="col-start-1 row-start-1 md:col-start-2 md:justify-self-center"
                >
                  <span className="relative z-[1] flex size-10 items-center justify-center rounded-full border-2 border-secondary-dark bg-surface font-display text-[0.95rem] font-bold text-secondary-dark ring-6 ring-bg md:size-[46px] md:text-base md:ring-8">
                    {number}
                  </span>
                </motion.div>

                <motion.div
                  variants={fadeUp}
                  className={`col-start-2 row-start-1 pt-1.5 md:pt-0 ${
                    copySide
                      ? "md:col-start-1 md:justify-self-end md:text-end"
                      : "md:col-start-3 md:justify-self-start md:text-start"
                  }`}
                >
                  <h3 className="text-h3 text-ink">{t.how.steps[i].title}</h3>
                  <p className="mt-2.5 max-w-[400px] text-body text-ink/60">
                    {t.how.steps[i].body}
                  </p>
                </motion.div>

                <motion.div
                  variants={visualSettle}
                  className={`col-start-2 row-start-2 mt-2 md:row-start-1 md:mt-0 ${
                    copySide
                      ? "md:col-start-3 md:justify-self-start"
                      : "md:col-start-1 md:justify-self-end"
                  }`}
                >
                  {/* Static tilts live on inner wrappers — never animated,
                      never on the Framer element. */}
                  {i === 0 && (
                    <div className="w-full max-w-[340px] -rotate-2 md:w-[380px] md:max-w-none">
                      <CaptureFragment
                        name="coachInvite"
                        region={INVITE_MODAL_REGION}
                        aspect="aspect-[3/2]"
                        alt={t.how.steps[0].alt}
                        sizes="1120px"
                        className="rounded-2xl bg-surface shadow-xl"
                      />
                    </div>
                  )}
                  {i === 1 && (
                    <div className="w-[168px] rotate-[3.5deg] md:w-[200px]">
                      {/* The 9/19 PhoneFrame window is the D37 crop — keep
                          it (and PhoneShot's built-in lightbox). */}
                      <PhoneShot
                        name="clientMobilePlans"
                        alt={t.how.steps[1].alt}
                        sizes="200px"
                      />
                    </div>
                  )}
                  {i === 2 && (
                    <div className="w-full max-w-[360px] -rotate-[1.5deg] md:w-[420px] md:max-w-none">
                      <CaptureFragment
                        name="coachAnalytics"
                        region={CHART_STRIP_REGION}
                        aspect="aspect-[84/47]"
                        alt={t.how.steps[2].alt}
                        sizes="820px"
                        className="rounded-2xl bg-surface shadow-xl"
                      />
                    </div>
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
