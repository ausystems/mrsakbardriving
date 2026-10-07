// Generates src/partials/map.svg, the vector layers drawn over the shaded relief
// (public/img/hamilton-area-relief-map-*.{avif,webp} from build-relief.mjs).
// Map data (c) OpenStreetMap contributors, ODbL. Attribution is shown under the map.
import fs from 'node:fs';
import { project, WIDTH, HEIGHT, UNITS_PER_KM } from './geo-common.mjs';

const root = new URL('../', import.meta.url);
const read = (f) => JSON.parse(fs.readFileSync(new URL(`data/osm/${f}`, root)));
const r1 = (n) => Math.round(n * 10) / 10;

/* ---------- geometry helpers ---------- */
function simplify(pts, tol) {
  if (pts.length < 3) return pts;
  const sq = tol * tol, keep = new Uint8Array(pts.length);
  keep[0] = keep[pts.length - 1] = 1;
  const stack = [[0, pts.length - 1]];
  while (stack.length) {
    const [a, b] = stack.pop();
    let max = 0, idx = -1;
    const [ax, ay] = pts[a], [bx, by] = pts[b];
    const dx = bx - ax, dy = by - ay, len = dx * dx + dy * dy || 1;
    for (let i = a + 1; i < b; i++) {
      const [px, py] = pts[i];
      const t = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / len));
      const ex = ax + t * dx - px, ey = ay + t * dy - py, d = ex * ex + ey * ey;
      if (d > max) { max = d; idx = i; }
    }
    if (max > sq && idx > -1) { keep[idx] = 1; stack.push([a, idx], [idx, b]); }
  }
  return pts.filter((_, i) => keep[i]);
}
const toPath = (pts, close = false) => pts.map((p, i) => `${i ? 'L' : 'M'}${r1(p[0])} ${r1(p[1])}`).join('') + (close ? 'Z' : '');
const key = (p) => `${p.lat.toFixed(7)},${p.lon.toFixed(7)}`;
function chain(runs) {
  runs = runs.map((r) => r.slice());
  let merged = true;
  while (merged) {
    merged = false;
    outer: for (let i = 0; i < runs.length; i++) {
      for (let j = 0; j < runs.length; j++) {
        if (i === j) continue;
        const a = runs[i], b = runs[j];
        if (key(a[a.length - 1]) === key(b[0])) { runs[i] = a.concat(b.slice(1)); runs.splice(j, 1); merged = true; break outer; }
        if (key(a[a.length - 1]) === key(b[b.length - 1])) { runs[i] = a.concat(b.slice(0, -1).reverse()); runs.splice(j, 1); merged = true; break outer; }
      }
    }
  }
  return runs;
}
const splitOnNull = (geom) => {
  const out = []; let cur = [];
  for (const p of geom || []) { if (p) cur.push(p); else if (cur.length) { out.push(cur); cur = []; } }
  if (cur.length) out.push(cur);
  return out;
};
const inView = (pts, m = 60) => pts.some(([x, y]) => x > -m && x < WIDTH + m && y > -m && y < HEIGHT + m);

/* ---------- water: Lake Ontario, Hamilton Harbour, Cootes Paradise ---------- */
const water = read('water.json');
const lake = water.elements.find((e) => e.type === 'relation' && e.tags?.name === 'Lake Ontario');
const shore = chain(lake.members.filter((m) => m.role === 'outer').flatMap((m) => splitOnNull(m.geometry))).sort((a, b) => b.length - a.length)[0];
if (shore[0].lat < shore[shore.length - 1].lat) shore.reverse();
const shorePts = simplify(shore.map((p) => project(p.lat, p.lon)), 0.85);
const pad = 80;
const lakePoly = [...shorePts, [WIDTH + pad, shorePts[shorePts.length - 1][1]], [WIDTH + pad, -pad], [shorePts[0][0], -pad]];
const lakeD = toPath(lakePoly, true);
const cootes = water.elements
  .filter((e) => e.type === 'relation' && e.tags?.name === 'Cootes Paradise')
  .flatMap((rel) => chain(rel.members.filter((m) => m.role !== 'inner').flatMap((m) => splitOnNull(m.geometry))))
  .filter((run) => run.length > 8 && key(run[0]) === key(run[run.length - 1]))
  .map((run) => simplify(run.map((p) => project(p.lat, p.lon)), 0.5));

