import { ImageResponse } from "next/og";

import { LOGO_LIGHT, LOGO_TEAL, MARK_PATH, MARK_RATIO, MARK_VIEWBOX } from "@/lib/brand";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

/* App icon: the real Wazen mark (teal colorway) on the light surface —
   owner-set light-mode tile (Pass 2.4, D52 scope extension; supersedes the
   teal tile + app/favicon.ico, deleted — this generated icon is the single
   source). Drawn from the public/brand/ master set (D23). */
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
          background: LOGO_LIGHT,
        }}
      >
        <svg
          viewBox={MARK_VIEWBOX}
          width={markWidth}
          height={markWidth * MARK_RATIO}
        >
          <path fill={LOGO_TEAL} d={MARK_PATH} />
        </svg>
      </div>
    ),
    size,
  );
}
