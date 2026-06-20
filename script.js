// Mobile nav toggle
(function initMobileNav() {
  const navToggle = document.querySelector('[data-nav-toggle]');
  const navDrawer = document.querySelector('[data-nav-drawer]');
  if (!navToggle || !navDrawer) return;

  navToggle.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    const isOpen = navDrawer.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    document.body.classList.toggle('nav-open', isOpen);
  });

  navDrawer.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navDrawer.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Open menu');
      document.body.classList.remove('nav-open');
    });
  });

  document.addEventListener('click', (event) => {
    if (!navDrawer.classList.contains('is-open')) return;
    if (navDrawer.contains(event.target) || navToggle.contains(event.target)) return;
    navDrawer.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open menu');
    document.body.classList.remove('nav-open');
  });
})();

// Pretty URL for final CTA section
if (window.location && window.location.pathname === '/final-cta') {
  window.addEventListener('load', () => {
    const target = document.getElementById('final-cta');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
}

// Sticky header
const headerEl = document.querySelector('[data-header]');
const heroEl = document.querySelector('#hero');

if (headerEl && heroEl) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          headerEl.classList.add('scrolled');
        } else {
          headerEl.classList.remove('scrolled');
        }
      });
    },
    { threshold: 0.1 }
  );

  observer.observe(heroEl);
}

// Problem story cards reveal
const storyCards = document.querySelectorAll('.story-card');
if (storyCards.length) {
  const storyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          storyObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.25 }
  );

  storyCards.forEach((card) => storyObserver.observe(card));
}

// Timeline interaction
const timeline = document.querySelector('[data-timeline]');
if (timeline) {
  const steps = Array.from(timeline.querySelectorAll('.timeline-step'));
  steps.forEach((step) => {
    const headerBtn = step.querySelector('.timeline-step-header');
    if (!headerBtn) return;
    headerBtn.addEventListener('click', () => {
      steps.forEach((s) => s.classList.remove('is-active'));
      step.classList.add('is-active');
    });
  });
}

// Service tabs
const serviceTabsRoot = document.querySelector('[data-service-tabs]');
if (serviceTabsRoot) {
  const tabs = Array.from(serviceTabsRoot.querySelectorAll('.service-tab'));
  const panels = Array.from(serviceTabsRoot.querySelectorAll('.service-panel'));

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-service');
      if (!target) return;

      tabs.forEach((t) => t.classList.remove('is-active'));
      tab.classList.add('is-active');

      panels.forEach((panel) => {
        const service = panel.getAttribute('data-service-panel');
        if (service === target) {
          panel.classList.add('is-active');
        } else {
          panel.classList.remove('is-active');
        }
      });
    });
  });
}

// Services dropdown (desktop)
const servicesDropdown = document.querySelector('.nav-item--dropdown');
if (servicesDropdown) {
  const trigger = servicesDropdown.querySelector('.nav-link--dropdown');
  const closeDropdown = () => servicesDropdown.classList.remove('is-open');

  if (trigger) {
    trigger.addEventListener('click', (e) => {
      const isOpen = servicesDropdown.classList.contains('is-open');
      if (!isOpen) {
        e.preventDefault();
        servicesDropdown.classList.add('is-open');
      }
    });
  }

  document.addEventListener('click', (e) => {
    if (!servicesDropdown.contains(e.target)) closeDropdown();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDropdown();
  });
}

// Services dropdown (mobile drawer) - caret click toggles group
const drawerGroups = document.querySelectorAll('.nav-drawer-group');
drawerGroups.forEach((group) => {
  const caret = group.querySelector('.nav-caret');
  if (!caret) return;

  caret.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    group.classList.toggle('is-open');
  });
});

// Before/after toggle (click to switch)
const beforeAfterInner = document.querySelector('.before-after-inner');
const beforeAfterToggle = document.querySelector('[data-before-after-toggle]');
const beforeAfterToggleText = document.querySelector('.before-after-toggle-text');

if (beforeAfterInner && beforeAfterToggle) {
  beforeAfterToggle.addEventListener('click', () => {
    const isAfter = beforeAfterInner.classList.toggle('is-after');
    beforeAfterToggle.setAttribute('aria-label', isAfter ? 'Show Before' : 'Show After');
    if (beforeAfterToggleText) {
      beforeAfterToggleText.textContent = isAfter ? 'View Before' : 'View After';
    }
  });
}

// Animated counters
const counters = document.querySelectorAll('[data-counter]');
if (counters.length) {
  const animateCounter = (el) => {
    const target = Number(el.getAttribute('data-target') || '0');
    let current = 0;
    const duration = 1200;
    const start = performance.now();

    const step = (timestamp) => {
      const progress = Math.min((timestamp - start) / duration, 1);
      current = Math.floor(target * progress);
      el.textContent = String(current);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = String(target);
      }
    };

    requestAnimationFrame(step);
  };

  const counterObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  counters.forEach((el) => counterObserver.observe(el));
}

