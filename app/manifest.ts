import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Wazen: coaching platform",
    short_name: "Wazen",
    description:
      "Run your coaching practice from one calm, organized place. Built for coaches in the UAE, GCC & MENA.",
    start_url: "/",
    display: "standalone",
    background_color: "#f2f2f2",
    theme_color: "#35565b",
    lang: "en",
    dir: "ltr",
    categories: ["business", "productivity", "health"],
    icons: [
      {
        src: "/icon",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
