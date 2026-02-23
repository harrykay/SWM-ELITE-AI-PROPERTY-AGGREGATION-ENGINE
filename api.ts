import express from 'express';
import pg from 'pg';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const app = express();
app.use(cors());
app.use(express.json());

// PostgreSQL Connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://postgres:f6vTwdfWoS0tvuXY9g5t7ZiZaKBBEqp2wz15muYcNKZEhni8ICzM9OGGY3N9nAPM@173.249.14.116:5432/postgres',
  ssl: false,
  connectionTimeoutMillis: 5000,
});

// Initialize Database
const initDb = async () => {
  console.log('--- DATABASE_INIT_START ---');
  try {
    // Create table if not exists
    await pool.query(`
      CREATE TABLE IF NOT EXISTS properties (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        location TEXT NOT NULL,
        price NUMERIC NOT NULL,
        type TEXT NOT NULL,
        description TEXT,
        beds INTEGER DEFAULT 0,
        baths INTEGER DEFAULT 0,
        size INTEGER DEFAULT 0,
        images TEXT[] DEFAULT '{}',
        status TEXT DEFAULT 'available',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Run Migrations (Add missing columns to existing table)
    const migrations = [
      "ALTER TABLE properties ADD COLUMN IF NOT EXISTS host JSONB DEFAULT '{}'",
      "ALTER TABLE properties ADD COLUMN IF NOT EXISTS address JSONB DEFAULT '{}'",
      "ALTER TABLE properties ADD COLUMN IF NOT EXISTS features JSONB DEFAULT '{}'",
      "ALTER TABLE properties ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false",
      "ALTER TABLE properties ADD COLUMN IF NOT EXISTS rating NUMERIC DEFAULT 0",
      "ALTER TABLE properties ADD COLUMN IF NOT EXISTS reviews_count INTEGER DEFAULT 0",
      "ALTER TABLE properties ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'available'"
    ];

    for (const sql of migrations) {
      await pool.query(sql);
    }

    console.log('--- DATABASE_TABLES_VERIFIED ---');
  } catch (err) {
    console.error('--- DATABASE_INIT_ERROR ---', err);
  }
};
initDb();

// API Routes
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'active', 
    timestamp: new Date().toISOString(),
    database: 'PostgreSQL'
  });
});

app.get('/api/properties', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM properties ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

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

export default app;
