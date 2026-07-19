import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const manifest = JSON.parse(
  await readFile(path.join(root, "legal", "manifest.json"), "utf8"),
);
const seen = new Set();

for (const document of manifest.documents) {
  const key = `${document.type}:${document.version}`;
  if (seen.has(key)) throw new Error(`Duplicate legal version: ${key}`);
  seen.add(key);

  if (Number.isNaN(Date.parse(document.publishedAt))) {
    throw new Error(`Invalid publishedAt for ${key}`);
  }
  if (Number.isNaN(Date.parse(document.effectiveAt))) {
    throw new Error(`Invalid effectiveAt for ${key}`);
  }
  if (!["terms", "privacy"].includes(document.type)) {
    throw new Error(`Invalid legal document type: ${key}`);
  }
  if (!["minor", "material"].includes(document.changeLevel)) {
    throw new Error(`Invalid legal change level: ${key}`);
  }
  if (document.publishedAt > document.effectiveAt) {
    throw new Error(`publishedAt must not follow effectiveAt: ${key}`);
  }

  const bytes = await readFile(path.join(root, document.source));
  const digest = createHash("sha256").update(bytes).digest("hex");
  if (digest !== document.sha256) {
    throw new Error(
      `Legal hash mismatch for ${key}. Create a new version instead of editing a published document.`,
    );
  }
}

process.stdout.write(`Validated ${manifest.documents.length} legal documents.\n`);
