import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

/* Brand wordmark mark: white "W" on the deep-teal brand color (#35565b),
   matching the OG image and the in-page logo. */
export default function Icon() {
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
          fontSize: 320,
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
