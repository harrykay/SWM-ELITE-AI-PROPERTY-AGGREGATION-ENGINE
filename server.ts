import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import apiApp from './api.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const port = 3000;

  // Use the shared API logic
  app.use(apiApp);

  // Serve static files in production
  app.use(express.static(path.join(__dirname, 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });

  app.listen(port, '0.0.0.0', () => {
    console.log(`Production server running at http://0.0.0.0:${port}`);
  });
}

startServer().catch((err) => {
  console.error('SERVER_START_ERROR:', err);
});
