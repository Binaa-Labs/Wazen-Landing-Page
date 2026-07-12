"use client";

import Image from "next/image";

import { useLanguage } from "@/components/LanguageProvider";
import { getShot, type ShotName } from "@/lib/screenshots";

/* An aspect-locked crop of a REGION of a real capture (Stage 2, D26–D39):
   the "fragment" presentation — stat tiles, queue rows, metric cards —
   lifted out of a full screenshot without inventing any UI and without new
   image files. The mock-era CSS background eyeball-crops become proper
   next/image renders here.

   Geometry: the outer box fixes the visible aspect; the inner sheet is the
   whole capture at its intrinsic ratio, scaled so `w` percent of its width
   fills the box (width: 100·100/w %), then shifted by translate(-x%, -y%) —
   translate percentages resolve against the SHEET's own size, which is the
   capture, so region offsets map 1:1 and no box-height math is needed. The
   region's visible height follows from the box aspect — pick the aspect to
   match the region. The shift is a static style, never animated (the
   transform/opacity motion rule applies to animations, and animating this
   sheet would fight Framer parents).

   Regions are PER LOCALE and PHYSICAL (left-anchored percentages, not
   logical): the AR captures are native-RTL re-captures, not mirrors of the
   EN pixels, so each locale's region is calibrated independently against
   its own capture (same reasoning as the Pass A.1 content-anchored chips).

   Fragments are decorative echoes of real product UI — the copy beside
   them carries the semantics — so they default to alt="" + aria-hidden
   (and no new i18n keys are needed). Pass `alt` to opt into semantics. */

export type FragmentRegion = {
  /** Left edge of the region, as % of capture width (physical, not logical) */
  x: number;
  /** Top edge of the region, as % of capture height */
  y: number;
  /** Region width, as % of capture width — the zoom factor is 100/w */
  w: number;
};

type CaptureFragmentProps = {
  name: ShotName;
  region: { en: FragmentRegion; ar: FragmentRegion };
  /** Fixed-aspect class for the visible box, e.g. "aspect-[8/3]" */
  aspect: string;
  alt?: string;
  sizes?: string;
  className?: string;
};

export default function CaptureFragment({
  name,
  region,
  aspect,
  alt = "",
  sizes = "640px",
  className = "",
}: CaptureFragmentProps) {
  const { lang } = useLanguage();
  const shot = getShot(name, lang);
  const r = region[lang];

  return (
    <div
      aria-hidden={alt === "" || undefined}
      className={`relative overflow-hidden ${aspect} ${className}`}
    >
      {/* left-0/top-0 + translate are deliberately PHYSICAL: the region
          coordinates are physical per locale (see header comment). */}
      <div
        className="absolute left-0 top-0"
        style={{
          width: `${(100 * 100) / r.w}%`,
          aspectRatio: `${shot.width} / ${shot.height}`,
          transform: `translate(-${r.x}%, -${r.y}%)`,
        }}
      >
        <Image
          src={shot.src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover dark:opacity-90"
        />
      </div>
    </div>
  );
}
