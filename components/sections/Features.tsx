"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";

import { useLanguage } from "@/components/LanguageProvider";
import { fadeUp, viewport } from "@/components/motion";
import BrowserFrame from "@/components/ui/BrowserFrame";
import CaptureFragment, {
  type FragmentRegion,
} from "@/components/ui/CaptureFragment";
import Lightbox from "@/components/ui/Lightbox";
import PhoneShot from "@/components/ui/PhoneShot";
import SectionHeader from "@/components/ui/SectionHeader";
import { getShot, type ShotName } from "@/lib/screenshots";

/* Tab dwell for the rail-timer auto-advance (D21/D29). 6s matches the hero
   persona rail so the page runs one rhythm. D29 note: owner flagged this for
   a possible revisit at review — this constant is the one-line edit. */
const DWELL_MS = 6000;

/* Fragment chip library — REAL capture regions (Stage-2 "fragment"
   presentation; §5 ledger families). Regions are physical percentages per
   locale, calibrated against each locale's own capture (AR captures are
   native-RTL re-captures, not mirrors); AR values verified in the 2.2a
   screenshot pass. The roster family uses the Clients page's title+count
   region — full compliance rows are ~11.5:1 and render illegibly small at
   chip scale. */
type Fragment = {
  shotName: ShotName;
  region: { en: FragmentRegion; ar: FragmentRegion };
  aspect: string;
};

const FRAGMENTS = {
  avgAdherence: {
    shotName: "coachAnalytics",
    region: {
      en: { x: 26.4, y: 17, w: 21.5 },
      ar: { x: 52.1, y: 17, w: 21.5 },
    },
    aspect: "aspect-[13/5]",
  },
  planAdherence: {
    shotName: "coachAnalytics",
    region: {
      en: { x: 49.3, y: 17, w: 21.4 },
      ar: { x: 29.3, y: 17, w: 21.4 },
    },
    aspect: "aspect-[13/5]",
  },
  atRisk: {
    shotName: "coachAnalytics",
    region: {
      en: { x: 72.2, y: 17, w: 21.5 },
      ar: { x: 6.3, y: 17, w: 21.5 },
    },
    aspect: "aspect-[13/5]",
  },
  weight: {
    shotName: "clientProgress",
    region: {
      en: { x: 23.5, y: 8.5, w: 34.7 },
      ar: { x: 41.8, y: 8.5, w: 34.7 },
    },
    aspect: "aspect-[11/4]",
  },
  roster: {
    shotName: "coachClients",
    region: {
      en: { x: 26.3, y: 11.2, w: 12.3 },
      ar: { x: 61.4, y: 11.2, w: 12.3 },
    },
    aspect: "aspect-[8/3]",
  },
} satisfies Record<string, Fragment>;

/* Structural tab data — chrome URL, locale-aware captures, and 0–2 fragment
   chips. Chips are per-tab and OPTIONAL (owner review, 2.2a amendments): a
   chip exists only where a real crop tells that tab's story — a stat that
   merely repeats the adjacent capture's visible content, or a stat from the
   wrong story (roster counts on a templates tab), is worse than no chip.
   Index-coupled to t.features.tabs for the translatable strings. (The pill
   icons died with the pills in the D28 progress-underline restyle.) */
