/**
 * Navigation: mobile menu, sticky header tone, scroll reveal
 */
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.querySelector('.nav-menu');
    const header = document.querySelector('.site-header');

    if (toggle && menu) {
      toggle.addEventListener('click', function() {
        menu.classList.toggle('active');
        toggle.setAttribute('aria-expanded', menu.classList.contains('active'));
      });
    }

    if (header) {
      var onScroll = function() {
        var y = window.scrollY || 0;
        if (y > 24) {
          header.classList.add('site-header--scrolled');
        } else {
          header.classList.remove('site-header--scrolled');
        }
      };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      var revealEls = document.querySelectorAll('.reveal-on-scroll');
      if (revealEls.length && 'IntersectionObserver' in window) {
        var io = new IntersectionObserver(
          function(entries) {
            entries.forEach(function(entry) {
              if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                io.unobserve(entry.target);
              }
            });
          },
          { root: null, rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
        );
        revealEls.forEach(function(el) {
          io.observe(el);
        });
      } else if (revealEls.length) {
        revealEls.forEach(function(el) {
          el.classList.add('is-visible');
        });
      }
    } else {
      document.querySelectorAll('.reveal-on-scroll').forEach(function(el) {
        el.classList.add('is-visible');
      });
    }
  });
})();
