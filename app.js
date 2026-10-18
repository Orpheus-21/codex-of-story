const slug = n => n.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/['’]/g, '').replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const all = (window.CODEX || []).slice().sort((a, b) => a.n.localeCompare(b.n));
const cats = [...new Set(window.CODEX.map(e => e.cat))];
const bySlug = new Map(all.map(e => [slug(e.n), e]));
const $ = id => document.getElementById(id);
let cat = '';
let form = '';
let onlyStars = false;
let start = false;
let openAll = false;
let hits = [];
// Stars live in the browser only. A blocked store leaves them in memory for this visit.
let stars = new Set();
try { stars = new Set(JSON.parse(localStorage.getItem('codex-stars') || '[]')); } catch (e) {}
const saveStars = () => { try { localStorage.setItem('codex-stars', JSON.stringify([...stars])); } catch (e) {} };
const tagsOf = e => TAGS.byName[e.n] || TAGS.byCat[e.cat] || [];
const startSet = new Set(TAGS.start);
const counts = {};
all.forEach(e => { counts[e.cat] = (counts[e.cat] || 0) + 1; });
const params = new URLSearchParams(location.search);

const letter = e => e.n.normalize('NFD')[0].toUpperCase();
const FIELDS = [['w', 'What it does'], ['u', 'When to use it'], ['m', 'Common misuse'], ['x', 'Examples']];
const esc = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

function render(e) {
  const s = slug(e.n);
  const rel = (e.r || []).map(n => bySlug.has(slug(n)) ? `<a href="#${slug(n)}" data-go="${slug(n)}">${esc(n)}</a>` : esc(n)).join(', ');
  return `<article id="${s}" data-l="${letter(e)}"${openAll ? ' class="open"' : ''}><div class="head"><h2><a href="#${s}">${esc(e.n)}</a></h2><span><button class="more sans" data-o="${s}" aria-expanded="${openAll}">${openAll ? 'Less' : 'More'}</button> <button class="star sans" data-s="${s}" aria-pressed="${stars.has(s)}" aria-label="Star ${esc(e.n)}">${stars.has(s) ? 'Starred' : 'Star'}</button></span></div>
<p class="meta">${esc(e.cat)}${e.aka ? ` · aka <em>${esc(e.aka)}</em>` : ''}</p>
<p class="def">${esc(e.d)}</p><dl>${FIELDS.filter(([k]) => e[k]).map(([k, l]) => `<dt>${l}</dt><dd>${esc(e[k])}</dd>`).join('')}${rel ? `<dt>See also</dt><dd class="rel">${rel}</dd>` : ''}</dl></article>`;
}

// The search text and the category live in the address, so a reader can share a filtered list.
function sync() {
  const p = new URLSearchParams();
  if ($('q').value.trim()) p.set('q', $('q').value.trim());
  if (cat) p.set('cat', cat);
  if (form) p.set('for', form);
  if (start) p.set('start', '1');
  if (openAll) p.set('open', '1');
  if (onlyStars) p.set('starred', '1');
  history.replaceState(null, '', (p.toString() ? '?' + p : location.pathname) + location.hash);
}

function show() {
  const q = $('q').value.trim().toLowerCase();
  const hit = all.filter(e => (!cat || e.cat === cat) && (!start || startSet.has(e.n)) && (!form || tagsOf(e).includes(form)) && (!onlyStars || stars.has(slug(e.n))) && (!q || [e.n, e.aka, e.d, e.w, e.u, e.m, e.x].join(' ').toLowerCase().includes(q)));
  hits = hit;
  $('rand').disabled = !hit.length;
  $('openall').setAttribute('aria-pressed', openAll);
  $('openall').textContent = openAll ? 'Collapse all' : 'Expand all';
  $('list').innerHTML = hit.length ? hit.map(render).join('') : '<p class="none">No entry matches. Try fewer words.</p>';
  $('count').textContent = `${hit.length} of ${all.length} entries`;
  $('az').innerHTML = [...new Set(hit.map(letter))].map(l => `<button>${l}</button>`).join('');
  document.querySelectorAll('#cats button').forEach(b => b.setAttribute('aria-pressed', b.dataset.c === cat && !start));
  $('start').setAttribute('aria-pressed', start);
  $('blurb').textContent = start ? 'About 40 basic terms. Read these first.' : cat ? TAGS.blurbs[cat] : '';
  document.querySelectorAll('#fors button').forEach(b => b.setAttribute('aria-pressed', (b.dataset.f || '') === form));
  $('starred').setAttribute('aria-pressed', onlyStars);
  $('starred').textContent = `Starred (${stars.size})`;
  $('copy').hidden = !onlyStars || !stars.size;
  sync();
}

$('cats').innerHTML = '<div class="grp"><button id="start" title="About 40 basic terms to read first">Start here</button><button data-c="">All</button></div>' + TAGS.groups.map(([g, cs]) => `<div class="grp"><span class="sans">${g}</span>${cs.map(c => `<button data-c="${esc(c)}" title="${esc(TAGS.blurbs[c])}">${esc(c)} <small>${counts[c]}</small></button>`).join('')}</div>`).join('');
$('cats').onclick = ev => {
  const b = ev.target.closest('button');
  if (!b || b.id === 'start') return;
  cat = b.dataset.c;
  start = false;
  show();
};
$('start').onclick = () => { start = !start; if (start) cat = ''; show(); };
$('fors').innerHTML = '<span class="sans">For</span><button>All</button>' + Object.entries(TAGS.labels).map(([k, v]) => `<button data-f="${k}">${v}</button>`).join('');
$('fors').onclick = ev => {
  if (ev.target.tagName !== 'BUTTON') return;
  form = ev.target.dataset.f || '';
  show();
};
// An entry opens when a link, a random pick or the address points at it.
function openTo(id) {
  const el = $(id);
  if (!el) return;
  el.classList.add('open');
  el.querySelector('.more').textContent = 'Less';
  el.querySelector('.more').setAttribute('aria-expanded', true);
  el.scrollIntoView();
  el.classList.remove('flash');
  void el.offsetWidth;
  el.classList.add('flash');
}
$('rand').onclick = () => {
  if (!hits.length) return;
  const cur = location.hash.slice(1);
  const pool = hits.length > 1 ? hits.filter(e => slug(e.n) !== cur) : hits;
  const id = slug(pool[Math.floor(Math.random() * pool.length)].n);
  history.replaceState(null, '', location.search + '#' + id);
  openTo(id);
};
$('openall').onclick = () => { openAll = !openAll; show(); };
window.onhashchange = () => openTo(location.hash.slice(1));
$('starred').onclick = () => { onlyStars = !onlyStars; show(); };
$('copy').onclick = async () => {
  const text = all.filter(e => stars.has(slug(e.n))).map(e => `${e.n}: ${e.d}`).join('\n');
  try { await navigator.clipboard.writeText(text); $('copy').textContent = 'Copied'; } catch (e) { $('copy').textContent = 'Copy failed'; }
  setTimeout(() => { $('copy').textContent = 'Copy as text'; }, 1500);
};
$('q').oninput = show;
$('az').onclick = ev => {
  const a = ev.target.tagName === 'BUTTON' && document.querySelector(`[data-l="${ev.target.textContent}"]`);
  if (a) a.scrollIntoView();
};
$('top').onclick = () => window.scrollTo(0, 0);
// / focuses the search box, and Escape clears it.
document.addEventListener('keydown', ev => {
  if (ev.key === 'r' && !ev.ctrlKey && !ev.metaKey && !ev.altKey && !/INPUT|TEXTAREA/.test(document.activeElement.tagName)) $('rand').click();
  else if (ev.key === '/' && document.activeElement !== $('q')) { ev.preventDefault(); $('q').focus(); }
  else if (ev.key === 'Escape' && document.activeElement === $('q')) { $('q').value = ''; show(); }
});
// A related link to an entry that the filter hides clears the filter first.
$('list').onclick = ev => {
  const more = ev.target.dataset && ev.target.dataset.o;
  if (more) {
    const el = $(more), open = el.classList.toggle('open');
    ev.target.textContent = open ? 'Less' : 'More';
    ev.target.setAttribute('aria-expanded', open);
    return;
  }
  const star = ev.target.dataset && ev.target.dataset.s;
  if (star) {
    stars.has(star) ? stars.delete(star) : stars.add(star);
    saveStars();
    if (onlyStars) show();
    else { ev.target.setAttribute('aria-pressed', stars.has(star)); ev.target.textContent = stars.has(star) ? 'Starred' : 'Star'; $('starred').textContent = `Starred (${stars.size})`; }
    return;
  }
  const id = ev.target.dataset && ev.target.dataset.go;
  if (id && !$(id)) { $('q').value = ''; cat = ''; form = ''; onlyStars = false; start = false; show(); }
};
$('q').value = params.get('q') || '';
cat = cats.includes(params.get('cat')) ? params.get('cat') : '';
form = TAGS.labels[params.get('for')] ? params.get('for') : '';
onlyStars = params.get('starred') === '1';
start = params.get('start') === '1';
openAll = params.get('open') === '1';
show();
openTo(location.hash.slice(1));
