// Enhanced animated portfolio: accessible scroll reveals, mobile navigation and gentle parallax.
(() => {
  'use strict';
  const root = document.documentElement;
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  let hasMotion = !motionPreference.matches;
  if (hasMotion) root.classList.add('motion-enabled');

  document.addEventListener('DOMContentLoaded', () => {
    root.dataset.portfolioInit = 'ready';
    const mobile = document.querySelector('.nav-mobile');
    const nav = document.querySelector('.navlinks');
    if (mobile && nav) {
      mobile.addEventListener('click', () => {
        const open = nav.classList.toggle('open');
        mobile.setAttribute('aria-expanded', String(open));
        mobile.textContent = open ? 'Close ✕' : 'Menu ☰';
      });
      nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
        nav.classList.remove('open');
        mobile.textContent = 'Menu ☰';
        mobile.setAttribute('aria-expanded', 'false');
      }));
    }

    const sections = document.querySelectorAll('.reveal');
    const show = (el) => {
      if (el.classList.contains('visible')) return;
      el.classList.add('visible');
      if (!hasMotion) return;
      if (el.classList.contains('work-card')) {
        const cards = [...document.querySelectorAll('.work-card')];
        el.style.setProperty('--motion-delay', String((cards.indexOf(el) % 2) * 115) + 'ms');
      }
      el.classList.add('animate-now');
      el.addEventListener('animationend', (e) => {
        if (e.target === el) el.classList.remove('animate-now');
      }, { once: true });
    };
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            show(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -3% 0px' });
      sections.forEach(el => observer.observe(el));
    } else sections.forEach(show);

    document.querySelectorAll('.service-item').forEach(d => d.addEventListener('toggle', () => {
      if (d.open) document.querySelectorAll('.service-item').forEach(other => {
        if (other !== d) other.open = false;
      });
    }));
    document.getElementById('year')?.replaceChildren(document.createTextNode(String(new Date().getFullYear())));

    const portrait = document.querySelector('.hero-img');
    let ticking = false;
    const updateScroll = () => {
      ticking = false;
      if (!portrait || !hasMotion || window.scrollY > 850) return;
      portrait.style.setProperty('--portrait-drift', String(Math.round(Math.max(0,window.scrollY) * 0.14)) + 'px');
    };
    window.addEventListener('scroll', () => {
      if (!ticking && hasMotion) {
        ticking = true;
        requestAnimationFrame(updateScroll);
      }
    }, { passive: true });

    const preferenceChanged = () => {
      hasMotion = !motionPreference.matches;
      root.classList.toggle('motion-enabled', hasMotion);
      if (!hasMotion) {
        sections.forEach(el => el.classList.remove('animate-now'));
        portrait?.style.removeProperty('--portrait-drift');
      }
    };
    if (typeof motionPreference.addEventListener === 'function') {
      motionPreference.addEventListener('change', preferenceChanged);
    } else if (typeof motionPreference.addListener === 'function') {
      motionPreference.addListener(preferenceChanged);
    }
  });
})();