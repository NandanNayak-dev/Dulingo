# Dulingo — Learn Public Services by Listening

> Gamified, audio-first public-service learning platform built with the MERN stack for Team Octopus.

---

## 🚀 Quickstart Guide

### Prerequisites
- Node.js (v18+)
- MongoDB running locally on `mongodb://127.0.0.1:27017`

### 1. Start the Backend Server (Express + MongoDB)
```bash
cd server
npm install
npm run dev
# Server runs at http://localhost:5000
# Health check: http://localhost:5000/api/health
```

### 2. Start the Frontend Client (React + Vite)
```bash
cd client
npm install
npm run dev
# App runs at http://localhost:5173
```

---

## 🎯 Project Roadmap
- [x] **Part 1: Core Foundation & Secure Authentication** (React, Express, MongoDB, JWT, BCrypt, RBAC, Design System)
- [x] **Part 2: Public Service Categories & Lesson Management** (6 civic categories, seeded lessons, search, category filters)
- [x] **Part 3: Audio Learning Player & Bilingual Transcripts** (Web Speech audio, speed controls, Kannada transcripts, completion rewards)
- [ ] **Part 4: Audio Quiz Engine & Server-Side Scoring**
- [ ] **Part 5: Simulated Mock Forms (Safe Practice Sandbox)**
- [ ] **Part 6: Teacher Assignments & Daily Tasks**
- [ ] **Part 7: Gamification, Streaks, Badges & Leaderboard**
- [ ] **Part 8: Teacher Reporting & Progress Analytics**
- [ ] **Part 9: Regional AI & Speech Synthesis**
- [ ] **Part 10: Security Hardening, Accessibility Audit & Deployment**