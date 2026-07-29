import { readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { hashLegalSource } from "./legal-hash.mjs";

const VERSION_PATTERN = /^\d{4}-\d{2}-\d{2}\.\d+$/;
const SHA256_PATTERN = /^[a-f0-9]{64}$/;
const DOCUMENT_TYPES = new Set(["terms", "privacy"]);
const CHANGE_LEVELS = new Set(["minor", "material"]);
const root = process.cwd();
const manifest = JSON.parse(
  await readFile(path.join(root, "legal", "manifest.json"), "utf8"),
);

if (manifest.schemaVersion !== 1 || !Array.isArray(manifest.documents)) {
  throw new Error("Legal manifest must use schemaVersion 1 and a documents array.");
}

const seenVersions = new Set();
const seenEffectiveTimes = new Set();
const seenSources = new Set();
const lastEffectiveByType = new Map();

for (const document of manifest.documents) {
  const key = `${document.type}:${document.version}`;
  if (!DOCUMENT_TYPES.has(document.type)) {
    throw new Error(`Invalid legal document type: ${key}`);
  }
  if (!VERSION_PATTERN.test(document.version)) {
    throw new Error(`Invalid legal version: ${key}`);
  }
  if (!CHANGE_LEVELS.has(document.changeLevel)) {
    throw new Error(`Invalid legal change level: ${key}`);
  }
  if (
    typeof document.changeSummary !== "string" ||
    !document.changeSummary.trim()
  ) {
    throw new Error(`Missing change summary: ${key}`);
  }
  if (!SHA256_PATTERN.test(document.sha256)) {
    throw new Error(`Invalid source hash: ${key}`);
  }

  const publishedAt = Date.parse(document.publishedAt);
  const effectiveAt = Date.parse(document.effectiveAt);
  if (Number.isNaN(publishedAt) || Number.isNaN(effectiveAt)) {
    throw new Error(`Invalid publication timestamp: ${key}`);
  }
  if (publishedAt > effectiveAt) {
    throw new Error(`publishedAt must not follow effectiveAt: ${key}`);
  }
  if (document.version.slice(0, 10) !== document.publishedAt.slice(0, 10)) {
    throw new Error(`Version date must match publishedAt: ${key}`);
  }

  const expectedSource = `legal/versions/${document.version}/${document.type}.en.tsx`;
  const expectedUrl = `https://wazen.fit/legal/${document.type}/${document.version}`;
  if (document.source !== expectedSource || document.url !== expectedUrl) {
    throw new Error(`Source or immutable URL does not match ${key}`);
  }

  const effectiveKey = `${document.type}:${document.effectiveAt}`;
  if (seenVersions.has(key)) throw new Error(`Duplicate legal version: ${key}`);
  if (seenEffectiveTimes.has(effectiveKey)) {
    throw new Error(`Duplicate legal effective time: ${effectiveKey}`);
  }
  if (seenSources.has(document.source)) {
    throw new Error(`Duplicate legal source: ${document.source}`);
  }

  const previousEffectiveAt = lastEffectiveByType.get(document.type);
  if (previousEffectiveAt !== undefined && effectiveAt <= previousEffectiveAt) {
    throw new Error(
      `Manifest entries for ${document.type} must be in ascending effectiveAt order.`,
    );
  }
  seenVersions.add(key);
  seenEffectiveTimes.add(effectiveKey);
  seenSources.add(document.source);
  lastEffectiveByType.set(document.type, effectiveAt);

  const bytes = await readFile(path.join(root, document.source));
  const digest = hashLegalSource(bytes);
  if (digest !== document.sha256) {
    throw new Error(
      `Legal hash mismatch for ${key}. Create a new version instead of editing a published document.`,
    );
  }
}

for (const type of DOCUMENT_TYPES) {
  if (!manifest.documents.some((document) => document.type === type)) {
    throw new Error(`Manifest is missing an initial ${type} document.`);
  }
}

process.stdout.write(`Validated ${manifest.documents.length} legal documents.\n`);
