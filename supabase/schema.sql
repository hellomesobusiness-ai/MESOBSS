-- MESO Complete Database Schema

-- Users (managed by Supabase Auth, extended here)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.id,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Categories
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  type TEXT NOT NULL, -- 'service', 'portfolio', 'blog'
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Monthly Packages
CREATE TABLE IF NOT EXISTS packages (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price_label TEXT DEFAULT 'Starting from',
  price_currency TEXT DEFAULT 'BDT',
  price_value TEXT NOT NULL,
  category TEXT DEFAULT 'monthly', -- monthly, single, international, custom
  features JSONB DEFAULT '[]',
  is_popular BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Single Purchase Services
CREATE TABLE IF NOT EXISTS services (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  code TEXT,
  description TEXT,
  category TEXT NOT NULL, -- graphic-design, photography, video, website, ai, marketing
  subcategory TEXT,
  price_label TEXT,
  price_currency TEXT DEFAULT 'BDT',
  price_value TEXT,
  timeline TEXT,
  image_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- International Services
CREATE TABLE IF NOT EXISTS international_services (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  price_currency TEXT DEFAULT 'USD',
  price_value TEXT,
  timeline TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Portfolio Projects
CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  category TEXT,
  client TEXT,
  completion_date DATE,
  metrics JSONB DEFAULT '{}',
  image_url TEXT,
  video_url TEXT,
  testimonial TEXT,
  testimonial_author TEXT,
  is_published BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Project Images (Gallery)
CREATE TABLE IF NOT EXISTS project_images (
  id SERIAL PRIMARY KEY,
  project_id INT REFERENCES projects(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  alt TEXT,
  sort_order INT DEFAULT 0
);

-- Blog Posts
CREATE TABLE IF NOT EXISTS blog_posts (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT,
  excerpt TEXT,
  author TEXT,
  category TEXT,
  image_url TEXT,
  tags TEXT[] DEFAULT '{}',
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  scheduled_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Inquiries (Contact form + Lead management)
CREATE TABLE IF NOT EXISTS inquiries (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  company TEXT,
  country TEXT,
  budget TEXT,
  project_type TEXT,
  interest TEXT,
  message TEXT,
  status TEXT DEFAULT 'new', -- new, contacted, proposal, won, lost
  value NUMERIC,
  assigned_to UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
  id SERIAL PRIMARY KEY,
  client_name TEXT NOT NULL,
  company TEXT,
  role TEXT,
  content TEXT NOT NULL,
  rating INT DEFAULT 5,
  image_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- FAQ
CREATE TABLE IF NOT EXISTS faqs (
  id SERIAL PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT,
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true
);

-- Coupons
CREATE TABLE IF NOT EXISTS coupons (
  id SERIAL PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  discount_type TEXT NOT NULL, -- percentage, fixed
  discount_value NUMERIC NOT NULL,
  min_purchase NUMERIC DEFAULT 0,
  max_uses INT,
  used_count INT DEFAULT 0,
  expires_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- SEO
CREATE TABLE IF NOT EXISTS seo (
  id SERIAL PRIMARY KEY,
  page TEXT UNIQUE NOT NULL,
  title TEXT,
  description TEXT,
  keywords TEXT,
  og_image TEXT,
  schema_markup JSONB,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Logs / Activity
CREATE TABLE IF NOT EXISTS activity_logs (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  action TEXT NOT NULL,
  entity_type TEXT,
  entity_id INT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE international_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo ENABLE ROW LEVEL SECURITY;

-- Policies: Public read for active content
CREATE POLICY "Public read active packages" ON packages FOR SELECT USING (is_active = true);
CREATE POLICY "Public read active services" ON services FOR SELECT USING (is_active = true);
CREATE POLICY "Public read active intl services" ON international_services FOR SELECT USING (is_active = true);
CREATE POLICY "Public read published projects" ON projects FOR SELECT USING (is_published = true);
CREATE POLICY "Public read project images" ON project_images FOR SELECT USING (true);
CREATE POLICY "Public read published posts" ON blog_posts FOR SELECT USING (is_published = true);
CREATE POLICY "Public read testimonials" ON testimonials FOR SELECT USING (is_active = true);
CREATE POLICY "Public read faqs" ON faqs FOR SELECT USING (is_active = true);
CREATE POLICY "Public insert inquiries" ON inquiries FOR INSERT WITH CHECK (true);

-- Policies: Admin full access (use service_role key)
-- (service_role bypasses RLS, so these are for authenticated admin users)
CREATE POLICY "Admin all packages" ON packages FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all services" ON services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all projects" ON projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all blog" ON blog_posts FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all inquiries" ON inquiries FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all testimonials" ON testimonials FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all coupons" ON coupons FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all seo" ON seo FOR ALL USING (auth.role() = 'authenticated');

-- Seed Data: SEO defaults
INSERT INTO seo (page, title, description) VALUES
('/', 'MESO | Modernize Every SME with Opportunity', 'Business growth agency helping startups and SMEs through AI, branding, websites, marketing, and automation.'),
('/services', 'Services | MESO', 'Complete range of business growth services including monthly packages, single purchases, and international solutions.'),
('/portfolio', 'Portfolio | MESO', 'Case studies and projects from MESO agency. See our work in branding, web development, AI, and marketing.'),
('/blog', 'Blog | MESO', 'Insights on business growth, AI, marketing, and technology for SMEs and startups.');

-- Seed Data: FAQ
INSERT INTO faqs (question, answer, category, sort_order) VALUES
('What is MESO?', 'MESO is a business growth agency that helps startups and SMEs grow through AI, branding, websites, marketing, and automation.', 'general', 1),
('How much do services cost?', 'Our services start from BDT 5,500/month for monthly packages. Single purchase services start from BDT 15,000. International services are priced in USD.', 'pricing', 2),
('How long does a project take?', 'Timeline depends on the service. Websites typically take 14-21 days. Branding projects take 10-14 days. AI solutions take 7-14 days.', 'process', 3),
('Do you work with international clients?', 'Yes! We have dedicated international services priced in USD for clients outside Bangladesh.', 'international', 4),
('What is MISTO AI?', 'MISTO is our AI assistant that helps businesses with marketing, growth, automation, branding, and sales strategies.', 'ai', 5),
('Can I get a custom solution?', 'Absolutely. Contact us with your requirements and our team will design a custom package tailored to your business needs.', 'custom', 6);

-- Seed Data: Testimonials
INSERT INTO testimonials (client_name, company, role, content, rating, is_featured, sort_order) VALUES
('Sarah Rahman', 'Urban Aesthetics', 'CEO', 'MESO transformed our digital presence completely. Our revenue grew 3x in 6 months.', 5, true, 1),
('Kamal Hossain', 'TechNova Solutions', 'Founder', 'The AI automation system MESO built saved us 40 hours per week. Incredible efficiency gains.', 5, true, 2),
('Nusrat Jahan', 'Luxe & Co.', 'Marketing Director', 'Their branding package gave us a world-class identity. We look like a Fortune 500 company now.', 5, true, 3);
