-- SMW Real Estate Consultants - Database Schema
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
    host JSONB DEFAULT '{}',
    address JSONB DEFAULT '{}',
    features JSONB DEFAULT '{}',
    is_featured BOOLEAN DEFAULT false,
    rating NUMERIC DEFAULT 0,
    reviews_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Migration Script (Run these if your table already exists)
-- ALTER TABLE properties ADD COLUMN IF NOT EXISTS host JSONB DEFAULT '{}';
-- ALTER TABLE properties ADD COLUMN IF NOT EXISTS address JSONB DEFAULT '{}';
-- ALTER TABLE properties ADD COLUMN IF NOT EXISTS features JSONB DEFAULT '{}';
-- ALTER TABLE properties ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;
-- ALTER TABLE properties ADD COLUMN IF NOT EXISTS rating NUMERIC DEFAULT 0;
-- ALTER TABLE properties ADD COLUMN IF NOT EXISTS reviews_count INTEGER DEFAULT 0;
-- ALTER TABLE properties ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'available';

-- 3. Sample Seed Data
-- INSERT INTO properties (title, location, price, type, description, beds, baths, size, images, status, is_featured, rating, reviews_count)
-- VALUES ('The Kololo Heights Penthouse', 'Kololo, Kampala', 450000, 'Apartment', 'Ultra-luxury living at the highest peak of Kampala.', 3, 4, 3200, ARRAY['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'], 'hot offer', true, 4.9, 42);
