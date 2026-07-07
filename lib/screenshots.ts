import type { Locale } from "@/lib/i18n";

/* Single source of truth for every product screenshot on the page,
   locale-aware. Pass C.2a: real Wazen captures, EN + AR, desktop + mobile.

   Convention (D13): captures keep the owner's tree exactly as delivered —
   public/Wazen-Screenshots/{Coach|Client} Dashboard/{Desktop|Mobile}/{en|ar}/<Name>.png
   — and all path knowledge lives in this file. Re-capture sessions drop
   files into the same tree and this map just keeps working (or gets a
   one-line path edit). Spaces in paths are URL-encoded by next/image.

   Dimensions are per locale: EN desktop captures are 2560×1600, AR desktop
   are 3840×2400 (different capture DPR, same 16:10 ratio); client-desktop
   EN captures vary. Mobile is 1170×2532 (390×844 @ DPR 3, per D9) in both
   locales. */

type Capture = { src: string; width: number; height: number };
export type Screenshot = { en: Capture; ar: Capture };

const BASE = "/Wazen-Screenshots";

const cap = (src: string, width: number, height: number): Capture => ({
  src,
  width,
  height,
});

/* Coach desktop: EN 2560×1600 · AR 3840×2400 */
const coachDesk = (name: string): Screenshot => ({
  en: cap(`${BASE}/Coach Dashboard/Desktop/en/${name}.png`, 2560, 1600),
  ar: cap(`${BASE}/Coach Dashboard/Desktop/ar/${name}.png`, 3840, 2400),
});

/* Client mobile: 1170×2532 both locales */
const clientMobile = (name: string): Screenshot => ({
  en: cap(`${BASE}/Client Dashboard/Mobile/en/${name}.png`, 1170, 2532),
  ar: cap(`${BASE}/Client Dashboard/Mobile/ar/${name}.png`, 1170, 2532),
});

export const SHOTS = {
  /* ── Desktop ─────────────────────────────────────────────────────── */
  coachDashboard: coachDesk("Dashboard_Tab"),
  coachClients: coachDesk("Clients_Tab"),
  coachTemplates: coachDesk("Templates_Tab"),
  coachInvite: coachDesk("Invite_Client"),
  coachAnalytics: coachDesk("Analytics_Tab_1"),
  coachProfile: coachDesk("Public_Profile_Tab"),
  coachMessages: coachDesk("Messages_Tab"),
  clientProgress: {
    en: cap(`${BASE}/Client Dashboard/Desktop/en/Progress_Tab_1.png`, 1606, 1040),
    ar: cap(`${BASE}/Client Dashboard/Desktop/ar/Progress_Tab_1.png`, 3840, 2400),
  },
  clientPlans: {
    en: cap(`${BASE}/Client Dashboard/Desktop/en/Plans_Tab.png`, 3720, 2400),
    ar: cap(`${BASE}/Client Dashboard/Desktop/ar/Plans_Tab.png`, 3840, 2400),
  },

  /* ── Client mobile (PWA, phone frames) ───────────────────────────── */
  clientMobileHome: clientMobile("Home_Tab"),
  clientMobileCheckin: clientMobile("Check_In_Tab"),
  clientMobileProgress: clientMobile("Progress_Tab_1"),
  clientMobilePlans: clientMobile("Plans_Tab"),
  clientMobileMessages: clientMobile("Messages_Tab"),
} satisfies Record<string, Screenshot>;

export type ShotName = keyof typeof SHOTS;

export function getShot(name: ShotName, locale: Locale): Capture {
  return SHOTS[name][locale];
}
