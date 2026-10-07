import { defineConfig, loadEnv } from 'vite';
import fs from 'node:fs';
import path from 'node:path';
import postcss from 'postcss';
import { splitLetters } from './scripts/site/letters.mjs';

const ROOT = import.meta.dirname;
const PAGES_DIR = path.join(ROOT, 'src/pages');
const walk = (dir, test) => (fs.existsSync(dir) ? fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
  const p = path.join(dir, d.name);
  return d.isDirectory() ? walk(p, test) : test(p) ? [p] : [];
}) : []);

// Inlines <!--#include file="..."--> partials (SVG art, map, shared header and footer) into HTML pages.
function htmlIncludes() {
  const expand = (html, depth = 0) => (depth > 4 ? html : html.replace(/<!--#include file="([^"]+)"-->/g, (_, file) =>
    expand(fs.readFileSync(path.resolve(ROOT, file), 'utf8').trim(), depth + 1)));
  return { name: 'html-includes', transformIndexHtml: { order: 'pre', handler: (html) => expand(html) } };
}

// Headlines marked data-letters animate in letter by letter (spans are built here, so it starts on first paint).
function letters() {
  return { name: 'letters', transformIndexHtml: { order: 'pre', handler: (html) => splitLetters(html) } };
}

// Search Console / Bing Webmaster verification tags, only when the codes are set in .env
function verification(env) {
  const tags = [
    env.VITE_GSC_VERIFICATION && `<meta name="google-site-verification" content="${env.VITE_GSC_VERIFICATION}">`,
    env.VITE_BING_VERIFICATION && `<meta name="msvalidate.01" content="${env.VITE_BING_VERIFICATION}">`,
  ].filter(Boolean).join('\n');
  return { name: 'verification', transformIndexHtml: (html) => (tags ? html.replace('</head>', `${tags}\n</head>`) : html) };
}

// Classes that scripts add after load (main.js, motion.js, fx.js and the inline head script)
const RUNTIME_CLASSES = ['js', 'motion', 'js-ready', 'revealed', 'motion-ready', 'callbar-on', 'is-scrolled', 'is-open', 'is-in',
  'is-split', 'line', 'w', 'ink', 'is-waiting', 'is-seen', 'has-focus', 'is-active', 'is-hot', 'is-visible', 'is-done', 'is-drawn',
  'is-passed', 'is-current', 'is-braking', 'is-reversing', 'signal-l', 'signal-r', 'is-playing'];

// Keeps only the CSS rules a page can use: a selector survives if every class it needs is on the page
// (classes inside :not() don't count, since they make a selector match more, not less).
function purgeCss(css, html) {
  const present = new Set(RUNTIME_CLASSES);
  for (const m of html.matchAll(/class="([^"]*)"/g)) for (const c of m[1].split(/\s+/)) if (c) present.add(c);
  const root = postcss.parse(css);
  root.walkRules((rule) => {
    if (rule.parent?.type === 'atrule' && /keyframes$/i.test(rule.parent.name)) return;
    const keep = rule.selectors.filter((sel) => (sel.replace(/:not\([^)]*\)/g, '').match(/\.[A-Za-z_][\w-]*/g) || []).every((c) => present.has(c.slice(1))));
    if (!keep.length) rule.remove();
    else if (keep.length !== rule.selectors.length) rule.selectors = keep;
  });
  root.walkAtRules((at) => { if (at.nodes && !at.nodes.length) at.remove(); });
  return root.toString();
}

// Inlines the (small) bundled stylesheet into each page so first paint needs no extra request.
function inlineCss() {
  let outDir = 'dist';
  return {
    name: 'inline-css',
    apply: 'build',
    enforce: 'post',
    configResolved(c) { outDir = c.build.outDir; },
    closeBundle() {
      const dir = path.resolve(ROOT, outDir);
      const html = walk(dir, (f) => f.endsWith('.html')).map((f) => fs.readFileSync(f, 'utf8')).join('');
      for (const f of fs.readdirSync(path.join(dir, 'assets'))) {
        if (f.endsWith('.css') && !html.includes(f)) fs.unlinkSync(path.join(dir, 'assets', f));
      }
    },
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        if (!ctx.bundle) return html;
        return html.replace(/<link rel="stylesheet"[^>]*href="[^"]*?\/?(assets\/[^"]+\.css)"[^>]*>/g, (tag, file) => {
          const asset = ctx.bundle[file];
          if (!asset || asset.type !== 'asset') return tag;
          return `<style>${purgeCss(String(asset.source), html)}</style>`;
        });
      },
    },
  };
}

