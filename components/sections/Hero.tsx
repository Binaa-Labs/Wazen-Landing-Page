"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import { useLanguage } from "@/components/LanguageProvider";
import { crossfade, kenBurns } from "@/components/motion";
import Badge from "@/components/ui/Badge";
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
  { src: "/photos/hero-h1-fitness.webp", position: "object-[65%_50%]" },
  { src: "/photos/hero-h2-nutrition.webp", position: "object-[30%_50%]" },
  { src: "/photos/hero-h3-health.webp", position: "object-[28%_55%]" },
] as const;

/* Dwell equals the railFill duration in components/motion.ts, so the advance
   fires exactly as the active rail completes — the rail never sits visibly
   full. The 0.6s crossfade overlaps the start of the next dwell. */
const DWELL_MS = 6000;

export default function Hero() {
  const { t, lang } = useLanguage();
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  /* Monotonic activation counter: keys the active rail's fill span so EVERY
     activation (auto-advance, manual click, even re-clicking the active
     persona) remounts a fresh span that fills from 0. Structural number,
     never a translated string (learning #1). */
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
            <motion.div
              variants={kenBurns}
              initial={false}
              animate={i === active ? "active" : "rest"}
              className="absolute inset-0"
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
            tracking, railed, and separated from the nav zone.
            ≥sm: single row of labeled tabs. Below sm: three EQUAL-WIDTH bare
            rails in one row (labels go sr-only — they can never widen the
            layout viewport, learning #5) with the ACTIVE persona's label as
            one line above the row, crossfading with the persona change. */}
        <div className="mb-10 md:mb-12">
          {/* Mobile active-label line — stacked spans keyed by index
              (learning #1). aria-hidden: screen readers get the persona
              names from the buttons' sr-only text + aria-current. */}
          <div aria-hidden className="relative h-4 sm:hidden">
            {t.segments.cards.map((card, i) => (
              <motion.span
                key={i}
                variants={crossfade}
                initial={false}
                animate={i === active ? "visible" : "hidden"}
                transition={reducedMotion ? { duration: 0 } : undefined}
                className="absolute inset-0 truncate text-start text-[0.7rem] font-medium uppercase leading-4 tracking-[0.16em] text-white"
              >
                {card.title}
              </motion.span>
            ))}
          </div>

          <div
            role="group"
            aria-label={t.hero.personasLabel}
            className="mt-2 flex gap-3 sm:mt-0 sm:flex-wrap sm:gap-x-7 sm:gap-y-4"
          >
            {t.segments.cards.map((card, i) => {
              const isActive = i === active;
              return (
                /* Buttons + rails keyed by index (learning #1) */
                <button
                  key={i}
                  onClick={() => select(i)}
                  aria-current={isActive || undefined}
                  className={`relative flex-1 cursor-pointer pb-2.5 pt-5 text-[0.7rem] font-medium uppercase tracking-[0.16em] transition-colors duration-300 sm:flex-none sm:pt-0 md:text-[0.78rem] ${
                    isActive ? "text-white" : "text-white/55 hover:text-white/85"
                  }`}
                >
                  <span className="sr-only sm:not-sr-only">{card.title}</span>
                  {/* Exactly ONE rail is ever non-empty: the fill span exists
                      only on the active persona and remounts per activation
                      (key={cycle}), so it always fills 0→1 over the dwell —
                      outgoing rails empty instantly on unmount, wrap leaves
                      the others empty, and a mid-fill click restarts from 0.
                      Reduced motion: MotionConfig skips the tween, leaving a
                      static full rail on the active persona. */}
                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-[2px] rounded-pill bg-white/20"
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
          <div className="hero-enter">
            <Badge variant="pill" tone="glass" dot>
              {t.hero.badge}
            </Badge>
          </div>

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
            <Button variant="sage" href={APP_URLS.signup}>
              {t.hero.ctaPrimary}
            </Button>
            <Button variant="glass" href="#features">
              {t.hero.ctaSecondary}
            </Button>
          </div>

          <div className="hero-enter flex flex-wrap items-center gap-x-5 gap-y-2 text-caption text-white/65 [animation-delay:360ms]">
            {t.hero.trust.map((item) => (
              <span key={item} className="inline-flex items-center gap-1.5">
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
