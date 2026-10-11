import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const HOST = '0.0.0.0';

const publicDir = path.join(__dirname, 'public');

// Custom MIME types and caching headers
app.use((req, res, next) => {
  if (req.path.endsWith('.glb')) {
    res.setHeader('Content-Type', 'model/gltf-binary');
  } else if (req.path.endsWith('.gltf')) {
    res.setHeader('Content-Type', 'model/gltf+json');
  } else if (req.path.endsWith('.m4a')) {
    res.setHeader('Content-Type', 'audio/mp4');
  }

  if (req.path.startsWith('/assets/')) {
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  }

  next();
});

// Serve static assets from public directory
app.use(express.static(publicDir));

// Fallback to index.html for client-side routing
app.use((req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`Server listening on http://${HOST}:${PORT}`);
});
