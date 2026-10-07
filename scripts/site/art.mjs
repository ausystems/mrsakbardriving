// Artwork for the generated pages: area mini-maps (drawn from the same OpenStreetMap data and
// projection as the home page map) and one small animated illustration per kind of lesson.
// Motion is SMIL or CSS; fx.js starts it when the art is on screen and never for reduced motion.
import { project, WIDTH, HEIGHT } from '../geo-common.mjs';

const r1 = (n) => Math.round(n * 10) / 10;
const CAR = (w = 76, cls = '') => `<use class="art-car${cls ? ` ${cls}` : ''}" href="#i-car" x="${-w / 2}" y="${-w / 4}" width="${w}" height="${w / 2}"/>`;

/* ---------- Yellow diamond road signs for the guides ---------- */
const GLYPHS = {
  check: '<path class="sg-s" d="M22 33l7 7 14-15"/>',
  flag: '<path class="sg-s" d="M25 45V18"/><path class="sg-f" d="M25 19h15l-3.5 5.5L40 30H25Z"/>',
  merge: '<path class="sg-s" d="M23 45c0-8 9-10 9-18M41 45c0-8-9-10-9-18M32 27v-8M27.5 23.5 32 19l4.5 4.5"/>',
  steps: '<path class="sg-f" d="M21 41h6v-6h-6ZM29 41h6V29h-6ZM37 41h6V22h-6Z"/>',
  question: '<path class="sg-s" d="M26.5 26.5a5.6 5.6 0 1 1 8.4 4.8c-1.9 1.1-2.9 2.3-2.9 4.4v1.3"/><circle class="sg-f" cx="32" cy="42.5" r="2"/>',
  breath: '<path class="sg-s" d="M21 27c3.6-3 7.4-3 11 0s7.4 3 11 0M21 33c3.6-3 7.4-3 11 0s7.4 3 11 0M21 39c3.6-3 7.4-3 11 0s7.4 3 11 0"/>',
  leaf: '<path class="sg-f" d="M32 17.5l2.4 5 3.9-2-1 7.1 4.5-3.1 1.3 3.2 4.3-.6-2.7 4.1 1.5 1.5-6.4 4.3.8 2.7-6.4-1.1V46h-1.6v-7.4l-6.4 1.1.8-2.7-6.4-4.3 1.5-1.5-2.7-4.1 4.3.6 1.3-3.2 4.5 3.1-1-7.1 3.9 2Z"/>',
  parking: '<path class="sg-s" d="M27 45V19h7.5a7 7 0 0 1 0 14H27"/>',
  curve: '<path class="sg-s" d="M27 45c0-6 11-5 11-11.5s-9-6-9-11.5l5-5m-5 5 6.5.8"/>',
  lock: '<path class="sg-s" d="M25.5 31v-4.5a6.5 6.5 0 0 1 13 0V31"/><rect class="sg-f" x="22.5" y="30" width="19" height="14" rx="2.5"/>',
  doc: '<path class="sg-s" d="M24.5 19h11l5 5v21h-16Z"/><path class="sg-s" d="M28 30h9M28 35h9M28 40h6"/>',
  snow: '<path class="sg-s" d="M32 18v28M19.9 25l24.2 14M19.9 39l24.2-14M28.5 20.5 32 23l3.5-2.5M28.5 43.5 32 41l3.5 2.5"/>',
  pencil: '<path class="sg-s" d="M22 42l2.3-8.3L37.5 20.5l6 6L30.3 39.7ZM34.5 23.5l6 6M24.3 33.7l6 6"/>',
  quiz: '<path class="sg-s" d="M29.5 24h12.5M29.5 32h12.5M29.5 40h12.5M20.6 31.8l2.2 2.2 3.9-4.4"/><circle class="sg-f" cx="23.5" cy="24" r="2.3"/><circle class="sg-f" cx="23.5" cy="40" r="2.3"/>',
  dollar: '<path class="sg-s" d="M37.6 25.2c-1.3-2.3-3.5-3.5-6-3.5-3.3 0-5.7 1.8-5.7 4.4 0 6.1 12.3 3.5 12.3 9.8 0 2.8-2.6 4.6-6.2 4.6-2.8 0-5.2-1.2-6.5-3.4M32 17.5v29"/>',
  signs: '<path class="sg-s" d="M27.6 21.4h8.8l6.2 6.2v8.8l-6.2 6.2h-8.8l-6.2-6.2v-8.8Z"/><path class="sg-s" d="M27 29.6h10M27 34.4h10" style="stroke-width:2.4"/>',
  yield: '<path class="sg-s" d="M20.5 23.5h23L32 43Z"/><path class="sg-s" d="M27 27.5h10L32 36Z" style="stroke-width:2.2"/>',
  speed: '<path class="sg-s" d="M21.6 39.5a12 12 0 1 1 20.8 0M32 33.5l6.2-6.8"/><circle class="sg-f" cx="32" cy="33.5" r="2.6"/>',
  phone: '<rect class="sg-s" x="26.5" y="19" width="11" height="26" rx="2.6"/><path class="sg-s" d="M30.5 40.5h3M20 44 44 20"/>',
  points: '<path class="sg-s" d="M24.5 22.5v19M29.5 22.5v19M34.5 22.5v19M39.5 22.5v19M21.5 37.5l21-11"/>',
  uturn: '<path class="sg-s" d="M25 45V31a7 7 0 0 1 14 0v8M34.5 34.5 39 39l4.5-4.5"/>',
  roundabout: '<path class="sg-s" d="M37 40.7A10 10 0 1 0 28.6 41.4M23.7 43.3l4.9-1.9-2.6-4.7"/>',
  calendar: '<rect class="sg-s" x="21" y="23" width="22" height="20" rx="2.5"/><path class="sg-s" d="M21 29.5h22M27 19.5v6M37 19.5v6"/><circle class="sg-f" cx="27" cy="36" r="1.9"/><circle class="sg-f" cx="32" cy="36" r="1.9"/><circle class="sg-f" cx="37" cy="36" r="1.9"/>',
  alert: '<path class="sg-s" d="M32 20v15"/><circle class="sg-f" cx="32" cy="42" r="2.5"/>',
  wheel: '<circle class="sg-s" cx="32" cy="32" r="12"/><circle class="sg-s" cx="32" cy="32" r="3" style="stroke-width:2.6"/><path class="sg-s" d="M20.4 29.6c3.7-1.3 7.6-1.9 11.6-1.9s7.9.6 11.6 1.9M30.1 34.6 25.8 42.4M33.9 34.6l4.3 7.8" style="stroke-width:2.8"/>',
  key: '<circle class="sg-s" cx="26" cy="32" r="5.6"/><path class="sg-s" d="M31.6 32H45M40.5 32v5M44.5 32v4"/>',
  clock: '<circle class="sg-s" cx="32" cy="32" r="11.5"/><path class="sg-s" d="M32 25v7.5l5 3"/>',
  eye: '<path class="sg-s" d="M19 32c3.5-6 8-9 13-9s9.5 3 13 9c-3.5 6-8 9-13 9s-9.5-3-13-9Z"/><circle class="sg-f" cx="32" cy="32" r="4.2"/>',
  reverse: '<path class="sg-s" d="M27 44V20h7a6.5 6.5 0 0 1 0 13h-7M33.5 33 40 44"/>',
  shield: '<path class="sg-s" d="M32 19.5 43 23.5v8c0 7-4.7 11.5-11 13.5-6.3-2-11-6.5-11-13.5v-8Z"/><path class="sg-s" d="M27 32.2l3.5 3.5 7-7.5" style="stroke-width:2.8"/>',
  glass: '<path class="sg-s" d="M26 21h12l-1.5 9a4.5 4.5 0 0 1-9 0ZM32 34.5V42M27.5 42h9M20 44 44 20"/>',
  hazard: '<path class="sg-s" d="M32 19.5 44.5 41.5h-25Z"/><path class="sg-s" d="M32 28v6" style="stroke-width:2.8"/><circle class="sg-f" cx="32" cy="37.8" r="1.8"/>',
};
export function signIcon(glyph) {
  return `<svg class="sign" viewBox="0 0 64 64" aria-hidden="true" focusable="false"><g class="sign-board"><rect x="13" y="13" width="38" height="38" rx="5" transform="rotate(45 32 32)" class="sign-face"/>${GLYPHS[glyph] || ''}</g></svg>`;
}

