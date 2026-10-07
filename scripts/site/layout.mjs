// The page shell shared by every page: head, header, mobile menu, footer, floating buttons.
// The home page includes the same pieces as partials, so navigation never drifts apart.
import { BIZ, SITE, SERVICES, AREAS, SERVICE_AREAS, esc, abs, plain } from './core.mjs';
import { GUIDE_LIST } from './guide-list.mjs';

const icon = (id, cls = 'icon') => `<svg class="${cls}" aria-hidden="true"><use href="#i-${id}"/></svg>`;
export { icon };

export const SPRITE = `<svg class="sprite" aria-hidden="true" focusable="false">
  <symbol id="i-phone" viewBox="0 0 24 24"><path d="M6.7 3.6h2.4c.4 0 .8.3.9.7l1 3.5c.1.4 0 .8-.3 1l-1.6 1.2a12 12 0 0 0 4.9 4.9l1.2-1.6c.3-.3.7-.4 1-.3l3.5 1c.4.1.7.5.7.9v2.4c0 1.1-.9 2-2 2A16.6 16.6 0 0 1 4.7 5.6c0-1.1.9-2 2-2Z"/></symbol>
  <symbol id="i-arrow" viewBox="0 0 24 24"><path d="M5 12h13M13 6.5 18.5 12 13 17.5"/></symbol>
  <symbol id="i-out" viewBox="0 0 24 24"><path d="M9 5h10v10M19 5 6 18"/></symbol>
  <symbol id="i-star" viewBox="0 0 24 24"><path d="m12 2.8 2.8 5.8 6.3.9-4.6 4.4 1.1 6.3L12 17.2l-5.6 3 1.1-6.3-4.6-4.4 6.3-.9Z"/></symbol>
  <symbol id="i-check" viewBox="0 0 24 24"><path d="M12 2.6 14.3 4l2.7-.1 1.1 2.5 2.3 1.4-.4 2.7L21.3 13l-1.6 2.2.1 2.7-2.6.9-1.5 2.3-2.6-.6L12 21.4l-1.9-1.5-2.6.6-1.5-2.3-2.6-.9.1-2.7L2.7 13l1.3-2.3-.4-2.7L5.9 6.6 7 4l2.7.1Z"/><path d="m8.4 12.2 2.4 2.4 4.9-5"/></symbol>
  <symbol id="i-chev-l" viewBox="0 0 24 24"><path d="M14.5 6 8.5 12l6 6"/></symbol>
  <symbol id="i-chev-r" viewBox="0 0 24 24"><path d="M9.5 6l6 6-6 6"/></symbol>
  <symbol id="i-pin" viewBox="0 0 24 24"><path d="M12 21s-6.8-5.4-6.8-11a6.8 6.8 0 0 1 13.6 0c0 5.6-6.8 11-6.8 11Z"/><circle cx="12" cy="10" r="2.4"/></symbol>
  <symbol id="i-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.6"/><path d="M12 7.4V12l3.2 2"/></symbol>
  <symbol id="i-chat" viewBox="0 0 24 24"><path d="M4.6 6.6A2.6 2.6 0 0 1 7.2 4h9.6a2.6 2.6 0 0 1 2.6 2.6v6.8a2.6 2.6 0 0 1-2.6 2.6H11.2l-4.4 3.6V16h.4a2.6 2.6 0 0 1-2.6-2.6Z"/></symbol>
  <symbol id="i-close" viewBox="0 0 24 24"><path d="M6.5 6.5 17.5 17.5M17.5 6.5 6.5 17.5"/></symbol>
  <linearGradient id="g-car" x1="0" y1="-13" x2="0" y2="13" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#868c94"/><stop offset=".28" stop-color="#d3d6da"/><stop offset=".5" stop-color="#f1f2f4"/><stop offset=".72" stop-color="#d3d6da"/><stop offset="1" stop-color="#868c94"/></linearGradient>
  <symbol id="i-car" viewBox="-32 -16 64 32"><ellipse cx="2" cy="3.5" rx="29.5" ry="12" fill="#1a1612" opacity=".24"/><rect x="-29" y="-13" width="58" height="26" rx="10" style="fill:var(--car-body,url(#g-car))"/><path d="M9.5-11c3.3 7 3.3 15 0 22L2.8 9.6c1.4-6.3 1.4-12.9 0-19.2Z" fill="#27313b"/><path d="M-14.5-10-20-11.6c-2.2 7.6-2.2 15.6 0 23.2l5.5-1.6c-1.3-6.6-1.3-13.4 0-20Z" fill="#27313b"/><g style="display:var(--car-sign,inline)"><rect x="-7" y="-7.5" width="5.4" height="15" rx="1.3" fill="#fcfbf8" stroke="#8f8a80" stroke-width=".5"/><path d="M-4.3-5.5v11" stroke="#c8352a" stroke-width="1.5" stroke-dasharray="1.6 1"/></g><rect x="25.5" y="-10" width="3.2" height="5" rx="1.5" fill="#fff4cf"/><rect x="25.5" y="5" width="3.2" height="5" rx="1.5" fill="#fff4cf"/><rect x="-29.6" y="-10" width="2.4" height="5" rx="1" fill="#c2342a"/><rect x="-29.6" y="5" width="2.4" height="5" rx="1" fill="#c2342a"/></symbol>
  <symbol id="i-wheel" viewBox="0 0 48 48"><circle cx="24" cy="24" r="19"/><circle cx="24" cy="24" r="5.2"/><path d="M5.6 20.6c6.2-2.4 12.2-3.4 18.4-3.4s12.2 1 18.4 3.4M20.4 28.4 13 41.2M27.6 28.4 35 41.2"/></symbol>
</svg>`;

