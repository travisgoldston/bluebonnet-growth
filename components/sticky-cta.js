/**
 * Mobile sticky CTA
 * Shows after user scrolls a bit. Hides near page bottom.
 */
(function () {
  function createStickyCta() {
    if (document.querySelector('[data-sticky-cta="root"]')) return;

    const root = document.createElement('div');
    root.setAttribute('data-sticky-cta', 'root');
    root.className = 'sticky-cta';
    root.setAttribute('aria-hidden', 'true');

    const inner = document.createElement('div');
    inner.className = 'sticky-cta__inner';

    const a = document.createElement('a');
    a.className = 'btn btn-primary sticky-cta__button';
    a.href = 'contact';
    a.textContent = 'Start a Conversation';

    inner.appendChild(a);
    root.appendChild(inner);
    document.body.appendChild(root);
  }

  function shouldShow() {
    const y = window.scrollY || 0;
    if (y < 520) return false;

    const doc = document.documentElement;
    const bottomGap = (doc.scrollHeight - (y + window.innerHeight));
    if (bottomGap < 520) return false;

    return true;
  }

  function setVisible(visible) {
    const el = document.querySelector('[data-sticky-cta="root"]');
    if (!el) return;
    if (visible) {
      el.classList.add('is-visible');
      el.setAttribute('aria-hidden', 'false');
    } else {
      el.classList.remove('is-visible');
      el.setAttribute('aria-hidden', 'true');
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    createStickyCta();

    const onScroll = function () {
      setVisible(shouldShow());
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
  });
})();