/* ---------- Area mini-maps ---------- */
// Each map centres on the area itself. She drives to her students, so the lesson car drives in
// and parks by the area's pin; there is no "home base" and no distance from one.
export const PLACES = {
  'mount-hope': { name: 'Mount Hope', lat: 43.1561412, lon: -79.9161804 },
  hamilton: { name: 'Downtown Hamilton', short: 'Downtown', lat: 43.25608, lon: -79.87286 },
  ancaster: { name: 'Ancaster', lat: 43.22569, lon: -79.97669 },
  dundas: { name: 'Dundas', lat: 43.26619, lon: -79.95463 },
  'stoney-creek': { name: 'Stoney Creek', lat: 43.21675, lon: -79.75676 },
  binbrook: { name: 'Binbrook', lat: 43.12087, lon: -79.80441 },
  caledonia: { name: 'Caledonia', lat: 43.07379, lon: -79.95191 },
  mcmaster: { name: 'McMaster University', short: 'McMaster', lat: 43.2617, lon: -79.9189 },
};

export function miniMap(key, { label } = {}) {
  const target = PLACES[key];
  const [tx, ty] = project(target.lat, target.lon);
  // About 19 km across, at the arch's 7:6 shape, nudged down because the arch's round top has less room
  const ratio = 560 / 480;
  const w = 380, h = w / ratio;
  // centred on the area, but never past the edge of the map data
  const vx = Math.min(Math.max(tx - w / 2, 0), WIDTH - w), vy = Math.min(Math.max(ty + h * 0.06 - h / 2, 0), HEIGHT - h);
  const cx = vx + w / 2;
  const s = w / 560; // map units per px of the 560-wide frame
  const fs = 17 * s;
  // keep labels inside the arch: its top is half an ellipse (see .phero-art border-radius)
  const textW = (str, size) => str.length * size * 0.56;
  const archHalf = (y) => {
    const t = (y - vy) / h, ry = 0.5834;
    if (t >= ry) return w / 2;
    const k = (ry - t) / ry;
    return (w / 2) * Math.sqrt(Math.max(0, 1 - k * k));
  };
  // a label goes beside its pin if it fits, otherwise on the other side, then below, then above
  const place = (px, py, str, size, gap) => {
    const tw = textW(str, size);
    const fits = (left, base) => {
      const half = archHalf(base - size * 0.9) - 14 * s;
      return base - size > vy + 4 * s && base + 6 * s < vy + h && left >= cx - half && left + tw <= cx + half;
    };
    const opts = [[px + gap, py + size * 0.35], [px - tw / 2, py + gap + size * 0.8], [px - gap - tw, py + size * 0.35], [px - tw / 2, py - gap]];
    const hit = opts.find(([l, b]) => fits(l, b));
    return hit ? { x: hit[0], y: hit[1] } : { x: opts[1][0], y: opts[1][1] };
  };
  // The lesson car comes in from the bottom left and stops just short of the pin
  const S = [tx - w * 0.3, vy + h + 30 * s];
  const L0 = Math.hypot(S[0] - tx, S[1] - ty);
  const u = [(S[0] - tx) / L0, (S[1] - ty) / L0];
  const E = [tx + u[0] * 46 * s, ty + u[1] * 46 * s];
  const C = [(S[0] + E[0]) / 2 + u[1] * L0 * 0.2, (S[1] + E[1]) / 2 - u[0] * L0 * 0.2];
  const route = `M${r1(S[0])} ${r1(S[1])}Q${r1(C[0])} ${r1(C[1])} ${r1(E[0])} ${r1(E[1])}`;
  const endAngle = r1((Math.atan2(E[1] - C[1], E[0] - C[0]) * 180) / Math.PI);
  // nearby areas, faint, for orientation
  const others = Object.entries(PLACES)
    .filter(([k]) => k !== key && k !== 'mount-hope')
    .map(([, p]) => { const [x, y] = project(p.lat, p.lon); return { x, y, name: p.short || p.name }; })
    .filter((p) => p.y > vy + h * 0.2 && p.y < vy + h - 16 * s)
    .filter((p) => { const half = archHalf(p.y - fs) - 10 * s; return p.x - 6 * s > cx - half && p.x + 9 * s + textW(p.name, fs * 0.78) < cx + half; })
    .filter((p) => Math.hypot(p.x - tx, p.y - ty) > 60 * s)
    // and never under the car's route
    .filter((p) => !Array.from({ length: 41 }, (_, i) => i / 40).some((t) => {
      const x = (1 - t) ** 2 * S[0] + 2 * (1 - t) * t * C[0] + t * t * E[0], y = (1 - t) ** 2 * S[1] + 2 * (1 - t) * t * C[1] + t * t * E[1];
      return x > p.x - 10 * s && x < p.x + 12 * s + textW(p.name, fs * 0.78) && y > p.y - 14 * s && y < p.y + 12 * s;
    }));
  const name = target.short || target.name;
  const tl = place(tx, ty, name.toUpperCase(), fs * 1.25, 30 * s);
  const id = `mm-${key}`;
  const rs = r1(s * 100) / 100;
  return `<svg class="mmap" viewBox="${r1(vx)} ${r1(vy)} ${r1(w)} ${r1(h)}" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${label}" focusable="false">
<image href="/img/hamilton-area-relief-map-2000.webp" x="0" y="0" width="1000" height="815" preserveAspectRatio="none"/>
<image href="/img/hamilton-area-map-base.svg" x="0" y="0" width="1000" height="815" preserveAspectRatio="none"/>
${others.map((p) => `<g class="mm-other"><circle cx="${r1(p.x)}" cy="${r1(p.y)}" r="${r1(4.2 * s)}" style="stroke-width:${r1(2 * s)}px"/><text x="${r1(p.x + 9 * s)}" y="${r1(p.y + 5 * s)}" style="font-size:${r1(fs * 0.78)}px;stroke-width:${r1(4 * s)}px">${p.name}</text></g>`).join('')}
<path class="mm-route" id="${id}-route" d="${route}" pathLength="1" style="stroke-width:${r1(3.2 * s)}px"/>
<g class="mm-target">
<circle class="mm-halo" cx="${r1(tx)}" cy="${r1(ty)}" r="${r1(24 * s)}"/>
<circle class="mm-target-ring" cx="${r1(tx)}" cy="${r1(ty)}" r="${r1(13 * s)}" style="stroke-width:${r1(2.6 * s)}px"/>
<circle class="mm-target-dot" cx="${r1(tx)}" cy="${r1(ty)}" r="${r1(6 * s)}"/>
<text class="mm-target-label" x="${r1(tl.x)}" y="${r1(tl.y)}" style="font-size:${r1(fs * 1.25)}px;stroke-width:${r1(6 * s)}px">${name}</text>
</g>
<g class="art-static" transform="translate(${r1(E[0])} ${r1(E[1])}) rotate(${endAngle}) scale(${rs})">${CAR(46)}</g>
<g class="art-anim"><animateMotion dur="3.2s" begin="indefinite" fill="freeze" rotate="auto" calcMode="spline" keyPoints="0;1" keyTimes="0;1" keySplines=".45 0 .25 1"><mpath href="#${id}-route"/></animateMotion><g transform="scale(${rs})">${CAR(46)}</g></g>
</svg>`;
}

