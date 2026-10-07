// Publishes the site to GitHub Pages: builds, validates every page, then pushes dist/ as a new commit
// on the gh-pages branch, which Pages serves as-is. Uses your normal git login. Run: npm run deploy
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const sh = (cmd, env) => execSync(cmd, { cwd: root, env: env || process.env, encoding: 'utf8', stdio: ['ignore', 'pipe', 'inherit'] }).trim();
const loud = (cmd) => execSync(cmd, { cwd: root, stdio: 'inherit' });

loud('npm run build');
loud('npx html-validate "dist/**/*.html"');
fs.writeFileSync(path.join(root, 'dist/.nojekyll'), ''); // serve files as they are, no Jekyll

// Snapshot dist/ into a commit without touching the working tree or the main index
const index = path.join(os.tmpdir(), `mrsakbar-pages-index-${process.pid}`);
const env = { ...process.env, GIT_INDEX_FILE: index };
sh('git --work-tree=dist add -A', env);
const tree = sh('git write-tree', env);
fs.rmSync(index, { force: true });

let parent = '';
try { sh('git fetch -q origin gh-pages'); parent = sh('git rev-parse FETCH_HEAD'); } catch { /* first deploy */ }
if (parent && sh(`git rev-parse ${parent}^{tree}`) === tree) {
  console.log('\nThe live site already matches this build. Nothing to publish.');
  process.exit(0);
}
const source = sh('git rev-parse --short HEAD') + (sh('git status --porcelain') ? ' (with uncommitted changes)' : '');
const commit = sh(`git commit-tree ${tree}${parent ? ` -p ${parent}` : ''} -m "Deploy ${source}"`);
loud(`git push origin ${commit}:refs/heads/gh-pages`);
console.log('\nPublished. GitHub Pages updates the live site within a minute or two.');