const TAB_META: {
  id: string;
  url: string;
  shotName: ShotName;
  phonePip: ShotName;
  fragments: Fragment[];
}[] = [
  {
    id: "clients",
    url: "app.wazen.fit/clients",
    shotName: "coachClients",
    phonePip: "clientMobileHome",
    fragments: [FRAGMENTS.roster, FRAGMENTS.atRisk],
  },
  {
    id: "check-ins",
    url: "app.wazen.fit/dashboard",
    shotName: "coachDashboard",
    phonePip: "clientMobileCheckin",
    /* the approved Stage-2 mock pairing */
    fragments: [FRAGMENTS.avgAdherence, FRAGMENTS.weight],
  },
  {
    id: "progress",
    url: "app.wazen.fit/progress",
    shotName: "clientProgress",
    phonePip: "clientMobileProgress",
    /* Plan Adherence ALONE: every metric tile in the clientProgress capture
       (weight, body fat, muscle mass) is already visible inside the panel's
       own 21/10 crop of that same capture — any of them as a chip is pure
       duplication. */
    fragments: [FRAGMENTS.planAdherence],
  },
  {
    id: "plans",
    url: "app.wazen.fit/templates",
    shotName: "coachTemplates",
    phonePip: "clientMobilePlans",
    /* roster-count chip removed — a roster stat on a templates story */
    fragments: [FRAGMENTS.planAdherence],
  },
  {
    id: "messaging",
    url: "app.wazen.fit/messages",
    /* C.2a addition beyond the approved 8-entry mapping: the new capture
       set includes Coach Messages_Tab, so the desktop chat skeleton is
       retired (flagged in the pass report). */
    shotName: "coachMessages",
    phonePip: "clientMobileMessages",
    /* no chips — no analytics stat is honestly part of the messaging story;
       the scene composes with the wash/ghost/browser/phone alone */
    fragments: [],
  },
];

/* Ghost chapter numbers are Latin digits in both locales (D12 app digit
   convention) and purely decorative. */
const GHOST_NUMBERS = ["01", "02", "03", "04", "05"];

/* Animated connector between the coach dashboard and the client app:
   arrowheads at both ends and dots flowing along the line — “data syncing”
   in both directions. Static dashed line under prefers-reduced-motion.
   Vertical (rotated) when the grid stacks on mobile. */
function SyncConnector() {
  const reduceMotion = useReducedMotion();
  return (
    <div className="flex h-28 items-center justify-center sm:h-auto" aria-hidden>
      <svg
        viewBox="0 0 120 24"
        fill="none"
        className="w-24 rotate-90 text-primary sm:w-28 sm:rotate-0"
      >
        {/* End arrowheads */}
        <path
          d="m12 6-8 6 8 6M108 6l8 6-8 6"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.7"
        />
        {/* Rail */}
        <path
          d="M8 12h104"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={reduceMotion ? "4 5" : undefined}
          opacity="0.3"
        />
        {/* Flowing dots (skipped under reduced motion) */}
        {!reduceMotion &&
          [0, 0.7, 1.4].map((delay) => (
            <motion.circle
              key={delay}
              r="3.2"
              cy="12"
              fill="currentColor"
              initial={{ cx: 14, opacity: 0 }}
              animate={{ cx: [14, 106], opacity: [0, 1, 1, 0] }}
              transition={{
                repeat: Infinity,
                duration: 2.1,
                delay,
                ease: "linear",
              }}
            />
          ))}
      </svg>
    </div>
  );
}

