/**
 * Next.js static export creates folders (e.g. about/) alongside about.html.
 * On Apache, /about hits the folder → 403 Forbidden. Remove those folders only
 * when they hold no public .html (blog/ keeps post pages).
 */
const fs = require("fs");
const path = require("path");

const OUT = path.join(process.cwd(), "out");

/** Same-named `.html` routes that also ship a `public/<name>/` asset folder (must not be pruned). */
const KEEP_ASSET_DIRS = new Set(["notes"]);

function hasPublicHtml(dirPath) {
  if (!fs.existsSync(dirPath)) return false;
  for (const name of fs.readdirSync(dirPath)) {
    if (name.endsWith(".html") && !name.startsWith("_")) return true;
  }
  return false;
}

function pruneDir(dirPath) {
  if (!fs.existsSync(dirPath)) return;

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const ent of entries) {
    if (!ent.isDirectory()) continue;
    const sub = path.join(dirPath, ent.name);
    pruneDir(sub);

    const indexHtml = path.join(sub, "index.html");
    const siblingHtml = path.join(dirPath, `${ent.name}.html`);

    if (KEEP_ASSET_DIRS.has(ent.name)) continue;
    if (fs.existsSync(indexHtml)) continue;
    if (!fs.existsSync(siblingHtml)) continue;
    if (hasPublicHtml(sub)) continue;

    fs.rmSync(sub, { recursive: true, force: true });
    console.log("pruned:", path.relative(OUT, sub));
  }
}

if (!fs.existsSync(OUT)) {
  console.error("out/ not found — run npm run build first");
  process.exit(1);
}

pruneDir(OUT);
console.log("Export prune complete.");
