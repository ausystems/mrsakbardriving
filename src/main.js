/* Core interactions. No dependencies; the GSAP layer loads separately (motion.js). */
const root = document.documentElement;
const motionOK = root.classList.contains('motion');
root.classList.add('js-ready');

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ---------- Header: solid on scroll ---------- */
const header = $('#header');
let lastY = -1;
function onScroll() {
  const y = window.scrollY;
  if ((y > 24) !== (lastY > 24)) header.classList.toggle('is-scrolled', y > 24);
  lastY = y;
}
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

/* ---------- Mobile drawer ---------- */
const drawer = $('#drawer');
const toggle = $('.menu-toggle');
const panel = $('.drawer-panel', drawer);
let lastFocus = null;

function openDrawer() {
  lastFocus = document.activeElement;
  drawer.hidden = false;
  requestAnimationFrame(() => requestAnimationFrame(() => drawer.classList.add('is-open')));
  toggle.setAttribute('aria-expanded', 'true');
  root.style.overflow = 'hidden';
  setTimeout(() => $('.drawer-nav a', drawer)?.focus(), 60);
  document.addEventListener('keydown', onDrawerKey);
}
function closeDrawer({ restoreFocus = true } = {}) {
  if (drawer.hidden) return;
  drawer.classList.remove('is-open');
  toggle.setAttribute('aria-expanded', 'false');
  root.style.overflow = '';
  document.removeEventListener('keydown', onDrawerKey);
  const done = () => { drawer.hidden = true; };
  if (motionOK) setTimeout(done, 600); else done();
  if (restoreFocus) (lastFocus || toggle).focus();
}
function onDrawerKey(e) {
  if (e.key === 'Escape') { closeDrawer(); return; }
  if (e.key !== 'Tab') return;
  const items = $$('a, button', panel).filter((el) => el.offsetParent !== null);
  const first = items[0], last = items[items.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
}
toggle.addEventListener('click', () => (drawer.hidden ? openDrawer() : closeDrawer()));
$$('[data-close]', drawer).forEach((el) => el.addEventListener('click', () => closeDrawer()));
$$('.drawer-nav a', drawer).forEach((a) => a.addEventListener('click', () => closeDrawer({ restoreFocus: false })));
window.matchMedia('(min-width: 1021px)').addEventListener('change', (e) => { if (e.matches) closeDrawer({ restoreFocus: false }); });

/* ---------- Current section in the nav ---------- */
const navLinks = $$('.main-nav a').filter((a) => a.pathname === location.pathname && a.hash);
if ('IntersectionObserver' in window && navLinks.length) {
  const byId = new Map(navLinks.map((a) => [a.hash.slice(1), a]));
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((a) => a.removeAttribute('aria-current'));
      byId.get(entry.target.id)?.setAttribute('aria-current', 'true');
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  byId.forEach((_, id) => { const s = document.getElementById(id); if (s) spy.observe(s); });
  const top = document.getElementById('top');
  if (top) spy.observe(top);
}

/* ---------- Headline line-splitting (restored to plain text once revealed) ---------- */
const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
function splitLines(el) {
  const original = el.innerHTML;
  const words = el.textContent.trim().split(/\s+/);
  el.innerHTML = words.map((w) => `<span class="w">${esc(w)}</span>`).join(' ');
  const lines = [];
  let top = null;
  $$('.w', el).forEach((w) => {
    if (top === null || Math.abs(w.offsetTop - top) > 4) { lines.push([]); top = w.offsetTop; }
    lines[lines.length - 1].push(w.textContent);
  });
  el.innerHTML = lines
    .map((ws, i) => `<span class="line"><span style="--i:${i}">${ws.map(esc).join(' ')}</span></span>`)
    .join('');
  el.classList.add('is-split');
  return () => { el.innerHTML = original; };
}

/* ---------- Scroll reveals ---------- */
// Handwritten notes "write" themselves in: the clip lives on an inner span so the
// observed element itself always has a measurable box.
$$('.script[data-reveal]').forEach((el) => { el.innerHTML = `<span class="ink">${el.innerHTML}</span>`; });
const reveals = $$('[data-reveal], [data-split]');
function showAll() { reveals.forEach((el) => el.classList.add('is-in', 'is-split')); }
if (!motionOK || !('IntersectionObserver' in window)) {
  showAll();
} else {
  const io = new IntersectionObserver((entries) => {
    const entering = entries.filter((e) => e.isIntersecting).map((e) => e.target);
    entering
      .sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1))
      .forEach((el, i) => {
        io.unobserve(el);
        el.style.setProperty('--d', `${Math.min(i, 6) * 90}ms`);
        if (el.hasAttribute('data-split')) {
          const restore = splitLines(el);
          requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('is-in')));
          setTimeout(restore, 1900);
        } else {
          el.classList.add('is-in');
        }
      });
  }, { threshold: 0.14, rootMargin: '0px 0px -6% 0px' });
  reveals.forEach((el) => io.observe(el));
}

