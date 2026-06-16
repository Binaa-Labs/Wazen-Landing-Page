"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { useLanguage } from "@/components/LanguageProvider";
import { fadeUp, staggerContainer } from "@/components/motion";
import Badge from "@/components/ui/Badge";
import BrowserFrame from "@/components/ui/BrowserFrame";
import Button from "@/components/ui/Button";

const SIGNUP_URL = "https://app.wazen.com/signup";

/* Fixed bilingual identity element — shown only under the English headline,
   since in Arabic mode the H1 itself is already Arabic. Not an i18n string. */
const BILINGUAL_LINE = "أدِر عملك مع عملائك من مكان واحد، منظّم وسلس";

function WavyUnderline() {
  return (
    <svg
      viewBox="0 0 300 12"
      preserveAspectRatio="none"
      aria-hidden
      className="absolute -bottom-1.5 left-0 h-2.5 w-full text-secondary md:-bottom-2.5 md:h-3"
    >
      <path
        d="M2 9 Q 20 3, 40 8 T 80 8 T 120 8 T 160 8 T 200 8 T 240 8 T 298 7"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Hero() {
  const { t, lang } = useLanguage();

  return (
    <section className="bg-bg px-6 pt-36 pb-section-mobile md:pt-44 md:pb-section">
      <div className="mx-auto max-w-[1120px] text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-6"
        >
          <motion.div variants={fadeUp}>
            <Badge variant="pill" tone="sage" dot>
              {t.hero.badge}
            </Badge>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-display text-balance text-ink max-md:text-[clamp(1.5rem,7vw,2.6rem)]"
          >
            <span className="block">{t.hero.h1Line1}</span>
            <span className="relative inline-block whitespace-nowrap">
              {t.hero.h1Underlined}
              <WavyUnderline />
            </span>
          </motion.h1>

          {lang === "en" && (
            <motion.p
              variants={fadeUp}
              dir="rtl"
              lang="ar"
              className="font-arabic text-[clamp(1.43rem,3vw,2.42rem)] font-medium text-primary opacity-65"
            >
              {BILINGUAL_LINE}
            </motion.p>
          )}

          <motion.p
            variants={fadeUp}
            className="mx-auto max-w-2xl text-body-lg text-ink/60"
          >
            {t.hero.subheadline}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Button href={SIGNUP_URL}>{t.hero.ctaPrimary}</Button>
            <Button variant="secondary" href="#features">
              {t.hero.ctaSecondary}
            </Button>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-caption text-ink/55"
          >
            {t.hero.trust.map((item) => (
              <span key={item} className="inline-flex items-center gap-1.5">
                <span aria-hidden className="text-success">
                  ✓
                </span>
                {item}
              </span>
            ))}
          </motion.div>
        </motion.div>

        <div className="mt-16 perspective-[1200px]">
          <motion.div
            initial={{ opacity: 0, rotateX: 8, scale: 0.96 }}
            animate={{ opacity: 1, rotateX: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            whileHover={{
              y: -4,
              transition: { duration: 0.25, ease: "easeOut" },
            }}
          >
            <BrowserFrame url="app.wazen.com/dashboard">
              <Image
                src="/screenshots/Coach-Dashboard.png"
                alt={t.hero.dashboardAlt}
                width={1905}
                height={910}
                priority
                className="h-auto w-full"
              />
            </BrowserFrame>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