/* ---------- rivers and creeks ---------- */
const rivers = read('rivers.json');
const riverD = { major: '', minor: '' };
for (const w of rivers.elements) {
  const t = w.tags || {};
  if (/Bronte|Fourteen Mile/.test(t.name || '')) continue; // outside the service area
  const major = /Grand River/.test(t.name || '');
  const pts = simplify(w.geometry.map((p) => project(p.lat, p.lon)), major ? 0.8 : 1.5);
  if (pts.length < 2 || !inView(pts, 0)) continue;
  riverD[major ? 'major' : 'minor'] += toPath(pts);
}

/* ---------- highways ---------- */
const roads = read('roads.json');
const pick = {
  '403': (t) => /(^|;)403($|;)/.test(t.ref || '') || /Alexander Graham Bell/.test(t.name || ''),
  qew: (t) => /QEW/.test(t.ref || ''),
  linc: (t) => t.name === 'Lincoln M. Alexander Parkway',
  redhill: (t) => t.name === 'Red Hill Valley Parkway',
  six: (t) => /(^|;)6($|;)/.test(t.ref || '') && !/Hanlon/.test(t.name || ''),
  '407': (t) => /407/.test(t.ref || ''),
};
const roadD = {};
for (const [id, test] of Object.entries(pick)) {
  const runs = chain(roads.elements.filter((e) => e.type === 'way' && test(e.tags || {})).map((e) => e.geometry));
  roadD[id] = runs.map((run) => simplify(run.map((p) => project(p.lat, p.lon)), 0.8)).filter((pts) => inView(pts)).map((pts) => toPath(pts)).join('');
}
const majorRoads = ['403', 'qew', 'linc', 'redhill', 'six'].map((k) => roadD[k]).join('');

/* ---------- Niagara Escarpment: surveyed cliff edges with hachures on the lower side ---------- */
const cliff = read('cliff.json');
let cliffD = '', hatchD = '';
for (const way of cliff.elements) {
  const pts = simplify(way.geometry.map((p) => project(p.lat, p.lon)), 0.6);
  if (pts.length < 2 || !inView(pts)) continue;
  cliffD += toPath(pts);
  let carry = 0;
  for (let i = 1; i < pts.length; i++) {
    const [ax, ay] = pts[i - 1], [bx, by] = pts[i];
    const len = Math.hypot(bx - ax, by - ay);
    if (!len) continue;
    const ux = (bx - ax) / len, uy = (by - ay) / len, nx = -uy, ny = ux;
    for (let d = carry; d < len; d += 4) hatchD += `M${r1(ax + ux * d)} ${r1(ay + uy * d)}l${r1(nx * 5)} ${r1(ny * 5)}`;
    carry = (carry + 4 - (len % 4)) % 4;
  }
}

