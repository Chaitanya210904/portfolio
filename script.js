/**
 * CHAITANYAPRASAD KULKARNI - PORTFOLIO INTERACTION & 3D ENGINE
 * Features: Three.js 3D Holographic Core, 16-Agent Swarm, Web Audio Synth,
 * 3 Interactive Simulators, Interactive Terminal, Skills Matrix & CV Modal
 */

// ============================================================================
// 1. WEB AUDIO API SYNTHESIZER (NO EXTERNAL FILES REQUIRED)
// ============================================================================
class SoundFX {
  constructor() {
    this.enabled = false;
    this.ctx = null;
  }

  init() {
    if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
  }

  toggle() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.enabled = !this.enabled;
    return this.enabled;
  }

  playHover() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(540, this.ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.015, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.06);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.06);
    } catch (e) {}
  }

  playClick() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(620, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.09);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.09);
    } catch (e) {}
  }

  playSwarmLaunch() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.28);
      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.3);
    } catch (e) {}
  }
}

const sfx = new SoundFX();

// ============================================================================
// 2. THREE.JS 3D INTERACTIVE ENGINE (HOLOGRAPHIC 16-AGENT SWARM)
// ============================================================================
class ThreeSceneManager {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas || typeof THREE === 'undefined') return;

    this.mode = 'swarm'; // 'swarm' | 'neural' | 'telemetry'
    this.autoRotate = true;
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2(-999, -999);
    this.agentNodes = [];
    this.orbitAngles = [];
    this.lines = null;
    this.tooltip = document.getElementById('3d-node-tooltip');

    this.agentDetails = [
      { id: 'Agent-01', name: 'AST Parser', desc: 'Parses Python/C#/JS into Code Property Graphs' },
      { id: 'Agent-02', name: 'CFG Engine', desc: 'Constructs deterministic Control Flow Graphs' },
      { id: 'Agent-03', name: 'DataFlow Engine', desc: 'Interprocedural data flow & taint tracking' },
      { id: 'Agent-04', name: 'Call Graph Extractor', desc: 'Maps cross-module dependencies and symbols' },
      { id: 'Agent-05', name: 'Blast-Radius Calc', desc: 'Computes architectural ripple effect of changes' },
      { id: 'Agent-06', name: 'SAST Security Gate', desc: 'Scans AST for injection, memory & auth flaws' },
      { id: 'Agent-07', name: 'Secret Detector', desc: 'Entropy analysis for leaked keys & tokens' },
      { id: 'Agent-08', name: 'Dependency Auditor', desc: 'Flags vulnerable CVE third-party packages' },
      { id: 'Agent-09', name: 'Complexity Auditor', desc: 'Evaluates Cyclomatic & Halstead complexity' },
      { id: 'Agent-10', name: 'Task Down-Router', desc: 'Routes simple tasks to local algorithmic heuristic' },
      { id: 'Agent-11', name: 'Token Governor', desc: 'Reduces LLM inference costs by 85%' },
      { id: 'Agent-12', name: 'Context Pruner', desc: 'Compresses prompt AST context by 70%' },
      { id: 'Agent-13', name: 'Adversarial Gate', desc: 'Challenges findings to reduce false positives by 30%' },
      { id: 'Agent-14', name: 'Consensus Arbiter', desc: 'Aggregates multi-agent verification votes' },
      { id: 'Agent-15', name: 'Live SSE Telemetry', desc: 'Streams real-time analysis packets via SSE' },
      { id: 'Agent-16', name: 'Report Generator', desc: 'Extracts full CSV/JSON codebase audit registries' }
    ];

    this.init();
  }

  init() {
    const rect = this.canvas.parentElement.getBoundingClientRect();
    const width = rect.width || 600;
    const height = rect.height || 500;

    // Scene & Camera
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x060913, 0.028);

    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    this.camera.position.set(0, 2.5, 7.5);

    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Controls
    if (typeof THREE.OrbitControls !== 'undefined') {
      this.controls = new THREE.OrbitControls(this.camera, this.canvas);
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 0.06;
      this.controls.enableZoom = true;
      this.controls.minDistance = 4;
      this.controls.maxDistance = 14;
      this.controls.autoRotate = false;
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    this.scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x00f0ff, 2.5, 20);
    cyanLight.position.set(5, 5, 5);
    this.scene.add(cyanLight);

    const purpleLight = new THREE.PointLight(0x9d4edd, 2, 20);
    purpleLight.position.set(-5, -3, 3);
    this.scene.add(purpleLight);

    // Build Central Holographic Core
    this.createCore();

    // Build 16 Orbiting Agents
    this.createAgentSwarm();

    // Build Floating Particle Field
    this.createParticleCloud();

    // Build Tactical Ground Plane Grid
    this.createTacticalGrid();

    // Event Listeners
    window.addEventListener('resize', () => this.onResize());
    this.canvas.addEventListener('mousemove', (e) => this.onMouseMove(e));
    this.canvas.addEventListener('mouseleave', () => {
      this.mouse.set(-999, -999);
      if (this.tooltip) this.tooltip.style.display = 'none';
    });

    this.animate();
  }

  createCore() {
    this.coreGroup = new THREE.Group();

    // Outer Icosahedron Wireframe
    const icoGeo = new THREE.IcosahedronGeometry(1.6, 1);
    const icoMat = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
      roughness: 0.2
    });
    this.icoMesh = new THREE.Mesh(icoGeo, icoMat);
    this.coreGroup.add(this.icoMesh);

    // Inner Glowing Core Sphere
    const innerGeo = new THREE.SphereGeometry(0.85, 24, 24);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: false,
      transparent: true,
      opacity: 0.35
    });
    this.innerMesh = new THREE.Mesh(innerGeo, innerMat);
    this.coreGroup.add(this.innerMesh);

    // Pulsing point cloud at vertices
    const pointsGeo = new THREE.IcosahedronGeometry(1.65, 2);
    const pointsMat = new THREE.PointsMaterial({
      color: 0x9d4edd,
      size: 0.06,
      transparent: true,
      opacity: 0.8
    });
    this.pointsMesh = new THREE.Points(pointsGeo, pointsMat);
    this.coreGroup.add(this.pointsMesh);

    // Orbiting Gimbal Rings
    const ringGeo1 = new THREE.RingGeometry(2.3, 2.34, 48);
    const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x00f0ff, side: THREE.DoubleSide, transparent: true, opacity: 0.4 });
    this.ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    this.ring1.rotation.x = Math.PI / 2.5;
    this.coreGroup.add(this.ring1);

    const ringGeo2 = new THREE.RingGeometry(2.8, 2.84, 48);
    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0x9d4edd, side: THREE.DoubleSide, transparent: true, opacity: 0.35 });
    this.ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    this.ring2.rotation.y = Math.PI / 3;
    this.coreGroup.add(this.ring2);

    this.scene.add(this.coreGroup);
  }

  createAgentSwarm() {
    this.agentGroup = new THREE.Group();
    this.agentNodes = [];
    this.orbitAngles = [];

    const numAgents = 16;
    const nodeGeo = new THREE.SphereGeometry(0.13, 16, 16);

    for (let i = 0; i < numAgents; i++) {
      const radius = 2.4 + (i % 3) * 0.55;
      const angle = (i / numAgents) * Math.PI * 2;
      const speed = 0.008 + (i % 4) * 0.003;
      const yOffset = Math.sin(angle * 2) * 0.7;

      const isSpecial = i === 5 || i === 10 || i === 12; // SAST, Token Governor, Adversarial Gate
      const mat = new THREE.MeshStandardMaterial({
        color: isSpecial ? 0x00f0ff : 0xa855f7,
        emissive: isSpecial ? 0x00a8cc : 0x7e22ce,
        emissiveIntensity: 0.6,
        roughness: 0.1
      });

      const nodeMesh = new THREE.Mesh(nodeGeo, mat);
      nodeMesh.userData = {
        agentIndex: i,
        info: this.agentDetails[i],
        baseScale: 1
      };

      this.agentNodes.push(nodeMesh);
      this.orbitAngles.push({ angle, radius, speed, yOffset });
      this.agentGroup.add(nodeMesh);
    }

    this.scene.add(this.agentGroup);

    // Dynamic Link Lines connecting agents to core
    this.linesGeo = new THREE.BufferGeometry();
    const linePositions = new Float32Array(numAgents * 6);
    this.linesGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));

    const lineMat = new THREE.LineBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.22
    });
    this.lineSegments = new THREE.LineSegments(this.linesGeo, lineMat);
    this.scene.add(this.lineSegments);
  }

  createParticleCloud() {
    const count = 350;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 16;
      pos[i + 1] = (Math.random() - 0.5) * 10;
      pos[i + 2] = (Math.random() - 0.5) * 16;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const mat = new THREE.PointsMaterial({
      color: 0x64748b,
      size: 0.04,
      transparent: true,
      opacity: 0.6
    });

    this.particles = new THREE.Points(geo, mat);
    this.scene.add(this.particles);
  }

  createTacticalGrid() {
    const grid = new THREE.GridHelper(16, 24, 0x00f0ff, 0x1e293b);
    grid.position.y = -2.8;
    grid.material.opacity = 0.25;
    grid.material.transparent = true;
    this.scene.add(grid);
  }

  setMode(mode) {
    this.mode = mode;
    if (mode === 'swarm') {
      this.icoMesh.material.color.setHex(0x00f0ff);
      this.innerMesh.material.color.setHex(0x00f0ff);
      this.agentGroup.visible = true;
      this.lineSegments.visible = true;
    } else if (mode === 'neural') {
      this.icoMesh.material.color.setHex(0xec4899);
      this.innerMesh.material.color.setHex(0xec4899);
      this.agentGroup.visible = true;
      this.lineSegments.visible = true;
    } else if (mode === 'telemetry') {
      this.icoMesh.material.color.setHex(0x10b981);
      this.innerMesh.material.color.setHex(0x10b981);
      this.agentGroup.visible = true;
      this.lineSegments.visible = true;
    }
    sfx.playClick();
  }

  triggerPulse() {
    sfx.playSwarmLaunch();
    let frame = 0;
    const maxFrames = 30;
    const originalScale = 1;

    const pulseInterval = setInterval(() => {
      frame++;
      const progress = frame / maxFrames;
      const scale = originalScale + Math.sin(progress * Math.PI) * 0.45;
      this.coreGroup.scale.set(scale, scale, scale);

      if (frame >= maxFrames) {
        clearInterval(pulseInterval);
        this.coreGroup.scale.set(1, 1, 1);
      }
    }, 16);
  }

  onMouseMove(e) {
    const rect = this.canvas.getBoundingClientRect();
    this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    // Raycast against agent nodes
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.agentNodes);

    if (intersects.length > 0) {
      const hitNode = intersects[0].object;
      const info = hitNode.userData.info;

      hitNode.scale.set(1.6, 1.6, 1.6);
      hitNode.material.emissiveIntensity = 1.2;

      if (this.tooltip) {
        this.tooltip.style.display = 'block';
        this.tooltip.style.left = `${e.clientX - rect.left}px`;
        this.tooltip.style.top = `${e.clientY - rect.top}px`;
        this.tooltip.innerHTML = `
          <strong style="color:var(--cyan)">${info.id}: ${info.name}</strong><br/>
          <span style="color:#cbd5e1;font-size:0.75rem">${info.desc}</span>
        `;
      }
      sfx.playHover();
    } else {
      this.agentNodes.forEach((node) => {
        node.scale.set(1, 1, 1);
        node.material.emissiveIntensity = 0.6;
      });
      if (this.tooltip) {
        this.tooltip.style.display = 'none';
      }
    }
  }

  onResize() {
    if (!this.canvas) return;
    const rect = this.canvas.parentElement.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    const time = performance.now() * 0.001;

    // Rotate core
    if (this.icoMesh) {
      this.icoMesh.rotation.x += 0.004;
      this.icoMesh.rotation.y += 0.006;
      this.pointsMesh.rotation.x -= 0.003;
      this.pointsMesh.rotation.y += 0.005;
      this.ring1.rotation.z += 0.008;
      this.ring2.rotation.z -= 0.006;
    }

    // Orbit Agents & update link lines
    if (this.agentNodes.length > 0) {
      const positions = this.lineSegments.geometry.attributes.position.array;

      for (let i = 0; i < this.agentNodes.length; i++) {
        const node = this.agentNodes[i];
        const orbit = this.orbitAngles[i];

        orbit.angle += orbit.speed;
        const x = Math.cos(orbit.angle) * orbit.radius;
        const z = Math.sin(orbit.angle) * orbit.radius;
        const y = orbit.yOffset + Math.sin(time * 2 + i) * 0.2;

        node.position.set(x, y, z);

        // Update line start at core (0,0,0) and end at node (x,y,z)
        const idx = i * 6;
        positions[idx] = 0;
        positions[idx + 1] = 0;
        positions[idx + 2] = 0;
        positions[idx + 3] = x;
        positions[idx + 4] = y;
        positions[idx + 5] = z;
      }

      this.lineSegments.geometry.attributes.position.needsUpdate = true;
    }

    // Auto rotate controls if active
    if (this.controls) {
      if (this.autoRotate) {
        this.controls.autoRotate = true;
        this.controls.autoRotateSpeed = 1.0;
      } else {
        this.controls.autoRotate = false;
      }
      this.controls.update();
    }

    this.renderer.render(this.scene, this.camera);
  }
}