const LOGO = '<!--#include file="src/partials/logo-mark.svg"-->';
const brand = (href, extra = '') => `<a class="brand${extra}" href="${href}">
      ${LOGO}
      <span class="brand-text"><span class="brand-name">Mrs. Akbar</span> <span class="brand-sub">Driving Instructor</span></span>
    </a>`;

const NAV_AFTER = [
  ['/#areas', 'Areas'],
  ['/#reviews', 'Reviews'],
  ['/guides/', 'Guides'],
  ['/#faq', 'FAQ'],
];
const lessonHref = (s) => `/${s.slug}/`;

// Lessons dropdown: a disclosure button (main.js opens it on click, keyboard or hover) over a panel
// listing every lesson page, with a call button for anyone who isn't sure which one they need.
function lessonsMenu(current, idPrefix) {
  const onLesson = SERVICES.some((s) => lessonHref(s) === current);
  return `<div class="nav-drop" data-drop>
        <button class="nav-drop__btn${onLesson ? ' is-current' : ''}" type="button" aria-expanded="false" aria-controls="${idPrefix}-lessons">Lessons${icon('chev-r', 'icon nav-drop__chev')}</button>
        <div class="nav-drop__panel" id="${idPrefix}-lessons">
          <ul class="nav-drop__list">
            ${SERVICES.map((s) => `<li><a href="${lessonHref(s)}"${lessonHref(s) === current ? ' aria-current="page"' : ''}><span class="nav-drop__title">${s.label}</span><span class="nav-drop__desc">${s.blurb}</span></a></li>`).join('\n            ')}
          </ul>
          <div class="nav-drop__foot">
            <a class="nav-drop__all" href="/#lessons">All lessons${icon('arrow')}</a>
            <a class="btn btn--amber nav-drop__call" href="${BIZ.tel}" data-call="nav-lessons">${icon('phone')}<span>Not sure? Call</span></a>
          </div>
        </div>
      </div>`;
}

export function header({ home = false, current = '' } = {}) {
  const isCurrent = (href) => current && !href.includes('#') && (href === current || (href !== '/' && current.startsWith(href)));
  const link = ([href, label]) => `<a href="${href}"${isCurrent(href) ? ` aria-current="${href === current ? 'page' : 'true'}"` : ''}>${label}</a>`;
  return `<header class="site-header" id="header">
  <div class="container header-inner">
    ${brand(home ? '#top' : '/')}
    <nav class="main-nav" aria-label="Main">
      <a href="${home ? '/#top' : '/'}"${current === '/' ? ' aria-current="page"' : ''}>Home</a>
      ${lessonsMenu(current, 'nav')}
      ${NAV_AFTER.map(link).join('\n      ')}
    </nav>
    <div class="header-actions">
      <a class="btn btn--dark btn--header" href="${BIZ.tel}" data-call="header">
        <span class="visually-hidden">Call Mrs. Akbar, </span>
        ${icon('phone')}
        <span class="btn-label">${BIZ.phone}</span>
      </a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="drawer">
        <span class="visually-hidden">Menu</span>
        <span class="menu-toggle__bars" aria-hidden="true"><span></span><span></span></span>
      </button>
    </div>
  </div>
</header>`;
}

