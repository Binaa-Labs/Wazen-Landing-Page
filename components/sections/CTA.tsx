"use client";

import { motion, type Variants } from "framer-motion";

import { useLanguage } from "@/components/LanguageProvider";
import { fadeUp, viewport } from "@/components/motion";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import GhostWordmark from "@/components/ui/GhostWordmark";
import PhoneShot from "@/components/ui/PhoneShot";
import { APP_URLS } from "@/lib/links";

/* Abstract dashboard corner (stat tiles + review queue) paired with the
   client-app phone — a small product composite in place of the old
   feature-list card. Decorative; Pass C may swap in a real capture crop. */
function MiniDashboard() {
  return (
    <div
      aria-hidden
      className="overflow-hidden rounded-xl border border-ink/8 bg-bg p-3.5 pe-[30%]"
    >
      <div className="flex gap-2">
        {[0, 1].map((i) => (
          <div key={i} className="flex-1 rounded-lg bg-surface p-2.5 shadow-sm">
            <div className="h-1.5 w-8 rounded-pill bg-ink/10" />
            <div className="mt-2 h-2.5 w-12 rounded-pill bg-primary/25" />
          </div>
        ))}
      </div>
      <div className="mt-2.5 flex flex-col gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="flex items-center gap-2 rounded-lg bg-surface p-2 shadow-sm"
          >
            <div className="size-5 shrink-0 rounded-full bg-primary/20" />
            <div className="h-1.5 w-1/2 rounded-pill bg-ink/10" />
            <div className="ms-auto h-4 w-10 rounded-pill bg-secondary-light" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* Shared fadeUp timing plus a 150ms trail so the card lands after the
   left column */
const fadeUpDelayed: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.15 },
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
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-primary-dark px-6 py-section-compact-mobile md:py-section-compact">
      {/* F-9 backdrop slot at the real 10–15% treatment (12%) so the effect
          can be judged now; Pass C.2 swaps the gradient/texture layer for the
          sourced photo at the same opacity. The corner tag is the only
          full-opacity part, for slot identification. */}
      <div
        aria-hidden
        className="absolute inset-0 z-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(120deg, hsl(99,22%,72%) 0%, transparent 45%, hsl(186,28%,58%) 100%), repeating-linear-gradient(45deg, rgba(255,255,255,0.5) 0 1px, transparent 1px 16px)",
        }}
      />
      <span
        aria-hidden
        className="absolute end-4 top-4 z-[2] rounded-pill bg-white/15 px-3 py-1 text-caption font-semibold text-white/80"
      >
        F-9 · backdrop
      </span>
      <GhostWordmark />
      <div className="relative z-[1] mx-auto grid max-w-content items-center gap-12 lg:grid-cols-2">
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
          <ul className="mt-7 flex flex-col gap-3">
            {t.cta.trust.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2.5 text-body text-white/85"
              >
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-secondary/15 text-secondary">
                  <CheckIcon className="size-3" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          variants={fadeUpDelayed}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="rounded-card bg-surface p-7 shadow-xl sm:p-9"
        >
          <h3 className="text-h3 text-primary dark:text-ink">
            {t.cta.cardTitle}
          </h3>
          <p className="mt-2 text-caption text-ink/55">{t.cta.cardSub}</p>
          <div className="relative mt-6 pb-7">
            <MiniDashboard />
            {/* Decorative within the aria-hidden composite — empty alt */}
            <div className="absolute -bottom-4 end-3 w-[26%] min-w-[88px] max-w-[120px]">
              <PhoneShot name="clientMobileCheckin" alt="" sizes="120px" />
            </div>
          </div>
          <Button href={APP_URLS.signup} className="mt-5 w-full">
            {t.cta.ctaLabel}
          </Button>
          <p className="mt-4 text-center text-caption text-ink/55">
            {t.cta.loginPrompt}{" "}
            <a
              href={APP_URLS.login}
              className="font-medium text-primary hover:underline dark:text-ink"
            >
              {t.cta.loginLink}
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
