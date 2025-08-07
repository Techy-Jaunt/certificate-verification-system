# 🛠️ Contributing Guide

Welcome! This project is open to contributions from alumni developers, designers, product managers, data analysts, and cybersecurity professionals.

---

## 📦 Local Setup

### 1. Clone the Repo
```bash
git clone https://github.com/YOUR-ORG/alumni-cert-portal.git
cd alumni-cert-portal
```

### 2. Setup Environment Variables
```bash
cp .env.example .env
```

### 3. Run the Project
```bash
docker-compose up --build
```

- Frontend: http://localhost:5173
- Backend: http://localhost:3000

---

## 🌿 GitHub Branching Strategy

### 🔁 Primary Branches

| Branch Name | Purpose |
|-------------|---------|
| `main`      | Production-ready code |
| `frontend`  | React + Tailwind feature base |
| `backend`   | Node.js + Express + PostgreSQL base |

### 👨‍💻 Contributor Flow

#### For Frontend:
```bash
git checkout -b frontend
git pull origin frontend
git checkout -b feat/frontend/your-name/your-feature-name
```
- Push PR to `frontend`
- After approval and passing tests → Maintainer merges
- Maintainers merge `frontend` into `main` when stable

#### For Backend:
```bash
git checkout -b backend
git pull origin backend
git checkout -b feat/backend/your-name/your-feature-name
```
- Push PR to `backend`
- After approval and passing tests → Maintainer merges
- Maintainers merge `backend` into `main` when stable

### 🧼 Branch Naming Conventions

- `feat/frontend/your-name/component-name`
- `fix/backend/your-name/bug-description`
- `chore/docs/your-name/update-readme`
- `test/frontend/your-name/login-page`
- `refactor/backend/your-name/db-schema`

### 🛡️ PR Rules

- Code must pass ESLint + Prettier checks
- Use descriptive commit messages (Conventional Commits preferred)
- At least 1 review before merge
- No direct commits to `main`

---

## ✅ Contribution Areas

- `frontend/`: React + Tailwind UI
- `backend/`: Express APIs, Google Sheets sync
- `infra/`: Docker, CI/CD setup
- `docs/`: Onboarding, process docs

---

## 🤝 Code of Conduct

Please be respectful, constructive, and collaborative.

---

Ready to build? Pick an issue, create a feature branch, and raise your PR!

Thank you for contributing 💛
