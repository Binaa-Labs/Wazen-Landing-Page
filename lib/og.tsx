import { readFile } from "fs/promises";
import { join } from "path";
import { ImageResponse } from "next/og";

import type { Locale } from "@/lib/i18n";
import { SHOTS } from "@/lib/screenshots";

/* Shared OG/social card builder (P1-9): headline + browser-framed dashboard
   + phone frame on the brand background — the product composite instead of
   the old text-only card. Consumed by app/opengraph-image.tsx (en) and
   app/(ar)/ar/opengraph-image.tsx (ar). Static routes: everything below runs
   at build time. */

export const OG_SIZE = { width: 1200, height: 630 };

export const OG_ALT: Record<Locale, string> = {
  en: "Wazen — coach dashboard and client app preview",
  ar: "معاينة منصة وازن — لوحة المدرب وتطبيق العميل",
};

/* headline/sub are arrays of PRE-BROKEN lines: Satori's RTL line-wrapping
   reorders words across wrapped lines, so Arabic must never soft-wrap —
   each line renders as its own non-wrapping node. (Within a single line,
   RTL order is correct.) */
const COPY: Record<
  Locale,
  { headline: string[]; sub: string[]; chip: string; region: string }
> = {
  en: {
    headline: [
      "Run your coaching practice",
      "from one calm, organized place",
    ],
    sub: ["Clients, plans, check-ins, progress", "& messages — one system."],
    chip: "Free for your first 5 clients",
    region: "UAE · GCC · MENA · Arabic & English",
  },
  ar: {
    headline: ["أدِر عملك التدريبي", "من مكان واحد منظّم"],
    sub: ["العملاء والخطط والمتابعات والتقدّم", "والرسائل — في نظام واحد."],
    chip: "مجاني لأول 5 عملاء",
    region: "الإمارات · الخليج · الشرق الأوسط",
  },
};

/* Google Fonts css2 without a browser UA returns TTF URLs (Satori can't use
   woff2). Fails soft: on any error the card renders with the default font —
   Arabic glyphs may degrade, but the build never breaks. */
async function loadTajawal(): Promise<ArrayBuffer | null> {
  try {
    const css = await (
      await fetch(
        "https://fonts.googleapis.com/css2?family=Tajawal:wght@700&display=swap",
      )
    ).text();
    const url = css.match(/src: url\((.+?)\)/)?.[1];
    if (!url) return null;
    return await (await fetch(url)).arrayBuffer();
  } catch {
    return null;
  }
}

