// Replay portfolio animations whenever elements re-enter the viewport.
(() => {
  'use strict';

  const root = document.documentElement;
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  let canAnimate = !motionPreference.matches;
  root.classList.toggle('motion-enabled', canAnimate);

  document.addEventListener('DOMContentLoaded', () => {
    root.dataset.portfolioInit = 'ready';

    const mobileButton = document.querySelector('.nav-mobile');
    const nav = document.querySelector('.navlinks');
    if (mobileButton && nav) {
      mobileButton.addEventListener('click', () => {
        const opened = nav.classList.toggle('open');
        mobileButton.setAttribute('aria-expanded', String(opened));
        mobileButton.textContent = opened ? 'Close ✕' : 'Menu ☰';
      });
      nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
        nav.classList.remove('open');
        mobileButton.textContent = 'Menu ☰';
        mobileButton.setAttribute('aria-expanded', 'false');
      }));
    }

    const sections = [...document.querySelectorAll('.reveal')];
    const workCards = [...document.querySelectorAll('.work-card')];
    const hero = document.querySelector('.hero');
    const portrait = document.querySelector('.hero-img');

    function enter(el) {
      if (el.classList.contains('visible')) return;
      el.classList.add('visible');
      if (!canAnimate) return;
      if (el.classList.contains('work-card')) {
        el.style.setProperty('--motion-delay', ((workCards.indexOf(el) % 2) * 220) + 'ms');
      }
      // Removing the running animation before re-entry makes it replay each time.
      el.classList.remove('animate-now');
      void el.offsetWidth;
      el.classList.add('animate-now');
    }

    function exit(el) {
      // No hidden state: reset animation classes only, never the content itself.
      el.classList.remove('animate-now', 'visible');
    }

    function isFullyOutside(el) {
      const rect = el.getBoundingClientRect();
      return rect.bottom < -60 || rect.top > window.innerHeight + 60;
    }

    function rearmOffscreenSections() {
      sections.forEach(el => {
        if (el.classList.contains('visible') && isFullyOutside(el)) exit(el);
      });
    }

    if ('IntersectionObserver' in window) {
      const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) enter(entry.target);
          else if (isFullyOutside(entry.target)) exit(entry.target);
        });
      }, { threshold: 0, rootMargin: '-5% 0px -9% 0px' });
      sections.forEach(section => sectionObserver.observe(section));

      if (hero) {
        const heroObserver = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            hero.classList.toggle(
              'motion-replay',
              canAnimate && entry.intersectionRatio >= 0.25
            );
          });
        }, { threshold: [0, 0.25, 0.5] });
        heroObserver.observe(hero);
      }
    } else {
      sections.forEach(enter);
      hero?.classList.toggle('motion-replay', canAnimate);
    }

    document.querySelectorAll('.service-item').forEach(item => {
      item.addEventListener('toggle', () => {
        if (item.open) {
          document.querySelectorAll('.service-item').forEach(other => {
            if (other !== item) other.open = false;
          });
        }
      });
    });

    document.getElementById('year')?.replaceChildren(
      document.createTextNode(String(new Date().getFullYear()))
    );

    let ticking = false;
    function updatePortrait() {
      ticking = false;
      rearmOffscreenSections();
      if (!portrait || !canAnimate) return;
      const scroll = Math.max(0, window.scrollY);
      if (scroll < 850) {
        portrait.style.setProperty('--portrait-drift', Math.round(scroll * 0.14) + 'px');
      } else {
        portrait.style.removeProperty('--portrait-drift');
      }
    }

    window.addEventListener('scroll', () => {
      if (!ticking && canAnimate) {
        ticking = true;
        window.requestAnimationFrame(updatePortrait);
      }
    }, { passive: true });

    function onMotionChange() {
      canAnimate = !motionPreference.matches;
      root.classList.toggle('motion-enabled', canAnimate);
      if (!canAnimate) {
        hero?.classList.remove('motion-replay');
        portrait?.style.removeProperty('--portrait-drift');
        sections.forEach(section => section.classList.remove('animate-now'));
      } else {
        // Re-arm only the animations already in view without hiding content.
        sections.filter(el => el.classList.contains('visible')).forEach(el => {
          exit(el);
          enter(el);
        });
        if (hero && hero.getBoundingClientRect().bottom > window.innerHeight * 0.25) {
          hero.classList.add('motion-replay');
        }
      }
    }
    if (typeof motionPreference.addEventListener === 'function') {
      motionPreference.addEventListener('change', onMotionChange);
    } else if (typeof motionPreference.addListener === 'function') {
      motionPreference.addListener(onMotionChange);
    }
  });
})();
