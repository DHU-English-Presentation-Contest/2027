// Scale the fixed 1440px design to the viewport width.
(function () {
  const root = document.documentElement;
  function fit() {
    const w = window.innerWidth;
    // < 768px: 390px mobile design; otherwise the 1440px desktop design
    const scale = w < 768 ? w / 390 : Math.min(1, w / 1440);
    root.style.setProperty('--scale', scale);
    // Desktop hero always fills exactly one screen (and shows nothing else):
    // shorter screens shrink it, taller screens add space and center it on the grid.
    const vh = window.innerHeight / scale;            // viewport height in design px
    const hs = w < 768 ? 1 : Math.min(1, vh / 816);
    const extra = w < 768 ? 0 : Math.max(0, vh - 816);
    root.style.setProperty('--hs', hs);
    root.style.setProperty('--hh', w < 768 ? 816 : Math.max(vh, 816 * hs));
    root.style.setProperty('--hoff', Math.floor(extra / 2 / 24) * 24);
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
        out += resolved || /[\s—–\/.:,()’'\-→↓↵]/.test(ch) ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0];
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

  // Every sheet (hero included) reveals when it enters the viewport,
  // after web fonts are ready so text doesn't jump mid-animation.
  const fontsReady = Promise.race([
    document.fonts ? document.fonts.ready : Promise.resolve(),
    new Promise((r) => setTimeout(r, 1500)), // don't wait forever on slow font loads
  ]);
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      io.unobserve(e.target);
      fontsReady.then(() => reveal(e.target));
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.sheet').forEach((s) => io.observe(s));

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

  // ---------- Top bar ----------
  const bar = document.getElementById('topbar');

  // Highlight the section currently in view
  const barLinks = [...bar.querySelectorAll('[data-section]')];
  const secIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const id = e.target.id.replace(/^m-/, '');
      barLinks.forEach((a) => a.classList.toggle('is-active', a.dataset.section === id));
    });
  }, { rootMargin: '-45% 0px -45% 0px' });
  document.querySelectorAll('#teams, #people, #m-teams, #m-people').forEach((s) => secIO.observe(s));

  // ---------- Mobile menu ----------
  const menu = document.getElementById('menu');
  const burgers = [...document.querySelectorAll('.burger')];
  let lastBurger = null;
  function openMenu(btn) {
    lastBurger = btn;
    menu.hidden = false;
    document.body.classList.add('menu-open');
    burgers.forEach((b) => b.setAttribute('aria-expanded', 'true'));
    requestAnimationFrame(() => requestAnimationFrame(() => menu.classList.add('open')));
    menu.focus({ preventScroll: true });
  }
  function closeMenu() {
    if (menu.hidden) return;
    menu.classList.remove('open');
    document.body.classList.remove('menu-open');
    burgers.forEach((b) => b.setAttribute('aria-expanded', 'false'));
    setTimeout(() => { menu.hidden = true; }, REDUCED ? 0 : 300);
    if (lastBurger) lastBurger.focus({ preventScroll: true });
  }
  burgers.forEach((b) => b.addEventListener('click', () => openMenu(b)));
  menu.querySelector('.menu-close').addEventListener('click', closeMenu);
  menu.querySelectorAll('.menu-links a').forEach((a) => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });

  // CTA: decode the label on hover (the arrow keeps its own animation)
  document.querySelectorAll('.cta').forEach((a) => {
    const label = a.querySelector('span');
    a.addEventListener('mouseenter', () => decode(label, 450));
  });

  document.querySelectorAll('[data-hover-decode]').forEach((a) => a.addEventListener('mouseenter', () => decode(a, 400)));
});



document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('team-modal');
  if (!modal) return; // pages without team cards (about.html)
  const $ = (id) => document.getElementById(id);
  let opener = null;

  function open(key, btn) {
    const t = TEAMS[key];
    if (!t) return;
    $('modal-img').src = `teams/${key}/${key}_main.jpg`;
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
