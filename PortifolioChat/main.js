// main.js - scaffold for future dynamic features
document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('theme-dark');
      const pressed = themeToggle.getAttribute('aria-pressed') === 'true';
      themeToggle.setAttribute('aria-pressed', String(!pressed));
    });
  }

  const burger = document.getElementById('nav-burger');
  const navList = document.getElementById('nav-list');
  if (burger && navList) {
    burger.addEventListener('click', () => {
      const expanded = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!expanded));
      navList.style.display = navList.style.display === 'flex' ? '' : 'flex';
      navList.style.flexDirection = 'column';
      navList.style.gap = '0.5rem';
      navList.style.background = 'var(--surface)';
      navList.style.padding = '0.8rem';
      navList.style.position = 'absolute';
      navList.style.right = '1rem';
      navList.style.top = '60px';
      navList.style.borderRadius = '8px';
      navList.style.boxShadow = '0 8px 20px rgba(0,0,0,0.08)';
    });
  }

  const lightbox = document.getElementById('lightbox');
  const lightboxImg = lightbox ? lightbox.querySelector('.lightbox-img') : null;
  const lightboxClose = lightbox ? lightbox.querySelector('.lightbox-close') : null;
  if (lightbox && lightboxImg) {
    document.querySelectorAll('.momento-media, .card-media').forEach(img => {
      img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightbox.style.display = 'flex';
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      });
    });
    if (lightboxClose) {
      lightboxClose.addEventListener('click', () => {
        lightbox.style.display = 'none';
        lightbox.setAttribute('aria-hidden', 'true');
        lightboxImg.src = '';
        document.body.style.overflow = '';
      });
    }
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.style.display = 'none';
        lightbox.setAttribute('aria-hidden', 'true');
        lightboxImg.src = '';
        document.body.style.overflow = '';
      }
    });
  }
});