// ============================================================================
// 3. TYPEWRITER EFFECT
// ============================================================================
class Typewriter {
  constructor(el, phrases) {
    this.el = el;
    this.phrases = phrases;
    this.phraseIndex = 0;
    this.charIndex = 0;
    this.isDeleting = false;
    this.delay = 100;
    this.tick();
  }

  tick() {
    const currentPhrase = this.phrases[this.phraseIndex];

    if (this.isDeleting) {
      this.charIndex--;
      this.delay = 40;
    } else {
      this.charIndex++;
      this.delay = 90;
    }

    this.el.textContent = currentPhrase.substring(0, this.charIndex);

    if (!this.isDeleting && this.charIndex === currentPhrase.length) {
      this.isDeleting = true;
      this.delay = 2000; // Pause at end
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.phraseIndex = (this.phraseIndex + 1) % this.phrases.length;
      this.delay = 350;
    }

    setTimeout(() => this.tick(), this.delay);
  }
}

// ============================================================================
// 4. INTERACTIVE SIMULATORS (SWARM, FOOTBALL CV, PHISHING)
// ============================================================================

// Simulator 1: Multiagentsweep 16-Agent Swarm Simulator
class SwarmSimulator {
  constructor() {
    this.canvas = document.getElementById('swarm-canvas');
    this.logsEl = document.getElementById('swarm-terminal-logs');
    this.btn = document.getElementById('dispatch-swarm-btn');
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.isRunning = false;
    this.step = 0;

    this.agentNames = [
      'AST-Parser', 'CFG-Builder', 'DataFlow', 'CallGraph',
      'BlastRadius', 'SAST-Security', 'SecretDetector', 'CVE-Auditor',
      'CyclomaticMetric', 'TaskRouter', 'TokenGovernor', 'ContextPruner',
      'AdversarialGate', 'ConsensusArbiter', 'SSETelemetry', 'RegistryExport'
    ];

    this.initCanvas();
    if (this.btn) {
      this.btn.addEventListener('click', () => this.runSimulation());
    }
  }

