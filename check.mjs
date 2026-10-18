// Fails on empty required fields, duplicate slugs, or related names with no entry.
import { slug, entries, tags } from './data.mjs';
const E = entries; const seen = new Set(); let bad = 0;
const fail = m => { console.log(m); bad++; };
for (const e of E) for (const k of ['n', 'cat', 'd', 'w']) if (!e[k]) fail(`empty ${k}: ${e.n}`);
for (const e of E) { const s = slug(e.n); if (seen.has(s)) fail('duplicate: ' + e.n); seen.add(s); }
for (const e of E) for (const r of e.r || []) if (!seen.has(slug(r))) fail(`${e.n} -> missing "${r}"`);
const T = tags; const names = new Set(E.map(e => e.n)); const cs = new Set(E.map(e => e.cat));
for (const c of cs) if (!T.byCat[c]) fail('no tags for category ' + c);
for (const [n, t] of Object.entries(T.byName)) { if (!names.has(n)) fail('tags name has no entry: ' + n); for (const x of t) if (!T.labels[x]) fail(n + ' bad tag ' + x); }
for (const [c, t] of Object.entries(T.byCat)) { if (!cs.has(c)) fail('tags for unknown category ' + c); for (const x of t) if (!T.labels[x]) fail(c + ' bad tag ' + x); }
const grouped = T.groups.flatMap(g => g[1]);
for (const c of cs) { if (grouped.filter(x => x === c).length !== 1) fail('category not in exactly one group: ' + c); if (!T.blurbs[c]) fail('no blurb for ' + c); }
for (const c of grouped) if (!cs.has(c)) fail('group has unknown category: ' + c);
for (const n of T.start || []) if (!names.has(n)) fail('start name has no entry: ' + n);
console.log(E.length + ' entries,', bad + ' problems'); process.exit(bad ? 1 : 0);
