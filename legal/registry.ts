import Privacy20260601 from "@/legal/versions/2026-06-01.1/privacy.en";
import Terms20260601 from "@/legal/versions/2026-06-01.1/terms.en";

import manifest from "@/legal/manifest.json";
import { createElement, type ReactElement } from "react";

export type LegalDocumentType = "terms" | "privacy";

const documents = {
  terms: {
    "2026-06-01.1": createElement(Terms20260601),
  },
  privacy: {
    "2026-06-01.1": createElement(Privacy20260601),
  },
} as const;

export function getLegalDocument(type: LegalDocumentType, version: string) {
  const registry = documents[type] as Record<string, ReactElement>;
  return registry[version] ?? null;
}

export function getLegalVersions(type: LegalDocumentType) {
  return manifest.documents
    .filter((document) => document.type === type)
    .sort((a, b) => b.effectiveAt.localeCompare(a.effectiveAt));
}

export function getCurrentLegalVersion(type: LegalDocumentType) {
  const now = new Date().toISOString();
  return (
    getLegalVersions(type).find(
      (document) => document.publishedAt <= now && document.effectiveAt <= now,
    ) ?? null
  );
}
