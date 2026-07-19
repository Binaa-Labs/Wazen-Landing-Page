import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCurrentLegalVersion, getLegalDocument } from "@/legal/registry";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Terms of Service | Wazen",
  description: "Terms governing access to and use of the Wazen platform.",
  alternates: { canonical: "https://wazen.fit/terms" },
};

export default function TermsPage() {
  const current = getCurrentLegalVersion("terms");
  if (!current) notFound();
	const document = getLegalDocument("terms", current.version);
	if (!document) notFound();
	return document;
}
