import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database(path.join(__dirname, 'alphaaim.db'));

console.log('\n=== AlphaAIM Database Viewer ===\n');

// Show all tables
const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
console.log('📊 Tables:', tables.map(t => t.name).join(', '));

// Contact Submissions
console.log('\n--- Contact Submissions ---');
const contacts = db.prepare('SELECT id, name, email, subject, created_at FROM contact_submissions ORDER BY created_at DESC LIMIT 5').all();
contacts.forEach(c => console.log(`  ${c.name} (${c.email}) - ${c.subject}`));

// Blog Posts
console.log('\n--- Blog Posts ---');
const blogs = db.prepare('SELECT id, title, category, published_at FROM blog_posts ORDER BY published_at DESC').all();
blogs.forEach(b => console.log(`  [${b.id}] ${b.title} (${b.category})`));

// Portfolio Simulations
console.log('\n--- Portfolio Simulations ---');
const portfolio = db.prepare('SELECT stock_symbol, amount_invested, profit_loss, created_at FROM portfolio_simulations ORDER BY created_at DESC LIMIT 5').all();
portfolio.forEach(p => console.log(`  ${p.stock_symbol}: ₹${p.amount_invested} → P/L: ₹${p.profit_loss}`));

// Price Alerts
console.log('\n--- Price Alerts ---');
const alerts = db.prepare('SELECT stock_symbol, target_price, alert_type, alert_email FROM price_alerts WHERE triggered = 0').all();
alerts.forEach(a => console.log(`  ${a.stock_symbol} ${a.alert_type === 'above' ? '↑' : '↓'} ₹${a.target_price} → ${a.alert_email}`));

console.log('\n');
process.exit(0);
