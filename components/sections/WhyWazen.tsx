"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { useLanguage } from "@/components/LanguageProvider";
import { fadeUp, staggerContainer, viewport } from "@/components/motion";
import Badge from "@/components/ui/Badge";
import BrowserFrame from "@/components/ui/BrowserFrame";
import SectionHeader from "@/components/ui/SectionHeader";

/* Figures stay numeric/literal; labels are index-coupled to t.why.statLabels */
const figures = ["5", "6+", "2-in-1"];

export default function WhyWazen() {
  const { t } = useLanguage();

  return (
    <section id="why-wazen" className="bg-bg px-6 py-section-mobile md:py-section">
      <div className="mx-auto max-w-content">
        <SectionHeader
          eyebrow={t.why.eyebrow}
          title={t.why.h2}
          description={t.why.description}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mx-auto mt-14 grid max-w-4xl divide-y divide-ink/8 md:grid-cols-3 md:divide-x md:divide-y-0"
        >
          {figures.map((figure, i) => (
            <motion.div
              key={figure}
              variants={fadeUp}
              className="px-8 py-6 text-center"
            >
              <p className="font-display text-[clamp(2.4rem,4.5vw,3.8rem)] font-extrabold leading-none text-primary">
                {figure}
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
          <BrowserFrame url="app.wazen.com/coach-profile">
            <Image
              src="/screenshots/Client-Coach-Profile-View.png"
              alt={t.why.profileAlt}
              width={1902}
              height={910}
              className="h-auto w-full"
            />
          </BrowserFrame>
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
