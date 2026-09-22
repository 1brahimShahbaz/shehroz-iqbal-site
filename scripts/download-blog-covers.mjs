/**
 * Download topic-relevant blog hero images (Unsplash / Pexels — free to use).
 * Run: node scripts/download-blog-covers.mjs
 */
import fs from "fs";
import path from "path";
import https from "https";
import sharp from "sharp";

const OUT = path.join(process.cwd(), "public", "images", "blog");

/** slug filename → hero image URL (1200×630) */
const COVERS = {
  "how-to-study-accounting-a-level-complete-guide.jpg":
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=630&fit=crop&q=80",
  "accounting-9706-paper-2-structured-questions-guide.jpg":
    "https://images.pexels.com/photos/590041/pexels-photo-590041.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&fit=crop",
  "o-level-accounting-7707-complete-revision-guide.jpg":
    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&h=630&fit=crop&q=80",
  "double-entry-bookkeeping-accounting-fundamentals-guide.jpg":
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=630&fit=crop&q=80",
  "as-level-vs-a2-level-accounting-differences.jpg":
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=630&fit=crop&q=80",
  "top-10-accounting-mistakes-a-level-students-make.jpg":
    "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&fit=crop",
  "financial-statements-ratio-analysis-accounting-guide.jpg":
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=630&fit=crop&q=80",
  "depreciation-methods-caie-accounting-explained.jpg":
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop&q=80",
  "bank-reconciliation-accounting-exam-tips-guide.jpg":
    "https://images.pexels.com/photos/3943716/pexels-photo-3943716.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&fit=crop",
  "cash-flow-statement-accounting-a-level-guide.jpg":
    "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200&h=630&fit=crop&q=80",
  "online-accounting-tuition-pakistan-guide.jpg":
    "https://images.pexels.com/photos/4145354/pexels-photo-4145354.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&fit=crop",
  "how-to-prepare-for-caie-accounting-october-november-2026.jpg":
    "https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&fit=crop",
  "caie-vs-edexcel-accounting-a-level-which-is-harder.jpg":
    "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&fit=crop",
  "pakistan-chartered-accountancy-career-reality-guide.jpg":
    "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&h=630&fit=crop&q=80",
  "accounting-in-karachi-students-guide.jpg":
    "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=1200&h=630&fit=crop&q=80",
};

function download(url) {
  return new Promise((resolve, reject) => {
    const fetch = (u) => {
      https
        .get(u, { headers: { "User-Agent": "shehroz-iqbal-site/1.0" } }, (res) => {
          if (
            res.statusCode >= 300 &&
            res.statusCode < 400 &&
            res.headers.location
          ) {
            fetch(res.headers.location);
            return;
          }
          if (res.statusCode !== 200) {
            reject(new Error(`HTTP ${res.statusCode} for ${u}`));
            return;
          }
          const chunks = [];
          res.on("data", (c) => chunks.push(c));
          res.on("end", () => resolve(Buffer.concat(chunks)));
        })
        .on("error", reject);
    };
    fetch(url);
  });
}

fs.mkdirSync(OUT, { recursive: true });

let ok = 0;
for (const [file, url] of Object.entries(COVERS)) {
  // Covers are served as WebP (modern format) — convert on download.
  const webpName = file.replace(/\.jpe?g$/i, ".webp");
  const dest = path.join(OUT, webpName);
  if (fs.existsSync(dest) && fs.statSync(dest).size > 5000) {
    console.log(`Skip ${webpName} (already exists)`);
    ok++;
    continue;
  }
  process.stdout.write(`Downloading ${webpName}... `);
  try {
    const buf = await download(url);
    if (buf.length < 5000) throw new Error("file too small");
    const webp = await sharp(buf)
      .resize(800, 450, { fit: "cover" })
      .webp({ quality: 78, effort: 5 })
      .toBuffer();
    fs.writeFileSync(dest, webp);
    console.log(`OK (${Math.round(webp.length / 1024)} KB)`);
    ok++;
  } catch (e) {
    console.log(`FAILED — ${e.message}`);
    process.exitCode = 1;
  }
}

console.log(`\n${ok}/${Object.keys(COVERS).length} covers saved to public/images/blog/`);
