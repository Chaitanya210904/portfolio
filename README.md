# 🌐 Chaitanyaprasad Kulkarni — 3D Interactive Portfolio

[![GitHub repo size](https://img.shields.io/github/repo-size/Chaitanya210904/portfolio?style=for-the-badge&logo=github&color=blue)](https://github.com/Chaitanya210904/portfolio)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL_3D-00f0ff?style=for-the-badge&logo=three.js&logoColor=black)](https://threejs.org/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

Welcome to the personal interactive portfolio of **Chaitanyaprasad Kulkarni** — AI & Systems Engineer, Tool Developer Intern at **BorgWarner**, and Computer Science & Engineering undergraduate at **The National Institute of Engineering (NIE), Mysuru** (Batch of 2026, 8.13 CGPA).

---

## 📌 Table of Contents

- [🚀 Live Demo & Visual Highlights](#-live-demo--visual-highlights)
- [✨ Key Features & Interactions](#-key-features--interactions)
- [🛰️ 3D Holographic WebGL Scene](#️-3d-holographic-webgl-scene)
- [🧪 Hands-on Interactive Simulators](#-hands-on-interactive-simulators)
- [💻 Command-Line Terminal (Cmd+K)](#-command-line-terminal-cmdk)
- [💼 Work Experience & Projects](#-work-experience--projects)
- [🛠️ Tech Stack & Architecture](#️-tech-stack--architecture)
- [📂 Project Structure](#-project-structure)
- [⚡ Quick Start / Local Setup](#-quick-start--local-setup)
- [📫 Connect With Me](#-connect-with-me)

---

## 🚀 Live Demo & Visual Highlights

- **3D Spatial AI Core:** Real-time Three.js WebGL viewport featuring a pulsing holographic icosahedron, gimbal rings, and 16 orbiting autonomous agent nodes with raycasting hover tooltips.
- **Dark Cyber-Luxe Aesthetics:** Custom glassmorphism (`backdrop-filter: blur(16px)`), neon cyan/purple accents, ambient particle nebula, and fluid typography (`Syne`, `Inter`, `JetBrains Mono`).
- **Web Audio API Synthesizer:** Pure native JavaScript audio synthesizer generating cybernetic soundscapes, button chimes, and swarm launch frequencies (toggleable on/off).

---

## ✨ Key Features & Interactions

1. **🛰️ 16-Agent Orbital Swarm in 3D:** Interactive Three.js scene modeling the distributed architecture of *Multiagentsweep*. Drag to rotate 360°, scroll to zoom, hover on nodes to inspect agent roles, and switch between *Swarm*, *Neural*, and *CV Field* modes.
2. **🧪 3 Hands-on Interactive Tech Labs:**
   - **Multiagentsweep Swarm Simulator:** Live animated AST graph execution and streaming SSE telemetry logs in a terminal window.
   - **Tactical Pitch Telemetry Matrix:** Click anywhere on the tactical pitch to estimate real-world metric coordinates (X, Y in meters), instantaneous sprint speed (km/h), Lucas-Kanade optical flow compensation vectors, and team jersey clustering.
   - **MLOps Phishing Risk Analyzer:** Real-time URL threat scoring with dynamic gauge circle, Shannon entropy computation, and Kolmogorov-Smirnov (KS-test) data drift status.
3. **💻 Interactive CLI Terminal (`Cmd+K` or `Ctrl+K`):** Full-screen developer command-line interface with built-in commands (`help`, `about`, `exp`, `projects`, `skills`, `education`, `cv`, `contact`, `clear`, `ping`).
4. **📄 Digital Europass CV Viewer:** Dedicated modal rendering the complete official Europass Curriculum Vitae with instant print and direct PDF download options.
5. **🔍 Filterable Skills Matrix with Live Search:** Instant multi-category filtering (`AI/ML & CV`, `Backend & Systems`, `DevOps & Cloud`, `Languages`) with real-time substring search.
6. **📋 1-Click Clipboard Utilities:** Instant copy for email (`chaitanyapk2109@gmail.com`) and phone (`+91 6362126748`) with animated toast notifications.

---

## 💼 Work Experience & Projects

### 🏢 Work Experience
- **Tool Developer Intern — BorgWarner** (08/01/2026 – Present | Bangalore, India)
  - **License Management System:** Python, C# .NET, and PostgreSQL server with offline caching and session tracking.
  - **Application Store Portal:** Next.js and PostgreSQL web portal with MFA, approval workflows, and automated email notifications.
  - **PolarAI Platform:** AI automation integrated with Polarion ALM and Azure OpenAI for automated requirements and test case generation.
  - **Enterprise Python SDK:** Reusable components communicating with Polarion WSDL/SOAP services.
  - **High-Throughput Pipelines:** Token optimization, conversation memory management, and XML synchronization pipelines.

### 🌟 Featured Projects
1. **Multiagentsweep — Autonomous Multi-Agent Codebase Comprehension Platform**
   - 16-agent distributed platform with deterministic AST Code Property Graphs.
   - -85% LLM inference cost reduction via task down-routing, -30% static analysis false positives.
   - Validated by 134 automated unit & integration tests.
   - [GitHub Repo](https://github.com/Chaitanya210904/Multiagentsweep.git)
2. **Computer Vision System for Automated Football Analytics & Player Telemetry**
   - Tactical broadcast video analysis using Ultralytics YOLO, ByteTrack, and Lucas-Kanade optical flow.
   - Perspective homography mapping to real-world metric pitch coordinates; 2-tier K-Means jersey color clustering.
   - [GitHub Repo](https://github.com/Chaitanya210904/Football-Player-Analysis.git)
3. **End-to-End Phishing Detection & MLOps Platform**
   - 97.6% F1-score ensemble classifier analyzing 30+ URL/network features.
   - Automated ETL via MongoDB Atlas, Kolmogorov-Smirnov data drift detection, MLflow/DagsHub, containerized FastAPI REST API.
   - [GitHub Repo](https://github.com/Chaitanya210904/Networksecurity.git)

---

## 🛠️ Tech Stack & Architecture

| Layer | Technologies |
| :--- | :--- |
| **3D & Graphics** | Three.js (r128), WebGL, OrbitControls, Custom Shaders & Raycasting |
| **Audio** | HTML5 Web Audio API (native oscillator sound synthesis) |
| **Frontend Core** | HTML5 Semantic Architecture, CSS3 Custom Properties, Vanilla ES6+ |
| **Typography** | Syne (Display), Inter (Body), JetBrains Mono (Code & Telemetry) |
| **Styling** | Glassmorphism, CSS Grid, Flexbox, Dynamic Gradient Mesh, Ambient Orbs |
| **Responsive** | Mobile Drawer Navigation, Fluid clamp() Scaling, Dedicated Breakpoints |

---

## 📂 Project Structure

```text
portfolio/
├── README.md               # Comprehensive documentation & architecture guide
├── index.html              # Main HTML markup, 3D canvas viewport & modals
├── style.css               # Cyber-luxe design system, tokens & glassmorphism
├── mediaqueries.css        # Responsive layout breakpoints (Desktop, Tablet, Mobile)
├── script.js               # Three.js 3D engine, Web Audio synth, Simulators & Terminal
└── assets/                 # Graphics, images & documents
    ├── multiagentsweep.jpg # Multiagentsweep 16-agent dashboard visual
    ├── football-analytics.jpg # Football computer vision tactical screen visual
    ├── project-1.png       # Phishing detection MLOps preview
    ├── profile-pic.png     # Hero profile portrait
    ├── about-pic.png       # About section photo
    └── resume100.pdf       # Curriculum Vitae (PDF)
```

---

## ⚡ Quick Start / Local Setup

No heavy bundler or npm installation required. Run with any local HTTP server:

```bash
# Clone the repository
git clone https://github.com/Chaitanya210904/portfolio.git
cd portfolio

# Start Python HTTP server
python3 -m http.server 8080
```

Open `http://localhost:8080` in any modern web browser.

---

## 📫 Connect With Me

- **Email:** [chaitanyapk2109@gmail.com](mailto:chaitanyapk2109@gmail.com)
- **Phone:** (+91) 6362126748 / (+91) 9110693938
- **LinkedIn:** [linkedin.com/in/chaitanyaprasad210904](https://www.linkedin.com/in/chaitanyaprasad210904/)
- **GitHub:** [github.com/Chaitanya210904](https://github.com/Chaitanya210904)
- **Location:** Bengaluru, Karnataka, India
