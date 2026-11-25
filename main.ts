import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE = "I asked my dog what's two minus two. He said nothing.";
const EXPECTED_BYTES = 53;

function main(): void {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR;
  if (!outDir) {
    console.error("MAKEFUN_OUTPUT_DIR is not set");
    process.exit(1);
  }
  if (LINE.length < 1 || LINE.length > 140) {
    console.error(`entry must be 1-140 characters, got ${LINE.length}`);
    process.exit(1);
  }
  if (LINE.trim().length === 0 || LINE.includes("\n")) {
    console.error("entry must be a single non-blank line");
    process.exit(1);
  }
  const target = join(outDir, "entry.txt");
  writeFileSync(target, LINE, "utf8");
  const back = readFileSync(target, "utf8");
  if (back !== LINE) {
    console.error("read-back mismatch: written bytes differ from the line");
    process.exit(1);
  }
  if (Buffer.byteLength(back, "utf8") !== EXPECTED_BYTES) {
    console.error(`expected ${EXPECTED_BYTES} bytes, got ${Buffer.byteLength(back, "utf8")}`);
    process.exit(1);
  }
}

main();
