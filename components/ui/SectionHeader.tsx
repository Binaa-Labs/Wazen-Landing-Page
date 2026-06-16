"use client";

import { motion } from "framer-motion";

import { fadeUp, viewport } from "@/components/motion";
import Badge, { type BadgeTone } from "@/components/ui/Badge";

type SectionHeaderProps = {
  eyebrow?: string;
  eyebrowTone?: BadgeTone;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "center" | "left";
  /** Flips text colors for the two dark sections (Problem, CTA) */
  onDark?: boolean;
  className?: string;
};

export default function SectionHeader({
  eyebrow,
  eyebrowTone = "primary",
  title,
  description,
  align = "center",
  onDark = false,
  className,
}: SectionHeaderProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className={[
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {eyebrow && (
        <Badge variant="eyebrow" tone={eyebrowTone}>
          {eyebrow}
        </Badge>
      )}
      <h2 className={`text-h2 ${onDark ? "text-white" : "text-ink"}`}>
        {title}
      </h2>
      {description && (
        <p
          className={`max-w-2xl text-body-lg ${
            onDark ? "text-white/70" : "text-ink/60"
          }`}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
