import express from 'express';
import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

const publicDir = path.join(__dirname, 'public');

const MIME_TYPES = {
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.json': 'application/json; charset=utf-8',
  '.glb': 'model/gltf-binary',
  '.gltf': 'model/gltf+json',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8'
};

const IMMUTABLE_PREFIXES = [
  '/gltf/', '/texture/', '/hdri/', '/sounds/', '/fonts/', '/image/', '/vendors/'
];

const STATIC_PREFIXES = [
  '/assets/', ...IMMUTABLE_PREFIXES
];

function getCacheControl(reqPath) {
  if (reqPath === '/' || reqPath === '/index.html') {
    return 'no-cache, must-revalidate';
  }
  if (reqPath.startsWith('/assets/')) {
    return 'public, max-age=0, must-revalidate';
  }
  if (
    IMMUTABLE_PREFIXES.some(p => reqPath.startsWith(p)) ||
    /\.(png|ico|webp|jpg|woff2|mp3|m4a|glb|gltf)$/i.test(reqPath)
  ) {
    return 'public, max-age=86400, stale-while-revalidate=604800';
  }
  return 'public, max-age=0, must-revalidate';
}

// Redirect any legacy Sebastien module requests to Vimal-DjQbSfGn.js
app.get('/assets/Sebastien-DjQbSfGn.js', (req, res) => {
  res.redirect(301, '/assets/Vimal-DjQbSfGn.js');
});

// Stream gzipped responses for compressible static files (JS, CSS, HTML, GLB, SVG, JSON)
app.use((req, res, next) => {
  if (req.method !== 'GET' || req.headers.range) return next();

  const acceptEncoding = req.headers['accept-encoding'] || '';
  if (!/\bgzip\b/i.test(acceptEncoding)) return next();

  const reqPath = req.path === '/' ? '/index.html' : req.path;
  const ext = path.extname(reqPath).toLowerCase();
  const contentType = MIME_TYPES[ext];
  if (!contentType) return next();

  const safePath = path.normalize(reqPath).replace(/^(\.\.(\/|\\|$))+/, '');
  const filePath = path.join(publicDir, safePath);
  if (!filePath.startsWith(publicDir)) return next();

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) return next();

    const etag = `W/"${stats.size.toString(16)}-${Math.floor(stats.mtimeMs).toString(16)}-gz"`;
    res.setHeader('Vary', 'Accept-Encoding');
    res.setHeader('Cache-Control', getCacheControl(req.path));
    res.setHeader('ETag', etag);
    res.setHeader('Last-Modified', stats.mtime.toUTCString());

    if (req.headers['if-none-match'] === etag) {
      return res.status(304).end();
    }

    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Encoding', 'gzip');

    const readStream = fs.createReadStream(filePath);
    const gzipStream = zlib.createGzip({ level: zlib.constants.Z_BEST_SPEED });

    readStream.on('error', () => {
      if (!res.headersSent) res.status(500).end();
      else res.destroy();
    });
    gzipStream.on('error', () => {
      if (!res.headersSent) res.status(500).end();
      else res.destroy();
    });
    res.on('close', () => {
      readStream.destroy();
      gzipStream.destroy();
    });

    readStream.pipe(gzipStream).pipe(res);
  });
});

// Proper MIME types and Chrome-friendly Cache-Control headers for non-gzipped assets
app.use((req, res, next) => {
  if (req.path.endsWith('.glb')) {
    res.setHeader('Content-Type', 'model/gltf-binary');
  } else if (req.path.endsWith('.gltf')) {
    res.setHeader('Content-Type', 'model/gltf+json');
  } else if (req.path.endsWith('.m4a')) {
    res.setHeader('Content-Type', 'audio/mp4');
  }
  res.setHeader('Cache-Control', getCacheControl(req.path));
  next();
});

app.use(express.static(publicDir, {
  etag: true,
  lastModified: true
}));

// Return 404 for missing static assets instead of returning index.html
app.use((req, res) => {
  const isStaticAsset =
    STATIC_PREFIXES.some(p => req.path.startsWith(p)) ||
    path.extname(req.path) !== '';

  if (isStaticAsset) {
    return res.status(404).send('Not found');
  }

  res.setHeader('Cache-Control', 'no-cache, must-revalidate');
  const indexPath = path.join(publicDir, 'index.html');
  if (fs.existsSync(indexPath)) {
    return res.sendFile(indexPath);
  }
  return res.status(404).send('Not found');
});

app.listen(PORT, HOST, () => {
  console.log(`Server listening on http://${HOST}:${PORT}`);
});

