"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";

import { useLanguage } from "@/components/LanguageProvider";
import { drawLine, fadeUp, photoReveal, viewport } from "@/components/motion";
import Badge from "@/components/ui/Badge";
import CaptureFragment from "@/components/ui/CaptureFragment";
import SectionHeader from "@/components/ui/SectionHeader";

/* Stage-2 redesign (D26/D27): the twin comparison cards become one canvas —
   a chaos field of scattered oldWay notes converging along a drawn line into
   a single calm zone: one REAL capture fragment (the dashboard's attention
   queue) plus the wazenWay rows. F-2 anchors the chaos half as a duotone
   backdrop (and appears on mobile for the first time); a sage glow sits
   behind the calm half; the ghost wordmark stays. */

/* Spec: 60ms note/row stagger (copy register) */
const listStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

/* Fragment enters at the product register (0.7s) — between the notes' 0.5s
   fadeUp and the photo's 0.9s photoReveal. */
const fragmentReveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

/* Chevron lands after the line finishes drawing (drawLine = 0.8s). */
const chevronIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3, delay: 0.75 } },
};

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-3"
      aria-hidden
    >
      <path d="m5 13 4 4L19 7" />
    </svg>
  );
}

/* Static rotations/offsets for the chaos notes. Rotation lives on an INNER
   div: Framer owns the motion wrapper's transform (fadeUp animates y), so a
   rotate class on the same element would be stomped mid-animation. Rotations
   are physical and direction-neutral; offsets use logical margins. */
const NOTE_POSE = [
  "-rotate-[4deg] w-[86%] lg:w-[88%]",
  "rotate-[2.5deg] w-[86%] lg:w-[88%] ms-auto -mt-2",
  "-rotate-2 w-[86%] lg:w-[88%] -mt-2",
  "rotate-[3.5deg] w-[86%] lg:w-[88%] ms-auto -mt-2",
];

/* Attention-queue region of the coach dashboard capture, per locale.
   PHYSICAL percentages calibrated against each locale's own capture (the AR
   capture is a native-RTL re-capture, not a mirror — see CaptureFragment).
   AR values verified visually in the 2.2a screenshot pass. */
const QUEUE_REGION = {
  en: { x: 22, y: 38, w: 41 },
  /* AR right edge extends to 79.5% — the row cards end at ~78% and the
     queue panel's own padding runs to a divider at 80%; at w:41 the crop
     sliced the cards' start-side edge/accent bars flush (owner defect
     report — read as a viewport clip on mobile where the frame sits 24px
     from the edge). AR-only: the EN region always carried this margin. */
  ar: { x: 37, y: 38, w: 42.5 },
};

