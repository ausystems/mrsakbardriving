// Section components for the generated pages. Every block carries one small effect,
// styled in main.css and driven by main.js / fx.js (all of it switched off for reduced motion).
import { BIZ, REVIEWS_COUNT } from './core.mjs';
import { icon } from './layout.mjs';
import { GUIDE_LIST } from './guide-list.mjs';
import { signIcon } from './art.mjs';

const STARS = `<span class="stars" aria-hidden="true">${'<svg><use href="#i-star"/></svg>'.repeat(5)}</span>`;
export const out = (label) => `${icon('out')}<span class="visually-hidden"> (${label})</span>`;

export const callBtn = (where, label = 'Call Mrs. Akbar') =>
  `<a class="btn btn--primary btn--call" href="${BIZ.tel}" data-call="${where}">${icon('phone')}<span class="btn-call__text"><span class="btn-call__label">${label}</span> <span class="btn-call__num">${BIZ.phone}</span></span></a>`;
export const textBtn = (where, label = 'Text her') =>
  `<a class="btn btn--ghost btn--text" href="${BIZ.sms}" data-text="${where}">${icon('chat')}<span>${label}</span></a>`;

export function crumbs(trail) {
  return `<nav class="crumbs" aria-label="Breadcrumb"><ol>${trail
    .map(([label, href], i) => (i < trail.length - 1 ? `<li><a href="${href}">${label}</a></li>` : `<li><span aria-current="page">${label}</span></li>`))
    .join('')}</ol></nav>`;
}

/* Page hero: letters rise, the handwritten note writes itself, the art plays once it's in view */
export function pageHero({ trail, script, h1, lede, art, artLabel, proof = true, variant = '' }) {
  return `<section class="phero${variant ? ` phero--${variant}` : ''}" aria-labelledby="page-title">
  <div class="container phero-grid">
    <div class="phero-copy">
      ${crumbs(trail)}
      <p class="script phero-script"><span>${script}</span></p>
      <h1 class="phero-title" id="page-title" data-letters>${h1}</h1>
      <p class="phero-lede">${lede}</p>
      <div class="phero-actions" data-callbar-hide>
        ${callBtn('page-hero')}
        ${textBtn('page-hero')}
      </div>
      ${proof ? `<p class="phero-proof">${STARS}<span><strong>5.0</strong> from ${REVIEWS_COUNT} Google reviews</span><span class="phero-proof__dot" aria-hidden="true"></span><span>Lessons 7 days a week</span></p>` : ''}
    </div>
    <div class="phero-art"${artLabel ? '' : ' aria-hidden="true"'} data-play>${art}</div>
  </div>
</section>`;
}

export function sec({ id, tone = 'white', script, title, meta, body, cls = '', center = false }) {
  return `<section class="psec band band--${tone}${cls ? ` ${cls}` : ''}" id="${id}" aria-labelledby="${id}-title">
  <div class="container">
    <header class="section-head${center ? ' section-head--center' : ''}">
      <div class="section-head__title">
        ${script ? `<p class="script" data-reveal>${script}</p>` : ''}
        <h2 class="section-title" id="${id}-title" data-split>${title}</h2>
      </div>
      ${meta ? `<p class="section-head__meta" data-reveal>${meta}</p>` : ''}
    </header>
    ${body}
  </div>
</section>`;
}

/* Numbers count up when they scroll into view */
export function facts(items) {
  return `<dl class="facts">${items
    .map(
      (f) => `<div class="fact" data-reveal><dt class="fact-label">${f.label}</dt><dd class="fact-value"><span class="fact-num"${f.count != null ? ` data-count="${f.count}"` : ''}>${f.num}</span>${f.unit ? `<span class="fact-unit">${f.unit}</span>` : ''}</dd></div>`,
    )
    .join('')}</dl>`;
}

export const lead = (html) => `<p class="plead" data-reveal>${html}</p>`;
export const prose = (html) => `<div class="prose">${html}</div>`;

/* Places to practise: a lane line draws under each name */
export function spots(items) {
  return `<ol class="spots">${items
    .map((s, i) => `<li class="spot" data-reveal style="--d:${(i % 3) * 80}ms"><h3 class="spot-name"><span>${s.name}</span></h3><p>${s.note}</p></li>`)
    .join('')}</ol>`;
}

/* Route-style steps: each marker fills in as you reach it */
export function steps(items) {
  return `<ol class="steps">${items
    .map(
      (s, i) => `<li class="step" data-reveal><span class="step-mark" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span><div class="step-body"><h3 class="step-title">${s.title}</h3><p>${s.text}</p></div></li>`,
    )
    .join('')}</ol>`;
}

/* Red-pen ticks draw themselves in, one after another */
export function checks(items) {
  return `<ul class="checks">${items
    .map(
      (t, i) => `<li data-reveal style="--d:${i * 70}ms"><svg class="check-ink" viewBox="0 0 32 32" aria-hidden="true"><path d="M4 17.5c2.6 1.6 5 4 7 7.3C15 15.6 20.6 9 28 3.8"/></svg><span>${t}</span></li>`,
    )
    .join('')}</ul>`;
}

