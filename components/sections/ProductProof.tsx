"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

import { useLanguage } from "@/components/LanguageProvider";
import { fadeUp, viewport } from "@/components/motion";
import BrowserFrame from "@/components/ui/BrowserFrame";
import Lightbox from "@/components/ui/Lightbox";
import PhoneShot from "@/components/ui/PhoneShot";
import { getShot } from "@/lib/screenshots";

/* Product-proof section (D17): the Phase 1 hero composite — browser-framed
   coach dashboard + overlapping client-app phone + lightbox + glow +
   parallax — relocated below the photography hero. Entrances switched from
   on-load to whileInView (it sits below the fold now) and the dashboard
   capture is lazy (no preload) for the same reason. The Phase 1 annotation
   chips were removed in the post-2.1 fix-up (owner preview review). */

export default function ProductProof() {
  const { t, lang } = useLanguage();
  const dash = getShot("coachDashboard", lang);

  /* Parallax: the framed screenshot drifts at ~80% of scroll speed as the
     section scrolls through the viewport. */
  const frameRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    /* Bottom padding is deliberately tighter than py-section: the TrustBar
       strip below attaches to this section visually (still clears the phone
       frame's -bottom-8 overhang). */
    <section className="bg-bg px-6 pb-16 pt-section-mobile md:pb-20 md:pt-section">
      <div className="mx-auto max-w-[1120px]">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex flex-col items-center gap-4 text-center"
        >
          <h2 className="text-h2 text-ink">{t.productProof.h2}</h2>
          <p className="max-w-2xl text-body-lg text-ink/60">
            {t.productProof.sub}
          </p>
        </motion.div>

        {/* Composite: coach dashboard in a browser frame + the client app in
            an overlapping phone frame — the coach↔client pairing in one
            glance. Both are real locale-aware captures (Pass C.2a). */}
        <div ref={frameRef} className="relative mt-12 perspective-[1200px]">
          {/* Ambient teal glow behind the frame */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[70%] w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-primary/25 blur-[90px]"
          />
          <motion.div
            style={{ y: parallaxY }}
            initial={{ opacity: 0, rotateX: 8, scale: 0.96 }}
            whileInView={{ opacity: 1, rotateX: 0, scale: 1 }}
            viewport={viewport}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="relative"
          >
            <motion.div
              whileHover={{ scale: 1.03, y: -4 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="w-full"
            >
              <BrowserFrame url="app.wazen.fit/dashboard">
                <Lightbox
                  src={dash.src}
                  alt={t.hero.dashboardAlt}
                  width={dash.width}
                  height={dash.height}
                  className="w-full"
                >
                  <Image
                    src={dash.src}
                    alt={t.hero.dashboardAlt}
                    width={dash.width}
                    height={dash.height}
                    sizes="(min-width: 1168px) 1120px, calc(100vw - 48px)"
                    className="h-auto w-full dark:opacity-90"
                  />
                </Lightbox>
              </BrowserFrame>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
              className="absolute -bottom-8 end-3 z-[2] w-[26%] min-w-[104px] max-w-[170px] sm:end-8"
            >
              <PhoneShot
                name="clientMobileHome"
                alt={t.features.clientLabel}
                sizes="170px"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
