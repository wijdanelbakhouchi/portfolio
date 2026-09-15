import './style.css';
import { layers, projects } from './content';

const root = document.documentElement;
const menu = document.querySelector<HTMLButtonElement>('.menu-toggle')!;
const navigation = document.querySelector<HTMLElement>('#navigation')!;

// 1. Mobile Menu
const setMenu = (open: boolean) => {
  menu.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('open', open);
};

menu.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    menu.focus();
  }
});

document.addEventListener('click', (event) => {
  if (event.target instanceof Node && !document.querySelector('.header')!.contains(event.target)) {
    setMenu(false);
  }
});

matchMedia('(min-width: 601px)').addEventListener('change', () => setMenu(false));

// 2. Theme Toggle
const themeButton = document.querySelector<HTMLButtonElement>('#theme-toggle')!;
function updateThemeLabel() {
  themeButton.setAttribute('aria-label', `Switch to ${root.dataset.theme === 'light' ? 'dark' : 'light'} theme`);
}
updateThemeLabel();
new MutationObserver(updateThemeLabel).observe(root, { attributes: true, attributeFilter: ['data-theme'] });

themeButton.addEventListener('click', () => {
  root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  try {
    localStorage.setItem('portfolio-theme', root.dataset.theme);
  } catch {
    /* Safe fallback if localStorage is disabled */
  }
});

// 3. Scroll Progress Indicator
const progress = document.querySelector<HTMLElement>('.scroll-progress')!;
let queued = false;
function updateProgress() {
  const range = root.scrollHeight - innerHeight;
  progress.style.width = `${range > 0 ? Math.min(100, (scrollY / range) * 100) : 0}%`;
  queued = false;
}
window.addEventListener(
  'scroll',
  () => {
    if (!queued) {
      queued = true;
      requestAnimationFrame(updateProgress);
    }
  },
  { passive: true }
);
updateProgress();

// 4. Section Observer for Active Navigation
const sectionObserver = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        navigation.querySelectorAll('a').forEach((link) => {
          if (link.hash === `#${entry.target.id}`) {
            link.setAttribute('aria-current', 'location');
          } else {
            link.removeAttribute('aria-current');
          }
        });
      }
    }
  },
  { rootMargin: '-15% 0px -60% 0px' }
);
document.querySelectorAll('main > section[id]').forEach((section) => sectionObserver.observe(section));

// 5. Project Dialog Modal
const dialog = document.querySelector<HTMLDialogElement>('#project-dialog')!;
let returnFocus: HTMLElement | null = null;

document.querySelectorAll<HTMLButtonElement>('[data-project]').forEach((button) =>
  button.addEventListener('click', () => {
    const projectKey = button.dataset.project!;
    const project = projects[projectKey];
    if (!project) return;
    returnFocus = button;

    document.querySelector('#dialog-title')!.textContent = project.title;
    document.querySelector('#dialog-category')!.textContent = project.category;
    document.querySelector('#dialog-summary')!.textContent = project.summary;

    const details = document.querySelector('#dialog-details')!;
    details.replaceChildren(
      ...project.details.map(([title, body]) => {
        const sec = document.createElement('section');
        const h3 = document.createElement('h3');
        h3.textContent = title;
        const p = document.createElement('p');
        p.textContent = body;
        sec.append(h3, p);
        return sec;
      })
    );

    document.querySelector<HTMLAnchorElement>(
      '#dialog-source'
    )!.href = `https://github.com/wijdanelbakhouchi/${project.repository}`;

    dialog.showModal();
    document.body.style.overflow = 'hidden';
    dialog.scrollTop = 0;
  })
);

document.querySelector('.dialog-close')!.addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
  const box = dialog.getBoundingClientRect();
  if (
    event.target === dialog &&
    (event.clientX < box.left ||
      event.clientX > box.right ||
      event.clientY < box.top ||
      event.clientY > box.bottom)
  ) {
    dialog.close();
  }
});
dialog.addEventListener('close', () => {
  document.body.style.overflow = '';
  returnFocus?.focus();
});

// 6. Architecture Layer Explorer (AgentShield)
document.querySelectorAll<HTMLButtonElement>('[data-layer]').forEach((button) => {
  const select = () => {
    document.querySelectorAll('[data-layer]').forEach((node) => {
      node.classList.toggle('active', node === button);
      node.setAttribute('aria-pressed', String(node === button));
    });
    document.querySelector('#layer-description')!.textContent = layers[button.dataset.layer!];
  };
  button.addEventListener('click', select);
  button.addEventListener('focus', select);
  button.addEventListener('pointerenter', (event) => {
    if (event.pointerType === 'mouse') select();
  });
});

// 7. Category Filter for Projects
const filterButtons = document.querySelectorAll<HTMLButtonElement>('.filter-btn');
const projectCards = document.querySelectorAll<HTMLElement>('.project');

filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterButtons.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;

    projectCards.forEach((card) => {
      const cardCategory = card.dataset.category;
      if (filter === 'all' || cardCategory === filter) {
        card.style.display = '';
        card.removeAttribute('hidden');
      } else {
        card.style.display = 'none';
        card.setAttribute('hidden', 'true');
      }
    });
  });
});

