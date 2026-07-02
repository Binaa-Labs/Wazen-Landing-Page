"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { useLanguage } from "@/components/LanguageProvider";
import { fadeUp, viewport } from "@/components/motion";
import BrowserFrame from "@/components/ui/BrowserFrame";
import Lightbox from "@/components/ui/Lightbox";
import PhoneFrame from "@/components/ui/PhoneFrame";
import PhoneSkeleton, { type PhoneScreen } from "@/components/ui/PhoneSkeleton";
import SectionHeader from "@/components/ui/SectionHeader";

/* Structural tab data — icons, chrome URL, screenshot source, and the
   client-side phone screen shown as the PiP overlay. Index-coupled to
   t.features.tabs for the translatable label/headline/body/caption/alt text.
   Messaging has no usable capture yet (Pass B re-captures) — it renders a
   desktop skeleton instead of a screenshot. */
const TAB_META: {
  id: string;
  icon: React.ReactNode;
  url: string;
  primarySrc?: string;
  phoneScreen: PhoneScreen;
}[] = [
  {
    id: "clients",
    icon: (
      <>
        <circle cx="9" cy="7.5" r="3.5" />
        <path d="M3 19.5c0-3 2.7-5 6-5s6 2 6 5" />
        <path d="M16 4.6a3.5 3.5 0 0 1 0 5.8M17.5 14.7c2.1.6 3.5 2.2 3.5 4.8" />
      </>
    ),
    url: "wazen.fit/clients",
    primarySrc: "/screenshots/Coach-Client_Tab.png",
    phoneScreen: "today",
  },
  {
    id: "check-ins",
    icon: (
      <>
        <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
        <rect x="9" y="3" width="6" height="4" rx="1" />
        <path d="m9 13.5 2 2 4-4.5" />
      </>
    ),
    url: "wazen.fit/dashboard",
    primarySrc: "/screenshots/Coach-Dashboard.png",
    phoneScreen: "checkin",
  },
  {
    id: "progress",
    icon: (
      <>
        <path d="m3 16.5 5.5-5.5 4 4L21 7" />
        <path d="M15.5 7H21v5.5" />
      </>
    ),
    url: "wazen.fit/progress",
    primarySrc: "/screenshots/Client-Progress-Tab.png",
    phoneScreen: "progress",
  },
  {
    id: "plans",
    icon: (
      <>
        <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
        <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
        <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
        <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
      </>
    ),
    url: "wazen.fit/templates",
    primarySrc: "/screenshots/Coach-Template-Tab.png",
    phoneScreen: "plans",
  },
  {
    id: "messaging",
    icon: (
      <path d="M21 11.5c0 3.6-4 6.5-9 6.5-1.1 0-2.1-.13-3.1-.38L4.5 19.5l1.4-3.1C4.7 15.2 3 13.5 3 11.5 3 7.9 7 5 12 5s9 2.9 9 6.5Z" />
    ),
    url: "wazen.fit/messages",
    phoneScreen: "chat",
  },
];

/* Placeholder for the messaging tab until a clean re-capture exists: an
   abstract inbox + thread layout in brand tints. Decorative only. */
function DesktopChatSkeleton() {
  /* Alternating thread bubbles: [width class, incoming?] */
  const bubbles: [string, boolean][] = [
    ["w-1/2", true],
    ["w-2/5", false],
    ["w-3/5", true],
    ["w-1/3", false],
    ["w-2/5", true],
    ["w-1/2", false],
    ["w-2/5", true],
  ];
  return (
    <div
      aria-hidden
      className="grid aspect-[21/10] w-full grid-cols-[1fr_2.2fr] bg-surface"
    >
      {/* Conversation list: filled — an active inbox, not an empty one */}
      <div className="flex flex-col gap-1.5 overflow-hidden border-e border-ink/8 p-2.5">
        <div className="h-6 shrink-0 rounded-lg border border-ink/10 bg-bg" />
        {[1, 0.95, 0.9, 0.85, 0.8, 0.75, 0.7].map((o, i) => (
          <div
            key={i}
            className={`flex shrink-0 items-center gap-2 rounded-lg p-1.5 ${
              i === 0 ? "bg-primary-light" : ""
            }`}
            style={{ opacity: o }}
          >
            <div className="relative size-6 shrink-0 rounded-full bg-primary/25">
              {i < 3 && (
                <div className="absolute -end-0.5 -top-0.5 size-2 rounded-full bg-secondary-dark" />
              )}
            </div>
            <div className="flex-1">
              <div className="h-1.5 w-2/3 rounded-pill bg-ink/15" />
              <div className="mt-1 h-1.5 w-full rounded-pill bg-ink/8" />
            </div>
          </div>
        ))}
      </div>
      {/* Thread: a real back-and-forth */}
      <div className="flex flex-col gap-1.5 overflow-hidden p-3">
        <div className="flex shrink-0 items-center gap-2 border-b border-ink/8 pb-2">
          <div className="size-6 rounded-full bg-primary/25" />
          <div className="h-2 w-24 rounded-pill bg-ink/15" />
        </div>
        {bubbles.map(([w, incoming], i) => (
          <div
            key={i}
            className={`h-6 shrink-0 rounded-xl ${w} ${
              incoming
                ? "self-start rounded-es-sm bg-ink/8"
                : "self-end rounded-ee-sm bg-primary/75"
            }`}
          />
        ))}
        <div className="mt-auto flex shrink-0 items-center gap-2 pt-1">
          <div className="h-7 flex-1 rounded-pill border border-ink/10 bg-bg" />
          <div className="size-7 rounded-full bg-primary" />
        </div>
      </div>
    </div>
  );
}

