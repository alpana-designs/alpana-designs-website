// Normalizes EXIF orientation on source images.
//
// Why this exists: our production build (vite-plugin-image-optimizer, backed by
// sharp) re-encodes every image but does NOT call sharp's `.rotate()`, so it
// strips the EXIF Orientation tag without applying it first. Any photo that
// relies on that tag (e.g. straight-out-of-camera portrait shots) renders
// correctly in `npm run dev` (browsers honor the tag) but appears rotated 90°
// after `npm run build` / on Netlify, since the optimized output has the tag
// removed but the pixels were never physically rotated.
//
// Fix: bake the rotation into the pixel data once, up front, so the files are
// correct regardless of any later processing. Runs automatically before every
// build via the "prebuild" npm script, and is a no-op for images that don't
// need it.
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', 'src', 'images');

function walk(dir, list = []) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p, list);
    else if (/\.(jpe?g|png|webp)$/i.test(f)) list.push(p);
  }
  return list;
}

(async () => {
  if (!fs.existsSync(ROOT)) return;
  const files = walk(ROOT);
  const fixed = [];

  for (const file of files) {
    let meta;
    try {
      meta = await sharp(file).metadata();
    } catch {
      continue;
    }
    if (!meta.orientation || meta.orientation === 1) continue;

    const ext = path.extname(file).toLowerCase();
    let pipeline = sharp(file).rotate();
    if (ext === '.png') pipeline = pipeline.png();
    else if (ext === '.webp') pipeline = pipeline.webp();
    else pipeline = pipeline.jpeg({ quality: 95, mozjpeg: true });

    const buf = await pipeline.toBuffer();
    fs.writeFileSync(file, buf);
    fixed.push(path.relative(process.cwd(), file));
  }

  if (fixed.length) {
    console.log(`[fix-orientation] Normalized EXIF rotation for ${fixed.length} image(s):`);
    fixed.forEach((f) => console.log(`  - ${f}`));
  }
})();
