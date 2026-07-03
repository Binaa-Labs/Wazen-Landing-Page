"use client";

import { motion, type Variants } from "framer-motion";

import { useLanguage } from "@/components/LanguageProvider";
import { fadeUp, viewport } from "@/components/motion";
import GhostWordmark from "@/components/ui/GhostWordmark";
import PhotoPlaceholder from "@/components/ui/PhotoPlaceholder";
import SectionHeader from "@/components/ui/SectionHeader";

/* Spec: 60ms item stagger; the right card trails the left by 100ms */
const listStagger = (delay: number): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: delay } },
});

function CrossIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      className="size-3"
      aria-hidden
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-3"
      aria-hidden
    >
      <path d="m5 13 4 4L19 7" />
    </svg>
  );
}

type CardItem = { title: string; body: string };

function ComparisonCard({
  heading,
  items,
  delay,
  tone,
}: {
  heading: string;
  items: CardItem[];
  delay: number;
  tone: "error" | "sage";
}) {
  const isError = tone === "error";
  return (
    <motion.div
      variants={listStagger(delay)}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className={`rounded-card border p-9 ${
        isError
          ? "border-error-border bg-error-bg"
          : "border-secondary/20 bg-secondary/6"
      }`}
    >
      <motion.div variants={fadeUp} className="flex items-center gap-2.5">
        <span
          aria-hidden
          className={`size-2.5 rounded-full ${
            isError ? "bg-error" : "bg-secondary"
          }`}
        />
        <h3 className="text-h3 text-white">{heading}</h3>
      </motion.div>
      {/* Index keys, deliberately: keying motion elements by translated
          strings remounts them on language switch, and children that remount
          inside an already-revealed `once` parent mount at "hidden" and never
          receive the variant propagation again — they stay invisible. */}
      <ul className="mt-6 flex flex-col gap-5">
        {items.map((item, i) => (
          <motion.li key={i} variants={fadeUp} className="flex gap-3.5">
            <span
              className={`mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full ${
                isError
                  ? "bg-error/15 text-error"
                  : "bg-secondary/15 text-secondary"
              }`}
            >
              {isError ? <CrossIcon /> : <CheckIcon />}
            </span>
            <div>
              <p className="font-medium text-white">{item.title}</p>
              <p className="mt-0.5 text-body text-white/75">{item.body}</p>
            </div>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function Problem() {
  const { t } = useLanguage();

  return (
    <section
      id="problem"
      className="relative overflow-hidden bg-primary-dark px-6 py-section-mobile md:py-section"
    >
      <GhostWordmark />
      <div className="relative z-[1] mx-auto max-w-content">
        <SectionHeader
          onDark
          eyebrow={t.problem.eyebrow}
          eyebrowTone="error"
          title={t.problem.h2}
          description={t.problem.description}
        />
        {/* F-2 photo column is desktop-only (lg+); on smaller widths the two
            comparison cards keep their original 2-col/stacked layout. */}
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-[minmax(0,0.55fr)_1fr_1fr]">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="hidden lg:block"
          >
            <PhotoPlaceholder
              label="F-2"
              hint="Overwhelmed coach — dark treated"
              tone="dark"
              className="h-full min-h-[320px]"
            />
          </motion.div>
          <ComparisonCard
            heading={t.problem.oldWayHeading}
            items={t.problem.oldWay}
            delay={0}
            tone="error"
          />
          <ComparisonCard
            heading={t.problem.wazenWayHeading}
            items={t.problem.wazenWay}
            delay={0.1}
            tone="sage"
          />
        </div>
      </div>
    </section>
  );
}
