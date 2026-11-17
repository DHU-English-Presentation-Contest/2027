// ============================================================
// All site text lives here — edit once, desktop and mobile both update.
// Values may contain simple HTML (<br>, <time>, <small>).
// ============================================================

const TEXT = {
  // ---- Top bar / menu
  'brand': "English Presentation <br class=\"m-br\">Contest 2027 in DHU", // <br class="m-br"> = line break in the mobile footer only
  'nav.about': "ABOUT",
  'nav.teams': "TEAMS",
  'nav.people': "PEOPLE",
  'menu.no1': "01",
  'menu.no2': "02",
  'menu.no3': "03",
  'menu.foot': "ENGLISH PRESENTATION CONTEST 2027 in DHU<br>2027 / 01 / 28 (THU) — SURUGADAI HALL",
  // ---- Hero
  'hero.sheet': "SHEET 01 — THE GIFT",
  'hero.title1': "ENGLISH",
  'hero.title2': "PRESENTATION",
  'hero.title3': "CONTEST",
  'hero.year': "2027 in DHU",
  'hero.tagline': "20TH ANNIVERSARY — CHINA<br>A GIFT FROM NOW TO THE FUTURE",
  'hero.cta': "GRAB A CUP <i class=\"arrow\">→</i>",
  'hero.scroll': "SCROLL ↓",
  'hero.cup.section': "HALF SECTION",
  'hero.cup.dimension': "Ø 20 YEARS",
  'hero.table.head': "PROJECT No. 20",
  'hero.table.projectLabel': "PROJECT:",
  'hero.table.project': "ENGLISH PRESENTATION CONTEST 2027 in DHU",
  'hero.table.dateLabel': "DATE:",
  'hero.table.date': "<time datetime=\"2027-01-28\">2027 / 01 / 28 (THU)</time>     REV. 20",
  'hero.table.venueLabel': "VENUE:",
  'hero.table.venue': "SURUGADAI HALL",
  'hero.table.notesLabel': "NOTES:",
  'hero.table.notes': "IT’S GONNA BE GOOD. THAT’S THE TEA.",
  // ---- Teams
  'teams.sheet': "SHEET 02 — TEAMS",
  'teams.lead': "Grab a cup. Our students always have the best tea. That’s the tea.",
  'teams.groupSAB': "SA–B",
  'teams.countSAB': "3 TEAMS",
  'teams.groupCE': "C–E",
  'teams.countCE': "1 TEAM",
  // ---- People
  'people.sheet': "SHEET 03 — CREDITS",
  'people.lead': "MC, judges and our special thanks. Details coming soon.",
  'people.mc': "MC",
  'people.tba': "TBA",
  'people.nameAff': "Name / Affiliation",
  'people.judges': "JUDGES",
  'people.thanks': "SPECIAL THANKS",
  // ---- Footer
  'footer.note': "CHINA (n.) — porcelain; the traditional gift for a 20th anniversary.",
  'footer.copyright': "<small>©DHU-engprecon2027</small>",
};

// Teams: shown on the cards and in the modal (from each team's info doc).
// Photo: teams/<key>/<key>_main.jpg
const TEAMS = {
  'eigottesa-ez': {
    label: 'SA–B  /  TEAM 01',
    project: 'inEX',
    team: 'EigotteSA, Ez   /   英語ってSA, Ez',
    members: ['Nobuteru Mamiya', 'Maiko Zen', 'Aishah Iwamura', 'Marin Honoki', 'Youmi Nagase', 'Masayoshi Hosokawa', 'Misaki Nishihara', 'Daiki Nagai', 'Nanasa Azuma', 'Yunosuke Kimura', 'Momoka Nakanishi', 'Soomin Sim', 'Shu Izumi', 'Koichi Masayama', 'Ginga Parent', 'Makiko Ebata Yamada'],
  },
  'nun-tan': {
    label: 'SA–B  /  TEAM 02',
    project: 'Who’s attractive to the opposite sex, by generation?',
    team: 'Nun-tan',
    members: ['Arashi Otsuka'],
  },
  'rono': {
    label: 'SA–B  /  TEAM 03',
    project: 'Paleo Collect',
    team: 'Rono',
    members: ['Riku Mito'],
  },
  'were-creatures': {
    label: 'C–E  /  TEAM 04',
    project: 'Exploration Adventure Game',
    team: 'We’re Creatures',
    members: ['Natsume Tsukamoto', 'Yukino Kurata', 'Misora Sugano', 'Sayoko Ishii', 'Yui Mizoguchi', 'Ruri Nakamura'],
    about: 'Explore the town, collect items, talk to its residents, and search for your parents. The theme of this game is love. There are multiple endings, and the choices you make throughout the game will determine which ending you reach.',
  },
};

// Fill the page from TEXT / TEAMS (runs before script.js; both are deferred).
(function fill() {
  document.querySelectorAll('[data-text]').forEach((el) => {
    const v = TEXT[el.dataset.text];
    if (v !== undefined) el.innerHTML = v;
  });
  document.querySelectorAll('.card[data-team]').forEach((card) => {
    const t = TEAMS[card.dataset.team];
    if (!t) return;
    card.querySelectorAll('[data-field]').forEach((el) => { el.textContent = t[el.dataset.field]; });
    const img = card.querySelector('img');
    if (img) img.alt = `Team ${t.team}`;
  });
})();
