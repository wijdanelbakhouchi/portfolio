import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { once } from 'node:events';
import { createContactHandler } from '../server/contact.ts';
import { validateContact } from '../shared/contact.ts';

const valid = { name: 'Test Visitor', email: 'visitor@example.com', subject: 'Engineering opportunity', message: 'A test message, never sent to a real service.', website: '' };
const env = { RESEND_API_KEY: 'test-only', CONTACT_FROM_EMAIL: 'Portfolio <portfolio@example.com>', CONTACT_TO_EMAIL: 'owner@example.com' };
async function withServer(options, run) {
  const server = createServer(createContactHandler(options));
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  const origin = `http://127.0.0.1:${server.address().port}`;
  const submit = (body = valid, extra = {}) => fetch(`${origin}/api/contact`, {
    method: 'POST',
    headers: { Origin: origin, 'Content-Type': 'application/json', 'Idempotency-Key': 'test-request-12345678', ...extra },
    body: JSON.stringify(body),
  });
  try { await run(submit, origin); }
  finally { server.closeAllConnections(); await new Promise(resolve => server.close(resolve)); }
}

test('validation handles missing fields, bounds, malformed email and header injection', () => {
  assert.equal(Object.keys(validateContact({}).errors).length, 4);
  assert.deepEqual(validateContact(valid).errors, {});
  for (const [field, value] of [['name', 'x'.repeat(101)], ['email', 'not-email'], ['subject', 'hello\r\nBcc: someone'], ['message', 'x'.repeat(5001)]]) {
    assert.ok(validateContact({ ...valid, [field]: value }).errors[field]);
  }
});

test('missing configuration fails honestly without calling the provider', async () => {
  await withServer({ env: {}, fetchImpl: () => assert.fail('must not send') }, async submit => {
    const result = await submit();
    assert.equal(result.status, 503);
    assert.equal((await result.json()).ok, undefined);
  });
});

test('provider acceptance is required; receiver and sender cannot be chosen by visitors', async () => {
  const calls = [];
  await withServer({ env, fetchImpl: async (url, options) => {
    calls.push({ url, options });
    return Response.json({ id: 'provider-confirmation' });
  } }, async submit => {
    const result = await submit({ ...valid, to: 'attacker@example.com', from: 'attacker@example.com' });
    assert.equal(result.status, 200);
    assert.deepEqual(await result.json(), { ok: true });
    const payload = JSON.parse(calls[0].options.body);
    assert.deepEqual(payload.to, [env.CONTACT_TO_EMAIL]);
    assert.equal(payload.from, env.CONTACT_FROM_EMAIL);
    assert.equal(payload.reply_to, valid.email);
    assert.equal(payload.html, undefined);
    assert.equal(calls[0].options.headers['Idempotency-Key'], 'portfolio-test-request-12345678');
    assert.equal(calls[0].url, 'https://api.resend.com/emails');
  });
});

test('provider rejection, malformed success and network failure never report success', async () => {
  for (const fetchImpl of [async () => Response.json({ error: 'private provider detail' }, { status: 403 }), async () => Response.json({}), async () => { throw new Error('secret error'); }]) {
    await withServer({ env, fetchImpl }, async submit => {
      const result = await submit();
      assert.equal(result.status, 502);
      const body = await result.text();
      assert.doesNotMatch(body, /private provider detail|secret error|"ok":true/);
    });
  }
});

test('invalid input, cross-origin, honeypot, oversized payload and wrong method rejected', async () => {
  await withServer({ env, fetchImpl: () => assert.fail('must not send') }, async (submit, origin) => {
    assert.equal((await submit({ ...valid, email: 'invalid' })).status, 400);
    assert.equal((await submit(valid, { Origin: 'https://unrelated.example' })).status, 403);
    assert.equal((await submit({ ...valid, website: 'bot-content' })).status, 400);
    assert.equal((await submit({ ...valid, message: 'x'.repeat(30_000) })).status, 413);
    assert.equal((await submit(valid, { 'Content-Type': 'text/plain' })).status, 415);
    assert.equal((await fetch(`${origin}/api/contact`)).status, 405);
  });
});

test('retries reuse provider key, and rate limiter expires', async () => {
  let now = 1;
  const keys = [];
  await withServer({ env, now: () => now, fetchImpl: async (_url, options) => {
    keys.push(options.headers['Idempotency-Key']);
    return Response.json({ id: 'same-message' });
  } }, async submit => {
    for (let i = 0; i < 5; i++) assert.equal((await submit()).status, 200);
    assert.equal(new Set(keys).size, 1);
    const limited = await submit();
    assert.equal(limited.status, 429);
    assert.equal(limited.headers.get('Retry-After'), '600');
    now += 600_001;
    assert.equal((await submit()).status, 200);
  });
});
