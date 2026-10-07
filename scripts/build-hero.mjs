// Generates src/partials/hero-scene.svg: a road climbing the Niagara Escarpment
// ("the Mountain") up to a neighbourhood labelled "your place": she drives to her students. Road width and dash length taper with distance
// so the scene reads in perspective. The 3D lesson car (src/car3d.js) is driven along it by src/motion.js.
import fs from 'node:fs';
import { drawCar, CAR_WIDTH } from '../src/car3d.js';

const W = 560, H = 480;
const r1 = (n) => Math.round(n * 10) / 10;

// Road centre line, bottom (near) to top (far), as cubic segments.
const segs = [
  [[384, 520], [372, 430], [170, 392], [196, 318]],
  [[196, 318], [210, 292], [304, 286], [338, 262]],
  [[338, 262], [372, 238], [300, 222], [258, 206]],
];
// Perspective: on the plain, width grows linearly below a vanishing line (HORIZON);
// on the cliff face (above BASE) the road is far away, so it stays narrow.
export const ROAD = { horizon: 282, k: 0.8, base: 306, faceK: 0.1 };
const widthAtY = (y) => (y >= ROAD.base ? ROAD.k * (y - ROAD.horizon) : ROAD.k * (ROAD.base - ROAD.horizon) - (ROAD.base - y) * ROAD.faceK);

const bez = ([p0, p1, p2, p3], t) => {
  const u = 1 - t;
  return [
    u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0],
    u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1],
  ];
};
// Dense samples along the whole centre line, then re-parameterise by arc length.
const raw = [];
segs.forEach((s, i) => { for (let j = i ? 1 : 0; j <= 200; j++) raw.push(bez(s, j / 200)); });
const cum = [0];
for (let i = 1; i < raw.length; i++) cum.push(cum[i - 1] + Math.hypot(raw[i][0] - raw[i - 1][0], raw[i][1] - raw[i - 1][1]));
const L = cum[cum.length - 1];
function at(t) {
  const d = t * L;
  let i = cum.findIndex((c) => c >= d);
  if (i <= 0) i = 1;
  const f = (d - cum[i - 1]) / (cum[i] - cum[i - 1] || 1);
  const x = raw[i - 1][0] + (raw[i][0] - raw[i - 1][0]) * f;
  const y = raw[i - 1][1] + (raw[i][1] - raw[i - 1][1]) * f;
  const dx = raw[i][0] - raw[i - 1][0], dy = raw[i][1] - raw[i - 1][1];
  const len = Math.hypot(dx, dy) || 1;
  return { x, y, tx: dx / len, ty: dy / len, nx: -dy / len, ny: dx / len };
}

// Road surface polygon + edge lines
const N = 260, left = [], right = [], edgeL = [], edgeR = [];
for (let i = 0; i <= N; i++) {
  const t = i / N, p = at(t), w = widthAtY(p.y) / 2;
  left.push([p.x - p.nx * w, p.y - p.ny * w]);
  right.push([p.x + p.nx * w, p.y + p.ny * w]);
  edgeL.push([p.x - p.nx * w * 0.86, p.y - p.ny * w * 0.86]);
  edgeR.push([p.x + p.nx * w * 0.86, p.y + p.ny * w * 0.86]);
}
const poly = (pts) => pts.map((p, i) => `${i ? 'L' : 'M'}${r1(p[0])} ${r1(p[1])}`).join('');
const roadD = poly(left) + poly(right.slice().reverse()).replace(/^M/, 'L') + 'Z';

// Perspective centre dashes: length and gap scale with road width.
const dashes = [];
{
  let d = 0.012 * L;
  while (d < L * 0.985) {
    const t = d / L, w = widthAtY(at(t).y);
    const len = Math.max(1.6, w * 0.2), gap = Math.max(2.2, w * 0.26);
    const a = at(t), b = at(Math.min(1, (d + len) / L));
    const sw = Math.max(0.9, w * 0.035);
    dashes.push(`<path class="hs-dash" d="M${r1(a.x)} ${r1(a.y)}L${r1(b.x)} ${r1(b.y)}" stroke-width="${r1(sw)}"/>`);
    d += len + gap;
  }
}
const centreD = segs.map((s, i) => `${i ? '' : `M${s[0][0]} ${s[0][1]}`}C${s[1].join(' ')} ${s[2].join(' ')} ${s[3].join(' ')}`).join('');

