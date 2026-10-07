// Area pages. Each one is built from verified local detail (OpenStreetMap, City of Hamilton,
// DriveTest), real review quotes and its own mini-map, so no two pages say the same thing.
// She drives to her students, so pages talk about the area itself, never a distance from her.
import { review, AREAS, REVIEWS_COUNT, abs, plain } from './core.mjs';
import { bizRef } from './layout.mjs';
import { pageHero, sec, facts, lead, prose, spots, quote, quotes, faq, chips, guideCards, ctaBand, sources } from './ui.mjs';
import { miniMap, PLACES } from './art.mjs';
import { AREA_CONTENT } from './areas-content.mjs';

const LESSON_LINKS = {
  beginner: ['/beginner-driving-lessons/', 'Beginner lessons'],
  nervous: ['/driving-lessons-for-nervous-drivers/', 'Nervous drivers'],
  g2: ['/g2-road-test-preparation/', 'G2 road test prep'],
  g: ['/g-road-test-preparation/', 'G test and highway'],
  parking: ['/parallel-parking-lessons/', 'Parallel parking'],
};

function areaPage(a) {
  const path = `/${a.slug}/`;
  const trail = [['Home', '/'], ['Areas', '/#areas'], [a.crumb, path]];
  const nearby = AREAS.filter((x) => x.slug !== a.slug).map((x) => ({ href: `/${x.slug}/`, label: x.label }));
  const main = [
    pageHero({
      trail, script: a.script, h1: a.h1, lede: a.lede,
      art: miniMap(a.mapKey, { label: a.mapLabel }), artLabel: true, variant: 'map',
    }),
    sec({
      id: 'why', tone: 'white', script: a.whyScript, title: a.whyTitle,
      body: lead(a.lead) + facts([
        { num: '5.0', label: 'average on Google' },
        { num: REVIEWS_COUNT, count: REVIEWS_COUNT, label: 'Google reviews in Hamilton' },
        { num: '7', count: 7, label: 'days a week, and she comes to you' },
      ]),
    }),
    sec({ id: 'roads', tone: 'paper', script: 'where you&rsquo;ll practise', title: a.roadsTitle, meta: a.roadsMeta, body: spots(a.spots) + (a.sources ? sources(a.sources) : '') }),
    sec({
      id: 'lessons', tone: 'white', script: 'what people book', title: a.lessonsTitle,
      body: prose(a.lessonsHtml) + `<div class="more-lessons" data-reveal>${chips(a.lessons.map((k) => ({ href: LESSON_LINKS[k][0], label: LESSON_LINKS[k][1] })))}</div>`,
    }),
    sec({ id: 'reviews', tone: 'sand', script: 'from her google reviews', title: a.reviewsTitle, body: quotes(a.quotes.map(([r, note]) => quote(r, note))) }),
    sec({ id: 'questions', tone: 'paper', script: 'good questions', title: `Lessons in ${a.short}: questions`, center: true, body: faq(a.faqs, a.slug) }),
    sec({
      id: 'more', tone: 'white', script: 'nearby', title: 'Other areas and guides',
      body: `<div class="more-lessons" data-reveal><p class="more-lessons__title">Other areas she covers</p>${chips(nearby)}</div><div class="more-lessons">${guideCards(a.guides)}</div>`,
    }),
    ctaBand({ title: a.cta[0], text: a.cta[1] }),
  ].join('\n');
  const place = PLACES[a.mapKey];
  return {
    type: 'area', path, trail, name: `Driving lessons in ${a.short}`, h1: a.h1, title: a.title, description: a.description, faqs: a.faqs, main,
    ogScript: a.script,
    about: { '@id': `${abs(path)}#service` },
    ld: [{
      '@type': 'Service',
      '@id': `${abs(path)}#service`,
      name: plain(a.h1),
      serviceType: 'Driving lessons',
      description: plain(a.description),
      url: abs(path),
      provider: bizRef,
      areaServed: {
        '@type': 'Place',
        name: a.placeName,
        geo: { '@type': 'GeoCoordinates', latitude: place.lat, longitude: place.lon },
        ...(a.wiki ? { sameAs: a.wiki } : {}),
      },
    }],
  };
}

export function areaPages() {
  return AREA_CONTENT(review).map(areaPage);
}
