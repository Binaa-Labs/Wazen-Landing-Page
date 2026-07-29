import { createHash } from "node:crypto";

export function hashLegalSource(bytes) {
  const canonicalSource = bytes
    .toString("utf8")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n");

  return createHash("sha256").update(canonicalSource, "utf8").digest("hex");
}
