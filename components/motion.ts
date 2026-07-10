import type { Variants } from "framer-motion";

/* Shared motion vocabulary from the design spec — every section reuses these
   so reveal timing stays identical across the page. */

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

/* For photography (Pass C): photos scale in slowly instead of sliding, so
   imagery reads differently from UI frames and cards. */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 1.04 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ── Phase 2 hero vocabulary (Pass 2.1) ──────────────────────────────────
   Transform/opacity only. MotionConfig reducedMotion="user" strips the
   transform animations automatically: kenBurns renders static, railFill
   snaps to its full/empty state with no tween — exactly the specced
   reduced-motion fallbacks. Elements using these are keyed BY INDEX, never
   by translated strings (learning #1). */

/* Hero photo drift over the 6s persona dwell. */
export const kenBurns: Variants = {
  rest: { scale: 1 },
  active: { scale: [1.06, 1], transition: { duration: 6, ease: "linear" } },
};

/* Persona slide swap — slides are absolutely stacked, opacity-only. */
export const crossfade: Variants = {
  hidden: { opacity: 0, transition: { duration: 0.6, ease: "linear" } },
  visible: { opacity: 1, transition: { duration: 0.6, ease: "linear" } },
};

/* Persona/tab rails: scaleX fill from inline-start — pair with the
   `origin-left rtl:origin-right` utilities on the element. Duration matches
   the hero dwell so the advance fires exactly as the rail completes. */
export const railFill: Variants = {
  empty: { scaleX: 0, transition: { duration: 0 } },
  fill: { scaleX: 1, transition: { duration: 6, ease: "linear" } },
};

/* ── Stage-2 vocabulary (Pass 2.2a, D26–D39) ─────────────────────────────
   Same rules as above: transform/opacity only, index keys, MotionConfig
   reducedMotion="user" degrades transforms to opacity-only automatically. */

/* Photography register (0.9s+): the slower sibling of scaleIn — interleave
   photos and photo backdrops read slower than UI frames by design. */
export const photoReveal: Variants = {
  hidden: { opacity: 0, scale: 1.08 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

/* Connector/spine lines draw in via scale, NOT SVG dash offsets — dash
   animation would break the transform/opacity-only rule. Pair with
   `origin-left rtl:origin-right` (horizontal) or `origin-top` (vertical);
   the axis is chosen by which variant key the element animates to. */
export const drawLine: Variants = {
  hidden: { scaleX: 0, scaleY: 1, opacity: 1 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
  hiddenY: { scaleY: 0, scaleX: 1, opacity: 1 },
  visibleY: {
    scaleY: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export const viewport = { once: true, margin: "-80px" } as const;
