// Builds the shaded-relief land layer for the service-area map.
// Elevation: Mapzen Terrain Tiles on AWS (terrarium encoding). Canadian data in these tiles
// "contains information licensed under the Open Government Licence (Canada)", credited under the map.
// Output: public/img/hamilton-area-relief-map-{1200,2000}.{avif,webp}, projected exactly like the SVG map.
import sharp from 'sharp';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { BBOX, WIDTH, HEIGHT, UNITS_PER_KM, KM_LON, KM_LAT } from './geo-common.mjs';

const root = new URL('../', import.meta.url);
const p = (rel) => fileURLToPath(new URL(rel, root));
const Z = 12;
const lon2x = (lon) => ((lon + 180) / 360) * 2 ** Z;
const lat2y = (lat) => {
  const r = (lat * Math.PI) / 180;
  return ((1 - Math.log(Math.tan(r) + 1 / Math.cos(r)) / Math.PI) / 2) * 2 ** Z;
};

/* ---------- 1. fetch and cache tiles ---------- */
const pad = 0.03;
const tx0 = Math.floor(lon2x(BBOX.west - pad)), tx1 = Math.floor(lon2x(BBOX.east + pad));
const ty0 = Math.floor(lat2y(BBOX.north + pad)), ty1 = Math.floor(lat2y(BBOX.south - pad));
const cols = tx1 - tx0 + 1, rows = ty1 - ty0 + 1;
fs.mkdirSync(p('data/terrain'), { recursive: true });
for (let tx = tx0; tx <= tx1; tx++) {
  for (let ty = ty0; ty <= ty1; ty++) {
    const file = p(`data/terrain/${Z}-${tx}-${ty}.png`);
    if (fs.existsSync(file)) continue;
    const res = await fetch(`https://s3.amazonaws.com/elevation-tiles-prod/terrarium/${Z}/${tx}/${ty}.png`);
    if (!res.ok) throw new Error(`tile ${tx},${ty}: ${res.status}`);
    fs.writeFileSync(file, Buffer.from(await res.arrayBuffer()));
  }
}

/* ---------- 2. decode into one elevation mosaic (metres) ---------- */
const MW = cols * 256, MH = rows * 256;
const elev = new Float32Array(MW * MH);
for (let tx = tx0; tx <= tx1; tx++) {
  for (let ty = ty0; ty <= ty1; ty++) {
    const { data } = await sharp(p(`data/terrain/${Z}-${tx}-${ty}.png`)).removeAlpha().raw().toBuffer({ resolveWithObject: true });
    const ox = (tx - tx0) * 256, oy = (ty - ty0) * 256;
    for (let y = 0; y < 256; y++) {
      for (let x = 0; x < 256; x++) {
        const i = (y * 256 + x) * 3;
        elev[(oy + y) * MW + ox + x] = data[i] * 256 + data[i + 1] + data[i + 2] / 256 - 32768;
      }
    }
  }
}
const sample = (px, py) => {
  const x = Math.max(0, Math.min(MW - 1.001, px)), y = Math.max(0, Math.min(MH - 1.001, py));
  const x0 = Math.floor(x), y0 = Math.floor(y), fx = x - x0, fy = y - y0;
  const a = elev[y0 * MW + x0], b = elev[y0 * MW + x0 + 1], c = elev[(y0 + 1) * MW + x0], d = elev[(y0 + 1) * MW + x0 + 1];
  return a * (1 - fx) * (1 - fy) + b * fx * (1 - fy) + c * (1 - fx) * fy + d * fx * fy;
};

