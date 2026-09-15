export interface ExperienceItem {
  role: string;
  organization: string;
  location: string;
  type: string;
  period: string;
  description: string;
  technologies: string[];
  responsibilities: string[];
}

export const professionalExperiences: ExperienceItem[] = [
  {
    role: 'Data Engineering Intern',
    organization: 'IRMA-Service',
    location: 'Casablanca, Morocco',
    type: 'Internship',
    period: 'Aug 2025 – Sep 2025',
    description:
      'Engineered a centralized data monitoring and observability pipeline utilizing the Elastic Stack (ELK) to ingest, process, and analyze high-volume infrastructure metrics in real time.',
    technologies: [
      'Elasticsearch',
      'Logstash',
      'Kibana',
      'ElastAlert',
      'Python',
      'Data Pipelines',
      'Linux',
    ],
    responsibilities: [
      'Built a centralized data monitoring and analytics pipeline using the Elastic Stack (ELK) to process and visualize large system telemetry datasets.',
      'Designed interactive Kibana dashboards to track and analyze critical metrics including incident error rates, system latency, and user activity trends.',
      'Configured and implemented real-time alerting rules with ElastAlert for proactive anomaly detection, significantly reducing incident response times.',
      'Wrote data processing scripts in Python to validate and parse heterogeneous log formats prior to indexing.',
    ],
  },
];
