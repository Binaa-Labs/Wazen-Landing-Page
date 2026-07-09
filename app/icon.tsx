import { ImageResponse } from "next/og";

import { LOGO_LIGHT, LOGO_TEAL, MARK_PATH, MARK_RATIO, MARK_VIEWBOX } from "@/lib/brand";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

/* App icon: the real Wazen mark (light colorway) on the logo teal — matches
   app/favicon.ico and public/brand/wazen-logo-512.png, all drawn from the
   same public/brand/ master set (D23). */
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
