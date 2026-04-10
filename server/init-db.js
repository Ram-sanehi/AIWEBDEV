import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, 'alphaaim.db');

console.log('Creating database at:', dbPath);
const db = new Database(dbPath);

console.log('Creating tables...');

db.exec(`
  CREATE TABLE IF NOT EXISTS contact_submissions (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS portfolio_simulations (
    id TEXT PRIMARY KEY,
    stock_symbol TEXT NOT NULL,
    stock_name TEXT NOT NULL,
    amount_invested REAL NOT NULL,
    buy_date TEXT NOT NULL,
    buy_price REAL NOT NULL,
    current_price REAL NOT NULL,
    profit_loss REAL NOT NULL,
    profit_loss_pct REAL NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS price_alerts (
    id TEXT PRIMARY KEY,
    stock_symbol TEXT NOT NULL,
    stock_name TEXT NOT NULL,
    target_price REAL NOT NULL,
    alert_type TEXT DEFAULT 'above',
    alert_email TEXT NOT NULL,
    triggered INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS blog_posts (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT NOT NULL,
    author TEXT NOT NULL,
    image TEXT NOT NULL,
    published_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Insert sample blog posts
const insert = db.prepare(`
  INSERT OR REPLACE INTO blog_posts (id, title, excerpt, content, category, author, image, published_at)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`);

insert.run('1', 'Mastering Your Personal Finances in 2024', 'Discover essential strategies to manage your wealth, reduce debt, and build a secure financial future.', '<p>Learn about budgeting, emergency funds, debt management, and investing.</p>', 'Financial Planning', 'Rajesh Sharma', 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=800', '2024-03-15 10:00:00');

insert.run('2', 'Why SIP is the Best Way to Create Wealth', 'Learn how SIPs leverage compounding and rupee cost averaging to grow wealth over time.', '<p>SIPs offer disciplined investing, rupee cost averaging, and the power of compounding.</p>', 'Investment', 'Priya Gupta', 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=800', '2024-03-10 10:00:00');

insert.run('3', 'Tax Saving Strategies for High Earners', 'Advanced tax planning techniques to optimize returns while staying compliant.', '<p>Maximize deductions under 80C, 80D, NPS, and more.</p>', 'Tax Planning', 'Amit Patel', 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800', '2024-03-05 10:00:00');

console.log('✅ Database created successfully!');

// Show tables
const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
console.log('📊 Tables created:', tables.map(t => t.name).join(', '));

// Show blog posts
const blogs = db.prepare('SELECT id, title, category FROM blog_posts').all();
console.log('📝 Blog posts:', blogs.length);
blogs.forEach(b => console.log(`   [${b.id}] ${b.title}`));

db.close();
process.exit(0);
