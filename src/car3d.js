/* The hero's lesson car: a silver compact sedan with her white roof sign, drawn in 3D.
   A tiny painter's-algorithm renderer: flat-shaded faces, sorted far to near, projected
   orthographically. No DOM here, so the build script uses it for the static fallback too.
   Model units are centimetres: x right, y up, z forward (the car drives away from us). */

const PAINT = [198, 202, 208];
const GLASS = [36, 44, 53];
const TYRE = [24, 24, 26];
const DARK = [30, 30, 31];

// Lower body sections along the car: z, half width, sill, shoulder, top, chamfer
const ST = [
  [-222, 74, 34, 62, 84, 14],
  [-214, 84, 28, 74, 96, 12],
  [-140, 86, 24, 80, 100, 11],
  [100, 86, 24, 80, 98, 11],
  [196, 84, 26, 74, 86, 13],
  [222, 72, 32, 56, 70, 16],
];

const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const lerp = (a, b, t) => a.map((v, i) => v + (b[i] - v) * t);
const norm = (v) => { const l = Math.hypot(...v) || 1; return v.map((x) => x / l); };
const mirror = (pts) => pts.map(([x, y, z]) => [-x, y, z]).reverse();

function newell(pts) {
  const n = [0, 0, 0];
  pts.forEach((p, i) => {
    const q = pts[(i + 1) % pts.length];
    n[0] += (p[1] - q[1]) * (p[2] + q[2]);
    n[1] += (p[2] - q[2]) * (p[0] + q[0]);
    n[2] += (p[0] - q[0]) * (p[1] + q[1]);
  });
  return norm(n);
}
// bilinear point on a quad p0 p1 p2 p3 (u along p0->p1, v along p0->p3)
const bil = (q, u, v) => lerp(lerp(q[0], q[1], u), lerp(q[3], q[2], u), v);
const patch = (q, u0, u1, v0, v1) => [bil(q, u0, v0), bil(q, u1, v0), bil(q, u1, v1), bil(q, u0, v1)];
const ring = (cx, cy, z, r, n = 16) => Array.from({ length: n }, (_, i) => {
  const a = (i / n) * Math.PI * 2;
  return [cx, cy + Math.sin(a) * r, z + Math.cos(a) * r];
});

