export interface Language {
  name: string;
  level: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  headline: string;
  subheadline: string;
  mission: string;
  location: string;
  status: string;
  email: string;
  cvPath: string;
  avatarPath: string;
  researchInterests: string[];
  currentlyExploring: string[];
  languages: Language[];
}

export const personalInfo: PersonalInfo = {
  name: 'ELBAKHOUCHI Wijdane',
  title: 'AI & Data Science Engineer · Software Developer · LLM Security Researcher',
  headline: 'AI • Data Science • Software Engineering • LLM Security',
  subheadline: 'Intelligence, with boundaries.',
  mission: 'I design intelligent, reliable, and secure software systems at the intersection of Artificial Intelligence, Data Science, and Cybersecurity.',
  location: 'Rabat, Morocco',
  status: "Master's Student in Data Science & AI (IPS)",
  email: 'wijdane.elbakhouchi24@gmail.com',
  cvPath: '/documents/CV_ELBAKHOUCHI_Wijdane.pdf',
  avatarPath: '/images/avatar/wijdane-avatar.jpg',
  researchInterests: [
    'LLM & Multi-Agent Security',
    'Runtime Policy Enforcement',
    'Prompt Injection & Tool Abuse Defense',
    'Retrieval-Augmented Generation (RAG)',
    'Distributed Data Engineering',
    'Responsible & Safe AI',
  ],
  currentlyExploring: [
    'Runtime Security Layers for Autonomous Agents',
    'Adversarial Benchmarks for LLM Vulnerability Assessment',
    'Real-time Stream Processing with Delta Lake & Kafka',
  ],
  languages: [
    { name: 'Arabic', level: 'Native' },
    { name: 'English', level: 'Upper Intermediate (B2)' },
    { name: 'French', level: 'Intermediate (B1)' },
  ],
};
