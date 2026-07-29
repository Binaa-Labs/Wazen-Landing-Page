import { readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { hashLegalSource } from "./legal-hash.mjs";

const relativePath = process.argv[2];
if (!relativePath) {
  throw new Error(
    "Usage: npm run legal:sha -- legal/versions/<version>/<document>.en.tsx",
  );
}

const root = process.cwd();
const bytes = await readFile(path.resolve(root, relativePath));
const digest = hashLegalSource(bytes);
console.log(`${relativePath} ${digest}`);
