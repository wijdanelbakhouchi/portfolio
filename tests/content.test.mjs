import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync('index.html','utf8');
test('all external new-window links explicitly isolate the opener',()=>{for(const tag of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g))assert.match(tag[0],/rel="noopener noreferrer"/);});
test('content never uses inline scripts or unsafe HTML rendering',()=>{assert.doesNotMatch(html,/<script(?![^>]*src=)[^>]*>/);assert.doesNotMatch(readFileSync('src/main.ts','utf8'),/innerHTML|eval\(/);});
test('verified flagship and contact data remain available in HTML',()=>{assert.match(html,/id="agentshield"/);assert.match(html,/controlled research prototype/);assert.match(html,/mailto:wijdane.elbakhouchi24@gmail.com/);});
