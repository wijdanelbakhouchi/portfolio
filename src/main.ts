import { initTheme } from './theme.ts';
import { initLoader } from './loader.ts';

// Initialize light/dark theme immediately before other interactions
initTheme();

// Initialize cinematic system initialization sequence
initLoader();

const header = document.querySelector<HTMLElement>('.header')!;
const menu = document.querySelector<HTMLButtonElement>('.menu-toggle')!;
const navigation = document.querySelector<HTMLElement>('#navigation')!;
document.documentElement.classList.add('enhanced');

// Sticky header blur when scrolled
function checkHeaderScroll() {
  if (window.scrollY > 20) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}
window.addEventListener('scroll', checkHeaderScroll, { passive: true });
checkHeaderScroll();

function setMenu(open: boolean) {
  menu.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('open', open);
}
menu.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    menu.focus();
  }
});
document.addEventListener('click', event => {
  if (event.target instanceof Node && !header.contains(event.target)) setMenu(false);
});
document.addEventListener('focusin', event => {
  if (event.target instanceof Node && !header.contains(event.target)) setMenu(false);
});
matchMedia('(min-width: 1001px)').addEventListener('change', () => setMenu(false));

const dialog = document.querySelector<HTMLDialogElement>('#project-dialog')!;
const content = document.querySelector<HTMLElement>('#dialog-content')!;
let returnFocus: HTMLElement | null = null;

// Native details work without JavaScript. Reuse their build-rendered content.
document.querySelectorAll<HTMLDetailsElement>('.project-details').forEach(details => {
  const trigger = details.querySelector('summary')!;
  trigger.setAttribute('aria-haspopup', 'dialog');
  trigger.addEventListener('click', event => {
    event.preventDefault();
    returnFocus = trigger;
    const caseStudy = details.querySelector('.case-study')!.cloneNode(true) as HTMLElement;
    caseStudy.querySelector('h2')!.id = 'dialog-title';
    content.replaceChildren(caseStudy);
    dialog.showModal();
    document.documentElement.classList.add('dialog-open');
    dialog.scrollTop = 0;
  });
});
document.querySelector('.dialog-close')!.addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  const bounds = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
});
dialog.addEventListener('close', () => {
  document.documentElement.classList.remove('dialog-open');
  content.replaceChildren();
  returnFocus?.focus({ preventScroll: true });
});

// Focus trap for dialog keyboard navigation
dialog.addEventListener('keydown', event => {
  if (event.key === 'Tab') {
    const focusable = dialog.querySelectorAll<HTMLElement>('button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
});

// Category filtering for projects
const filterButtons = document.querySelectorAll<HTMLButtonElement>('.filter-btn');
const projectCards = document.querySelectorAll<HTMLElement>('.project-grid .project');
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;
    filterButtons.forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
    projectCards.forEach(card => {
      const slug = card.dataset.categorySlug;
      if (filter === 'all' || slug === filter) {
        card.style.display = '';
        card.removeAttribute('hidden');
      } else {
        card.style.display = 'none';
        card.setAttribute('hidden', '');
      }
    });
  });
});

const observer = new IntersectionObserver(entries => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    navigation.querySelectorAll('a').forEach(link => {
      if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }
}, { rootMargin: '-10% 0px -65% 0px' });
document.querySelectorAll('main > section[id]').forEach(section => observer.observe(section));
