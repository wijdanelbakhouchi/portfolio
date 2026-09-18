import { validateContact, type ContactField } from '../shared/contact.ts';

export function initContactForm() {
  const form = document.querySelector<HTMLFormElement>('#contact-form');
  if (!form) return;
  const submit = form.querySelector<HTMLButtonElement>('[type="submit"]')!;
  const status = document.querySelector<HTMLElement>('#form-status')!;
  const fields = ['name', 'email', 'subject', 'message'] as const;
  const input = (field: ContactField) => form.elements.namedItem(field) as HTMLInputElement | HTMLTextAreaElement;
  let sending = false;
  let attemptId = '';
  let previousPayload = '';
  form.noValidate = true;
  submit.disabled = false;

  fields.forEach(field => input(field).addEventListener('input', () => {
    input(field).removeAttribute('aria-invalid');
    input(field).classList.remove('input-invalid');
    document.querySelector(`#${field}-error`)!.textContent = '';
  }));

  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (sending) return;
    const raw = Object.fromEntries(new FormData(form));
    const { data, errors } = validateContact(raw);
    for (const field of fields) {
      document.querySelector(`#${field}-error`)!.textContent = errors[field] || '';
      input(field).setAttribute('aria-invalid', String(Boolean(errors[field])));
      input(field).classList.toggle('input-invalid', Boolean(errors[field]));
    }
    const firstError = fields.find(field => errors[field]);
    if (firstError) {
      status.textContent = 'Please check the highlighted fields.';
      status.className = 'form-status status-error';
      input(firstError).focus();
      return;
    }
    const serialized = JSON.stringify(data);
    if (serialized !== previousPayload || !attemptId) attemptId = crypto.randomUUID();
    previousPayload = serialized;
    sending = true;
    submit.disabled = true;
    submit.textContent = 'Sending…';
    form.setAttribute('aria-busy', 'true');
    status.className = 'form-status status-active';
    status.textContent = 'Submitting your message…';
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Idempotency-Key': attemptId },
        body: JSON.stringify({ ...data, website: raw.website || '' }),
        signal: AbortSignal.timeout(15000),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || result?.ok !== true) {
        throw new Error(result?.error || 'The message could not be submitted. Please try again or use the direct email link.');
      }
      status.className = 'form-status status-success';
      status.textContent = 'Thank you. Your message has been accepted for delivery.';
      form.reset();
      attemptId = '';
      previousPayload = '';
    } catch (error) {
      status.className = 'form-status status-error';
      status.textContent = error instanceof Error && error.name !== 'TimeoutError' && error.name !== 'TypeError'
        ? error.message
        : 'We couldn’t confirm submission. Your message is still here—retry, or use the direct email link.';
    } finally {
      sending = false;
      submit.disabled = false;
      submit.textContent = 'Send message ↗';
      form.removeAttribute('aria-busy');
    }
  });
}
