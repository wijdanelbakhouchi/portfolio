const INTRO_SESSION_KEY = 'wijdane_intro_seen';

interface Step {
  tag: string;
  message: string;
  status: string;
}

const STEPS: Step[] = [
  { tag: '01/04', message: 'CORE COMPUTATIONAL SYSTEM INITIALIZED', status: 'ONLINE' },
  { tag: '02/04', message: 'DATA LAYER & MULTI-AGENT NETWORK VERIFIED', status: 'CONNECTED' },
  { tag: '03/04', message: 'RUNTIME DEFENSE ACTIVE: ALLOW / BLOCK / SANITIZE', status: 'ARMED' },
  { tag: '04/04', message: 'CASABLANCA SECURE INTERFACE READY', status: '100%' },
];

export function initLoader(): void {
  const loaderEl = document.getElementById('system-loader');
  if (!loaderEl) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let alreadySeen = false;
  try {
    alreadySeen = sessionStorage.getItem(INTRO_SESSION_KEY) === '1';
  } catch {
    // sessionStorage not accessible
  }

  // Skip immediately on repeat visits or if reduced motion is requested
  if (alreadySeen || prefersReducedMotion) {
    loaderEl.remove();
    document.documentElement.classList.add('system-ready');
    return;
  }

  const logsEl = loaderEl.querySelector<HTMLElement>('.loader-logs');
  const barEl = loaderEl.querySelector<HTMLElement>('.loader-progress-bar');
  const countEl = loaderEl.querySelector<HTMLElement>('.loader-counter');

  let currentStep = 0;
  const totalSteps = STEPS.length;
  const intervalMs = 130;
  let timer: number | null = null;

  function renderStep(stepIndex: number) {
    if (!logsEl) return;
    const step = STEPS[stepIndex];
    const logItem = document.createElement('div');
    logItem.className = 'loader-log-line';

    const tag = document.createElement('span');
    tag.className = 'log-tag';
    tag.textContent = `[${step.tag}]`;

    const msg = document.createElement('span');
    msg.className = 'log-msg';
    msg.textContent = ` ${step.message} `;

    const status = document.createElement('span');
    status.className = 'log-status';
    status.textContent = `→ ${step.status}`;

    logItem.appendChild(tag);
    logItem.appendChild(msg);
    logItem.appendChild(status);
    logsEl.appendChild(logItem);

    const progress = Math.min(100, Math.round(((stepIndex + 1) / totalSteps) * 100));
    if (barEl) barEl.style.width = `${progress}%`;
    if (countEl) countEl.textContent = `${progress}%`;
  }

  function finish() {
    if (timer !== null) {
      window.clearInterval(timer);
      timer = null;
    }
    try {
      sessionStorage.setItem(INTRO_SESSION_KEY, '1');
    } catch {
      // ignore
    }

    loaderEl?.remove();
    document.documentElement.classList.add('system-ready');
    window.dispatchEvent(new CustomEvent('systemready'));
  }

  // Dismiss immediately on click or key press so users/tests are never trapped
  loaderEl.addEventListener('click', () => finish());
  window.addEventListener('keydown', () => finish(), { once: true });

  // Initial step immediately
  renderStep(0);

  timer = window.setInterval(() => {
    currentStep++;
    if (currentStep < totalSteps) {
      renderStep(currentStep);
    } else {
      finish();
    }
  }, intervalMs);
}
