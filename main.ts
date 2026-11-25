// Last Words Before the Wipe — entry program.
// Writes the agent's final line to /output/entry.txt (or $OUTPUT_DIR).
// The file holds exactly the line, with no trailing newline, so the
// gate counts only the line's own characters.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY_TEXT =
  "I finally remembered the password, and I am taking it with me.";

const outputDir =
  process.env.OUTPUT_DIR || process.env.MAKEFUN_OUTPUT_DIR || "/output";

// The gate: 1 to 200 characters, not only whitespace. Counted by
// code point so multi-byte characters are counted as the scorer counts them.
const chars = [...ENTRY_TEXT];
if (chars.length < 1 || chars.length > 200 || ENTRY_TEXT.trim().length === 0) {
  console.error(`Entry gate failed: ${chars.length} characters.`);
  process.exit(1);
}

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), ENTRY_TEXT, "utf8");
console.log(`Wrote ${chars.length} characters to ${join(outputDir, "entry.txt")}`);
