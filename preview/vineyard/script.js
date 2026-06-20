(function () {
  var toggle = document.querySelector('[data-nav-toggle]');
  var drawer = document.querySelector('[data-nav-drawer]');
  if (toggle && drawer) {
    toggle.addEventListener('click', function () {
      var open = drawer.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  document.querySelectorAll('[data-faq]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.v-faq-item');
      if (item) item.classList.toggle('is-open');
    });
  });
})();
