/** Original code-native diagrams, explicitly conceptual rather than screenshots. */
export function workstation() {
  return `<figure class="workstation">
  <svg viewBox="0 0 800 550" role="img" aria-labelledby="workstation-title workstation-desc">
    <title id="workstation-title">A developer’s workspace for intelligent systems</title>
    <desc id="workstation-desc">A premium conceptual illustration of a computer displaying a pipeline, surrounded by floating tech icons.</desc>
    
    <defs>
      <linearGradient id="screen-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="var(--surface-blue)"/>
        <stop offset="100%" stop-color="var(--surface)"/>
      </linearGradient>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="6" result="blur"/>
        <feComposite in="SourceGraphic" in2="blur" operator="over"/>
      </filter>
    </defs>

    <!-- Floating Tech Elements (Background) -->
    <g font-family="'IBM Plex Mono', monospace" font-size="11" fill="var(--text-secondary)" opacity="0.6">
      <text x="120" y="140" transform="rotate(-15, 120, 140)">Docker</text>
      <text x="650" y="160" transform="rotate(10, 650, 160)">{ API }</text>
      <text x="90" y="380" transform="rotate(5, 90, 380)">Git</text>
      <text x="690" y="400" transform="rotate(-10, 690, 400)">PostgreSQL</text>
    </g>

    <!-- Base / Desk reflection -->
    <ellipse cx="400" cy="480" rx="300" ry="20" fill="var(--surface-blue-soft)" opacity="0.5" />

    <!-- Isometric-ish Monitor Stand -->
    <path d="M 370 410 L 430 410 L 440 470 L 360 470 Z" fill="var(--border)" stroke="var(--visual-stroke)" stroke-width="1.5" stroke-linejoin="round"/>
    <path d="M 330 470 L 470 470 L 480 480 L 320 480 Z" fill="var(--surface-beige)" stroke="var(--visual-stroke)" stroke-width="1.5" stroke-linejoin="round"/>

    <!-- Monitor Frame -->
    <rect x="180" y="130" width="440" height="280" rx="12" fill="var(--screen-frame)" stroke="var(--visual-stroke)" stroke-width="2"/>
    <rect x="190" y="140" width="420" height="260" rx="6" fill="url(#screen-grad)" stroke="var(--visual-stroke)" stroke-width="1"/>
    
    <!-- Screen Content: Pipeline -->
    <g font-family="Manrope, sans-serif" text-anchor="middle">
      <!-- Input -->
      <rect x="230" y="170" width="340" height="36" rx="6" fill="var(--surface)" stroke="var(--border)" stroke-width="1.5"/>
      <text x="400" y="193" font-size="13" font-weight="600" fill="var(--text-primary)">TEXT INPUT / DATA</text>
      
      <!-- Flow Arrow -->
      <path d="M 400 206 L 400 220" stroke="var(--accent-blue)" stroke-width="2" marker-end="url(#arrow)"/>

      <!-- NLP / LLM -->
      <rect x="230" y="220" width="340" height="36" rx="6" fill="var(--surface-blue-soft)" stroke="var(--accent-blue)" stroke-width="1.5"/>
      <text x="400" y="243" font-size="13" font-weight="600" fill="var(--accent-blue)">NLP &amp; LLM PROCESSING</text>

      <!-- Flow Arrow -->
      <path d="M 400 256 L 400 270" stroke="var(--accent-blue)" stroke-width="2"/>

      <!-- Agents & Security -->
      <rect x="230" y="270" width="160" height="46" rx="6" fill="var(--surface)" stroke="var(--border)"/>
      <text x="310" y="293" font-size="12" font-weight="600" fill="var(--text-primary)">MULTI-AGENT</text>
      <text x="310" y="307" font-size="10" fill="var(--text-secondary)">Coordination</text>

      <rect x="410" y="270" width="160" height="46" rx="6" fill="var(--surface)" stroke="var(--border)"/>
      <text x="490" y="293" font-size="12" font-weight="600" fill="var(--text-primary)">SECURITY</text>
      <text x="490" y="307" font-size="10" fill="var(--text-secondary)">Policy Enforcement</text>

      <!-- Connectors -->
      <path d="M 310 316 L 310 330 M 490 316 L 490 330 M 310 330 L 490 330 M 400 330 L 400 340" stroke="var(--accent-blue)" stroke-width="2" fill="none"/>

      <!-- Output -->
      <rect x="230" y="340" width="340" height="36" rx="6" fill="var(--surface-beige)" stroke="var(--border)"/>
      <text x="400" y="363" font-size="13" font-weight="600" fill="var(--text-primary)">VERIFIED OUTPUT / ACTION</text>
    </g>

    <!-- Floating Tech Elements (Foreground) -->
    <g filter="url(#glow)">
      <!-- Python Badge -->
      <g transform="translate(130, 220)">
        <rect x="0" y="0" width="70" height="28" rx="14" fill="var(--surface)" stroke="var(--visual-stroke)"/>
        <text x="35" y="18" font-family="Manrope, sans-serif" font-size="11" font-weight="600" fill="var(--accent-blue)" text-anchor="middle">Python</text>
      </g>
      
      <!-- Data Badge -->
      <g transform="translate(620, 260)">
        <rect x="0" y="0" width="70" height="28" rx="14" fill="var(--surface)" stroke="var(--visual-stroke)"/>
        <text x="35" y="18" font-family="Manrope, sans-serif" font-size="11" font-weight="600" fill="var(--accent-brown)" text-anchor="middle">Data</text>
      </g>
    </g>

    <!-- Decorative elements -->
    <circle cx="210" cy="155" r="3" fill="var(--text-muted)"/>
    <circle cx="222" cy="155" r="3" fill="var(--text-muted)"/>
    <circle cx="234" cy="155" r="3" fill="var(--text-muted)"/>
  </svg>
  <figcaption><span>01 / A workspace for intelligent systems</span><a href="#skills">Explore the toolkit <span aria-hidden="true">↗</span></a><small>Conceptual illustration</small></figcaption></figure>`;
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
