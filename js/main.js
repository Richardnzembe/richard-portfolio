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
