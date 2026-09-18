import { initTheme } from './theme.ts';
import { initLoader } from './loader.ts';
import { ComputationalCore } from './core/ComputationalCore.ts';

// Initialize light/dark theme immediately
initTheme();

// Initialize cinematic system initialization sequence
initLoader();

// Initialize The Secure Computational Core 3D centerpiece (reduced-motion safe)
let core: ComputationalCore | null = null;
if (typeof window !== 'undefined' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  core = new ComputationalCore();
}

// Wire up skill categories to illuminate corresponding 3D agent nodes
const skillGroups = document.querySelectorAll<HTMLElement>('.skill-group');
skillGroups.forEach(group => {
  const category = group.dataset.coreCategory || null;
  group.addEventListener('mouseenter', () => {
    core?.highlightCategory(category);
  });
  group.addEventListener('mouseleave', () => {
    core?.highlightCategory(null);
  });
  group.addEventListener('focusin', () => {
    core?.highlightCategory(category);
  });
  group.addEventListener('focusout', () => {
    core?.highlightCategory(null);
  });
});

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

// Active section observer for navigation highlights
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

// Contact Form Handler with authentic mailto client dispatch & validation
const contactForm = document.getElementById('contact-form') as HTMLFormElement | null;
if (contactForm) {
  const nameInput = document.getElementById('contact-name') as HTMLInputElement;
  const emailInput = document.getElementById('contact-email') as HTMLInputElement;
  const subjectInput = document.getElementById('contact-subject') as HTMLInputElement;
  const messageInput = document.getElementById('contact-message') as HTMLTextAreaElement;
  const statusEl = document.getElementById('form-status') as HTMLElement;

  const nameError = document.getElementById('name-error') as HTMLElement;
  const emailError = document.getElementById('email-error') as HTMLElement;
  const subjectError = document.getElementById('subject-error') as HTMLElement;
  const messageError = document.getElementById('message-error') as HTMLElement;

  function clearErrors() {
    [nameError, emailError, subjectError, messageError].forEach(el => {
      if (el) el.textContent = '';
    });
    [nameInput, emailInput, subjectInput, messageInput].forEach(el => {
      if (el) el.classList.remove('input-invalid');
    });
    if (statusEl) {
      statusEl.textContent = '';
      statusEl.className = 'form-status';
    }
  }

  contactForm.addEventListener('submit', (e: Event) => {
    e.preventDefault();
    clearErrors();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const subject = subjectInput.value.trim();
    const message = messageInput.value.trim();

    let hasError = false;

    if (!name) {
      nameError.textContent = 'Please enter your name.';
      nameInput.classList.add('input-invalid');
      if (!hasError) nameInput.focus();
      hasError = true;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      emailError.textContent = 'Please enter your email address.';
      emailInput.classList.add('input-invalid');
      if (!hasError) emailInput.focus();
      hasError = true;
    } else if (!emailRegex.test(email)) {
      emailError.textContent = 'Please enter a valid email address.';
      emailInput.classList.add('input-invalid');
      if (!hasError) emailInput.focus();
      hasError = true;
    }

    if (!subject) {
      subjectError.textContent = 'Please enter a subject.';
      subjectInput.classList.add('input-invalid');
      if (!hasError) subjectInput.focus();
      hasError = true;
    }

    if (!message) {
      messageError.textContent = 'Please enter your message.';
      messageInput.classList.add('input-invalid');
      if (!hasError) messageInput.focus();
      hasError = true;
    }

    if (hasError) return;

    // Direct authentic dispatch via user's email client
    const mailtoUrl = `mailto:wijdane.elbakhouchi24@gmail.com?subject=${encodeURIComponent(`[Portfolio] ${subject}`)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

    statusEl.textContent = 'Opening your email client to transmit message...';
    statusEl.className = 'form-status status-active';

    setTimeout(() => {
      window.location.href = mailtoUrl;
      statusEl.textContent = 'Email client triggered. If it did not open automatically, you can write directly to wijdane.elbakhouchi24@gmail.com.';
      statusEl.className = 'form-status status-success';
      contactForm.reset();
    }, 400);
  });
}
