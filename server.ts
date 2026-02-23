import express from 'express';
import { createServer as createViteServer } from 'vite';
import pg from 'pg';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

console.log('--- SERVER_INITIALIZING ---');
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { Pool } = pg;

async function startServer() {
  const app = express();
  const port = 3000;

  app.use(cors());
  app.use(express.json());

  // PostgreSQL Connection
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL || 'postgres://postgres:f6vTwdfWoS0tvuXY9g5t7ZiZaKBBEqp2wz15muYcNKZEhni8ICzM9OGGY3N9nAPM@173.249.14.116:5432/postgres',
    ssl: false,
    connectionTimeoutMillis: 5000, // Don't hang forever
  });

  // Test DB Connection without crashing
  pool.connect((err, client, release) => {
    if (err) {
      console.error('CRITICAL_DATABASE_ERROR: Could not connect to PostgreSQL. Check your DATABASE_URL and network permissions.', err.stack);
    } else {
      console.log('DATABASE_CONNECTED: Successfully established connection to PostgreSQL node.');
      release();
    }
  });

  // API Routes
  app.get('/api/health', (req, res) => {
    res.status(200).json({ 
      status: 'active', 
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development'
    });
  });

  // Example API: Fetch Properties
  app.get('/api/properties', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM properties ORDER BY created_at DESC');
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // Example API: Add Property
  app.post('/api/properties', async (req, res) => {
    const { title, location, price, type, description, beds, baths, size, images } = req.body;
    try {
      const result = await pool.query(
        'INSERT INTO properties (title, location, price, type, description, beds, baths, size, images) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
        [title, location, price, type, description, beds, baths, size, images]
      );
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    try {
      console.log('--- INITIALIZING_VITE_MIDDLEWARE ---');
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: 'spa',
      });
      app.use(vite.middlewares);
      console.log('--- VITE_MIDDLEWARE_READY ---');
    } catch (viteError) {
      console.error('VITE_INITIALIZATION_ERROR:', viteError);
      // In case of Vite error, we still want the API to work
      app.get('/', (req, res) => res.send('Vite is initializing or failed. API is active.'));
    }
  } else {
    // Serve static files in production
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${port}`);
  });
}

startServer().catch((err) => {
  console.error('SERVER_START_ERROR:', err);
});