/* ---------- places ---------- */
// Desktop label: dx/dy/anchor (tier 1 always, tier 2 from tablet up). Phone label: m* keys (tier 1 only).
const places = [
  { id: 'mount-hope', name: 'Mount Hope', lat: 43.1561412, lon: -79.9161804, tier: 1, dx: 12, dy: 6, anchor: 'start', mdx: 16, mdy: 12, manchor: 'start' },
  { id: 'hamilton', name: 'Downtown Hamilton', lat: 43.25608, lon: -79.87286, tier: 1, dx: 12, dy: -6, anchor: 'start', m: 'Hamilton', mdx: 16, mdy: -4, manchor: 'start' },
  { id: 'westdale', name: 'Westdale', lat: 43.26188, lon: -79.90592, tier: 2, dx: 0, dy: -14, anchor: 'middle' },
  { id: 'west-hamilton', name: 'West Hamilton', lat: 43.2545, lon: -79.893, tier: 2, dx: -4, dy: 25, anchor: 'middle' },
  { id: 'hamilton-mountain', name: 'Hamilton Mountain', lat: 43.2185, lon: -79.8795, tier: 2, dx: 12, dy: 6, anchor: 'start' },
  { id: 'east-hamilton', name: 'East Hamilton', lat: 43.2315, lon: -79.788, tier: 2, dx: 0, dy: -14, anchor: 'middle' },
  { id: 'dundas', name: 'Dundas', lat: 43.26619, lon: -79.95463, tier: 1, dx: -12, dy: 5, anchor: 'end', mdx: -16, mdy: 2, manchor: 'end' },
  { id: 'ancaster', name: 'Ancaster', lat: 43.22569, lon: -79.97669, tier: 1, dx: -12, dy: 6, anchor: 'end', mdx: -16, mdy: 12, manchor: 'end' },
  { id: 'stoney-creek', name: 'Stoney Creek', lat: 43.21675, lon: -79.75676, tier: 1, dx: 12, dy: 6, anchor: 'start', mdx: 16, mdy: 12, manchor: 'start' },
  { id: 'binbrook', name: 'Binbrook', lat: 43.12087, lon: -79.80441, tier: 1, dx: 12, dy: 6, anchor: 'start', mdx: 16, mdy: 12, manchor: 'start' },
  { id: 'caledonia', name: 'Caledonia', lat: 43.07379, lon: -79.95191, tier: 1, dx: 12, dy: 6, anchor: 'start', mdx: 16, mdy: 12, manchor: 'start' },
];
const regions = [
  { name: 'Glanbrook', lat: 43.101, lon: -79.862 },
];

const km = (k) => k * UNITS_PER_KM;

let placesSvg = '';
for (const p of places) {
  const [x, y] = project(p.lat, p.lon);
  placesSvg += `<g class="m-place t${p.tier}" data-area="${p.id}">`;
  placesSvg += `<circle class="m-dot" cx="${r1(x)}" cy="${r1(y)}" r="5.6"/>`;
  placesSvg += `<text class="m-label" x="${r1(x + p.dx)}" y="${r1(y + p.dy)}" text-anchor="${p.anchor}">${p.name}</text>`;
  if (p.tier === 1) placesSvg += `<text class="m-label-sm" x="${r1(x + p.mdx)}" y="${r1(y + p.mdy)}" text-anchor="${p.manchor}">${p.m || p.name}</text>`;
  placesSvg += `</g>`;
}

// Where she teaches: one soft glow over every community she drives to (no centre point, no distances).
// Convex hull of the places, pushed outward, then drawn as a smooth closed curve.
const coverPts = [...places.map((p) => project(p.lat, p.lon)), ...regions.filter((r) => r.name === 'Glanbrook').map((r) => project(r.lat, r.lon))];
const hull = (() => {
  const pts = [...coverPts].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const cross = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const lower = [], upper = [];
  for (const q of pts) { while (lower.length >= 2 && cross(lower.at(-2), lower.at(-1), q) <= 0) lower.pop(); lower.push(q); }
  for (const q of pts.reverse()) { while (upper.length >= 2 && cross(upper.at(-2), upper.at(-1), q) <= 0) upper.pop(); upper.push(q); }
  return lower.slice(0, -1).concat(upper.slice(0, -1));
})();
const hcx = hull.reduce((t, q) => t + q[0], 0) / hull.length, hcy = hull.reduce((t, q) => t + q[1], 0) / hull.length;
const grown = hull.map(([x, y]) => { const dx = x - hcx, dy = y - hcy, L = Math.hypot(dx, dy) || 1; return [x + (dx / L) * km(4.5), y + (dy / L) * km(4.5)]; });
const coverD = grown.map((q, i) => {
  const p0 = grown[(i - 1 + grown.length) % grown.length], p2 = grown[(i + 1) % grown.length], p3 = grown[(i + 2) % grown.length];
  const c1 = [q[0] + (p2[0] - p0[0]) / 6, q[1] + (p2[1] - p0[1]) / 6], c2 = [p2[0] - (p3[0] - q[0]) / 6, p2[1] - (p3[1] - q[1]) / 6];
  return `${i ? '' : `M${r1(q[0])} ${r1(q[1])}`}C${r1(c1[0])} ${r1(c1[1])} ${r1(c2[0])} ${r1(c2[1])} ${r1(p2[0])} ${r1(p2[1])}`;
}).join('') + 'Z';
const regionsSvg = regions.map((r) => { const [x, y] = project(r.lat, r.lon); return `<text class="m-region" x="${r1(x)}" y="${r1(y)}" text-anchor="middle">${r.name}</text>`; }).join('');

