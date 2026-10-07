// Shared facts and helpers for every generated page. Facts here come from her Google Business
// Profile or from the client; nothing is invented. %VITE_SITE_URL% is filled in by Vite from .env.
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

export const root = fileURLToPath(new URL('../../', import.meta.url));
export const SITE = '%VITE_SITE_URL%';
export const REVIEWS_COUNT = '%VITE_GOOGLE_REVIEWS%';
export const UPDATED = '2026-10-06';

export const BIZ = {
  name: 'Mrs. Akbar Female Certified Driving Instructor',
  short: 'Mrs. Akbar Driving Instructor',
  phone: '416-457-5778',
  tel: 'tel:+14164575778',
  sms: 'sms:+14164575778?&amp;body=Hi%20Mrs.%20Akbar%2C%20I%27d%20like%20to%20book%20a%20driving%20lesson.',
  street: '409 Provident Way', // mailing address: shown only in the Privacy Policy, where the law expects one
  locality: 'Hamilton',
  region: 'ON',
  postal: 'L0R 1W0',
  lat: 43.1550825,
  lon: -79.9251779,
  gbp: 'https://maps.google.com/?cid=15428900466718974393',
  gbpBrampton: 'https://maps.google.com/?cid=10566981191229835186',
};

export const esc = (s) => String(s).replace(/&(?![#\w]+;)/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// Plain text (for JSON-LD and meta tags) from a small HTML string
export const plain = (html) => String(html)
  .replace(/<[^>]+>/g, '')
  .replace(/&rsquo;|&#39;/g, '’').replace(/&lsquo;/g, '‘').replace(/&ldquo;/g, '“').replace(/&rdquo;/g, '”')
  .replace(/&hellip;/g, '…').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&middot;/g, '·')
  .replace(/\s+/g, ' ').trim();
export const abs = (path) => `${SITE}${path}`;

/* ---------- Google reviews: quotes must match the review word for word ---------- */
const reviewData = JSON.parse(fs.readFileSync(`${root}data/reviews-hamilton.json`, 'utf8')).reviews;
const REVIEW_URL = (id) => `https://www.google.com/maps/reviews/@43.1550825,-79.9251779,17z/data=!3m1!4b1!4m6!14m5!1m4!2m3!1s${id}!2m1!1s0x0:0xd61e773a89a4a1b9`;
const shortName = (full) => {
  const words = full.replace(/\d+/g, '').trim().split(/\s+/);
  const cap = (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
  return words.length > 1 ? `${cap(words[0])} ${words[words.length - 1].charAt(0).toUpperCase()}.` : cap(words[0]);
};
const toHtml = (s) => s.replace(/&/g, '&amp;').replace(/'/g, '&rsquo;').replace(/’/g, '&rsquo;').replace(/\.\.\./g, '&hellip;');

/**
 * review('Gaurav Singh', 'Each lesson was well planned', '...needed to pass the test')
 * Returns the exact quote (from `from` to the end of `to`), with ellipses where it was cut,
 * plus the reviewer's short name and a link to that exact review. Throws if anything doesn't match.
 */
export function review(name, from, to = null) {
  const r = reviewData.find((x) => x.name === name);
  if (!r) throw new Error(`No review by ${name}`);
  const start = r.text.indexOf(from);
  if (start < 0) throw new Error(`Quote not found in ${name}'s review: ${from}`);
  let end = r.text.length;
  if (to) {
    const at = r.text.indexOf(to, start);
    if (at < 0) throw new Error(`Quote end not found in ${name}'s review: ${to}`);
    end = at + to.length;
  }
  let quote = r.text.slice(start, end).trim();
  if (/[\u2014\u2013]/.test(quote)) throw new Error(`Quote from ${name} contains a dash`);
  const cutStart = start > 0 && !/[.!?]\s*$/.test(r.text.slice(0, start));
  const cutEnd = end < r.text.length && !/[.!?]$/.test(quote);
  quote = toHtml(quote);
  return {
    name: shortName(r.name),
    quote: `${cutStart ? '&hellip;' : ''}${quote}${cutEnd ? '&hellip;' : ''}`,
    url: REVIEW_URL(r.id),
  };
}

// Every community she drives to (the client's list; never add nearby towns on our own)
export const SERVICE_AREAS = ['Hamilton', 'Mount Hope', 'Hamilton Mountain', 'Downtown Hamilton', 'East Hamilton', 'West Hamilton', 'Westdale', 'Ancaster', 'Dundas', 'Stoney Creek', 'Binbrook', 'Glanbrook', 'Caledonia'];

/* ---------- All pages, so navigation, footer, sitemap and llms.txt stay in sync ---------- */
export const SERVICES = [
  { slug: 'beginner-driving-lessons', label: 'Beginner lessons' },
  { slug: 'driving-lessons-for-nervous-drivers', label: 'Nervous drivers' },
  { slug: 'g2-road-test-preparation', label: 'G2 road test prep' },
  { slug: 'g-road-test-preparation', label: 'G test and highway' },
  { slug: 'parallel-parking-lessons', label: 'Parallel parking' },
];
export const AREAS = [
  { slug: 'driving-lessons-hamilton', label: 'Hamilton' },
  { slug: 'driving-lessons-mount-hope', label: 'Mount Hope' },
  { slug: 'driving-lessons-ancaster', label: 'Ancaster' },
  { slug: 'driving-lessons-dundas', label: 'Dundas' },
  { slug: 'driving-lessons-stoney-creek', label: 'Stoney Creek' },
  { slug: 'driving-lessons-binbrook', label: 'Binbrook' },
  { slug: 'driving-lessons-caledonia', label: 'Caledonia' },
  { slug: 'driving-lessons-near-mcmaster-university', label: 'Near McMaster' },
];
