-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing tables if they exist
DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS categories CASCADE;

-- Create tables
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  category_id UUID,
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  CONSTRAINT fk_category
    FOREIGN KEY(category_id)
    REFERENCES categories(id)
    ON DELETE SET NULL
);

-- Create indexes if they don't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'posts_category_id_idx') THEN
    CREATE INDEX posts_category_id_idx ON posts(category_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'posts_slug_idx') THEN
    CREATE INDEX posts_slug_idx ON posts(slug);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'categories_slug_idx') THEN
    CREATE INDEX categories_slug_idx ON categories(slug);
  END IF;
END $$;

-- Set up RLS policies (these statements are idempotent)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist and recreate them
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Categories are viewable by everyone" ON categories;
  DROP POLICY IF EXISTS "Only authenticated users can create categories" ON categories;
  DROP POLICY IF EXISTS "Published posts are viewable by everyone" ON posts;
  
  CREATE POLICY "Categories are viewable by everyone" ON categories
    FOR SELECT USING (true);

  CREATE POLICY "Only authenticated users can create categories" ON categories
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

  CREATE POLICY "Published posts are viewable by everyone" ON posts
    FOR SELECT USING (published = true);
END $$;

-- Set up realtime
DROP PUBLICATION IF EXISTS supabase_realtime;
CREATE PUBLICATION supabase_realtime FOR TABLE posts, categories;

-- Clear existing data
TRUNCATE TABLE posts CASCADE;
TRUNCATE TABLE categories CASCADE;

-- Seed data
INSERT INTO categories (name, slug) VALUES
('Art', 'art'),
('Sustainable Living', 'sustainable-living'),
('DIY Projects', 'diy-projects'),
('Tech & Code', 'tech-and-code');

-- Insert posts with proper category references
INSERT INTO posts (
  slug,
  category_id,
  published,
  published_at,
  updated_at
) VALUES (
  'cement-tile-adventures',
  (SELECT id FROM categories WHERE slug = 'diy-projects'),
  true,
  now(),
  now()
);

INSERT INTO posts (
  slug,
  category_id,
  published,
  published_at,
  updated_at
) VALUES (
  'welding-journey',
  (SELECT id FROM categories WHERE slug = 'diy-projects'),
  true,
  now(),
  now()
);

INSERT INTO posts (
  slug,
  category_id,
  published,
  published_at,
  updated_at
) VALUES (
  'sustainable-home-journey',
  (SELECT id FROM categories WHERE slug = 'sustainable-living'),
  true,
  now(),
  now()
);
