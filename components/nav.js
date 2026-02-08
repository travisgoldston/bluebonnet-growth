/**
 * Navigation component loader and mobile menu toggle
 * Bluebonnet Growth - McKinney, Texas
 */
(function() {
  // Mobile menu toggle
  document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.querySelector('.nav-menu');
    
    if (toggle && menu) {
      toggle.addEventListener('click', function() {
        menu.classList.toggle('active');
        toggle.setAttribute('aria-expanded', menu.classList.contains('active'));
      });
    }
  });
})();
