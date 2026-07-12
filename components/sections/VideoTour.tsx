"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

import { useLanguage } from "@/components/LanguageProvider";
import { fadeUp, staggerContainer, viewport } from "@/components/motion";
import {
  CHAPTERS,
  formatTime,
  VIDEO_CAPTIONS,
  VIDEO_DURATION,
  VIDEO_POSTER,
  VIDEO_SRC,
} from "@/lib/video";

/* Product-tour video section (D20) — PLACEHOLDER MODE: the structure, the
   chapter cards, and the playback-synced rails are final; only the asset is
   a dummy clip (see lib/video.ts). Chapter titles are index-coupled to
   CHAPTERS. Timestamps render as Latin digits in both locales (D12).

   Rails reflect real playback state (timeupdate → scaleX), so under reduced
   motion they keep updating but with transition: none — playback state is
   information, not decoration. The video never autoplays. */

function PlayIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className="ms-1 size-7 md:size-8"
    >
      <path d="M8 5.5v13l11-6.5L8 5.5Z" />
    </svg>
  );
}

export default function VideoTour() {
  const { t, lang } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  /* Per-chapter progress derived from one timeupdate listener. A chapter's
     window ends where the next begins (last one ends at the clip's end). */
  const chapterEnd = (i: number) =>
    i + 1 < CHAPTERS.length ? CHAPTERS[i + 1].start : VIDEO_DURATION;
  const progress = CHAPTERS.map((c, i) => {
    const span = chapterEnd(i) - c.start;
    return Math.min(1, Math.max(0, (currentTime - c.start) / span));
  });
  const activeChapter = CHAPTERS.reduce(
    (acc, c, i) => (currentTime >= c.start ? i : acc),
    0,
  );

  const seekTo = (i: number) => {
    const video = videoRef.current;
    if (!video) return;
    /* Setting currentTime before metadata is loaded sets the default start
       position, so a cold chapter click still lands on the right timestamp. */
    video.currentTime = CHAPTERS[i].start;
    video.play();
  };

  return (
    <section className="bg-primary-dark px-6 py-section-compact-mobile md:py-section-compact">
      <div className="mx-auto max-w-content">
        {/* Header — plain sage eyebrow per the Phase 2 mock (no chip) */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex flex-col items-center gap-4 text-center"
        >
          <p className="text-eyebrow font-medium uppercase tracking-[0.14em] text-secondary">
            {t.video.eyebrow}
          </p>
          <h2 className="text-h2 text-white">{t.video.h2}</h2>
          <p className="max-w-2xl text-body-lg text-white/70">{t.video.lead}</p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mx-auto mt-12 max-w-[960px]"
        >
          {/* ── 16:9 stage ──────────────────────────────────────────── */}
          <motion.div
            variants={fadeUp}
            className="relative aspect-video overflow-hidden rounded-card bg-primary-darker shadow-xl"
          >
            <video
              ref={videoRef}
              src={VIDEO_SRC[lang]}
              poster={VIDEO_POSTER}
              preload="none"
              playsInline
              controls={started}
              onPlay={() => setStarted(true)}
              onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
              className="h-full w-full object-cover"
            >
              <track
                kind="captions"
                src={VIDEO_CAPTIONS.en}
                srcLang="en"
                label="English"
                default={lang === "en"}
              />
              <track
                kind="captions"
                src={VIDEO_CAPTIONS.ar}
                srcLang="ar"
                label="العربية"
                default={lang === "ar"}
              />
            </video>

            {/* Poster overlay: F-9 + the section's scrim + play affordance.
                Hidden after the first explicit play. */}
            <AnimatePresence>
              {!started && (
                <motion.div
                  exit={{ opacity: 0, transition: { duration: 0.3 } }}
                  className="absolute inset-0"
                >
                  <Image
                    src={VIDEO_POSTER}
                    alt={t.video.posterAlt}
                    fill
                    sizes="(min-width: 1056px) 960px, calc(100vw - 48px)"
                    className="object-cover object-[50%_62%]"
                  />
                  <div className="absolute inset-0 bg-photo-duotone mix-blend-color" />
                  <div className="absolute inset-0 bg-primary-darker/55" />

                  <button
                    onClick={() => videoRef.current?.play()}
                    aria-label={t.video.playLabel}
                    className="absolute start-1/2 top-1/2 flex size-16 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-secondary text-primary-darker shadow-lg transition-transform duration-200 ltr:-translate-x-1/2 rtl:translate-x-1/2 hover:scale-105 motion-reduce:transition-none md:size-20"
                  >
                    <PlayIcon />
                  </button>

                  {/* Duration chip — Latin digits both locales (D12) */}
                  <span
                    dir="ltr"
                    className="absolute bottom-3 end-3 rounded-badge bg-primary-darker/70 px-2 py-1 text-caption font-medium text-white backdrop-blur-sm"
                  >
                    {formatTime(VIDEO_DURATION)}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ── Chapter cards: 2×2 on mobile, 4-up on desktop ─────────── */}
          <motion.div
            variants={fadeUp}
            role="group"
            aria-label={t.video.chaptersLabel}
            className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4"
          >
            {t.video.chapters.map((title, i) => {
              const isActive = i === activeChapter;
              const isComplete = progress[i] >= 1 && !isActive;
              return (
                /* Cards + rails keyed by index (learning #1). Click/Enter
                   seeks and plays — cards are real buttons. */
                <button
                  key={i}
                  onClick={() => seekTo(i)}
                  aria-current={isActive || undefined}
                  className={`cursor-pointer rounded-xl border p-4 text-start transition-colors duration-200 ${
                    isActive
                      ? "border-secondary/60 bg-white/10"
                      : "border-white/10 bg-white/5 hover:bg-white/8"
                  }`}
                >
                  <span className="block text-caption font-medium tracking-[0.08em] text-white/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-1 block text-[0.95rem] font-semibold leading-snug text-white">
                    {title}
                  </span>
                  <span
                    dir="ltr"
                    className="mt-1 block text-caption text-white/50"
                  >
                    {formatTime(CHAPTERS[i].start)}
                  </span>
                  {/* 3px playback rail — fills from inline-start */}
                  <span
                    aria-hidden
                    className="mt-3 block h-[3px] overflow-hidden rounded-pill bg-white/15"
                  >
                    <span
                      style={{ transform: `scaleX(${progress[i]})` }}
                      className={`block h-full origin-left rounded-pill transition-transform duration-300 ease-linear motion-reduce:transition-none rtl:origin-right ${
                        isComplete ? "bg-secondary/40" : "bg-secondary"
                      }`}
                    />
                  </span>
                </button>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