export default function Features() {
  const { t, lang } = useLanguage();
  const [activeId, setActiveId] = useState(TAB_META[0].id);
  /* Monotonic activation counter — keys the active rail's fill span so every
     activation remounts a fresh span filling from 0 (the hero rail mechanic,
     Pass 2.1). Structural number, never a translated string (learning #1). */
  const [cycle, setCycle] = useState(0);
  /* First user interaction permanently stops the auto-advance (D21). */
  const [interacted, setInteracted] = useState(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  /* In-view gate anchored to the TABLIST, not the tall section: at 390px the
     composed scene can exceed several viewports, making a section-level
     `amount` threshold unreachable — the short tablist is visible exactly
     when the tabs are, so the dwell runs while the user can see the rails
     and pauses once they scroll into/past the panel (deliberate: never swap
     a panel under a reader). */
  const tablistRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(tablistRef);
  const reducedMotion = useReducedMotion();

  const running = inView && !interacted && !reducedMotion;

  const found = TAB_META.findIndex((tab) => tab.id === activeId);
  const activeIndex = found === -1 ? 0 : found;
  const meta = TAB_META[activeIndex];
  const text = t.features.tabs[activeIndex];
  const primary = getShot(meta.shotName, lang);
  const coachDash = getShot("coachDashboard", lang);

  const selectTab = (i: number, byUser: boolean) => {
    setActiveId(TAB_META[i].id);
    if (byUser) setInteracted(true);
    setCycle((c) => c + 1);
  };

  /* Auto-advance: the rail fill IS the timer — the tab advances exactly as
     the active rail completes (dwell = fill duration). Re-runs on every
     `cycle` bump; only scheduled while running. Reduced motion: never runs
     (D21 — manual tabs only). */
  useEffect(() => {
    if (!running) return;
    const id = setTimeout(() => {
      setActiveId(TAB_META[(activeIndex + 1) % TAB_META.length].id);
      setCycle((c) => c + 1);
    }, DWELL_MS);
    return () => clearTimeout(id);
  }, [cycle, running, activeIndex]);

  /* Scrolling back to the tabs restarts the dwell from 0 with no extra
     effect: `running` flipping true re-runs the timer effect (fresh full
     DWELL_MS timeout) AND remounts the animated fill span (it only renders
     while running, so it mounts back at scaleX 0) — rail and timer restart
     in sync, and the paused static-full rail is never seen mid-swap because
     the swap happens off-screen. */

  /* Slide follows reading direction: LTR enters from the right, RTL from
     the left. */
  const enterX = lang === "ar" ? -16 : 16;

  const onTablistKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    const delta = e.key === "ArrowRight" ? 1 : -1;
    const next = (activeIndex + delta + TAB_META.length) % TAB_META.length;
    selectTab(next, true);
    tabRefs.current[next]?.focus();
  };

  return (
    <section
      id="features"
      className="bg-bg px-6 py-section-compact-mobile md:py-section-compact"
    >
      <div className="mx-auto max-w-content">
        <SectionHeader
          eyebrow={t.features.eyebrow}
          title={t.features.h2}
          description={t.features.description}
        />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {/* D28: pills → progress-underline tabs. Text-only labels; the
              3px rail under the active tab fills sage over the dwell and
              doubles as the auto-advance timer. Keyboard/ARIA semantics
              unchanged from the pill era. */}
          <div
            ref={tablistRef}
            role="tablist"
            aria-label="Wazen features"
            onKeyDown={onTablistKeyDown}
            className="mt-12 flex gap-6 overflow-x-auto pb-1 md:justify-center md:gap-9"
          >
            {TAB_META.map((tab, i) => {
              const selected = tab.id === activeId;
              return (
                <button
                  key={tab.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  role="tab"
                  id={`tab-${tab.id}`}
                  aria-selected={selected}
                  aria-controls={`panel-${tab.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => selectTab(i, true)}
                  className={`relative shrink-0 cursor-pointer px-1 pb-3 pt-1 font-display text-sm font-semibold transition-colors ${
                    selected ? "text-ink" : "text-ink/40 hover:text-ink/70"
                  }`}
                >
                  {t.features.tabs[i].label}
                  {/* Exactly ONE rail is ever non-empty (hero mechanic): the
                      fill span exists only on the selected tab. While the
                      timer runs it remounts per activation (key={cycle}) and
                      fills 0→1 over the dwell; when stopped (interaction /
                      reduced motion / out of view) it's a static full rail.
                      Outgoing rails empty instantly on unmount; a mid-fill
                      click restarts from 0. */}
                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-[3px] rounded-pill bg-ink/8"
                  >
                    {selected &&
                      (running ? (
                        <motion.span
                          key={cycle}
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{
                            duration: DWELL_MS / 1000,
                            ease: "linear",
                          }}
                          className="absolute inset-0 origin-left rounded-pill bg-secondary-dark rtl:origin-right"
                        />
                      ) : (
                        <span className="absolute inset-0 rounded-pill bg-secondary-dark" />
                      ))}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mx-auto mt-10 max-w-4xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={meta.id}
                role="tabpanel"
                id={`panel-${meta.id}`}
                aria-labelledby={`tab-${meta.id}`}
                initial={{ opacity: 0, x: enterX, scale: 0.97 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -enterX, scale: 0.97 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className="mx-auto max-w-xl text-center">
                  <h3 className="text-h3 text-ink">{text.headline}</h3>
                  <p className="mt-3 text-body text-ink/60">{text.body}</p>
                </div>

                {/* Composed scene (D28): teal-mist wash offset to the end
                    side · ghost chapter number · browser capture overlapping
                    the wash's START edge · phone breaking the wash's BOTTOM
                    edge (wash edge only — off-viewport bleed is CTA-
                    exclusive, §6) · two real-capture fragment chips. */}
                <div className="relative mt-10 pb-16 sm:pb-24">
                  <div
                    aria-hidden
                    className="absolute bottom-6 end-0 top-0 start-8 rounded-[28px] border border-primary/8 bg-linear-135 from-primary-light to-secondary-light sm:start-[16%]"
                  />
                  <div
                    aria-hidden
                    className="absolute -top-10 end-2 z-[1] hidden select-none font-display text-[10rem] font-extrabold leading-none text-primary/5 sm:block"
                  >
                    {GHOST_NUMBERS[activeIndex]}
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.03, y: -4 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="relative z-[2] w-full sm:w-[72%]"
                  >
                    <BrowserFrame url={meta.url}>
                      <Lightbox
                        src={primary.src}
                        alt={text.primaryAlt}
                        width={primary.width}
                        height={primary.height}
                        className="relative aspect-[21/10] w-full"
                      >
                        <Image
                          src={primary.src}
                          alt={text.primaryAlt}
                          fill
                          sizes="(min-width: 1024px) 645px, calc(100vw - 48px)"
                          className="object-cover object-top dark:opacity-90"
                        />
                      </Lightbox>
                    </BrowserFrame>
                  </motion.div>

                  {/* Breakout phone — crosses the wash's bottom edge. Same
                      lightbox behavior as everywhere (PhoneShot), and the
                      standard PhoneFrame 9/19 window on every tab (D37).
                      Note: the Plans capture's own mid-screen footer is a
                      capture defect, not a crop defect — see the 2.2a
                      amendment report / re-capture ledger. */}
                  <div className="absolute bottom-0 end-[5%] z-[3] hidden w-[20%] min-w-[110px] max-w-[180px] sm:block">
                    <PhoneShot
                      name={meta.phonePip}
                      alt={text.secondaryAlt}
                      sizes="180px"
                    />
                  </div>

                  {/* Fragment chips — product register, staggered after the
                      frame; hidden on mobile (no mock exists — the 390px
                      screenshots are the decision surface, D28 review). */}
                  {meta.fragments.map((frag, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.65,
                        delay: 0.25 + i * 0.12,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className={`absolute z-[4] hidden lg:block ${
                        i === 0
                          ? "-top-7 end-[22%] w-[230px]"
                          : "bottom-24 -start-4 w-[220px]"
                      }`}
                    >
                      <CaptureFragment
                        name={frag.shotName}
                        region={frag.region}
                        aspect={frag.aspect}
                        sizes="1100px"
                        className="rounded-2xl border border-primary/8 bg-surface shadow-lg"
                      />
                    </motion.div>
                  ))}
                </div>

                <p className="mt-6 text-center text-caption text-ink/55">
                  {text.caption}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mx-auto mt-20 max-w-4xl"
        >
          <div className="grid items-center gap-4 sm:grid-cols-[1fr_auto_auto] sm:gap-6">
            <div className="rounded-card border border-primary/10 bg-surface p-3 shadow-sm">
              <p className="mb-2 text-caption font-medium text-ink/70">
                {t.features.coachLabel}
              </p>
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
              <Lightbox
                src={coachDash.src}
                alt={t.features.coachLabel}
                width={coachDash.width}
                height={coachDash.height}
                className="w-full rounded-lg"
              >
                <Image
                  src={coachDash.src}
                  alt={t.features.coachLabel}
                  width={coachDash.width}
                  height={coachDash.height}
                  sizes="(min-width: 1000px) 600px, (min-width: 640px) calc(100vw - 320px), calc(100vw - 48px)"
                  className="h-auto w-full rounded-lg dark:opacity-90"
                />
              </Lightbox>
              </motion.div>
            </div>
            <SyncConnector />
            <div className="flex flex-col items-center gap-2 justify-self-center">
              <div className="w-36 md:w-40">
                <PhoneShot
                  name="clientMobileHome"
                  alt={t.features.clientLabel}
                  sizes="160px"
                />
              </div>
              <p className="text-caption font-medium text-ink/70">
                {t.features.clientLabel}
              </p>
            </div>
          </div>
          <p className="mt-5 text-center text-caption text-ink/55">
            {t.features.connectedCaption}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
