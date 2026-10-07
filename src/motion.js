/* Motion layer: loaded only when the visitor has not asked for reduced motion.
   Signature: the car that drives up the Mountain to Mount Hope (hero),
   then follows the route from first lesson to full G licence (lessons). */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import roadSamples from './generated/hero-road.json';
import { drawCar, CAR_WIDTH } from './car3d.js';

gsap.registerPlugin(ScrollTrigger);

const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

export function init() {
  keepHashTarget();
  heroDrive();
  heroParallax();
  sealSteering();
  routeJourney();
  mapRipples();
  document.documentElement.classList.add('motion-ready');
  // Fonts and images can shift layout slightly; measure again once everything settles.
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
  window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
}

/* ---------- Arriving at a link like /#faq: ScrollTrigger measures the page from the top while it
   sets up, which would drop the visitor at the top. Put them back at the section they asked for,
   unless they've already started scrolling themselves. ---------- */
function keepHashTarget() {
  const id = decodeURIComponent(location.hash.slice(1));
  const target = id && document.getElementById(id);
  if (!target) return;
  let done = false;
  const stop = () => { done = true; };
  ['wheel', 'touchstart', 'keydown', 'pointerdown'].forEach((ev) => window.addEventListener(ev, stop, { once: true, passive: true }));
  setTimeout(stop, 5000);
  const goTo = () => { if (!done) target.scrollIntoView({ behavior: 'instant', block: 'start' }); };
  ScrollTrigger.addEventListener('refresh', goTo);
  requestAnimationFrame(goTo);
}

/* ---------- Hero: the car drives in, then climbs toward "your place" as you scroll ---------- */
function heroDrive() {
  const car = $('#hero-car');
  const dashes = $$('.hs-dash');
  if (!car || !roadSamples.length) return;

  const n = roadSamples.length - 1;
  const at = (t) => {
    const f = clamp(t, 0, 1) * n;
    const i = Math.min(n - 1, Math.floor(f));
    const k = f - i;
    const a = roadSamples[i], b = roadSamples[i + 1];
    return a.map((v, j) => v + (b[j] - v) * k);
  };
  // The car is redrawn in 3D as the road turns; a pool of paths keeps DOM churn low.
  const shadowEl = $('.hc-shadow', car);
  const pool = $$('path:not(.hc-shadow)', car);
  const ns = 'http://www.w3.org/2000/svg';
  while (pool.length < 130) { const p = document.createElementNS(ns, 'path'); car.appendChild(p); pool.push(p); }
  let lastKey = '', lastT = null, lastTime = 0, braking = false, brakeUntil = 0;
  const place = (t) => {
    const [x, y, ang, w, nx, ny] = at(t);
    const lane = w * 0.24; // keep right: Ontario drives on the right
    const s = (0.4 * w) / CAR_WIDTH;
    const a = (ang * Math.PI) / 180;
    // Angles are snapped to small steps: at this size a 1.5 degree change is invisible,
    // and skipping redraws keeps scrolling smooth on slower phones.
    const yaw = Math.round(clamp(Math.atan2(Math.cos(a) * 0.5, -Math.sin(a)), -1.4, 1.4) / 0.026) * 0.026;
    const pitch = Math.round((9 + 13 * clamp((y - 200) / 320, 0, 1)) / 1.5) * 1.5 * (Math.PI / 180);
    car.setAttribute('transform', `translate(${(x + nx * lane).toFixed(2)} ${(y + ny * lane).toFixed(2)}) scale(${s.toFixed(4)})`);
    // brake lights while the car slows to a stop
    const now = performance.now();
    if (lastT !== null) {
      const v = (t - lastT) / Math.max(8, now - lastTime);
      if (v >= 0 && v < 0.00006) brakeUntil = now + 300;
    }
    lastT = t; lastTime = now;
    braking = now < brakeUntil;
    const key = `${yaw.toFixed(3)}|${pitch.toFixed(3)}|${braking}`;
    if (key === lastKey) return;
    lastKey = key;
    const { shadow, faces } = drawCar({ yaw, pitch, braking });
    shadowEl?.setAttribute('d', shadow);
    pool.forEach((p, i) => {
      const f = faces[i];
      if (f) { p.setAttribute('d', f.d); p.setAttribute('fill', f.fill); } else if (p.hasAttribute('d')) p.removeAttribute('d');
    });
  };

  const trip = { t: 0 };
  place(trip.t);
  gsap.set(car, { opacity: 0 });
  gsap.set(dashes, { opacity: 0 });

  const intro = gsap.timeline({ delay: 0.55 });
  intro
    .to(dashes, { opacity: 1, duration: 0.3, ease: 'none', stagger: 0.03 })
    .to(car, { opacity: 1, duration: 0.5 }, 0.35)
    .to(trip, { t: 0.4, duration: 3, ease: 'power2.inOut', onUpdate: () => place(trip.t), onComplete: () => setTimeout(() => place(trip.t), 340) }, 0.3);

  // After the intro, scrolling through the hero carries the car the rest of the way up.
  ScrollTrigger.create({
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    onUpdate(self) {
      if (self.progress > 0.002 && intro.isActive()) intro.progress(1);
      const target = 0.4 + self.progress * 0.57;
      gsap.to(trip, { t: target, duration: 0.7, ease: 'power3.out', overwrite: true, onUpdate: () => place(trip.t) });
    },
  });
}