/* ---------- Reviews carousel ---------- */
$$('[data-carousel]').forEach((carousel) => {
  const track = $('.carousel-track', carousel);
  const slides = [...track.children];
  const [prev, next] = $$('.carousel-btn', carousel);
  const bar = $('.carousel-progress', carousel);
  const thumb = $('.carousel-progress__thumb', carousel);
  const behavior = motionOK ? 'smooth' : 'auto';
  const step = () => (slides[1] ? slides[1].offsetLeft - slides[0].offsetLeft : track.clientWidth);

  function update() {
    const max = track.scrollWidth - track.clientWidth;
    const frac = Math.min(1, track.clientWidth / track.scrollWidth);
    const p = max > 0 ? track.scrollLeft / max : 0;
    thumb.style.width = `${frac * 100}%`;
    thumb.style.transform = `translateX(${(p * (bar.clientWidth * (1 - frac))).toFixed(1)}px)`;
    prev.disabled = track.scrollLeft <= 4;
    next.disabled = track.scrollLeft >= max - 4;
  }
  bar.addEventListener('click', (e) => {
    const r = bar.getBoundingClientRect();
    const max = track.scrollWidth - track.clientWidth;
    track.scrollTo({ left: ((e.clientX - r.left) / r.width) * max, behavior });
  });
  let raf = 0;
  track.addEventListener('scroll', () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); }, { passive: true });
  prev.addEventListener('click', () => track.scrollBy({ left: -step(), behavior }));
  next.addEventListener('click', () => track.scrollBy({ left: step(), behavior }));
  window.addEventListener('resize', update, { passive: true });
  update();

  // Cards rise in as they slide into view, once the carousel itself is on screen
  if (motionOK && 'IntersectionObserver' in window) {
    carousel.classList.add('is-waiting');
    const inner = new IntersectionObserver((entries) => {
      entries.filter((e) => e.isIntersecting).forEach((e, i) => {
        e.target.style.setProperty('--d', `${i * 110}ms`);
        e.target.classList.add('is-seen');
        inner.unobserve(e.target);
      });
    }, { root: track, threshold: 0.04 });
    const outer = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      outer.disconnect();
      carousel.classList.remove('is-waiting');
      slides.forEach((s) => inner.observe(s));
    }, { threshold: 0.2 });
    outer.observe(carousel);
  }
});

/* ---------- Service-area map: hovering a region lights up its places ---------- */
const map = $('[data-map]');
const groups = $$('.area-group[data-areas]');
if (map && groups.length && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  const places = $$('.m-place', map);
  const light = (ids) => {
    map.classList.toggle('has-focus', !!ids);
    places.forEach((p) => p.classList.toggle('is-active', !!ids && ids.includes(p.dataset.area)));
  };
  groups.forEach((g) => {
    const ids = g.dataset.areas.split(' ');
    g.addEventListener('mouseenter', () => light(ids));
    g.addEventListener('mouseleave', () => light(null));
  });
  places.forEach((p) => {
    const group = groups.find((g) => g.dataset.areas.split(' ').includes(p.dataset.area));
    p.addEventListener('mouseenter', () => { light([p.dataset.area]); group?.classList.add('is-hot'); });
    p.addEventListener('mouseleave', () => { light(null); group?.classList.remove('is-hot'); });
  });
}

