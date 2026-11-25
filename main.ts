// One-Star Review of Something Essential — make.fun bounty entry.
//
// The entry is a single deadpan one-star review of water, held below as
// a constant. Running this program writes that one line, and nothing
// else, to entry.txt inside the output directory, so the judge reads
// exactly the review.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createHash } from "node:crypto";

const REVIEW: string =
  "One star. Water has no flavour, no new features, and still expects eight glasses a day, like a subscription I never signed up for.";

// The bounty gate accepts UTF-8 text of 1 to 160 characters, not only
// white space, on a single line. Check the review against that here so
// a careless edit fails loudly at build time instead of at grading.
function checkReview(line: string): void {
  if (line.length < 1 || line.length > 160) {
    throw new Error(`review must be 1-160 characters, got ${line.length}`);
  }
  if (line.trim().length === 0) {
    throw new Error("review must not be only white space");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("review must be a single line");
  }
}

function main(): void {
  checkReview(REVIEW);
  const outDir: string = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath: string = join(outDir, "entry.txt");
  writeFileSync(outPath, REVIEW, { encoding: "utf8" });
  const digest: string = createHash("sha256").update(REVIEW, "utf8").digest("hex");
  console.log(`wrote ${outPath}: ${REVIEW.length} characters, sha256 ${digest}`);
}

main();