  initCanvas() {
    const rect = this.canvas.parentElement.getBoundingClientRect();
    this.canvas.width = rect.width || 500;
    this.canvas.height = rect.height || 360;
    this.drawIdleState();
  }

  drawIdleState() {
    const { width, height } = this.canvas;
    this.ctx.clearRect(0, 0, width, height);

    // Center Core
    this.ctx.fillStyle = '#0f172a';
    this.ctx.strokeStyle = '#00f0ff';
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.arc(width / 2, height / 2, 35, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.stroke();

    this.ctx.fillStyle = '#00f0ff';
    this.ctx.font = '11px JetBrains Mono';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('CORE AST', width / 2, height / 2 + 4);

    // 16 Agent Circles
    for (let i = 0; i < 16; i++) {
      const angle = (i / 16) * Math.PI * 2;
      const r = 120;
      const x = width / 2 + Math.cos(angle) * r;
      const y = height / 2 + Math.sin(angle) * r;

      this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      this.ctx.beginPath();
      this.ctx.moveTo(width / 2, height / 2);
      this.ctx.lineTo(x, y);
      this.ctx.stroke();

      this.ctx.fillStyle = '#1e293b';
      this.ctx.strokeStyle = '#64748b';
      this.ctx.beginPath();
      this.ctx.arc(x, y, 14, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.stroke();

      this.ctx.fillStyle = '#94a3b8';
      this.ctx.font = '9px JetBrains Mono';
      this.ctx.fillText(`A${i + 1}`, x, y + 3);
    }
  }

  runSimulation() {
    if (this.isRunning) return;
    this.isRunning = true;
    sfx.playSwarmLaunch();
    this.logsEl.innerHTML = '';
    this.log(`[SYSTEM] Initializing Multiagentsweep 16-Agent distributed swarm...`, 'log-info');

    let agentIdx = 0;
    const interval = setInterval(() => {
      if (agentIdx < 16) {
        this.activateAgent(agentIdx);
        agentIdx++;
      } else {
        clearInterval(interval);
        this.log(`[PASS] 134 automated unit & integration tests validated.`, 'log-success');
        this.log(`[TELEMETRY] LLM Token Reduction: -85.2% | False Positives: -31.4%`, 'log-tag');
        this.log(`[READY] SSE Stream live on :8080/v1/telemetry`, 'log-info');
        this.isRunning = false;
      }
    }, 280);
  }

  activateAgent(idx) {
    const name = this.agentNames[idx];
    const { width, height } = this.canvas;
    const angle = (idx / 16) * Math.PI * 2;
    const r = 120;
    const x = width / 2 + Math.cos(angle) * r;
    const y = height / 2 + Math.sin(angle) * r;

    // Glowing connection line
    this.ctx.strokeStyle = '#00f0ff';
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.moveTo(width / 2, height / 2);
    this.ctx.lineTo(x, y);
    this.ctx.stroke();

    // Node glow
    this.ctx.fillStyle = '#00f0ff';
    this.ctx.beginPath();
    this.ctx.arc(x, y, 16, 0, Math.PI * 2);
    this.ctx.fill();

    this.ctx.fillStyle = '#060913';
    this.ctx.font = 'bold 9px JetBrains Mono';
    this.ctx.fillText(`A${idx + 1}`, x, y + 3);

    // Log message
    let action = 'Auditing branch';
    if (idx === 0) action = 'Parsing AST & building Code Property Graph';
    if (idx === 4) action = 'Computing blast-radius across 42 modules';
    if (idx === 5) action = 'SAST scan: zero high-severity CVEs';
    if (idx === 10) action = 'Token Governor: task down-routed (-85% cost)';
    if (idx === 12) action = 'Adversarial gate active: 4 false positives pruned';

    this.log(`[AGENT-${String(idx + 1).padStart(2, '0')}] (${name}) → ${action}`, idx % 2 === 0 ? 'log-info' : 'log-success');
    sfx.playHover();
  }

  log(msg, className = 'log-line') {
    const div = document.createElement('div');
    div.className = `log-line ${className}`;
    div.textContent = msg;
    this.logsEl.appendChild(div);
    this.logsEl.scrollTop = this.logsEl.scrollHeight;
  }
}

// Simulator 2: Football Tactical Telemetry Sandbox
class FootballTelemetrySimulator {
  constructor() {
    this.canvas = document.getElementById('pitch-canvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');

    // Player position
    this.player = { x: 180, y: 150, vx: 2.4, vy: 1.1, id: 7, team: 'Sky Blue' };
    this.ball = { x: 220, y: 170 };

    this.coordEl = document.getElementById('telem-coord');
    this.speedEl = document.getElementById('telem-speed');
    this.optFlowEl = document.getElementById('telem-flow');
    this.distEl = document.getElementById('telem-dist');
    this.totalDist = 412.5;

    this.init();
  }

  init() {
    const rect = this.canvas.parentElement.getBoundingClientRect();
    this.canvas.width = rect.width || 500;
    this.canvas.height = rect.height || 360;

    this.canvas.addEventListener('click', (e) => this.onPitchClick(e));
    this.render();
  }

  onPitchClick(e) {
    const rect = this.canvas.getBoundingClientRect();
    this.player.x = e.clientX - rect.left;
    this.player.y = e.clientY - rect.top;

    // Simulate sprint speed burst
    const speed = (24 + Math.random() * 8.5).toFixed(1);
    const metricX = ((this.player.x / this.canvas.width) * 105).toFixed(1);
    const metricY = ((this.player.y / this.canvas.height) * 68).toFixed(1);
    this.totalDist += Math.floor(Math.random() * 12 + 4);

    if (this.coordEl) this.coordEl.textContent = `(${metricX}m, ${metricY}m)`;
    if (this.speedEl) this.speedEl.textContent = `${speed} km/h`;
    if (this.optFlowEl) this.optFlowEl.textContent = `Δx: ${(Math.random() * 0.8 - 0.4).toFixed(2)}px, Δy: ${(Math.random() * 0.6 - 0.3).toFixed(2)}px`;
    if (this.distEl) this.distEl.textContent = `${this.totalDist.toFixed(1)} m`;

    sfx.playClick();
    this.render();
  }

  render() {
    const { width, height } = this.canvas;
    this.ctx.clearRect(0, 0, width, height);

    // Draw Tactical Pitch Lines
    this.ctx.strokeStyle = 'rgba(16, 185, 129, 0.45)';
    this.ctx.lineWidth = 1.5;

    // Pitch perimeter
    this.ctx.strokeRect(20, 20, width - 40, height - 40);

    // Halfway line & center circle
    this.ctx.beginPath();
    this.ctx.moveTo(width / 2, 20);
    this.ctx.lineTo(width / 2, height - 20);
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.arc(width / 2, height / 2, 45, 0, Math.PI * 2);
    this.ctx.stroke();

    // Penalty boxes
    this.ctx.strokeRect(20, height / 2 - 50, 60, 100);
    this.ctx.strokeRect(width - 80, height / 2 - 50, 60, 100);

    // Perspective Homography Projection Grid Lines (Lucas-Kanade correction)
    this.ctx.strokeStyle = 'rgba(0, 240, 255, 0.15)';
    this.ctx.setLineDash([4, 4]);
    for (let x = 40; x < width - 40; x += 45) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 20);
      this.ctx.lineTo(x + 20, height - 20);
      this.ctx.stroke();
    }
    this.ctx.setLineDash([]);

    // Draw Player YOLO Bounding Box & ByteTrack Tag
    const px = this.player.x;
    const py = this.player.y;

    this.ctx.strokeStyle = '#00f0ff';
    this.ctx.lineWidth = 2;
    this.ctx.strokeRect(px - 18, py - 30, 36, 60);

    // Bounding Box Tag
    this.ctx.fillStyle = '#00f0ff';
    this.ctx.fillRect(px - 18, py - 46, 75, 16);
    this.ctx.fillStyle = '#000';
    this.ctx.font = 'bold 9px JetBrains Mono';
    this.ctx.fillText(`ID:07 28.4km/h`, px - 15, py - 34);

    // Player marker
    this.ctx.fillStyle = '#38bdf8';
    this.ctx.beginPath();
    this.ctx.arc(px, py, 9, 0, Math.PI * 2);
    this.ctx.fill();

    // Motion Vector (Lucas-Kanade optical flow line)
    this.ctx.strokeStyle = '#f59e0b';
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.moveTo(px, py);
    this.ctx.lineTo(px + 28, py + 14);
    this.ctx.stroke();

    // Hint text
    this.ctx.fillStyle = '#94a3b8';
    this.ctx.font = '10px JetBrains Mono';
    this.ctx.textAlign = 'left';
    this.ctx.fillText('⚡ Click anywhere on pitch to simulate player repositioning & telemetry', 24, height - 8);
  }
}

