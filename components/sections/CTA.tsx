"use client";

import { motion, type Variants } from "framer-motion";

import { useLanguage } from "@/components/LanguageProvider";
import { fadeUp, viewport } from "@/components/motion";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import GhostWordmark from "@/components/ui/GhostWordmark";
import { APP_URLS } from "@/lib/links";

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
          className="rounded-card bg-surface p-9 shadow-xl"
        >
          <h3 className="text-h3 text-primary dark:text-ink">
            {t.cta.cardTitle}
          </h3>
          <p className="mt-2 text-caption text-ink/55">{t.cta.cardSub}</p>
          <ul className="mt-6 flex flex-col gap-3">
            {t.cta.cardFeatures.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-2.5 text-body text-ink/75"
              >
                <CheckIcon className="mt-0.5 size-4 shrink-0 text-secondary-dark" />
                {feature}
              </li>
            ))}
          </ul>
          <Button href={APP_URLS.signup} className="mt-7 w-full">
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
