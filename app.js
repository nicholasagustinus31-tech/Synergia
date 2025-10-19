const navToggle = document.querySelector('.main-nav__toggle');
const navList = document.querySelector('.main-nav__list');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navList.setAttribute('aria-expanded', String(!expanded));
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll('.reveal').forEach((element) => {
  observer.observe(element);
});

const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const modalTriggers = document.querySelectorAll('[data-modal-target]');
const modals = document.querySelectorAll('dialog');

modalTriggers.forEach((trigger) => {
  const modalId = trigger.getAttribute('data-modal-target');
  const modal = document.getElementById(modalId);
  if (!modal) return;

  trigger.addEventListener('click', () => {
    if (typeof modal.showModal === 'function') {
      modal.showModal();
    }
  });
});

modals.forEach((modal) => {
  modal.addEventListener('cancel', () => {
    modal.close();
  });
});

const ssoButtons = document.querySelectorAll('.sso-button');

ssoButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    const provider = event.currentTarget.getAttribute('data-provider');
    const message = `Mengalihkan ke penyedia SSO ${provider?.toUpperCase() || ''}.`;
    alert(message);
  });
});

// --- Mobile Menu Controller ---
(function () {
  const nav = document.querySelector('.main-nav');
  const toggle = document.querySelector('.main-nav__toggle');
  const panel = document.getElementById('navigation-menu');

  if (!nav || !toggle || !panel) return;

  // Backdrop (buat jika belum ada)
  let backdrop = document.querySelector('.main-nav__backdrop');
  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.className = 'main-nav__backdrop';
    // taruh setelah header agar menutupi konten
    document.body.appendChild(backdrop);
  }

  // util
  const openMenu = () => {
    nav.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    panel.setAttribute('aria-expanded', 'true');
    document.body.classList.add('body-lock');
    backdrop.removeAttribute('hidden');
    // fokus ke item pertama untuk aksesibilitas
    const firstLink = panel.querySelector('a');
    firstLink && firstLink.focus({ preventScroll: true });
  };

  const closeMenu = () => {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    panel.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('body-lock');
    backdrop.setAttribute('hidden', '');
    toggle.focus({ preventScroll: true });
  };

  const isOpen = () => nav.classList.contains('is-open');

  // Toggle
  toggle.addEventListener('click', () => (isOpen() ? closeMenu() : openMenu()));

  // Klik backdrop / link -> tutup
  backdrop.addEventListener('click', closeMenu);
  panel.addEventListener('click', (e) => {
    if (e.target.matches('a')) closeMenu();
  });

  // Esc untuk tutup
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen()) closeMenu();
  });

  // Tutup saat resize ke desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768 && isOpen()) closeMenu();
  });
})();