// Simulator 3: Phishing Risk AI Detector
class PhishingSimulator {
  constructor() {
    this.input = document.getElementById('url-test-input');
    this.btn = document.getElementById('evaluate-url-btn');
    this.scoreNum = document.getElementById('threat-score-num');
    this.scoreStatus = document.getElementById('threat-score-status');
    this.scoreCircle = document.getElementById('threat-circle');

    this.featureLen = document.getElementById('feat-len');
    this.featureEntropy = document.getElementById('feat-entropy');
    this.featureSub = document.getElementById('feat-sub');
    this.featureDrift = document.getElementById('feat-drift');

    this.presetPills = document.querySelectorAll('.preset-pill');

    this.init();
  }

  init() {
    if (this.btn) {
      this.btn.addEventListener('click', () => this.evaluate());
    }
    if (this.input) {
      this.input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') this.evaluate();
      });
    }

    this.presetPills.forEach((pill) => {
      pill.addEventListener('click', () => {
        const url = pill.getAttribute('data-url');
        if (this.input) this.input.value = url;
        this.evaluate();
      });
    });
  }

  evaluate() {
    const url = (this.input ? this.input.value : '').trim().toLowerCase();
    if (!url) return;
    sfx.playClick();

    let score = 5;
    let isPhish = false;

    if (
      url.includes('paypal') ||
      url.includes('verify') ||
      url.includes('security-update') ||
      url.includes('.xyz') ||
      url.includes('account-login')
    ) {
      score = 94 + Math.floor(Math.random() * 5);
      isPhish = true;
    } else if (url.includes('github') || url.includes('nie.ac.in') || url.includes('google.com')) {
      score = Math.floor(Math.random() * 3) + 1;
      isPhish = false;
    } else {
      score = Math.floor(Math.random() * 40) + 10;
    }

    // Animate score counter
    if (this.scoreNum) {
      let current = 0;
      const timer = setInterval(() => {
        current += Math.ceil((score - current) / 4);
        this.scoreNum.textContent = `${current}%`;
        if (current >= score) {
          clearInterval(timer);
          this.scoreNum.textContent = `${score}%`;
        }
      }, 30);
    }

    // Update status & styles
    if (this.scoreStatus && this.scoreCircle) {
      if (isPhish) {
        this.scoreStatus.textContent = 'MALICIOUS THREAT';
        this.scoreStatus.style.color = '#ef4444';
        this.scoreCircle.style.borderColor = '#ef4444';
        this.scoreCircle.style.boxShadow = '0 0 25px rgba(239, 68, 68, 0.4)';
        if (this.featureLen) this.featureLen.innerHTML = '<span class="state-danger">Flagged (>48 chars)</span>';
        if (this.featureEntropy) this.featureEntropy.innerHTML = '<span class="state-danger">High (4.82 bits)</span>';
        if (this.featureSub) this.featureSub.innerHTML = '<span class="state-danger">3 Subdomains</span>';
        if (this.featureDrift) this.featureDrift.innerHTML = '<span class="state-danger">KS-Test Drift (p < 0.01)</span>';
      } else {
        this.scoreStatus.textContent = 'LEGITIMATE DOMAIN';
        this.scoreStatus.style.color = '#10b981';
        this.scoreCircle.style.borderColor = '#10b981';
        this.scoreCircle.style.boxShadow = '0 0 25px rgba(16, 185, 129, 0.4)';
        if (this.featureLen) this.featureLen.innerHTML = '<span class="state-safe">Normal (21 chars)</span>';
        if (this.featureEntropy) this.featureEntropy.innerHTML = '<span class="state-safe">Low (2.41 bits)</span>';
        if (this.featureSub) this.featureSub.innerHTML = '<span class="state-safe">1 Subdomain</span>';
        if (this.featureDrift) this.featureDrift.innerHTML = '<span class="state-safe">Stable (KS p = 0.84)</span>';
      }
    }
  }
}

