import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import leadsHandler from './api/leads.js';
import adminLeadsHandler from './api/admin/leads.js';
import adminLeadItemHandler from './api/admin/leads/[id].js';

function vercelApiDevPlugin() {
  return {
    name: 'vercel-api-dev-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const urlObj = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
        const pathname = urlObj.pathname;

        if (!pathname.startsWith('/api/')) {
          return next();
        }

        // Add Express-like response helpers for compatibility with Vercel handlers
        res.status = function (code) {
          res.statusCode = code;
          return res;
        };
        res.json = function (data) {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(data));
          return res;
        };

        // Parse query params into req.query
        req.query = Object.fromEntries(urlObj.searchParams.entries());

        // Parse body for POST/PATCH
        let bodyBuffer = '';
        if (req.method === 'POST' || req.method === 'PATCH' || req.method === 'PUT') {
          await new Promise((resolve) => {
            req.on('data', (chunk) => {
              bodyBuffer += chunk;
            });
            req.on('end', () => {
              try {
                req.body = bodyBuffer ? JSON.parse(bodyBuffer) : {};
              } catch {
                req.body = {};
              }
              resolve();
            });
          });
        }

        try {
          if (pathname === '/api/leads') {
            await leadsHandler(req, res);
            return;
          }

          if (pathname === '/api/admin/leads') {
            await adminLeadsHandler(req, res);
            return;
          }

          const matchLeadId = pathname.match(/^\/api\/admin\/leads\/([^/]+)$/);
          if (matchLeadId) {
            req.query.id = matchLeadId[1];
            await adminLeadItemHandler(req, res);
            return;
          }

          res.status(404).json({ error: 'API route not found' });
        } catch (err) {
          console.error('Dev API Error:', err);
          res.status(500).json({ error: 'Internal Server Error in Dev API plugin' });
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), vercelApiDevPlugin()],
});