/* ---------- 3. reproject to the map grid ---------- */
async function render(OW) {
  const OH = Math.round((OW * HEIGHT) / WIDTH);
  const grid = new Float32Array(OW * OH);
  for (let j = 0; j < OH; j++) {
    for (let i = 0; i < OW; i++) {
      const u = ((i + 0.5) / OW) * WIDTH, v = ((j + 0.5) / OH) * HEIGHT;
      const lon = BBOX.west + u / UNITS_PER_KM / KM_LON;
      const lat = BBOX.north - v / UNITS_PER_KM / KM_LAT;
      grid[j * OW + i] = sample((lon2x(lon) - tx0) * 256, (lat2y(lat) - ty0) * 256);
    }
  }
  // light smoothing removes tile noise without softening the escarpment
  const sm = new Float32Array(grid.length);
  for (let j = 0; j < OH; j++) for (let i = 0; i < OW; i++) {
    let s = 0, n = 0;
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
      const x = Math.min(OW - 1, Math.max(0, i + dx)), y = Math.min(OH - 1, Math.max(0, j + dy));
      const w = dx === 0 && dy === 0 ? 4 : dx === 0 || dy === 0 ? 2 : 1;
      s += grid[y * OW + x] * w; n += w;
    }
    sm[j * OW + i] = s / n;
  }

  /* ---------- 4. shade: soft north-west light plus slope darkening ---------- */
  const cell = (WIDTH / OW / UNITS_PER_KM) * 1000; // metres per pixel
  const zf = 3;
  const az = (315 * Math.PI) / 180, alt = (42 * Math.PI) / 180;
  const out = Buffer.alloc(OW * OH * 3);
  // warm paper tints by height: lake plain, city, the Mountain plateau
  const stops = [[75, [233, 224, 207]], [110, [238, 229, 212]], [170, [242, 234, 218]], [210, [246, 238, 222]], [260, [248, 241, 226]]];
  const tint = (h) => {
    if (h <= stops[0][0]) return stops[0][1];
    for (let k = 1; k < stops.length; k++) {
      if (h <= stops[k][0]) {
        const [h0, c0] = stops[k - 1], [h1, c1] = stops[k], t = (h - h0) / (h1 - h0);
        return c0.map((c, n) => c + (c1[n] - c) * t);
      }
    }
    return stops[stops.length - 1][1];
  };
  const at = (x, y) => sm[Math.min(OH - 1, Math.max(0, y)) * OW + Math.min(OW - 1, Math.max(0, x))];
  for (let j = 0; j < OH; j++) {
    for (let i = 0; i < OW; i++) {
      const a = at(i - 1, j - 1), b = at(i, j - 1), c = at(i + 1, j - 1);
      const d = at(i - 1, j), f = at(i + 1, j);
      const g = at(i - 1, j + 1), h = at(i, j + 1), k = at(i + 1, j + 1);
      const dzdx = ((c + 2 * f + k) - (a + 2 * d + g)) / (8 * cell);
      const dzdy = ((g + 2 * h + k) - (a + 2 * b + c)) / (8 * cell);
      const slope = Math.atan(zf * Math.hypot(dzdx, dzdy));
      const aspect = Math.atan2(dzdy, -dzdx);
      let hs = Math.cos(Math.PI / 2 - alt) * Math.cos(slope) + Math.sin(Math.PI / 2 - alt) * Math.sin(slope) * Math.cos(az - Math.PI / 2 - aspect);
      hs = Math.max(0, Math.min(1, hs));
      const steep = Math.min(1, slope / 0.9);
      const light = 0.6 + 0.48 * hs - 0.26 * steep; // around 1.0 on flat ground
      const [r, gg, bb] = tint(sm[j * OW + i]);
      const o = (j * OW + i) * 3;
      // shadows lean warm brown rather than grey
      const m = Math.max(0.56, Math.min(1.07, light));
      out[o] = Math.max(0, Math.min(255, r * m + (m < 1 ? (1 - m) * 18 : 0)));
      out[o + 1] = Math.max(0, Math.min(255, gg * m + (m < 1 ? (1 - m) * 4 : 0)));
      out[o + 2] = Math.max(0, Math.min(255, bb * m - (m < 1 ? (1 - m) * 10 : 0)));
    }
  }
  const img = sharp(out, { raw: { width: OW, height: OH, channels: 3 } });
  const base = p(`public/img/hamilton-area-relief-map-${OW}`);
  await img.clone().avif({ quality: 58, effort: 7 }).toFile(`${base}.avif`);
  await img.clone().webp({ quality: 80, effort: 6 }).toFile(`${base}.webp`);
  return { OW, OH };
}

for (const w of [1200, 2000]) {
  const { OW, OH } = await render(w);
  for (const ext of ['avif', 'webp']) {
    const f = p(`public/img/hamilton-area-relief-map-${OW}.${ext}`);
    console.log(`hamilton-area-relief-map-${OW}.${ext}`.padEnd(26), `${OW}x${OH}`, (fs.statSync(f).size / 1024).toFixed(1) + ' KB');
  }
}
console.log(`tiles: ${cols}x${rows} at z${Z}`);