/* ---------- Lesson illustrations (560 x 480, framed in the arch) ---------- */
const SKY = '<rect width="560" height="480" class="art-sky"/>';

export function artG2() {
  const rows = ['Left and right turns', 'Lane changes', 'Stop signs', 'Parallel parking', 'Three-point turn'];
  return `<svg class="art art-g2" viewBox="0 0 560 480" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false">
${SKY}
<g transform="rotate(-4 280 270)">
<rect x="150" y="72" width="260" height="360" rx="16" class="art-board"/>
<rect x="166" y="96" width="228" height="320" rx="6" class="art-paper"/>
<rect x="238" y="60" width="84" height="34" rx="9" class="art-clip"/>
<text x="186" y="142" class="art-display" style="font-size:30px">Road test</text>
<text x="186" y="164" class="art-small">Practice run, Hamilton</text>
${rows.map((t, i) => `<g transform="translate(186 ${196 + i * 40})"><rect width="22" height="22" rx="5" class="art-box"/><text x="34" y="16" class="art-row">${t}</text><path class="art-tick" style="--i:${i}" d="M3 12.5c2 1.3 3.8 3 5.3 5.5C11.2 11 15.5 5.8 21.5 1.8" pathLength="1"/></g>`).join('')}
<text x="280" y="402" text-anchor="middle" class="art-script" style="font-size:30px">ready for test day!</text>
</g>
</svg>`;
}

