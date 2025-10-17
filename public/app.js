const navToggle = document.querySelector('.main-nav__toggle');
const navWrapper = document.querySelector('.main-nav__wrapper');

if (navToggle && navWrapper) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navWrapper.setAttribute('aria-expanded', String(!expanded));
  });

  navWrapper.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navToggle.setAttribute('aria-expanded', 'false');
      navWrapper.setAttribute('aria-expanded', 'false');
    });
  });
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.reveal, .section__header').forEach((element) => {
  revealObserver.observe(element);
});

const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Animated counters
const counters = document.querySelectorAll('[data-counter]');
if (counters.length) {
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const target = entry.target;
        const endValue = Number(target.dataset.counter || 0);
        let current = 0;
        const increment = Math.ceil(endValue / 60);
        const updateCounter = () => {
          current += increment;
          if (current >= endValue) {
            target.textContent = endValue.toLocaleString('id-ID');
          } else {
            target.textContent = current.toLocaleString('id-ID');
            requestAnimationFrame(updateCounter);
          }
        };
        requestAnimationFrame(updateCounter);
        counterObserver.unobserve(target);
      });
    },
    { threshold: 0.4 }
  );

  counters.forEach((counter) => counterObserver.observe(counter));
}

// Product tabs
const productTabs = document.querySelectorAll('.product-tab');
const productPanels = document.querySelectorAll('.product-panel');

if (productTabs.length && productPanels.length) {
  productTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const targetId = tab.dataset.target;
      if (!targetId) return;

      productTabs.forEach((t) => {
        t.classList.toggle('is-active', t === tab);
        t.setAttribute('aria-selected', String(t === tab));
      });

      productPanels.forEach((panel) => {
        const isTarget = panel.id === targetId;
        panel.classList.toggle('is-active', isTarget);
        panel.toggleAttribute('hidden', !isTarget);
      });
    });
  });
}

// Project filters
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

if (filterButtons.length && projectCards.length) {
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;

      filterButtons.forEach((btn) => btn.classList.toggle('is-active', btn === button));

      projectCards.forEach((card) => {
        const category = card.dataset.category;
        const isVisible = filter === 'all' || category === filter;
        card.style.display = isVisible ? 'grid' : 'none';
      });
    });
  });
}

// Captcha + form feedback
const captchaQuestion = document.getElementById('captcha-question');
const captchaAnswer = document.getElementById('captcha-answer');
const captchaRefresh = document.querySelector('.captcha-refresh');
const contactForm = document.querySelector('.contact__form');
const statusEl = document.querySelector('.form-status');
let captchaResult = 0;

const generateCaptcha = () => {
  const a = Math.floor(Math.random() * 8) + 1;
  const b = Math.floor(Math.random() * 8) + 1;
  captchaResult = a + b;
  if (captchaQuestion) {
    captchaQuestion.textContent = `${a} + ${b} = ?`;
  }
  if (captchaAnswer) {
    captchaAnswer.value = '';
  }
};

if (captchaQuestion && captchaAnswer) {
  generateCaptcha();
}

captchaRefresh?.addEventListener('click', generateCaptcha);

contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!captchaAnswer) return;

  const value = Number(captchaAnswer.value);
  if (Number.isNaN(value) || value !== captchaResult) {
    if (statusEl) {
      statusEl.textContent = 'Captcha tidak sesuai. Silakan coba lagi.';
      statusEl.style.color = 'var(--brand-red)';
    }
    generateCaptcha();
    captchaAnswer.focus();
    return;
  }

  if (statusEl) {
    statusEl.textContent = 'Terima kasih! Pesan Anda telah terkirim.';
    statusEl.style.color = 'var(--brand-red-dark)';
  }
  contactForm.reset();
  generateCaptcha();
});
