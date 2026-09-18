import { personalInfo } from './data/personal.ts';
import { projectList, type ProjectItem } from './data/projects.ts';
import { academicJourney } from './data/education.ts';
import { professionalExperiences } from './data/experience.ts';
import { skillCategories } from './data/skills.ts';
import { certificationsList } from './data/certifications.ts';
import { socialLinks } from './data/social.ts';

// Only local content is rendered at build time. Escape every data value.
export const escapeHtml = (value: string) => value.replace(/[&<>"']/g, char => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[char]!));
const e = escapeHtml;
const list = (items: string[]) => `<ul>${items.map(item => `<li>${e(item)}</li>`).join('')}</ul>`;
const tags = (items: string[]) => `<ul class="tags" aria-label="Technologies">${items.map(item => `<li>${e(item)}</li>`).join('')}</ul>`;
const external = (url: string, label: string, className = 'text-link') => `<a class="${className}" href="${e(url)}" target="_blank" rel="noopener noreferrer">${e(label)} <span aria-hidden="true">↗</span></a>`;
const socials = () => socialLinks.filter(link => link.isExternal).map(link => external(link.url, link.platform)).join('');
const cv = `.${personalInfo.cvPath}`;
const heading = (index: string, label: string, id: string, title: string, note = '') => `<div class="section-heading"><div><p class="eyebrow">${index} / ${label}</p><h2 id="${id}">${title}</h2></div>${note ? `<p class="section-heading-note">${note}</p>` : ''}</div>`;

function getCategorySlug(category: string): string {
  switch (category) {
    case 'AI & LLM Security':
    case 'AI & LLMs':
      return 'ai-llm';
    case 'Multi-Agent Systems':
      return 'mas';
    case 'Data Engineering':
      return 'data-eng';
    case 'Software Engineering':
      return 'software-eng';
    default:
      return 'other';
  }
}

function getSkillCoreCategory(index: number): string {
  switch (index) {
    case 0:
    case 3:
      return 'ai-llm';
    case 1:
      return 'security';
    case 4:
      return 'data';
    case 2:
    case 5:
    default:
      return 'systems';
  }
}

function architecture() {
  return `<figure class="architecture"><figcaption><span class="eyebrow">AgentShield / System Overview</span><span class="diagram-label">Conceptual Architecture</span></figcaption><div class="flow"><span>Untrusted input</span><span aria-hidden="true">↓</span><div class="security-boundary"><b>Runtime security layer</b><span>Gateway → Risk analysis → Policy</span></div><span aria-hidden="true">↓</span><div class="agent-nodes"><span>Agents</span><span>Tools</span><span>Outputs</span></div></div><p>Inspect inputs. Govern actions. Trace decisions.</p></figure>`;
}

function projectCard(project: ProjectItem, index: number) {
  const categorySlug = getCategorySlug(project.category);
  return `<article class="project${project.featured ? ' flagship' : ''}" id="${e(project.id)}" data-project-id="${e(project.id)}" data-category-slug="${categorySlug}">
    <div class="project-copy"><p class="eyebrow"><span class="project-number">${String(index + 1).padStart(2, '0')}</span> ${project.featured ? 'Master’s research / AI security' : e(project.category)}</p>
    <h3>${e(project.title)}</h3>${project.featured ? `<p class="flagship-subtitle">${e(project.subtitle!)}</p>` : ''}
    <p class="project-summary">${e(project.summary)}</p>${tags(project.technologies.slice(0, 4))}
    <div class="project-actions"><details class="project-details" id="details-${e(project.id)}"><summary>${project.featured ? 'View case study' : 'Project details'} <span aria-hidden="true">↗</span><span class="sr-only">: ${e(project.title)}</span></summary>
    <div class="case-study"><p class="eyebrow">${e(project.category)}</p><h2>${e(project.title)}</h2>${project.subtitle ? `<p class="case-subtitle">${e(project.subtitle)}</p>` : ''}<p>${e(project.summary)}</p>
    <section><h3>Engineering highlights</h3>${list(project.highlights)}</section>
    ${project.details.map(([title, body]) => `<section><h3>${e(title)}</h3><p>${e(body)}</p></section>`).join('')}
    <section><h3>Complete technology stack</h3>${tags(project.technologies)}</section>
    ${external(project.githubUrl, 'View repository', 'button primary')}${project.demoUrl ? external(project.demoUrl, 'Live demo', 'button secondary') : ''}</div></details>
    ${external(project.githubUrl, 'GitHub')}${project.demoUrl ? external(project.demoUrl, 'Live demo') : ''}</div>
    ${project.featured ? '<p class="scope-note">A controlled research prototype, evaluated within a defined threat model.</p>' : ''}</div>
    ${project.featured ? architecture() : ''}</article>`;
}

export function renderPortfolio() {
  return `<a class="skip-link" href="#main">Skip to content</a>
  <div id="system-loader" class="system-loader" role="status" aria-live="polite">
    <div class="loader-terminal">
      <div class="loader-header">
        <span class="loader-dot" aria-hidden="true"></span>
        <span class="loader-title">SECURE INTELLIGENCE SYSTEM // CASABLANCA</span>
        <span class="loader-counter">0%</span>
      </div>
      <div class="loader-logs"></div>
      <div class="loader-progress-track"><div class="loader-progress-bar"></div></div>
    </div>
  </div>
  <header class="header"><div class="wrap nav-layout"><a class="wordmark" href="#home" aria-label="Wijdane Elbakhouchi, home"><span class="monogram" aria-hidden="true">we<span>.</span></span><span>Wijdane Elbakhouchi</span></a>
  <nav id="navigation" aria-label="Main navigation"><a href="#home">Home</a><a href="#about">About</a><a href="#work">Projects</a><a href="#education">Background</a><a href="#skills">Skills</a><a href="#contact">Contact</a></nav>
  <div class="nav-actions"><button class="theme-toggle" type="button" aria-label="Switch to dark theme" title="Switch to dark theme" aria-pressed="false"><svg class="theme-icon-sun" aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg><svg class="theme-icon-moon" aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg><span class="sr-only">Toggle theme</span></button><a class="button nav-resume" href="${cv}" download>Resume <span aria-hidden="true">↓</span></a><button class="menu-toggle" aria-expanded="false" aria-controls="navigation">Menu <span aria-hidden="true">+</span></button></div></div></header>
  <main id="main">
  <section class="hero wrap" id="home" data-section="home" aria-labelledby="hero-title"><div class="hero-inner"><div class="hero-copy"><p class="eyebrow hero-kicker"><span class="small-line" aria-hidden="true"></span> Intelligence, with boundaries.</p><h1 id="hero-title">Wijdane<br><span>Elbakhouchi.</span></h1><p class="hero-role">AI &amp; Data Science Engineer</p><p class="hero-description">I build intelligent software, from document-grounded LLMs to real-time data pipelines—with a research focus on making multi-agent systems more secure.</p><div class="button-row"><a class="button primary" href="#work">View projects <span aria-hidden="true">↗</span></a><a class="button secondary" href="${cv}" download>Download resume <span aria-hidden="true">↓</span></a></div><div class="hero-socials">${socials()}<span class="location">${e(personalInfo.location)}</span></div></div>
  <figure class="portrait" id="hero-avatar"><div class="portrait-image"><img src=".${e(personalInfo.avatarPath)}" alt="Illustrated portrait of Wijdane Elbakhouchi" width="1024" height="1024" fetchpriority="high"></div><figcaption><span>Software developer<br>LLM security researcher</span><span class="portrait-mark" aria-hidden="true">[ w.e. ]</span></figcaption></figure></div>
  <div class="hero-footnote"><span>Currently pursuing a Master’s in Data Science &amp; AI · IPS</span><a href="#about" class="scroll-explore"><span>Scroll to explore</span> <span class="scroll-arrow" aria-hidden="true">↓</span></a></div></section>

  <section class="section wrap about" id="about" data-section="about" aria-labelledby="about-title"><div><p class="eyebrow">01 / About</p><h2 id="about-title">Curiosity in theory.<br>Purpose in practice.</h2><p class="section-note">Mathematical foundations.<br>Thoughtful engineering.</p></div><div class="about-copy"><div class="telemetry-strip" aria-label="System telemetry"><span class="telemetry-pill"><span class="pill-dot"></span>Casablanca, MA</span><span class="telemetry-pill">Master’s in IPS (Mohammed V Univ)</span><span class="telemetry-pill">AI &amp; Multi-Agent Security</span></div><p>I’m an AI and Data Science engineer pursuing a Master’s in <strong>Intelligent Processing Systems (IPS)</strong> at Mohammed V University in Rabat. My foundation in applied mathematics and computer science shapes how I approach complex problems.</p><p>I work across retrieval-augmented generation, multi-agent coordination and distributed data pipelines. My research asks how runtime security can make autonomous LLM workflows more reliable. I welcome conversations about AI and Data Science engineering roles and AI security research collaborations.</p>
  <details class="disclosure"><summary>Research interests &amp; current explorations</summary><div class="disclosure-body"><h3>Research interests</h3>${list(personalInfo.researchInterests)}<h3>Currently exploring</h3>${list(personalInfo.currentlyExploring)}</div></details><div class="languages" aria-label="Languages">${personalInfo.languages.map(language => `<span><strong>${e(language.name)}</strong> ${e(language.level)}</span>`).join('')}</div></div></section>

  <section class="section projects-section" id="work" data-section="work" aria-labelledby="work-title"><div class="wrap">${heading('02', 'Projects', 'work-title', 'Ideas, engineered.', 'Research prototypes and practical systems.<br>Explore the thinking behind the code.')}<div class="filter-bar" role="tablist" aria-label="Filter projects by discipline"><button class="filter-btn active" type="button" role="tab" aria-selected="true" data-filter="all">All <span class="filter-count">7</span></button><button class="filter-btn" type="button" role="tab" aria-selected="false" data-filter="ai-llm">AI &amp; LLMs</button><button class="filter-btn" type="button" role="tab" aria-selected="false" data-filter="mas">Multi-Agent Systems</button><button class="filter-btn" type="button" role="tab" aria-selected="false" data-filter="data-eng">Data Engineering</button><button class="filter-btn" type="button" role="tab" aria-selected="false" data-filter="software-eng">Software Engineering</button></div><div class="project-grid">${projectList.map(projectCard).join('')}</div><details class="disclosure additional-work"><summary>Coursework &amp; code experiments</summary><div class="supplemental-links">${external('https://github.com/wijdanelbakhouchi/MAS_Course_Labs', 'Multi-Agent Systems Labs')}${external('https://github.com/wijdanelbakhouchi/Code_C', 'C Data Structures Library')}</div></details></div></section>

  <section class="section wrap" id="education" data-section="education" aria-labelledby="education-title">${heading('03', 'Background', 'education-title', 'A foundation to build on.', 'Education and hands-on experience.')}<div class="background-layout"><div><h3 class="group-heading">Education</h3><div class="timeline">${academicJourney.map(stage => `<article class="timeline-item"><p class="meta">${e(stage.period)}${stage.status === 'In Progress' ? ' <span class="current-label">In progress</span>' : ''}</p><h4>${e(stage.degree)}</h4><p class="specialization">${e(stage.specialization)}</p><p>${e(stage.institution)}</p><p class="meta">${e(stage.location)}</p><details class="disclosure"><summary>Coursework &amp; academic details</summary><div class="disclosure-body"><p>${e(stage.description)}</p>${list(stage.keyHighlights)}<h5>Coursework</h5>${list(stage.coursework)}${stage.thesis ? `<p class="thesis-reference">Master’s thesis: <a href="#${e(stage.thesis.projectSlug!)}">${e(stage.thesis.title)} <span aria-hidden="true">↗</span></a></p>` : ''}</div></details></article>`).join('')}</div></div>
  <div id="experience"><h3 class="group-heading">Experience</h3>${professionalExperiences.map(experience => `<article class="experience-card"><p class="eyebrow">${e(experience.type)}</p><h4>${e(experience.role)}</h4><p class="organization">${e(experience.organization)} · ${e(experience.location)}</p><p class="meta">${e(experience.period)}</p><p>${e(experience.description)}</p><details class="disclosure"><summary>Responsibilities &amp; tools</summary><div class="disclosure-body">${list(experience.responsibilities)}${tags(experience.technologies)}</div></details></article>`).join('')}<a class="text-link background-cv" href="${cv}" download>Download full resume <span aria-hidden="true">↓</span></a></div></div></section>

  <section class="section skills-section" id="skills" data-section="skills" aria-labelledby="skills-title"><div class="wrap">${heading('04', 'Technical toolkit', 'skills-title', 'The tools behind the work.', 'From models and data to working software.')}<div class="skills-grid">${skillCategories.map((category, index) => `<details class="skill-group" data-core-category="${getSkillCoreCategory(index)}"><summary><span class="skill-index">${String(index + 1).padStart(2, '0')}</span><span><span class="skill-title">${e(category.title)}</span><span class="skill-preview">${e(category.skills.slice(0, 3).join(' · '))}</span></span><span class="disclosure-icon" aria-hidden="true">+</span></summary><div class="disclosure-body"><p>${e(category.description)}</p>${list(category.skills)}</div></details>`).join('')}</div></div></section>

  <section class="section wrap certifications" id="certifications" data-section="certifications" aria-labelledby="cert-title">${heading('05', 'Continued learning', 'cert-title', 'Certifications.')}<div class="certifications-grid">${certificationsList.map(cert => `<article class="certification"><p class="eyebrow">${e(cert.issuer)}${cert.platform !== cert.issuer ? ` / ${e(cert.platform)}` : ''}</p><h3>${e(cert.name)}</h3><details class="disclosure"><summary>Course details</summary><div class="disclosure-body"><p>${e(cert.description)}</p>${list(cert.skills)}</div></details></article>`).join('')}</div></section>

  <section class="contact-section" id="contact" data-section="contact" aria-labelledby="contact-title"><div class="wrap contact-layout"><div><p class="eyebrow">06 / Get in touch</p><h2 id="contact-title">Good systems start<br>with a conversation.</h2><p>Have an engineering opportunity or a research question?<br>I’d be glad to connect.</p></div><div class="contact-actions"><a class="contact-email" href="mailto:${e(personalInfo.email)}">${e(personalInfo.email)} <span aria-hidden="true">↗</span></a><div class="contact-socials">${socials()}<a class="text-link" href="${cv}" download>Resume <span aria-hidden="true">↓</span></a></div><p class="meta">${e(personalInfo.location)}</p></div></div></section>
  </main><footer class="wrap footer"><a class="wordmark" href="#home">Wijdane Elbakhouchi<span class="brand-dot">.</span></a><span>AI · Data Science · Secure systems</span><a class="text-link" href="#home">Back to top ↑</a></footer>
  <dialog id="project-dialog" aria-labelledby="dialog-title"><div class="dialog-toolbar"><span class="eyebrow">Project notebook</span><button class="dialog-close" aria-label="Close project details" autofocus>Close <span aria-hidden="true">×</span></button></div><div id="dialog-content"></div></dialog>`;
}
