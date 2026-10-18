# The Codex of Story

A reference website of narrative structures, devices, tropes and literary figures, for working and aspiring authors.

The site is live at https://orpheus-21.github.io/codex-of-story/

## What it does

The site lists entries in categories. Each entry has a definition, the effect on the reader, when to use it, common misuse, examples, and links to related entries. The page shows the current number of entries.

The list is not complete. Tropes alone number in the tens of thousands. Check names, dates and quotes in an entry before you cite them.

The reader can:

* Search the text of all entries.
* Filter by category, and by the form of the work: novel, short story, screenplay, game or poetry. The category chips sit in four groups. A sentence under the chips explains the active category.
* Use the Start here chip to see about 40 basic terms.
* Read a compact list. Each entry shows its name and definition. The More button opens the rest of the entry. The Expand all button opens every entry.
* Open a random entry from the current filter with the Random button.
* Jump to a letter with the letter bar.
* Star entries, show only the starred entries, and copy them as text. The stars stay in the browser of the reader.
* Open one entry on its own page, such as `/e/chekhovs-gun/`.
* Download the whole codex as one Markdown file, `codex.md`.
* Print the list. Printing hides the search box and the buttons.

## Requirements

* A web browser, to read the site.
* Node.js, to run the scripts. The scripts use `node:fs` and `fs.cpSync`, which need Node.js 16.7 or later.

## Usage

Open `index.html` in a web browser. The site needs no server and no build step.

The address holds the state of the page. These parameters work:

* `q`: the search text.
* `cat`: the category name.
* `for`: one of `novel`, `short`, `screen`, `game` or `poetry`.
* `start=1`: show only the Start here terms.
* `starred=1`: show only the starred entries.
* `open=1`: open every entry.

Example: `?cat=Trope&q=love`.

The key `/` moves the focus to the search box. The key `Escape` clears the search text. The key `r` opens a random entry.

To check the data after an edit, run this command in the repo folder:

```
node check.mjs
```

The script prints the number of entries and the number of problems. It exits with a failure code when it finds a duplicate name, an empty required field, a related name that has no entry, a bad tag, a category that is not in exactly one group, a category with no sentence, or a Start here name that has no entry.

To build the site into the folder `_site`, run this command:

```
node build.mjs
```

## Add an entry

Add one object to a file in `data/`. Use this form:

```
{n:"Name",aka:"other name",d:"Definition.",w:"What it does to the reader.",u:"When to use it.",m:"Common misuse.",x:"Examples.",r:["Related name"]}
```

The fields `n`, `cat`, `d` and `w` are required. Set `cat` in the entry, or use the `map` call at the end of the file, which sets `cat` for every entry that has none. Each name in `r` must be the name of another entry.

Tags for the form filter are in `data/tags.js`. A category has a default list of tags. A name in `byName` replaces the default for that entry.

The same file holds the category groups (`groups`), the sentence for each category (`blurbs`) and the Start here names (`start`). A new category needs a tag list, one group and one sentence.

## How it works

* `index.html` loads the files in `data/` as scripts. Each file adds its entries to `window.CODEX`.
* `app.js` sorts the entries by name, draws them, and applies the search text and the filters.
* `style.css` sets the layout, the light and dark colors, the print style and the Volume Tc fonts from `fonts/`.
* `data.mjs` loads the data files for the two scripts. `check.mjs` checks the data. `build.mjs` writes the site, one static page for each entry, `sitemap.xml`, `robots.txt` and `codex.md`.

The GitHub Actions workflow in `.github/workflows/pages.yml` runs on each push to `main`. It runs `node check.mjs`, then `node build.mjs`, and deploys the folder `_site` to GitHub Pages. The deploy does not run when the check fails.

## License

This project uses the GNU General Public License, version 3 or any later version. The `LICENSE` file has the full text.
