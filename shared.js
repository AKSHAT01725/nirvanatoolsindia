// shared.js — Nirvana Tools India Pvt. Ltd.
(function () {

  /* ── NAV SCROLL EFFECT ── */
  const nav = document.querySelector('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  /* ── MOBILE NAV ── */
  const toggle   = document.querySelector('.nav-toggle');
  const overlay  = document.querySelector('.nav-mobile-overlay');
  const backdrop = document.querySelector('.nav-mobile-backdrop');
  const closeBtn = document.querySelector('.nav-mobile-close');

  function openMenu() {
    overlay.classList.add('open');
    toggle.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    overlay.classList.remove('open');
    toggle.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (toggle)   toggle.addEventListener('click', () => overlay.classList.contains('open') ? closeMenu() : openMenu());
  if (backdrop) backdrop.addEventListener('click', closeMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  // Close on ESC
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

  // Close when a nav link is tapped
  document.querySelectorAll('.nav-mobile-links a').forEach(a => {
    a.addEventListener('click', closeMenu);
  });

  /* ── INTERSECTION OBSERVER (fade animations) ── */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.fade-up, .fade-left, .fade-right').forEach(el => {
    el.style.transitionDelay = el.dataset.delay || '0ms';
    observer.observe(el);
  });

  /* ── STAGGERED CHILDREN ── */
  document.querySelectorAll('[data-stagger]').forEach(parent => {
    Array.from(parent.children).forEach((child, i) => {
      child.classList.add('fade-up');
      child.style.transitionDelay = `${i * 90}ms`;
      observer.observe(child);
    });
  });

})();