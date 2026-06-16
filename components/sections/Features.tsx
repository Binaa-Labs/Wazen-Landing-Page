"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

import { useLanguage } from "@/components/LanguageProvider";
import { fadeUp, viewport } from "@/components/motion";
import BrowserFrame from "@/components/ui/BrowserFrame";
import SectionHeader from "@/components/ui/SectionHeader";

/* Structural tab data — icons, chrome URL, screenshot sources/dimensions.
   Index-coupled to t.features.tabs for the translatable label/headline/body/
   caption/alt text. */
const TAB_META = [
  {
    id: "clients",
    icon: (
      <>
        <circle cx="9" cy="7.5" r="3.5" />
        <path d="M3 19.5c0-3 2.7-5 6-5s6 2 6 5" />
        <path d="M16 4.6a3.5 3.5 0 0 1 0 5.8M17.5 14.7c2.1.6 3.5 2.2 3.5 4.8" />
      </>
    ),
    url: "app.wazen.com/clients",
    primarySrc: "/screenshots/Coach-Client_Tab.png",
    secondary: { src: "/screenshots/Coach-Client-VIEW.png", width: 1907, height: 910 },
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
    url: "app.wazen.com/dashboard",
    primarySrc: "/screenshots/Coach-Dashboard.png",
    secondary: { src: "/screenshots/Coach-Client-VIEW-Check-ins.png", width: 1897, height: 907 },
  },
  {
    id: "progress",
    icon: (
      <>
        <path d="m3 16.5 5.5-5.5 4 4L21 7" />
        <path d="M15.5 7H21v5.5" />
      </>
    ),
    url: "app.wazen.com/progress",
    primarySrc: "/screenshots/Client-Progress-Tab.png",
    secondary: { src: "/screenshots/Coach-Analytics-Tab1.png", width: 1906, height: 909 },
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
    url: "app.wazen.com/templates",
    primarySrc: "/screenshots/Coach-Template-Tab.png",
    secondary: { src: "/screenshots/Coach-Client-VIEW-Workout.png", width: 1902, height: 908 },
  },
];

function TwoWayArrow() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mx-auto size-6 rotate-90 text-primary/40 sm:rotate-0"
      aria-hidden
    >
      <path d="m7 8-4 4 4 4M17 8l4 4-4 4M3 12h18" />
    </svg>
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
    <section id="features" className="bg-bg px-6 py-section-mobile md:py-section">
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
                initial={{ opacity: 0, x: enterX }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -enterX }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className="mx-auto max-w-xl text-center">
                  <h3 className="text-h3 text-ink">{text.headline}</h3>
                  <p className="mt-3 text-body text-ink/60">{text.body}</p>
                </div>

                <div className="relative mt-8">
                  <BrowserFrame url={meta.url}>
                    <div className="relative aspect-[21/10]">
                      <Image
                        src={meta.primarySrc}
                        alt={text.primaryAlt}
                        fill
                        sizes="(min-width: 1024px) 896px, calc(100vw - 48px)"
                        className="object-cover object-top"
                      />
                    </div>
                  </BrowserFrame>

                  {/* PiP secondary screenshot overhangs the frame by 40px;
                      the caption below clears it via sm:mt-16 */}
                  <div className="absolute -bottom-10 end-4 hidden w-[38%] max-w-xs overflow-hidden rounded-xl border border-primary/10 bg-surface p-1.5 shadow-lg sm:block">
                    <Image
                      src={meta.secondary.src}
                      alt={text.secondaryAlt}
                      width={meta.secondary.width}
                      height={meta.secondary.height}
                      className="h-auto w-full rounded-lg"
                    />
                  </div>
                </div>

                <p className="mt-6 text-center text-caption text-ink/55 sm:mt-16">
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
          <div className="grid items-center gap-3 sm:grid-cols-[1fr_auto_1fr] sm:gap-4">
            <div className="rounded-card border border-primary/10 bg-surface p-3 shadow-sm">
              <p className="mb-2 text-caption font-medium text-ink/70">
                {t.features.coachLabel}
              </p>
              <Image
                src="/screenshots/Coach-Dashboard.png"
                alt={t.features.coachLabel}
                width={1905}
                height={910}
                className="h-auto w-full rounded-lg"
              />
            </div>
            <TwoWayArrow />
            <div className="rounded-card border border-primary/10 bg-surface p-3 shadow-sm">
              <p className="mb-2 text-caption font-medium text-ink/70">
                {t.features.clientLabel}
              </p>
              <Image
                src="/screenshots/Client-Dashboard-Tab.png"
                alt={t.features.clientLabel}
                width={1905}
                height={910}
                className="h-auto w-full rounded-lg"
              />
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
