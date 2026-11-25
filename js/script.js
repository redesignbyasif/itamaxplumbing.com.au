/* ITA MAX Plumbing: homepage interactions (vanilla JS, no dependencies) */
(function () {
  'use strict';

  var doc = document;
  var header = doc.getElementById('header');
  var nav = doc.getElementById('nav');
  var toggle = doc.getElementById('navToggle');
  var desktopMQ = window.matchMedia('(min-width: 1024px)');

  /* ---------- Mobile navigation ---------- */
  function setNavTop() {
    var bottom = header.getBoundingClientRect().bottom;
    doc.documentElement.style.setProperty('--nav-top', Math.max(0, Math.round(bottom)) + 'px');
  }
  function openNav() {
    setNavTop();
    nav.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close menu');
    doc.body.classList.add('menu-open');
  }
  function closeNav() {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
    doc.body.classList.remove('menu-open');
  }
  toggle.addEventListener('click', function () {
    nav.classList.contains('is-open') ? closeNav() : openNav();
  });
  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) closeNav();
  });
  doc.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) { closeNav(); toggle.focus(); }
  });
  var onMQ = function (e) { if (e.matches) closeNav(); };
  desktopMQ.addEventListener ? desktopMQ.addEventListener('change', onMQ) : desktopMQ.addListener(onMQ);
  window.addEventListener('resize', function () { if (nav.classList.contains('is-open')) setNavTop(); });

  /* ---------- Header shadow + floating call button ---------- */
  var fab = doc.getElementById('fab');
  var hero = doc.querySelector('.hero');
  var footer = doc.querySelector('.footer');
  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    header.classList.toggle('is-scrolled', y > 10);
    if (fab && hero) {
      var footerTop = footer ? footer.getBoundingClientRect().top : Infinity;
      // show after the hero, hide again once the footer (which has its own contact links) comes into view
      fab.classList.toggle('is-visible', y > hero.offsetTop + hero.offsetHeight - 200 && footerTop > window.innerHeight - 40);
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Active nav link ---------- */
  var links = Array.prototype.slice.call(doc.querySelectorAll('.nav__link'));
  if ('IntersectionObserver' in window) {
    var map = {};
    links.forEach(function (l) { map[l.getAttribute('href').slice(1)] = l; });
    var navIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && map[en.target.id]) {
          links.forEach(function (l) { l.classList.remove('is-active'); });
          map[en.target.id].classList.add('is-active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(map).forEach(function (id) { var s = doc.getElementById(id); if (s) navIO.observe(s); });
  }

  /* ---------- Services: desktop preview ---------- */
  var svcs = Array.prototype.slice.call(doc.querySelectorAll('.svc'));
  var pImg = doc.getElementById('svcPreviewImg');
  var pNum = doc.getElementById('svcPreviewNum');
  var pTitle = doc.getElementById('svcPreviewTitle');
  var swapTimer;
  function activate(item) {
    if (!item || item.classList.contains('is-active')) return;
    svcs.forEach(function (s) { s.classList.remove('is-active'); });
    item.classList.add('is-active');
    if (!pImg) return;
    var src = item.getAttribute('data-img');
    pNum.textContent = item.querySelector('.svc__num').textContent;
    pTitle.textContent = item.querySelector('.svc__title').textContent.trim();
    if (pImg.getAttribute('src') === src) return;
    clearTimeout(swapTimer);
    pImg.classList.add('is-swapping');
    swapTimer = setTimeout(function () {
      pImg.setAttribute('src', src);
      pImg.setAttribute('alt', item.getAttribute('data-alt') || '');
      pImg.classList.remove('is-swapping');
    }, 220);
  }
  svcs.forEach(function (s) {
    s.addEventListener('mouseenter', function () { if (desktopMQ.matches) activate(s); });
    s.addEventListener('click', function () { if (desktopMQ.matches) activate(s); });
  });
  if (svcs.length) svcs[0].classList.add('is-active');
  // preload preview images for instant swaps on desktop
  if (desktopMQ.matches) {
    svcs.forEach(function (s) { var i = new Image(); i.src = s.getAttribute('data-img'); });
  }

  /* ---------- FAQ: one open at a time ---------- */
  var faqs = Array.prototype.slice.call(doc.querySelectorAll('.faq__item'));
  faqs.forEach(function (d) {
    d.addEventListener('toggle', function () {
      if (d.open) faqs.forEach(function (o) { if (o !== d) o.open = false; });
    });
  });

  /* ---------- Quote form → pre-filled email (no backend, nothing is sent from the page) ---------- */
  var form = doc.getElementById('quote');
  var err = doc.getElementById('quoteError');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var required = Array.prototype.slice.call(form.querySelectorAll('[required]'));
      var firstBad = null;
      required.forEach(function (f) {
        var bad = !f.value.trim();
        f.classList.toggle('is-invalid', bad);
        f.setAttribute('aria-invalid', bad ? 'true' : 'false');
        if (bad && !firstBad) firstBad = f;
      });
      if (firstBad) { err.hidden = false; firstBad.focus(); return; }
      err.hidden = true;

      var data = new FormData(form);
      var type = data.get('type') || 'General plumbing request';
      var subject = 'Quote request: ' + type + ' (' + data.get('name') + ')';
      var body = [
        'Hi ITA MAX Plumbing,',
        '',
        'Request type: ' + type,
        'How I would like you to help: ' + data.get('help'),
        'When: ' + data.get('when'),
        '',
        'Description:',
        data.get('desc'),
        '',
        'Address: ' + data.get('address'),
        'Name: ' + data.get('name'),
        'Mobile: ' + data.get('phone'),
        '',
        'Thanks!'
      ].join('\n');
      window.location.href = 'mailto:info@itamaxplumbing.com.au?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    });
    form.addEventListener('input', function (e) {
      if (e.target.classList.contains('is-invalid') && e.target.value.trim()) {
        e.target.classList.remove('is-invalid');
        e.target.setAttribute('aria-invalid', 'false');
      }
    });
  }

  /* ---------- Reveal on scroll (progressive enhancement) ---------- */
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('IntersectionObserver' in window && !reduce) {
    var targets = doc.querySelectorAll('.section-head, .intro__head, .intro__text, .intro__media, .svc, .hotwater__media, .hotwater__copy, .clients__copy, .clients__list li, .why__item, .step, .member, .review, .area__copy, .area__map, .faq__intro, .faq__item, .contact__info, .quote, .cta__inner');
    var revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); revealIO.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    Array.prototype.forEach.call(targets, function (t) {
      // don't hide anything already on screen at load
      if (t.getBoundingClientRect().top < window.innerHeight) return;
      t.classList.add('reveal');
      revealIO.observe(t);
    });
  }

  /* ---------- Footer year ---------- */
  var yr = doc.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();
})();
