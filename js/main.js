document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const isOpen = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    links.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        links.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });

  const lightbox = document.querySelector('.lightbox');
  if (lightbox) {
    const lightboxImg = lightbox.querySelector('img');
    const closeBtn = lightbox.querySelector('.lightbox-close');

    document.querySelectorAll('.gallery-item').forEach((item) => {
      item.addEventListener('click', () => {
        const fullSrc = item.getAttribute('data-full') || item.querySelector('img').src;
        lightboxImg.src = fullSrc;
        lightboxImg.alt = item.querySelector('img').alt;
        lightbox.classList.add('is-open');
      });
    });

    const close = () => lightbox.classList.remove('is-open');
    closeBtn.addEventListener('click', close);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) close();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    });
  }

  const dayTabs = document.querySelectorAll('.day-tab');
  const dayPanels = document.querySelectorAll('.day-panel');
  if (dayTabs.length && dayPanels.length) {
    const activate = (day) => {
      dayTabs.forEach((tab) => {
        const isActive = tab.dataset.day === day;
        tab.classList.toggle('is-active', isActive);
        tab.setAttribute('aria-selected', String(isActive));
      });
      dayPanels.forEach((panel) => {
        panel.classList.toggle('is-active', panel.dataset.day === day);
      });
    };

    dayTabs.forEach((tab) => {
      tab.addEventListener('click', () => activate(tab.dataset.day));
    });

    const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const today = dayNames[new Date().getDay()];
    const hasToday = Array.from(dayTabs).some((tab) => tab.dataset.day === today);
    activate(hasToday ? today : 'monday');
  }
});
