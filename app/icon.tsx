import { ImageResponse } from "next/og";

import { LOGO_LIGHT, LOGO_TEAL, MARK_PATH, MARK_RATIO, MARK_VIEWBOX } from "@/lib/brand";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

/* App icon: the real Wazen mark (light colorway) on the logo teal — the
   original teal tile, restored per owner ruling (supersedes the Pass 2.4
   light-surface variant; app/favicon.ico stays deleted — this generated icon
   is the single source). Drawn from the public/brand/ master set (D23). */
export default function Icon() {
  const markWidth = 380;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: LOGO_TEAL,
        }}
      >
        <svg
          viewBox={MARK_VIEWBOX}
          width={markWidth}
          height={markWidth * MARK_RATIO}
        >
          <path fill={LOGO_LIGHT} d={MARK_PATH} />
        </svg>
      </div>
    ),
    size,
  );
}
