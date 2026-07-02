"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { useLanguage } from "@/components/LanguageProvider";
import { fadeUp, staggerContainer, viewport } from "@/components/motion";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import SectionHeader from "@/components/ui/SectionHeader";
import { APP_URLS } from "@/lib/links";

type Period = "monthly" | "yearly";
type Currency = "USD" | "AED";

/* AED prices are the fixed launch prices (not a live conversion of the
   3.6725 peg): 49→180, 99→365, 490→1,800, 990→3,635; add-on bundles
   $12/$20/$18 → AED 45/75/65. Savings = 12× monthly − yearly per currency.
   Structural data, index-coupled to t.pricing.plans (addOn strings are
   per-currency in the dictionary). */
const PLAN_META = [
  {
    id: "starter",
    featured: false,
    isFree: true,
    price: null,
    savings: null,
    ctaVariant: "secondary" as const,
  },
  {
    id: "professional",
    featured: true,
    isFree: false,
    price: {
      USD: { monthly: "$49", yearly: "$490" },
      AED: { monthly: "AED 180", yearly: "AED 1,800" },
    },
    savings: { USD: "$98", AED: "AED 360" },
    ctaVariant: "primary" as const,
  },
  {
    id: "premium",
    featured: false,
    isFree: false,
    price: {
      USD: { monthly: "$99", yearly: "$990" },
      AED: { monthly: "AED 365", yearly: "AED 3,635" },
    },
    savings: { USD: "$198", AED: "AED 745" },
    ctaVariant: "secondary" as const,
  },
];

/* Tool chip icons, index-coupled to t.pricing.tools:
   WhatsApp (chat) / spreadsheets (table) / form tools (clipboard) /
   progress trackers (trend line) */
const TOOL_ICONS = [
  <path
    key="chat"
    d="M21 11.5c0 3.6-4 6.5-9 6.5-1.1 0-2.1-.13-3.1-.38L4.5 19.5l1.4-3.1C4.7 15.2 3 13.5 3 11.5 3 7.9 7 5 12 5s9 2.9 9 6.5Z"
  />,
  (
    <>
      <rect x="4" y="5" width="16" height="14" rx="2" />
      <path d="M4 10h16M10 10v9" />
    </>
  ),
  (
    <>
      <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
      <rect x="9" y="3" width="6" height="4" rx="1" />
      <path d="M9 13h6M9 16.5h4" />
    </>
  ),
  (
    <>
      <path d="m3 16.5 5.5-5.5 4 4L21 7" />
      <path d="M15.5 7H21v5.5" />
    </>
  ),
];

function ToolChip({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-pill border border-ink/10 bg-bg px-2.5 py-1 text-caption text-ink/70">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-3.5 text-primary"
        aria-hidden
      >
        {icon}
      </svg>
      {label}
    </span>
  );
}

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

/* Manual USD/AED switch (no geo-IP): defaults follow the locale — AED on
   /ar, USD on /en — and re-follow a language switch until the visitor picks
   a currency themselves. */
function CurrencyToggle({
  currency,
  onChange,
}: {
  currency: Currency;
  onChange: (currency: Currency) => void;
}) {
  return (
    <div className="relative inline-flex rounded-pill border border-primary/15 bg-surface p-1">
      {(["USD", "AED"] as const).map((option) => {
        const selected = option === currency;
        return (
          <button
            key={option}
            onClick={() => onChange(option)}
            aria-pressed={selected}
            className="relative cursor-pointer rounded-pill px-4 py-2 text-sm font-medium"
          >
            {selected && (
              <motion.span
                layoutId="currency-pill"
                transition={{ type: "spring", duration: 0.45, bounce: 0.2 }}
                className="absolute inset-0 rounded-pill bg-primary"
              />
            )}
            <span
              className={`relative z-[1] transition-colors ${
                selected ? "text-white" : "text-ink/60"
              }`}
            >
              {option}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default function Pricing() {
  const { t, lang } = useLanguage();
  const [period, setPeriod] = useState<Period>("monthly");
  const [currency, setCurrency] = useState<Currency>(
    lang === "ar" ? "AED" : "USD",
  );
  const currencyTouched = useRef(false);

  /* Re-default the currency when the visitor switches language, unless
     they've explicitly chosen one. */
  useEffect(() => {
    if (!currencyTouched.current) {
      setCurrency(lang === "ar" ? "AED" : "USD");
    }
  }, [lang]);

  const pickCurrency = (next: Currency) => {
    currencyTouched.current = true;
    setCurrency(next);
  };

  return (
    <section
      id="pricing"
      className="bg-bg px-6 py-section-compact-mobile md:py-section-compact"
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
          className="mt-10 flex flex-wrap items-center justify-center gap-3 text-center"
        >
          <BillingToggle period={period} onChange={setPeriod} />
          <CurrencyToggle currency={currency} onChange={pickCurrency} />
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
            const priceMain = plan.price
              ? plan.price[currency][period]
              : t.pricing.free;
            const priceSuffix = plan.isFree
              ? t.pricing.forever
              : period === "monthly"
                ? t.pricing.perMonth
                : t.pricing.perYear;
            const savings = plan.savings
              ? t.pricing.saveYearly.replace("{amount}", plan.savings[currency])
              : "";
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
                      key={`${period}-${currency}-${plan.id}`}
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
                    {period === "yearly" && savings && (
                      <motion.div
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                      >
                        <Badge variant="pill" tone="sage">
                          {savings}
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

                {copy.addOn[currency] && (
                  <p className="mt-5 border-t border-ink/8 pt-4 text-caption text-ink/55">
                    {copy.addOn[currency]}
                  </p>
                )}

                <div className="mt-auto pt-7">
                  <Button
                    href={APP_URLS.signup}
                    variant={plan.ctaVariant}
                    className="w-full"
                  >
                    {copy.cta}
                  </Button>
                  <p className="mt-3 text-center text-caption text-ink/50">
                    {plan.isFree ? t.pricing.microFree : t.pricing.microPaid}
                  </p>
                  {copy.note && (
                    <p className="mt-1.5 text-center text-caption text-ink/50">
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
          <p className="mt-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-caption text-ink/60">
            {t.pricing.tools.map((tool, i) => (
              <Fragment key={i}>
                {i > 0 && (
                  <span aria-hidden className="text-ink/35">
                    +
                  </span>
                )}
                <ToolChip icon={TOOL_ICONS[i]} label={tool} />
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
