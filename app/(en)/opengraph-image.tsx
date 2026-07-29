import { buildOgImage, OG_ALT, OG_SIZE } from "@/lib/og";

export const alt = OG_ALT.en;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return buildOgImage("en");
}
