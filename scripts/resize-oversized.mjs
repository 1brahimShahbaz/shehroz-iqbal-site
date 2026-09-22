// Downscales the images flagged as "oversized" by the SEO responsive-image
// audit to ~2x their displayed size, and crops the hero portrait to its 4:5
// display box (fixes aspect-ratio). Overwrites the .webp files in place.
//
//   node scripts/resize-oversized.mjs
//
import sharp from "sharp";
import path from "node:path";
import fs from "node:fs";

const ROOT = path.resolve("public/images");
const kb = (n) => `${(n / 1024).toFixed(0)} KB`;

const JOBS = [
  // Student gallery photos — keep native ratio, cap width.
  { file: "1.webp", width: 640 },
  { file: "3.webp", width: 640 },
  { file: "4.webp", width: 640 },
  { file: "5.webp", width: 640 },
  // Marketing banner (4:5) — keep ratio.
  { file: "registrationbanner.webp", width: 700, quality: 80 },
  // Hero portrait — crop to the 4:5 box it renders in (fixes aspect ratio).
  { file: "aboutpage2.webp", cover: [1000, 1250], position: "attention", quality: 80 },
  // Brand mark — displayed 128px, retina 256.
  { file: "logo.webp", inside: [256, 256], quality: 90 },
  // Small logos — keep ratio, modest width.
  { file: "orbed.webp", width: 320, quality: 86 },
  { file: "kashans-academy.webp", width: 360, quality: 86 },
  { file: "alpha-college.webp", width: 360, quality: 86 },
];

async function run(job) {
  const src = path.join(ROOT, job.file);
  if (!fs.existsSync(src)) {
    console.log(`skip  ${job.file} (missing)`);
    return;
  }
  const before = fs.statSync(src).size;
  // Read into a buffer first — on Windows, sharp holds the source file open,
  // so writing back to the same path fails unless we decouple the handle.
  let pipe = sharp(fs.readFileSync(src)).rotate();
  if (job.cover) {
    pipe = pipe.resize(job.cover[0], job.cover[1], { fit: "cover", position: job.position });
  } else if (job.inside) {
    pipe = pipe.resize(job.inside[0], job.inside[1], { fit: "inside", withoutEnlargement: true });
  } else {
    pipe = pipe.resize({ width: job.width, withoutEnlargement: true });
  }
  const buf = await pipe.webp({ quality: job.quality ?? 78, effort: 5 }).toBuffer();
  fs.writeFileSync(src, buf);
  console.log(`${job.file.padEnd(26)} ${kb(before)} -> ${kb(buf.length)}`);
}

for (const j of JOBS) await run(j);

// Blog covers -> 800x450 (true 16:9) to match the declared 1200x675 ratio.
const BLOG = path.join(ROOT, "blog");
if (fs.existsSync(BLOG)) {
  for (const f of fs.readdirSync(BLOG).filter((f) => f.endsWith(".webp"))) {
    const src = path.join(BLOG, f);
    const before = fs.statSync(src).size;
    const buf = await sharp(fs.readFileSync(src))
      .resize(800, 450, { fit: "cover" })
      .webp({ quality: 78, effort: 5 })
      .toBuffer();
    fs.writeFileSync(src, buf);
    console.log(`blog/${f.padEnd(50)} ${kb(before)} -> ${kb(buf.length)}`);
  }
}

console.log("done.");
