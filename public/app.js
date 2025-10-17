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
