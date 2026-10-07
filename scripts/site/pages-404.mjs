// Custom 404: a dead-end street, the lesson car does a three-point turn, and the most useful
// routes back into the site. Served by the host for any missing page; never indexed.
import { SERVICES, AREAS } from './core.mjs';
import { GUIDE_LIST } from './guide-list.mjs';
import { callBtn, sec, chips } from './ui.mjs';
import { art404 } from './art.mjs';

export function notFoundPage() {
  const group = (title, links) => `<div class="lost-group" data-reveal><p class="more-lessons__title">${title}</p>${chips(links)}</div>`;
  const main = `<section class="phero lost-hero" aria-labelledby="page-title">
  <div class="container phero-grid">
    <div class="phero-copy">
      <p class="script phero-script"><span>wrong turn!</span></p>
      <h1 class="phero-title" id="page-title" data-letters>This road doesn&rsquo;t go anywhere</h1>
      <p class="phero-lede">The page you were looking for isn&rsquo;t here. The link may be old, or the address may have a typo. Happens to the best drivers. Time for a three-point turn.</p>
      <div class="phero-actions" data-callbar-hide>
        <a class="btn btn--dark" href="/">Back to the home page</a>
        ${callBtn('404')}
      </div>
    </div>
    <div class="phero-art" aria-hidden="true" data-play>${art404()}</div>
  </div>
</section>
${sec({
  id: 'routes', tone: 'white', script: 'try one of these', title: 'Roads that do go somewhere',
  body: group('Lessons', SERVICES.map((s) => ({ href: `/${s.slug}/`, label: s.label }))) +
    group('Areas', AREAS.map((a) => ({ href: `/${a.slug}/`, label: a.label }))) +
    group('Guides', [...GUIDE_LIST.filter((g) => g.footer).map((g) => ({ href: `/guides/${g.slug}/`, label: g.short })), { href: '/guides/', label: 'All guides' }]) +
    group('Everything else', [{ href: '/', label: 'Home' }, { href: '/#reviews', label: 'Reviews' }, { href: '/#faq', label: 'FAQ' }, { href: '/contact/', label: 'Contact' }]),
})}`;
  return { path: '/404.html', title: 'Page not found | Mrs. Akbar Driving Instructor', description: 'This page doesn’t exist. Find driving lessons, areas and guides from Mrs. Akbar in Hamilton.', main, pageType: 'notfound' };
}
