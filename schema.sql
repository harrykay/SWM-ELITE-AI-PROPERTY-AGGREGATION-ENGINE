-- SMW Real Estate Consultants - Complete Database Schema
-- Target: PostgreSQL

-- 1. Properties Table
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

-- Migrations for Properties Table
ALTER TABLE properties ADD COLUMN IF NOT EXISTS host JSONB DEFAULT '{}';
ALTER TABLE properties ADD COLUMN IF NOT EXISTS address JSONB DEFAULT '{}';
ALTER TABLE properties ADD COLUMN IF NOT EXISTS features JSONB DEFAULT '{}';
ALTER TABLE properties ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS rating NUMERIC DEFAULT 0;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS reviews_count INTEGER DEFAULT 0;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'available';
ALTER TABLE properties ADD COLUMN IF NOT EXISTS ai_summary TEXT;

-- 2. Pages Table
CREATE TABLE IF NOT EXISTS pages (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content JSONB,
  is_visual BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'draft',
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

-- 3. Posts Table
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
  is_featured BOOLEAN DEFAULT false,
  meta_title TEXT,
  meta_description TEXT,
  scheduled_at TIMESTAMP WITH TIME ZONE,
  published_at TIMESTAMP WITH TIME ZONE,
  deleted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Categories Table
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  type TEXT DEFAULT 'blog',
  description TEXT,
  parent_id INTEGER
);

-- 5. Media Table
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

-- 6. Menus Table
CREATE TABLE IF NOT EXISTS menus (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT UNIQUE NOT NULL,
  deleted_at TIMESTAMP WITH TIME ZONE
);

-- 7. Menu Items Table
CREATE TABLE IF NOT EXISTS menu_items (
  id SERIAL PRIMARY KEY,
  menu_id INTEGER REFERENCES menus(id) ON DELETE CASCADE,
  parent_id INTEGER,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  target TEXT DEFAULT '_self'
);

-- 8. CMS Settings Table
CREATE TABLE IF NOT EXISTS cms_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL
);

-- 9. Projects Table
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

-- Ensure project_manager exists in case projects table was already created
DO $$ 
BEGIN 
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='projects' AND column_name='project_manager') THEN
    ALTER TABLE projects ADD COLUMN project_manager TEXT;
  END IF;
END $$;

-- 10. Blogs Table
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

-- 11. Property Reviews Table
CREATE TABLE IF NOT EXISTS property_reviews (
  id SERIAL PRIMARY KEY,
  property_id INTEGER NOT NULL,
  user_name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 12. Users Table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'viewer',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
