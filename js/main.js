const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');
toggle.addEventListener('click', () => {
  const expanded = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!expanded));
  toggle.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
  toggle.textContent = expanded ? '☰' : '✕';
  nav.classList.toggle('open', !expanded);
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Open navigation');
  toggle.textContent = '☰';
}));
document.querySelector('#year').textContent = new Date().getFullYear();

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const setupReveal = (selector, groupSize = 2) => {
  const items = document.querySelectorAll(selector);
  if (!items.length || reduceMotion || !('IntersectionObserver' in window)) return;
  document.body.classList.add('reveal-ready');
  const reveal = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      reveal.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  items.forEach((item, index) => {
    item.style.setProperty('--reveal-delay', `${(index % groupSize) * 90}ms`);
    reveal.observe(item);
  });
};

setupReveal('.project-card');
setupReveal('.service-card');
setupReveal('.process-step', 5);
setupReveal('.service-jump a', 5);
setupReveal('.skill-list>div', 4);
setupReveal('.education-item', 2);
setupReveal('.contact-tile', 2);

const progressBar = document.querySelector('.scroll-progress');
const siteHeader = document.querySelector('.site-header');
let scrollQueued = false;

const updateScrollUI = () => {
  scrollQueued = false;
  const doc = document.documentElement;
  const max = doc.scrollHeight - window.innerHeight;
  if (progressBar) {
    progressBar.style.transform = `scaleX(${max > 0 ? Math.min(window.scrollY / max, 1) : 0})`;
  }
  if (siteHeader) {
    siteHeader.classList.toggle('is-scrolled', window.scrollY > 12);
  }
};

const queueScrollUI = () => {
  if (scrollQueued) return;
  scrollQueued = true;
  requestAnimationFrame(updateScrollUI);
};

window.addEventListener('scroll', queueScrollUI, { passive: true });
window.addEventListener('resize', queueScrollUI);
updateScrollUI();

const navLinks = new Map();
document.querySelectorAll('#navigation a[href^="#"]').forEach(link => {
  navLinks.set(link.getAttribute('href').slice(1), link);
});
if (navLinks.size && 'IntersectionObserver' in window) {
  const spy = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => link.classList.remove('is-current'));
      const active = navLinks.get(entry.target.id);
      if (active) active.classList.add('is-current');
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  navLinks.forEach((link, id) => {
    const section = document.getElementById(id);
    if (section) spy.observe(section);
  });
}

const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
  card.addEventListener('pointermove', event => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    card.style.setProperty('--my', `${event.clientY - rect.top}px`);
  });
});