const [lakeLx, lakeLy] = project(43.302, -79.635);
const [harbLx, harbLy] = project(43.2893, -79.8395);
const escA = project(43.1968, -79.722), escC = project(43.1905, -79.655), escB = project(43.1838, -79.592);
const escarpPath = `M${r1(escA[0])} ${r1(escA[1])}Q${r1(escC[0])} ${r1(escC[1] + 4)} ${r1(escB[0])} ${r1(escB[1])}`;
const shields = [
  ['403', project(43.2365, -80.0), 40],
  ['QEW', project(43.2268, -79.6715), 44],
  ['6', project(43.105, -79.9395), 26],
];

// scale bar (lane-marking segments) and north arrow, bottom right
const sbX = WIDTH - 44 - km(10), sbY = HEIGHT - 44, seg = km(2.5);
let scale = `<g class="m-scale" transform="translate(${r1(sbX)} ${r1(sbY)})">`;
for (let i = 0; i < 4; i++) scale += `<rect class="${i % 2 ? 'm-scale-b' : 'm-scale-a'}" x="${r1(i * seg)}" y="0" width="${r1(seg)}" height="7"/>`;
scale += `<rect class="m-scale-frame" x="0" y="0" width="${r1(km(10))}" height="7"/>`;
scale += `<text x="0" y="-9" text-anchor="middle">0</text><text x="${r1(km(5))}" y="-9" text-anchor="middle">5</text><text x="${r1(km(10))}" y="-9" text-anchor="middle">10 km</text></g>`;
const north = `<g class="m-north" transform="translate(${r1(sbX - 46)} ${r1(sbY - 8)})"><circle r="22"/><path d="M0-15 6 6 0 2-6 6Z"/><text y="-26" text-anchor="middle">N</text></g>`;

const svg = `<svg class="area-map__svg" viewBox="0 0 ${WIDTH} ${HEIGHT}" role="img" aria-labelledby="map-title map-desc" focusable="false">
<title id="map-title">Map of the areas Mrs. Akbar serves around Hamilton, Ontario</title>
<desc id="map-desc">Every community Mrs. Akbar drives to is marked, from Dundas and Ancaster in the west to Stoney Creek in the east and down to Mount Hope, Binbrook and Caledonia in the south. A soft glow covers the whole area she serves.</desc>
<defs>
<filter id="m-cover-soft" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="22"/></filter>
<path id="m-lake-shape" d="${lakeD}"/>
<path id="m-shore-line" d="${toPath(shorePts)}"/>
<path id="m-escarp-path" d="${escarpPath}"/>
<clipPath id="m-lake-clip"><use href="#m-lake-shape"/></clipPath>
<filter id="m-shadow" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#211e1a" flood-opacity=".32"/></filter>
</defs>
<path class="m-cover" d="${coverD}" filter="url(#m-cover-soft)"/>
<g class="m-rivers"><path class="m-river" d="${riverD.minor}"/><path class="m-river m-river--major" d="${riverD.major}"/></g>
<g class="m-water">
<use class="m-lake" href="#m-lake-shape"/>
${cootes.map((c) => `<path class="m-lake" d="${toPath(c, true)}"/>`).join('')}
<g clip-path="url(#m-lake-clip)" class="m-ripples">
${[[54, 0.22], [38, 0.36], [25, 0.52], [15, 0.72], [7, 0.92]].map(([d, o]) => `<use class="m-ripple" href="#m-shore-line" style="stroke-width:${d * 2 + 1.4}px;opacity:${o}"/><use class="m-ripple-gap" href="#m-shore-line" style="stroke-width:${d * 2 - 0.2}px"/>`).join('')}
</g>
<use class="m-shore" href="#m-shore-line"/>
</g>
<g class="m-cliff"><path class="m-cliff-hatch" d="${hatchD}"/><path class="m-cliff-edge" d="${cliffD}"/></g>
<g class="m-roads">
<path class="m-road-case m-road--minor" d="${roadD['407']}"/><path class="m-road-fill m-road--minor" d="${roadD['407']}"/>
<path class="m-road-case" d="${majorRoads}"/><path class="m-road-fill" d="${majorRoads}"/>
</g>
<g class="m-annot" aria-hidden="true">
<text class="m-water-label" x="${r1(lakeLx)}" y="${r1(lakeLy)}" text-anchor="middle">Lake Ontario</text>
<text class="m-water-label m-water-label--sm" x="${r1(harbLx)}" y="${r1(harbLy)}" text-anchor="middle"><tspan x="${r1(harbLx)}">Hamilton</tspan><tspan x="${r1(harbLx)}" dy="15">Harbour</tspan></text>
${regionsSvg}
<text class="m-feature"><textPath href="#m-escarp-path" startOffset="50%" text-anchor="middle">Niagara Escarpment</textPath></text>
${shields.map(([t, [x, y], w]) => `<g class="m-shield" transform="translate(${r1(x)} ${r1(y)})"><rect x="${-w / 2}" y="-12" width="${w}" height="24" rx="6"/><text y="5" text-anchor="middle">${t}</text></g>`).join('')}
${scale}${north}
</g>
<g class="m-places">${placesSvg}</g>
</svg>`;