export function drawer() {
  return `<div class="drawer" id="drawer" hidden>
  <div class="drawer-scrim" data-close></div>
  <div class="drawer-panel" role="dialog" aria-modal="true" aria-label="Menu">
    <button class="drawer-close" type="button" data-close aria-label="Close menu"><span aria-hidden="true"></span></button>
    <nav class="drawer-nav" aria-label="Menu">
      <a href="/">Home</a>
      <a href="/#meet">About</a>
      <div class="drawer-group">
        <button class="drawer-group__btn" type="button" aria-expanded="false" aria-controls="drawer-lessons">Lessons<span class="drawer-group__plus" aria-hidden="true"></span></button>
        <ul class="drawer-group__list" id="drawer-lessons" hidden>
          ${SERVICES.map((s) => `<li><a href="${lessonHref(s)}">${s.label}</a></li>`).join('\n          ')}
          <li><a href="/#lessons">All lessons</a></li>
        </ul>
      </div>
      ${[...NAV_AFTER, ['/contact/', 'Contact']].map(([href, label]) => `<a href="${href}">${label}</a>`).join('\n      ')}
    </nav>
    <div class="drawer-foot">
      <a class="btn btn--primary btn--block" href="${BIZ.tel}" data-call="drawer">
        ${icon('phone')}
        <span>Call ${BIZ.phone}</span>
      </a>
      <p>Lessons 7 days a week, by appointment.</p>
    </div>
  </div>
</div>`;
}

export function footer({ home = false } = {}) {
  const li = (href, label) => `<li><a href="${href}">${label}</a></li>`;
  const ext = (href, label) => `<li><a href="${href}" target="_blank" rel="noopener">${label}<span class="visually-hidden"> (opens in a new tab)</span></a></li>`;
  return `<footer class="site-footer band band--dark">
  <div class="container footer-grid">
    <div class="footer-brand">
      ${brand(home ? '#top' : '/', ' brand--light')}
      <p class="footer-about">Driving lessons all over Hamilton. She comes to you.</p>
      <address class="footer-nap">
        <a class="footer-phone" href="${BIZ.tel}" data-call="footer">${BIZ.phone}</a>
        <span>${BIZ.name}</span>
        <span>Lessons start where you are, anywhere in Hamilton</span>
        <span>Open 7 days, by appointment</span>
      </address>
    </div>
    <nav class="footer-col" aria-label="Lessons">
      <p class="footer-title">Lessons</p>
      <ul>
        ${SERVICES.map((s) => li(`/${s.slug}/`, s.label)).join('\n        ')}
      </ul>
    </nav>
    <nav class="footer-col footer-col--areas" aria-label="Areas">
      <p class="footer-title">Areas</p>
      <ul class="footer-areas">
        ${AREAS.map((a) => li(`/${a.slug}/`, a.label)).join('\n        ')}
      </ul>
    </nav>
    <nav class="footer-col" aria-label="Guides">
      <p class="footer-title">Guides</p>
      <ul>
        ${GUIDE_LIST.filter((g) => g.footer).map((g) => li(`/guides/${g.slug}/`, g.short)).join('\n        ')}
        ${li('/guides/', 'All guides')}
      </ul>
    </nav>
    <div class="footer-col">
      <p class="footer-title">On Google</p>
      <ul>
        ${ext(BIZ.gbp, 'Hamilton reviews')}
        ${ext(BIZ.gbpBrampton, 'Brampton reviews')}
        ${li('/contact/', 'Contact')}
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <div class="container footer-bottom__inner">
      <p>&copy; <span data-year>2026</span> ${BIZ.name}</p>
      <p class="footer-legal"><a href="/privacy-policy/">Privacy Policy</a><a href="/terms-and-conditions/">Terms and Conditions</a></p>
      <p>Hamilton, Ontario</p>
    </div>
  </div>
</footer>`;
}

export function floating() {
  return `<div class="msg" data-msg>
  <div class="msg-panel" id="msg-panel" role="dialog" aria-labelledby="msg-title" hidden>
    <button class="msg-close" type="button" aria-label="Close">${icon('close')}</button>
    <p class="msg-title" id="msg-title">Text Mrs. Akbar</p>
    <p class="msg-sub">Say hi, then tell her your licence and where you live.</p>
    <a class="btn btn--primary btn--block msg-sms" href="${BIZ.sms}" data-text="panel">
      ${icon('chat')}<span>Text ${BIZ.phone}</span>
    </a>
    <div class="msg-qr">
      <!--#include file="src/partials/msg-qr.svg"-->
      <p>On a computer? Scan this with your phone and the text is ready to send.</p>
    </div>
    <a class="msg-call" href="${BIZ.tel}" data-call="msg">Or call her</a>
  </div>
  <button class="msg-fab" type="button" aria-expanded="false" aria-controls="msg-panel">
    <span class="msg-fab__icon" aria-hidden="true"><svg class="icon"><use href="#i-chat"/></svg><span class="msg-dots"><i></i><i></i><i></i></span></span>
    <svg class="icon msg-fab__x" aria-hidden="true"><use href="#i-close"/></svg>
    <span class="visually-hidden">Message Mrs. Akbar</span>
  </button>
</div>

<aside class="callbar-wrap" aria-label="Quick call">
<a class="callbar" href="${BIZ.tel}" data-call="callbar">
  <span class="callbar__icon" aria-hidden="true"><svg class="icon"><use href="#i-phone"/></svg></span>
  <span class="callbar__text"><span class="callbar__label">Call Mrs. Akbar</span><span class="callbar__num">${BIZ.phone}</span></span>
  <svg class="icon callbar__arrow" aria-hidden="true"><use href="#i-arrow"/></svg>
</a>
</aside>`;
}