function heroParallax() {
  const mm = gsap.matchMedia();
  mm.add('(min-width: 901px)', () => {
    gsap.to('.hero-arch', {
      yPercent: -5,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
    });
    gsap.to('.hero-title', {
      yPercent: -8,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
    });
  });
}

/* ---------- The call seal's wheel steers with your scrolling ---------- */
function sealSteering() {
  const wheel = $('.call-seal__wheel');
  if (!wheel) return;
  const turn = gsap.quickTo(wheel, 'rotation', { duration: 0.9, ease: 'power3.out' });
  let settle;
  ScrollTrigger.create({
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    onUpdate(self) {
      turn(clamp(self.getVelocity() / 14, -80, 80));
      clearTimeout(settle);
      settle = setTimeout(() => turn(0), 140);
    },
  });
}

/* ---------- Lessons: the lesson car drives the route from 01 to G as you scroll ----------
   It keeps right, pulls up before each stop with its brake lights on, signals the way
   it is about to turn, then pulls away. Scroll back up and it reverses. */
function routeJourney() {
  const route = $('[data-route]');
  if (!route) return;
  const road = $('.route-road', route);
  const svg = $('.route-svg', route);
  const car = $('.route-car', route);
  const stops = $$('.stop', route);
  const lit = $('.route-lit', route);
  const litSvg = $('.route-lit-svg', route);
  const layers = [...$$('path', svg), ...$$('path', litSvg)];
  const shadow = $('.rc-shadow', car);
  const wheels = $$('.rc-tyre--fl, .rc-tyre--fr', car);
  let tween, idle = () => {};

  // Car state classes change only when the state does
  const state = {};
  const setState = (cls, on) => { if (state[cls] !== on) { state[cls] = on; car.classList.toggle(cls, on); } };

  function build() {
    const box = road.getBoundingClientRect();
    const w = box.width, h = box.height;
    if (!w || !h) return;
    const cx = w / 2;
    const roadW = parseFloat(getComputedStyle($('.route-asphalt', svg)).strokeWidth) || 86;
    const carW = parseFloat(getComputedStyle(car).width) || 96;
    const unit = carW / 250; // css px per car-drawing unit
    const carHalf = 100 * unit;
    const lane = roadW * 0.24; // keep right: Ontario drives on the right
    const amp = clamp((w - roadW) / 2 - 2, 4, 36); // the bends stay inside the road column
    const ys = stops.map((s) => {
      const m = $('.stop-marker', s).getBoundingClientRect();
      return m.top + m.height / 2 - box.top;
    });
    const markerR = $('.stop-marker', stops[0]).offsetWidth / 2;
    const startY = roadW / 2; // the road begins at the top of its own row, below the heading
    let d = `M${cx} ${startY}L${cx} ${ys[0]}`;
    const bend = [0];
    for (let i = 1; i < ys.length; i++) {
      const y0 = ys[i - 1], y1 = ys[i], dy = y1 - y0;
      const dir = i % 2 ? 1 : -1;
      bend.push(dir);
      d += `C${cx + amp * dir} ${y0 + dy * 0.3} ${cx + amp * dir} ${y0 + dy * 0.7} ${cx} ${y1}`;
    }
    svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
    litSvg.setAttribute('viewBox', `0 0 ${w} ${h}`);
    layers.forEach((p) => p.setAttribute('d', d));
    route.classList.add('is-drawn');

    // Sample the centre line once; y only ever increases along it
    const centre = $('.route-centre', svg);
    const total = centre.getTotalLength();
    const S = [];
    for (let l = 0; l <= total; l += 3) { const pt = centre.getPointAtLength(l); S.push([l, pt.x, pt.y]); }
    const last = centre.getPointAtLength(total); S.push([total, last.x, last.y]);
    const lenAtY = (y) => {
      let lo = 0, hi = S.length - 1;
      if (y <= S[0][2]) return 0;
      if (y >= S[hi][2]) return total;
      while (hi - lo > 1) { const m = (lo + hi) >> 1; if (S[m][2] < y) lo = m; else hi = m; }
      const k = (y - S[lo][2]) / (S[hi][2] - S[lo][2] || 1);
      return S[lo][0] + (S[hi][0] - S[lo][0]) * k;
    };
    const pose = (len) => {
      const L = clamp(len, 0, total);
      const i = Math.min(S.length - 2, Math.floor(L / 3));
      const a = S[i], b = S[i + 1];
      const k = (L - a[0]) / (b[0] - a[0] || 1);
      const x = a[1] + (b[1] - a[1]) * k, y = a[2] + (b[2] - a[2]) * k;
      const tl = Math.hypot(b[1] - a[1], b[2] - a[2]) || 1;
      return { x, y, tx: (b[1] - a[1]) / tl, ty: (b[2] - a[2]) / tl };
    };
    const heading = (len) => { const p = pose(len); return Math.atan2(p.ty, p.tx); };

    // Where the car waits for each stop: just before the marker
    const stopY = ys.map((y) => y - markerR - carHalf - 8);
    const stopLen = stopY.map(lenAtY);
    const firstY = startY + carHalf;
    // Line keys: the car reaches stop i as marker i crosses the 62% line
    const keys = [[ys[0] - 320, firstY], ...ys.map((y, i) => [y, stopY[i]])];
    const DWELL = 0.14;
    const ease = (t) => {
      const s = clamp((t - DWELL) / (1 - DWELL * 2), 0, 1);
      return 0.5 - 0.5 * Math.cos(Math.PI * s);
    };
    const carYAt = (line) => {
      if (line <= keys[0][0]) return keys[0][1];
      for (let i = 1; i < keys.length; i++) {
        const [l0, c0] = keys[i - 1], [l1, c1] = keys[i];
        if (line <= l1) return c0 + (c1 - c0) * ease((line - l0) / (l1 - l0));
      }
      return keys[keys.length - 1][1];
    };

    let prevLen = null, prevT = 0, speed = 0, brakeUntil = 0, revUntil = 0, passed = -1;
    const setCar = (line) => {
      const len = lenAtY(carYAt(line));
      const p = pose(len);
      const nx = -p.ty, ny = p.tx; // right-hand side of the direction of travel
      const x = p.x + nx * lane, y = p.y + ny * lane;
      const ang = Math.atan2(p.ty, p.tx);
      gsap.set(car, { x, y, rotation: (ang * 180) / Math.PI });
      const litY = clamp(p.y, 0, h);
      lit.style.transform = `translate3d(0, ${(litY - h).toFixed(1)}px, 0)`;
      litSvg.style.transform = `translate3d(0, ${(h - litY).toFixed(1)}px, 0)`;

      // shadow falls the same way on screen however the car is turned
      const c = Math.cos(-ang), s = Math.sin(-ang), sx = 3 / unit, sy = 7 / unit;
      shadow?.setAttribute('transform', `translate(${(sx * c - sy * s).toFixed(1)} ${(sx * s + sy * c).toFixed(1)})`);

      // front wheels follow the bend just ahead
      let turn = heading(len + 24) - heading(len - 4);
      turn = Math.atan2(Math.sin(turn), Math.cos(turn));
      const steer = clamp((turn * 180) / Math.PI * 1.6, -30, 30).toFixed(1);
      wheels.forEach((wh) => wh.setAttribute('transform', `rotate(${steer} 62 ${wh.classList.contains('rc-tyre--fl') ? -43 : 43})`));

      // lights: brake when slowing or stopped, reverse lights when backing up
      const now = performance.now();
      if (prevLen !== null) {
        const dt = Math.max(8, now - prevT);
        const v = (len - prevLen) / dt;
        const slowing = v > 0 && v < speed * 0.8;
        speed = speed * 0.6 + v * 0.4;
        if (v < -0.004) revUntil = now + 300;
        if (slowing || Math.abs(v) < 0.02) brakeUntil = now + 260;
      }
      prevLen = len; prevT = now;
      const reversing = now < revUntil;
      setState('is-reversing', reversing);
      setState('is-braking', !reversing && now < brakeUntil);

      // signal at a stop for the bend that follows it, and while pulling away
      let sig = 0;
      for (let i = 0; i < stopLen.length - 1; i++) {
        if (len > stopLen[i] - 40 && len < stopLen[i] + 70) { sig = bend[i + 1]; break; }
      }
      // bending toward screen-right while heading down the page is a left turn
      setState('signal-l', sig === 1);
      setState('signal-r', sig === -1);

      // stops light up as the car reaches them
      let k = -1;
      stopLen.forEach((sl, i) => { if (len >= sl - 3) k = i; });
      if (k !== passed) {
        passed = k;
        stops.forEach((st, i) => { st.classList.toggle('is-passed', i <= k); st.classList.toggle('is-current', i === k); });
      }
    };

    tween?.kill();
    const trip = { p: 0 };
    setCar(0);
    tween = gsap.to(trip, {
      p: 1,
      ease: 'none',
      onUpdate: () => setCar(trip.p * h),
      scrollTrigger: { trigger: route, start: 'top 62%', end: 'bottom 62%', scrub: 0.9 },
    });
    // once scrolling stops, the car settles and its lights catch up
    gsap.ticker.remove(idle);
    idle = () => { if (tween.scrollTrigger?.isActive && performance.now() - prevT > 120) setCar(trip.p * h); };
    gsap.ticker.add(idle);
  }

  build();
  ScrollTrigger.addEventListener('refreshInit', () => { route.classList.remove('is-drawn'); });
  ScrollTrigger.addEventListener('refresh', () => { if (!route.classList.contains('is-drawn')) build(); });
  let rt;
  new ResizeObserver(() => { clearTimeout(rt); rt = setTimeout(() => ScrollTrigger.refresh(), 200); }).observe($('.route-stops', route));
}

