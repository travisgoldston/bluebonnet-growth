/**
 * Home page interactions (kept small + vanilla):
 * - Services tabs
 * - Pricing estimator
 * - Final CTA multi-step form
 */
(function () {
  function onReady(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  function initTabs() {
    var root = document.querySelector('[data-tabs="services"]');
    if (!root) return;

    var tablist = root.querySelector('[role="tablist"]');
    var tabs = Array.prototype.slice.call(root.querySelectorAll('[role="tab"]'));
    var panels = Array.prototype.slice.call(root.querySelectorAll('[role="tabpanel"]'));
    if (!tablist || !tabs.length || !panels.length) return;

    function activateTab(tab) {
      tabs.forEach(function (t) {
        var selected = t === tab;
        t.setAttribute('aria-selected', selected ? 'true' : 'false');
        t.tabIndex = selected ? 0 : -1;
      });

      var controls = tab.getAttribute('aria-controls');
      panels.forEach(function (p) {
        var active = p.id === controls;
        p.hidden = !active;
        p.setAttribute('aria-hidden', active ? 'false' : 'true');
      });
    }

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        activateTab(tab);
        tab.focus();
      });
      tab.addEventListener('keydown', function (e) {
        var key = e.key;
        if (key !== 'ArrowLeft' && key !== 'ArrowRight' && key !== 'Home' && key !== 'End') return;
        e.preventDefault();
        var idx = tabs.indexOf(tab);
        var next;
        if (key === 'ArrowLeft') next = tabs[(idx - 1 + tabs.length) % tabs.length];
        if (key === 'ArrowRight') next = tabs[(idx + 1) % tabs.length];
        if (key === 'Home') next = tabs[0];
        if (key === 'End') next = tabs[tabs.length - 1];
        if (next) {
          activateTab(next);
          next.focus();
        }
      });
    });

    var preselected = tabs.find(function (t) { return t.getAttribute('aria-selected') === 'true'; }) || tabs[0];
    activateTab(preselected);
  }

  function clamp(min, val, max) {
    return Math.max(min, Math.min(max, val));
  }

  function fmtMoney(n) {
    return '$' + n.toLocaleString('en-US', { maximumFractionDigits: 0 });
  }

  function computeEstimate(answers) {
    var plan = answers.goal;
    var locations = parseInt(answers.locations || '1', 10);
    if (isNaN(locations) || locations < 1) locations = 1;

    var base;
    if (plan === 'lite') base = { name: 'Spark Lite', min: 299, max: 550 };
    else if (plan === 'pro') base = { name: 'Spark Pro', min: 650, max: 950 };
    else base = { name: 'Spark Enterprise', min: 1200, max: 1800 };

    // Simple, explainable adjustments.
    var locFactor = clamp(1, locations, 8);
    var locBump = Math.max(0, locFactor - 1) * 125;

    var competition = answers.competition;
    var compBump = 0;
    if (competition === 'medium') compBump = 150;
    if (competition === 'high') compBump = 300;

    var min = base.min + locBump + compBump;
    var max = base.max + locBump + compBump;

    var webAddon = answers.web === 'yes' ? { min: 1000, max: 1500 } : null;

    return {
      planName: base.name,
      monthlyMin: min,
      monthlyMax: max,
      webAddon: webAddon
    };
  }

  function initEstimator() {
    var root = document.querySelector('[data-estimator="pricing"]');
    if (!root) return;

    var form = root.querySelector('form');
    var output = root.querySelector('[data-estimator-output]');
    if (!form || !output) return;

    function readAnswers() {
      var data = new FormData(form);
      return {
        goal: String(data.get('goal') || 'pro'),
        locations: String(data.get('locations') || '1'),
        competition: String(data.get('competition') || 'medium'),
        web: String(data.get('web') || 'no')
      };
    }

    function render() {
      var a = readAnswers();
      var r = computeEstimate(a);
      var webLine = r.webAddon
        ? '<div class="est-result__line"><span>Web design add-on</span><strong>' + fmtMoney(r.webAddon.min) + '–' + fmtMoney(r.webAddon.max) + ' one-time</strong></div>'
        : '';

      output.innerHTML =
        '<div class="est-result" role="status" aria-live="polite">' +
          '<div class="est-result__title">Estimated fit</div>' +
          '<div class="est-result__line"><span>Plan</span><strong>' + r.planName + '</strong></div>' +
          '<div class="est-result__line"><span>Ongoing SEO</span><strong>' + fmtMoney(r.monthlyMin) + '–' + fmtMoney(r.monthlyMax) + '/mo</strong></div>' +
          webLine +
          '<div class="est-result__note">This is a starting range. If it’s not realistic for your business right now, we’ll say that plainly.</div>' +
        '</div>';
    }

    form.addEventListener('input', render);
    render();
  }

  function initMultiStepForm() {
    var root = document.querySelector('[data-multistep="home-cta"]');
    if (!root) return;

    var form = root.querySelector('form');
    var steps = Array.prototype.slice.call(root.querySelectorAll('[data-step]'));
    var backBtn = root.querySelector('[data-step-back]');
    var nextBtn = root.querySelector('[data-step-next]');
    var stepLabel = root.querySelector('[data-step-label]');
    if (!form || !steps.length || !nextBtn || !stepLabel) return;

    var idx = 0;

    function focusFirstField(stepEl) {
      var field = stepEl.querySelector('input, select, textarea, button');
      if (field) field.focus();
    }

    function validateStep(stepEl) {
      var required = Array.prototype.slice.call(stepEl.querySelectorAll('[required]'));
      for (var i = 0; i < required.length; i++) {
        if (!required[i].checkValidity()) {
          required[i].reportValidity();
          return false;
        }
      }
      return true;
    }

    function setStep(newIdx) {
      idx = clamp(0, newIdx, steps.length - 1);
      steps.forEach(function (s, i) {
        var active = i === idx;
        s.hidden = !active;
        s.setAttribute('aria-hidden', active ? 'false' : 'true');
      });

      var label = 'Step ' + (idx + 1) + ' of ' + steps.length;
      stepLabel.textContent = label;

      if (backBtn) backBtn.hidden = idx === 0;
      nextBtn.textContent = idx === steps.length - 1 ? 'Submit' : 'Next';
      nextBtn.setAttribute('data-mode', idx === steps.length - 1 ? 'submit' : 'next');
      focusFirstField(steps[idx]);
    }

    if (backBtn) {
      backBtn.addEventListener('click', function (e) {
        e.preventDefault();
        setStep(idx - 1);
      });
    }

    nextBtn.addEventListener('click', function (e) {
      var mode = nextBtn.getAttribute('data-mode') || 'next';
      if (mode === 'submit') return; // let native submit happen
      e.preventDefault();
      if (!validateStep(steps[idx])) return;
      setStep(idx + 1);
    });

    form.addEventListener('submit', function (e) {
      if (!validateStep(steps[idx])) {
        e.preventDefault();
        return;
      }
    });

    setStep(0);
  }

  onReady(function () {
    initTabs();
    initEstimator();
    initMultiStepForm();
  });
})();

