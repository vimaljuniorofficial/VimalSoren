# Vimal Soren — Creative 3D Portfolio

[!\[Node.js](https://img.shields.io/badge/Node.js-22.x-green.svg)](https://nodejs.org/)
[!\[Three.js](https://img.shields.io/badge/Three.js-WebGL-black.svg)](https://threejs.org/)
[!\[Vercel Status](https://img.shields.io/badge/Deploy-Vercel-000000.svg)](https://vercel.com/)

An interactive 3D WebGL portfolio built with Three.js, React, and GLTF models. Explore virtual environments across France, Belgium, and Luxembourg on an animated motorcycle journey.

\---

## ✨ Features

* **Immersive 3D Environments**: Custom GLTF models representing cities and monuments (Eiffel Tower, Big Wheel, bridges, buildings).
* **Interactive Controls \& Camera**: Smooth camera transitions, momentum-based scrolling, and mouse-parallax effects.
* **Ambient Soundscapes**: Spatial audio and sound effects for transitions, clicks, and background ambiance.
* **Responsive \& Optimized Textures**: Automatic loading of desktop vs. mobile-optimized textures and HDR skies for optimal performance across devices.
* **Vercel Ready**: Pre-configured with SPA rewrites, MIME type handling for 3D binary and audio assets, and production caching rules.

\---

## 🛠 Tech Stack

* **Graphics \& 3D**: Three.js, WebGL, GLTF 2.0, HDR environment maps
* **Frontend**: HTML5, CSS3, ES Modules, Momentum.js
* **Server / Local Runtime**: Node.js 22, Express
* **Deployment Platform**: Vercel (`vercel.json`)

\---

## 🚀 Getting Started

### Prerequisites

* [Node.js](https://nodejs.org/) (version 18 or higher; Node 22 recommended)
* [npm](https://www.npmjs.com/) (bundled with Node.js)

### Installation \& Local Run

1. Clone or download the repository:

```bash
   git clone https://github.com/vimaljuniorofficial/VimalSoren.git
   cd VimalSoren
   ```

2. Install dependencies:

```bash
   npm install
   ```

3. Start the local development server:

```bash
   npm run dev
   ```

4. Open your browser and navigate to:

```
   http://localhost:3000
   ```

\---

## 🌐 Deploying to Vercel

This project is pre-configured for one-click deployment on [Vercel](https://vercel.com/). It includes `vercel.json` to handle single-page routing, binary 3D model MIME types (`.glb`), audio MIME types (`.m4a`), and optimized caching out of the box.

### Option 1: Continuous Deployment via Git (Recommended)

1. Push this repository to your GitHub account (or GitLab / Bitbucket).
2. Go to [vercel.com/new](https://vercel.com/new) and import your repository.
3. Vercel automatically reads `vercel.json` with the following configuration:

   * **Framework Preset**: `Other` (`framework: null`)
   * **Build command**: `npm run build`
   * **Output directory**: `public`
4. Click **Deploy**. Every future git push will automatically trigger a new deployment.

\---

### Option 2: Vercel CLI

1. Install the Vercel CLI globally (or run via `npx`):

```bash
   npm install -g vercel
   ```

2. Log in to your Vercel account:

```bash
   vercel login
   ```

3. Deploy directly to production:

```bash
   vercel --prod
   ```

\---

## 📁 Project Structure

```text
├── metadata.json          # Application metadata \& description
├── vercel.json            # Vercel build configuration, SPA rewrites, \& MIME headers
├── package.json           # Project manifest and scripts
├── server.js              # Express static server for local runtime \& previews
├── public/                # Web root containing all frontend assets
│   ├── index.html         # Main entry point \& preloader
│   ├── assets/            # Bundled JavaScript modules \& CSS styles
│   ├── gltf/              # 3D GLTF models (countries, monuments, props)
│   ├── hdri/              # High-dynamic-range panoramic sky environments
│   ├── image/             # UI images, thumbnails, and icons
│   ├── sounds/            # Audio effects and soundtrack
│   ├── texture/           # Materials and normal maps (desktop \& mobile)
│   └── vendors/           # External libraries (Momentum.js)
```

\---

## ⚙️ Vercel Configuration Details

* **`vercel.json`**:

  * Sets `"framework": null`, `"buildCommand": "npm run build"`, and `"outputDirectory": "public"`
  * Configures SPA rewrites to `/index.html` while keeping real `404` responses for missing static assets (`/assets/\*`, `/gltf/\*`, `/texture/\*`, `/hdri/\*`, `/sounds/\*`, `/fonts/\*`, `/image/\*`, `/vendors/\*`)
  * Configures `Content-Type: model/gltf-binary` and CORS for `/gltf/\*.glb`, plus `Content-Type: audio/mp4` for `/sounds/\*.m4a`
  * Sets 1-year immutable caching for media/font assets and revalidated caching for `/assets/\*`, `/vendors/\*`, and `/index.html`

\---

## 👤 Author

**Vimal Junior**

* Frontend Developer \& Creative Designer
* GitHub: [@vimal](https://github.com/vimalsoren)juniorofficial

\---

## 📄 License

This project is open-source and available under standard open licensing terms.

