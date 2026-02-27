import express from 'express';
import pg from 'pg';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI } from "@google/genai";
import bcrypt from 'bcrypt';
import session from 'express-session';

dotenv.config();

const { Pool } = pg;
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

const app = express();
console.log('--- API_APP_INITIALIZING ---');
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const requireRole = (role: string | string[]) => (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  const roles = Array.isArray(role) ? role : [role];
  if (!roles.includes(req.session.role!)) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  next();
};

app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.NODE_ENV === 'production' }
}));

declare module 'express-session' {
  interface SessionData {
    userId: number;
    role: string;
  }
}

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
        status TEXT DEFAULT 'draft', -- draft, published, scheduled, archived
        layout TEXT DEFAULT 'default',
        meta_title TEXT,
        meta_description TEXT,
        meta_keywords TEXT,
        featured_image TEXT,
        scheduled_at TIMESTAMP WITH TIME ZONE,
        deleted_at TIMESTAMP WITH TIME ZONE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        content TEXT,
        excerpt TEXT,
        type TEXT DEFAULT 'blog', -- blog, service, testimonial, team, faq, etc.
        status TEXT DEFAULT 'draft', -- draft, published, scheduled, archived
        author_id INTEGER,
        category_id INTEGER,
        featured_image TEXT,
        tags TEXT[] DEFAULT '{}',
        is_featured BOOLEAN DEFAULT false,
        meta_title TEXT,
        meta_description TEXT,
        scheduled_at TIMESTAMP WITH TIME ZONE,
        published_at TIMESTAMP WITH TIME ZONE,
        deleted_at TIMESTAMP WITH TIME ZONE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        type TEXT DEFAULT 'blog',
        description TEXT,
        parent_id INTEGER
      );

      CREATE TABLE IF NOT EXISTS media (
        id SERIAL PRIMARY KEY,
        filename TEXT NOT NULL,
        url TEXT NOT NULL,
        mime_type TEXT,
        size INTEGER,
        alt_text TEXT,
        folder TEXT DEFAULT 'root',
        tags TEXT[] DEFAULT '{}',
        deleted_at TIMESTAMP WITH TIME ZONE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS menus (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        location TEXT UNIQUE NOT NULL, -- header, footer, sidebar
        deleted_at TIMESTAMP WITH TIME ZONE
      );

      CREATE TABLE IF NOT EXISTS menu_items (
        id SERIAL PRIMARY KEY,
        menu_id INTEGER REFERENCES menus(id) ON DELETE CASCADE,
        parent_id INTEGER,
        title TEXT NOT NULL,
        url TEXT NOT NULL,
        order_index INTEGER DEFAULT 0,
        target TEXT DEFAULT '_self'
      );

      CREATE TABLE IF NOT EXISTS cms_settings (
        key TEXT PRIMARY KEY,
        value JSONB NOT NULL
      );

      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        location TEXT NOT NULL,
        status TEXT NOT NULL,
        image TEXT NOT NULL,
        gallery TEXT[] DEFAULT '{}',
        category TEXT NOT NULL,
        client TEXT,
        surface_area TEXT,
        value TEXT,
        architect TEXT,
        timeline TEXT,
        description TEXT,
        requirements TEXT[],
        project_manager TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      -- Add project_manager to projects if it doesn't exist
      DO $$ 
      BEGIN 
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='projects' AND column_name='project_manager') THEN
          ALTER TABLE projects ADD COLUMN project_manager TEXT;
        END IF;
      END $$;

      CREATE TABLE IF NOT EXISTS blogs (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        excerpt TEXT NOT NULL,
        content TEXT NOT NULL,
        image TEXT NOT NULL,
        author TEXT NOT NULL,
        tags TEXT[] DEFAULT '{}',
        published_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS property_reviews (
        id SERIAL PRIMARY KEY,
        property_id INTEGER NOT NULL,
        user_name TEXT NOT NULL,
        rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
        comment TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'viewer',
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
      "ALTER TABLE properties ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'available'",
      "ALTER TABLE properties ADD COLUMN IF NOT EXISTS ai_summary TEXT"
    ];

    for (const sql of migrations) {
      await pool.query(sql);
    }

    // Seed default admin user if not exists
    const adminEmail = 'admin@smw.co.ug';
    const adminCheck = await pool.query('SELECT id FROM users WHERE email = $1', [adminEmail]);

    if (adminCheck.rowCount === 0) {
      console.log('--- SEEDING_DEFAULT_ADMIN ---');
      const adminPassword = 'password123';
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      await pool.query(
        'INSERT INTO users (email, password, role) VALUES ($1, $2, $3)',
        [adminEmail, hashedPassword, 'admin']
      );
      console.log('--- DEFAULT_ADMIN_SEEDED ---');
    }

    // Generate AI summaries for existing properties that don't have one
    const propertiesWithoutSummary = await pool.query('SELECT id, description FROM properties WHERE ai_summary IS NULL');
    for (const prop of propertiesWithoutSummary.rows) {
      try {
        const response = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: `Summarize this real estate property in Uganda in exactly one engaging sentence (max 15 words): ${prop.description}`,
          config: { temperature: 0.7 }
        });
        const summary = response.text?.trim() || prop.description.substring(0, 100) + '...';
        await pool.query('UPDATE properties SET ai_summary = $1 WHERE id = $2', [summary, prop.id]);
      } catch (err) {
        console.error(`Failed to generate summary for property ${prop.id}`, err);
      }
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

