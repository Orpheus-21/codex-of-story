// Loads the entry files in data/ and shares the slug rule with the build and the check.
import fs from 'node:fs'; import vm from 'node:vm';
export const slug = n => n.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/['’]/g, '').replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const ctx = { window: {} }; vm.createContext(ctx);
for (const f of fs.readdirSync('data').sort()) vm.runInContext(fs.readFileSync('data/' + f, 'utf8'), ctx, { filename: f });
export const entries = ctx.window.CODEX || [];
export const tags = ctx.window.TAGS;
