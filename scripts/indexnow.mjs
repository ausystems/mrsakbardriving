// Tells IndexNow search engines (Bing, Yandex and others) that every page in the sitemap is new or
// updated. Free. Run after each deploy that adds or changes pages: npm run indexnow
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const fileEnv = Object.fromEntries(fs.readFileSync(`${root}.env`, 'utf8').split('\n').filter((l) => /^[A-Z_]+=/.test(l)).map((l) => [l.slice(0, l.indexOf('=')), l.slice(l.indexOf('=') + 1).trim()]));
const env = { ...fileEnv, ...Object.fromEntries(Object.entries(process.env).filter(([k]) => k.startsWith('VITE_'))) };
const site = (env.VITE_SITE_URL || '').replace(/\/$/, '');
const key = env.VITE_INDEXNOW_KEY;
if (!site || !key) throw new Error('Set VITE_SITE_URL and VITE_INDEXNOW_KEY in .env first');
const pages = JSON.parse(fs.readFileSync(`${root}data/pages.json`, 'utf8'));
const urlList = pages.map((p) => `${site}${p.path}`);
const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: new URL(site).host, key, keyLocation: `${site}/${key}.txt`, urlList }),
});
console.log(`IndexNow: ${res.status} ${res.statusText} for ${urlList.length} URLs`);
