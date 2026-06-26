import type { Metadata, Viewport } from "next";

import RootShell from "@/components/RootShell";

// Base metadata for the Arabic root layout; the /ar page fills in the
// localized title/description/OG/canonical. metadataBase must live here so the
// relative OG/Twitter image URLs resolve.
export const metadata: Metadata = {
  metadataBase: new URL("https://wazen.fit"),
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f2f2f2" },
    { media: "(prefers-color-scheme: dark)", color: "#1b2b2e" },
  ],
};

export default function ArLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <RootShell lang="ar">{children}</RootShell>;
}
