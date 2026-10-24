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
});
