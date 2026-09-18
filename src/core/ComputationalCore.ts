import * as THREE from 'three';

export interface CoreOptions {
  canvasId?: string;
}

export class ComputationalCore {
  private canvas: HTMLCanvasElement | null = null;
  private renderer: THREE.WebGLRenderer | null = null;
  private scene: THREE.Scene | null = null;
  private camera: THREE.PerspectiveCamera | null = null;

  // 3D Groups
  private rootGroup = new THREE.Group();
  private coreGroup = new THREE.Group();
  private nucleusMesh!: THREE.Mesh;
  private nucleusInnerMesh!: THREE.Mesh;
  private wireframeMesh!: THREE.LineSegments;
  private ringOuter!: THREE.Line;
  private ringMiddle!: THREE.Line;
  private ringInner!: THREE.Line;
  private nodesGroup = new THREE.Group();
  private nodeMeshes: THREE.Mesh[] = [];
  private pulsePoints!: THREE.Points;
  private vectorLines!: THREE.LineSegments;

  // Lights
  private ambientLight!: THREE.AmbientLight;
  private pointLight!: THREE.PointLight;
  private dirLight!: THREE.DirectionalLight;

  // Animation & Interaction
  private animFrameId: number | null = null;
  private mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
  private scrollProgress = 0;
  private targetScrollProgress = 0;
  private isDark = true;
  private activeCategory: string | null = null;
  private isVisible = true;

  // Data pulse curves
  private pulsePositions!: Float32Array;
  private pulseProgress: number[] = [];
  private nodeCategories = [
    'ai-llm',        // 0: LLM Gateway
    'security',      // 1: Policy Engine
    'data',          // 2: Distributed Pipeline
    'systems',       // 3: Coordinator Agent
    'ai-llm',        // 4: Retrieval Engine
    'security',      // 5: Threat Analyzer
    'data',          // 6: Stream Processor
    'systems',       // 7: Sandboxed Tool
  ];

  constructor() {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    try {
      this.init();
    } catch (e) {
      console.warn('WebGL initialization failed, running in standard mode:', e);
    }
  }

  private init(): void {
    const existing = document.getElementById('core-canvas') as HTMLCanvasElement;
    if (existing) {
      this.canvas = existing;
    } else {
      this.canvas = document.createElement('canvas');
      this.canvas.id = 'core-canvas';
      this.canvas.setAttribute('aria-hidden', 'true');
      this.canvas.className = 'computational-core-canvas';
      document.body.prepend(this.canvas);
    }

    this.isDark = document.documentElement.getAttribute('data-theme') !== 'light';

    // Scene & Camera
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    this.camera.position.set(0, 0, 11);

    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.0;

    // Build components
    this.buildCore();
    this.buildDefensiveRings();
    this.buildAgentNodes();
    this.buildDataVectors();
    this.setupLighting();

    this.scene.add(this.rootGroup);
    this.rootGroup.add(this.coreGroup);
    this.rootGroup.add(this.nodesGroup);

    // Initial position on desktop: aligned to the right side of Hero
    this.updateLayoutPosition();

    // Event listeners
    this.bindEvents();

    // Start render loop
    this.animate();
  }

