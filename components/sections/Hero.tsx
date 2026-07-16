"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import { useLanguage } from "@/components/LanguageProvider";
import { crossfade, kenBurns } from "@/components/motion";
import Button from "@/components/ui/Button";
import { APP_URLS } from "@/lib/links";

/* Hero Option A (D17): full-bleed photography + persona slider. The Phase 1
   dashboard composite lives in ProductProof.tsx now.

   Persona slides are structural and INDEX-COUPLED to t.segments.cards —
   labels render straight from segments.cards[i].title so the hero and the
   Segments band can never drift apart. H-series photos are per-persona
   environment scenes WITHOUT people (owner pivot from the person-in-frame
   brief, 2.3a — partial supersession of D22; people stay on the page via
   D-1/F-3/F-5/F-6/F-7). H-1 is a 1920×1280 landscape (stock, v1 swap at
   the 2.3a gate — see the gate D-row): at 16:9 desktop it shows nearly
   full-frame; portrait phones keep ~31% of its width, so X anchors the
   dumbbell-rack side. H-2/H-3 are left-weighted 4:5 masters: desktop
   keeps their full width (Y picks the band), phones keep ~57% (X picks
   the subject side). NEVER mirror these files — embossed lettering. */
const PERSONAS = [
  /* Slide-1 mobile X is owner-picked from the 2.3b candidate renders;
     desktop (md+) keeps the gate-approved 65% (full-frame at 16:9, X
     near-inert there anyway). */
  { src: "/photos/hero-h1-fitness.webp", position: "object-[75%_50%] md:object-[65%_50%]" },
  { src: "/photos/hero-h2-nutrition.webp", position: "object-[30%_50%]" },
  { src: "/photos/hero-h3-health.webp", position: "object-[28%_55%]" },
] as const;

/* Per-persona dwell before auto-advance (D29's page rhythm); the 0.6s
   crossfade overlaps the start of the next dwell. */
const DWELL_MS = 6000;