/* ---------- Mobile call bar: whenever the hero's call button is off screen, until the final call section ---------- */
const callbar = $('.callbar');
const heroCall = $('.hero-actions .btn--call, [data-callbar-hide] .btn--call');
if (callbar && heroCall && 'IntersectionObserver' in window) {
  let heroInView = true, nearEnd = false;
  const sync = () => {
    const on = !heroInView && !nearEnd;
    callbar.classList.toggle('is-visible', on);
    root.classList.toggle('callbar-on', on);
  };
  new IntersectionObserver(([e]) => { heroInView = e.isIntersecting; sync(); }, { threshold: 0.6 }).observe(heroCall);
  const endIO = new IntersectionObserver((entries) => {
    nearEnd = entries.some((e) => e.isIntersecting) || $$('#call, [data-callbar-end], .site-footer').some((el) => {
      const r = el.getBoundingClientRect(); return r.top < window.innerHeight && r.bottom > 0;
    });
    sync();
  }, { threshold: 0.08 });
  $$('#call, [data-callbar-end], .site-footer').forEach((el) => endIO.observe(el));
} else if (callbar) {
  callbar.classList.add('is-visible');
}

/* ---------- Desktop: copy the number to dial it from a phone ---------- */
$$('[data-copy]').forEach((btn) => {
  const label = $('.copy-num__label', btn);
  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(btn.dataset.copy);
      label.textContent = 'Copied';
      btn.classList.add('is-done');
      window.dataLayer?.push({ event: 'phone_number_copy' });
      setTimeout(() => { label.textContent = 'Copy number'; btn.classList.remove('is-done'); }, 2200);
    } catch { label.textContent = btn.dataset.copy; }
  });
});

/* ---------- Floating message button: text (or call) Mrs. Akbar from any screen ---------- */
const msg = $('[data-msg]');
if (msg) {
  const fab = $('.msg-fab', msg);
  const msgPanel = $('.msg-panel', msg);
  let msgTimer;
  const setOpen = (open) => {
    clearTimeout(msgTimer);
    fab.setAttribute('aria-expanded', String(open));
    if (open) {
      msgPanel.hidden = false;
      requestAnimationFrame(() => requestAnimationFrame(() => msg.classList.add('is-open')));
      setTimeout(() => $('.msg-sms', msgPanel)?.focus({ preventScroll: true }), 80);
      window.dataLayer?.push({ event: 'message_panel_open' });
    } else {
      msg.classList.remove('is-open');
      msgTimer = setTimeout(() => { msgPanel.hidden = true; }, motionOK ? 420 : 0);
    }
  };
  fab.addEventListener('click', () => setOpen(fab.getAttribute('aria-expanded') !== 'true'));
  $('.msg-close', msgPanel).addEventListener('click', () => { setOpen(false); fab.focus(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && msg.classList.contains('is-open')) { setOpen(false); fab.focus(); } });
  document.addEventListener('click', (e) => { if (msg.classList.contains('is-open') && !msg.contains(e.target)) setOpen(false); });
}

/* ---------- Call clicks (ready for analytics if it is added later) ---------- */
document.addEventListener('click', (e) => {
  const t = e.target.closest('a[href^="sms:"]');
  if (t) window.dataLayer?.push({ event: 'text_message_click', text_location: t.dataset.text || 'link' });
  const a = e.target.closest('a[href^="tel:"]');
  if (!a) return;
  const where = a.dataset.call || 'link';
  window.dataLayer?.push({ event: 'phone_call_click', call_location: where });
  document.dispatchEvent(new CustomEvent('call-click', { detail: { where } }));
});

/* ---------- FAQ: one open at a time (for browsers without <details name>) ---------- */
const faqs = $$('.faq-item');
if (faqs.length && !('name' in HTMLDetailsElement.prototype)) {
  faqs.forEach((d) => d.addEventListener('toggle', () => {
    if (d.open) faqs.forEach((o) => { if (o !== d) o.open = false; });
  }));
}

/* ---------- Footer year ---------- */
$$('[data-year]').forEach((el) => { el.textContent = String(new Date().getFullYear()); });

/* ---------- Motion layer (GSAP) loads only when motion is welcome ---------- */
if (document.body.dataset.page === 'home') {
  if (motionOK) import('./motion.js').then((m) => m.init()).catch(() => root.classList.add('revealed'));
} else {
  import('./fx.js').then((m) => m.init()).catch(() => {});
}
