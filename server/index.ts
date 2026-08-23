import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createServer as createViteServer } from 'vite';
import react from '@vitejs/plugin-react';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = parseInt(process.env.PORT || '5000', 10);

  // Middleware
  app.use(express.json());

  // Development: Use Vite middleware without React plugin
  if (process.env.NODE_ENV === 'development') {
    try {
      const vite = await createViteServer({
        server: { 
          middlewareMode: true,
          allowedHosts: true,
        },
        appType: 'spa',
        root: join(__dirname, '../client'),
        resolve: {
          alias: {
            '@': join(__dirname, '../client/src'),
            '@shared': join(__dirname, '../shared'),
            '@assets': join(__dirname, '../attached_assets'),
          },
        },
        esbuild: {
          jsx: 'automatic',
          jsxImportSource: 'react'
        },
        define: {
          'process.env.NODE_ENV': '"development"'
        }
      });
      
      app.use(vite.middlewares);
      console.log('Vite server active with esbuild JSX transform');
    } catch (error) {
      console.error('Vite setup failed:', error);
      // Fallback to static
      app.use(express.static(join(__dirname, '../client')));
      app.get('*', (req, res) => {
        if (!req.path.startsWith('/api')) {
          res.sendFile(join(__dirname, '../client/index.html'));
        }
      });
    }
  } else {
    // Production: Static file serving
    app.use(express.static(join(__dirname, '../dist/public')));
    app.get('*', (req, res) => {
      if (!req.path.startsWith('/api')) {
        res.sendFile(join(__dirname, '../dist/public/index.html'));
      }
    });
  }

  // API routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
  });

  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
  
  server.on('error', (error) => {
    console.error('Server error:', error);
  });
}

startServer().catch(console.error);