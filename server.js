import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);
const HOST = '0.0.0.0';

const publicDir = path.join(__dirname, 'public');

// Custom MIME type definitions
express.static.mime.define({
  'model/gltf-binary': ['glb'],
  'font/woff2': ['woff2'],
  'audio/mp4': ['m4a'],
  'audio/mpeg': ['mp3'],
  'image/png': ['png'],
  'image/jpeg': ['jpg', 'jpeg'],
  'image/webp': ['webp'],
  'image/svg+xml': ['svg'],
  'text/css': ['css'],
  'application/javascript': ['js']
});

// Serve static assets with CORS and appropriate headers
app.use(express.static(publicDir, {
  extensions: ['html', 'htm'],
  setHeaders: (res, filePath) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    if (filePath.endsWith('.glb')) {
      res.setHeader('Content-Type', 'model/gltf-binary');
    } else if (filePath.endsWith('.woff2')) {
      res.setHeader('Content-Type', 'font/woff2');
    } else if (filePath.endsWith('.m4a')) {
      res.setHeader('Content-Type', 'audio/mp4');
    } else if (filePath.endsWith('.webp')) {
      res.setHeader('Content-Type', 'image/webp');
    } else if (filePath.endsWith('.svg')) {
      res.setHeader('Content-Type', 'image/svg+xml');
    }
  }
}));

// Fallback to index.html for SPA client-side routes (return 404 for missing static asset files)
app.get('*', (req, res) => {
  const ext = path.extname(req.path);
  if (ext && ext !== '.html' && ext !== '.htm') {
    return res.status(404).type('text/plain').send('Not found');
  }
  res.sendFile(path.join(publicDir, 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`Portfolio server running at http://${HOST}:${PORT}`);
});