  private buildCore(): void {
    // Central faceted computation nucleus
    const nucleusGeo = new THREE.IcosahedronGeometry(1.1, 0);
    const nucleusMat = new THREE.MeshStandardMaterial({
      color: this.isDark ? 0x1f3c52 : 0x4a738c,
      emissive: this.isDark ? 0x112330 : 0x1a384c,
      roughness: 0.3,
      metalness: 0.8,
      flatShading: true,
      transparent: true,
      opacity: 0.88,
    });
    this.nucleusMesh = new THREE.Mesh(nucleusGeo, nucleusMat);
    this.coreGroup.add(this.nucleusMesh);

    // Inner radiant core
    const innerGeo = new THREE.OctahedronGeometry(0.65, 0);
    const innerMat = new THREE.MeshStandardMaterial({
      color: this.isDark ? 0x7ec0e4 : 0x2b6e94,
      emissive: this.isDark ? 0x3d8ab8 : 0x1f4e6b,
      emissiveIntensity: 0.7,
      roughness: 0.15,
      metalness: 0.9,
      flatShading: true,
    });
    this.nucleusInnerMesh = new THREE.Mesh(innerGeo, innerMat);
    this.coreGroup.add(this.nucleusInnerMesh);

    // Outer subtle crystalline wireframe cage
    const wireGeo = new THREE.IcosahedronGeometry(1.6, 0);
    const wireframe = new THREE.WireframeGeometry(wireGeo);
    const wireMat = new THREE.LineBasicMaterial({
      color: this.isDark ? 0x7ec0e4 : 0x2b6e94,
      transparent: true,
      opacity: this.isDark ? 0.32 : 0.25,
    });
    this.wireframeMesh = new THREE.LineSegments(wireframe, wireMat);
    this.coreGroup.add(this.wireframeMesh);
  }

  private buildDefensiveRings(): void {
    const segments = 96;

    // Ring 1: Equatorial runtime boundary ring
    const ringGeo1 = new THREE.BufferGeometry();
    const points1: THREE.Vector3[] = [];
    const r1 = 2.4;
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      points1.push(new THREE.Vector3(Math.cos(theta) * r1, 0, Math.sin(theta) * r1));
    }
    ringGeo1.setFromPoints(points1);
    const ringMat1 = new THREE.LineBasicMaterial({
      color: this.isDark ? 0xe0cfb8 : 0x8c7355,
      transparent: true,
      opacity: this.isDark ? 0.45 : 0.35,
    });
    this.ringOuter = new THREE.Line(ringGeo1, ringMat1);
    this.ringOuter.rotation.x = Math.PI * 0.25;
    this.coreGroup.add(this.ringOuter);

