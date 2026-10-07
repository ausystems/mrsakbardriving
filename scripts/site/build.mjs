// Generates every page except the home page into src/pages/<slug>/index.html, the shared
// header/footer partials the home page includes, and data/pages.json (sitemap, llms.txt, OG images).
// Run: node scripts/site/build.mjs   (npm run build and npm run dev do this first)
import fs from 'node:fs';
import path from 'node:path';
import { root, SITE, UPDATED, plain, abs } from './core.mjs';
import { documentHtml, header, drawer, footer, floating, SPRITE, bizNode, bizRef, websiteRef, breadcrumbNode, faqNode } from './layout.mjs';
import { servicePages } from './pages-services.mjs';
import { areaPages } from './pages-areas.mjs';
import { guidePages, guidesHub } from './pages-guides.mjs';
import { contactPage } from './pages-contact.mjs';
import { privacyPage, termsPage } from './pages-legal.mjs';
import { notFoundPage } from './pages-404.mjs';

const pagesDir = path.join(root, 'src/pages');
fs.rmSync(pagesDir, { recursive: true, force: true });

const all = [...servicePages(), ...areaPages(), guidesHub(), ...guidePages(), contactPage(), privacyPage(), termsPage()];

const manifest = [{ path: '/', type: 'home', name: 'Home', title: 'Female Driving Instructor in Hamilton, ON | Mrs. Akbar', description: 'One-on-one driving lessons across Hamilton with a certified female instructor who comes to you. Call 416-457-5778.', updated: UPDATED, og: '/og/mrs-akbar-female-driving-instructor-hamilton.jpg', ogTitle: 'Learn to drive with Mrs. Akbar.' }];

for (const p of all) {
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
    dateModified: p.updated || UPDATED,
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
  manifest.push({ path: p.path, type: p.type, name: plain(p.name), title: plain(p.title), description: plain(p.description), updated: p.updated || UPDATED, og, ogTitle: plain(p.ogTitle || p.h1 || p.name), ogScript: p.ogScript || '' });
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

fs.writeFileSync(path.join(root, 'data/pages.json'), JSON.stringify(manifest, null, 1));
console.log(`site: ${all.length} pages generated (+ home), ${SITE ? 'ok' : ''}`);
