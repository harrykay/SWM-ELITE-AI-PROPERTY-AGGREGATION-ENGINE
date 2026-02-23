import express from 'express';
import { createServer as createViteServer } from 'vite';
import pg from 'pg';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

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
    ssl: false // Set to true if your DB requires SSL
  });

  // Test DB Connection
  pool.query('SELECT NOW()', (err, res) => {
    if (err) {
      console.error('DATABASE_CONNECTION_ERROR:', err);
    } else {
      console.log('DATABASE_CONNECTED_SUCCESSFULLY:', res.rows[0]);
    }
  });

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', database: 'connected' });
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
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
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
