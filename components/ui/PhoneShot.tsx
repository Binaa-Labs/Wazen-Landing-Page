"use client";

import Image from "next/image";

import { useLanguage } from "@/components/LanguageProvider";
import PhoneFrame from "@/components/ui/PhoneFrame";
import { getShot, type ShotName } from "@/lib/screenshots";

/* A PhoneFrame filled with a locale-aware real PWA capture (Pass C.2a —
   replaces the Pass A skeletons). Captures are 1170×2532 (D9); the frame's
   9/19 window crops a sliver off the bottom via cover/top. */

type PhoneShotProps = {
  name: ShotName;
  /** Meaningful description, or "" when purely decorative in a composite */
  alt: string;
  sizes?: string;
  className?: string;
};

export default function PhoneShot({
  name,
  alt,
  sizes = "200px",
  className,
}: PhoneShotProps) {
  const { lang } = useLanguage();
  const shot = getShot(name, lang);
  return (
    <PhoneFrame className={className}>
      <Image
        src={shot.src}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover object-top dark:opacity-90"
      />
    </PhoneFrame>
  );
}