export async function buildOgImage(locale: Locale) {
  const t = COPY[locale];
  const isAr = locale === "ar";

  const shotPath = SHOTS.coachDashboard[locale].src;
  const png = await readFile(join(process.cwd(), "public", shotPath));
  const dashSrc = `data:image/png;base64,${png.toString("base64")}`;

  const tajawal = isAr ? await loadTajawal() : null;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#35565b",
          color: "#ffffff",
          padding: "56px 0 0 64px",
          fontFamily: tajawal ? "Tajawal, Arial" : "Arial, sans-serif",
          overflow: "hidden",
        }}
      >
        {/* Left: brand + localized copy. Satori needs an explicit
            direction:rtl to run bidi word reordering for Arabic. */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: 560,
            paddingBottom: 56,
            paddingRight: 24,
            textAlign: isAr ? "right" : "left",
            alignItems: isAr ? "flex-end" : "flex-start",
            ...(isAr ? { direction: "rtl" as const } : {}),
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 52,
                height: 52,
                borderRadius: 12,
                background: "#ffffff",
                color: "#35565b",
                fontSize: 32,
                fontWeight: 800,
              }}
            >
              W
            </div>
            <span style={{ fontSize: 34, fontWeight: 700 }}>Wazen · وازن</span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 44,
              fontSize: 52,
              lineHeight: 1.2,
              fontWeight: 800,
              alignItems: isAr ? "flex-end" : "flex-start",
              /* Satori rejects undefined style values — omit, don't undefine */
              ...(isAr ? {} : { letterSpacing: "-0.02em" }),
            }}
          >
            {t.headline.map((line) => (
              <div key={line} style={{ display: "flex" }}>
                {line}
              </div>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 22,
              fontSize: 25,
              lineHeight: 1.45,
              color: "rgba(255,255,255,0.75)",
              alignItems: isAr ? "flex-end" : "flex-start",
            }}
          >
            {t.sub.map((line) => (
              <div key={line} style={{ display: "flex" }}>
                {line}
              </div>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              padding: "10px 22px",
              borderRadius: 100,
              background: "#aebfa0",
              color: "#22333a",
              fontSize: 23,
              fontWeight: 700,
            }}
          >
            {t.chip}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "auto",
              fontSize: 20,
              color: "rgba(255,255,255,0.55)",
            }}
          >
            {t.region}
          </div>
        </div>

        {/* Right: browser-framed dashboard + phone frame, bleeding off-canvas */}
        <div
          style={{
            display: "flex",
            position: "relative",
            flex: 1,
            marginTop: 26,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: 640,
              borderRadius: 18,
              background: "#ffffff",
              boxShadow: "0 32px 64px rgba(10,28,32,0.45)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "14px 18px",
                borderBottom: "1px solid rgba(53,86,91,0.12)",
                background: "#ffffff",
              }}
            >
              <div style={{ display: "flex", width: 12, height: 12, borderRadius: 12, background: "#e0655f" }} />
              <div style={{ display: "flex", width: 12, height: 12, borderRadius: 12, background: "#e8b23e" }} />
              <div style={{ display: "flex", width: 12, height: 12, borderRadius: 12, background: "#69b06b" }} />
              <div
                style={{
                  display: "flex",
                  marginLeft: 16,
                  padding: "5px 40px",
                  borderRadius: 100,
                  background: "#f0f2f2",
                  color: "rgba(13,13,13,0.55)",
                  fontSize: 15,
                  fontFamily: "Arial, sans-serif",
                }}
              >
                app.wazen.fit/dashboard
              </div>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={dashSrc}
              alt=""
              width={640}
              height={306}
              style={{ objectFit: "cover", objectPosition: "top" }}
            />
          </div>

          {/* Phone frame overlapping the browser frame */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              position: "absolute",
              left: -36,
              bottom: -24,
              width: 168,
              height: 340,
              borderRadius: 30,
              border: "7px solid #2b3f47",
              background: "#ffffff",
              boxShadow: "0 24px 48px rgba(10,28,32,0.4)",
              padding: 12,
              gap: 10,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                borderRadius: 14,
                background: "#22333a",
                padding: 10,
                gap: 8,
              }}
            >
              <div style={{ display: "flex", width: 64, height: 8, borderRadius: 100, background: "rgba(255,255,255,0.4)" }} />
              <div style={{ display: "flex", gap: 6 }}>
                <div style={{ display: "flex", flex: 1, height: 18, borderRadius: 8, background: "rgba(255,255,255,0.12)" }} />
                <div style={{ display: "flex", flex: 1, height: 18, borderRadius: 8, background: "rgba(255,255,255,0.12)" }} />
              </div>
              <div style={{ display: "flex", width: "100%", height: 20, borderRadius: 100, background: "#aebfa0" }} />
            </div>
            {[0, 1].map((i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  borderRadius: 12,
                  border: "1px solid rgba(13,13,13,0.1)",
                  padding: 8,
                }}
              >
                <div style={{ display: "flex", width: 16, height: 16, borderRadius: 5, background: i === 0 ? "#aebfa0" : "#eef0ef" }} />
                <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                  <div style={{ display: "flex", width: 64, height: 6, borderRadius: 100, background: "rgba(13,13,13,0.15)" }} />
                  <div style={{ display: "flex", width: 40, height: 6, borderRadius: 100, background: "rgba(13,13,13,0.08)" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      ...(tajawal
        ? {
            fonts: [
              {
                name: "Tajawal",
                data: tajawal,
                weight: 700 as const,
                style: "normal" as const,
              },
            ],
          }
        : {}),
    },
  );
}
