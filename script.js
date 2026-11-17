// Scale the fixed 1440px design to the viewport width.
(function () {
  const root = document.documentElement;
  function fit() {
    const scale = Math.min(1, window.innerWidth / 1440);
    root.style.setProperty('--scale', scale);
  }
  fit();
  window.addEventListener('resize', fit);
})();

// ---------- Motion ----------
const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/#+=';

// Scramble text, then resolve it left to right (keeps widths: mono font).
function decode(el, duration = 700) {
  if (REDUCED || el.dataset.decoding) return;
  el.dataset.decoding = '1';
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push({ node: walker.currentNode, text: walker.currentNode.nodeValue });
  const total = nodes.reduce((n, t) => n + t.text.length, 0) || 1;
  const start = performance.now();
  function frame(now) {
    const p = Math.min(1, (now - start) / duration);
    let offset = 0;
    for (const t of nodes) {
      let out = '';
      for (let i = 0; i < t.text.length; i++) {
        const ch = t.text[i];
        const resolved = (offset + i) / total < p;
        out += resolved || /[\s—–\/.:,()’'-]/.test(ch) ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }
      t.node.nodeValue = out;
      offset += t.text.length;
    }
    if (p < 1) requestAnimationFrame(frame);
    else { nodes.forEach((t) => (t.node.nodeValue = t.text)); delete el.dataset.decoding; }
  }
  requestAnimationFrame(frame);
}

function reveal(section) {
  if (section.classList.contains('in')) return;
  section.classList.add('in');
  section.querySelectorAll('[data-decode]').forEach((el) => {
    if (el.closest('.card')) return;
    const delay = parseFloat(el.dataset.delay || '0.2') * 1000;
    setTimeout(() => decode(el), delay);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // Wrap section headings so they can rise from a mask
  document.querySelectorAll('.rise').forEach((h) => {
    const inner = document.createElement('span');
    while (h.firstChild) inner.appendChild(h.firstChild);
    h.appendChild(inner);
  });
  // Stagger indexes
  document.querySelectorAll('.sheet').forEach((sec) => {
    sec.querySelectorAll('.gh, .gv').forEach((g, i) => g.style.setProperty('--i', i));
    sec.querySelectorAll('.card').forEach((c, i) => c.style.setProperty('--i', i % 2));
    sec.querySelectorAll('.ph').forEach((c, i) => c.style.setProperty('--i', i));
  });

  const sheets = [...document.querySelectorAll('.sheet')];
  const hero = sheets[0];
  // Hero plays once fonts are ready (avoids a jump mid-animation)
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => requestAnimationFrame(() => reveal(hero)));

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { reveal(e.target); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  sheets.slice(1).forEach((s) => io.observe(s));

  // Each team card reveals when it comes into view
  const cardIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      e.target.querySelectorAll('[data-decode]').forEach((el) => setTimeout(() => decode(el), 500 + (+getComputedStyle(e.target).getPropertyValue('--i') || 0) * 120));
      cardIO.unobserve(e.target);
    });
  }, { threshold: 0.2 });
  document.querySelectorAll('.card').forEach((c) => cardIO.observe(c));

  document.querySelectorAll('[data-hover-decode]').forEach((a) => a.addEventListener('mouseenter', () => decode(a, 400)));
});

// Team data shown in the modal (from each team's info doc).
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

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('team-modal');
  const $ = (id) => document.getElementById(id);
  let opener = null;

  function open(key, btn) {
    const t = TEAMS[key];
    if (!t) return;
    $('modal-img').src = `images/${key}.jpg`;
    $('modal-img').alt = `Team ${t.team}`;
    $('modal-lbl').textContent = t.label;
    $('modal-proj').textContent = t.project;
    $('modal-team').textContent = t.team;
    const ul = $('modal-members');
    ul.replaceChildren(...t.members.map((name) => {
      const li = document.createElement('li');
      li.textContent = name;
      return li;
    }));
    $('modal-about-cap').hidden = !t.about;
    $('modal-about').hidden = !t.about;
    $('modal-about').textContent = t.about || '';
    opener = btn;
    modal.showModal();
  }

  document.querySelectorAll('.card[data-team]').forEach((btn) => {
    btn.addEventListener('click', () => open(btn.dataset.team, btn));
  });

  modal.querySelector('[data-close]').addEventListener('click', () => modal.close());
  // Close when clicking the backdrop
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.close(); });
  modal.addEventListener('close', () => {
    if (opener) opener.focus();
    if (location.hash.startsWith('#team-')) history.replaceState(null, '', location.pathname);
  });

  // Deep link: index.html#team-nun-tan opens that team's modal
  const m = location.hash.match(/^#team-(.+)$/);
  if (m) open(m[1], document.querySelector(`.card[data-team="${m[1]}"]`));
});