/* ---------- Structured data ---------- */
export const bizRef = { '@id': `${SITE}/#business` };
export function bizNode() {
  return {
    '@type': ['LocalBusiness', 'EducationalOrganization'],
    '@id': `${SITE}/#business`,
    name: BIZ.name,
    url: `${SITE}/`,
    telephone: '+1-416-457-5778',
    image: `${SITE}/og/mrs-akbar-female-driving-instructor-hamilton.jpg`,
    logo: `${SITE}/icon-512.png`,
    // She drives to her students, so the business is described by the area it serves, not a street address
    address: { '@type': 'PostalAddress', addressLocality: BIZ.locality, addressRegion: BIZ.region, addressCountry: 'CA' },
    areaServed: SERVICE_AREAS.map((name) => ({ '@type': 'Place', name })),
    hasMap: BIZ.gbp,
    sameAs: [BIZ.gbp],
  };
}
export const websiteRef = { '@id': `${SITE}/#website` };
export function breadcrumbNode(path, trail) {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${abs(path)}#breadcrumb`,
    itemListElement: trail.map(([name, p], i) => ({ '@type': 'ListItem', position: i + 1, name: plain(name), item: abs(p) })),
  };
}
export function faqNode(path, items) {
  return {
    '@type': 'FAQPage',
    '@id': `${abs(path)}#faq`,
    mainEntity: items.map(([q, a]) => ({ '@type': 'Question', name: plain(q), acceptedAnswer: { '@type': 'Answer', text: plain(a) } })),
  };
}
export const ldScript = (nodes) => `<script type="application/ld+json">\n${JSON.stringify({ '@context': 'https://schema.org', '@graph': nodes }, null, 1)}\n</script>`;

/* ---------- Full document ---------- */
export function documentHtml({ path, title, description, ogImage, ogType = 'website', bodyClass = '', pageType, head = '', main, ld, article, noindex = false }) {
  const url = abs(path);
  const img = abs(ogImage || '/og/mrs-akbar-female-driving-instructor-hamilton.jpg');
  const social = noindex ? '' : `<link rel="canonical" href="${url}">
<meta name="robots" content="index, follow, max-image-preview:large">`;
  return `<!doctype html>
<html lang="en-CA">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${title.replace(/&(?![#\w]+;)/g, '&amp;')}</title>
<meta name="description" content="${esc(description)}">
${noindex ? '<meta name="robots" content="noindex, follow">' : social}
<meta name="theme-color" content="#F6F0E6">
<meta name="format-detection" content="telephone=yes">

${noindex ? '' : `<meta property="og:type" content="${ogType}">
<meta property="og:locale" content="en_CA">
<meta property="og:site_name" content="Mrs. Akbar Driving Instructor">
<meta property="og:title" content="${esc(plain(title).replace(/ \| Mrs\. Akbar.*$/, ''))}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${img}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(plain(title))}">
${article ? `<meta property="article:published_time" content="${article.published}">\n<meta property="article:modified_time" content="${article.modified}">\n` : ''}<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(plain(title).replace(/ \| Mrs\. Akbar.*$/, ''))}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${img}">
<meta name="twitter:image:alt" content="${esc(plain(title))}">`}

<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">

<link rel="preload" href="/src/fonts/big-shoulders-display-latin-900-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/src/fonts/figtree-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
${head}
<script>
  (function () {
    var d = document.documentElement;
    d.classList.add('js');
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) d.classList.add('motion');
    setTimeout(function () { if (!d.classList.contains('js-ready')) d.classList.add('revealed'); }, 3000);
  })();
</script>

<link rel="stylesheet" href="/src/styles/main.css">
<script type="module" src="/src/main.js"></script>

${noindex ? '' : ldScript(ld)}
</head>
<body class="${bodyClass}" data-page="${pageType}">
${SPRITE}

<a class="skip-link" href="#main">Skip to main content</a>

${header({ current: path })}

${drawer()}

<main id="main">
${main}
</main>

${footer()}

${floating()}
</body>
</html>
`;
}
