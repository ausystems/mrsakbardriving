// Share images (1200 x 630) for every page in data/pages.json, written to public/og/<name>.jpg.
// Text is converted to vector paths so it renders in the brand fonts; the arch shows the hero scene.
import sharp from 'sharp';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import opentype from 'opentype.js';
import { CAR_WIDTH } from '../src/car3d.js';

const root = new URL('../', import.meta.url);
const p = (rel) => fileURLToPath(new URL(rel, root));
const font = (f) => opentype.parse(fs.readFileSync(p(f)).buffer.slice(0));
const display = font('data/fonts/big-shoulders-display-latin-900-normal.woff');
const script = font('data/fonts/caveat-latin-600-normal.woff');
const body6 = font('node_modules/@fontsource/figtree/files/figtree-latin-600-normal.woff');
const body8 = font('node_modules/@fontsource/figtree/files/figtree-latin-800-normal.woff');

// Manual glyph layout (this opentype.js build can return NaN kerning for some pairs)
const n2 = (v) => (Math.round(v * 100) / 100).toString();
const toD = (cmds) => cmds.map((c) => {
  if (c.type === 'M' || c.type === 'L') return c.type + n2(c.x) + ' ' + n2(c.y);
  if (c.type === 'Q') return 'Q' + n2(c.x1) + ' ' + n2(c.y1) + ' ' + n2(c.x) + ' ' + n2(c.y);
  if (c.type === 'C') return 'C' + n2(c.x1) + ' ' + n2(c.y1) + ' ' + n2(c.x2) + ' ' + n2(c.y2) + ' ' + n2(c.x) + ' ' + n2(c.y);
  return 'Z';
}).join('');
function layout(f, str, x, y, size, tracking = 0) {
  const scale = size / f.unitsPerEm;
  const glyphs = [...str].map((ch) => f.charToGlyph(ch));
  let d = '', cx = x;
  glyphs.forEach((g, i) => {
    d += toD(g.getPath(cx, y, size).commands);
    let adv = (g.advanceWidth || 0) * scale;
    const next = glyphs[i + 1];
    if (next) { const k = f.getKerningValue(g, next); if (Number.isFinite(k)) adv += k * scale; }
    cx += adv + tracking * size;
  });
  return { d, width: cx - x };
}
const text = (f, str, x, y, size, fill, opts = {}) => `<path d="${layout(f, str, x, y, size, opts.tracking || 0).d}" fill="${fill}"${opts.transform ? ` transform="${opts.transform}"` : ''}/>`;
const width = (f, str, size) => layout(f, str, 0, 0, size).width;

