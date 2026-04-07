# 🌐 OpenRepo Frontend Web

**GitHub About:**
Web-based interface for OpenRepo platform. Responsive React app with authentication, repository management, and analytics dashboard. Companion web platform to the Electron desktop app.

---

## 📋 Overview

OpenRepo Frontend Web is the **web-based companion** to the desktop application, providing cloud-accessible features for repository management, analytics, and team collaboration.

### ✨ Features
- 📊 Analytics Dashboard - Repository metrics  
- 🔐 User Management - Profile & settings
- 📁 Repo Management - Create, import repos
- 🤖 ML Insights - Predictions, recommendations
- 👥 Team Collaboration - Share insights
- 📱 Responsive - Desktop, tablet, mobile

---

## 🏗️ Structure

```
frontend-web/
├── vite.config.js        # Build config
├── package.json          # Dependencies
├── public/               # Static assets
├── index.html            # Entry
│
└── src/
    ├── main.jsx          # React entry
    ├── App.jsx           # Router
    ├── assets/           # Images
    ├── components/       # Components
    │   ├── Header.jsx
    │   └── Footer.jsx
    └── pages/
        ├── Home/         # Landing
        ├── Auth/         # Login
        ├── About/        # About
        └── Demo/         # Demo
```

---

## 🚀 Quick Start

```bash
cd frontend-web
npm install
npm run dev      # Dev server
npm run build    # Production
```

---

## 🛠️ Tech Stack
- React 19, Vite, Tailwind CSS
- Framer Motion, Lucide React

---

## 📄 License
Private - OpenRepo Platform
