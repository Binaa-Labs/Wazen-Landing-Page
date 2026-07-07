"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { useLanguage } from "@/components/LanguageProvider";
import { fadeUp, staggerContainer, viewport } from "@/components/motion";
import Lightbox from "@/components/ui/Lightbox";
import SectionHeader from "@/components/ui/SectionHeader";
import { getShot, type ShotName } from "@/lib/screenshots";

/* Structural step data — number, icon, screenshot (by locale-aware map name,
   see lib/screenshots.ts). Index-coupled to t.how.steps for title/body/alt.
   `center` centers the crop for captures whose subject is mid-frame (the
   invite modal) instead of the default top-anchored story crop. */
const STEP_META: {
  number: string;
  icon: React.ReactNode;
  shotName: ShotName;
  center?: boolean;
}[] = [
  {
    number: "01",
    icon: (
      <>
        <circle cx="9.5" cy="7.5" r="3.5" />
        <path d="M3.5 19.5c0-3 2.7-5 6-5s6 2 6 5" />
        <path d="M19 8v6M16 11h6" />
      </>
    ),
    shotName: "coachInvite",
    center: true,
  },
  {
    number: "02",
    icon: (
      <>
        <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
        <rect x="9" y="3" width="6" height="4" rx="1" />
        <path d="M9 12h6M9 16h4" />
      </>
    ),
    shotName: "clientPlans",
  },
  {
    number: "03",
    icon: (
      <>
        <path d="M3 4v15a2 2 0 0 0 2 2h16" />
        <path d="m7 14 4-4 3 3 5-6" />
      </>
    ),
    shotName: "coachAnalytics",
  },
];

export default function HowItWorks() {
  const { t, lang } = useLanguage();

  return (
    <section
      id="how-it-works"
      className="bg-bg px-6 py-section-compact-mobile md:py-section-compact"
    >
      <div className="mx-auto max-w-content">
        <SectionHeader
          eyebrow={t.how.eyebrow}
          title={t.how.h2}
          description={t.how.description}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="relative mt-14 grid gap-6 md:grid-cols-3"
        >
          {/* Dashed connector behind the cards: visible only in the two grid
              gaps. top-[59px] centers the 2px rule on the icon circles
              (36px card padding + 24px circle radius = 60px). */}
          <div
            aria-hidden
            className="absolute left-[16.67%] right-[16.67%] top-[59px] hidden border-t-2 border-dashed border-primary/20 md:block"
          />
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
            className="absolute start-2/3 top-[60px] hidden size-4 -translate-x-1/2 -translate-y-1/2 text-primary/30 md:block rtl:rotate-180"
          >
            <path d="m9 6 6 6-6 6" />
          </svg>

          {STEP_META.map((step, i) => {
            const s = getShot(step.shotName, lang);
            return (
            <motion.div
              key={step.number}
              variants={fadeUp}
              whileHover={{
                y: -4,
                boxShadow: "var(--shadow-lg)",
                transition: { duration: 0.25, ease: "easeOut" },
              }}
              className="relative z-[1] flex flex-col overflow-hidden rounded-card border border-primary/8 bg-surface p-9"
            >
              <span
                aria-hidden
                className="absolute end-5 top-3 select-none font-display text-[6rem] font-extrabold leading-none text-primary opacity-5"
              >
                {step.number}
              </span>
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-5"
                  aria-hidden
                >
                  {step.icon}
                </svg>
              </span>
              <h3 className="mt-5 text-h3 text-ink">{t.how.steps[i].title}</h3>
              <p className="mt-2.5 text-body text-ink/60">
                {t.how.steps[i].body}
              </p>
              <div className="mt-auto pt-6">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                <Lightbox
                  src={s.src}
                  alt={t.how.steps[i].alt}
                  width={s.width}
                  height={s.height}
                  className="relative aspect-[2/1] w-full rounded-xl border border-primary/8"
                >
                  <Image
                    src={s.src}
                    alt={t.how.steps[i].alt}
                    fill
                    sizes="(min-width: 1248px) 368px, (min-width: 768px) 30vw, calc(100vw - 96px)"
                    className={`object-cover dark:opacity-90 ${
                      step.center ? "object-center" : "object-top"
                    }`}
                  />
                </Lightbox>
                </motion.div>
              </div>
            </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
