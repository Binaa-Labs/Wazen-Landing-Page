import type { Locale } from "@/lib/i18n";

/* Single source of truth for the product-tour video (D20) — same pattern as
   lib/screenshots.ts. Currently in PLACEHOLDER MODE: both locales point at a
   silent 2:04 solid-teal dummy clip so the chapter/rail sync mechanic is real
   and testable. When the real walkthrough lands, this file is the whole swap:
   update the src map (per-locale files if the recording's UI language needs
   it) and the four chapter start timestamps below.

   Timestamps and the duration chip render as Latin digits in BOTH locales
   (matches the app convention, D12) — they are structural data, never i18n.
   CHAPTERS is index-coupled to t.video.chapters (titles) in lib/i18n.ts. */

export const VIDEO_SRC: Record<Locale, string> = {
  en: "/video/tour.mp4",
  ar: "/video/tour.mp4",
};

export const VIDEO_CAPTIONS: Record<Locale, string> = {
  en: "/video/captions.en.vtt",
  ar: "/video/captions.ar.vtt",
};

/* Poster: the F-9 desk scene (existing asset, pre-darkened per D15), CSS
   object-cover crops it to the 16:9 stage exactly like the approved mockup. */
export const VIDEO_POSTER = "/photos/f-9.webp";

export const CHAPTERS = [
  { start: 0 },
  { start: 34 },
  { start: 72 },
  { start: 101 },
] as const;

export const VIDEO_DURATION = 124; // seconds — 2:04, the dummy clip's true length

/** 74 → "1:14" (Latin digits, both locales — D12) */
export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}