app.post('/api/cms/settings', requireRole(['admin', 'manager']), async (req, res) => {
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
    const result = await pool.query('SELECT * FROM pages WHERE deleted_at IS NULL ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/cms/pages', requireRole(['admin', 'manager']), async (req, res) => {
  const { title, slug, content, status, layout, meta_title, meta_description, meta_keywords, featured_image, scheduled_at } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO pages (title, slug, content, status, layout, meta_title, meta_description, meta_keywords, featured_image, scheduled_at) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
      [title, slug, content, status || 'draft', layout || 'default', meta_title, meta_description, meta_keywords, featured_image, scheduled_at]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/api/cms/pages/:id', requireRole(['admin', 'manager']), async (req, res) => {
  const { id } = req.params;
  const { title, slug, content, status, layout, meta_title, meta_description, meta_keywords, featured_image, scheduled_at } = req.body;
  try {
    const result = await pool.query(
      `UPDATE pages SET title = $1, slug = $2, content = $3, status = $4, layout = $5, meta_title = $6, meta_description = $7, meta_keywords = $8, featured_image = $9, scheduled_at = $10, updated_at = CURRENT_TIMESTAMP 
       WHERE id = $11 RETURNING *`,
      [title, slug, content, status, layout, meta_title, meta_description, meta_keywords, featured_image, scheduled_at, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/api/cms/pages/:id', requireRole(['admin', 'manager']), async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('UPDATE pages SET deleted_at = CURRENT_TIMESTAMP WHERE id = $1', [id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Posts & Custom Post Types
app.get('/api/cms/posts', async (req, res) => {
  const { type = 'blog', status } = req.query;
  try {
    let query = 'SELECT * FROM posts WHERE type = $1 AND deleted_at IS NULL';
    const params = [type];
    
    if (status) {
      query += ' AND status = $2';
      params.push(status);
    }
    
    query += ' ORDER BY created_at DESC';
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/cms/posts', requireRole(['admin', 'manager']), async (req, res) => {
  const { title, slug, content, excerpt, type, status, featured_image, tags, is_featured, meta_title, meta_description, scheduled_at, published_at } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO posts (title, slug, content, excerpt, type, status, featured_image, tags, is_featured, meta_title, meta_description, scheduled_at, published_at) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *`,
      [title, slug, content, excerpt, type || 'blog', status || 'draft', featured_image, tags || '{}', is_featured || false, meta_title, meta_description, scheduled_at, published_at]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/api/cms/posts/:id', requireRole(['admin', 'manager']), async (req, res) => {
  const { id } = req.params;
  const { title, slug, content, excerpt, type, status, featured_image, tags, is_featured, meta_title, meta_description, scheduled_at, published_at } = req.body;
  try {
    const result = await pool.query(
      `UPDATE posts SET title = $1, slug = $2, content = $3, excerpt = $4, type = $5, status = $6, featured_image = $7, tags = $8, is_featured = $9, meta_title = $10, meta_description = $11, scheduled_at = $12, published_at = $13, updated_at = CURRENT_TIMESTAMP 
       WHERE id = $14 RETURNING *`,
      [title, slug, content, excerpt, type, status, featured_image, tags, is_featured, meta_title, meta_description, scheduled_at, published_at, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/api/cms/posts/:id', requireRole(['admin', 'manager']), async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('UPDATE posts SET deleted_at = CURRENT_TIMESTAMP WHERE id = $1', [id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Categories
app.get('/api/cms/categories', async (req, res) => {
  const { type = 'blog' } = req.query;
  try {
    const result = await pool.query('SELECT * FROM categories WHERE type = $1 ORDER BY name ASC', [type]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/cms/categories', requireRole(['admin', 'manager']), async (req, res) => {
  const { name, slug, type, description, parent_id } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO categories (name, slug, type, description, parent_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, slug, type || 'blog', description, parent_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Media
app.get('/api/cms/media', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM media WHERE deleted_at IS NULL ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/cms/media', requireRole(['admin', 'manager']), async (req, res) => {
  const { filename, url, mime_type, size, alt_text, folder, tags } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO media (filename, url, mime_type, size, alt_text, folder, tags) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [filename, url, mime_type, size, alt_text, folder || 'root', tags || '{}']
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/api/cms/media/:id', requireRole(['admin', 'manager']), async (req, res) => {
  const { id } = req.params;
  const { alt_text, folder, tags } = req.body;
  try {
    const result = await pool.query(
      'UPDATE media SET alt_text = $1, folder = $2, tags = $3 WHERE id = $4 RETURNING *',
      [alt_text, folder, tags, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/api/cms/media/:id', requireRole(['admin', 'manager']), async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('UPDATE media SET deleted_at = CURRENT_TIMESTAMP WHERE id = $1', [id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Menus
app.get('/api/cms/menus', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM menus WHERE deleted_at IS NULL');
    const menus = await Promise.all(result.rows.map(async (menu) => {
      const items = await pool.query('SELECT * FROM menu_items WHERE menu_id = $1 ORDER BY order_index ASC', [menu.id]);
      return { ...menu, items: items.rows };
    }));
    res.json(menus);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/cms/menus', requireRole(['admin', 'manager']), async (req, res) => {
  const { name, location, items } = req.body;
  try {
    const menuResult = await pool.query(
      'INSERT INTO menus (name, location) VALUES ($1, $2) RETURNING *',
      [name, location]
    );
    const menu = menuResult.rows[0];
    
    if (items && Array.isArray(items)) {
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        await pool.query(
          'INSERT INTO menu_items (menu_id, title, url, order_index, parent_id, target) VALUES ($1, $2, $3, $4, $5, $6)',
          [menu.id, item.title, item.url, i, item.parent_id, item.target || '_self']
        );
      }
    }
    
    const finalItems = await pool.query('SELECT * FROM menu_items WHERE menu_id = $1 ORDER BY order_index ASC', [menu.id]);
    res.status(201).json({ ...menu, items: finalItems.rows });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/api/cms/menus/:id', requireRole(['admin', 'manager']), async (req, res) => {
  const { id } = req.params;
  const { name, location, items } = req.body;
  try {
    await pool.query('UPDATE menus SET name = $1, location = $2 WHERE id = $3', [name, location, id]);
    
    // Simple approach: delete all items and re-insert
    await pool.query('DELETE FROM menu_items WHERE menu_id = $1', [id]);
    
    if (items && Array.isArray(items)) {
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        await pool.query(
          'INSERT INTO menu_items (menu_id, title, url, order_index, parent_id, target) VALUES ($1, $2, $3, $4, $5, $6)',
          [id, item.title, item.url, i, item.parent_id, item.target || '_self']
        );
      }
    }
    
    const menuResult = await pool.query('SELECT * FROM menus WHERE id = $1', [id]);
    const finalItems = await pool.query('SELECT * FROM menu_items WHERE menu_id = $1 ORDER BY order_index ASC', [id]);
    res.json({ ...menuResult.rows[0], items: finalItems.rows });
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

app.post('/api/properties', requireRole(['admin', 'manager']), async (req, res) => {
  const { 
    title, location, price, type, description, beds, baths, size, images,
    host, address, features, is_featured, rating, reviews_count, status 
  } = req.body;
  
  // Server-side validation
  if (!title || typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required' });
  }
  if (!location || typeof location !== 'string' || location.trim() === '') {
    return res.status(400).json({ error: 'Location is required' });
  }
  if (price === undefined || typeof price !== 'number' || price < 0) {
    return res.status(400).json({ error: 'Valid price is required' });
  }
  if (!images || !Array.isArray(images) || images.length === 0) {
    return res.status(400).json({ error: 'At least one image is required' });
  }

  try {
    const defaultHost = { name: 'SMW Admin', avatar: 'https://i.pravatar.cc/150?u=admin', status: 'Verified', yearsHosting: 1 };
    const defaultAddress = { street: location, city: '', state: '', zip: '', area: '', country: '' };
    const defaultFeatures = { interior: [], outdoor: [], utilities: [], other: [] };

    const result = await pool.query(
      `INSERT INTO properties 
      (title, location, price, type, description, beds, baths, size, images, host, address, features, is_featured, rating, reviews_count, status) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING *`,
      [
        title, location, price, type || 'Property', description || '', beds || 0, baths || 0, size || 0, images,
        host || defaultHost, address || defaultAddress, features || defaultFeatures, is_featured || false, rating || 5.0, reviews_count || 0, status || 'available'
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/api/properties/:id', requireRole(['admin', 'manager']), async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM properties WHERE id = $1 RETURNING id', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Property not found' });
    }
    res.json({ success: true, id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Projects
app.get('/api/projects', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM projects ORDER BY created_at DESC');
    // Map snake_case to camelCase
    const mappedRows = result.rows.map(row => ({
      ...row,
      surfaceArea: row.surface_area,
      projectManager: row.project_manager,
      id: row.id.toString()
    }));
    res.json(mappedRows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/projects', requireRole(['admin', 'manager']), async (req, res) => {
  const { title, location, status, image, gallery, category, client, surfaceArea, value, architect, timeline, description, requirements, projectManager } = req.body;
  
  if (!title || !location || !status || !image || !category) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO projects 
      (title, location, status, image, gallery, category, client, surface_area, value, architect, timeline, description, requirements, project_manager) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *`,
      [title, location, status, image, gallery || [], category, client, surfaceArea, value, architect, timeline, description, requirements || [], projectManager]
    );
    
    const row = result.rows[0];
    res.status(201).json({
      ...row,
      surfaceArea: row.surface_area,
      projectManager: row.project_manager,
      id: row.id.toString()
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/api/projects/:id', requireRole(['admin', 'manager']), async (req, res) => {
  const { id } = req.params;
  const { title, location, status, image, gallery, category, client, surfaceArea, value, architect, timeline, description, requirements } = req.body;
  
  try {
    const result = await pool.query(
      `UPDATE projects 
      SET title = $1, location = $2, status = $3, image = $4, gallery = $5, category = $6, client = $7, surface_area = $8, value = $9, architect = $10, timeline = $11, description = $12, requirements = $13
      WHERE id = $14 RETURNING *`,
      [title, location, status, image, gallery || [], category, client, surfaceArea, value, architect, timeline, description, requirements || [], id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const row = result.rows[0];
    res.json({
      ...row,
      surfaceArea: row.surface_area,
      id: row.id.toString()
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/api/projects/:id', requireRole(['admin', 'manager']), async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM projects WHERE id = $1 RETURNING id', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json({ success: true, id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Blogs
app.get('/api/blogs', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM blogs ORDER BY published_at DESC');
    const mappedRows = result.rows.map(row => ({
      ...row,
      publishedAt: row.published_at,
      id: row.id.toString()
    }));
    res.json(mappedRows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/blogs', requireRole(['admin', 'manager']), async (req, res) => {
  const { title, slug, excerpt, content, image, author, tags } = req.body;
  
  if (!title || !slug || !excerpt || !content || !image || !author) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO blogs 
      (title, slug, excerpt, content, image, author, tags) 
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [title, slug, excerpt, content, image, author, tags || []]
    );
    
    const row = result.rows[0];
    res.status(201).json({
      ...row,
      publishedAt: row.published_at,
      id: row.id.toString()
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/api/blogs/:id', requireRole(['admin', 'manager']), async (req, res) => {
  const { id } = req.params;
  const { title, slug, excerpt, content, image, author, tags } = req.body;
  
  try {
    const result = await pool.query(
      `UPDATE blogs 
      SET title = $1, slug = $2, excerpt = $3, content = $4, image = $5, author = $6, tags = $7
      WHERE id = $8 RETURNING *`,
      [title, slug, excerpt, content, image, author, tags || [], id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    const row = result.rows[0];
    res.json({
      ...row,
      publishedAt: row.published_at,
      id: row.id.toString()
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/api/blogs/:id', requireRole(['admin', 'manager']), async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM blogs WHERE id = $1 RETURNING id', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.json({ success: true, id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/register', async (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (email, password, role) VALUES ($1, $2, $3) RETURNING id, email, role',
      [email, hashedPassword, role || 'viewer']
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const user = result.rows[0];
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    req.session.userId = user.id;
    req.session.role = user.role;
    res.json({ id: user.id, email: user.email, role: user.role });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ error: 'Failed to log out' });
    }
    res.json({ success: true });
  });
});

app.get('/api/me', async (req, res) => {
  if (req.session.userId) {
    try {
      const result = await pool.query('SELECT id, email, role FROM users WHERE id = $1', [req.session.userId]);
      if (result.rows.length > 0) {
        res.json(result.rows[0]);
      } else {
        req.session.destroy(err => {});
        res.status(404).json({ error: 'User not found in database' });
      }
    } catch (err) {
      console.error('FETCH_ME_ERROR:', err);
      res.status(500).json({ error: 'Failed to fetch user data' });
    }
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
});



// Example of protecting a route
app.get('/api/admin/data', requireRole('admin'), (req, res) => {
  res.json({ message: 'This is protected admin data' });
});

// --- User Management ---
app.get('/api/users', requireRole('admin'), async (req, res) => {
  try {
    const result = await pool.query('SELECT id, email, role, created_at FROM users ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('FETCH_USERS_ERROR:', err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.put('/api/users/:id', requireRole('admin'), async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  try {
    const result = await pool.query(
      'UPDATE users SET role = $1 WHERE id = $2 RETURNING id, email, role, created_at',
      [role, id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('UPDATE_USER_ERROR:', err);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

app.delete('/api/users/:id', requireRole('admin'), async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING id', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(204).send();
  } catch (err) {
    console.error('DELETE_USER_ERROR:', err);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

// Property Reviews
app.get('/api/properties/:id/reviews', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM property_reviews WHERE property_id = $1 ORDER BY created_at DESC', [id]);
    const mappedRows = result.rows.map(row => ({
      ...row,
      propertyId: row.property_id,
      userName: row.user_name,
      createdAt: row.created_at,
      id: row.id.toString()
    }));
    res.json(mappedRows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/properties/:id/reviews', async (req, res) => {
  const { id } = req.params;
  const { userName, rating, comment } = req.body;
  
  if (!userName || !rating || !comment) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO property_reviews 
      (property_id, user_name, rating, comment) 
      VALUES ($1, $2, $3, $4) RETURNING *`,
      [id, userName, rating, comment]
    );
    
    // Update property average rating and review count
    await pool.query(
      `UPDATE properties 
       SET rating = (SELECT ROUND(AVG(rating), 1) FROM property_reviews WHERE property_id = $1),
           reviews_count = (SELECT COUNT(*) FROM property_reviews WHERE property_id = $1)
       WHERE id = $1`,
      [id]
    );

    const row = result.rows[0];
    res.status(201).json({
      ...row,
      propertyId: row.property_id,
      userName: row.user_name,
      createdAt: row.created_at,
      id: row.id.toString()
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default app;