export function artHighway() {
  return `<svg class="art art-highway" viewBox="0 0 560 480" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false">
${SKY}
<rect x="150" y="-10" width="260" height="500" class="art-asphalt"/>
<path d="M162-10v500M398-10v500" class="art-edge"/>
<path d="M236.7-40v560M323.3-40v560" class="art-lanes"/>
<g class="art-traffic"><g transform="translate(366 0) rotate(-90)">${CAR(70, 'art-car--dark')}</g></g>
<g class="art-merge">
<g transform="translate(280 330) rotate(-90)">${CAR(78)}</g>
<circle class="art-signal" cx="262" cy="300" r="5"/><circle class="art-signal" cx="262" cy="362" r="5"/>
</g>
<text x="40" y="430" class="art-script" style="font-size:30px">signal, check, then move</text>
<path d="M150 418c40-6 70-30 96-66" class="art-pen"/><path d="M236 360l10-9 2 13" class="art-pen"/>
</svg>`;
}

export function artParking() {
  // Still frame: parked neatly between the two cars. In motion: pulls up beside the front car,
  // then reverses into the gap with its reverse lights on.
  return `<svg class="art art-parking" viewBox="0 0 560 480" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false">
${SKY}
<rect x="-10" y="190" width="580" height="190" class="art-asphalt"/>
<path d="M-10 290h580" class="art-lanes art-lanes--h"/>
<rect x="-10" y="380" width="580" height="18" class="art-curb"/>
<g transform="translate(110 336)">${CAR(80, 'art-car--dark')}</g>
<g transform="translate(408 336)">${CAR(80, 'art-car--amber')}</g>
<g class="art-static" transform="translate(261 336)">${CAR(80)}</g>
<g class="art-anim"><g>
<animateMotion dur="7s" begin="indefinite" repeatCount="indefinite" rotate="auto-reverse" calcMode="spline" keyPoints="0;0;1;1" keyTimes="0;.14;.64;1" keySplines="0 0 1 1;.45 0 .3 1;0 0 1 1" path="M430 252C340 252 348 336 261 336"/>
<g><animate attributeName="opacity" dur="7s" begin="indefinite" repeatCount="indefinite" values="1;1;0;0;1" keyTimes="0;.9;.94;.97;1"/>
${CAR(80)}
<g class="art-reverse"><circle cx="-40" cy="-11" r="5"/><circle cx="-40" cy="11" r="5"/>
<animate attributeName="opacity" dur="7s" begin="indefinite" repeatCount="indefinite" values="0;0;1;1;0;0" keyTimes="0;.12;.15;.62;.66;1"/></g>
</g></g></g>
<text x="40" y="452" class="art-script" style="font-size:30px">nice and slow</text>
</svg>`;
}

