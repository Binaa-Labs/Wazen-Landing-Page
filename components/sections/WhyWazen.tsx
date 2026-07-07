"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { useLanguage } from "@/components/LanguageProvider";
import { fadeUp, scaleIn, staggerContainer, viewport } from "@/components/motion";
import Badge from "@/components/ui/Badge";
import BrowserFrame from "@/components/ui/BrowserFrame";
import Lightbox from "@/components/ui/Lightbox";
import SectionHeader from "@/components/ui/SectionHeader";
import { getShot } from "@/lib/screenshots";

/* Pass A note: the animated count-up stats were removed — they dressed
   product facts ("5 free clients", "6+ tools") in the visual language of
   scale metrics. Plain value-prop pillars instead; the coach-profile proof
   screenshot takes the visual slot in Pass C, and useCountUp stays available
   for future real metrics. */

export default function WhyWazen() {
  const { t, lang } = useLanguage();
  const profile = getShot("coachProfile", lang);

  return (
    <section
      id="why-wazen"
      className="bg-bg px-6 py-section-compact-mobile md:py-section-compact"
    >
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
          {/* Index keys: translated-string keys remount these on language
              switch and they'd mount hidden inside the already-revealed
              parent (see Problem.tsx note). */}
          {t.why.pillars.map((pillar, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="px-8 py-6 text-center"
            >
              <h3 className="text-h3 text-primary">{pillar.title}</h3>
              <p className="mx-auto mt-2.5 max-w-xs text-body text-ink/60">
                {pillar.body}
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

        {/* Coach-profile proof point (P0-4 step 2; capture re-shot in Pass B)
            paired with the F-7 regional photo (owner's pick over F-10). The
            source is a 4:5 portrait crop; below lg the slot flips to 3:2, so
            the image is anchored ~30% from the top to keep the subject's head
            in frame. */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mx-auto mt-14 grid max-w-4xl items-stretch gap-6 lg:grid-cols-[1.6fr_1fr]"
        >
          <div className="flex flex-col">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <BrowserFrame url="app.wazen.fit/coach/karim">
                <Lightbox
                  src={profile.src}
                  alt={t.why.profileAlt}
                  width={profile.width}
                  height={profile.height}
                  className="relative aspect-[16/10] w-full"
                >
                  <Image
                    src={profile.src}
                    alt={t.why.profileAlt}
                    fill
                    sizes="(min-width: 1024px) 560px, calc(100vw - 48px)"
                    className="object-cover object-top dark:opacity-90"
                  />
                </Lightbox>
              </BrowserFrame>
            </motion.div>
            <p className="mt-4 text-center text-caption text-ink/55">
              {t.why.profileCaption}
            </p>
          </div>
          {/* min-h only at lg: pairing min-height with the max-lg aspect-ratio
              transfers a 420px min-WIDTH through the ratio on mobile, which
              overflows the 342px column and stretches the layout viewport. */}
          <motion.div
            variants={scaleIn}
            className="relative overflow-hidden rounded-xl max-lg:aspect-[3/2] lg:min-h-[280px]"
          >
            <Image
              src="/photos/f-7.webp"
              alt={t.why.regionalPhotoAlt}
              fill
              sizes="(min-width: 1024px) 340px, calc(100vw - 48px)"
              className="object-cover object-[50%_30%] lg:object-center"
            />
          </motion.div>
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
