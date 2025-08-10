
# 🚀 Contributing Guide – Community Internship Project

Welcome!  
This guide explains how to contribute to our project, whether you’re working on **frontend** or **backend**.  
Even if this is your first time using GitHub, you can follow along easily.

---

## 1️⃣ Clone the Repository

1. On our GitHub repo page, click the green **"Code"** button.
2. Copy the HTTPS link (example: `https://github.com/Techy-Jaunt/certificate-verification-system.git`).
3. Open your terminal/command prompt and run:

```bash
git clone https://github.com/Techy-Jaunt/certificate-verification-system.git
cd certificate-verification-system
````

---

## 2️⃣ Create or Switch to Your Branch

**DO NOT** work directly on the `main` branch!!!

Branch naming rules:

* **Frontend**: `yourname-fe` (example: `john-fe`)
* **Backend**: `yourname-be` (example: `ade-be`)

To create a new branch:

```bash
git checkout -b yourname-[fe or be]
```

If your branch already exists:

```bash
git checkout yourname-[fe or be]
```

---

## 3️⃣ Keep Your Branch Updated

Before you start working **every time**:

```bash
git pull origin main
git merge main
```

This ensures you’re working with the latest code.

---

## 4️⃣ Make Your Changes

1. Open the project in VS Code:

   ```bash
   code .
   ```

2. Add or edit files for your assigned task.

3. Save your changes.

---

## 5️⃣ Commit Your Changes

```bash
git add .
git commit -m "Brief description of your changes"
```

Example:

```bash
git commit -m "Added login page UI"
```

---

## 6️⃣ Push to GitHub

```bash
git push origin yourname-[fe or be]
```

---

## 7️⃣ Create a Pull Request (PR)

1. Go to the GitHub repository in your browser.
2. Click **"Compare & pull request"**.
3. Make sure:

   * **Base branch**: `main`
   * **Compare branch**: your branch (e.g., `john-fe`)
4. Describe your changes.
5. Click **"Create Pull Request"**.

---

## 8️⃣ Review Process

* **Frontend Lead** reviews frontend PRs.
* **Backend Lead** reviews backend PRs.
* They may:

  * Approve and merge your code into `main`.
  * Request changes for you to fix.

---

## ✅ Rules

* **Never** push directly to `main`.
* Always pull latest changes before starting work.
* Use clear, short commit messages.
* Test your code before pushing.
* Ask if you’re unsure — we’re here to help.

---

## 🔄 Example Workflow (Frontend)

```bash
git clone https://github.com/Techy-Jaunt/certificate-verification-system.git
cd certificate-verification-system
git checkout main
git pull origin main
git checkout -b ade-fe
git merge main
code .
# make changes in VS Code
git add .
git commit -m "Added dashboard UI"
git push origin ade-fe
# create PR to main on GitHub
```

---

## 📌 Simple Workflow Diagram

```
         ┌─────────────┐
         │     Main    │
         │ (Production)│
         └──────┬──────┘
                │
     ┌──────────┼──────────┐
     │                     │
┌──────────────┐   ┌──────────────┐
│ yourname-fe  │   │ yourname-be  │
│ (Frontend)   │   │ (Backend)    │
└──────┬───────┘   └──────┬───────┘
       │                   │
       └────── PR to Main ─┘
           (Reviewed first)
```

---

🎯 **That’s it!** Follow these steps for smooth contributions.
Welcome to the team! 🚀
