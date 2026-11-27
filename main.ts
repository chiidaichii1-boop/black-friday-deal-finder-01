// Deal Scout — hand-in program for black-friday-deal-finder-01 (Node 22, stdlib only).
//
// The site lives in app/ next to this file: plain static files, no build step,
// every deal in app/data.js, nothing fetched from the network at run time.
// This program's whole job is to hand that site in: copy app/ and
// screenshots/ into the output directory and write /output/dossier.json,
// the summary the judge reads, using the kit's vendored library.
// The library file vendor/makefun-frontend.ts is the kit's copy, unchanged;
// the scorer rebuilds the dossier from its own copy and compares byte for byte.
//
// Run it outside the grader like this:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
// Inside the grader MAKEFUN_OUTPUT_DIR is unset and /output is used.

import { cpSync, existsSync, mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildDossier } from "./vendor/makefun-frontend.ts";

// The repository root is the directory this file sits in.
const repoRoot = fileURLToPath(new URL(".", import.meta.url));

// The grader gives us /output; a local run points MAKEFUN_OUTPUT_DIR at a scratch dir.
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

function copyTree(sourceDir: string, targetDir: string): void {
  if (!existsSync(sourceDir)) return;
  mkdirSync(targetDir, { recursive: true });
  cpSync(sourceDir, targetDir, { recursive: true });
}

// The output directory itself is created by us, never deleted: the grader owns it.
mkdirSync(outputDir, { recursive: true });

// Hand in the site, then its screenshots (3 or 4 renders of the site itself).
copyTree(join(repoRoot, "app"), join(outputDir, "app"));
copyTree(join(repoRoot, "screenshots"), join(outputDir, "screenshots"));

// Keep the hand-in honest: refuse to write a dossier for an empty site.
const handedIn = readdirSync(join(outputDir, "app"));
if (handedIn.length === 0) {
  throw new Error("app/ handed in empty; nothing to dossier");
}

// The scorer's own caps, as the kit states them: the dossier text is capped at
// 160 KiB, at most 4 screenshots of at most 256 KiB each, app/ at most 993
// entries and 16 MiB. buildDossier enforces them and refuses otherwise.
const dossier = buildDossier(outputDir, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
});

writeFileSync(join(outputDir, "dossier.json"), dossier);