/* A real Google review, quoted word for word, linked to that exact review */
export function quote(r, note = '') {
  return `<figure class="pquote" data-reveal>
  <svg class="pquote-mark" viewBox="0 0 64 48" aria-hidden="true"><path d="M27 6C15 9 6 18 6 30c0 7 4 12 10 12s10-4 10-10-4-9-9-9c1-6 6-11 12-13ZM58 6C46 9 37 18 37 30c0 7 4 12 10 12s10-4 10-10-4-9-9-9c1-6 6-11 12-13Z"/></svg>
  ${note ? `<p class="pquote-note">${note}</p>` : ''}
  <blockquote><p>&ldquo;${r.quote}&rdquo;</p></blockquote>
  <figcaption><span class="pquote-stars">${STARS}</span><span class="pquote-name">${r.name}</span><a class="pquote-link" href="${r.url}" target="_blank" rel="noopener">Read it on Google${out(`${r.name}’s full review, opens Google Maps`)}</a></figcaption>
</figure>`;
}
export const quotes = (list) => `<div class="pquotes">${list.join('')}</div>`;

/* Claims backed by a linked review, written in red pen like the home page notes */
export function notes(items) {
  return `<ol class="notes notes--page">${items
    .map(
      (n) => `<li class="note" data-reveal><p class="note-claim">${n.claim}</p><blockquote class="note-proof"><p>&ldquo;${n.r.quote}&rdquo;</p><footer><a href="${n.r.url}" target="_blank" rel="noopener">${n.r.name}, Google review${out('opens on Google Maps')}</a></footer></blockquote></li>`,
    )
    .join('')}</ol>`;
}

/* FAQ accordion (one open at a time); answers match the FAQPage data word for word */
export function faq(items, id) {
  return `<div class="faq-list faq-list--page">${items
    .map(
      ([q, a]) => `<details class="faq-item" name="faq-${id}" data-reveal>
  <summary><span>${q}</span><span class="faq-icon" aria-hidden="true"></span></summary>
  <div class="faq-a"><p>${a}</p></div>
</details>`,
    )
    .join('\n')}</div>`;
}

/* Road-sign chips to nearby areas and related lessons */
export function chips(links) {
  return `<ul class="chips">${links
    .map(
      (l, i) => `<li data-reveal style="--d:${i * 50}ms"><a class="chip" href="${l.href}"><span class="chip-label">${l.label}</span>${l.meta ? `<span class="chip-meta">${l.meta}</span>` : ''}${icon('arrow', 'icon chip-arrow')}</a></li>`,
    )
    .join('')}</ul>`;
}

/* Guide cards: the road sign swings when you point at it */
export function guideCards(slugs, desc = {}) {
  return `<ul class="gcards">${slugs
    .map((slug, i) => {
      const g = GUIDE_LIST.find((x) => x.slug === slug);
      if (!g) throw new Error(`Unknown guide ${slug}`);
      return `<li data-reveal style="--d:${(i % 3) * 80}ms"><a class="gcard" href="/guides/${g.slug}/"><span class="gcard-sign">${signIcon(g.sign)}</span><span class="gcard-cat">${g.cat}</span><span class="gcard-title">${g.title}</span>${desc[slug] ? `<span class="gcard-desc">${desc[slug]}</span>` : ''}<span class="gcard-go">Read the guide${icon('arrow')}</span></a></li>`;
    })
    .join('')}</ul>`;
}

/* Closing call band: the number, big and quiet. No road, no car: the footer area stays still. */
export function ctaBand({ id = 'book', script = 'ready when you are', title, text }) {
  return `<section class="cta band band--dark" id="${id}" data-callbar-end aria-labelledby="${id}-title">
  <div class="container cta-inner">
    <p class="script" data-reveal>${script}</p>
    <h2 class="section-title cta-title" id="${id}-title" data-split>${title}</h2>
    <p class="cta-text" data-reveal>${text}</p>
    <a class="cta-number" href="${BIZ.tel}" data-call="cta" data-reveal><span class="visually-hidden">Call Mrs. Akbar at </span>${BIZ.phone}</a>
    <div class="cta-actions" data-reveal>
      <a class="btn btn--amber" href="${BIZ.tel}" data-call="cta-button">${icon('phone')}<span>Call Mrs. Akbar</span></a>
      <a class="btn btn--ghost-light" href="${BIZ.sms}" data-text="cta">${icon('chat')}<span>Send a text</span></a>
    </div>
  </div>
</section>`;
}

/* ---------- Guide (article) pieces ---------- */
export function toc(items, title = 'In this guide') {
  return `<nav class="toc" aria-label="${title}"><p class="toc-title">${title}</p><ol>${items
    .map(([id, label]) => `<li><a href="#${id}">${label}</a></li>`)
    .join('')}</ol></nav>`;
}
export function callout(kind, title, html) {
  const label = { tip: 'Tip', rule: 'The rule', local: 'Hamilton note', source: 'Official source' }[kind] || 'Note';
  return `<div class="callout callout--${kind}" data-reveal><p class="callout-kind">${label}</p>${title ? `<p class="callout-title">${title}</p>` : ''}${html}</div>`;
}
export function inlineCta(text) {
  return `<div class="icta" data-reveal><p>${text}</p><div class="icta-actions">${callBtn('guide-inline')}${textBtn('guide-inline')}</div></div>`;
}
export function sources(links) {
  return `<div class="sources" data-reveal><p class="sources-title">Sources</p><ul>${links
    .map(([label, href]) => `<li><a href="${href}" target="_blank" rel="noopener">${label}${out('opens in a new tab')}</a></li>`)
    .join('')}</ul></div>`;
}
