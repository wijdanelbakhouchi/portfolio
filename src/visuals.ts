/** Original code-native diagrams, explicitly conceptual rather than screenshots. */
export function workstation() {
  return `<figure class="workstation">
  <svg viewBox="0 0 800 550" role="img" aria-labelledby="workstation-title workstation-desc">
    <title id="workstation-title">An ecosystem of tools and concepts</title>
    <desc id="workstation-desc">A conceptual network map displaying technologies like Docker, PySpark, MySQL, and Python interconnected with data pipelines.</desc>
    
    <defs>
      <radialGradient id="node-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="var(--accent-blue)" stop-opacity="0.15"/>
        <stop offset="100%" stop-color="var(--accent-blue)" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="var(--accent-blue)" stop-opacity="0.6"/>
        <stop offset="100%" stop-color="var(--accent-brown)" stop-opacity="0.6"/>
      </linearGradient>
      <pattern id="dot-grid" width="30" height="30" patternUnits="userSpaceOnUse">
        <circle cx="15" cy="15" r="1.5" fill="var(--border)" opacity="0.6"/>
      </pattern>
    </defs>

    <!-- Background Grid -->
    <rect width="100%" height="100%" fill="url(#dot-grid)" rx="8" />

    <!-- Connecting Lines -->
    <g stroke="url(#line-grad)" stroke-width="1.5" fill="none" opacity="0.7">
      <!-- Main Hub Connections -->
      <path d="M 400 275 L 200 150" />
      <path d="M 400 275 L 600 150" />
      <path d="M 400 275 L 200 420" />
      <path d="M 400 275 L 600 420" />
      
      <!-- Outer Node Connections -->
      <path d="M 200 150 L 100 250" />
      <path d="M 600 150 L 700 250" />
      <path d="M 200 420 L 100 320" />
      <path d="M 600 420 L 700 320" />
      <path d="M 400 275 L 400 80" />
      <path d="M 400 275 L 400 480" />
      <path d="M 200 150 L 400 80" />
      <path d="M 600 150 L 400 80" />
      <path d="M 200 420 L 400 480" />
      <path d="M 600 420 L 400 480" />
      
      <!-- Extra cross-links -->
      <path d="M 100 250 L 100 320" stroke-dasharray="4 4" />
      <path d="M 700 250 L 700 320" stroke-dasharray="4 4" />
    </g>

    <!-- Center Hub -->
    <circle cx="400" cy="275" r="90" fill="url(#node-glow)"/>
    <rect x="330" y="240" width="140" height="70" rx="10" fill="var(--surface)" stroke="var(--accent-blue)" stroke-width="2"/>
    <text x="400" y="273" font-family="Manrope, sans-serif" font-size="15" font-weight="700" fill="var(--text-primary)" text-anchor="middle">INTELLIGENT</text>
    <text x="400" y="293" font-family="Manrope, sans-serif" font-size="13" fill="var(--text-secondary)" text-anchor="middle">SYSTEMS</text>

    <!-- Tech Nodes -->
    <g font-family="'IBM Plex Mono', monospace" font-size="12" font-weight="600" text-anchor="middle">
      
      <rect x="150" y="130" width="100" height="40" rx="20" fill="var(--surface-blue-soft)" stroke="var(--accent-blue)"/>
      <text x="200" y="154" fill="var(--accent-blue)">PySpark</text>
      
      <rect x="550" y="130" width="100" height="40" rx="20" fill="var(--surface)" stroke="var(--border)"/>
      <text x="600" y="154" fill="var(--text-primary)">Docker</text>

      <rect x="150" y="400" width="100" height="40" rx="20" fill="var(--surface)" stroke="var(--border)"/>
      <text x="200" y="424" fill="var(--text-primary)">MySQL</text>

      <rect x="550" y="400" width="100" height="40" rx="20" fill="var(--surface-blue-soft)" stroke="var(--accent-blue)"/>
      <text x="600" y="424" fill="var(--accent-blue)">LangChain</text>

      <rect x="350" y="60" width="100" height="40" rx="20" fill="var(--surface)" stroke="var(--border)"/>
      <text x="400" y="84" fill="var(--text-primary)">FastAPI</text>

      <rect x="350" y="460" width="100" height="40" rx="20" fill="var(--surface)" stroke="var(--border)"/>
      <text x="400" y="484" fill="var(--text-primary)">Python</text>

      <rect x="50" y="230" width="100" height="40" rx="20" fill="var(--surface)" stroke="var(--border)"/>
      <text x="100" y="254" fill="var(--text-primary)">Delta Lake</text>

      <rect x="650" y="230" width="100" height="40" rx="20" fill="var(--surface)" stroke="var(--border)"/>
      <text x="700" y="254" fill="var(--text-primary)">ChromaDB</text>

      <rect x="50" y="300" width="100" height="40" rx="20" fill="var(--surface)" stroke="var(--border)"/>
      <text x="100" y="324" fill="var(--text-primary)">Kafka</text>

      <rect x="650" y="300" width="100" height="40" rx="20" fill="var(--surface)" stroke="var(--border)"/>
      <text x="700" y="324" fill="var(--text-primary)">LangGraph</text>
    </g>

    <!-- Floating Concept Phrases -->
    <g font-family="Manrope, sans-serif" font-size="11" font-weight="700" fill="var(--accent-brown)" text-anchor="middle" letter-spacing="1">
      <text x="260" y="230" transform="rotate(-30, 260, 230)">DISTRIBUTED PIPELINES</text>
      <text x="540" y="230" transform="rotate(30, 540, 230)">RETRIEVAL-AUGMENTED</text>
      <text x="260" y="340" transform="rotate(30, 260, 340)">STREAM PROCESSING</text>
      <text x="540" y="340" transform="rotate(-30, 540, 340)">MULTI-AGENT SECURITY</text>
      <text x="400" y="160">RUNTIME MEDIATION</text>
      <text x="400" y="405">AGENT ORCHESTRATION</text>
    </g>

    <!-- Connection Dots -->
    <circle cx="200" cy="150" r="4" fill="var(--accent-blue)"/>
    <circle cx="600" cy="150" r="4" fill="var(--border)"/>
    <circle cx="200" cy="420" r="4" fill="var(--border)"/>
    <circle cx="600" cy="420" r="4" fill="var(--accent-blue)"/>
    <circle cx="100" cy="250" r="4" fill="var(--border)"/>
    <circle cx="700" cy="250" r="4" fill="var(--border)"/>
    <circle cx="100" cy="320" r="4" fill="var(--border)"/>
    <circle cx="700" cy="320" r="4" fill="var(--border)"/>
    <circle cx="400" cy="80" r="4" fill="var(--border)"/>
    <circle cx="400" cy="480" r="4" fill="var(--border)"/>
  </svg>
  <figcaption><span>01 / Ecosystem of tools &amp; frameworks</span><a href="#skills">Explore the toolkit <span aria-hidden="true">↗</span></a><small>Conceptual mind map</small></figcaption></figure>`;
}