// Escarpment: brow line with a treeline, a layered rock face, and the plain below.
const brow = [];
for (let x = -10; x <= W + 10; x += 10) brow.push([x, 204 + Math.sin(x / 47) * 2.2 + Math.sin(x / 13) * 0.7]);
const base = [];
for (let x = W + 10; x >= -10; x -= 10) base.push([x, 306 + Math.sin(x / 61) * 4 + Math.cos(x / 23) * 1.6]);
const faceD = poly(brow) + poly(base).replace(/^M/, 'L') + 'Z';
let trees = '';
for (let x = -6, i = 0; x < W + 12; i++) {
  const r = 5 + ((i * 37) % 7);
  const y = 203 + Math.sin(x / 47) * 2.2 - r * 0.55;
  if (!(x > 240 && x < 274)) trees += `<circle cx="${r1(x)}" cy="${r1(y)}" r="${r}"/>`; // gap where the road crests
  x += r * 1.35;
}
let strata = '';
[226, 244, 262, 282].forEach((y0, k) => {
  const pts = [];
  for (let x = -10; x <= W + 10; x += 14) pts.push([x, y0 + Math.sin(x / (29 + k * 7) + k) * 3 + (x % 3)]);
  strata += `<path d="${poly(pts)}"/>`;
});

// The student's neighbourhood on the plateau: a few rooftops by the crest of the road.
const houses = [
  [318, 197, 17, 10], [340, 199, 13, 8], [358, 196, 19, 11], [382, 199, 14, 9], [402, 197, 12, 8], [206, 199, 13, 8], [188, 200, 10, 7],
].map(([x, y, w, h]) => `<path d="M${x} ${y}h${w}v-${h}l-${w / 2} -${r1(h * 0.62)}l-${w / 2} ${r1(h * 0.62)}Z"/>`).join('');

// Rows in the field below the escarpment
let fields = '';
for (let k = 0; k < 6; k++) {
  const y = 334 + k * k * 4.8 + k * 9;
  fields += `<path d="M-10 ${r1(y)}C140 ${r1(y - 6 - k)} 300 ${r1(y + 8 + k)} 570 ${r1(y - 2)}"/>`;
}

// The lesson car, parked where the intro animation leaves it (also the reduced-motion view)
export const carPose = (t) => {
  const p = at(t), w = widthAtY(p.y), lane = w * 0.24;
  const yaw = Math.max(-1.4, Math.min(1.4, Math.atan2(p.tx * 0.5, -p.ty)));
  const pitch = ((9 + 13 * Math.max(0, Math.min(1, (p.y - 200) / 320))) * Math.PI) / 180;
  return { x: p.x + p.nx * lane, y: p.y + p.ny * lane, s: (0.4 * w) / CAR_WIDTH, yaw, pitch };
};
const pose0 = carPose(0.4);
const car0 = drawCar(pose0);
const heroCar = `<g id="hero-car" class="hs-car" transform="translate(${r1(pose0.x)} ${r1(pose0.y)}) scale(${pose0.s.toFixed(4)})"><path class="hc-shadow" d="${car0.shadow}" fill="#2A2017" opacity=".34" filter="url(#hc-blur)"/>${car0.faces.map((f) => `<path d="${f.d}" fill="${f.fill}"/>`).join('')}</g>`;

