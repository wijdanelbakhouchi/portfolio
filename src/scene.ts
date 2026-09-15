import * as THREE from 'three';

/**
 * Interactive 3D Neural & Security Network for Wijdane Elbakhouchi's portfolio.
 * Represents the intersection of AI, Data Science, LLM Security, Multi-Agent Systems, Research, and Software Engineering.
 * Optimized: no heavy textures, bounded DPR, capped frame delta (~30-40fps), complete GPU resource cleanup.
 */
export function createCoreScene(container: HTMLElement) {
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: 'low-power',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.setClearColor(0x000000, 0);

  const canvas = renderer.domElement;
  container.append(canvas);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 30);
  camera.position.set(0, 0.2, 9.2);

  const rootGroup = new THREE.Group();
  scene.add(rootGroup);

  // Lighting
  const ambient = new THREE.AmbientLight(0x8bc34a, 1.2);
  scene.add(ambient);

  const keyLight = new THREE.DirectionalLight(0x38bdf8, 4.0);
  keyLight.position.set(-4, 5, 4);
  scene.add(keyLight);

  const rimLight = new THREE.DirectionalLight(0x818cf8, 3.2);
  rimLight.position.set(4, -3, -2);
  scene.add(rimLight);

  // 1. Central Core: Faceted Intelligent Core
  const coreGeometry = new THREE.IcosahedronGeometry(0.85, 4);
  const coreMaterial = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    metalness: 0.85,
    roughness: 0.25,
    emissive: 0x0f172a,
    emissiveIntensity: 0.4,
  });
  const core = new THREE.Mesh(coreGeometry, coreMaterial);
  rootGroup.add(core);

  // Wireframe faceted shell over core
  const wireGeometry = new THREE.IcosahedronGeometry(0.87, 2);
  const wireMaterial = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    wireframe: true,
    transparent: true,
    opacity: 0.35,
  });
  const wire = new THREE.Mesh(wireGeometry, wireMaterial);
  rootGroup.add(wire);

  // Inner pulsing glow light
  const innerLight = new THREE.PointLight(0x38bdf8, 3, 4);
  innerLight.position.set(0, 0, 0);
  rootGroup.add(innerLight);

  // 2. Protective Boundary Rings (Security Perimeter)
  const boundaryMaterial = new THREE.LineBasicMaterial({
    color: 0x38bdf8,
    transparent: true,
    opacity: 0.3,
  });
  const securityRingMaterial = new THREE.LineBasicMaterial({
    color: 0x818cf8,
    transparent: true,
    opacity: 0.4,
  });

  const rings: THREE.LineLoop[] = [];
  function createRing(radius: number, rx: number, ry: number, rz: number, mat: THREE.LineBasicMaterial) {
    const segments = 96;
    const pts = Array.from({ length: segments }, (_, i) => {
      const theta = (i / segments) * Math.PI * 2;
      return new THREE.Vector3(Math.cos(theta) * radius, Math.sin(theta) * radius, 0);
    });
    const line = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(pts), mat);
    line.rotation.set(rx, ry, rz);
    rootGroup.add(line);
    rings.push(line);
    return line;
  }

  createRing(2.0, 1.1, 0.2, -0.4, boundaryMaterial);
  createRing(2.15, 0.3, 0.9, 0.3, securityRingMaterial);
  createRing(1.8, 0.6, -0.9, -0.5, boundaryMaterial);

  // Outer geodesic security shield
  const shieldGeometry = new THREE.IcosahedronGeometry(2.18, 2);
  const shieldMaterial = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    wireframe: true,
    transparent: true,
    opacity: 0.08,
  });
  const shield = new THREE.Mesh(shieldGeometry, shieldMaterial);
  rootGroup.add(shield);

  // 3. Six Dedicated Domain Nodes
  // Representing: AI, Data Science, LLM Security, Multi-Agent, Research, Software Engineering
  const nodePositions: [number, number, number][] = [
    [-1.75, 0.7, 0.4],    // 0: AI
    [1.65, 0.95, -0.3],   // 1: Data Science
    [1.4, -0.95, 0.75],   // 2: LLM Security
    [-0.85, -1.45, -0.4], // 3: Multi-Agent Systems
    [-1.2, 1.35, -0.6],   // 4: Research
    [0.95, 1.45, 0.5],    // 5: Software Engineering
  ];

  const nodeGeometry = new THREE.IcosahedronGeometry(0.12, 2);
  const nodeMaterial = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    metalness: 0.6,
    roughness: 0.2,
    emissive: 0x0284c7,
    emissiveIntensity: 0.4,
  });
  const securityNodeMaterial = new THREE.MeshStandardMaterial({
    color: 0x818cf8,
    metalness: 0.7,
    roughness: 0.2,
    emissive: 0x4f46e5,
    emissiveIntensity: 0.5,
  });

  const nodes: THREE.Mesh[] = [];
  const connections: THREE.Line[] = [];

  nodePositions.forEach((pos, idx) => {
    const isSecurity = idx === 2; // LLM Security node highlight
    const mesh = new THREE.Mesh(nodeGeometry, isSecurity ? securityNodeMaterial : nodeMaterial);
    mesh.position.set(...pos);
    rootGroup.add(mesh);
    nodes.push(mesh);

    // Glowing halo around each node
    const halo = new THREE.Mesh(
      new THREE.SphereGeometry(0.18, 12, 8),
      new THREE.MeshBasicMaterial({
        color: isSecurity ? 0xa5b4fc : 0x7dd3fc,
        transparent: true,
        opacity: 0.18,
      })
    );
    halo.position.copy(mesh.position);
    rootGroup.add(halo);

    // Dynamic connection filament to core
    const connLine = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), mesh.position]),
      new THREE.LineBasicMaterial({
        color: isSecurity ? 0x818cf8 : 0x38bdf8,
        transparent: true,
        opacity: 0.3,
      })
    );
    rootGroup.add(connLine);
    connections.push(connLine);
  });

  // Lateral inter-agent connections (network web)
  const webPairs: [number, number][] = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 0],
    [0, 4],
    [1, 5],
    [4, 5],
  ];
  webPairs.forEach(([a, b]) => {
    const line = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([nodes[a].position, nodes[b].position]),
      new THREE.LineBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.14,
      })
    );
    rootGroup.add(line);
  });

  // 4. Data Particle Cloud
  const particleCount = 70;
  const particleCoords = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    const angle = i * 2.4;
    const r = 2.2 + (i % 8) * 0.05;
    particleCoords[i * 3] = Math.cos(angle) * r;
    particleCoords[i * 3 + 1] = Math.sin(angle) * r * 0.75;
    particleCoords[i * 3 + 2] = Math.sin(i * 1.35) * 1.5;
  }
  const pointGeom = new THREE.BufferGeometry();
  pointGeom.setAttribute('position', new THREE.BufferAttribute(particleCoords, 3));
  const particleSystem = new THREE.Points(
    pointGeom,
    new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.022,
      transparent: true,
      opacity: 0.6,
    })
  );
  rootGroup.add(particleSystem);

  // 5. Active Signal Data Packet
  const packet = new THREE.Mesh(
    new THREE.SphereGeometry(0.035, 8, 6),
    new THREE.MeshBasicMaterial({ color: 0x34d399 })
  );
  rootGroup.add(packet);

  // Lifecycle & Performance State
  let paused = false;
  let visible = true;
  let disposed = false;
  let frame = 0;
  let last = 0;
  let elapsed = 0;
  let slowFrames = 0;
  let dprReduced = false;
  let pointerX = 0;
  let pointerY = 0;

  function resize() {
    const box = container.getBoundingClientRect();
    renderer.setSize(box.width, box.height, false);
    camera.aspect = box.width / Math.max(box.height, 1);
    camera.updateProjectionMatrix();
    renderStill();
  }

  function renderStill() {
    if (!disposed) renderer.render(scene, camera);
  }

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(container);

  const observer = new IntersectionObserver(
    (entries) => {
      visible = entries[0].isIntersecting;
      syncLoop();
    },
    { threshold: 0.01 }
  );
  observer.observe(container);

  function onPointer(event: PointerEvent) {
    const box = container.getBoundingClientRect();
    pointerX = (event.clientX - box.left) / box.width - 0.5;
    pointerY = (event.clientY - box.top) / box.height - 0.5;
  }

  function onLeave() {
    pointerX = 0;
    pointerY = 0;
  }

  container.addEventListener('pointermove', onPointer);
  container.addEventListener('pointerleave', onLeave);

  function tick(now: number) {
    if (disposed || paused || !visible || document.hidden) return;
    frame = requestAnimationFrame(tick);

    const delta = now - last;
    if (delta < 28) return; // Cap at ~35 fps to preserve GPU efficiency

    if (last && delta > 60) slowFrames++;
    if (slowFrames > 25 && !dprReduced) {
      renderer.setPixelRatio(1);
      resize();
      dprReduced = true;
    }

    elapsed += Math.min(delta / 1000, 0.08);
    last = now;

    // Smooth mouse parallax interpolation
    rootGroup.rotation.y +=
      (Math.sin(elapsed * 0.12) * 0.25 + pointerX * 0.35 - rootGroup.rotation.y) * 0.045;
    rootGroup.rotation.x += (-0.08 + pointerY * 0.2 - rootGroup.rotation.x) * 0.045;

    // Rotations
    core.rotation.y = elapsed * 0.1;
    wire.rotation.copy(core.rotation);
    shield.rotation.y = elapsed * 0.025;

    rings[0].rotation.z = -0.4 + Math.sin(elapsed * 0.15) * 0.12;
    rings[1].rotation.x = 0.3 + Math.cos(elapsed * 0.12) * 0.08;

    // Transmit signal packet between nodes
    const progress = (elapsed * 0.35) % 1;
    const currentFromNode = nodes[Math.floor(elapsed * 0.35) % nodes.length];
    const currentToNode = nodes[(Math.floor(elapsed * 0.35) + 1) % nodes.length];
    packet.position.lerpVectors(currentFromNode.position, currentToNode.position, progress);

    renderer.render(scene, camera);
  }

  function syncLoop() {
    cancelAnimationFrame(frame);
    last = 0;
    if (!disposed && !paused && visible && !document.hidden) {
      frame = requestAnimationFrame(tick);
    } else {
      renderStill();
    }
  }

  function onVisibility() {
    syncLoop();
  }
  document.addEventListener('visibilitychange', onVisibility);

  function onContextLost(event: Event) {
    event.preventDefault();
    dispose();
  }
  canvas.addEventListener('webglcontextlost', onContextLost);

  function dispose() {
    if (disposed) return;
    disposed = true;
    cancelAnimationFrame(frame);
    resizeObserver.disconnect();
    observer.disconnect();

    document.removeEventListener('visibilitychange', onVisibility);
    container.removeEventListener('pointermove', onPointer);
    container.removeEventListener('pointerleave', onLeave);
    canvas.removeEventListener('webglcontextlost', onContextLost);

    const geometries = new Set<THREE.BufferGeometry>();
    const materials = new Set<THREE.Material>();

    scene.traverse((object) => {
      if (
        object instanceof THREE.Mesh ||
        object instanceof THREE.Line ||
        object instanceof THREE.Points
      ) {
        geometries.add(object.geometry);
        const list = Array.isArray(object.material) ? object.material : [object.material];
        list.forEach((mat) => materials.add(mat));
      }
    });

    geometries.forEach((g) => g.dispose());
    materials.forEach((m) => m.dispose());
    renderer.dispose();
    canvas.remove();
    container.parentElement?.classList.remove('scene-ready');
  }

  resize();
  container.parentElement?.classList.add('scene-ready');
  syncLoop();

  return {
    setPaused(value: boolean) {
      paused = value;
      syncLoop();
    },
    dispose,
  };
}
