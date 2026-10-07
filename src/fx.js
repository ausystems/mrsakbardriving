/* Effects for lesson, area, guide and contact pages. Loaded after first paint by main.js.
   Art only plays while it is on screen, and nothing moves for visitors who asked for reduced motion. */
const root = document.documentElement;
const motionOK = root.classList.contains('motion');
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

export function init() {
  playWhenVisible();
  countUp();
  readingRoad();
  tocSpy();
}

/* ---------- Illustrations, mini-maps and the call band play while visible ---------- */
function playWhenVisible() {
  const items = $$('[data-play]');
  if (!items.length || !motionOK || !('IntersectionObserver' in window)) return;
  const started = new WeakSet();
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      const el = e.target;
      el.classList.toggle('is-playing', e.isIntersecting);
      const svgs = $$('svg', el).filter((s) => typeof s.pauseAnimations === 'function' && s.querySelector('animate, animateMotion, animateTransform'));
      if (e.isIntersecting) {
        if (!started.has(el)) {
          started.add(el);
          // SMIL waits for begin="indefinite"; start every animation in this piece together
          svgs.forEach((svg) => $$('animate, animateMotion, animateTransform', svg)
            .filter((a) => (a.getAttribute('begin') || '').includes('indefinite'))
            .forEach((a) => a.beginElement?.()));
        }
        svgs.forEach((svg) => svg.unpauseAnimations());
      } else {
        svgs.forEach((svg) => svg.pauseAnimations());
      }
    });
  }, { threshold: 0.25 });
  items.forEach((el) => io.observe(el));
}

/* ---------- Big numbers count up the first time they appear ---------- */
function countUp() {
  const nums = $$('[data-count]');
  if (!nums.length || !motionOK || !('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver((entries) => {
    entries.filter((e) => e.isIntersecting).forEach((e) => {
      io.unobserve(e.target);
      const el = e.target;
      const end = parseFloat(el.dataset.count);
      if (!Number.isFinite(end)) return;
      const decimals = (el.dataset.count.split('.')[1] || '').length;
      const t0 = performance.now(), dur = 1100 + Math.min(900, end * 12);
      const tick = (now) => {
        const p = Math.min(1, (now - t0) / dur);
        const v = end * (1 - Math.pow(1 - p, 4));
        el.textContent = v.toFixed(decimals);
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = el.dataset.count;
      };
      el.textContent = (0).toFixed(decimals);
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.6 });
  nums.forEach((n) => io.observe(n));
}

/* ---------- Guides: a little road across the top fills as you read ---------- */
function readingRoad() {
  const road = document.querySelector('.read-road');
  const body = document.querySelector('.article-body');
  if (!road || !body) return;
  let raf = 0;
  const update = () => {
    raf = 0;
    const r = body.getBoundingClientRect();
    const total = r.height - window.innerHeight * 0.6;
    const p = Math.min(1, Math.max(0, (-r.top + window.innerHeight * 0.2) / Math.max(1, total)));
    road.style.setProperty('--p', p.toFixed(4));
  };
  window.addEventListener('scroll', () => { if (!raf) raf = requestAnimationFrame(update); }, { passive: true });
  window.addEventListener('resize', update, { passive: true });
  update();
}

/* ---------- Guides: the table of contents follows along ---------- */
function tocSpy() {
  const links = $$('.toc a');
  if (!links.length || !('IntersectionObserver' in window)) return;
  const byId = new Map(links.map((a) => [a.getAttribute('href').slice(1), a]));
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      links.forEach((a) => a.removeAttribute('aria-current'));
      byId.get(e.target.id)?.setAttribute('aria-current', 'true');
    });
  }, { rootMargin: '-30% 0px -60% 0px' });
  byId.forEach((_, id) => { const s = document.getElementById(id); if (s) io.observe(s); });
}
