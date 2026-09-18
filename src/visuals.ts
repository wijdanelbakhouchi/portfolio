export function workstation() {
  return `<figure class="workstation">
  <svg viewBox="0 0 800 550" role="img" aria-labelledby="workstation-title workstation-desc">
    <title id="workstation-title">Tech Stack Cloud</title>
    
    <defs>
      <filter id="blur-sm" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="2.5" />
      </filter>
      <filter id="blur-md" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="5" />
      </filter>
      <radialGradient id="glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="var(--surface-blue)" stop-opacity="0.3"/>
        <stop offset="100%" stop-color="var(--surface)" stop-opacity="0"/>
      </radialGradient>
    </defs>

    <rect width="100%" height="100%" fill="transparent" />
    
    <circle cx="400" cy="275" r="300" fill="url(#glow)"/>

    <g font-family="'Manrope', sans-serif" font-weight="700" text-anchor="middle">
      
      <!-- FOREGROUND (Sharp, in focus) -->
      <!-- PySpark -->
      <g transform="translate(250, 150)">
        <rect x="-70" y="-23" width="140" height="46" rx="23" fill="var(--surface-blue-soft)" stroke="var(--accent-blue)" stroke-width="1.5"/>
        <text y="5" fill="var(--accent-blue)" font-size="16">PySpark</text>
      </g>

      <!-- Docker -->
      <g transform="translate(550, 180)">
        <rect x="-65" y="-23" width="130" height="46" rx="23" fill="var(--surface)" stroke="var(--border)" stroke-width="1.5"/>
        <text y="5" fill="var(--text-primary)" font-size="16">Docker</text>
      </g>

      <!-- Python -->
      <g transform="translate(400, 260)">
        <rect x="-80" y="-25" width="160" height="50" rx="25" fill="var(--surface)" stroke="var(--border)" stroke-width="1.5"/>
        <text y="6" fill="var(--text-primary)" font-size="18">Python</text>
      </g>

      <!-- MySQL -->
      <g transform="translate(260, 370)">
        <rect x="-65" y="-23" width="130" height="46" rx="23" fill="var(--surface)" stroke="var(--border)" stroke-width="1.5"/>
        <text y="5" fill="var(--text-primary)" font-size="16">MySQL</text>
      </g>

      <!-- LangChain -->
      <g transform="translate(540, 350)">
        <rect x="-75" y="-23" width="150" height="46" rx="23" fill="var(--surface-blue-soft)" stroke="var(--accent-blue)" stroke-width="1.5"/>
        <text y="5" fill="var(--accent-blue)" font-size="16">LangChain</text>
      </g>

      <!-- MIDGROUND (Slightly smaller, 0.7 opacity, no border, just text) -->
      <g opacity="0.8">
        <text x="120" y="240" fill="var(--text-primary)" font-size="16">Delta Lake</text>
        <text x="670" y="270" fill="var(--text-primary)" font-size="16">FastAPI</text>
        <text x="400" y="120" fill="var(--text-primary)" font-size="16">Kafka</text>
        <text x="420" y="420" fill="var(--text-primary)" font-size="16">ChromaDB</text>
        <text x="160" y="450" fill="var(--text-primary)" font-size="16">TypeScript</text>
        <text x="680" y="450" fill="var(--text-primary)" font-size="16">React</text>
      </g>

      <!-- BACKGROUND (Blurred, muted, small) -->
      <g opacity="0.6" filter="url(#blur-sm)">
        <text x="150" y="100" fill="var(--text-muted)" font-size="18">Airflow</text>
        <text x="650" y="90" fill="var(--text-muted)" font-size="18">Kubernetes</text>
        <text x="80" y="340" fill="var(--text-muted)" font-size="18">PostgreSQL</text>
        <text x="730" y="360" fill="var(--text-muted)" font-size="18">LLMs</text>
        <text x="520" y="480" fill="var(--text-muted)" font-size="18">AWS</text>
        <text x="280" y="500" fill="var(--text-muted)" font-size="18">Git</text>
        <text x="400" y="190" fill="var(--text-muted)" font-size="17">Java</text>
        <text x="320" y="300" fill="var(--text-muted)" font-size="17">C++</text>
        <text x="500" y="300" fill="var(--text-muted)" font-size="17">SQL</text>
      </g>

      <!-- DEEP BACKGROUND (Heavy blur, big text) -->
      <g opacity="0.25" filter="url(#blur-md)">
        <text x="250" y="60" fill="var(--text-muted)" font-size="32">Data Engineering</text>
        <text x="620" y="150" fill="var(--text-muted)" font-size="36">RAG</text>
        <text x="120" y="180" fill="var(--text-muted)" font-size="28">Security</text>
        <text x="720" y="220" fill="var(--text-muted)" font-size="28">CI/CD</text>
        <text x="180" y="520" fill="var(--text-muted)" font-size="34">Multi-Agent</text>
        <text x="650" y="520" fill="var(--text-muted)" font-size="30">Machine Learning</text>
      </g>
    </g>

    <!-- Floating Particles -->
    <g fill="var(--accent-blue)" opacity="0.5">
      <circle cx="140" cy="160" r="2.5" />
      <circle cx="680" cy="130" r="2" />
      <circle cx="720" cy="420" r="3" />
      <circle cx="90" cy="280" r="2" />
      <circle cx="450" cy="500" r="2.5" />
      <circle cx="280" cy="220" r="1.5" />
      <circle cx="550" cy="300" r="2" />
    </g>
  </svg>
  <figcaption><span>01 / Technologies</span><a href="#skills">Explore the toolkit <span aria-hidden="true">↗</span></a><small>Core stack</small></figcaption></figure>`;
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