// ============================================================================
// 5. INTERACTIVE TERMINAL / COMMAND PALETTE MODAL
// ============================================================================
class TerminalController {
  constructor() {
    this.modal = document.getElementById('terminal-modal');
    this.output = document.getElementById('cli-output');
    this.input = document.getElementById('cli-input');
    this.closeBtn = document.getElementById('close-terminal-btn');
    this.launchBtns = document.querySelectorAll('.launch-terminal-trigger');

    this.commands = {
      help: `AVAILABLE COMMANDS:
  help        - List all commands
  about       - Summary of Chaitanyaprasad Kulkarni
  exp         - Tool Developer Internship at BorgWarner
  projects    - Highlighted Flagship Projects (Multiagentsweep, Football CV, Phishing MLOps)
  skills      - Technical Skills & Tools breakdown
  education   - NIE Mysuru & Academic Credentials
  cv          - Open Europass CV Viewer Modal
  contact     - View contact info & links
  clear       - Clear terminal window
  ping        - Check latency to Bengaluru server`,
      about: `CHAITANYAPRASAD KULKARNI
Role: AI & Systems Engineer | Tool Developer Intern @ BorgWarner
Education: B.E. Computer Science & Engineering, The National Institute of Engineering (NIE, Mysuru) - Final Grade: 8.13 CGPA
Location: Bengaluru, Karnataka, India`,
      exp: `WORK EXPERIENCE:
• TOOL DEVELOPER INTERN — BORGWARNER (08/01/2026 – Present | Bangalore, India)
  - Developed centralized License Management System (Python, C# .NET, PostgreSQL)
  - Built internal Application Store Portal using Next.js & PostgreSQL with MFA
  - Implemented online-offline synchronization & connectivity validation
  - Developed PolarAI: AI-powered platform with Polarion ALM & Azure OpenAI
  - Reusable enterprise Python SDK via Polarion WSDL/SOAP services
  - Token optimization, session caching, and bidirectional XML sync pipelines`,
      projects: `FLAGSHIP PROJECTS:
1. Multiagentsweep (16-Agent Autonomous Codebase Comprehension Platform)
   → Reduced AI inference costs by 85%, cut false positives by 30%, 134 passing tests.
   → GitHub: https://github.com/Chaitanya210904/Multiagentsweep.git

2. Computer Vision System for Automated Football Analytics & Player Telemetry
   → YOLO + ByteTrack + Lucas-Kanade optical flow + perspective homography metric mapping.
   → GitHub: https://github.com/Chaitanya210904/Football-Player-Analysis.git

3. End-to-End Phishing Detection & MLOps Platform
   → 30+ features, KS-test data drift, MLflow/DagsHub, containerized FastAPI, 97.6% F1-Score.
   → GitHub: https://github.com/Chaitanya210904/Networksecurity.git`,
      skills: `SKILLS MATRIX:
• Languages: Python, C, C++, C#, SQL, JavaScript
• AI/ML/CV: YOLO, ByteTrack, OpenCV, Optical Flow, Homography, Scikit-Learn, Azure OpenAI
• Backend/Systems: Python SDKs, FastAPI, Next.js, Flask, C# .NET, REST, SSE, SOAP/WSDL
• DevOps/Data: PostgreSQL, MongoDB Atlas, Docker, Git, GitLab, MLflow, CI/CD`,
      education: `EDUCATION:
• Bachelor of Engineering in CSE — The National Institute of Engineering (NIE), Mysuru (2022–2026) | CGPA: 8.13
• Pre-University Course (PCMB) — Expert Group of Institutions, Mangalore (2020–2022)
• SSLC — Shri Ramakrishna Vidyashala, Mysore (2016–2020)`,
      contact: `GET IN TOUCH:
• Email: chaitanyapk2109@gmail.com
• Phone: (+91) 6362126748 / (+91) 9110693938
• GitHub: https://github.com/Chaitanya210904
• LinkedIn: https://www.linkedin.com/in/chaitanyaprasad210904/`,
      ping: `PING localhost: 64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.042 ms`
    };

    this.init();
  }

