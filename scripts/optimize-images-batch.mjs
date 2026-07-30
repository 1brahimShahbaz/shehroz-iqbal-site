// Converts the remaining legacy raster images the pages actually load into
// WebP: blog cover images and the numbered student-gallery photos.
//
//   node scripts/optimize-images-batch.mjs
//
import sharp from "sharp";
import path from "node:path";
import fs from "node:fs";

const ROOT = path.resolve("public/images");
const BLOG = path.join(ROOT, "blog");
const kb = (n) => `${(n / 1024).toFixed(0)} KB`;

async function toWebp(src, { maxWidth, quality, deleteOriginal }) {
  const before = fs.statSync(src).size;
  const img = sharp(src).rotate();
  const meta = await img.metadata();
  let pipe = img;
  if (meta.width && meta.width > maxWidth) {
    pipe = pipe.resize({ width: maxWidth, withoutEnlargement: true });
  }
  const out = src.replace(/\.(png|jpe?g)$/i, ".webp");
  const buf = await pipe.webp({ quality, effort: 5 }).toBuffer();
  fs.writeFileSync(out, buf);
  console.log(`webp  ${path.basename(out).padEnd(52)} ${kb(before)} -> ${kb(buf.length)}`);
  if (deleteOriginal) fs.rmSync(src);
}

// 1) Blog covers — keep originals (referenced elsewhere is avoided; refs get repointed).
if (fs.existsSync(BLOG)) {
  const covers = fs.readdirSync(BLOG).filter((f) => /\.(png|jpe?g)$/i.test(f));
  console.log(`\n[blog covers: ${covers.length}]`);
  for (const f of covers) {
    await toWebp(path.join(BLOG, f), { maxWidth: 1200, quality: 78, deleteOriginal: true });
  }
}

// 2) Numbered gallery photos at the images root — DELETE originals so the
//    filesystem scanner (studentGallery.ts) surfaces the WebP only, no dupes.
const numbered = fs
  .readdirSync(ROOT)
  .filter((f) => /^\d+\.(png|jpe?g)$/i.test(f));
console.log(`\n[numbered gallery photos: ${numbered.length}]`);
for (const f of numbered) {
  await toWebp(path.join(ROOT, f), { maxWidth: 1400, quality: 78, deleteOriginal: true });
}

console.log("\ndone.");