export function projectVisual(id: string) {
  const diagrams: Record<string, { label: string; body: string }> = {
    agentshield: { label: 'Runtime security architecture', body: `<div class="security-flow"><span class="diagram-input">Untrusted input</span><span class="flow-connector" aria-hidden="true">↓</span><div class="boundary"><span class="boundary-label">RUNTIME MEDIATION</span><div class="diagram-step"><b>01</b><span>SecurityGateway<small>Normalize inputs</small></span></div><div class="diagram-step"><b>02</b><span>RiskAnalyzer<small>Heuristics &amp; contextual risk</small></span></div><div class="diagram-step"><b>03</b><span>PolicyEngine<small>Evaluate permissions</small></span></div><div class="policy-options"><span>ALLOW</span><span>SANITIZE</span><span>BLOCK</span><span>REVIEW</span></div></div><span class="flow-connector" aria-hidden="true">↓</span><div class="diagram-branches"><span>Agent handoffs</span><span>Tool calls</span><span>Outputs</span></div></div>` },
    legal: { label: 'Document-grounded retrieval', body: `<div class="retrieval-diagram"><div class="paper-stack"><span>§</span><small>Code du Travail</small><i></i><i></i><i></i></div><span class="flow-connector" aria-hidden="true">→</span><div class="retrieval-path"><span>Chunk &amp; embed</span><span>ChromaDB retrieval</span><div class="model-pair"><b>Mistral 7B</b><b>TinyLlama</b></div></div></div>` },
    streaming: { label: 'Streaming & storage architecture', body: `<div class="stream-diagram"><div class="diagram-branches"><span>Market data</span><span>News sentiment</span></div><span class="flow-connector" aria-hidden="true">↓</span><div class="stream-process"><span>Redpanda</span><span aria-hidden="true">→</span><b>PySpark</b></div><span class="flow-connector" aria-hidden="true">↓</span><div class="diagram-branches"><span>InfluxDB<small>Time series</small></span><span>Delta Lake / MinIO<small>Historical data</small></span></div></div>` },
    parking: { label: 'Agent-based allocation', body: `<div class="compact-diagram"><span class="diagram-symbol" aria-hidden="true">P</span><div><span class="diagram-input">Vehicle agents → Parking spots</span><div class="model-pair"><b>First-come first-served</b><b>Vickrey auction</b></div><small>Two allocation mechanisms in a Mesa simulation</small></div></div>` },
    pricing: { label: 'Reinforcement learning loop', body: `<div class="compact-diagram"><span class="diagram-symbol" aria-hidden="true">Q</span><div><div class="loop-flow"><span>State</span><span>→ Price</span><span>→ Reward</span></div><div class="return-path">↳ Update policy ↲</div><small>Inventory, demand and pricing decisions</small></div></div>` },
    libdata: { label: 'Library data integration', body: `<div class="compact-diagram"><span class="diagram-symbol" aria-hidden="true">≋</span><div><div class="loop-flow"><span>CSV / XLS</span><span>→ ETL</span><span>→ MySQL</span></div><div class="return-path">Power Query → Power BI</div><small>From catalog records to reporting</small></div></div>` },
    gestion: { label: 'Application architecture', body: `<div class="compact-diagram"><span class="diagram-symbol" aria-hidden="true">{ }</span><div><div class="loop-flow"><span>Swing UI</span><span>→ Java</span><span>→ JDBC</span></div><div class="return-path">MySQL / relational storage</div><small>Enrollment, course assignments and grades</small></div></div>` },
  };
  
  const imageMap: Record<string, string> = {
    streaming: '/images/projects/streaming.jpg',
    legal: '/images/projects/legal_1.jpg',
    gestion: '/images/projects/gestion.jpg',
    parking: '/images/projects/parking.jpg',
    pricing: '/images/projects/pricing.jpg',
    libdata: '/images/projects/libdata.jpg',
  };

  const visual = diagrams[id];
  if (!visual) return '';

  if (imageMap[id]) {
    return `<figure class="project-visual visual-${id} has-image"><img src="${imageMap[id]}" alt="${visual.label}" loading="lazy" class="project-image" /></figure>`;
  }

  return `<figure class="project-visual visual-${id}"><figcaption><span>${visual.label}</span><small>Conceptual diagram</small></figcaption>${visual.body}</figure>`;
}
