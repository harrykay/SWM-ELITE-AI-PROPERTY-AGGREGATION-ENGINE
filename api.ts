import express from 'express';
import pg from 'pg';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const { Pool } = pg;
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

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

      CREATE TABLE IF NOT EXISTS pages (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        content TEXT,
        status TEXT DEFAULT 'draft',
        layout TEXT DEFAULT 'default',
        meta_description TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        content TEXT,
        excerpt TEXT,
        type TEXT DEFAULT 'blog',
        status TEXT DEFAULT 'draft',
        author_id INTEGER,
        category_id INTEGER,
        featured_image TEXT,
        tags TEXT[] DEFAULT '{}',
        published_at TIMESTAMP WITH TIME ZONE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        type TEXT DEFAULT 'blog'
      );

      CREATE TABLE IF NOT EXISTS media (
        id SERIAL PRIMARY KEY,
        filename TEXT NOT NULL,
        url TEXT NOT NULL,
        mime_type TEXT,
        size INTEGER,
        alt_text TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS menus (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        location TEXT UNIQUE NOT NULL
      );

      CREATE TABLE IF NOT EXISTS menu_items (
        id SERIAL PRIMARY KEY,
        menu_id INTEGER REFERENCES menus(id) ON DELETE CASCADE,
        parent_id INTEGER,
        title TEXT NOT NULL,
        url TEXT NOT NULL,
        order_index INTEGER DEFAULT 0
      );

      CREATE TABLE IF NOT EXISTS cms_settings (
        key TEXT PRIMARY KEY,
        value JSONB NOT NULL
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

// CMS Settings
app.get('/api/cms/settings', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM cms_settings');
    const settings = result.rows.reduce((acc, row) => ({ ...acc, [row.key]: row.value }), {});
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/cms/settings', async (req, res) => {
  const settings = req.body;
  try {
    for (const [key, value] of Object.entries(settings)) {
      await pool.query(
        'INSERT INTO cms_settings (key, value) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET value = $2',
        [key, JSON.stringify(value)]
      );
    }
    res.json({ status: 'ok' });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Pages
app.get('/api/cms/pages', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM pages ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/cms/pages', async (req, res) => {
  const { title, slug, content, status, layout, meta_description } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO pages (title, slug, content, status, layout, meta_description) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [title, slug, content, status, layout, meta_description]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Posts
app.get('/api/cms/posts', async (req, res) => {
  const { type = 'blog' } = req.query;
  try {
    const result = await pool.query('SELECT * FROM posts WHERE type = $1 ORDER BY created_at DESC', [type]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/cms/posts', async (req, res) => {
  const { title, slug, content, excerpt, type, status, featured_image, tags, published_at } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO posts (title, slug, content, excerpt, type, status, featured_image, tags, published_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [title, slug, content, excerpt, type, status, featured_image, tags, published_at]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Media
app.get('/api/cms/media', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM media ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/cms/media', async (req, res) => {
  const { filename, url, mime_type, size, alt_text } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO media (filename, url, mime_type, size, alt_text) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [filename, url, mime_type, size, alt_text]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Menus
app.get('/api/cms/menus', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM menus');
    const menus = await Promise.all(result.rows.map(async (menu) => {
      const items = await pool.query('SELECT * FROM menu_items WHERE menu_id = $1 ORDER BY order_index ASC', [menu.id]);
      return { ...menu, items: items.rows };
    }));
    res.json(menus);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/properties/latest', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM properties ORDER BY created_at DESC LIMIT 6');
    const properties = result.rows;

    // Enhance with AI summaries
    const enhancedProperties = await Promise.all(properties.map(async (prop) => {
      try {
        const response = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: `Summarize this real estate property in Uganda in exactly one engaging sentence (max 15 words): ${prop.description}`,
          config: { temperature: 0.7 }
        });
        return { ...prop, aiSummary: response.text?.trim() || prop.description.substring(0, 100) + '...' };
      } catch (err) {
        return { ...prop, aiSummary: prop.description.substring(0, 100) + '...' };
      }
    }));

    res.json(enhancedProperties);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/properties', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM properties ORDER BY created_at DESC');
    const properties = result.rows;

    // Enhance with AI summaries
    const enhancedProperties = await Promise.all(properties.map(async (prop) => {
      try {
        // Only generate if not already present or as a fallback
        const response = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: `Summarize this real estate property in Uganda in exactly one engaging sentence (max 15 words): ${prop.description}`,
          config: { temperature: 0.7 }
        });
        return { ...prop, aiSummary: response.text?.trim() || prop.description.substring(0, 100) + '...' };
      } catch (err) {
        return { ...prop, aiSummary: prop.description.substring(0, 100) + '...' };
      }
    }));

    res.json(enhancedProperties);
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
