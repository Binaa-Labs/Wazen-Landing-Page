import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCurrentLegalVersion, getLegalDocument } from "@/legal/registry";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Privacy Notice | Wazen",
  description: "How Wazen collects, uses, stores, and protects personal data.",
  alternates: { canonical: "https://wazen.fit/privacy" },
};

export default function PrivacyPage() {
  const current = getCurrentLegalVersion("privacy");
  if (!current) notFound();
	const document = getLegalDocument("privacy", current.version);
	if (!document) notFound();
	return document;
}
