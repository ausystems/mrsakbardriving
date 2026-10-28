// Generates every page except the home page into src/pages/<slug>/index.html, the shared
// header/footer partials the home page includes, and data/pages.json (sitemap, llms.txt, OG images).
// Run: node scripts/site/build.mjs   (npm run build and npm run dev do this first)
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { root, SITE, UPDATED, plain, abs } from './core.mjs';
import { documentHtml, header, drawer, footer, floating, SPRITE, bizNode, bizRef, websiteRef, breadcrumbNode, faqNode } from './layout.mjs';
import { servicePages } from './pages-services.mjs';
import { areaPages } from './pages-areas.mjs';
import { guidePages, guidesHub } from './pages-guides.mjs';
import { contactPage } from './pages-contact.mjs';
import { reviewsPage } from './pages-reviews.mjs';
import { privacyPage, termsPage } from './pages-legal.mjs';
import { notFoundPage } from './pages-404.mjs';
import { areaBento, BENTO_SLUGS } from './area-bento.mjs';

const pagesDir = path.join(root, 'src/pages');
fs.rmSync(pagesDir, { recursive: true, force: true });

const all = [...servicePages(), ...areaPages(), guidesHub(), ...guidePages(), reviewsPage(), contactPage(), privacyPage(), termsPage()];

// Sitemap dates: a page's date moves only when its content does. data/lastmod.json keeps a
// fingerprint of every page, so search engines can tell exactly which pages changed (commit it).
const LASTMOD = path.join(root, 'data/lastmod.json');
const stamps = fs.existsSync(LASTMOD) ? JSON.parse(fs.readFileSync(LASTMOD, 'utf8')) : {};
const today = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Toronto' });
const lastmod = (key, ...content) => {
  const hash = crypto.createHash('sha1').update(content.join('\n')).digest('hex').slice(0, 16);
  if (stamps[key]?.hash !== hash) stamps[key] = { hash, date: today };
  return stamps[key].date;
};
const bento = areaBento();

const manifest = [{ path: '/', type: 'home', name: 'Home', title: 'Female Driving Instructor in Hamilton, ON | Mrs. Akbar', description: 'One-on-one driving lessons across Hamilton with a certified female instructor who comes to you. Call 416-457-5778.', updated: lastmod('/', fs.readFileSync(path.join(root, 'index.html'), 'utf8'), bento), og: '/og/mrs-akbar-female-driving-instructor-hamilton.jpg', ogTitle: 'Learn to drive with Mrs. Akbar.' }];

for (const p of all) {
  const modified = lastmod(p.path, p.title, p.description, p.main, JSON.stringify(p.ld || []), JSON.stringify(p.faqs || []));
  const og = `/og/${p.path.replace(/^\/|\/$/g, '').split('/').pop() || 'home'}.jpg`;
  const pageNode = {
    '@type': p.webPageType || 'WebPage',
    '@id': `${abs(p.path)}#webpage`,
    url: abs(p.path),
    name: plain(p.title),
    description: plain(p.description),
    inLanguage: 'en-CA',
    isPartOf: websiteRef,
    breadcrumb: { '@id': `${abs(p.path)}#breadcrumb` },
    primaryImageOfPage: { '@type': 'ImageObject', url: abs(og), width: 1200, height: 630 },
    about: p.about || bizRef,
    dateModified: p.updated || modified,
  };
  const ld = [pageNode, breadcrumbNode(p.path, p.trail), bizNode(), ...(p.ld || [])];
  if (p.faqs?.length) ld.push(faqNode(p.path, p.faqs));
  const html = documentHtml({
    path: p.path,
    title: p.title,
    description: p.description,
    ogImage: og,
    ogType: p.type === 'guide' ? 'article' : 'website',
    article: p.type === 'guide' ? { published: p.published, modified: p.updated || UPDATED } : null,
    pageType: p.type,
    main: p.main,
    ld,
  });
  if (/[\u2014\u2013]/.test(html)) throw new Error(`Dash found in ${p.path}`);
  const file = path.join(pagesDir, p.path, 'index.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
  manifest.push({ path: p.path, type: p.type, name: plain(p.name), title: plain(p.title), description: plain(p.description), updated: modified, og, ogTitle: plain(p.ogTitle || p.h1 || p.name), ogScript: p.ogScript || '' });
}

// Custom 404, served by the host for any missing page
const nf = notFoundPage();
const nfHtml = documentHtml({ path: nf.path, title: nf.title, description: nf.description, pageType: nf.pageType, main: nf.main, ld: [], noindex: true });
if (/[\u2014\u2013]/.test(nfHtml)) throw new Error('Dash found in 404');
fs.writeFileSync(path.join(root, '404.html'), nfHtml);

// Shared pieces for the hand-written home page
const partials = path.join(root, 'src/partials');
fs.writeFileSync(path.join(partials, 'site-sprite.svg'), SPRITE);
fs.writeFileSync(path.join(partials, 'site-header.html'), header({ home: true }));
fs.writeFileSync(path.join(partials, 'site-drawer.html'), drawer());
fs.writeFileSync(path.join(partials, 'site-footer.html'), footer({ home: true }));
fs.writeFileSync(path.join(partials, 'site-floating.html'), floating());
// Home page area grid: every tile must point at a page that exists
const missing = BENTO_SLUGS.filter((slug) => !all.some((p) => p.path === `/${slug}/`));
if (missing.length) console.warn(`site: area grid links to pages not built yet: ${missing.join(', ')}`);
fs.writeFileSync(path.join(partials, 'area-bento.html'), bento);

fs.writeFileSync(path.join(root, 'data/pages.json'), JSON.stringify(manifest, null, 1));
const live = new Set(manifest.map((m) => m.path));
fs.writeFileSync(LASTMOD, `${JSON.stringify(Object.fromEntries(Object.entries(stamps).filter(([k]) => live.has(k)).sort(([a], [b]) => a.localeCompare(b))), null, 1)}\n`);
console.log(`site: ${all.length} pages generated (+ home), ${SITE ? 'ok' : ''}`);
