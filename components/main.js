(function () {
  document.addEventListener('DOMContentLoaded', function () {
    // Sticky header scroll state
    var header = document.querySelector('.site-header');
    var lastScrollY = window.scrollY;
    if (header) {
      window.addEventListener('scroll', function () {
        var currentY = window.scrollY;
        if (currentY > 10) {
          header.classList.add('site-header--scrolled');
        } else {
          header.classList.remove('site-header--scrolled');
        }
        lastScrollY = currentY;
      });
    }

    // Smooth scroll for buttons with data-scroll-target
    document.querySelectorAll('[data-scroll-target]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var target = btn.getAttribute('data-scroll-target');
        if (!target) return;
        var el = document.querySelector(target);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    // Hero before/after slider
    var slider = document.getElementById('hero-before-after');
    var beforeLayer = document.querySelector('.search-layer--before');
    var afterLayer = document.querySelector('.search-layer--after');
    var handle = document.querySelector('.before-after-handle');

    function updateBeforeAfter(value) {
      if (!beforeLayer || !afterLayer || !handle) return;
      var pct = Number(value);
      beforeLayer.style.clipPath = 'inset(0 ' + (100 - pct) + '% 0 0)';
      afterLayer.style.clipPath = 'inset(0 0 0 ' + pct + '%)';
      handle.style.left = pct + '%';
    }

    if (slider) {
      updateBeforeAfter(slider.value);
      slider.addEventListener('input', function () {
        updateBeforeAfter(slider.value);
      });
    }

    // IntersectionObserver for fade-in elements
    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });

      document.querySelectorAll('.observe-fade').forEach(function (el) {
        observer.observe(el);
      });
    } else {
      document.querySelectorAll('.observe-fade').forEach(function (el) {
        el.classList.add('is-visible');
      });
    }

    // Timeline step toggle
    var timelineSteps = document.querySelectorAll('.timeline-step');
    var timelinePanels = document.querySelectorAll('.timeline-panel');
    timelineSteps.forEach(function (step) {
      var btn = step.querySelector('button');
      if (!btn) return;
      btn.addEventListener('click', function () {
        var stepId = step.getAttribute('data-step');
        if (!stepId) return;

        timelineSteps.forEach(function (s) {
          s.classList.toggle('timeline-step--active', s === step);
        });

        timelinePanels.forEach(function (panel) {
          var matches = panel.getAttribute('data-step-content') === stepId;
          panel.classList.toggle('timeline-panel--active', matches);
        });
      });
    });

    // Services toggle
    var serviceButtons = document.querySelectorAll('.services-toggle-btn');
    var servicePanels = document.querySelectorAll('.services-panel');
    serviceButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var tab = btn.getAttribute('data-service-tab');
        if (!tab) return;

        serviceButtons.forEach(function (b) {
          b.classList.toggle('services-toggle-btn--active', b === btn);
        });

        servicePanels.forEach(function (panel) {
          var matches = panel.getAttribute('data-service-panel') === tab;
          panel.classList.toggle('services-panel--active', matches);
        });
      });
    });

    // Animated counters
    var counters = document.querySelectorAll('[data-counter]');
    function animateCounter(el) {
      var target = Number(el.getAttribute('data-counter-target')) || 0;
      var duration = 1200;
      var start = 0;
      var startTime = null;

      function tick(timestamp) {
        if (!startTime) startTime = timestamp;
        var progress = Math.min((timestamp - startTime) / duration, 1);
        var value = Math.floor(progress * (target - start) + start);
        el.textContent = value.toString();
        if (progress < 1) {
          window.requestAnimationFrame(tick);
        }
      }

      window.requestAnimationFrame(tick);
    }

    if (counters.length) {
      if ('IntersectionObserver' in window) {
        var counterObserver = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              animateCounter(entry.target);
              counterObserver.unobserve(entry.target);
            }
          });
        }, { threshold: 0.6 });

        counters.forEach(function (el) {
          counterObserver.observe(el);
        });
      } else {
        counters.forEach(animateCounter);
      }
    }

    // Pricing calculator
    var calcBusinessType = document.getElementById('calc-business-type');
    var calcRangeOutput = document.getElementById('calc-range');
    var calcPace = document.getElementById('calc-pace');
    var calcToggleBtns = document.querySelectorAll('.calc-toggle-btn');
    var paceLabels = document.querySelectorAll('[data-pace-label]');

    var calcState = {
      focus: 'seo',
      pace: 2,
      businessType: 'home'
    };

    function computeRange() {
      var baseMin = 600;
      var baseMax = 900;

      if (calcState.focus === 'both') {
        baseMin += 200;
        baseMax += 300;
      }

      if (calcState.businessType === 'health' || calcState.businessType === 'professional') {
        baseMin += 100;
        baseMax += 200;
      } else if (calcState.businessType === 'restaurant') {
        baseMin += 50;
        baseMax += 150;
      }

      if (calcState.pace === 1) {
        baseMin -= 150;
        baseMax -= 150;
      } else if (calcState.pace === 3) {
        baseMin += 150;
        baseMax += 200;
      }

      if (baseMin < 450) baseMin = 450;

      return {
        min: Math.round(baseMin / 10) * 10,
        max: Math.round(baseMax / 10) * 10
      };
    }

    function updateCalcUI() {
      if (!calcRangeOutput) return;
      var range = computeRange();
      calcRangeOutput.textContent = '$' + range.min + '–$' + range.max + ' per month';
    }

    if (calcBusinessType) {
      calcBusinessType.addEventListener('change', function () {
        calcState.businessType = calcBusinessType.value;
        updateCalcUI();
      });
    }

    if (calcPace) {
      calcPace.addEventListener('input', function () {
        calcState.pace = Number(calcPace.value);
        paceLabels.forEach(function (label) {
          var val = Number(label.getAttribute('data-pace-label'));
          label.classList.toggle('active', val === calcState.pace);
        });
        updateCalcUI();
      });
    }

    calcToggleBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var focus = btn.getAttribute('data-calc-focus') || 'seo';
        calcState.focus = focus;
        calcToggleBtns.forEach(function (b) {
          b.classList.toggle('calc-toggle-btn--active', b === btn);
        });
        updateCalcUI();
      });
    });

    updateCalcUI();

    // FAQ accordion
    document.querySelectorAll('.faq-item').forEach(function (item) {
      var questionBtn = item.querySelector('.faq-question');
      var answer = item.querySelector('.faq-answer');
      if (!questionBtn || !answer) return;

      questionBtn.addEventListener('click', function () {
        var isOpen = questionBtn.getAttribute('aria-expanded') === 'true';

        // Close all
        document.querySelectorAll('.faq-item').forEach(function (other) {
          var otherBtn = other.querySelector('.faq-question');
          var otherAnswer = other.querySelector('.faq-answer');
          if (!otherBtn || !otherAnswer) return;
          otherBtn.setAttribute('aria-expanded', 'false');
          other.classList.remove('faq-item--open');
          otherAnswer.style.maxHeight = null;
        });

        if (!isOpen) {
          questionBtn.setAttribute('aria-expanded', 'true');
          item.classList.add('faq-item--open');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    });

    // Conversational form
    var convoForm = document.getElementById('conversational-form');
    if (convoForm) {
      var steps = convoForm.querySelectorAll('.conversation-step');
      var progressEl = document.getElementById('conversation-step-indicator');
      var currentIndex = 0;

      function showStep(index) {
        steps.forEach(function (step, i) {
          step.classList.toggle('conversation-step--active', i === index);
        });
        if (progressEl) {
          progressEl.textContent = String(index + 1);
        }
      }

      convoForm.addEventListener('click', function (e) {
        var target = e.target;
        if (!(target instanceof Element)) return;
        if (target.classList.contains('conversation-next')) {
          e.preventDefault();
          if (currentIndex < steps.length - 1) {
            currentIndex += 1;
            showStep(currentIndex);
          }
        }
      });

      showStep(currentIndex);
    }
  });
})();