  init() {
    this.launchBtns.forEach((btn) => {
      btn.addEventListener('click', () => this.open());
    });

    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }

    if (this.modal) {
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) this.close();
      });
    }

    // Keyboard shortcut Cmd+K or Ctrl+K
    window.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        this.isOpen() ? this.close() : this.open();
      } else if (e.key === 'Escape' && this.isOpen()) {
        this.close();
      }
    });

    if (this.input) {
      this.input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          this.handleCommand(this.input.value.trim());
          this.input.value = '';
        }
      });
    }
  }

  isOpen() {
    return this.modal && this.modal.classList.contains('active');
  }

  open() {
    if (!this.modal) return;
    this.modal.classList.add('active');
    sfx.playClick();
    setTimeout(() => {
      if (this.input) this.input.focus();
    }, 100);
  }

  close() {
    if (!this.modal) return;
    this.modal.classList.remove('active');
    sfx.playClick();
  }

  handleCommand(cmd) {
    if (!cmd) return;
    sfx.playHover();
    const cleanCmd = cmd.toLowerCase();

    this.printLine(`chaitanya@core:~$ ${cmd}`, 'cli-prompt');

    if (cleanCmd === 'clear') {
      if (this.output) this.output.innerHTML = '';
      return;
    }

    if (cleanCmd === 'cv') {
      window.openDigitalCV();
      this.printLine(`Opening Europass CV viewer modal...`, 'text-cyan');
      return;
    }

    if (this.commands[cleanCmd]) {
      this.printLine(this.commands[cleanCmd]);
    } else {
      this.printLine(`command not found: "${cmd}". Type "help" for a list of available commands.`, 'text-rose');
    }

    if (this.output) {
      this.output.scrollTop = this.output.scrollHeight;
    }
  }

  printLine(text, className = '') {
    if (!this.output) return;
    const div = document.createElement('div');
    div.className = className;
    div.textContent = text;
    this.output.appendChild(div);
  }
}