export function artBeginner() {
  // Still frame: stopped at the line, brake lights on. In motion: rolls up, stops fully, goes.
  return `<svg class="art art-beginner" viewBox="0 0 560 480" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false">
${SKY}
<rect x="200" y="-10" width="160" height="500" class="art-asphalt"/>
<rect x="-10" y="120" width="580" height="130" class="art-asphalt"/>
<path d="M280-10v130M280 250v240" class="art-centre"/>
<rect x="284" y="262" width="72" height="9" class="art-stopline"/>
<g transform="translate(400 300)"><path d="M-5 0v48" class="art-post"/><path d="M-12-29h14l10 10v14L2 5h-14l-10-10v-14Z" class="art-stopsign"/><text x="-5" y="-8" text-anchor="middle" class="art-stoptext">STOP</text></g>
<g class="art-static" transform="translate(320 309) rotate(-90)">${CAR(74)}<g class="art-brake art-brake--on"><rect x="-38" y="-14" width="5" height="9" rx="2"/><rect x="-38" y="5" width="5" height="9" rx="2"/></g></g>
<g class="art-anim"><g>
<animateMotion dur="8s" begin="indefinite" repeatCount="indefinite" calcMode="spline" keyPoints="0;.3856;.3856;1" keyTimes="0;.34;.6;1" keySplines=".2 .6 .35 1;0 0 1 1;.55 0 .8 .4" path="M320 560V309V-91"/>
<g transform="rotate(-90)">
${CAR(74)}
<g class="art-brake"><rect x="-38" y="-14" width="5" height="9" rx="2"/><rect x="-38" y="5" width="5" height="9" rx="2"/>
<animate attributeName="opacity" dur="8s" begin="indefinite" repeatCount="indefinite" values="0;0;1;1;0;0" keyTimes="0;.3;.34;.6;.64;1"/></g>
</g>
</g></g>
<text x="400" y="420" text-anchor="middle" class="art-script" style="font-size:30px">full stop.</text>
</svg>`;
}