export default function Problem() {
  const { t } = useLanguage();

  return (
    <section
      id="problem"
      className="relative overflow-hidden bg-primary-dark px-6 py-section-mobile md:py-section"
    >
      {/* Backdrop layer 1 — F-2 anchors the chaos half (start side; a top
          band on mobile, where this section previously had no people at
          all). Decorative at this opacity: empty alt, aria-hidden. */}
      <motion.div
        aria-hidden
        variants={photoReveal}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="absolute inset-x-0 top-0 h-[42%] lg:inset-y-0 lg:h-auto lg:end-[45%]"
      >
        <Image
          src="/photos/f-2.webp"
          alt=""
          fill
          sizes="(min-width: 1024px) 55vw, 100vw"
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-photo-duotone mix-blend-color" />
        {/* Fade the photo back into the band: vertical on mobile, toward
            the calm side on desktop (flips for RTL). */}
        <div className="absolute inset-0 bg-linear-to-b from-primary-dark/30 via-primary-dark/80 to-primary-dark lg:bg-linear-to-r lg:rtl:bg-linear-to-l" />
      </motion.div>
      {/* Backdrop layer 2 — sage glow behind the calm half */}
      <div
        aria-hidden
        className="absolute -end-[10%] top-[40%] hidden h-[620px] w-[720px] rounded-full bg-radial from-secondary/15 to-transparent to-70% lg:block"
      />
      {/* Backdrop layer 3 — the ghost wordmark stays, repositioned to the
          bottom-start corner, edge-clipped (owner pick "Option C" at the
          2.2a amendment review: centered it sat half-occluded between the
          notes and the fragment, reading as an artifact). Local span rather
          than the shared GhostWordmark: CTA keeps the centered treatment.
          Logical `start` — mirrors under RTL with the chaos half. */}
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-[1.5%] start-[2%] z-0 select-none whitespace-nowrap font-arabic text-[clamp(11rem,18vw,16rem)] font-extrabold leading-none text-white/4 dark:text-white/6"
      >
        وازن
      </span>

      <div className="relative z-[1] mx-auto max-w-content">
        <SectionHeader
          onDark
          title={t.problem.h2}
          description={t.problem.description}
        />

        {/* items-start (owner rebalance): both halves hang from the same
            top line, so the scaled-up chaos cluster reads as equal weight
            to the calm fragment instead of floating below its midpoint. */}
        <div className="mt-16 grid gap-8 lg:grid-cols-[minmax(0,1fr)_120px_minmax(0,1.05fr)] lg:items-start lg:gap-0">
          {/* ── Chaos half ─────────────────────────────────────────── */}
          <div>
            <Badge variant="eyebrow" tone="error">
              {t.problem.oldWayHeading}
            </Badge>
            {/* Index keys, deliberately: keying motion elements by translated
                strings remounts them on language switch, and children that
                remount inside an already-revealed `once` parent mount at
                "hidden" and never receive the variant propagation again —
                they stay invisible. (This section is where that bug first
                shipped; the chaos notes below inherit the same rule.) */}
            {/* The desktop converge connector is anchored to THIS notes
                cluster (absolute, start-full into the 120px gap column,
                top-1/2): it must read as departing from the notes' midpoint
                regardless of how tall the calm column is or how the locale's
                strings wrap — grid-row centering tracked the taller calm
                column and left the arrow below the cluster (owner review). */}
            <div className="relative">
              <motion.div
                variants={listStagger}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                className="mt-6"
              >
                {t.problem.oldWay.map((item, i) => (
                  <motion.div key={i} variants={fadeUp} className={NOTE_POSE[i]}>
                    <div className="rounded-xl bg-surface/95 p-4 shadow-lg lg:p-5">
                      <p className="flex items-center gap-2.5 font-display text-[0.95rem] font-semibold text-ink lg:text-[1.02rem]">
                        <span
                          aria-hidden
                          className="size-2 shrink-0 rounded-full bg-error"
                        />
                        {item.title}
                      </p>
                      <p className="mt-1 text-caption leading-relaxed text-ink/60">
                        {item.body}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* ── Converge connector (R2: the narrative spine — bold, full
                     gap column) — drawLine, transform-only; MotionConfig
                     renders it static under reduced motion. ────────────── */}
              <div
                aria-hidden
                className="absolute start-full top-1/2 hidden w-[120px] -translate-y-1/2 lg:block"
              >
                {/* feeders: static, angled from the chaos side */}
                <span className="absolute -top-6 start-0 w-[70%] rotate-[10deg] border-t-2 border-dashed border-secondary/40 rtl:-rotate-[10deg]" />
                <span className="absolute -bottom-6 start-0 w-[70%] -rotate-[10deg] border-t-2 border-dashed border-secondary/40 rtl:rotate-[10deg]" />
                <motion.div
                  variants={drawLine}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewport}
                  className="h-[3px] w-full origin-left rounded-pill bg-secondary rtl:origin-right"
                />
                <motion.span
                  variants={chevronIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewport}
                  className="absolute -end-0.5 top-1/2 -translate-y-1/2 text-secondary rtl:rotate-180"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-5"
                  >
                    <path d="m9 5 7 7-7 7" />
                  </svg>
                </motion.span>
              </div>
            </div>
          </div>
          {/* Mobile: the same line, vertical (direction-neutral) */}
          <div aria-hidden className="flex justify-center lg:hidden">
            <div className="relative h-16">
              <motion.div
                variants={drawLine}
                initial="hiddenY"
                whileInView="visibleY"
                viewport={viewport}
                className="h-full w-[3px] origin-top rounded-pill bg-secondary"
              />
              <motion.span
                variants={chevronIn}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 text-secondary"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-5 rotate-90"
                >
                  <path d="m9 5 7 7-7 7" />
                </svg>
              </motion.span>
            </div>
          </div>

          {/* ── Calm half — pinned to column 3: the middle 120px column is
                 now pure spacing (the desktop connector anchors to the notes
                 cluster and overflows into it) ─────────────────────────── */}
          <div className="lg:col-start-3">
            <Badge variant="eyebrow" tone="sage">
              {t.problem.wazenWayHeading}
            </Badge>
            {/* ONE real fragment — the attention queue — as the destination
                of the converge line. Decorative (aria-hidden inside
                CaptureFragment): the rows below carry the claims. */}
            <motion.div
              variants={fragmentReveal}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="mt-6"
            >
              <CaptureFragment
                name="coachDashboard"
                region={QUEUE_REGION}
                aspect="aspect-[8/5]"
                sizes="(min-width: 1024px) 1300px, 240vw"
                className="rounded-2xl border border-secondary/40 shadow-xl ring-[6px] ring-secondary/10"
              />
            </motion.div>
            <motion.div
              variants={listStagger}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="mt-7 grid gap-3.5"
            >
              {t.problem.wazenWay.map((item, i) => (
                /* index keys — see the comment on the chaos notes */
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="flex items-baseline gap-3"
                >
                  <span className="flex size-6 shrink-0 translate-y-1 items-center justify-center rounded-full bg-secondary/15 text-secondary">
                    <CheckIcon />
                  </span>
                  <p className="text-body leading-relaxed">
                    <span className="font-medium text-white">
                      {item.title}
                    </span>{" "}
                    <span className="text-white/60">{item.body}</span>
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
