"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";

import { useLanguage } from "@/components/LanguageProvider";
import { fadeUp, viewport } from "@/components/motion";
import Badge from "@/components/ui/Badge";
import BrowserFrame from "@/components/ui/BrowserFrame";
import Button from "@/components/ui/Button";
import GhostWordmark from "@/components/ui/GhostWordmark";
import PhoneShot from "@/components/ui/PhoneShot";
import { getShot } from "@/lib/screenshots";
import { APP_URLS } from "@/lib/links";

/* Stage-2 recomposition (D36, owner-pre-seeded): the white card + the
   MiniDashboard decorative skeleton die (the last D14-class surface —
   MiniDashboard was a local function here, so nothing else consumed it).
   The proven OG-card composition takes the panel: copy start-side, REAL
   captures end-side — coachDashboard in a BrowserFrame (top crop, the
   same crop the OG card ships) + the check-in phone overlapping its
   start-bottom corner, the whole composite bleeding off the END edge and
   clipped by the section's overflow-hidden. Off-viewport bleed is
   CTA-exclusive on the page (§6). Backdrop unchanged: primary-dark +
   F-9 at 12% (texture, not subject — D15) + the shared centered ghost
   wordmark. Dark band identical in both themes. */

/* Composite settles at the product register (0.7s) after the copy. */
const compositeIn: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 },
  },
};

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="m5 13 4 4L19 7" />
    </svg>
  );
}

export default function CTA() {
  const { t, lang } = useLanguage();
  const dashboard = getShot("coachDashboard", lang);

  return (
    <section className="relative overflow-hidden bg-primary-dark px-6 py-section-compact-mobile md:py-section-compact">
      {/* F-9 photo backdrop at 12% opacity — texture under the dark teal,
          not a subject; static by design (D15). Decorative: empty alt
          inside an aria-hidden layer. */}
      <div aria-hidden className="absolute inset-0 z-0 opacity-[0.12]">
        <Image
          src="/photos/f-9.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <GhostWordmark />

      <div className="relative z-[1] mx-auto grid max-w-content items-center gap-12 lg:grid-cols-[minmax(0,46fr)_minmax(0,54fr)] lg:gap-14">
        {/* ── Copy column (copy register) ──────────────────────────── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <Badge variant="pill" tone="sage">
            {t.cta.badge}
          </Badge>
          <h2 className="mt-5 text-h2 text-white">{t.cta.h2}</h2>
          <p className="mt-4 max-w-xl text-body-lg text-white/80">
            {t.cta.body}
          </p>
          {/* 2×2 trust rows. Index keys (learning #1): these previously
              keyed by the translated string inside this whileInView parent
              — a latent remount-to-hidden bug, fixed with the rebuild. */}
          <ul className="mt-7 grid justify-start gap-x-7 gap-y-3 sm:grid-cols-[auto_auto]">
            {t.cta.trust.map((item, i) => (
              <li
                key={i}
                className="flex items-center gap-2.5 text-body text-white/85"
              >
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-secondary/15 text-secondary">
                  <CheckIcon className="size-3" />
                </span>
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:gap-5">
            {/* Sage pill — the dark-surface primary (D19), label verbatim */}
            <Button href={APP_URLS.signup} variant="sage">
              {t.cta.ctaLabel}
            </Button>
            <p className="text-center text-sm text-white/60 sm:text-start">
              {t.cta.loginPrompt}{" "}
              <a
                href={APP_URLS.login}
                className="font-semibold text-secondary-pale underline underline-offset-3 hover:text-secondary"
              >
                {t.cta.loginLink}
              </a>
            </p>
          </div>
        </motion.div>

        {/* ── Composite column (product register): real dashboard + phone.
               DESKTOP bleeds off the END edge, clipped by the section's
               overflow-hidden (LTR right / RTL left — D36/§6, unchanged).
               MOBILE renders fully inside the viewport (owner decision at
               2.2c.1 review, D44 — partial supersession of the §2.9 mobile
               bleed clause): ms-3.5 gives the phone's −14px start overhang
               room so nothing crosses the content edge. ────────────────── */}
        <motion.div
          variants={compositeIn}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="relative ms-3.5 lg:-me-45 lg:ms-0"
        >
          <BrowserFrame url="app.wazen.fit/dashboard">
            {/* Top crop — stat tiles + attention queue, the OG-card region.
                Decorative beside the copy (no dictionary key exists for it
                and the Req-10 list is closed); the phone carries the
                composite's accessible name. */}
            <div className="relative aspect-[640/306] w-full">
              <Image
                src={dashboard.src}
                alt=""
                fill
                sizes="(min-width: 1024px) 760px, 100vw"
                className="object-cover object-top dark:opacity-90"
              />
            </div>
          </BrowserFrame>
          <div className="absolute -bottom-6 -start-3.5 w-[108px] lg:-bottom-9 lg:-start-11 lg:w-[172px]">
            <PhoneShot
              name="clientMobileCheckin"
              alt={t.clientApp.phones[1]}
              sizes="172px"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