// Hero scene in the arch, car in the right-hand lane
let scene = fs.readFileSync(p('src/partials/hero-scene.svg'), 'utf8');
scene = scene.replace(/<g class="hs-note"[\s\S]*?<\/g>/, '').replace(/<g class="hs-tree hs-tree--l">[\s\S]*?<\/g>/, '');
const samples = JSON.parse(fs.readFileSync(p('src/generated/hero-road.json'), 'utf8'));
const [cx, cy, , cw, nx, ny] = samples[Math.round(samples.length * 0.36)];
scene = scene.replace(/<g id="hero-car" class="hs-car" transform="[^"]*"/, `<g id="hero-car" transform="translate(${(cx + nx * cw * 0.24).toFixed(1)} ${(cy + ny * cw * 0.24).toFixed(1)}) scale(${((0.4 * cw) / CAR_WIDTH).toFixed(4)})"`);
const sceneInner = scene.replace(/^<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');

const W = 1200, H = 630;
const ax = 772, ay = 62, aw = 372, ah = 506;
const archPath = `M${ax} ${ay + aw / 2}A${aw / 2} ${aw / 2} 0 0 1 ${ax + aw} ${ay + aw / 2}V${ay + ah - 22}q0 22-22 22H${ax + 22}q-22 0-22-22Z`;
const sceneScale = Math.max(aw / 560, ah / 480);
const sx = ax + (aw - 560 * sceneScale) / 2 - 58, sy = ay + ah - 480 * sceneScale;

// Fit the title into at most three lines, 650 px wide, as large as possible
function fit(title) {
  const words = title.toUpperCase().split(/\s+/);
  for (let size = 92; size >= 46; size -= 2) {
    const lines = [];
    let line = '';
    for (const w of words) {
      const test = line ? `${line} ${w}` : w;
      if (width(display, test, size) <= 650) line = test;
      else { if (line) lines.push(line); line = w; }
    }
    lines.push(line);
    if (lines.length <= 3 && lines.every((l) => width(display, l, size) <= 650)) return { size, lines };
  }
  throw new Error(`Title too long for share image: ${title}`);
}

function og({ scriptText, lines, size, sub, soft = [] }) {
  const lh = size * 0.9;
  const top = 132 + size * 0.88;
  const titleSvg = lines.map((l, i) => text(display, l, 60, top + i * lh, size, soft.includes(i) ? '#7A6E61' : '#211E1A')).join('\n');
  const subY = top + (lines.length - 1) * lh + 62;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<defs><clipPath id="arch"><path d="${archPath}"/></clipPath>
<linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#EFE6D6"/><stop offset="1" stop-color="#F6F0E6"/></linearGradient>
<filter id="sh" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="22" stdDeviation="22" flood-color="#211E1A" flood-opacity=".22"/></filter></defs>
<rect width="${W}" height="${H}" fill="url(#bg)"/>
<path d="${archPath}" fill="#F4E1C6" filter="url(#sh)"/>
<g clip-path="url(#arch)"><g transform="translate(${sx.toFixed(1)} ${sy.toFixed(1)}) scale(${sceneScale.toFixed(4)})">${sceneInner}</g></g>
${text(script, scriptText, 64, 112, 42, '#A63B26', { transform: 'rotate(-2.5 64 112)' })}
${titleSvg}
${sub ? text(body6, sub, 62, Math.min(subY, 430), 26, '#39332D') : ''}
<g transform="translate(62 470)"><circle cx="30" cy="30" r="30" fill="#211E1A"/><g transform="translate(6 6)"><path d="M12.6 37.4 22.3 10.6M35.4 37.4 25.7 10.6M16.9 27.2h14.2" fill="none" stroke="#F6F0E6" stroke-width="3.3" stroke-linecap="round"/><path d="M22.7 35.8h2.6l-.25-5.2h-2.1ZM23.05 23.4h1.9l-.18-3.1h-1.54ZM23.35 16.2h1.3l-.12-1.9h-1.06Z" fill="#F2B53A"/></g></g>
${text(display, 'CALL OR TEXT', 140, 508, 40, '#211E1A', { tracking: 0.01 })}
${text(body8, '416-457-5778', 140, 540, 25, '#A63B26')}
<g transform="translate(${140 + width(body8, '416-457-5778', 25) + 26} 520)">
${[0, 1, 2, 3, 4].map((i) => `<path transform="translate(${i * 22} 0) scale(.82)" d="m12 2.8 2.8 5.8 6.3.9-4.6 4.4 1.1 6.3L12 17.2l-5.6 3 1.1-6.3-4.6-4.4 6.3-.9Z" fill="#F2B53A"/>`).join('')}
${text(body6, '5.0 on Google', 118, 18, 22, '#39332D')}
</g>
</svg>`;
}

const pages = JSON.parse(fs.readFileSync(p('data/pages.json'), 'utf8'));
fs.mkdirSync(p('public/og'), { recursive: true });
const plainText = (s) => s.replace(/’/g, '’').replace(/&rsquo;/g, '’');
let total = 0;
for (const pg of pages) {
  let svg;
  if (pg.type === 'home') {
    svg = og({ scriptText: 'taught with patience', lines: ['LEARN TO DRIVE', 'WITH MRS. AKBAR.'], size: Math.min(86, Math.floor(650 / width(display, 'WITH MRS. AKBAR.', 1))), sub: 'Female driving instructor in Hamilton. She comes to you.', soft: [1] });
  } else {
    const { size, lines } = fit(plainText(pg.ogTitle));
    svg = og({ scriptText: pg.ogScript || 'mrs. akbar driving instructor', lines, size, sub: lines.length < 3 ? 'Mrs. Akbar, female driving instructor in Hamilton' : '' });
  }
  const file = p(`public${pg.og}`);
  await sharp(Buffer.from(svg)).jpeg({ quality: 84, mozjpeg: true }).toFile(file);
  total += fs.statSync(file).size;
}
console.log(`og: ${pages.length} share images, ${(total / 1024).toFixed(0)} KB total`);
