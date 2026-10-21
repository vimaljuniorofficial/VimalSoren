# Vimal Soren — Professional CV & Resume Portfolio

[![Vercel Deployment Ready](https://img.shields.io/badge/Vercel-Deployment%20Ready-black?style=for-the-badge&logo=vercel)](https://vercel.com)
[![React 19](https://img.shields.io/badge/React-19.0.1-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-7.0.2-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-8.3.0-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.3.3-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)

A modern, high-performance, mobile-responsive portfolio and digital curriculum vitae for **Vimal Soren** (NCVT ITI Fitter & ADCA Certified Professional from Dumka, Jharkhand).

This project is pre-configured for **1-click zero-configuration deployment to Vercel**, with full single-page application (SPA) routing, edge CDN caching headers, and a dedicated print stylesheet for generating clean physical or PDF resumes.

---

## 📌 Table of Contents

1. [Features](#-features)
2. [Candidate Profile Summary](#-candidate-profile-summary)
3. [Deploying to Vercel](#-deploying-to-vercel)
   - [Method 1: GitHub & Vercel Dashboard (Recommended)](#method-1-github--vercel-dashboard-recommended)
   - [Method 2: Vercel CLI (Instant from Terminal)](#method-2-vercel-cli-instant-from-terminal)
4. [Project Structure](#-project-structure)
5. [Configuration Files](#-configuration-files)
   - [`vercel.json`](#verceljson)
   - [`metadata.json`](#metadatajson)
6. [Local Development](#-local-development)
7. [Print & PDF Export](#-print--pdf-export)
8. [License & Attribution](#-license--attribution)

---

## ✨ Features

- **Dark & Light Theme**: Seamless theme toggler with persistent browser memory (`localStorage`) and system preference fallback.
- **Vercel Pre-Configured**: `vercel.json` already contains framework definitions, output paths, clean URLs, and rewrite rules.
- **Interactive Vercel Deployment Modal**: Built-in modal with 1-click clipboard copy for all git commands and JSON files.
- **Print-Optimized Resume (`window.print()`)**: Dedicated `@media print` CSS rules that render an elegant, distraction-free 1-page/2-page physical CV when printing or saving as PDF.
- **Custom PDF Loader**: Test custom PDF resumes via drag-and-drop or file picker right in the browser.
- **Quick Contact Integration**:
  - Direct WhatsApp chat link (`+91 76676 01659`)
  - 1-click clipboard copy for phone and email
  - Interactive Google Maps location anchor for Chanddih, Dumka, Jharkhand
- **Responsive Mobile Navigation**: Touch-friendly navigation drawer with smooth scrollspy.

---

## 👤 Candidate Profile Summary

| Parameter | Details |
|---|---|
| **Full Name** | Vimal Soren |
| **Trade Certification** | ITI Fitter (NCVT) — **First Division (84.15% Distinction)**, Gandhiyan ITI, Dumka (2019) |
| **Computer Qualifications** | ADCA (Advanced Diploma in Computer Applications) — 12 Months Course |
| **Intermediate (+2)** | JAC Board — Second Division (53%), +2 National High School, Dumka (2017) |
| **High School** | JAC Board — First Division (71%), St. Mary's High School, Bakshi Bandh, Dumka (2015) |
| **Father's Name** | Gabriel Soren |
| **Date of Birth** | 06 December 1999 |
| **Location** | Chanddih, Dumka, Jharkhand - 814101 |
| **Contact Email** | `vimalsorenofficial@gmail.com` |
| **Contact Phone** | `+91 76676 01659` |

---

## 🚀 Deploying to Vercel

### Method 1: GitHub & Vercel Dashboard (Recommended)

1. **Initialize Git & Push to your GitHub repository:**
   ```bash
   git init
   git add .
   git commit -m "feat: Vimal Soren CV website ready for Vercel"
   git branch -M main
   git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/<YOUR_REPO_NAME>.git
   git push -u origin main
   ```

2. **Import into Vercel:**
   - Log into [vercel.com](https://vercel.com).
   - Click **"Add New..."** &rarr; **"Project"**.
   - Select your GitHub repository.
   - Vercel automatically detects the pre-configured parameters:
     - **Framework Preset**: `Vite`
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`
     - **Install Command**: `npm install`
   - Click **"Deploy"**.

Your website will be live in ~45 seconds on `https://<your-project>.vercel.app` with free global CDN and SSL certificate.

---

### Method 2: Vercel CLI (Instant from Terminal)

1. Run the official Vercel CLI from your project directory:
   ```bash
   npx vercel
   ```
2. Accept the prompts:
   - *Set up and deploy?* **`y`**
   - *Which scope?* Choose your Vercel account
   - *Link to existing project?* **`N`**
   - *Project name?* Press enter to keep default or enter `vimal-soren-cv`
   - *In which directory is your code located?* `./`
   - *Want to modify settings?* **`N`** (Settings are read automatically from `vercel.json`)

3. To deploy directly to production:
   ```bash
   npx vercel --prod
   ```

---

## 📁 Project Structure

```text
├── index.html              # HTML entry point with SEO, OG tags, and Google Fonts
├── metadata.json           # Application title, description, and AI Studio capabilities
├── package.json            # Node.js dependencies and build scripts
├── README.md               # Complete documentation and deployment guide
├── vercel.json             # Vercel deployment and routing rules
```

---

## ⚙️ Configuration Files

### `vercel.json`
Ensures that all client-side routes fallback to `index.html` and static assets benefit from 1-year immutable caching on Vercel's Edge Network:
```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "cleanUrls": true,
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### `metadata.json`
Synchronized with `index.html` for consistent metadata and preview generation:
```json
{
  "name": "Vimal Soren — CV & Resume (Vercel Ready)",
  "description": "Official CV & Resume website of Vimal Soren — NCVT ITI Fitter & ADCA Certified Professional from Dumka, Jharkhand. Includes 1-click Vercel deployment configuration.",
  "requestFramePermissions": [],
  "majorCapabilities": ["MAJOR_CAPABILITY_SERVER_SIDE_GEMINI_API"]
}
```

---

## 💻 Local Development

Make sure you have [Node.js](https://nodejs.org) (v18 or newer) installed.

```bash
# 1. Install dependencies
npm install

# 2. Run local development server (starts on http://localhost:3000)
npm run dev

# 3. Type check and lint
npm run lint

# 4. Create production build (generates files in /dist)
npm run build

# 5. Preview production build locally
npm run preview
```

---

## 🖨️ Print & PDF Export

Clicking the **"Print / Save as PDF"** button on the website triggers standard browser printing (`window.print()`). The application includes custom CSS that automatically:
- Hides the navigation bar, buttons, toast popups, and footer.
- Formats the educational records, skills, and profile into a formal, monochrome-ready A4 document.
- In your browser's print dialog, choose **"Destination: Save as PDF"** to produce an official CV document without any third-party software.

---

## 📄 License & Attribution

- Built for **Vimal Soren**.
- Copyright &copy; 2026 Vimal Soren. All Rights Reserved.