export function artNervous() {
  return `<svg class="art art-nervous" viewBox="0 0 560 480" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false">
${SKY}
<circle cx="280" cy="230" r="170" class="art-calm-ring"/>
<circle cx="280" cy="230" r="128" class="art-calm-ring art-calm-ring--2"/>
<circle cx="280" cy="230" r="96" class="art-breath"/>
<text x="280" y="226" text-anchor="middle" class="art-script art-in">breathe in</text>
<text x="280" y="226" text-anchor="middle" class="art-script art-out">breathe out</text>
<text x="280" y="258" text-anchor="middle" class="art-small">four seconds each</text>
<rect x="-10" y="420" width="580" height="70" class="art-asphalt"/>
<path d="M-10 455h580" class="art-lanes art-lanes--h"/>
<g transform="translate(150 438)">${CAR(70)}</g>
</svg>`;
}

export function artGuides() {
  const post = (x, y, glyph, d) => `<g class="art-sign" style="--d:${d}s" transform="translate(${x} ${y})"><path d="M0 0v190" class="art-post"/><g class="art-sign-board" transform="translate(-48 -96)">${signIcon(glyph).replace('<svg class="sign" viewBox="0 0 64 64" aria-hidden="true" focusable="false">', '<svg width="96" height="96" viewBox="0 0 64 64">')}</g></g>`;
  return `<svg class="art art-guides" viewBox="0 0 560 480" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false">
${SKY}
<rect x="-10" y="400" width="580" height="90" class="art-ground"/>
${post(150, 230, 'curve', 0)}${post(290, 170, 'parking', 0.6)}${post(420, 250, 'snow', 1.2)}
</svg>`;
}

