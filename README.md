# DHU English Presentation Contest 2027

Website for the DHU English Presentation Contest 2027 (short: DHU EPC) — the 20th contest (2027-01-28, Surugadai Hall).

**Live site:** https://dhu-epc.github.io/2027/

Static HTML/CSS/JS — open `index.html` in a browser, no build step.

## Files

- `index.html` — top page (hero / teams / people / footer), desktop and mobile layouts
- `about.html` — About page (the contest, event information, why a blueprint, why a teacup)
- `content.js` — **all text and team data. Edit text here only; desktop, mobile and both pages use it**
- `style.css` — layout on a 24px grid (desktop 1440px / mobile 390px designs, scaled to the screen), motion
- `script.js` — scaling, scroll reveal / decode animations, menu, team modal
- `teams/<team-name>/<team-name>_main.jpg` — team photos, same folder/file names as the Drive submission folder (resized to 1600px)

## How to update

**Text** — open `content.js` and change the value next to the key (e.g. `'about.info.time': "TBA"`).
Simple HTML is allowed (`<br>`). `<br class="m-br">` breaks the line in the mobile footer only.

**Teams** — add the team to `TEAMS` in `content.js`, put the photo at
`teams/<team-name>/<team-name>_main.jpg` (3:2), and add a card in `index.html` (copy an existing one).

**People (MC / judges / special thanks)** — names are still placeholders (`people.tba`, `people.nameAff`).

**Publish** — push to `main`. GitHub Pages rebuilds the site in about a minute.

## Design rules

- 24px grid. Headings: top and bottom of the letters on grid lines. Small text: baseline on a grid line.
- Guide lines touch the text they mark but never overlap it.
- Left-aligned text starts just right of the column line (desktop x=98, mobile x=28).

Design source: Figma file "whole" → page "design — teacup".