export default function Hero() {
  const { t, lang } = useLanguage();
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  /* Monotonic activation counter: every activation (auto-advance, manual
     click, even re-clicking the active persona) bumps it and re-arms the
     6s timer. The click-REBASE (not stop) is ruled correct (D54): decorative
     rotation re-bases on interaction, content rotation stops (cf. D21). */
  const [cycle, setCycle] = useState(0);

  const select = (i: number) => {
    setActive(i);
    setCycle((c) => c + 1);
  };

  /* Auto-rotation. Every activation bumps `cycle`, so the timer resets on
     manual clicks too (including re-clicking the active persona). Reduced
     motion: no rotation at all — slide 1 stays static and the labels become
     plain manual tabs. */
  useEffect(() => {
    if (reducedMotion) return;
    const id = setTimeout(() => {
      setActive((i) => (i + 1) % PERSONAS.length);
      setCycle((c) => c + 1);
    }, DWELL_MS);
    return () => clearTimeout(id);
  }, [cycle, reducedMotion]);

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-primary-darker">
      {/* ── Photo layers (decorative) ─────────────────────────────────── */}
      <div aria-hidden className="absolute inset-0">
        {PERSONAS.map((p, i) => (
          /* Slides keyed by index, never by translated label (learning #1) */
          <motion.div
            key={i}
            variants={crossfade}
            initial={false}
            animate={i === active ? "visible" : "hidden"}
            transition={reducedMotion ? { duration: 0 } : undefined}
            className="absolute inset-0"
          >
            {/* Slide 1 mounts already active, and initial={false} would
                resolve the kenBurns keyframes to their FINAL value — the
                first dwell sat fully static (D54 R15). The explicit initial
                pre-paints slide 1 at the drift's start (SSR inline style),
                so hydration plays the same 1.06→1 drift every other slide
                gets, with no pop. Reduced motion: the motion-reduce
                !important override pins slide 1 to no transform from first
                paint (the SSR inline scale would otherwise flash before
                MotionConfig snaps it) — fully static, as before. */}
            <motion.div
              variants={kenBurns}
              initial={i === 0 ? { scale: 1.06 } : false}
              animate={i === active ? "active" : "rest"}
              className="absolute inset-0 motion-reduce:transform-none!"
            >
              <Image
                src={p.src}
                alt=""
                fill
                preload={i === 0}
                sizes="100vw"
                className={`object-cover ${p.position}`}
              />
            </motion.div>
          </motion.div>
        ))}

        {/* Teal duotone cast — keeps any sourced photo in brand */}
        <div className="absolute inset-0 bg-photo-duotone mix-blend-color" />
        {/* Scrim: uniform veil + vertical gradient only — horizontally
            symmetric so the start-aligned copy works mirrored on /ar */}
        <div className="absolute inset-0 bg-primary-darker/40" />
        <div className="absolute inset-0 bg-linear-to-t from-primary-darker via-primary-darker/10 to-primary-darker/60" />
      </div>

      <div className="relative mx-auto w-full max-w-content px-6 pt-28 pb-16 md:pt-32 md:pb-20">
        {/* ── Persona slider tabs ───────────────────────────────────────
            Deliberately not nav-like (owner note): smaller, uppercase, wide
            tracking, and separated from the nav zone.
            ≥sm: single row of labeled tabs with a STATIC active indicator
            (D54). Below sm: three EQUAL-WIDTH bare bars, no text at all
            (labels stay sr-only — screen readers get the persona names +
            aria-current; visible text can never widen the layout viewport,
            learning #5). The active mobile bar carries the animated dwell
            fill (D54 R12): with no mobile text, a static bar communicates
            nothing. */}
        <div className="mb-10 md:mb-12">
          <div
            role="group"
            aria-label={t.hero.personasLabel}
            className="flex gap-3 sm:flex-wrap sm:gap-x-7 sm:gap-y-4"
          >
            {t.segments.cards.map((card, i) => {
              const isActive = i === active;
              return (
                /* Buttons + rails keyed by index (learning #1) */
                <button
                  key={i}
                  onClick={() => select(i)}
                  aria-current={isActive || undefined}
                  className={`relative flex-1 cursor-pointer pb-2.5 pt-5 text-[0.7rem] font-medium uppercase tracking-[0.16em] transition-colors duration-300 rtl:tracking-normal sm:flex-none sm:pt-0 md:text-[0.78rem] ${
                    isActive ? "text-white" : "text-white/55 hover:text-white/85"
                  }`}
                >
                  <span className="sr-only sm:not-sr-only">{card.title}</span>
                  {/* Split treatment (D54 R11/R12). MOBILE (<sm): all three
                      bars keep a visible base track — they ARE the switcher,
                      there is no text — and the active one carries the
                      scaleX 0→1 fill over the dwell, remounting per
                      activation (key={cycle}) exactly as the original rail
                      did. Reduced motion: MotionConfig strips the tween and
                      the fill sits as a static full bar. DESKTOP (≥sm): the
                      labels carry identity, so the active tab shows only the
                      static sage indicator — the animated fill stays gone
                      (it competed with the CTA). */}
                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-[2px] rounded-pill bg-white/20 sm:hidden"
                  >
                    {isActive && (
                      <motion.span
                        key={cycle}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: DWELL_MS / 1000, ease: "linear" }}
                        className="absolute inset-0 origin-left rounded-pill bg-secondary rtl:origin-right"
                      />
                    )}
                  </span>
                  {isActive && (
                    <span
                      aria-hidden
                      className="absolute inset-x-0 bottom-0 hidden h-[2px] rounded-pill bg-secondary sm:block"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Copy block — staggers in once on load, never re-animates.
            Entrance is CSS (.hero-enter, globals.css), NOT Framer: the
            headline is the page's LCP element (Chrome treats the full-
            viewport photo as a background), so it must paint before
            hydration. ── */}
        <div className="flex max-w-[58rem] flex-col items-start gap-5 text-start">
          <h1 className="hero-enter-move text-balance text-[clamp(2rem,7vw,2.6rem)] font-bold leading-[1.12] tracking-[-0.03em] text-white [animation-delay:90ms] md:text-[clamp(2.6rem,3.85vw,3.45rem)]">
            <span className="block">{t.hero.h1Line1}</span>
            {/* Serif accent (D18) keys off the LIVE language state, not the
                route — the runtime toggle re-points <html> without
                navigation. EN: Fraunces italic (pale sage). AR: Tajawal 800
                in the same sage — never an italic/faux-slanted Arabic. */}
            {lang === "en" ? (
              <em className="font-serif font-medium italic text-secondary-pale">
                {t.hero.h1Underlined}
              </em>
            ) : (
              <span className="font-extrabold text-secondary-pale">
                {t.hero.h1Underlined}
              </span>
            )}
          </h1>

          <p className="hero-enter-move max-w-xl text-body-lg text-white/75 [animation-delay:180ms]">
            {t.hero.subheadline}
          </p>

          <div className="hero-enter mt-1 flex flex-wrap items-center gap-4 [animation-delay:270ms] max-sm:w-full max-sm:flex-col max-sm:items-stretch">
            {/* Padding-B override (D54 gate): the shortened label needs the
                larger pill to hold its weight beside the H1. */}
            <Button variant="sage" href={APP_URLS.signup} className="px-9 py-4">
              {t.hero.ctaPrimary}
            </Button>
            {/* Demoted from a glass pill to a plain text link (D54): a pill
                twin beside the primary meant nothing read as primary. One-off
                anchor by owner ruling — no new Button variant. Target is the
                section's real id (#how-it-works; no #how exists). */}
            <a
              href="#how-it-works"
              className="px-1 py-2 text-center text-body font-medium text-white/85 underline decoration-white/30 underline-offset-4 transition-colors duration-200 hover:text-white hover:decoration-white/60"
            >
              {t.hero.ctaSecondary}
            </a>
          </div>

          {/* -mt-1 (D54 R14): the copy block's gap-5 (20px) separates every
              sibling pair; pulling the trust row up 4px lands the CTA→trust
              gap at 16px — one token step down (gap-4 equivalent) — without
              touching the H1/sub rhythm. R13: the third item ("Arabic &
              English") is desktop-only — mobile keeps one clean line; the
              key stays, desktop still consumes it. */}
          <div className="hero-enter -mt-1 flex flex-wrap items-center gap-x-5 gap-y-2 text-caption text-white/65 [animation-delay:360ms]">
            {t.hero.trust.map((item, i) => (
              <span
                key={item}
                className={`inline-flex items-center gap-1.5 ${
                  i === 2 ? "max-sm:hidden" : ""
                }`}
              >
                <span aria-hidden className="text-secondary">
                  ✓
                </span>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