// FAQ accordion
const faqRoot = document.querySelector('[data-faq]');
if (faqRoot) {
  const items = Array.from(faqRoot.querySelectorAll('.faq-item'));
  items.forEach((item) => {
    const button = item.querySelector('.faq-question');
    if (!button) return;
    const answer = item.querySelector('.faq-answer');
    if (!answer) return;

    // Ensure all answers start collapsed
    answer.style.maxHeight = '0';
    item.classList.remove('is-open');

    const setMaxHeight = (open) => {
      if (open) {
        answer.style.maxHeight = `${answer.scrollHeight}px`;
        item.classList.add('is-open');
      } else {
        answer.style.maxHeight = '0';
        item.classList.remove('is-open');
      }
    };

    button.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');
      // close others
      items.forEach((other) => {
        if (other === item) return;
        const otherAnswer = other.querySelector('.faq-answer');
        if (!otherAnswer) return;
        otherAnswer.style.maxHeight = '0';
        other.classList.remove('is-open');
      });
      setMaxHeight(!isOpen);
    });
  });
}

// Pricing calculator (simple heuristic)
const calculatorRoot = document.querySelector('[data-pricing-calculator]');
if (calculatorRoot) {
  const needSelect = calculatorRoot.querySelector('#needSelect');
  const leadsSlider = calculatorRoot.querySelector('#leadsSlider');
  const rangeEl = calculatorRoot.querySelector('[data-calculator-range]');
  const budgetInput = calculatorRoot.querySelector('#budgetInput');
  const serviceCheckboxes = Array.from(calculatorRoot.querySelectorAll('.chip input[type="checkbox"]'));

  const formatMoney = (value) => {
    const rounded = Math.round(value / 50) * 50;
    return `$${rounded.toLocaleString()}`;
  };

  const updateEstimate = () => {
    if (!rangeEl || !needSelect || !leadsSlider) return;

    const leads = Number(leadsSlider.value || '20');
    const budget = Number(budgetInput && budgetInput.value ? budgetInput.value : 0);
    const activeServices = serviceCheckboxes.filter((c) => c.checked).map((c) => c.value);

    // Keep this estimator conservative and aligned with the public pricing ranges.
    let base = 420;

    if (needSelect.value === 'fast-leads') base += 180;
    if (needSelect.value === 'website-refresh') base += 140;

    base += (leads - 10) * 6;
    base += activeServices.length * 90;

    let low = base * 0.85;
    let high = base * 1.2;

    if (budget > 0) {
      const cushion = budget * 0.3;
      low = Math.max(349, budget - cushion);
      high = budget + cushion;
    }

    // Public floor (some simple cases can start here).
    if (low < 349) low = 349;

    if (Math.round(low) === 349) {
      rangeEl.innerHTML = `Most owners in a similar spot start around <strong>$349+ per month</strong> after setup.`;
      return;
    }

    const lowStr = formatMoney(low);
    const highStr = formatMoney(high);

    rangeEl.innerHTML = `Most owners in a similar spot start around <strong>${lowStr} to ${highStr} per month</strong> after setup.`;
  };

  if (needSelect && leadsSlider) {
    needSelect.addEventListener('change', updateEstimate);
    leadsSlider.addEventListener('input', updateEstimate);
    if (budgetInput) {
      budgetInput.addEventListener('input', updateEstimate);
    }
    serviceCheckboxes.forEach((cb) => cb.addEventListener('change', updateEstimate));
    updateEstimate();
  }
}