    // Ring 2: Tilted policy ring
    const ringGeo2 = new THREE.BufferGeometry();
    const points2: THREE.Vector3[] = [];
    const r2 = 2.85;
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      points2.push(new THREE.Vector3(Math.cos(theta) * r2, 0, Math.sin(theta) * r2));
    }
    ringGeo2.setFromPoints(points2);
    const ringMat2 = new THREE.LineBasicMaterial({
      color: this.isDark ? 0x7ec0e4 : 0x2b6e94,
      transparent: true,
      opacity: this.isDark ? 0.35 : 0.25,
    });
    this.ringMiddle = new THREE.Line(ringGeo2, ringMat2);
    this.ringMiddle.rotation.z = Math.PI * 0.32;
    this.ringMiddle.rotation.y = Math.PI * 0.15;
    this.coreGroup.add(this.ringMiddle);

    // Ring 3: Orthogonal ring
    const ringGeo3 = new THREE.BufferGeometry();
    const points3: THREE.Vector3[] = [];
    const r3 = 2.15;
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      points3.push(new THREE.Vector3(0, Math.cos(theta) * r3, Math.sin(theta) * r3));
    }
    ringGeo3.setFromPoints(points3);
    const ringMat3 = new THREE.LineBasicMaterial({
      color: this.isDark ? 0x9cb0bc : 0x5a7384,
      transparent: true,
      opacity: this.isDark ? 0.25 : 0.2,
    });
    this.ringInner = new THREE.Line(ringGeo3, ringMat3);
    this.ringInner.rotation.x = Math.PI * 0.1;
    this.coreGroup.add(this.ringInner);
  }

  private buildAgentNodes(): void {
    const nodeCount = 8;
    const nodeGeo = new THREE.OctahedronGeometry(0.18, 0);

    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2;
      const radius = 3.2 + (i % 3) * 0.45;
      const yOffset = ((i % 4) - 1.5) * 0.65;

      const mat = new THREE.MeshStandardMaterial({
        color: this.isDark ? 0x7ec0e4 : 0x2b6e94,
        emissive: this.isDark ? 0x244256 : 0x1a384c,
        roughness: 0.2,
        metalness: 0.8,
        flatShading: true,
      });

      const mesh = new THREE.Mesh(nodeGeo, mat);
      mesh.position.set(Math.cos(angle) * radius, yOffset, Math.sin(angle) * radius);
      mesh.userData = {
        baseRadius: radius,
        baseAngle: angle,
        baseY: yOffset,
        speed: 0.003 + (i % 3) * 0.0015,
        category: this.nodeCategories[i],
        index: i,
      };

      this.nodeMeshes.push(mesh);
      this.nodesGroup.add(mesh);
    }
  }

  private buildDataVectors(): void {
    const nodeCount = this.nodeMeshes.length;
    const linePositions: number[] = [];

    for (let i = 0; i < nodeCount; i++) {
      linePositions.push(0, 0, 0);
      const pos = this.nodeMeshes[i].position;
      linePositions.push(pos.x, pos.y, pos.z);
    }

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const lineMat = new THREE.LineBasicMaterial({
      color: this.isDark ? 0x7ec0e4 : 0x2b6e94,
      transparent: true,
      opacity: this.isDark ? 0.2 : 0.15,
    });
    this.vectorLines = new THREE.LineSegments(lineGeo, lineMat);
    this.nodesGroup.add(this.vectorLines);

    // Dynamic traveling data pulse points along vectors
    const pulseCount = nodeCount * 3;
    this.pulsePositions = new Float32Array(pulseCount * 3);
    this.pulseProgress = [];

    for (let i = 0; i < pulseCount; i++) {
      this.pulseProgress.push((i / pulseCount) % 1);
      this.pulsePositions[i * 3] = 0;
      this.pulsePositions[i * 3 + 1] = 0;
      this.pulsePositions[i * 3 + 2] = 0;
    }

    const pulseGeo = new THREE.BufferGeometry();
    pulseGeo.setAttribute('position', new THREE.BufferAttribute(this.pulsePositions, 3));
    const pulseMat = new THREE.PointsMaterial({
      color: this.isDark ? 0xe0cfb8 : 0x8c7355,
      size: 3.5,
      transparent: true,
      opacity: this.isDark ? 0.75 : 0.65,
      blending: THREE.AdditiveBlending,
    });
    this.pulsePoints = new THREE.Points(pulseGeo, pulseMat);
    this.nodesGroup.add(this.pulsePoints);
  }

  private setupLighting(): void {
    this.ambientLight = new THREE.AmbientLight(this.isDark ? 0x243545 : 0xcedee8, 1.4);
    this.scene!.add(this.ambientLight);

    this.pointLight = new THREE.PointLight(this.isDark ? 0x7ec0e4 : 0x3d8ab8, 2.2, 20);
    this.pointLight.position.set(4, 5, 6);
    this.scene!.add(this.pointLight);

    this.dirLight = new THREE.DirectionalLight(this.isDark ? 0xe0cfb8 : 0x8c7355, 1.2);
    this.dirLight.position.set(-5, -3, 5);
    this.scene!.add(this.dirLight);
  }

  private updateLayoutPosition(): void {
    const isDesktop = window.innerWidth >= 1024;
    if (isDesktop) {
      // Positioned to the right of the wide hero composition
      this.rootGroup.position.set(2.4, 0.05, 0);
      this.rootGroup.scale.set(1.0, 1.0, 1.0);
    } else {
      // Mobile / Tablet: centered, slightly simplified and placed behind
      this.rootGroup.position.set(0, 0, -1.5);
      this.rootGroup.scale.set(0.75, 0.75, 0.75);
    }
  }

  private bindEvents(): void {
    window.addEventListener('mousemove', (e) => {
      this.mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      this.mouse.targetY = -(e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });

    window.addEventListener('scroll', () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      this.targetScrollProgress = docHeight > 0 ? Math.min(Math.max(window.scrollY / docHeight, 0), 1) : 0;
    }, { passive: true });

    window.addEventListener('resize', () => {
      if (!this.renderer || !this.camera) return;
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.updateLayoutPosition();
    }, { passive: true });

    document.addEventListener('visibilitychange', () => {
      this.isVisible = document.visibilityState === 'visible';
    });

    const observer = new MutationObserver(() => {
      const nowDark = document.documentElement.getAttribute('data-theme') !== 'light';
      if (nowDark !== this.isDark) {
        this.isDark = nowDark;
        this.updateThemeColors();
      }
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  }

  public updateThemeColors(): void {
    if (!this.nucleusMesh) return;

    // Nucleus
    (this.nucleusMesh.material as THREE.MeshStandardMaterial).color.setHex(this.isDark ? 0x1f3c52 : 0x4a738c);
    (this.nucleusMesh.material as THREE.MeshStandardMaterial).emissive.setHex(this.isDark ? 0x112330 : 0x1a384c);

    // Inner core
    (this.nucleusInnerMesh.material as THREE.MeshStandardMaterial).color.setHex(this.isDark ? 0x7ec0e4 : 0x2b6e94);
    (this.nucleusInnerMesh.material as THREE.MeshStandardMaterial).emissive.setHex(this.isDark ? 0x3d8ab8 : 0x1f4e6b);

    // Wireframe
    (this.wireframeMesh.material as THREE.LineBasicMaterial).color.setHex(this.isDark ? 0x7ec0e4 : 0x2b6e94);
    (this.wireframeMesh.material as THREE.LineBasicMaterial).opacity = this.isDark ? 0.32 : 0.25;

    // Rings
    (this.ringOuter.material as THREE.LineBasicMaterial).color.setHex(this.isDark ? 0xe0cfb8 : 0x8c7355);
    (this.ringMiddle.material as THREE.LineBasicMaterial).color.setHex(this.isDark ? 0x7ec0e4 : 0x2b6e94);
    (this.ringInner.material as THREE.LineBasicMaterial).color.setHex(this.isDark ? 0x9cb0bc : 0x5a7384);

    // Lights
    this.ambientLight.color.setHex(this.isDark ? 0x243545 : 0xcedee8);
    this.pointLight.color.setHex(this.isDark ? 0x7ec0e4 : 0x3d8ab8);
    this.dirLight.color.setHex(this.isDark ? 0xe0cfb8 : 0x8c7355);
  }

  public highlightCategory(category: string | null): void {
    this.activeCategory = category;
    this.nodeMeshes.forEach((mesh) => {
      const mat = mesh.material as THREE.MeshStandardMaterial;
      const isMatch = category && mesh.userData.category === category;
      if (isMatch) {
        mat.color.setHex(0x5eead4); // luminous cyan accent
        mat.emissive.setHex(0x14b8a6);
        mat.emissiveIntensity = 1.4;
        mesh.scale.set(1.4, 1.4, 1.4);
      } else {
        mat.color.setHex(this.isDark ? 0x7ec0e4 : 0x2b6e94);
        mat.emissive.setHex(this.isDark ? 0x244256 : 0x1a384c);
        mat.emissiveIntensity = 0.5;
        mesh.scale.set(1.0, 1.0, 1.0);
      }
    });
  }

  private animate = (): void => {
    this.animFrameId = requestAnimationFrame(this.animate);
    if (!this.isVisible || !this.renderer || !this.scene || !this.camera) return;

    // Smooth interpolation for mouse and scroll
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.05;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.05;
    this.scrollProgress += (this.targetScrollProgress - this.scrollProgress) * 0.06;

    // Autonomous slow rotation
    this.nucleusMesh.rotation.y += 0.0035;
    this.nucleusMesh.rotation.x += 0.0018;
    this.nucleusInnerMesh.rotation.y -= 0.005;
    this.wireframeMesh.rotation.y += 0.002;
    this.wireframeMesh.rotation.z += 0.0015;

    // Orbit defensive rings
    this.ringOuter.rotation.z += 0.0025;
    this.ringMiddle.rotation.x -= 0.002;
    this.ringInner.rotation.y += 0.003;

    // Update agent node positions in their orbits
    const lineAttr = this.vectorLines.geometry.attributes.position as THREE.BufferAttribute;
    const lineArray = lineAttr.array as Float32Array;

    for (let i = 0; i < this.nodeMeshes.length; i++) {
      const node = this.nodeMeshes[i];
      node.userData.baseAngle += node.userData.speed;
      const angle = node.userData.baseAngle;
      const r = node.userData.baseRadius;

      node.position.x = Math.cos(angle) * r;
      node.position.z = Math.sin(angle) * r;
      node.position.y = node.userData.baseY + Math.sin(angle * 2) * 0.2;
      node.rotation.x += 0.01;
      node.rotation.y += 0.015;

      // Update vector line segment
      const offset = i * 6;
      lineArray[offset + 3] = node.position.x;
      lineArray[offset + 4] = node.position.y;
      lineArray[offset + 5] = node.position.z;
    }
    lineAttr.needsUpdate = true;

    // Update traveling data pulse particles along vector splines
    const pulseCount = this.nodeMeshes.length * 3;
    for (let i = 0; i < pulseCount; i++) {
      this.pulseProgress[i] = (this.pulseProgress[i] + 0.008) % 1;
      const prog = this.pulseProgress[i];
      const nodeIdx = i % this.nodeMeshes.length;
      const nodePos = this.nodeMeshes[nodeIdx].position;

      this.pulsePositions[i * 3] = nodePos.x * prog;
      this.pulsePositions[i * 3 + 1] = nodePos.y * prog;
      this.pulsePositions[i * 3 + 2] = nodePos.z * prog;
    }
    this.pulsePoints.geometry.attributes.position.needsUpdate = true;

    // 4D Story Evolution across scroll
    const isDesktop = window.innerWidth >= 1024;
    const sp = this.scrollProgress;

    if (isDesktop) {
      if (sp < 0.2) {
        // Hero: tightly bound to right side
        const t = sp / 0.2;
        this.rootGroup.position.x = 2.4 - t * 0.4;
        this.rootGroup.position.y = 0.05 + t * 0.2;
        this.rootGroup.scale.setScalar(1.0 + t * 0.15);
      } else if (sp < 0.45) {
        // About & Projects: deeper in background, wider ring dilation
        const t = (sp - 0.2) / 0.25;
        this.rootGroup.position.x = 2.0 + t * 0.6;
        this.rootGroup.position.y = 0.25 - t * 0.3;
        this.rootGroup.scale.setScalar(1.15 - t * 0.1);
      } else if (sp < 0.75) {
        // Experience & Skills: calm, elevated background presence
        const t = (sp - 0.45) / 0.3;
        this.rootGroup.position.x = 2.6 - t * 0.8;
        this.rootGroup.position.y = -0.05 + t * 0.15;
        this.rootGroup.scale.setScalar(1.05);
      } else {
        // Contact: reunified beacon
        const t = (sp - 0.75) / 0.25;
        this.rootGroup.position.x = 1.8 + t * 0.4;
        this.rootGroup.position.y = 0.1;
        this.rootGroup.scale.setScalar(1.05 - t * 0.1);
      }
    }

    // Parallax response
    this.rootGroup.rotation.y = this.mouse.x * 0.3 + this.scrollProgress * 1.5;
    this.rootGroup.rotation.x = -this.mouse.y * 0.2 + Math.sin(this.scrollProgress * Math.PI) * 0.2;

    this.renderer.render(this.scene, this.camera);
  };

  public destroy(): void {
    if (this.animFrameId !== null) cancelAnimationFrame(this.animFrameId);
    if (this.renderer) {
      this.renderer.dispose();
      this.renderer.forceContextLoss();
    }
    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }
  }
}