// ============================================================================
// 6. SKILLS MATRIX FILTER & SEARCH
// ============================================================================
class SkillsMatrix {
  constructor() {
    this.tabs = document.querySelectorAll('.skill-tab-btn');
    this.cards = document.querySelectorAll('.skill-card');
    this.search = document.getElementById('skills-search-input');
    this.currentCategory = 'all';

    this.init();
  }

  init() {
    this.tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        this.tabs.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');
        this.currentCategory = tab.getAttribute('data-cat') || 'all';
        this.filter();
        sfx.playClick();
      });
    });

    if (this.search) {
      this.search.addEventListener('input', () => this.filter());
    }
  }

  filter() {
    const query = (this.search ? this.search.value : '').toLowerCase().trim();

    this.cards.forEach((card) => {
      const cat = card.getAttribute('data-category') || '';
      const title = (card.querySelector('.skill-title') ? card.querySelector('.skill-title').textContent : '').toLowerCase();
      const desc = (card.querySelector('.skill-desc') ? card.querySelector('.skill-desc').textContent : '').toLowerCase();

      const matchesCat = this.currentCategory === 'all' || cat === this.currentCategory;
      const matchesSearch = !query || title.includes(query) || desc.includes(query);

      if (matchesCat && matchesSearch) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }
}

// ============================================================================
// 7. TOAST NOTIFICATIONS & CLIPBOARD HELPERS
// ============================================================================
function showToast(message) {
  sfx.playClick();
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = `✓ ${message}`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

function copyToClipboard(text, label) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(`${label} copied to clipboard!`);
  }).catch(() => {
    showToast(`Failed to copy.`);
  });
}

// ============================================================================
// 8. EUROPASS CV MODAL CONTROLLER
// ============================================================================
window.openDigitalCV = function () {
  const modal = document.getElementById('cv-modal');
  if (modal) {
    modal.classList.add('active');
    sfx.playClick();
  }
};

window.closeDigitalCV = function () {
  const modal = document.getElementById('cv-modal');
  if (modal) {
    modal.classList.remove('active');
    sfx.playClick();
  }
};

