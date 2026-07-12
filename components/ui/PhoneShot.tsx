"use client";

import Image from "next/image";

import { useLanguage } from "@/components/LanguageProvider";
import Lightbox from "@/components/ui/Lightbox";
import PhoneFrame from "@/components/ui/PhoneFrame";
import { getShot, type ShotName } from "@/lib/screenshots";

/* A PhoneFrame filled with a locale-aware real PWA capture (Pass C.2a —
   replaces the Pass A skeletons). Captures are 1170×2532 (D9); the frame's
   9/19 window crops a sliver off the bottom via cover/top.

   Every phone capture opens the shared Lightbox (post-2.1 fix-up) — the
   dialog keeps the capture inside the phone chrome at ~85vh, matching the
   desktop captures' click/Enter/Escape/backdrop semantics. The in-place
   capture stays lazy; the dialog image only mounts on open. */

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
    <Lightbox
      variant="phone"
      src={shot.src}
      alt={alt}
      width={shot.width}
      height={shot.height}
    >
      <PhoneFrame className={className}>
        <Image
          src={shot.src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover object-top dark:opacity-90"
        />
      </PhoneFrame>
    </Lightbox>
  );
}