const svg = `<svg class="hero-scene" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false">
<defs>
<linearGradient id="hs-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F1D6B3"/><stop offset=".62" stop-color="#F6E6CF"/><stop offset="1" stop-color="#F8EEDF"/></linearGradient>
<linearGradient id="hs-plain" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E4D3B2"/><stop offset="1" stop-color="#EEE3CC"/></linearGradient>
<linearGradient id="hs-face" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#BB9D6D"/><stop offset=".6" stop-color="#C8AE80"/><stop offset="1" stop-color="#D6C096"/></linearGradient>
<linearGradient id="hs-road" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4A443D"/><stop offset=".55" stop-color="#312D29"/><stop offset="1" stop-color="#26231F"/></linearGradient>
<filter id="hc-blur" x="-20%" y="-30%" width="140%" height="160%"><feGaussianBlur stdDeviation="9"/></filter>
<radialGradient id="hs-sun" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#F7C766"/><stop offset=".7" stop-color="#F4C35F"/><stop offset="1" stop-color="#F4C35F" stop-opacity="0"/></radialGradient>
</defs>
<rect class="hs-sky" width="${W}" height="${H}" fill="url(#hs-sky)"/>
<circle class="hs-sun-glow" cx="138" cy="186" r="104" fill="url(#hs-sun)" opacity=".4"/>
<circle class="hs-sun" cx="138" cy="190" r="50" fill="#F5C45E"/>
<g class="hs-birds" fill="none" stroke="#8C7B63" stroke-width="1.6" stroke-linecap="round"><path d="M214 108q6-6 12 0q6-6 12 0"/><path d="M246 88q4.5-4.5 9 0q4.5-4.5 9 0"/></g>
<g class="hs-plateau">
<path d="M-10 210C120 200 380 199 570 206V300H-10Z" fill="#CDB68B"/>
<g fill="#B49C73">${trees}</g>
<g fill="#A88F66">${houses}</g>
</g>
<path class="hs-face" d="${faceD}" fill="url(#hs-face)"/>
<path class="hs-cap" d="${poly(brow)}" fill="none" stroke="#A68A5E" stroke-width="7" opacity=".55"/>
<g class="hs-strata" fill="none" stroke="#BDA374" stroke-width="1.2" opacity=".75">${strata}</g>
<path class="hs-plain" d="${poly(base.slice().reverse())}L${W + 10} ${H + 10}L-10 ${H + 10}Z" fill="url(#hs-plain)"/>
<g class="hs-fields" fill="none" stroke="#D9C7A4" stroke-width="1.3">${fields}</g>
<g class="hs-tree hs-tree--l"><path d="M58 452V404" stroke="#8C7B63" stroke-width="3" stroke-linecap="round"/><circle cx="58" cy="392" r="24" fill="#C3AD84"/><circle cx="44" cy="408" r="15" fill="#B9A279"/></g>
<g class="hs-tree hs-tree--r"><path d="M512 386V350" stroke="#8C7B63" stroke-width="2.4" stroke-linecap="round"/><circle cx="512" cy="340" r="18" fill="#C3AD84"/></g>
<path class="hs-road-cut" d="${roadD}" fill="#8F7650" opacity=".45" transform="translate(0 3.2)"/>
<path class="hs-road" d="${roadD}" fill="url(#hs-road)"/>
<g class="hs-edges" fill="none" stroke="#F3EBDD" stroke-opacity=".62" stroke-width="1.4"><path d="${poly(edgeL)}"/><path d="${poly(edgeR)}"/></g>
<g class="hs-dashes" fill="none" stroke="#F2B53A" stroke-linecap="butt">${dashes.join('')}</g>
<g class="hs-note" aria-hidden="true"><text x="300" y="120" text-anchor="middle">your place</text><path d="M318 132c10 12 16 26 22 48m0 0-6.5-6m6.5 6 2.5-8.5" fill="none" stroke="#A63B26" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></g>
<g class="hs-sign" transform="translate(470 396)"><path d="M0 0V58" stroke="#5C5248" stroke-width="3.2" stroke-linecap="round"/><g transform="translate(0 -6) rotate(45)"><rect x="-17" y="-17" width="34" height="34" rx="4" fill="#F2B53A" stroke="#211E1A" stroke-width="2.2"/></g><path d="M-5 5c0-5 9-4 9-9s-7-5-7-9l4-4m-4 4 5 1" fill="none" stroke="#211E1A" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" transform="translate(0 -4)"/></g>
${heroCar}
</svg>`;

fs.writeFileSync(new URL('../src/partials/hero-scene.svg', import.meta.url), svg);
// Samples for placing the car in JS: [x, y, angle(deg), width]
const samples = [];
for (let i = 0; i <= 120; i++) {
  const p = at(i / 120);
  samples.push([r1(p.x), r1(p.y), r1((Math.atan2(p.ty, p.tx) * 180) / Math.PI), r1(widthAtY(p.y)), r1(p.nx * 100) / 100, r1(p.ny * 100) / 100]);
}
fs.mkdirSync(new URL('../src/generated/', import.meta.url), { recursive: true });
fs.writeFileSync(new URL('../src/generated/hero-road.json', import.meta.url), JSON.stringify(samples));
console.log(`hero-scene.svg written: ${(svg.length / 1024).toFixed(1)} KB, ${dashes.length} dashes, road length ${L.toFixed(0)}`);
