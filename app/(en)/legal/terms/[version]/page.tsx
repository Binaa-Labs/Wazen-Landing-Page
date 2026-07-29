import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLegalDocument, getLegalVersions } from "@/legal/registry";

type Props = { params: Promise<{ version: string }> };

export function generateStaticParams() {
  return getLegalVersions("terms").map(({ version }) => ({ version }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { version } = await params;
  return {
    title: `Terms of Service ${version} | Wazen`,
    alternates: { canonical: `/legal/terms/${version}` },
    robots: { index: false, follow: true },
  };
}

export default async function VersionedTermsPage({ params }: Props) {
  const { version } = await params;
	const document = getLegalDocument("terms", version);
	if (!document) notFound();
	return document;
}
