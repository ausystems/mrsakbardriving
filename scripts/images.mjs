// Prepares the two student pass-day photos from Mrs. Akbar's Google Business Profile.
// Privacy first: the licence slip and the licence plate are blurred beyond legibility,
// a bystander is cropped out, and all metadata (including GPS) is stripped.
import sharp from 'sharp';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = new URL('../', import.meta.url);
const outDir = new URL('public/img/', root);
fs.mkdirSync(outDir, { recursive: true });

const photos = [
  {
    src: 'data/photos/pass-day-1.jpg',
    name: 'mrs-akbar-driving-student-road-test-day-1',
    blur: [{ left: 492, top: 462, width: 182, height: 158 }],
    crop: { left: 0, top: 60, width: 1200, height: 1500 },
  },
  {
    src: 'data/photos/pass-day-2.jpg',
    name: 'mrs-akbar-driving-student-road-test-day-2',
    blur: [{ left: 3060, top: 3960, width: 320, height: 340 }],
    crop: { left: 300, top: 1150, width: 3600, height: 4500 },
  },
];
const widths = [480, 720, 960];

for (const p of photos) {
  const base = sharp(fileURLToPath(new URL(p.src, root))).rotate();
  const { data, info } = await base.clone().raw().toBuffer({ resolveWithObject: true });
  let img = sharp(data, { raw: info });
  // Feathered privacy blur: a heavily blurred copy is masked in with soft edges.
  const layers = [];
  for (const r of p.blur) {
    const m = 36; // feather margin
    const box = {
      left: Math.max(0, r.left - m), top: Math.max(0, r.top - m),
      width: Math.min(info.width - Math.max(0, r.left - m), r.width + m * 2),
      height: Math.min(info.height - Math.max(0, r.top - m), r.height + m * 2),
    };
    const blurred = await sharp(data, { raw: info })
      .extract(box)
      .blur(Math.max(16, Math.round(r.width / 8)))
      .png()
      .toBuffer();
    const mask = Buffer.from(
      `<svg xmlns="http://www.w3.org/2000/svg" width="${box.width}" height="${box.height}">` +
      `<defs><filter id="f" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="${m / 2.6}"/></filter></defs>` +
      `<rect x="${m * 0.75}" y="${m * 0.75}" width="${box.width - m * 1.5}" height="${box.height - m * 1.5}" rx="${m}" fill="#fff" filter="url(#f)"/></svg>`
    );
    const patch = await sharp(blurred).composite([{ input: mask, blend: 'dest-in' }]).png().toBuffer();
    layers.push({ input: patch, left: box.left, top: box.top });
  }
  const cleaned = await img.composite(layers).png().toBuffer();
  const cropped = sharp(cleaned).extract(p.crop);
  for (const w of widths) {
    const resized = cropped.clone().resize({ width: w, withoutEnlargement: true });
    await resized.clone().avif({ quality: 52, effort: 6 }).toFile(fileURLToPath(new URL(`${p.name}-${w}.avif`, outDir)));
    await resized.clone().webp({ quality: 74, effort: 6 }).toFile(fileURLToPath(new URL(`${p.name}-${w}.webp`, outDir)));
    await resized.clone().jpeg({ quality: 78, mozjpeg: true, progressive: true }).toFile(fileURLToPath(new URL(`${p.name}-${w}.jpg`, outDir)));
  }
  console.log('processed', p.name);
}
for (const f of fs.readdirSync(outDir).sort()) {
  console.log(f.padEnd(34), (fs.statSync(new URL(f, outDir)).size / 1024).toFixed(1) + ' KB');
}
