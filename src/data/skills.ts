export interface SkillCategory {
  title: string;
  badge: string;
  description: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: 'Artificial Intelligence & LLMs',
    badge: 'AI & INTELLIGENCE',
    description:
      'Designing generative models, retrieval architectures, autonomous agent workflows, and predictive analytics.',
    skills: [
      'Large Language Models (LLMs)',
      'Retrieval-Augmented Generation (RAG)',
      'Multi-Agent Systems (MAS)',
      'Natural Language Processing (NLP)',
      'Deep Learning',
      'Machine Learning',
      'Reinforcement Learning (Q-Learning)',
      'Computer Vision',
    ],
  },
  {
    title: 'AI & LLM Security',
    badge: 'RUNTIME DEFENSE',
    description:
      'Safeguarding generative models, agentic tool invocations, and multi-agent communications against emerging adversarial vectors.',
    skills: [
      'Prompt Injection Defense',
      'Tool Abuse Prevention',
      'Runtime Mediation',
      'Inter-Agent Trust Boundaries',
      'Threat Modeling',
      'Policy Enforcement (ALLOW / BLOCK / SANITIZE)',
      'Adversarial Testing',
      'Input/Output Sanitization',
    ],
  },
  {
    title: 'Programming Languages',
    badge: 'CORE CODE',
    description:
      'Writing performant, clean, and typed code across backend services, algorithmic models, and scripting.',
    skills: [
      'Python',
      'Java',
      'C / C++',
      'TypeScript',
      'JavaScript',
      'SQL',
      'HTML5 / CSS3',
      'PHP',
    ],
  },
  {
    title: 'AI / ML Frameworks & Libraries',
    badge: 'ECOSYSTEM',
    description:
      'Leveraging industry-standard open-source toolkits for training, fine-tuning, retrieval, and agent orchestration.',
    skills: [
      'LangChain',
      'LangGraph',
      'PyTorch',
      'Hugging Face Transformers',
      'ChromaDB',
      'Scikit-learn',
      'Mesa (Agent Simulation)',
      'Pandas & NumPy',
      'Gradio',
      'bitsandbytes (Quantization)',
    ],
  },
  {
    title: 'Data Engineering & Big Data',
    badge: 'INFRASTRUCTURE',
    description:
      'Building scalable batch and stream pipelines, distributed storage, and operational observability dashboards.',
    skills: [
      'Apache Spark / PySpark',
      'Apache Kafka / Redpanda',
      'Delta Lake',
      'Elastic Stack (Elasticsearch, Logstash, Kibana)',
      'MinIO Object Storage',
      'InfluxDB (Time Series)',
      'Power BI & Power Query',
      'ETL Pipeline Architecture',
    ],
  },
  {
    title: 'Software Engineering & DevOps',
    badge: 'SYSTEMS & CLOUD',
    description:
      'Shipping maintainable, tested, and containerized software systems with continuous integration and API design.',
    skills: [
      'FastAPI',
      'Docker & Docker Compose',
      'Git & GitHub Workflows',
      'RESTful API Development',
      'MySQL & Relational Modeling',
      'Linux / Bash Scripting',
      'Software Testing',
      'Vite & Web Architecture',
    ],
  },
];
