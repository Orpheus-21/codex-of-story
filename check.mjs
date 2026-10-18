// Fails on empty required fields, duplicate slugs, or related names with no entry.
import fs from 'node:fs'; import vm from 'node:vm';
const ctx = { window: {} }; vm.createContext(ctx);
for (const f of fs.readdirSync('data').sort()) vm.runInContext(fs.readFileSync('data/' + f, 'utf8'), ctx, { filename: f });
const slug = n => n.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const E = ctx.window.CODEX || []; const seen = new Set(); let bad = 0;
const fail = m => { console.log(m); bad++; };
for (const e of E) for (const k of ['n', 'cat', 'd', 'w']) if (!e[k]) fail(`empty ${k}: ${e.n}`);
for (const e of E) { const s = slug(e.n); if (seen.has(s)) fail('duplicate: ' + e.n); seen.add(s); }
for (const e of E) for (const r of e.r || []) if (!seen.has(slug(r))) fail(`${e.n} -> missing "${r}"`);
const T = ctx.window.TAGS; const names = new Set(E.map(e => e.n)); const cs = new Set(E.map(e => e.cat));
for (const c of cs) if (!T.byCat[c]) fail('no tags for category ' + c);
for (const [n, t] of Object.entries(T.byName)) { if (!names.has(n)) fail('tags name has no entry: ' + n); for (const x of t) if (!T.labels[x]) fail(n + ' bad tag ' + x); }
for (const [c, t] of Object.entries(T.byCat)) { if (!cs.has(c)) fail('tags for unknown category ' + c); for (const x of t) if (!T.labels[x]) fail(c + ' bad tag ' + x); }
console.log(E.length + ' entries,', bad + ' problems'); process.exit(bad ? 1 : 0);