function buildModel() {
  const faces = [];
  const add = (pts, color, opts = {}) => {
    const f = { pts, color, layer: 1, decals: [], ...opts };
    faces.push(f);
    return f;
  };
  const decal = (f, pts, color, kind) => f.decals.push({ pts, color, kind });

  // undercarriage and tyres sit underneath everything else
  const under = [[-64, 13, -200], [64, 13, -200], [64, 25, -200], [-64, 25, -200]];
  add(under, DARK, { layer: 0 });
  for (const sx of [-1, 1]) {
    for (const zc of [-132, 130]) {
      const o = ring(sx * 90, 31, zc, 31, 12), i = ring(sx * 70, 31, zc, 31, 12);
      for (let k = 0; k < 12; k++) {
        const k2 = (k + 1) % 12;
        add([o[k], o[k2], i[k2], i[k]], TYRE, { layer: 0 });
      }
    }
  }

  // lower body: chamfers and top surfaces between sections
  for (let k = 0; k < ST.length - 1; k++) {
    const [z0, w0, , s0, t0, c0] = ST[k], [z1, w1, , s1, t1, c1] = ST[k + 1];
    const left = [[-w0, s0, z0], [-w1, s1, z1], [-(w1 - c1), t1, z1], [-(w0 - c0), t0, z0]];
    add(left, PAINT);
    add(mirror(left), PAINT);
    if (k !== 2) add([[-(w0 - c0), t0, z0], [-(w1 - c1), t1, z1], [w1 - c1, t1, z1], [w0 - c0, t0, z0]], PAINT);
  }
  // body sides, one face each, carrying the wheel arches, wheels and tail-light wrap
  for (const sx of [-1, 1]) {
    const pts = [...ST.map(([z, w, yb]) => [sx * w, yb, z]), ...ST.slice().reverse().map(([z, w, , ys]) => [sx * w, ys, z])];
    const side = add(sx < 0 ? pts : pts.reverse(), PAINT);
    const x = sx * 87.5;
    for (const zc of [-132, 130]) {
      const arch = [];
      for (let i = 0; i <= 12; i++) { const a = (i / 12) * Math.PI; arch.push([x, 24 + Math.sin(a) * 42, zc + Math.cos(a) * 38]); }
      decal(side, arch, [22, 22, 24]);
      decal(side, ring(x * 1.01, 31, zc, 31), TYRE);
      decal(side, ring(x * 1.02, 31, zc, 19), [168, 172, 177]);
      decal(side, ring(x * 1.03, 31, zc, 6), [70, 72, 76]);
    }
    decal(side, [[x, 62, -223], [x, 80, -219], [x, 82, -200], [x, 66, -204]], [128, 24, 20], 'tail');
  }
  // rear: bumper, tail lights, plate
  const rear = ST[0].slice(1), z = ST[0][0];
  const [w, yb, ys, yt, c] = rear;
  const back = add([[w, yb, z], [w, ys, z], [w - c, yt, z], [-(w - c), yt, z], [-w, ys, z], [-w, yb, z]], PAINT);
  const zz = z - 0.5;
  decal(back, [[-62, 34, zz], [62, 34, zz], [58, 44, zz], [-58, 44, zz]], [44, 45, 48]);
  decal(back, [[-73, 63, zz], [-37, 67, zz], [-37, 80, zz], [-61, 83, zz]], [128, 24, 20], 'tail');
  decal(back, [[73, 63, zz], [61, 83, zz], [37, 80, zz], [37, 67, zz]], [128, 24, 20], 'tail');
  decal(back, [[-17, 45, zz], [17, 45, zz], [17, 59, zz], [-17, 59, zz]], [234, 232, 224]);
  decal(back, [[-11, 50, zz], [11, 50, zz], [11, 54, zz], [-11, 54, zz]], [52, 82, 150]);
  const front = ST[5];
  add([[-front[1], front[2], front[0]], [front[1], front[2], front[0]], [front[1] - front[5], front[4], front[0]], [-(front[1] - front[5]), front[4], front[0]]], PAINT);

  // cabin
  const BR = [72, 100, -140], RR = [58, 146, -70], RF = [60, 146, 25], BF = [74, 98, 100];
  const L = (p) => [-p[0], p[1], p[2]];
  const rearQ = [L(BR), BR, RR, L(RR)];
  const rearF = add(rearQ, PAINT);
  decal(rearF, patch(rearQ, 0.13, 0.87, 0.07, 0.9), GLASS, 'glass');
  decal(rearF, patch(rearQ, 0.4, 0.6, 0.84, 0.92), [128, 24, 20], 'tail');
  add([L(RR), RR, RF, L(RF)], PAINT);
  const wsQ = [L(RF), RF, BF, L(BF)];
  const ws = add(wsQ, PAINT);
  decal(ws, patch(wsQ, 0.06, 0.94, 0.04, 0.96), GLASS, 'glass');
  for (const sx of [-1, 1]) {
    const S = (p) => [sx * p[0], p[1], p[2]];
    const q = [S(BR), S(BF), S(RF), S(RR)];
    const f = add(sx < 0 ? q : [q[0], q[3], q[2], q[1]], PAINT);
    decal(f, patch(q, 0.08, 0.47, 0.1, 0.88), GLASS, 'glass');
    decal(f, patch(q, 0.52, 0.86, 0.1, 0.88), GLASS, 'glass');
    // mirror: a small box ahead of the door glass, its glass facing back at us
    const mx0 = sx * 86, mx1 = sx * 101, my0 = 90, my1 = 103, mz0 = 64, mz1 = 78;
    const m = { side: sx };
    const mb = add([[mx0, my0, mz0], [mx1, my0, mz0], [mx1, my1, mz0], [mx0, my1, mz0]], PAINT, { layer: 3, mirror: m });
    decal(mb, [[mx0 + sx * 2, my0 + 2, mz0 - 0.4], [mx1 - sx * 2, my0 + 2, mz0 - 0.4], [mx1 - sx * 2, my1 - 2, mz0 - 0.4], [mx0 + sx * 2, my1 - 2, mz0 - 0.4]], [60, 70, 80], 'glass');
    add([[mx0, my1, mz0], [mx1, my1, mz0], [mx1, my1, mz1], [mx0, my1, mz1]], PAINT, { layer: 3, mirror: m });
    add([[mx1, my0, mz0], [mx1, my0, mz1], [mx1, my1, mz1], [mx1, my1, mz0]], PAINT, { layer: 3, mirror: m });
  }

  // roof sign: a white A-frame with her number in red on the back
  const SW = 40, sb = 146, st = 170;
  const signBack = add([[-SW, sb, -14], [SW, sb, -14], [SW, st, -2], [-SW, st, -2]], [246, 244, 238], { layer: 2 });
  for (const [u0, u1] of [[0.1, 0.32], [0.38, 0.6], [0.66, 0.9]]) {
    decal(signBack, patch(signBack.pts, u0, u1, 0.32, 0.62), [200, 53, 42]);
  }
  add([[SW, sb, 10], [-SW, sb, 10], [-SW, st, -2], [SW, st, -2]], [246, 244, 238], { layer: 2 });
  add([[SW, sb, -14], [SW, sb, 10], [SW, st, -2]], [232, 230, 224], { layer: 2 });
  add([[-SW, sb, 10], [-SW, sb, -14], [-SW, st, -2]], [232, 230, 224], { layer: 2 });

  // outward normals (the car's middle sits at y = 70)
  for (const f of faces) {
    let n = newell(f.pts);
    const cen = f.pts.reduce((a, p) => a.map((v, i) => v + p[i] / f.pts.length), [0, 0, 0]);
    const ref = f.layer === 2 ? [0, 158, -2] : f.mirror ? [f.mirror.side * 93, 96, 71] : [0, 70, 0];
    if (n[0] * (cen[0] - ref[0]) + n[1] * (cen[1] - ref[1]) + n[2] * (cen[2] - ref[2]) < 0) n = n.map((v) => -v);
    f.n = n;
    f.cen = cen;
  }
  return faces;
}