/* ---------- Map: distance rings ripple out from Mount Hope, places settle in by distance ---------- */
function mapRipples() {
  const map = $('[data-map]');
  if (!map) return;
  const rings = $$('.m-ring, .m-cover', map);
  const places = $$('.m-place', map);
  const home = $('.m-home-halo', map);
  if (!rings.length || !home) return;
  const hx = +home.getAttribute('cx'), hy = +home.getAttribute('cy');
  const dist = (p) => {
    const c = $('.m-dot', p);
    return Math.hypot(+c.getAttribute('cx') - hx, +c.getAttribute('cy') - hy);
  };
  gsap.set(rings, { scale: 0.001, svgOrigin: `${hx} ${hy}` });
  gsap.set(places, { opacity: 0 });
  const circle = $('.m-home-circle', map);
  const len = circle?.getTotalLength?.() || 0;
  if (circle) gsap.set(circle, { strokeDasharray: len, strokeDashoffset: len });

  ScrollTrigger.create({
    trigger: map,
    start: 'top 72%',
    once: true,
    onEnter() {
      const tl = gsap.timeline();
      if (circle) tl.to(circle, { strokeDashoffset: 0, duration: 0.9, ease: 'power2.inOut' }, 0);
      tl.to(rings.slice().reverse(), { scale: 1, duration: 1.6, ease: 'expo.out', stagger: 0.16 }, 0.1);
      // clearProps hands opacity back to the stylesheet so hover dimming still works
      tl.to(places, { opacity: 1, duration: 0.6, ease: 'power2.out', stagger: (i, el) => dist(el) / 900, clearProps: 'opacity' }, 0.35);
    },
  });
}
