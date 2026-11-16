import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

const publicDir = path.join(__dirname, 'public');

// Prevent browser and proxy caching so all updates are visible immediately
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  if (req.path.endsWith('.glb')) {
    res.setHeader('Content-Type', 'model/gltf-binary');
  } else if (req.path.endsWith('.gltf')) {
    res.setHeader('Content-Type', 'model/gltf+json');
  } else if (req.path.endsWith('.m4a')) {
    res.setHeader('Content-Type', 'audio/mp4');
  } else if (req.path.endsWith('.wasm')) {
    res.setHeader('Content-Type', 'application/wasm');
  }

  next();
});

// Serve static assets from public directory with no caching
app.use(express.static(publicDir, {
  etag: false,
  lastModified: false,
  setHeaders: (res) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
  }
}));

// Fallback to index.html for client-side routing
app.use((req, res) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
  res.sendFile(path.join(publicDir, 'index.html'), (err) => {
    if (err && !res.headersSent) {
      res.status(err.statusCode || 500).end();
    }
  });
});

app.use((err, req, res, _next) => {
  console.error('Server error:', err);
  if (!res.headersSent) {
    res.status(err.status || 500).json({ error: 'Internal Server Error' });
  }
});

const server = app.listen(PORT, HOST, () => {
  console.log(`Server listening on http://${HOST}:${PORT}`);
});

server.on('error', (err) => {
  console.error('HTTP server error:', err);
  process.exit(1);
});
