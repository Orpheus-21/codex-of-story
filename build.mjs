// Builds the site into _site: the app files, one static page for each entry, a sitemap and a Markdown copy.
import fs from 'node:fs';
import { slug, entries, tags } from './data.mjs';

const BASE = 'https://orpheus-21.github.io/codex-of-story/';
const OUT = '_site';
const FIELDS = [['w', 'What it does'], ['u', 'When to use it'], ['m', 'Common misuse'], ['x', 'Examples']];
const esc = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const all = [...entries].sort((a, b) => a.n.localeCompare(b.n));
const known = new Set(all.map(e => slug(e.n)));
const short = e => (e.d.length > 155 ? e.d.slice(0, 152).replace(/\s+\S*$/, '') + '...' : e.d);

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT);
for (const f of ['index.html', 'style.css', 'app.js']) fs.copyFileSync(f, `${OUT}/${f}`);
fs.cpSync('data', `${OUT}/data`, { recursive: true });
fs.cpSync('fonts', `${OUT}/fonts`, { recursive: true });

const page = e => {
  const s = slug(e.n);
  const rel = (e.r || []).map(n => known.has(slug(n)) ? `<a href="../${slug(n)}/">${esc(n)}</a>` : esc(n)).join(', ');
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(e.n)} | The Codex of Story</title>
<meta name="description" content="${esc(short(e))}">
<link rel="canonical" href="${BASE}e/${s}/">
<meta property="og:type" content="article">
<meta property="og:site_name" content="The Codex of Story">
<meta property="og:title" content="${esc(e.n)}">
<meta property="og:description" content="${esc(short(e))}">
<meta property="og:url" content="${BASE}e/${s}/">
<link rel="stylesheet" href="../../style.css">
</head>
<body>
<header><p class="sans"><a href="../../">The Codex of Story</a> · <a href="../../#${s}">Find it in the list</a></p></header>
<main><article id="${s}">
<h1>${esc(e.n)}</h1>
<p class="meta">${esc(e.cat)}${e.aka ? ` · aka <em>${esc(e.aka)}</em>` : ''}</p>
<p class="def">${esc(e.d)}</p><dl>${FIELDS.filter(([k]) => e[k]).map(([k, l]) => `<dt>${l}</dt><dd>${esc(e[k])}</dd>`).join('')}${rel ? `<dt>See also</dt><dd class="rel">${rel}</dd>` : ''}</dl>
</article></main>
</body>
</html>
`;
};
for (const e of all) {
  const dir = `${OUT}/e/${slug(e.n)}`;
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(`${dir}/index.html`, page(e));
}

const urls = [BASE, ...all.map(e => `${BASE}e/${slug(e.n)}/`)];
fs.writeFileSync(`${OUT}/sitemap.xml`, `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u => `<url><loc>${u}</loc></url>`).join('\n')}\n</urlset>\n`);
fs.writeFileSync(`${OUT}/robots.txt`, `User-agent: *\nAllow: /\nSitemap: ${BASE}sitemap.xml\n`);

const md = ['# The Codex of Story', '', `${all.length} entries on narrative structures, devices, tropes and literary figures. ${BASE}`, ''];
for (const e of all) {
  md.push(`## ${e.n}`, '', `*${e.cat}${e.aka ? ` · aka ${e.aka}` : ''}*`, '', e.d, '');
  for (const [k, l] of FIELDS) if (e[k]) md.push(`**${l}.** ${e[k]}`, '');
  if (e.r && e.r.length) md.push(`**See also.** ${e.r.join(', ')}`, '');
}
fs.writeFileSync(`${OUT}/codex.md`, md.join('\n'));
console.log(`built ${all.length} entry pages in ${OUT}`);
