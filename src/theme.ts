export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'portfolio_theme';

export function getPreferredTheme(): Theme {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
  } catch {
    // localStorage may be unavailable in restricted environments
  }
  if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
}

export function applyTheme(theme: Theme): void {
  document.documentElement.setAttribute('data-theme', theme);
  document.documentElement.style.colorScheme = theme;

  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (metaThemeColor) {
    metaThemeColor.setAttribute('content', theme === 'dark' ? '#0d171d' : '#fafaf7');
  }

  // Update toggle button ARIA attributes and titles if present
  document.querySelectorAll<HTMLButtonElement>('.theme-toggle').forEach(btn => {
    const isDark = theme === 'dark';
    btn.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
    btn.setAttribute('title', isDark ? 'Switch to light theme' : 'Switch to dark theme');
    btn.setAttribute('aria-pressed', String(isDark));
  });

  // Notify listeners (e.g. 3D canvas lighting)
  window.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
}

export function setTheme(theme: Theme): void {
  applyTheme(theme);
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // localStorage might fail in private browsing
  }
}

export function toggleTheme(): Theme {
  const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  const next: Theme = current === 'dark' ? 'light' : 'dark';
  setTheme(next);
  return next;
}

export function initTheme(): void {
  const initial = getPreferredTheme();
  applyTheme(initial);

  // Listen for system theme changes only if user hasn't explicitly stored a preference
  try {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', e => {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  } catch {
    // Media query listener not supported
  }

  // Wire up theme toggles
  document.querySelectorAll<HTMLButtonElement>('.theme-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      toggleTheme();
    });
  });
}
