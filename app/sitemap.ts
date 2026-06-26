import type { MetadataRoute } from "next";

const SITE_URL = "https://wazen.fit";
const lastModified = new Date("2026-06-23");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          en: SITE_URL,
          ar: `${SITE_URL}/ar`,
          "x-default": SITE_URL,
        },
      },
    },
    {
      url: `${SITE_URL}/ar`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          en: SITE_URL,
          ar: `${SITE_URL}/ar`,
          "x-default": SITE_URL,
        },
      },
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