const MODEL = buildModel();
const LIGHT = norm([-0.5, 0.68, 0.52]); // low sun ahead and to the left, as in the hero scene

/**
 * yaw: radians, + turns the nose to the right. pitch: radians the camera looks down.
 * Returns { shadow: pathD, faces: [{ d, fill }] } in model units, origin on the road under the car.
 */
export function drawCar({ yaw = 0, pitch = 0.33, braking = false } = {}) {
  const cy = Math.cos(yaw), sy = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch);
  const rot = ([x, y, z]) => [x * cy + z * sy, y, -x * sy + z * cy];
  const proj = (p) => { const [x, y, z] = rot(p); return [x, -(y * cp + z * sp), z * cp - y * sp]; };
  const d2 = (pts) => pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join('') + 'Z';
  const shade = (n, color, kind) => {
    const diff = Math.max(0, n[0] * LIGHT[0] + n[1] * LIGHT[1] + n[2] * LIGHT[2]);
    let k = 0.68 + 0.4 * diff + 0.1 * Math.max(0, n[1]);
    let c = color;
    if (kind === 'tail' && braking) { c = [255, 72, 54]; k = 1; }
    if (kind === 'glass') { const sky = Math.max(0, n[1]) * 0.45 + diff * 0.15; c = lerp(color, [182, 196, 208], sky); k = 1; }
    const tint = [1.03, 1, 0.95];
    return `rgb(${c.map((v, i) => Math.round(Math.min(255, v * k * tint[i]))).join(',')})`;
  };

  const out = [[], [], [], [], []];
  const nearMirror = Math.abs(yaw) < 0.1 ? 0 : (sy > 0 ? -1 : 1);
  for (const f of MODEL) {
    const n = rot(f.n);
    const facing = n[2] * cp - n[1] * sp < -0.02; // towards the camera
    if (!facing) continue;
    const pts = f.pts.map(proj);
    const depth = rot(f.cen)[2] * cp - f.cen[1] * sp;
    let layer = f.layer;
    if (f.mirror) layer = nearMirror === 0 || f.mirror.side === nearMirror ? 4 : 0;
    out[layer].push({ depth, d: d2(pts), fill: shade(n, f.color), decals: f.decals.map((dc) => ({ d: d2(dc.pts.map(proj)), fill: shade(n, dc.color, dc.kind) })) });
  }
  const faces = [];
  for (const group of out) {
    group.sort((a, b) => b.depth - a.depth);
    for (const f of group) { faces.push({ d: f.d, fill: f.fill }); faces.push(...f.decals); }
  }
  // soft shadow: the footprint pushed back towards us and to the right, away from the sun
  const foot = [[-96, 0, -232], [96, 0, -232], [96, 0, 232], [-96, 0, 232]].map(([x, y, z]) => proj([x + 26, y, z - 40]));
  return { shadow: d2(foot), faces };
}

export const CAR_WIDTH = 172;