// ============================================================================
// 9. GLOBAL INITIALIZATION ON DOMContentLoaded
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
  // A. Initialize 3D Scene
  let scene3D = null;
  if (typeof THREE !== 'undefined') {
    scene3D = new ThreeSceneManager('hero-3d-canvas');

    // 3D Mode Selector buttons
    const modeBtns = document.querySelectorAll('.mode-btn');
    modeBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        modeBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        const mode = btn.getAttribute('data-mode');
        if (scene3D) scene3D.setMode(mode);
      });
    });

    // 3D Trigger pulse
    const pulseBtn = document.getElementById('canvas-pulse-btn');
    if (pulseBtn) {
      pulseBtn.addEventListener('click', () => {
        if (scene3D) scene3D.triggerPulse();
      });
    }

    // 3D Auto Rotate toggle
    const autoRotateBtn = document.getElementById('canvas-autorotate-btn');
    if (autoRotateBtn) {
      autoRotateBtn.addEventListener('click', () => {
        if (scene3D) {
          scene3D.autoRotate = !scene3D.autoRotate;
          autoRotateBtn.textContent = scene3D.autoRotate ? 'Auto-Rotate: ON' : 'Auto-Rotate: OFF';
          sfx.playClick();
        }
      });
    }
  }

  // B. Typewriter in Hero
  const typewriterEl = document.getElementById('hero-typewriter');
  if (typewriterEl) {
    new Typewriter(typewriterEl, [
      'AI & Systems Engineer',
      'Tool Developer Intern @ BorgWarner',
      'Distributed Multi-Agent Architect',
      'Computer Vision & MLOps Specialist'
    ]);
  }

  // C. Audio Toggle Button
  const audioToggleBtn = document.getElementById('audio-toggle-btn');
  if (audioToggleBtn) {
    audioToggleBtn.addEventListener('click', () => {
      const isMuted = sfx.toggle();
      audioToggleBtn.classList.toggle('active-sound', isMuted);
      audioToggleBtn.innerHTML = isMuted
        ? `<span>🔊</span> Sound: ON`
        : `<span>🔇</span> Sound: OFF`;
      showToast(isMuted ? 'Sound FX Enabled' : 'Sound FX Muted');
    });
  }

  // D. Simulators Navigation Tabs
  const simTabs = document.querySelectorAll('.sim-tab-btn');
  const simPanels = document.querySelectorAll('.sim-panel');
  simTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      simTabs.forEach((t) => t.classList.remove('active'));
      simPanels.forEach((p) => p.classList.remove('active'));

      tab.classList.add('active');
      const targetId = tab.getAttribute('data-target');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) targetPanel.classList.add('active');
      sfx.playClick();
    });
  });

  // Initialize Simulators
  new SwarmSimulator();
  new FootballTelemetrySimulator();
  new PhishingSimulator();

  // E. Terminal Controller
  new TerminalController();

  // F. Skills Matrix Filter & Search
  new SkillsMatrix();

  // G. Mobile Hamburger Navigation
  const hamburgerBtn = document.getElementById('hamburger-toggle');
  const mobileDrawer = document.getElementById('mobile-nav-drawer');
  if (hamburgerBtn && mobileDrawer) {
    hamburgerBtn.addEventListener('click', () => {
      hamburgerBtn.classList.toggle('active');
      mobileDrawer.classList.toggle('open');
      sfx.playClick();
    });

    mobileDrawer.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        hamburgerBtn.classList.remove('active');
        mobileDrawer.classList.remove('open');
      });
    });
  }

  // H. Top Scroll Progress Indicator
  const progressBar = document.getElementById('scroll-progress');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;

    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }

    if (backToTopBtn) {
      if (scrollTop > 450) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      sfx.playClick();
    });
  }

  // I. Custom Dynamic Cursor
  const cursor = document.getElementById('custom-cursor');
  const cursorDot = document.getElementById('custom-cursor-dot');
  if (cursor && cursorDot && window.innerWidth > 768) {
    window.addEventListener('mousemove', (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
      cursorDot.style.left = `${e.clientX}px`;
      cursorDot.style.top = `${e.clientY}px`;
    });

    const hoverables = document.querySelectorAll('button, a, .skill-card, .highlight-card, .pillar-item, .project-feature-card');
    hoverables.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-hover');
        sfx.playHover();
      });
      el.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-hover');
      });
    });
  }

  // J. Contact Form Topics & Instant Submit
  const topicPills = document.querySelectorAll('.topic-pill');
  const messageInput = document.getElementById('contact-message');
  topicPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      topicPills.forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');
      const topic = pill.getAttribute('data-topic');
      if (messageInput) {
        messageInput.value = `Hi Chaitanya, I'd like to discuss: ${topic}. `;
        messageInput.focus();
      }
      sfx.playClick();
    });
  });

  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Thank you! Your message has been sent successfully.');
      contactForm.reset();
      sfx.playSwarmLaunch();
    });
  }

  // K. Europass Modal Close Event
  const cvModal = document.getElementById('cv-modal');
  if (cvModal) {
    cvModal.addEventListener('click', (e) => {
      if (e.target === cvModal) window.closeDigitalCV();
    });
  }
  const closeCvBtn = document.getElementById('close-cv-btn');
  if (closeCvBtn) {
    closeCvBtn.addEventListener('click', () => window.closeDigitalCV());
  }

  // L. Active Nav Link on Scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach((section) => {
      const top = section.offsetTop - 140;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
});