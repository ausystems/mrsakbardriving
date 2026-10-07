// Builds static assets: paper grain tiles and app icons.
import sharp from 'sharp';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = new URL('../', import.meta.url);
const p = (rel) => fileURLToPath(new URL(rel, root));
const pub = (rel) => p(`public/${rel}`);
fs.mkdirSync(pub('img'), { recursive: true });

/* ---------- Paper grain (sparse specks, tiny palette PNG) ---------- */
async function grain(file, rgb, levels) {
  const size = 160;
  const buf = Buffer.alloc(size * size * 4);
  let seed = 7;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  for (let i = 0; i < size * size; i++) {
    const r = rnd();
    const a = r < 0.1 ? levels[0] : r < 0.16 ? levels[1] : r < 0.19 ? levels[2] : 0;
    buf.set([rgb[0], rgb[1], rgb[2], a], i * 4);
  }
  await sharp(buf, { raw: { width: size, height: size, channels: 4 } })
    .png({ palette: true, colors: 4, compressionLevel: 9, effort: 10 })
    .toFile(pub(`img/${file}`));
}
await grain('grain.png', [52, 40, 26], [14, 22, 32]);
await grain('grain-light.png', [244, 236, 223], [8, 13, 18]);

/* ---------- Icons ---------- */
const markSvg = (size, pad, bg) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="${-pad} ${-pad} ${48 + pad * 2} ${48 + pad * 2}">
${bg ? `<rect x="${-pad}" y="${-pad}" width="${48 + pad * 2}" height="${48 + pad * 2}" fill="${bg}"/>` : ''}
<circle cx="24" cy="24" r="24" fill="#211E1A"/>
<path d="M12.6 37.4 22.3 10.6M35.4 37.4 25.7 10.6M16.9 27.2h14.2" fill="none" stroke="#F6F0E6" stroke-width="3.3" stroke-linecap="round"/>
<path d="M22.7 35.8h2.6l-.25-5.2h-2.1ZM23.05 23.4h1.9l-.18-3.1h-1.54ZM23.35 16.2h1.3l-.12-1.9h-1.06Z" fill="#F2B53A"/></svg>`;
await sharp(Buffer.from(markSvg(32, 0))).png().toFile(pub('favicon-32.png'));
await sharp(Buffer.from(markSvg(180, 7, '#F6F0E6'))).png().toFile(pub('apple-touch-icon.png'));
await sharp(Buffer.from(markSvg(192, 4, '#F6F0E6'))).png().toFile(pub('icon-192.png'));
await sharp(Buffer.from(markSvg(512, 4, '#F6F0E6'))).png().toFile(pub('icon-512.png'));
await sharp(Buffer.from(markSvg(512, 14, '#F6F0E6'))).png().toFile(pub('icon-maskable-512.png'));

// Share images (one per page) are built by scripts/build-og.mjs

for (const f of ['img/grain.png', 'img/grain-light.png', 'favicon-32.png', 'apple-touch-icon.png', 'icon-192.png', 'icon-512.png', 'icon-maskable-512.png']) {
  console.log(f.padEnd(26), (fs.statSync(pub(f)).size / 1024).toFixed(1) + ' KB');
}
