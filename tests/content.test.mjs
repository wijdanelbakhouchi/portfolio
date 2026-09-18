import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { renderPortfolio, escapeHtml } from '../src/render.ts';
import { projectList } from '../src/data/projects.ts';
import { academicJourney } from '../src/data/education.ts';
import { skillCategories } from '../src/data/skills.ts';
import { certificationsList } from '../src/data/certifications.ts';
import { professionalExperiences } from '../src/data/experience.ts';
import { personalInfo } from '../src/data/personal.ts';

const html = renderPortfolio();
test('one card for every project, with unique IDs and repositories', () => {
  assert.equal(projectList.length, 7);
  assert.equal(new Set(projectList.map(p => p.id)).size, projectList.length);
  assert.equal(new Set(projectList.map(p => p.githubUrl)).size, projectList.length);
  assert.equal([...html.matchAll(/data-project-id=/g)].length, projectList.length);
  for (const p of projectList) assert.equal([...html.matchAll(new RegExp(`data-project-id="${p.id}"`, 'g'))].length, 1);
  const ids = [...html.matchAll(/(?<![-\w])id="([^"]+)"/g)].map(match => match[1]);
  assert.equal(ids.length, new Set(ids).size, 'duplicate HTML IDs');
});
test('every project detail, highlight and technology is preserved', () => {
  for (const project of projectList) {
    for (const text of [project.title, project.summary, ...project.technologies, ...project.highlights, ...project.details.flat()]) {
      assert.ok(html.includes(escapeHtml(text)), `missing ${project.id}: ${text}`);
    }
    assert.ok(html.includes(escapeHtml(project.githubUrl)));
  }
});
test('profile, degrees, skills, experience and certifications remain available', () => {
  assert.equal(academicJourney.length, 3);
  assert.equal(certificationsList.length, 2);
  assert.equal(professionalExperiences.length, 1);
  const preserved = [
    ...academicJourney.flatMap(x => [x.institution, x.degree, x.specialization, x.period, x.description, ...x.coursework, ...x.keyHighlights]),
    ...skillCategories.flatMap(x => [x.title, ...x.skills]),
    ...certificationsList.flatMap(x => [x.name, x.issuer, x.description, ...x.skills]),
    ...professionalExperiences.flatMap(x => [x.role, x.organization, x.period, ...x.responsibilities, ...x.technologies]),
    ...personalInfo.researchInterests, ...personalInfo.currentlyExploring,
    ...personalInfo.languages.flatMap(x => [x.name, x.level]), personalInfo.email,
  ];
  for (const text of preserved) assert.ok(html.includes(escapeHtml(text)), `missing: ${text}`);
  assert.ok(existsSync(`public${personalInfo.cvPath}`));
  assert.ok(existsSync(`public${personalInfo.avatarPath}`));
});
test('external links isolate the opener and content is escaped', () => {
  for (const match of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)) assert.match(match[0], /rel="noopener noreferrer"/);
  assert.equal(escapeHtml('<script>"&\'</script>'), '&lt;script&gt;&quot;&amp;&#39;&lt;/script&gt;');
  assert.doesNotMatch(readFileSync('src/main.ts', 'utf8'), /innerHTML|eval\(/);
  assert.doesNotMatch(readFileSync('index.html', 'utf8'), /<script(?![^>]*src=)[^>]*>/);
});
test('research scope and authentic contact method are explicit', () => {
  assert.match(html, /controlled research prototype/i);
  assert.match(html, /mailto:wijdane.elbakhouchi24@gmail.com/);
  assert.match(html, /<form\b[^>]*id="contact-form"/);
  assert.doesNotMatch(html, /Verified Credentials|data-theme/);
});