// Conversational form (multi-step only)
const formEl = document.querySelector('#contact-form');
const stepsRoot = formEl ? formEl.querySelector('[data-form-steps]') : null;
if (formEl && stepsRoot) {
  const confirmation = formEl.querySelector('[data-form-confirmation]');
  const steps = Array.from(stepsRoot.querySelectorAll('.form-step'));
  const nextButtons = formEl.querySelectorAll('.form-next');
  const prevButtons = formEl.querySelectorAll('.form-prev');
  const phoneField = formEl.querySelector('[data-contact-phone]');
  const emailField = formEl.querySelector('[data-contact-email]');
  const preferenceRadios = formEl.querySelectorAll('input[name="contactPreference"]');

  const activateStep = (index) => {
    steps.forEach((step, i) => {
      if (i === index) {
        step.classList.add('is-active');
      } else {
        step.classList.remove('is-active');
      }
    });
  };

  const currentStepIndex = () => steps.findIndex((s) => s.classList.contains('is-active'));

  const goNext = () => {
    const index = currentStepIndex();
    if (index === -1) return;
    const current = steps[index];
    const requiredInputs = current.querySelectorAll('input[required], textarea[required]');

    for (const input of requiredInputs) {
      if (!input.value.trim()) {
        input.focus();
        input.classList.add('field-error');
        setTimeout(() => input.classList.remove('field-error'), 800);
        return;
      }
    }

    const nextIndex = Math.min(steps.length - 1, index + 1);
    activateStep(nextIndex);
  };

  const goPrev = () => {
    const index = currentStepIndex();
    const prevIndex = Math.max(0, index - 1);
    activateStep(prevIndex);
  };

  nextButtons.forEach((btn) => btn.addEventListener('click', goNext));
  prevButtons.forEach((btn) => btn.addEventListener('click', goPrev));

  // Contact preference toggle
  const updateContactFields = () => {
    let preference = 'call';
    preferenceRadios.forEach((r) => {
      if (r.checked) preference = r.value;
    });

    if (phoneField instanceof HTMLElement && emailField instanceof HTMLElement) {
      if (preference === 'email') {
        phoneField.classList.add('field--hidden');
        const phoneInput = phoneField.querySelector('input');
        if (phoneInput) phoneInput.removeAttribute('required');

        emailField.classList.remove('field--hidden');
        const emailInput = emailField.querySelector('input');
        if (emailInput) emailInput.setAttribute('required', 'true');
      } else {
        emailField.classList.add('field--hidden');
        const emailInput = emailField.querySelector('input');
        if (emailInput) emailInput.removeAttribute('required');

        phoneField.classList.remove('field--hidden');
        const phoneInput = phoneField.querySelector('input');
        if (phoneInput) phoneInput.setAttribute('required', 'true');
      }
    }
  };

  preferenceRadios.forEach((r) => r.addEventListener('change', updateContactFields));
  updateContactFields();

  formEl.addEventListener('submit', (event) => {
    event.preventDefault();
    activateStep(steps.length - 1);
    if (confirmation) {
      confirmation.classList.add('visible');
      confirmation.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
}

// Blog index filters
(function initBlogFilters() {
  const grid = document.querySelector('[data-blog-grid]');
  if (!grid) return;

  const cards = [...grid.querySelectorAll('.blog-card-index')];
  const countEl = document.querySelector('[data-blog-count]');
  const clearBtn = document.querySelector('[data-blog-clear]');

  const state = {
    category: 'all',
    city: 'all',
    industry: 'all',
    topic: 'all',
  };

  const FILTER_DATASET = {
    category: 'filterCategory',
    city: 'filterCity',
    industry: 'filterIndustry',
    topic: 'filterTopic',
  };

  function setActiveInGroup(group, value) {
    const key = FILTER_DATASET[group];
    document.querySelectorAll(`[data-filter-${group}]`).forEach((btn) => {
      btn.classList.toggle('is-active', btn.dataset[key] === value);
    });
  }

  function updateUrl() {
    const params = new URLSearchParams();
    Object.entries(state).forEach(([key, val]) => {
      if (val !== 'all') params.set(key, val);
    });
    const qs = params.toString();
    const next = qs ? `${window.location.pathname}?${qs}` : window.location.pathname;
    window.history.replaceState({}, '', next);
  }

  function cardMatches(card) {
    const cat = card.dataset.category;
    const tags = (card.dataset.tags || '').split(',');
    if (state.category !== 'all' && cat !== state.category) return false;
    if (state.city !== 'all' && !tags.includes(state.city)) return false;
    if (state.industry !== 'all' && !tags.includes(state.industry)) return false;
    if (state.topic !== 'all' && !tags.includes(state.topic)) return false;
    return true;
  }

  function applyFilters() {
    let visible = 0;
    cards.forEach((card) => {
      const show = cardMatches(card);
      card.hidden = !show;
      if (show) visible += 1;
    });

    if (countEl) {
      countEl.textContent =
        visible === cards.length
          ? `Showing ${visible} articles`
          : `Showing ${visible} of ${cards.length} articles`;
    }

    if (clearBtn) {
      clearBtn.hidden = Object.values(state).every((v) => v === 'all');
    }
  }

  function activateFromUrl() {
    const params = new URLSearchParams(window.location.search);
    ['category', 'city', 'industry', 'topic'].forEach((key) => {
      const val = params.get(key);
      if (val) {
        state[key] = val;
        setActiveInGroup(key, val);
      }
    });
    const legacyTag = params.get('tag');
    if (legacyTag) {
      if (document.querySelector(`[data-filter-city="${legacyTag}"]`)) {
        state.city = legacyTag;
        setActiveInGroup('city', legacyTag);
      } else if (document.querySelector(`[data-filter-industry="${legacyTag}"]`)) {
        state.industry = legacyTag;
        setActiveInGroup('industry', legacyTag);
      } else if (document.querySelector(`[data-filter-topic="${legacyTag}"]`)) {
        state.topic = legacyTag;
        setActiveInGroup('topic', legacyTag);
      }
    }
    applyFilters();
  }

  ['category', 'city', 'industry', 'topic'].forEach((group) => {
    document.querySelectorAll(`[data-filter-${group}]`).forEach((btn) => {
      btn.addEventListener('click', () => {
        state[group] = btn.dataset[FILTER_DATASET[group]];
        setActiveInGroup(group, state[group]);
        updateUrl();
        applyFilters();
      });
    });
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      Object.keys(state).forEach((k) => {
        state[k] = 'all';
        setActiveInGroup(k, 'all');
      });
      updateUrl();
      applyFilters();
    });
  }

  activateFromUrl();
})();

