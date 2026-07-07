"use client";

import { motion } from "framer-motion";

import { useLanguage } from "@/components/LanguageProvider";
import { fadeUp, staggerContainer, viewport } from "@/components/motion";
import Badge from "@/components/ui/Badge";
import PhoneShot from "@/components/ui/PhoneShot";
import SectionHeader from "@/components/ui/SectionHeader";
import type { ShotName } from "@/lib/screenshots";

/* Real locale-aware PWA captures, index-coupled to t.clientApp.phones. */
const PHONE_SHOTS: ShotName[] = [
  "clientMobileHome",
  "clientMobileCheckin",
  "clientMobileProgress",
];

export default function ClientApp() {
  const { t } = useLanguage();

  return (
    <section
      id="client-app"
      className="bg-primary-light px-6 py-section-compact-mobile md:py-section-compact"
    >
      <div className="mx-auto max-w-content">
        <SectionHeader
          eyebrow={t.clientApp.eyebrow}
          title={t.clientApp.h2}
          description={t.clientApp.description}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mx-auto mt-14 flex max-w-3xl items-end justify-center gap-5 sm:gap-8"
        >
          {PHONE_SHOTS.map((name, i) => (
            <motion.div
              key={name}
              variants={fadeUp}
              className={`w-full max-w-[190px] ${
                i === 1 ? "sm:-translate-y-4" : ""
              } ${i === 2 ? "hidden sm:block" : ""}`}
            >
              <PhoneShot
                name={name}
                alt={t.clientApp.phones[i]}
                sizes="190px"
              />
              <p className="mt-3 text-center text-caption font-medium text-ink/65">
                {t.clientApp.phones[i]}
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
            {t.clientApp.pwaChip}
          </Badge>
        </motion.div>
      </div>
    </section>
  );
}
