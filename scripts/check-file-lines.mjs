import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const MAX_LINES = 150;
const ROOTS = ["app", "components", "hooks", "lib", "types", "styles", "scripts"];
const EXTENSIONS = [".ts", ".tsx", ".css", ".mjs"];

function walk(dir) {
  return readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

const offenders = ROOTS.flatMap((root) => walk(root))
  .filter((file) => EXTENSIONS.some((ext) => file.endsWith(ext)))
  .map((file) => ({ file: relative(".", file), lines: readFileSync(file, "utf8").split("\n").length }))
  .filter(({ lines }) => lines > MAX_LINES)
  .sort((a, b) => b.lines - a.lines);

if (offenders.length === 0) {
  process.stdout.write(`All files are within ${MAX_LINES} lines.\n`);
} else {
  for (const { file, lines } of offenders) process.stdout.write(`${lines}\t${file}\n`);
  process.exitCode = 1;
}
