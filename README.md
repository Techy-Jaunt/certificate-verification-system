# 🎓 Alumni Certificate Verification & Access Portal

A secure web platform for Techyjaunt alumni to download their certificates, and for recruiters or the public to verify graduate credentials—**without downloading or screenshotting sensitive documents**.

---

## 🧠 Overview

**Alumni Cert Portal** enables:
- **Alumni** to securely access and download their graduation certificates.
- **Recruiters/Public** to search and view a non-downloadable, protected preview of alumni certificates.
- **Admins** sync alumni data and certificates from a central **Google Sheet**—no manual uploads.

---

## 🚀 Features

- 🔒 **Secure Certificate Download** for verified alumni only
- 🧾 **Google Sheets Integration**: Automates data import
- 🔍 **Recruiter/Public Search** with screenshot-protected previews
- 👥 **Role-based Access**: Admins, Alumni, Public
- 🧑‍🤝‍🧑 **Built by the Community**: Alumni developers, designers, PMs, analysts, and cybersecurity volunteers

---

## 🛠️ Tech Stack

| Layer       | Tech                    |
|-------------|-------------------------|
| Frontend    | React, Tailwind CSS     |
| Backend     | Node.js, Express        |
| Database    | PostgreSQL              |
| Sync Source | Google Sheets API       |
| Auth (TBD)  | JWT, OAuth, Magic Link? |
| DevOps      | Docker, GitHub Actions  |

---

## 🧱 Project Structure

```plaintext
alumni-cert-portal/
├── backend/       # Express API with PostgreSQL + Google Sheets sync
├── frontend/      # React + Tailwind certificate UI and search
├── infra/         # Docker, docker-compose, CI/CD configs
├── docs/          # Contributor guides
├── .env.example   # Environment config template
└── README.md
```

---

## 📦 Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/YOUR-ORG/alumni-cert-portal.git
cd alumni-cert-portal
```

### 2. Setup Environment Variables

```bash
cp .env.example .env
```

### 3. Run Locally with Docker

```bash
docker-compose up --build
```

Frontend: [http://localhost:5173](http://localhost:5173)  
Backend: [http://localhost:3000](http://localhost:3000)

---

## 🧑‍💻 Contributing

We welcome developers, designers, product managers, data analysts, and cybersecurity experts from the alumni community!

📄 See [`docs/CONTRIBUTING.md`](./docs/CONTRIBUTING.md) for:

- Dev setup
- GitHub branching & PR guide
- Roles & responsibilities
- Code standards (Prettier + ESLint)

---

## 🔐 Security Considerations

- Backend proxy serves certificate files securely
- Frontend uses watermarking + JS/CSS tricks to discourage screenshots
- Admin access is restricted via backend auth

---

## 📅 Roadmap

- [ ] Google Sheets sync API  
- [ ] Alumni auth via email + ID + cohort  
- [ ] Recruiter search & preview  
- [ ] Screenshot protection layer  
- [ ] Admin dashboard  
- [ ] Deployment to Vercel + Railway  

---

## 🤝 License

MIT — Built by Techyjaunt alumni, for alumni 💛
