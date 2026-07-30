// Generates optimized WebP variants (and re-encodes the OG JPEG in place) for
// the site's heaviest raster images. Static export + images.unoptimized means
// Next serves these files as-is, so shrinking the source files is the fix.
//
//   node scripts/optimize-images.mjs
//
import sharp from "sharp";
import path from "node:path";
import fs from "node:fs";

const DIR = path.resolve("public/images");

// { file, maxWidth, quality, [toWebp:false] to only re-encode in place }
const TARGETS = [
  { file: "aen-logo-black.png", maxWidth: 1200, quality: 82 },
  { file: "aboutpage2.jpeg", maxWidth: 1400, quality: 78 },
  { file: "avatar.png", maxWidth: 256, quality: 82 },
  { file: "registrationbanner.jpg", maxWidth: 1600, quality: 78 },
  { file: "shehroz-sir-website-banner.png", maxWidth: 1920, quality: 80 },
  { file: "shehroz-sir-website-banner2.png", maxWidth: 1920, quality: 80 },
  { file: "orbed.png", maxWidth: 400, quality: 88 },
  { file: "logo.png", maxWidth: 512, quality: 92 },
  { file: "kashans-academy.png", maxWidth: 640, quality: 88 },
  { file: "alpha-college.png", maxWidth: 640, quality: 88 },
  // OG image: keep it a JPEG (social scrapers), just re-encode smaller.
  { file: "teacher-about.jpeg", maxWidth: 1200, quality: 80, toWebp: false },
];

const kb = (n) => `${(n / 1024).toFixed(0)} KB`;

for (const t of TARGETS) {
  const src = path.join(DIR, t.file);
  if (!fs.existsSync(src)) {
    console.log(`skip  ${t.file} (not found)`);
    continue;
  }
  const before = fs.statSync(src).size;
  const img = sharp(src).rotate();
  const meta = await img.metadata();
  const resizeOpts =
    meta.width && meta.width > t.maxWidth
      ? { width: t.maxWidth, withoutEnlargement: true }
      : null;

  if (t.toWebp === false) {
    // Re-encode in place, same format.
    const ext = path.extname(t.file).toLowerCase();
    let pipe = img;
    if (resizeOpts) pipe = pipe.resize(resizeOpts);
    const buf =
      ext === ".png"
        ? await pipe.png({ quality: t.quality, compressionLevel: 9 }).toBuffer()
        : await pipe.jpeg({ quality: t.quality, mozjpeg: true }).toBuffer();
    fs.writeFileSync(src, buf);
    console.log(`reenc ${t.file.padEnd(34)} ${kb(before)} -> ${kb(buf.length)}`);
    continue;
  }

  const outName = t.file.replace(/\.(png|jpe?g)$/i, ".webp");
  const out = path.join(DIR, outName);
  let pipe = img;
  if (resizeOpts) pipe = pipe.resize(resizeOpts);
  const buf = await pipe.webp({ quality: t.quality, effort: 5 }).toBuffer();
  fs.writeFileSync(out, buf);
  console.log(`webp  ${outName.padEnd(34)} ${kb(before)} -> ${kb(buf.length)}`);
}

console.log("done.");
