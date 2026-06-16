"use client";

import { Fragment, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { useLanguage } from "@/components/LanguageProvider";
import { fadeUp, staggerContainer, viewport } from "@/components/motion";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import SectionHeader from "@/components/ui/SectionHeader";

const SIGNUP_URL = "https://app.wazen.com/signup";

type Period = "monthly" | "yearly";

/* Structural plan data — prices stay literal (not translated), CTA style,
   featured flag. Index-coupled to t.pricing.plans for name/highlight/
   features/addOn/cta/note/savings. */
const PLAN_META = [
  {
    id: "starter",
    featured: false,
    isFree: true,
    price: { monthly: "", yearly: "" },
    ctaVariant: "secondary" as const,
  },
  {
    id: "professional",
    featured: true,
    isFree: false,
    price: { monthly: "$49", yearly: "$490" },
    ctaVariant: "primary" as const,
  },
  {
    id: "premium",
    featured: false,
    isFree: false,
    price: { monthly: "$99", yearly: "$990" },
    ctaVariant: "secondary" as const,
  },
];

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mt-0.5 size-4 shrink-0 text-secondary-dark"
      aria-hidden
    >
      <path d="m5 13 4 4L19 7" />
    </svg>
  );
}

function BillingToggle({
  period,
  onChange,
}: {
  period: Period;
  onChange: (period: Period) => void;
}) {
  const { t } = useLanguage();
  return (
    <div className="relative inline-flex rounded-pill border border-primary/15 bg-surface p-1">
      {(["monthly", "yearly"] as const).map((option) => {
        const selected = option === period;
        return (
          <button
            key={option}
            onClick={() => onChange(option)}
            aria-pressed={selected}
            className="relative cursor-pointer rounded-pill px-5 py-2 text-sm font-medium"
          >
            {selected && (
              <motion.span
                layoutId="billing-pill"
                transition={{ type: "spring", duration: 0.45, bounce: 0.2 }}
                className="absolute inset-0 rounded-pill bg-primary"
              />
            )}
            <span
              className={`relative z-[1] flex items-center transition-colors ${
                selected ? "text-white" : "text-ink/60"
              }`}
            >
              {option === "monthly" ? (
                t.pricing.monthly
              ) : (
                <>
                  {t.pricing.yearly}
                  <span
                    className={`ms-1.5 rounded-badge px-1.5 py-0.5 text-[10px] font-medium ${
                      selected
                        ? "bg-white/15 text-white"
                        : "bg-secondary-light text-secondary-dark"
                    }`}
                  >
                    {t.pricing.save2mo}
                  </span>
                </>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default function Pricing() {
  const { t } = useLanguage();
  const [period, setPeriod] = useState<Period>("monthly");

  return (
    <section
      id="pricing"
      className="bg-bg px-6 py-section-mobile md:py-section"
    >
      <div className="mx-auto max-w-content">
        <SectionHeader
          eyebrow={t.pricing.eyebrow}
          title={t.pricing.h2}
          description={t.pricing.description}
        />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mt-10 text-center"
        >
          <BillingToggle period={period} onChange={setPeriod} />
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mt-12 grid items-stretch gap-6 md:grid-cols-3"
        >
          {PLAN_META.map((plan, i) => {
            const copy = t.pricing.plans[i];
            const priceMain = plan.isFree ? t.pricing.free : plan.price[period];
            const priceSuffix = plan.isFree
              ? t.pricing.forever
              : period === "monthly"
                ? t.pricing.perMonth
                : t.pricing.perYear;
            return (
              <motion.div
                key={plan.id}
                variants={fadeUp}
                whileHover={{
                  y: -4,
                  boxShadow: "var(--shadow-lg)",
                  transition: { duration: 0.25, ease: "easeOut" },
                }}
                className={`relative flex flex-col rounded-card bg-surface p-8 ${
                  plan.featured
                    ? "border-2 border-primary shadow-lg md:-translate-y-2"
                    : "border border-primary/10 shadow-sm"
                }`}
              >
                {plan.featured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <Badge variant="pill" tone="sage">
                      {t.pricing.mostPopular}
                    </Badge>
                  </div>
                )}

                <h3 className="text-h3 text-ink">{copy.name}</h3>

                <div className="mt-4 flex min-h-16 items-baseline">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={`${period}-${plan.id}`}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className="flex items-baseline gap-1.5"
                    >
                      <span className="font-display text-5xl font-bold tracking-tight text-ink">
                        {priceMain}
                      </span>
                      <span className="text-body text-ink/55">{priceSuffix}</span>
                    </motion.span>
                  </AnimatePresence>
                </div>

                {/* Reserved height so the savings badge doesn't reflow the card */}
                <div className="mt-2 min-h-7">
                  <AnimatePresence>
                    {period === "yearly" && copy.savings && (
                      <motion.div
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                      >
                        <Badge variant="pill" tone="sage">
                          {copy.savings}
                        </Badge>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <p className="mt-3 text-sm font-medium text-primary">
                  {copy.highlight}
                </p>

                <ul className="mt-6 flex flex-col gap-3">
                  {copy.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-body text-ink/75"
                    >
                      <CheckIcon />
                      {feature}
                    </li>
                  ))}
                </ul>

                {copy.addOn && (
                  <p className="mt-5 border-t border-ink/8 pt-4 text-caption text-ink/55">
                    {copy.addOn}
                  </p>
                )}

                <div className="mt-auto pt-7">
                  <Button
                    href={SIGNUP_URL}
                    variant={plan.ctaVariant}
                    className="w-full"
                  >
                    {copy.cta}
                  </Button>
                  {copy.note && (
                    <p className="mt-3 text-center text-caption text-ink/50">
                      {copy.note}
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mx-auto mt-16 max-w-3xl rounded-card border border-primary/10 bg-surface p-6 text-center"
        >
          <p className="text-body-lg font-medium text-ink">
            {t.pricing.stripHeadline}
          </p>
          <p className="mt-3 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-caption text-ink/60">
            {t.pricing.tools.map((tool, i) => (
              <Fragment key={tool}>
                {i > 0 && (
                  <span aria-hidden className="text-ink/35">
                    +
                  </span>
                )}
                <span>{tool}</span>
              </Fragment>
            ))}
            <span aria-hidden className="text-ink/35">
              =
            </span>
            <span className="text-ink/50 line-through decoration-error/60">
              {t.pricing.stripOld}
            </span>
            <span aria-hidden className="text-ink/35">
              →
            </span>
            <span className="font-semibold text-primary">
              {t.pricing.stripNew}
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