/* Animated connector between the coach dashboard and the client app:
   arrowheads at both ends and dots flowing along the line — "data syncing"
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
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const found = TAB_META.findIndex((tab) => tab.id === activeId);
  const activeIndex = found === -1 ? 0 : found;
  const meta = TAB_META[activeIndex];
  const text = t.features.tabs[activeIndex];

  /* Slide follows reading direction: LTR enters from the right, RTL from
     the left. */
  const enterX = lang === "ar" ? -16 : 16;

  const onTablistKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    const delta = e.key === "ArrowRight" ? 1 : -1;
    const next = (activeIndex + delta + TAB_META.length) % TAB_META.length;
    setActiveId(TAB_META[next].id);
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
          <div
            role="tablist"
            aria-label="Wazen features"
            onKeyDown={onTablistKeyDown}
            className="mt-12 flex gap-2 overflow-x-auto pb-1 md:justify-center"
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
                  onClick={() => setActiveId(tab.id)}
                  className={`flex shrink-0 cursor-pointer items-center gap-2 rounded-pill px-5 py-2.5 text-sm font-medium transition-colors ${
                    selected
                      ? "bg-primary text-white"
                      : "text-ink/60 hover:bg-primary/5 hover:text-primary"
                  }`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-4"
                    aria-hidden
                  >
                    {tab.icon}
                  </svg>
                  {t.features.tabs[i].label}
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

                <div className="relative mt-8">
                  <motion.div
                    whileHover={{ scale: 1.03, y: -4 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="w-full"
                  >
                    <BrowserFrame url={meta.url}>
                      {meta.primarySrc ? (
                        <Lightbox
                          src={meta.primarySrc}
                          alt={text.primaryAlt}
                          width={1905}
                          height={910}
                          className="relative aspect-[21/10] w-full"
                        >
                          <Image
                            src={meta.primarySrc}
                            alt={text.primaryAlt}
                            fill
                            sizes="(min-width: 1024px) 896px, calc(100vw - 48px)"
                            className="object-cover object-top dark:opacity-90"
                          />
                        </Lightbox>
                      ) : (
                        <DesktopChatSkeleton />
                      )}
                    </BrowserFrame>
                  </motion.div>

                  {/* Client-app phone PiP overhangs the frame; the caption
                      below clears it via sm:mt-20. Skeleton until Pass C
                      captures land. */}
                  <div className="absolute -bottom-12 end-4 hidden w-[19%] min-w-[96px] max-w-[150px] sm:block">
                    <PhoneFrame>
                      <PhoneSkeleton screen={meta.phoneScreen} />
                    </PhoneFrame>
                  </div>
                </div>

                <p className="mt-6 text-center text-caption text-ink/55 sm:mt-20">
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
                src="/screenshots/Coach-Dashboard.png"
                alt={t.features.coachLabel}
                width={1905}
                height={910}
                className="w-full rounded-lg"
              >
                <Image
                  src="/screenshots/Coach-Dashboard.png"
                  alt={t.features.coachLabel}
                  width={1905}
                  height={910}
                  className="h-auto w-full rounded-lg dark:opacity-90"
                />
              </Lightbox>
              </motion.div>
            </div>
            <SyncConnector />
            <div className="flex flex-col items-center gap-2 justify-self-center">
              <div className="w-36 md:w-40">
                <PhoneFrame>
                  <PhoneSkeleton screen="today" />
                </PhoneFrame>
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
