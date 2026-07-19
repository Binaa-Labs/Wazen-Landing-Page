import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLegalDocument, getLegalVersions } from "@/legal/registry";

type Props = { params: Promise<{ version: string }> };

export function generateStaticParams() {
  return getLegalVersions("privacy").map(({ version }) => ({ version }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { version } = await params;
  return {
    title: `Privacy Notice ${version} | Wazen`,
    alternates: { canonical: `/legal/privacy/${version}` },
    robots: { index: false, follow: true },
  };
}

export default async function VersionedPrivacyPage({ params }: Props) {
  const { version } = await params;
	const document = getLegalDocument("privacy", version);
	if (!document) notFound();
	return document;
}
