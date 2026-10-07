// The home page's area grid: one tile per community she covers, each linking to that area's page,
// plus a dark call/text tile. build.mjs writes it to src/partials/area-bento.html for index.html.
// data-areas ties each tile to its dot on the map above it (main.js lights them up together).
import { BIZ } from './core.mjs';
import { icon } from './layout.mjs';
import { tileMap } from './art.mjs';

const TILES = [
  { slug: 'driving-lessons-hamilton', name: 'Hamilton', tag: 'The whole city', line: 'Downtown one-ways, the Mountain accesses and the DriveTest centre on Kenora Avenue.', size: 'xl', map: { key: 'hamilton', km: 18 }, areas: 'hamilton hamilton-mountain east-hamilton west-hamilton westdale' },
  { slug: 'driving-lessons-downtown-hamilton', name: 'Downtown Hamilton', tag: 'Hamilton', sub: 'Lower city', line: 'King, Main and a grid of one-way streets.', areas: 'hamilton' },
  { slug: 'driving-lessons-hamilton-mountain', name: 'Hamilton Mountain', tag: 'Hamilton', sub: 'Above the escarpment', line: 'Upper James, the Linc and the climbs up the escarpment.', areas: 'hamilton-mountain' },
  { slug: 'driving-lessons-east-hamilton', name: 'East Hamilton', tag: 'Hamilton', sub: 'East end', line: 'The Red Hill, Queenston Road and the DriveTest centre.', areas: 'east-hamilton' },
  { slug: 'driving-lessons-west-hamilton', name: 'West Hamilton', tag: 'Hamilton', sub: 'West end', line: 'Main Street West, Aberdeen and the 403 ramps.', areas: 'west-hamilton' },
  { slug: 'driving-lessons-westdale', name: 'Westdale', tag: 'Hamilton', sub: 'By McMaster', line: 'Quiet residential streets and Westdale Village.', areas: 'westdale' },
  { slug: 'driving-lessons-mount-hope', name: 'Mount Hope', tag: 'South of the city', line: 'Quiet streets first, then Highway 6.', areas: 'mount-hope' },
  { slug: 'driving-lessons-binbrook', name: 'Binbrook', tag: 'South of the city', line: 'Roundabouts, and plenty of them.', areas: 'binbrook' },
  { slug: 'driving-lessons-glanbrook', name: 'Glanbrook', tag: 'South of the city', line: 'Country roads around the airport.', areas: 'mount-hope binbrook' },
  { slug: 'driving-lessons-ancaster', name: 'Ancaster', tag: 'West of the city', line: 'Hills, a village main street and the 403.', areas: 'ancaster' },
  { slug: 'driving-lessons-dundas', name: 'Dundas', tag: 'West of the city', line: 'Steep hills and a small-town main street.', areas: 'dundas' },
  { slug: 'driving-lessons-stoney-creek', name: 'Stoney Creek', tag: 'East of the city', line: 'The QEW is right there for highway practice.', size: 'wide', map: { key: 'stoney-creek', km: 14 }, areas: 'stoney-creek' },
  { slug: 'driving-lessons-caledonia', name: 'Caledonia', tag: 'On the Grand River', line: 'Highway 6 and country roads close by.', size: 'wide', map: { key: 'caledonia', km: 14 }, areas: 'caledonia' },
];

const tile = (t, i) => `<li class="abento-item${t.size ? ` abento-item--${t.size}` : ''}" data-areas="${t.areas}" data-reveal style="--d:${(i % 4) * 60}ms">
  <a class="abento-tile" href="/${t.slug}/">
    ${t.map ? `<div class="abento-map">${tileMap(t.map.key, { km: t.map.km, ratio: t.size === 'xl' ? 4 / 3 : 3 / 2 })}</div>` : ''}
    <div class="abento-body">
      <h3 class="abento-name">${t.name}</h3>
      <p class="abento-tag">${t.tag}</p>
      <p class="abento-line">${t.line}</p>
    </div>
    <span class="abento-go" aria-hidden="true">${icon('arrow')}</span>
  </a>
</li>`;

export function areaBento() {
  return `<ul class="abento">
${TILES.map(tile).join('\n')}
<li class="abento-item abento-item--wide abento-item--ask" data-reveal style="--d:120ms">
  <div class="abento-ask">
    <p class="script abento-ask__script">don&rsquo;t see your area?</p>
    <p class="abento-ask__title">Ask her</p>
    <p class="abento-ask__text">Call or text and tell her where you live.</p>
    <div class="abento-ask__actions">
      <a class="btn btn--amber" href="${BIZ.tel}" data-call="areas">${icon('phone')}<span>Call ${BIZ.phone}</span></a>
      <a class="btn btn--ghost-light btn--text" href="${BIZ.sms}" data-text="areas">${icon('chat')}<span>Text her</span></a>
    </div>
  </div>
</li>
</ul>`;
}

// Slugs the grid links to; build.mjs checks every one of them is a real page
export const BENTO_SLUGS = TILES.map((t) => t.slug);

// The same tiles, smaller and without maps, for the Hamilton page's neighbourhood list
export function areaTiles(slugs) {
  return `<ul class="abento abento--mini">
${slugs.map((slug, i) => {
    const t = TILES.find((x) => x.slug === slug);
    if (!t) throw new Error(`No area tile for ${slug}`);
    return tile({ ...t, tag: t.sub || t.tag, size: '', map: null }, i);
  }).join('\n')}
</ul>`;
}