export function artContact() {
  return `<svg class="art art-contact" viewBox="0 0 560 480" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false">
${SKY}
<defs><path id="contact-ring" d="M280 250m-150 0a150 150 0 1 1 300 0a150 150 0 1 1-300 0"/></defs>
<circle cx="280" cy="250" r="190" class="art-seal"/>
<g class="art-seal-ring"><text class="art-seal-text"><textPath href="#contact-ring">call or text Mrs. Akbar &#8226; 416-457-5778 &#8226; call or text Mrs. Akbar &#8226; 416-457-5778 &#8226;</textPath></text></g>
<g class="art-seal-wheel" transform="translate(280 250)"><svg x="-70" y="-70" width="140" height="140" viewBox="0 0 48 48"><use href="#i-wheel"/></svg></g>
</svg>`;
}

/* 404: a dead end, and the lesson car doing a textbook three-point turn */
export function art404() {
  return `<svg class="art art-404" viewBox="0 0 560 480" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false">
${SKY}
<defs><pattern id="p404" width="18" height="18" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="9" height="18" fill="#211e1a"/></pattern></defs>
<rect x="170" y="104" width="220" height="400" class="art-asphalt"/>
<path d="M179 104v400M381 104v400" class="art-edge"/>
<path d="M280 150v360" class="art-centre"/>
<g class="art-barrier"><path d="M196 104v-46M364 104v-46" class="art-post"/><rect x="184" y="58" width="192" height="30" rx="5" fill="#f2b53a" stroke="#211e1a" stroke-width="3"/><rect x="186" y="60" width="188" height="26" rx="4" fill="url(#p404)"/></g>
<g class="art-sign" transform="translate(462 270)"><path d="M0 0v170" class="art-post"/><g class="art-sign-board" transform="translate(-58 -116)"><svg width="116" height="116" viewBox="0 0 64 64"><rect x="13" y="13" width="38" height="38" rx="5" transform="rotate(45 32 32)" class="sign-face"/><text x="32" y="38.5" text-anchor="middle" class="sign-404">404</text></svg></g></g>
<g class="art-static" transform="translate(320 330) rotate(-90)">${CAR(80)}</g>
<g class="art-anim"><g>
<animateMotion id="tpt1" dur="2.4s" begin="indefinite;tpt4.end+0.9s" fill="freeze" rotate="auto" calcMode="spline" keyPoints="0;1" keyTimes="0;1" keySplines=".25 .1 .25 1" path="M320 560L320 212"/>
<animateMotion id="tpt2" dur="1.7s" begin="tpt1.end+0.35s" fill="freeze" rotate="auto" calcMode="spline" keyPoints="0;1" keyTimes="0;1" keySplines=".4 0 .4 1" path="M320 212Q320 158 248 150"/>
<animateMotion id="tpt3" dur="1.7s" begin="tpt2.end+0.45s" fill="freeze" rotate="auto-reverse" calcMode="spline" keyPoints="0;1" keyTimes="0;1" keySplines=".4 0 .4 1" path="M248 150Q300 152 346 122"/>
<animateMotion id="tpt4" dur="2.6s" begin="tpt3.end+0.45s" fill="freeze" rotate="auto" calcMode="spline" keyPoints="0;1" keyTimes="0;1" keySplines=".3 0 .5 1" path="M346 122Q290 172 244 262L244 580"/>
${CAR(80)}
<g class="art-reverse"><circle cx="-40" cy="-11" r="5"/><circle cx="-40" cy="11" r="5"/><animate attributeName="opacity" values="1;1" dur="1.7s" begin="tpt3.begin" fill="remove"/></g>
</g></g>
<text x="22" y="398" class="art-script" style="font-size:28px"><tspan x="22">three-point</tspan><tspan x="40" dy="30">turn!</tspan></text>
<path d="M78 362c10-34 30-62 76-92" class="art-pen"/><path d="M142 268l13-1-3 13" class="art-pen"/>
</svg>`;
}
