import { createHash } from 'node:crypto';
import type { IncomingMessage, ServerResponse } from 'node:http';
import { validateContact } from '../shared/contact.ts';

type Request = IncomingMessage & { body?: unknown };
type Options = { env?: NodeJS.ProcessEnv; fetchImpl?: typeof fetch; now?: () => number };
const BODY_LIMIT = 24_000;

/** Same handler for Vite development/preview and the Vercel server function. */
export function createContactHandler({ env = process.env, fetchImpl = fetch, now = Date.now }: Options = {}) {
  // Bounded, per-instance abuse throttle. Host-level rate limiting complements it.
  const attempts = new Map<string, { count: number; until: number }>();
  return async (req: Request, res: ServerResponse) => {
    const reply = (status: number, data: object) => {
      res.statusCode = status;
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.setHeader('Cache-Control', 'no-store');
      res.setHeader('X-Content-Type-Options', 'nosniff');
      res.end(JSON.stringify(data));
    };
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST');
      return reply(405, { error: 'Use POST to submit a message.' });
    }
    if (!req.headers['content-type']?.startsWith('application/json')) return reply(415, { error: 'Please submit the contact form as JSON.' });
    const origin = req.headers.origin;
    try {
      const allowedHost = env.SITE_URL ? new URL(env.SITE_URL).host : req.headers.host;
      if (!origin || new URL(origin).host !== allowedHost) return reply(403, { error: 'Please submit from the portfolio website.' });
    } catch { return reply(403, { error: 'Invalid request origin.' }); }
    let body: Record<string, unknown>;
    try {
      let raw = req.body;
      if (raw === undefined) {
        let bytes = 0;
        const chunks = [];
        for await (const chunk of req) {
          bytes += Buffer.byteLength(chunk);
          if (bytes > BODY_LIMIT) return reply(413, { error: 'Your message is too long.' });
          chunks.push(Buffer.from(chunk));
        }
        raw = Buffer.concat(chunks).toString('utf8');
      }
      if (Buffer.byteLength(typeof raw === 'string' ? raw : JSON.stringify(raw)) > BODY_LIMIT) return reply(413, { error: 'Your message is too long.' });
      const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
      if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('Invalid body');
      body = parsed as Record<string, unknown>;
    } catch { return reply(400, { error: 'The message could not be read. Please try again.' }); }
    if (body.website) return reply(400, { error: 'The message was not submitted. Please use the direct email link.' });
    const { data, errors } = validateContact(body);
    if (Object.keys(errors).length) return reply(400, { error: 'Please check the required fields.', errors });
    const key = req.headers['idempotency-key'];
    if (typeof key !== 'string' || !/^[a-zA-Z0-9-]{16,80}$/.test(key)) return reply(400, { error: 'Please reload the form and try again.' });
    if (!env.RESEND_API_KEY || !env.CONTACT_FROM_EMAIL || !env.CONTACT_TO_EMAIL) return reply(503, { error: 'The contact form is temporarily unavailable. Please use the direct email link.' });

    const timestamp = now();
    for (const [id, entry] of attempts) if (entry.until <= timestamp) attempts.delete(id);
    const address = String(req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown').split(',')[0];
    const addressKey = createHash('sha256').update(address).digest('hex');
    const entry = attempts.get(addressKey) || { count: 0, until: timestamp + 600_000 };
    if (entry.count >= 5 || (!attempts.has(addressKey) && attempts.size >= 5000)) {
      res.setHeader('Retry-After', '600');
      return reply(429, { error: 'Too many attempts. Please wait a few minutes or email directly.' });
    }
    attempts.set(addressKey, { ...entry, count: entry.count + 1 });
    try {
      const response = await fetchImpl('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json', 'Idempotency-Key': `portfolio-${key}` },
        body: JSON.stringify({
          from: env.CONTACT_FROM_EMAIL,
          to: [env.CONTACT_TO_EMAIL],
          reply_to: data.email,
          subject: `[Portfolio] ${data.subject}`,
          text: `From: ${data.name}\nReply to: ${data.email}\n\n${data.message}`,
        }),
        signal: AbortSignal.timeout(10000),
      });
      const result = await response.json().catch(() => null) as { id?: string } | null;
      if (!response.ok || !result?.id) return reply(502, { error: 'The email service did not confirm submission. Please retry or email directly.' });
      return reply(200, { ok: true });
    } catch { return reply(502, { error: 'We couldn’t confirm submission. Please retry or use the direct email link.' }); }
  };
}
