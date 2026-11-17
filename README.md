# DHU English Presentation Contest 2027

[English](#english) | [日本語](#日本語)

**Live site / 公開サイト:** https://dhu-epc.github.io/2027/

---

## English

Website for the DHU English Presentation Contest 2027 (short: DHU EPC) — the 20th contest (2027-01-28, Surugadai Hall).
Static HTML/CSS/JS — open `index.html` in a browser, no build step.

### Files

- `index.html` — top page (hero / teams / people / footer), desktop and mobile layouts
- `about.html` — About page (the contest, event information, why a blueprint, why a teacup)
- `content.js` — **all text and team data. Edit text here only; desktop, mobile and both pages use it**
- `style.css` — layout on a 24px grid (desktop 1440px / mobile 390px designs, scaled to the screen), motion
- `script.js` — scaling, scroll reveal / decode animations, menu, team modal
- `teams/<team-name>/<team-name>_main.jpg` — team photos, same folder/file names as the Drive submission folder (resized to 1600px)

### How to update

- **Text** — open `content.js` and change the value next to the key (e.g. `'about.info.time': "TBA"`).
  Simple HTML is allowed (`<br>`). `<br class="m-br">` breaks the line in the mobile footer only.
- **Teams** — add the team to `TEAMS` in `content.js`, put the photo at
  `teams/<team-name>/<team-name>_main.jpg` (3:2), and add a card in `index.html` (copy an existing one).
- **People (MC / judges / special thanks)** — names are still placeholders (`people.tba`, `people.nameAff`).
- **Publish** — push to `main`. GitHub Pages rebuilds the site in about a minute.

### Design rules

- 24px grid. Headings: top and bottom of the letters on grid lines. Small text: baseline on a grid line.
- Guide lines touch the text they mark but never overlap it.
- Left-aligned text starts just right of the column line (desktop x=98, mobile x=28).

Design source: Figma file "whole" → page "design — teacup".

---

## 日本語

DHU English Presentation Contest 2027（略称：DHU EPC）の公式サイトです。第20回大会（2027年1月28日、駿河台ホール）。
HTML / CSS / JavaScript だけで作った静的サイトです。ビルドは不要で、`index.html` をブラウザで開けば表示できます。

### ファイル構成

- `index.html` — トップページ（Hero / チーム / 出演者 / フッター）。パソコン版とスマホ版の両方を含みます
- `about.html` — ABOUT ページ（大会について、開催情報、なぜ青写真か、なぜティーカップか）
- `content.js` — **サイトの文章とチーム情報のすべて。文章はここだけで直します。** パソコン版・スマホ版・両方のページに反映されます
- `style.css` — 24px の方眼に沿ったレイアウト（パソコン版 1440px、スマホ版 390px の設計を画面幅に合わせて拡大・縮小）とアニメーション
- `script.js` — 拡大・縮小、スクロールに合わせた表示や文字のデコード演出、メニュー、チームのモーダル
- `teams/<チーム名>/<チーム名>_main.jpg` — チーム写真。ドライブの提出フォルダと同じフォルダ名・ファイル名です（1600px に縮小済み）

### 更新のしかた

- **文章** — `content.js` を開き、項目名の横の文字を書き換えます（例：`'about.info.time': "TBA"`）。
  `<br>` で改行できます。`<br class="m-br">` は、スマホ版のフッターでだけ改行します。
- **チーム** — `content.js` の `TEAMS` にチームを追加し、写真を `teams/<チーム名>/<チーム名>_main.jpg`（3:2）に置きます。
  そのうえで、`index.html` にカードを追加します（既存のカードをコピーして使ってください）。
- **出演者（MC / 審査員 / Special Thanks）** — 名前はまだ仮の表示です（`people.tba`、`people.nameAff`）。
- **公開** — `main` ブランチに push します。1分ほどで GitHub Pages に反映されます。

### デザインの決まり

- 24px の方眼に合わせます。見出しは、文字の上端と下端を方眼の線に乗せます。小さい文字は、ベースラインを方眼の線に乗せます。
- ガイド線は、示している文字にぴったり接しますが、文字とは重ねません。
- 左寄せの文字は、左の縦線のすぐ右から書き始めます（パソコン版 x=98、スマホ版 x=28）。

デザインの元データ：Figma のファイル「whole」→ ページ「design — teacup」。