// 8. Three.js Scene Loader with capability and reduced motion checks
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const desktop = matchMedia('(min-width: 801px) and (pointer: fine)');
const motionButton = document.querySelector<HTMLButtonElement>('#motion-toggle')!;
let paused = reducedMotion.matches;
let scene: { setPaused: (val: boolean) => void; dispose: () => void } | undefined;
let loading = false;
let sceneEpoch = 0;

const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
const capable = () =>
  desktop.matches && !reducedMotion.matches && !connection?.saveData && (!memory || memory >= 4);

function updateMotion() {
  root.dataset.motion = paused ? 'paused' : 'running';
  motionButton.textContent = !capable() ? 'Static view' : paused ? 'Resume motion' : 'Pause motion';
  motionButton.disabled = !capable();
  motionButton.setAttribute('aria-pressed', String(paused));
  scene?.setPaused(paused);
}

async function loadScene() {
  if (!capable() || scene || loading) return;
  loading = true;
  const epoch = sceneEpoch;
  try {
    const { createCoreScene } = await import('./scene');
    if (epoch !== sceneEpoch || !capable()) return;
    scene = createCoreScene(document.querySelector('#core-scene')!);
    scene.setPaused(paused);
  } catch {
    /* Fallback remains fully visible if WebGL or dynamic import fails */
  } finally {
    loading = false;
  }
}

function reevaluateScene() {
  if (!capable()) {
    sceneEpoch++;
    scene?.dispose();
    scene = undefined;
  } else {
    void loadScene();
  }
  updateMotion();
}

motionButton.addEventListener('click', () => {
  paused = !paused;
  updateMotion();
});
reducedMotion.addEventListener('change', () => {
  paused = reducedMotion.matches;
  reevaluateScene();
});
desktop.addEventListener('change', reevaluateScene);
updateMotion();

if ('requestIdleCallback' in window) {
  window.requestIdleCallback(() => void loadScene(), { timeout: 1800 });
} else {
  setTimeout(() => void loadScene(), 800);
}

// 9. Accessible Contact Form Validation
const contactForm = document.querySelector<HTMLFormElement>('#contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const nameInput = document.querySelector<HTMLInputElement>('#contact-name')!;
    const emailInput = document.querySelector<HTMLInputElement>('#contact-sender-email')!;
    const subjectInput = document.querySelector<HTMLInputElement>('#contact-subject')!;
    const messageInput = document.querySelector<HTMLTextAreaElement>('#contact-message')!;
    const formStatus = document.querySelector<HTMLElement>('#form-status')!;

    let valid = true;

    const setError = (input: HTMLElement, errorId: string, msg: string) => {
      document.querySelector(errorId)!.textContent = msg;
      input.setAttribute('aria-invalid', msg ? 'true' : 'false');
      if (msg) valid = false;
    };

    setError(nameInput, '#name-error', nameInput.value.trim() ? '' : 'Please enter your name.');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setError(
      emailInput,
      '#email-error',
      emailPattern.test(emailInput.value.trim()) ? '' : 'Please provide a valid email address.'
    );
    setError(subjectInput, '#subject-error', subjectInput.value.trim() ? '' : 'Please specify a subject.');
    setError(messageInput, '#message-error', messageInput.value.trim() ? '' : 'Please enter your message.');

    if (valid) {
      const subject = encodeURIComponent(subjectInput.value.trim());
      const body = encodeURIComponent(
        `From: ${nameInput.value.trim()} (${emailInput.value.trim()})\n\nMessage:\n${messageInput.value.trim()}`
      );
      formStatus.hidden = false;
      formStatus.className = 'form-status success';
      formStatus.textContent = 'Preparing email client with your message details...';

      // Launch user's default email client safely with pre-filled content
      window.location.href = `mailto:wijdane.elbakhouchi24@gmail.com?subject=${subject}&body=${body}`;

      setTimeout(() => {
        formStatus.textContent = 'Message drafted in your client. You can also email directly at wijdane.elbakhouchi24@gmail.com.';
      }, 1500);
    } else {
      formStatus.hidden = false;
      formStatus.className = 'form-status error';
      formStatus.textContent = 'Please correct the highlighted fields before sending.';
    }
  });
}

// 10. AgentShield Terminal Scan Easter Egg
let sequence = '';
let lastKeyAt = 0;
let scanTimer: ReturnType<typeof setTimeout> | undefined;

document.addEventListener('keydown', (event) => {
  if (
    event.ctrlKey ||
    event.metaKey ||
    event.altKey ||
    event.target instanceof HTMLInputElement ||
    event.target instanceof HTMLTextAreaElement ||
    (event.target instanceof HTMLElement && event.target.isContentEditable) ||
    event.key.length !== 1
  ) {
    return;
  }
  if (Date.now() - lastKeyAt > 1800) sequence = '';
  lastKeyAt = Date.now();
  sequence = (sequence + event.key.toLowerCase()).slice(-11);
  if (sequence !== 'agentshield') return;

  const notice = document.querySelector<HTMLElement>('#scan-notice')!;
  notice.hidden = false;
  if (!reducedMotion.matches && !paused) root.classList.add('scan-active');
  clearTimeout(scanTimer);
  scanTimer = setTimeout(() => {
    notice.hidden = true;
    root.classList.remove('scan-active');
  }, 2800);
  sequence = '';
});
