import { projectList } from './data/projects';

export interface Project {
  title: string;
  category: string;
  summary: string;
  repository: string;
  details: [string, string][];
}

export const projects: Record<string, Project> = projectList.reduce((acc, p) => {
  acc[p.id] = {
    title: p.title,
    category: p.category.toUpperCase(),
    summary: p.summary,
    repository: p.repository,
    details: p.details,
  };
  return acc;
}, {} as Record<string, Project>);

export const layers: Record<string, string> = {
  gateway: 'Normalizes incoming prompts and decodes payloads before detection and policy evaluation.',
  analyzer: 'Extracts heuristic signals, patterns, and contextual risk scores to classify threat levels.',
  policy: 'Enforces decisive actions: ALLOW safe execution, SANITIZE prompt anomalies, send to REVIEW, or BLOCK malicious tool/prompt vectors.',
  output: 'Validates final model outputs against data leakage and policy violations while persisting redacted operational telemetry.',
};
