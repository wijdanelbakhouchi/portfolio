export interface ProjectDetail {
  title: string;
  content: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle?: string;
  category: 'AI & LLM Security' | 'AI & LLMs' | 'Multi-Agent Systems' | 'Data Engineering' | 'Software Engineering';
  featured?: boolean;
  summary: string;
  technologies: string[];
  repository: string;
  githubUrl: string;
  demoUrl?: string;
  highlights: string[];
  details: [string, string][];
}

export const projectList: ProjectItem[] = [
  {
    id: 'agentshield',
    title: 'AgentShield',
    subtitle: 'A Runtime Security Layer for Multi-Agent LLM Systems Against Prompt Injection and Tool Abuse',
    category: 'AI & LLM Security',
    featured: true,
    summary:
      'Flagship Master’s research project investigating runtime mediation, prompt injection defense, tool sandboxing, and policy enforcement across collaborative LLM agents.',
    technologies: ['Python', 'FastAPI', 'LangGraph', 'LangChain', 'SQLAlchemy', 'React', 'Docker'],
    repository: 'AgentShield',
    githubUrl: 'https://github.com/wijdanelbakhouchi/AgentShield',
    highlights: [
      'Layered mediation intercepting user inputs, agent-to-agent messages, and tool invocations',
      'Configurable policy engine supporting ALLOW, BLOCK, SANITIZE, and REVIEW decisions',
      'InterAgentGuard isolating researcher, planner, and writer roles in LangGraph workflows',
      'Redacted telemetry and output certification for traceable security auditing',
    ],
    details: [
      [
        'The Threat Landscape',
        'In multi-agent systems, instructions can enter via untrusted documents, external tool return values, or compromised peer agents—not just the initial user prompt. Traditional single-turn prompt guards fail to protect autonomous execution loops.',
      ],
      [
        'Layered Defense Pipeline',
        'AgentShield establishes a shared normalization, heuristic scanning, contextual risk scoring, and policy evaluation pipeline. Actions can be allowed, sanitized of instruction markers, escalated for human review, or outright blocked.',
      ],
      [
        'System Architecture',
        'Built with FastAPI and LangGraph: Incoming prompts flow through SecurityGateway → RiskAnalyzer → PolicyEngine. During multi-agent collaboration, InterAgentGuard inspects state handoffs, a ToolBroker verifies permissions, and OutputGuard cleans final responses.',
      ],
      [
        'Research Scope & Rigor',
        'Developed as a research prototype under a defined threat model. Designed with reproducible evaluation harnesses, benchmark suites, and decoupled policies to enable rigorous academic security analysis.',
      ],
    ],
  },
  {
    id: 'legal',
    title: 'Multi-Model Legal RAG (JuristAI Maroc)',
    subtitle: 'Comparative Legal Question Answering Grounded in Moroccan Labor Law',
    category: 'AI & LLMs',
    summary:
      'A document-grounded legal assistant comparing Mistral 7B and TinyLlama for Moroccan Labor Code (Code du Travail) queries in French and Arabic.',
    technologies: ['Python', 'PyTorch', 'Transformers', 'LangChain', 'ChromaDB', 'Gradio', 'bitsandbytes'],
    repository: 'Multi-Model-Legal-RAG',
    githubUrl: 'https://github.com/wijdanelbakhouchi/Multi-Model-Legal-RAG',
    highlights: [
      'Chunking and vector search pipeline over Moroccan legal PDFs using ChromaDB',
      'Side-by-side inference evaluation of Mistral 7B vs TinyLlama with 4-bit quantization',
      'Bilingual query handling (French & Arabic) with Gradio interactive UI',
    ],
    details: [
      [
        'The Problem',
        'Legal questions demand high precision and zero hallucinations. This project investigated grounded retrieval and model trade-offs under consumer GPU resource constraints.',
      ],
      [
        'Architecture',
        'PDF Ingestion → Recursive Chunking → Hugging Face Embeddings → ChromaDB Vector Retrieval → Prompt Synthesis → Mistral 7B / TinyLlama Generation → Gradio UI.',
      ],
      [
        'Optimization & Findings',
        'Employed bitsandbytes quantization to run inference within Google Colab environments while comparing factual accuracy, latency, and token efficiency between lightweight and standard model weights.',
      ],
    ],
  },
  {
    id: 'parking',
    title: 'Multi-Agent Smart Parking System',
    subtitle: 'Autonomous Resource Allocation & Decentralized Simulation',
    category: 'Multi-Agent Systems',
    summary:
      'A visual simulation platform comparing First-Come First-Served allocation with Vickrey auctions for autonomous parking agents on a Mesa grid.',
    technologies: ['Python', 'Mesa', 'FastAPI', 'React', 'Vite', 'Recharts'],
    repository: 'Projet_MAS_Smart-Parking',
    githubUrl: 'https://github.com/wijdanelbakhouchi/Projet_MAS_Smart-Parking',
    highlights: [
      'Multi-agent environment modeling autonomous vehicles, parking spots, and district managers',
      'Comparative economic mechanism design (FCFS vs second-price Vickrey auctions)',
      'Real-time metrics tracking occupancy rates, driver walking distance, and waiting times',
    ],
    details: [
      [
        'The Problem',
        'Urban parking allocation involves selfish agents, heterogeneous driver valuations, and fluctuating traffic density. Centralized allocation causes bottlenecks, while uncoordinated hunting causes congestion.',
      ],
      [
        'Agent Design',
        'Implemented in Python with Mesa: Vehicle agents formulate bidding strategies based on proximity and urgency; Spot agents advertise status; Manager agents clear auctions and resolve conflicts.',
      ],
      [
        'Full-Stack Telemetry',
        'FastAPI backend exposes simulation steps via REST endpoints to a React frontend with live grid rendering and analytical Recharts telemetry.',
      ],
    ],
  },
  {
    id: 'streaming',
    title: 'Spark Streaming Crypto',
    subtitle: 'Real-Time Cryptocurrency Market & Media Sentiment Lambda Architecture',
    category: 'Data Engineering',
    summary:
      'A streaming Big Data pipeline ingesting live crypto transactions and news sentiment, computing windowed aggregates and serving dual storage paths.',
    technologies: ['Python', 'PySpark', 'Kafka / Redpanda', 'Delta Lake', 'MinIO', 'InfluxDB', 'Grafana', 'Docker Compose'],
    repository: 'Spark-Streaming-Crypto',
    githubUrl: 'https://github.com/wijdanelbakhouchi/Spark-Streaming-Crypto',
    highlights: [
      'Real-time stream ingestion with Kafka-compatible Redpanda and Python producers',
      'PySpark Structured Streaming computing sliding OHLC candlesticks and sentiment averages',
      'Dual-path storage: InfluxDB for time-series metrics and Delta Lake on MinIO for historical analytics',
    ],
    details: [
      [
        'The Architecture',
        'Lambda architecture orchestrating containerized services via Docker Compose. Handles concurrent high-velocity feeds of live ticker prices and processed news headlines.',
      ],
      [
        'Processing Engine',
        'PySpark Structured Streaming performs watermarking and tumbling/sliding window aggregations, detecting volatility spikes and correlating price movements with media sentiment.',
      ],
      [
        'Visualization & Querying',
        'Live system metrics and operational dashboards rendered in Grafana, with Trino providing interactive SQL querying over the cold Delta Lake object store.',
      ],
    ],
  },
  {
    id: 'pricing',
    title: 'Retail Dynamic Pricing with RL',
    subtitle: 'Q-Learning Agent for Inventory Management and Price Elasticity',
    category: 'AI & LLMs',
    summary:
      'A Reinforcement Learning agent leveraging tabular Q-Learning to determine optimal pricing strategies across changing demand and inventory levels.',
    technologies: ['Python', 'NumPy', 'Pandas', 'Q-Learning', 'Matplotlib'],
    repository: 'Retail-Dynamic-Pricing-RL',
    githubUrl: 'https://github.com/wijdanelbakhouchi/Retail-Dynamic-Pricing-RL',
    highlights: [
      'Custom environment modeling customer demand curves, price elasticity, and stock decay',
      'Q-Learning agent balancing exploration and exploitation to maximize total revenue',
      'Empirical analysis demonstrating convergence compared against fixed-price baselines',
    ],
    details: [
      [
        'Reinforcement Learning Formulation',
        'State space defined by discrete remaining inventory and market demand tiers; Action space defined by price adjustments; Reward function penalized stockouts while maximizing margin.',
      ],
      [
        'Implementation',
        'Implemented from first principles using NumPy and Pandas for state transitions, featuring visual convergence plots and policy heatmaps.',
      ],
    ],
  },
  {
    id: 'libdata',
    title: 'LibData BI Integration',
    subtitle: 'Library Metadata ETL Pipeline & Executive Power BI Dashboard',
    category: 'Data Engineering',
    summary:
      'An end-to-end Business Intelligence pipeline cleaning, harmonizing, and migrating heterogeneous library datasets into the PMB SIGB database.',
    technologies: ['PHP', 'MySQL', 'Power BI', 'Power Query', 'Data Cleaning'],
    repository: 'LibData-BI-Integration',
    githubUrl: 'https://github.com/wijdanelbakhouchi/LibData-BI-Integration',
    highlights: [
      'Automated extraction and normalization of multi-source CSV and Excel catalog data',
      'Database schema alignment and relational migration into PMB (PhpMyBibli) MySQL backend',
      'Interactive Power BI executive dashboards analyzing circulation, borrowing patterns, and acquisitions',
    ],
    details: [
      [
        'Business Intelligence Pipeline',
        'Solved data fragmentation across disparate file formats by designing a validation and transformation pipeline in PHP and Power Query, ensuring referential integrity in MySQL.',
      ],
      [
        'Analytics Dashboard',
        'Built key performance indicator (KPI) dashboards in Power BI tracking reader demographics, loan velocity, and inventory turnover.',
      ],
    ],
  },
  {
    id: 'gestion',
    title: 'Gestion Universitaire',
    subtitle: 'Academic Administration & Course Management Desktop System',
    category: 'Software Engineering',
    summary:
      'A desktop enterprise application designed to streamline student registration, professor assignments, and grading management using Java Swing and MySQL.',
    technologies: ['Java', 'Swing GUI', 'MySQL', 'JDBC', 'OOP Architecture'],
    repository: 'Gestion-universitaire',
    githubUrl: 'https://github.com/wijdanelbakhouchi/Gestion-universitaire',
    highlights: [
      'Modular Object-Oriented architecture implementing full CRUD workflows',
      'Secure JDBC connectivity to MySQL with transaction handling and relational integrity',
      'Intuitive desktop GUI designed in Java Swing with custom data tables and search filters',
    ],
    details: [
      [
        'Software Architecture',
        'Structured around clean separation of concerns: Model classes, DAO persistence layers with JDBC, and responsive Java Swing presentation views.',
      ],
      [
        'Core Functionality',
        'Comprehensive workflows for department enrollment, module tracking, grade calculations, and transcript generation.',
      ],
    ],
  },
];

export const projectCategories = [
  'All',
  'AI & LLM Security',
  'AI & LLMs',
  'Multi-Agent Systems',
  'Data Engineering',
  'Software Engineering',
] as const;
