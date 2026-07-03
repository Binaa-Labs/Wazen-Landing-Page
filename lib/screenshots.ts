import type { Locale } from "@/lib/i18n";

/* Single source of truth for every product screenshot on the page,
   locale-aware. Arabic paths fall back to the English capture until the
   Pass B AR set lands — the Pass C.2 swap is edits to THIS file only
   (plus dropping the fallback), no component changes.

   Convention for tomorrow's captures (per §8 of LANDING-AUDIT-PLAN.md):
   e.g. /screenshots/Coach-Dashboard.png + /screenshots/Coach-Dashboard-AR.png */

export type Screenshot = {
  en: string;
  ar: string;
  width: number;
  height: number;
};

const shot = (
  en: string,
  width: number,
  height: number,
  ar: string = en, // fallback until AR captures exist
): Screenshot => ({ en, ar, width, height });

export const SHOTS = {
  coachDashboard: shot("/screenshots/Coach-Dashboard.png", 1905, 910),
  coachClients: shot("/screenshots/Coach-Client_Tab.png", 1903, 908),
  clientProgress: shot("/screenshots/Client-Progress-Tab.png", 1905, 910),
  coachTemplates: shot("/screenshots/Coach-Template-Tab.png", 1918, 909),
  coachInvite: shot("/screenshots/Coach-Invite-Client.png", 1918, 905),
  clientPlans: shot("/screenshots/Client-Plans-Tab.png", 1914, 908),
  coachAnalytics: shot("/screenshots/Coach-Analytics-Tab2.png", 1902, 908),
  coachProfile: shot("/screenshots/Client-Coach-Profile-View.png", 1902, 910),
} satisfies Record<string, Screenshot>;

export type ShotName = keyof typeof SHOTS;

export function getShot(name: ShotName, locale: Locale) {
  const s = SHOTS[name];
  return { src: s[locale], width: s.width, height: s.height };
}
