import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/* Apple touch icon — same mark as icon.tsx, with safe-area padding so it
   reads well once iOS rounds the corners. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#35565b",
          color: "#ffffff",
          fontSize: 110,
          fontWeight: 800,
          fontFamily: "Arial, sans-serif",
        }}
      >
        W
      </div>
    ),
    size,
  );
}
