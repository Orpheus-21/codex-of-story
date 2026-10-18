# The Codex of Story

A reference website of narrative structures, devices, tropes and literary figures, for working and aspiring authors.

## What it does

The site lists 591 entries in 13 categories. Each entry has a definition, the effect on the reader, when to use it, common misuse, examples, and links to related entries. The reader can search the text and filter by category. Each entry has its own link, such as `#chekhovs-gun`.

The list is not complete. Tropes alone number in the tens of thousands.

## Requirements

* A web browser, to read the site.
* Node.js, to run the data check.

## Usage

Open `index.html` in a web browser. The site needs no server and no build step.

To check the data after an edit, run this command in the repo folder:

```
node check.mjs
```

The script prints the number of entries and the number of problems. It exits with a failure code when it finds a duplicate name, an empty required field, or a related name that has no entry.

## Add an entry

Add one object to a file in `data/`. Use this form:

```
{n:"Name",aka:"other name",d:"Definition.",w:"What it does to the reader.",u:"When to use it.",m:"Common misuse.",x:"Examples.",r:["Related name"]}
```

The fields `n`, `d` and `w` are required. The field `cat` is set for the whole file by the `map` call at the end of the file. An entry can set its own `cat` to override it.

## How it works

The site has three parts:

* `index.html` loads the files in `data/` as scripts. Each file adds its entries to `window.CODEX`.
* `app.js` sorts the entries by name, draws them, and applies the search text and the category filter.
* `style.css` sets the layout, the light and dark colors, and the Volume Tc fonts from `fonts/`.

The GitHub Actions workflow in `.github/workflows/pages.yml` runs on each push to `main`. It runs `node check.mjs`, copies the site files to a folder, and deploys the folder to GitHub Pages. The deploy does not run when the check fails.

## License

This project uses the GNU General Public License, version 3 or any later version. The `LICENSE` file has the full text.
