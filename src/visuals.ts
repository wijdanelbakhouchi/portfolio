export function workstation() {
  return `<figure class="workstation">
  <svg viewBox="0 0 800 550" role="img" aria-labelledby="workstation-title workstation-desc">
    <title id="workstation-title">3D Tech Sphere</title>
    
    <defs>
      <radialGradient id="core-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="var(--accent-blue)" stop-opacity="0.3"/>
        <stop offset="80%" stop-color="var(--accent-blue)" stop-opacity="0.05"/>
        <stop offset="100%" stop-color="var(--surface)" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="node-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="var(--accent-blue)" stop-opacity="0.8"/>
        <stop offset="40%" stop-color="var(--accent-blue)" stop-opacity="0.4"/>
        <stop offset="100%" stop-color="var(--accent-blue)" stop-opacity="0"/>
      </radialGradient>
      <filter id="blur-node">
        <feGaussianBlur stdDeviation="3" />
      </filter>
    </defs>

    <!-- Deep Space Background -->
    <rect width="100%" height="100%" fill="transparent" />
    
    <!-- Outer Sphere Wireframe -->
    <g stroke="var(--accent-blue)" stroke-width="1" fill="none" opacity="0.25">
      <circle cx="400" cy="275" r="220" />
      <!-- Latitudes -->
      <ellipse cx="400" cy="275" rx="220" ry="60" />
      <ellipse cx="400" cy="275" rx="220" ry="140" />
      <!-- Longitudes -->
      <ellipse cx="400" cy="275" rx="60" ry="220" />
      <ellipse cx="400" cy="275" rx="140" ry="220" />
      <!-- Diagonals -->
      <ellipse cx="400" cy="275" rx="220" ry="80" transform="rotate(45 400 275)" />
      <ellipse cx="400" cy="275" rx="220" ry="80" transform="rotate(-45 400 275)" />
    </g>

    <!-- Inner Core Wireframe -->
    <g stroke="var(--accent-blue)" stroke-width="1.5" fill="none" opacity="0.6">
      <circle cx="400" cy="275" r="70" fill="url(#core-glow)" />
      <ellipse cx="400" cy="275" rx="70" ry="25" />
      <ellipse cx="400" cy="275" rx="70" ry="50" />
      <ellipse cx="400" cy="275" rx="25" ry="70" />
      <ellipse cx="400" cy="275" rx="50" ry="70" />
      <!-- Inner Diagonals -->
      <ellipse cx="400" cy="275" rx="70" ry="25" transform="rotate(45 400 275)" />
      <ellipse cx="400" cy="275" rx="70" ry="25" transform="rotate(-45 400 275)" />
    </g>
    
    <!-- Core Highlight Glows (The shiny spots) -->
    <circle cx="370" cy="240" r="12" fill="var(--accent-blue)" opacity="0.8" filter="url(#blur-node)" />
    <circle cx="430" cy="310" r="18" fill="var(--accent-blue)" opacity="0.5" filter="url(#blur-node)" />

    <!-- Connecting Callout Lines -->
    <g stroke="var(--border)" stroke-width="1.5" fill="none" opacity="0.8">
      <!-- To PySpark -->
      <polyline points="240,140 190,100 160,100" />
      <!-- To Delta Lake -->
      <polyline points="200,275 140,275" />
      <!-- To Python -->
      <polyline points="260,400 200,440 170,440" />
      
      <!-- To Docker -->
      <polyline points="560,140 610,100 640,100" />
      <!-- To LangChain -->
      <polyline points="600,275 660,275" />
      <!-- To FastAPI -->
      <polyline points="540,400 600,440 630,440" />

      <!-- Abstract Labels Lines -->
      <polyline points="360,220 300,160 220,160" stroke="var(--accent-blue)" opacity="0.5" />
      <polyline points="450,450 420,490 320,490" stroke="var(--accent-blue)" opacity="0.5" />
      <polyline points="580,350 630,320 650,320" stroke="var(--accent-blue)" opacity="0.5" />
    </g>

    <!-- Glowing Nodes on Orbits -->
    <g>
      <circle cx="240" cy="140" r="22" fill="url(#node-glow)" />
      <circle cx="240" cy="140" r="7" fill="var(--accent-blue)" />
      
      <circle cx="200" cy="275" r="22" fill="url(#node-glow)" />
      <circle cx="200" cy="275" r="7" fill="var(--accent-blue)" />
      
      <circle cx="260" cy="400" r="22" fill="url(#node-glow)" />
      <circle cx="260" cy="400" r="7" fill="var(--accent-blue)" />
      
      <circle cx="560" cy="140" r="22" fill="url(#node-glow)" />
      <circle cx="560" cy="140" r="7" fill="var(--accent-blue)" />
      
      <circle cx="600" cy="275" r="22" fill="url(#node-glow)" />
      <circle cx="600" cy="275" r="7" fill="var(--accent-blue)" />
      
      <circle cx="540" cy="400" r="22" fill="url(#node-glow)" />
      <circle cx="540" cy="400" r="7" fill="var(--accent-blue)" />
    </g>

    <!-- Callout Boxes & Text -->
    <g font-family="'IBM Plex Mono', monospace" font-size="11" font-weight="600" fill="var(--text-primary)" letter-spacing="1">
      
      <!-- PySpark -->
      <rect x="20" y="85" width="140" height="30" rx="4" fill="var(--surface)" stroke="var(--border)" />
      <circle cx="35" cy="100" r="3" fill="var(--accent-blue)" />
      <text x="48" y="104">PYSPARK</text>

      <!-- Delta Lake -->
      <rect x="0" y="260" width="140" height="30" rx="4" fill="var(--surface)" stroke="var(--border)" />
      <circle cx="15" cy="275" r="3" fill="var(--accent-blue)" />
      <text x="28" y="279">DELTA LAKE</text>

      <!-- Python -->
      <rect x="30" y="425" width="140" height="30" rx="4" fill="var(--surface)" stroke="var(--border)" />
      <circle cx="45" cy="440" r="3" fill="var(--accent-blue)" />
      <text x="58" y="444">PYTHON</text>

      <!-- Docker -->
      <rect x="640" y="85" width="140" height="30" rx="4" fill="var(--surface)" stroke="var(--border)" />
      <circle cx="655" cy="100" r="3" fill="var(--accent-blue)" />
      <text x="668" y="104">DOCKER</text>

      <!-- LangChain -->
      <rect x="660" y="260" width="140" height="30" rx="4" fill="var(--surface)" stroke="var(--border)" />
      <circle cx="675" cy="275" r="3" fill="var(--accent-blue)" />
      <text x="688" y="279">LANGCHAIN</text>

      <!-- FastAPI -->
      <rect x="630" y="425" width="140" height="30" rx="4" fill="var(--surface)" stroke="var(--border)" />
      <circle cx="645" cy="440" r="3" fill="var(--accent-blue)" />
      <text x="658" y="444">FASTAPI</text>

      <!-- Abstract Labels -->
      <rect x="40" y="145" width="180" height="30" rx="4" fill="var(--surface-blue-soft)" stroke="var(--accent-blue)" opacity="0.9" />
      <circle cx="55" cy="160" r="3" fill="var(--accent-blue)" />
      <text x="68" y="164" fill="var(--accent-blue)">INTELLIGENT CORE</text>

      <rect x="120" y="475" width="200" height="30" rx="4" fill="var(--surface-blue-soft)" stroke="var(--accent-blue)" opacity="0.9" />
      <circle cx="135" cy="490" r="3" fill="var(--accent-blue)" />
      <text x="148" y="494" fill="var(--accent-blue)">MULTI-AGENT RUNTIME</text>
      
      <rect x="650" y="305" width="210" height="30" rx="4" fill="var(--surface-blue-soft)" stroke="var(--accent-blue)" opacity="0.9" />
      <text x="665" y="324" fill="var(--accent-blue)">SECURITY BOUNDARY</text>
      <text x="795" y="324" fill="var(--text-primary)">06</text>
    </g>

    <!-- Starfield Background Particles -->
    <g fill="var(--text-muted)" opacity="0.5">
      <circle cx="100" cy="300" r="1" />
      <circle cx="150" cy="80" r="1.5" />
      <circle cx="700" cy="150" r="1" />
      <circle cx="750" cy="400" r="1.5" />
      <circle cx="300" cy="500" r="1" />
      <circle cx="500" cy="60" r="1.5" />
      <circle cx="50" cy="450" r="1" />
      <circle cx="450" cy="530" r="1.5" />
    </g>

  </svg>
  <figcaption><span>01 / System Architecture</span><a href="#skills">Explore the toolkit <span aria-hidden="true">↗</span></a><small>Conceptual wireframe</small></figcaption></figure>`;
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