fs.writeFileSync(new URL('src/partials/map.svg', root), svg);

// Standalone base layer (water, rivers, escarpment, highways; no labels) for the area pages' mini-maps.
// Lines are drawn thinner because those maps are shown zoomed in two to three times.
const baseCss = '.r{fill:none;stroke:#9db3ac;stroke-width:.7;stroke-linecap:round;stroke-linejoin:round}.rM{stroke:#8aa59d;stroke-width:1.8}' +
  '.l{fill:#cfd9d3}.rp{fill:none;stroke:#a9bdb5;stroke-linejoin:round}.rg{fill:none;stroke:#cfd9d3;stroke-linejoin:round}.s{fill:none;stroke:#8fa59d;stroke-width:.9;stroke-linejoin:round}' +
  '.ce{fill:none;stroke:#7a6245;stroke-width:.9;stroke-linejoin:round;opacity:.75}.ch{fill:none;stroke:#7a6245;stroke-width:.5;opacity:.4}' +
  '.rc{fill:none;stroke:#c4ae88;stroke-width:3.4;stroke-linecap:round;stroke-linejoin:round}.rf{fill:none;stroke:#fffaf1;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}.mn{opacity:.55}';
const base = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${WIDTH} ${HEIGHT}" width="${WIDTH}" height="${HEIGHT}"><style>${baseCss}</style>
<defs><path id="k" d="${lakeD}"/><path id="h" d="${toPath(shorePts)}"/><clipPath id="c"><use xlink:href="#k"/></clipPath></defs>
<path class="r" d="${riverD.minor}"/><path class="r rM" d="${riverD.major}"/>
<use class="l" xlink:href="#k"/>${cootes.map((c) => `<path class="l" d="${toPath(c, true)}"/>`).join('')}
<g clip-path="url(#c)">${[[54, 0.22], [38, 0.36], [25, 0.52], [15, 0.72], [7, 0.92]].map(([d, o]) => `<use class="rp" xlink:href="#h" style="stroke-width:${d * 2 + 1.4}px;opacity:${o}"/><use class="rg" xlink:href="#h" style="stroke-width:${d * 2 - 0.2}px"/>`).join('')}</g>
<use class="s" xlink:href="#h"/>
<path class="ch" d="${hatchD}"/><path class="ce" d="${cliffD}"/>
<path class="rc mn" d="${roadD['407']}"/><path class="rf mn" d="${roadD['407']}"/><path class="rc" d="${majorRoads}"/><path class="rf" d="${majorRoads}"/>
</svg>`;
fs.writeFileSync(new URL('public/img/hamilton-area-map-base.svg', root), base);
console.log(`hamilton-area-map-base.svg written: ${(base.length / 1024).toFixed(1)} KB`);
console.log(`map.svg written: ${(svg.length / 1024).toFixed(1)} KB, ${WIDTH}x${HEIGHT}`);
