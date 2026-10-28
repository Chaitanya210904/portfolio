# 🌐 Chaitanyaprasad Kulkarni — Personal Portfolio Website

[![GitHub repo size](https://img.shields.io/github/repo-size/Chaitanya210904/portfolio?style=for-the-badge&logo=github&color=blue)](https://github.com/Chaitanya210904/portfolio)
[![GitHub stars](https://img.shields.io/github/stars/Chaitanya210904/portfolio?style=for-the-badge&color=brightgreen)](https://github.com/Chaitanya210904/portfolio/stargazers)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

Welcome to the source code repository for my personal portfolio website! This lightweight, high-performance, and responsive portfolio showcases my professional profile, technical skill set, academic background, and end-to-end projects in **Machine Learning, MLOps, Data Science, and Software Engineering**.

---

## 📌 Table of Contents

- [Overview](#-overview)
- [✨ Key Features](#-key-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [📂 Project Structure](#-project-structure)
- [🚀 Quick Start / Local Setup](#-quick-start--local-setup)
- [💻 Portfolio Sections](#-portfolio-sections)
- [⭐ Featured Projects Highlighted](#-featured-projects-highlighted)
- [📱 Responsive Design](#-responsive-design)
- [📫 Connect With Me](#-connect-with-me)

---

## 📖 Overview

Designed and built from the ground up using clean semantic **HTML5**, **CSS3**, and **vanilla JavaScript**, this portfolio is tailored for speed, accessibility, and smooth user experience across desktops, tablets, and smartphones.

It highlights my experience as a Computer Science Engineering student at **The National Institute of Engineering (Batch of 2026)**, focusing on building scalable AI/ML pipelines, cloud infrastructure, and data workflows.

---

## ✨ Key Features

- **⚡ Lightweight & Blazing Fast:** Built with pure vanilla technologies—zero heavy runtime frameworks or bloated dependencies.
- **📱 Fully Responsive:** Dedicated media queries (`mediaqueries.css`) guarantee an optimal viewing experience on screens of all sizes (mobile, tablet, desktop).
- **🍔 Interactive Navigation:** Desktop navigation bar alongside an animated hamburger menu with smooth transitions on mobile viewports.
- **📄 Downloadable Resume / CV:** Direct one-click access to download the latest curriculum vitae (`resume100.pdf`).
- **🔗 Direct Links to Work & Demos:** Integrated GitHub and live demo links for featured engineering projects.
- **🎨 Minimalist Modern Aesthetic:** Clean card layouts, uniform iconography, balanced typography, and intuitive scroll-anchored sections.

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **HTML5** | Semantic structure, document outlines, accessibility metadata |
| **CSS3** | Modern flexbox layouts, transitions, custom styling, card designs |
| **Media Queries** | Dedicated responsive breakpoints for mobile and desktop screens |
| **Vanilla JavaScript** | DOM manipulation, mobile menu drawer toggle |
| **Google Fonts / Web Icons** | Clean typography and consistent visual cues |

---

## 📂 Project Structure

```text
portfolio/
├── README.md               # Project documentation
├── index.html              # Main HTML markup and structure
├── style.css               # Core styling, layout, typography, and themes
├── mediaqueries.css        # Responsive breakpoints and mobile navigation
├── script.js               # Interactive functionality (e.g., hamburger menu toggle)
└── assets/                 # Images, icons, and document assets
    ├── profile-pic.png     # Hero profile picture
    ├── about-pic.png       # About section photo
    ├── project-1.png       # Phishing Detection preview
    ├── project-2.png       # Blood Bank Management preview
    ├── project-3.png       # Automated Trading Call preview
    ├── resume100.pdf       # Curriculum Vitae
    ├── checkmark.png       # Skill list bullets
    ├── arrow.png           # Scroll navigation icon
    ├── email.png           # Contact email icon
    ├── linkedin.png        # LinkedIn logo
    └── github.png          # GitHub logo
```

---

## 🚀 Quick Start / Local Setup

You do not need to install complex build tools, compilers, or package managers to run or modify this project.

### 1. Clone the Repository
```bash
git clone https://github.com/Chaitanya210904/portfolio.git
cd portfolio
```

### 2. Run Locally

#### Option A: Direct Browser Preview
Double-click `index.html` or open it with your browser:
```bash
# macOS
open index.html

# Linux
xdg-open index.html

# Windows
start index.html
```

#### Option B: Using a Lightweight Local HTTP Server (Recommended)
Using Python:
```bash
# Python 3
python -m http.server 8000
```
Then visit [http://localhost:8000](http://localhost:8000) in your browser.

Using VS Code:
- Install the **Live Server** extension.
- Right-click `index.html` and click **"Open with Live Server"**.

---

## 💻 Portfolio Sections

1. **Hero / Profile:**
   - Introduction, title (**Data Enthusiast & MLOps / AI Builder**).
   - Action buttons: *Download CV* & *Contact Info*.
   - Direct social shortcuts to LinkedIn & GitHub.
2. **About Me:**
   - Academic background: B.E. in Computer Science Engineering at *The National Institute of Engineering (2026)*.
   - Core summary of expertise in end-to-end data workflows, cloud AI pipelines, and automation.
3. **Skills & Experience:**
   - **Software & Tools:** Git, GitHub, MLflow, AWS, Tableau, MS Excel, CI/CD pipelines, Docker.
   - **Development & DB:** HTML5, CSS3, React, Django, MySQL.
   - **Machine Learning & Data:** Python, Pandas, NumPy, Scikit-learn (Hyperparameter tuning with GridSearchCV).
4. **Featured Projects:**
   - Detailed project cards with screenshots, GitHub repository links, and live demos.
5. **Contact Me:**
   - Quick-contact links via verified email and LinkedIn profile.

---

## ⭐ Featured Projects Highlighted

| Project | Description | Source / Demo |
| :--- | :--- | :--- |
| **Phishing Website Automation** | End-to-end cloud-ready phishing detection pipeline leveraging MLOps, Docker, AWS, and FastAPI for automated threat detection and data integrity. | [GitHub Repo](https://github.com/Chaitanya210904/Networksecurity) |
| **Blood Bank Management System** | Full-fledged management platform to organize donor registrations, real-time blood stock tracking, and recipient request workflows. | [GitHub Repo](https://github.com/) |
| **Automated Trading Call (GoQuant)** | Algorithmic trading call execution system integrating quantitative signals with automated workflows. | [GitHub Repo](https://github.com/Chaitanya210904/goquant) &bull; [Live Demo Video](https://drive.google.com/file/d/1bnrZcgaXmpH3hGSnQ8nqiqor71S4YpCW/view?usp=sharing) |

---

## 📱 Responsive Design

The portfolio utilizes responsive breakpoints defined in `mediaqueries.css`:
- **Desktop View (`> 1200px`):** Full horizontal navigation bar, multi-column grid layouts, and expansive hero section.
- **Tablet / Medium View (`<= 1200px`):** Adjusted container margins, stacked layouts for about details and skill cards.
- **Mobile View (`<= 600px`):** Hamburger slide-out drawer, single-column touch-friendly cards, and optimized font sizes.

---

## 📫 Connect With Me

- **👤 Name:** Chaitanyaprasad Kulkarni
- **💼 LinkedIn:** [linkedin.com/in/chaitanyaprasad210904](https://www.linkedin.com/in/chaitanyaprasad210904/)
- **🐙 GitHub:** [@Chaitanya210904](https://github.com/Chaitanya210904)
- **📧 Email:** [chaitanyaprasadkulkarni4@gmail.com](mailto:chaitanyaprasadkulkarni4@gmail.com)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) — you are free to use this template as inspiration for your own portfolio.
