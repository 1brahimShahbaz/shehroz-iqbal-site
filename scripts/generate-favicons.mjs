/**
 * Generate favicons from public/images/logo.png for Google Search & browsers.
 */
import fs from "fs";
import path from "path";
import sharp from "sharp";
import toIco from "to-ico";

const ROOT = process.cwd();
const SRC = path.join(ROOT, "public", "images", "logo.png");

if (!fs.existsSync(SRC)) {
  console.error("Missing source:", SRC);
  process.exit(1);
}

async function png(size) {
  return sharp(SRC)
    .resize(size, size, {
      fit: "contain",
      background: { r: 11, g: 37, b: 69, alpha: 1 },
    })
    .png()
    .toBuffer();
}

const outputs = [
  { file: path.join(ROOT, "public", "favicon.png"), size: 48 },
  { file: path.join(ROOT, "public", "icon.png"), size: 192 },
  { file: path.join(ROOT, "public", "apple-touch-icon.png"), size: 180 },
  { file: path.join(ROOT, "app", "icon.png"), size: 32 },
  { file: path.join(ROOT, "app", "apple-icon.png"), size: 180 },
];

for (const { file, size } of outputs) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  await sharp(SRC)
    .resize(size, size, {
      fit: "contain",
      background: { r: 11, g: 37, b: 69, alpha: 1 },
    })
    .png()
    .toFile(file);
  console.log("wrote", path.relative(ROOT, file), `(${size}x${size})`);
}

const icoBuffers = await Promise.all([png(16), png(32), png(48)]);
const ico = await toIco(icoBuffers);

for (const icoPath of [
  path.join(ROOT, "public", "favicon.ico"),
  path.join(ROOT, "app", "favicon.ico"),
]) {
  fs.writeFileSync(icoPath, ico);
  console.log("wrote", path.relative(ROOT, icoPath));
}

console.log("Favicon generation complete.");