// The site can sit at a domain root (https://www.example.ca) or in a folder (https://user.github.io/repo).
// The folder comes from VITE_SITE_URL. Vite prefixes its own asset URLs; this prefixes every other
// root-relative link (/guides/, /#faq, /contact/ ...) in the built pages. Dev always runs at /.
const basePathOf = (siteUrl) => { try { return new URL(siteUrl).pathname.replace(/\/*$/, '/'); } catch { return '/'; } };
function prefixLinks(base) {
  const skip = base.slice(1); // "repo/": already prefixed
  const fix = (url) => (url.startsWith('/') && !url.startsWith('//') && !url.startsWith(base) ? base + url.slice(1) : url);
  return {
    name: 'prefix-links',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        if (base === '/') return html;
        return html
          .replace(new RegExp(`(\\s(?:href|src|poster|action)=")/(?!/|${skip.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'g'), `$1${base}`)
          .replace(/(\ssrcset=")([^"]+)"/g, (_, attr, list) => `${attr}${list.split(',').map((part) => part.trim().replace(/^\S+/, fix)).join(', ')}"`);
      },
    },
  };
}

// Generated pages live in src/pages/<slug>/index.html; publish them at /<slug>/
function cleanUrls(base = '/') {
  return {
    name: 'clean-urls',
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        const url = req.url.split('?')[0];
        if (url !== '/' && !path.extname(url)) {
          const file = path.join(PAGES_DIR, url.replace(/\/$/, ''), 'index.html');
          if (fs.existsSync(file)) req.url = `/src/pages${url.replace(/\/?$/, '/')}index.html`;
        }
        next();
      });
    },
    // Preview behaves like the live host: missing pages get the custom 404 page
    configurePreviewServer(server) {
      if (base !== '/') {
        server.middlewares.use((req, res, next) => {
          if (req.url !== '/' && req.url !== base.slice(0, -1)) return next();
          res.statusCode = 302;
          res.setHeader('Location', base);
          res.end();
        });
      }
      return () => server.middlewares.use((req, res, next) => {
        const page = path.join(ROOT, 'dist/404.html');
        let url = decodeURIComponent(req.url.split('?')[0]);
        if (base !== '/' && url.startsWith(base)) url = `/${url.slice(base.length)}`;
        const dist = path.join(ROOT, 'dist', url);
        const exists = [dist, path.join(dist, 'index.html'), `${dist}.html`].some((f) => fs.existsSync(f) && fs.statSync(f).isFile());
        if (req.method !== 'GET' || exists || !fs.existsSync(page)) return next();
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end(fs.readFileSync(page));
      });
    },
    closeBundle() {
      const from = path.join(ROOT, 'dist/src/pages');
      if (!fs.existsSync(from)) return;
      for (const f of walk(from, (p) => p.endsWith('index.html'))) {
        const to = path.join(ROOT, 'dist', path.relative(from, f));
        fs.mkdirSync(path.dirname(to), { recursive: true });
        fs.renameSync(f, to);
      }
      fs.rmSync(path.join(ROOT, 'dist/src'), { recursive: true, force: true });
    },
  };
}

// robots.txt, sitemap.xml and llms.txt are generated from .env and the page list
function seoFiles(siteUrl, env) {
  return {
    name: 'seo-files',
    apply: 'build',
    generateBundle() {
      const pages = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/pages.json'), 'utf8'));
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
      });
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source:
          `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
          pages.map((p) => `  <url>\n    <loc>${siteUrl}${p.path}</loc>\n    <lastmod>${p.updated}</lastmod>\n  </url>\n`).join('') +
          `</urlset>\n`,
      });
      const fill = (s) => s.replace(/%(VITE_[A-Z_]+)%/g, (_, key) => env[key] ?? '');
      const group = (type, heading) => {
        const list = pages.filter((p) => p.type === type);
        return list.length ? `\n## ${heading}\n${list.map((p) => `- [${p.name}](${siteUrl}${p.path}): ${fill(p.description)}`).join('\n')}\n` : '';
      };
      const llms = fill(fs.readFileSync(path.join(ROOT, 'src/templates/llms.txt'), 'utf8')) +
        group('service', 'Lessons') + group('area', 'Areas') + group('guide', 'Guides') + group('contact', 'Contact');
      this.emitFile({ type: 'asset', fileName: 'llms.txt', source: llms });
    },
  };
}

export default defineConfig(({ command, mode, isPreview }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const siteUrl = (env.VITE_SITE_URL || '').replace(/\/$/, '');
  const base = command === 'build' || isPreview ? basePathOf(siteUrl) : '/';
  const pageInputs = Object.fromEntries(
    walk(PAGES_DIR, (p) => p.endsWith('index.html')).map((f) => [path.relative(PAGES_DIR, path.dirname(f)).replace(/[\\/]/g, '__'), f]),
  );
  return {
    appType: 'mpa',
    base,
    plugins: [htmlIncludes(), letters(), verification(env), inlineCss(), prefixLinks(base), cleanUrls(base), seoFiles(siteUrl, env)],
    build: {
      target: 'es2020',
      cssCodeSplit: false,
      assetsInlineLimit: 0,
      rollupOptions: {
        input: {
          main: path.resolve(ROOT, 'index.html'),
          notFound: path.resolve(ROOT, '404.html'),
          ...pageInputs,
        },
      },
    },
    server: { host: '127.0.0.1' },
  };
});
