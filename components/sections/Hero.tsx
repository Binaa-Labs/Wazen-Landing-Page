"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

import { useLanguage } from "@/components/LanguageProvider";
import { fadeUp, staggerContainer } from "@/components/motion";
import Badge from "@/components/ui/Badge";
import BrowserFrame from "@/components/ui/BrowserFrame";
import Button from "@/components/ui/Button";
import Lightbox from "@/components/ui/Lightbox";
import { APP_URLS } from "@/lib/links";

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
  const { t } = useLanguage();

  /* Parallax: the framed screenshot drifts at ~80% of scroll speed as the
     section scrolls through the viewport. */
  const frameRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -60]);

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
            <Button href={APP_URLS.signup}>{t.hero.ctaPrimary}</Button>
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

        <div ref={frameRef} className="relative mt-16 perspective-[1200px]">
          {/* Ambient teal glow behind the frame */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[70%] w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-primary/25 blur-[90px]"
          />
          <motion.div
            style={{ y: parallaxY }}
            initial={{ opacity: 0, rotateX: 8, scale: 0.96 }}
            animate={{ opacity: 1, rotateX: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          >
            <motion.div
              whileHover={{ scale: 1.03, y: -4 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="w-full"
            >
              <BrowserFrame url="wazen.fit/dashboard">
                <Lightbox
                  src="/screenshots/Coach-Dashboard.png"
                  alt={t.hero.dashboardAlt}
                  width={1905}
                  height={910}
                  className="w-full"
                >
                  <Image
                    src="/screenshots/Coach-Dashboard.png"
                    alt={t.hero.dashboardAlt}
                    width={1905}
                    height={910}
                    priority
                    className="h-auto w-full"
                  />
                </Lightbox>
              </BrowserFrame>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
