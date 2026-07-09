import { ImageResponse } from "next/og";

import { LOGO_LIGHT, LOGO_TEAL, MARK_PATH, MARK_RATIO, MARK_VIEWBOX } from "@/lib/brand";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/* Apple touch icon — same mark as icon.tsx, with safe-area padding so it
   reads well once iOS rounds the corners. */
export default function AppleIcon() {
  const markWidth = 118;
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
