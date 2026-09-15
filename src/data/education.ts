export interface EducationStage {
  institution: string;
  degree: string;
  specialization: string;
  location: string;
  period: string;
  status: 'In Progress' | 'Completed';
  description: string;
  thesis?: {
    title: string;
    description: string;
    projectSlug?: string;
    link?: string;
  };
  coursework: string[];
  keyHighlights: string[];
}

export const academicJourney: EducationStage[] = [
  {
    institution: 'Faculty of Science, Mohammed V University',
    degree: "Master's Degree",
    specialization: 'Data Science & AI · Intelligent Processing Systems (IPS)',
    location: 'Rabat, Morocco',
    period: '2024 – Present',
    status: 'In Progress',
    description:
      'Advanced graduate research and engineering curriculum focused on modern Artificial Intelligence, Large Language Models, Multi-Agent Systems, Big Data architectures, and AI security.',
    thesis: {
      title:
        'AgentShield: A Runtime Security Layer for Multi-Agent LLM Systems Against Prompt Injection and Tool Abuse',
      description:
        'A comprehensive research prototype investigating real-time mediation, policy enforcement, inter-agent trust boundaries, and tool protection in collaborative LLM workflows.',
      projectSlug: 'agentshield',
      link: 'https://github.com/wijdanelbakhouchi/AgentShield',
    },
    coursework: [
      'Machine Learning',
      'Deep Learning',
      'Natural Language Processing (NLP)',
      'Multi-Agent Systems (MAS)',
      'Big Data & Streaming Architectures',
      'Advanced Algorithms & Optimization',
      'Data Mining & Warehousing',
      'Cloud & Distributed Computing',
    ],
    keyHighlights: [
      'Specialized focus on Generative AI, RAG pipelines, and multi-agent coordination',
      'Engineered the AgentShield runtime security architecture for LLM multi-agent safety',
      'Built multi-model legal assistants and real-time streaming architectures',
    ],
  },
  {
    institution: 'Multidisciplinary Faculty, Sultan Moulay Slimane University',
    degree: "Bachelor's Degree (Licence)",
    specialization: 'Mathematical and Computer Sciences (SMI)',
    location: 'Béni Mellal, Morocco',
    period: '2021 – 2024',
    status: 'Completed',
    description:
      'Rigorous undergraduate dual foundation merging applied mathematics, statistical theory, and computer science principles, emphasizing algorithmic problem-solving and software engineering.',
    coursework: [
      'Algorithms & Data Structures',
      'Object-Oriented Programming (Java)',
      'Systems Programming (C / C++)',
      'Relational Databases & SQL',
      'Probability & Inferential Statistics',
      'Linear Algebra & Numerical Analysis',
      'Operating Systems & UNIX Architecture',
      'Computer Networking & Web Technologies',
    ],
    keyHighlights: [
      'Graduated July 2024 with solid mastery in theoretical mathematics and practical computation',
      'Implemented academic management systems and data structure libraries',
      'Built algorithmic foundations that underpin modern Machine Learning and Data Science',
    ],
  },
  {
    institution: 'Lycée Qualifiant EL KHAWARIZMI',
    degree: 'Baccalaureate (Baccalauréat)',
    specialization: 'Mathematical Sciences A (Sciences Mathématiques A)',
    location: 'Souk Sebt Oulad Nemma, Morocco',
    period: '2019 – 2020',
    status: 'Completed',
    description:
      'Prestigious and demanding national curriculum specializing in pure mathematics, physics, and analytical thinking, laying the foundation for scientific problem solving.',
    coursework: [
      'Advanced Calculus & Analysis',
      'Algebra & Arithmetic',
      'Physics (Mechanics, Electromagnetism)',
      'Chemistry & Scientific Methodology',
    ],
    keyHighlights: [
      'Graduated July 2020 in Mathematical Sciences A',
      'Developed strong discipline in rigorous mathematical proof and analytical logic',
    ],
  },
];
