import { ImageResponse } from "next/og";

export const alt = "Wazen coaching platform";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f2f2f2",
          color: "#0d0d0d",
          padding: "72px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#35565b",
            fontSize: 34,
            fontWeight: 700,
          }}
        >
          <span>Wazen</span>
          <span style={{ fontSize: 24, color: "#6a8c58" }}>by Binaa Labs</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              display: "flex",
              width: 920,
              fontSize: 74,
              lineHeight: 1.05,
              fontWeight: 800,
              letterSpacing: "-0.03em",
            }}
          >
            Run your coaching practice from one calm, organized place
          </div>
          <div
            style={{
              display: "flex",
              width: 820,
              color: "rgba(13,13,13,0.62)",
              fontSize: 32,
              lineHeight: 1.35,
            }}
          >
            Clients, plans, check-ins, progress, and messages in one system.
            Free for your first 5 clients.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: 18,
            color: "#35565b",
            fontSize: 26,
            fontWeight: 700,
          }}
        >
          <span>UAE</span>
          <span>GCC</span>
          <span>MENA</span>
          <span>Arabic & English</span>
        </div>
      </div>
    ),
    size,
  );
}
