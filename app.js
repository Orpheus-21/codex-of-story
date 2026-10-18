const slug = n => n.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const all = (window.CODEX || []).slice().sort((a, b) => a.n.localeCompare(b.n));
const cats = [...new Set(window.CODEX.map(e => e.cat))];
const bySlug = new Map(all.map(e => [slug(e.n), e]));
const $ = id => document.getElementById(id);
let cat = '';
const params = new URLSearchParams(location.search);

const FIELDS = [['w', 'What it does'], ['u', 'When to use it'], ['m', 'Common misuse'], ['x', 'Examples']];
const esc = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

function render(e) {
  const s = slug(e.n);
  const rel = (e.r || []).map(n => bySlug.has(slug(n)) ? `<a href="#${slug(n)}" data-go="${slug(n)}">${esc(n)}</a>` : esc(n)).join(', ');
  return `<article id="${s}"><h2><a href="#${s}">${esc(e.n)}</a></h2>
<p class="meta">${esc(e.cat)}${e.aka ? ` · aka <em>${esc(e.aka)}</em>` : ''}</p>
<p class="def">${esc(e.d)}</p><dl>${FIELDS.filter(([k]) => e[k]).map(([k, l]) => `<dt>${l}</dt><dd>${esc(e[k])}</dd>`).join('')}${rel ? `<dt>See also</dt><dd class="rel">${rel}</dd>` : ''}</dl></article>`;
}

// The search text and the category live in the address, so a reader can share a filtered list.
function sync() {
  const p = new URLSearchParams();
  if ($('q').value.trim()) p.set('q', $('q').value.trim());
  if (cat) p.set('cat', cat);
  history.replaceState(null, '', (p.toString() ? '?' + p : location.pathname) + location.hash);
}

function show() {
  const q = $('q').value.trim().toLowerCase();
  const hit = all.filter(e => (!cat || e.cat === cat) && (!q || [e.n, e.aka, e.d, e.w, e.u, e.m, e.x].join(' ').toLowerCase().includes(q)));
  $('list').innerHTML = hit.length ? hit.map(render).join('') : '<p class="none">No entry matches. Try fewer words.</p>';
  $('count').textContent = `${hit.length} of ${all.length} entries`;
  document.querySelectorAll('#cats button').forEach(b => b.setAttribute('aria-pressed', (b.textContent === 'All' ? '' : b.textContent) === cat));
  sync();
}

$('cats').innerHTML = ['All', ...cats].map(c => `<button>${c}</button>`).join('');
$('cats').onclick = ev => {
  if (ev.target.tagName !== 'BUTTON') return;
  cat = ev.target.textContent === 'All' ? '' : ev.target.textContent;
  show();
};
$('q').oninput = show;
// A related link to an entry that the filter hides clears the filter first.
$('list').onclick = ev => {
  const id = ev.target.dataset && ev.target.dataset.go;
  if (id && !$(id)) { $('q').value = ''; cat = ''; show(); }
};
$('q').value = params.get('q') || '';
cat = cats.includes(params.get('cat')) ? params.get('cat') : '';
show();
if (location.hash && $(location.hash.slice(1))) $(location.hash.slice(1)).scrollIntoView();
