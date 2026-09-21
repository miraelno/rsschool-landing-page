const root = document.documentElement;
const toggle = document.querySelector('[data-theme-toggle]');

function setTheme(theme) {
  root.dataset.theme = theme;
  try {
    localStorage.setItem('theme', theme);
  } catch (e) {}
  toggle?.setAttribute('aria-pressed', String(theme === 'dark'));
}

toggle?.setAttribute('aria-pressed', String(root.dataset.theme === 'dark'));

toggle?.addEventListener('click', () => {
  setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark');
});

matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  let saved = null;
  try {
    saved = localStorage.getItem('theme');
  } catch (err) {}
  if (!saved) root.dataset.theme = e.matches ? 'dark' : 'light';
});
