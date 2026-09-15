const root = document.documentElement;
const preference = window.matchMedia('(prefers-color-scheme: light)');
let saved: string | null = null;
try { saved = localStorage.getItem('portfolio-theme'); } catch { /* Storage can be unavailable in private contexts. */ }
root.dataset.theme = saved === 'dark' || saved === 'light' ? saved : preference.matches ? 'light' : 'dark';
preference.addEventListener('change', () => {
  let explicit: string | null = null;
  try { explicit = localStorage.getItem('portfolio-theme'); } catch { /* Keep system behavior. */ }
  if (!explicit) root.dataset.theme = preference.matches ? 'light' : 'dark';
});
export {};
