"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

import { useLanguage } from "@/components/LanguageProvider";
import { useCountUp } from "@/components/useCountUp";
import { fadeUp, staggerContainer, viewport } from "@/components/motion";
import Badge from "@/components/ui/Badge";
import BrowserFrame from "@/components/ui/BrowserFrame";
import Lightbox from "@/components/ui/Lightbox";
import SectionHeader from "@/components/ui/SectionHeader";

/* Figures are index-coupled to t.why.statLabels. The two numeric stats count
   up on scroll-into-view; "2-in-1" just fades in. */
type Stat =
  | { id: string; counter: true; to: number; suffix: string }
  | { id: string; counter: false; display: string };

const STATS: Stat[] = [
  { id: "free", counter: true, to: 5, suffix: "" },
  { id: "tools", counter: true, to: 6, suffix: "+" },
  { id: "two-in-one", counter: false, display: "2-in-1" },
];

function CounterFigure({
  to,
  suffix,
  active,
}: {
  to: number;
  suffix: string;
  active: boolean;
}) {
  const value = useCountUp(to, active);
  return (
    <>
      {value}
      {suffix}
    </>
  );
}

export default function WhyWazen() {
  const { t } = useLanguage();
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-80px" });

  return (
    <section id="why-wazen" className="bg-bg px-6 py-section-mobile md:py-section">
      <div className="mx-auto max-w-content">
        <SectionHeader
          eyebrow={t.why.eyebrow}
          title={t.why.h2}
          description={t.why.description}
        />

        <motion.div
          ref={statsRef}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mx-auto mt-14 grid max-w-4xl divide-y divide-ink/8 md:grid-cols-3 md:divide-x md:divide-y-0"
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.id}
              variants={fadeUp}
              className="px-8 py-6 text-center"
            >
              <p className="font-display text-[clamp(2.4rem,4.5vw,3.8rem)] font-extrabold leading-none text-primary">
                {stat.counter ? (
                  <CounterFigure
                    to={stat.to}
                    suffix={stat.suffix}
                    active={statsInView}
                  />
                ) : (
                  stat.display
                )}
              </p>
              <p className="mx-auto mt-2 max-w-xs text-body text-ink/60">
                {t.why.statLabels[i]}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mt-10 text-center"
        >
          <Badge variant="pill" tone="sage" className="px-5 py-2">
            {t.why.bilingualBadge}
          </Badge>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mx-auto mt-16 max-w-3xl"
        >
          <motion.div
            whileHover={{ scale: 1.03, y: -4 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-full"
          >
            <BrowserFrame url="app.wazen.com/coach-profile">
              <Lightbox
                src="/screenshots/Client-Coach-Profile-View.png"
                alt={t.why.profileAlt}
                width={1902}
                height={910}
                className="w-full"
              >
                <Image
                  src="/screenshots/Client-Coach-Profile-View.png"
                  alt={t.why.profileAlt}
                  width={1902}
                  height={910}
                  className="h-auto w-full"
                />
              </Lightbox>
            </BrowserFrame>
          </motion.div>
          <p className="mt-4 text-center text-caption text-ink/55">
            {t.why.profileCaption}
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mx-auto mt-12 max-w-3xl rounded-card border border-primary/10 border-s-4 border-s-secondary bg-surface p-8 shadow-sm"
        >
          <Badge variant="eyebrow" tone="sage">
            {t.why.founderEyebrow}
          </Badge>
          <blockquote className="mt-5 text-body-lg text-ink/80">
            {t.why.founderQuote}
          </blockquote>
          <div className="mt-6 flex items-center gap-3">
            <span
              aria-hidden
              className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white"
            >
              NS
            </span>
            <p className="text-sm text-ink/60">{t.why.founderName}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
