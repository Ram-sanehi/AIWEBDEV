-- =============================================
-- MySQL Database Schema for AlphaAIM
-- =============================================

CREATE DATABASE IF NOT EXISTS alphaaim_db;
USE alphaaim_db;

-- =============================================
-- 1. CONTACT SUBMISSIONS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS contact_submissions (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_status (status),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- 2. PORTFOLIO SIMULATIONS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS portfolio_simulations (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  stock_symbol VARCHAR(20) NOT NULL,
  stock_name VARCHAR(255) NOT NULL,
  amount_invested DECIMAL(15, 2) NOT NULL,
  buy_date DATE NOT NULL,
  buy_price DECIMAL(15, 2) NOT NULL,
  current_price DECIMAL(15, 2) NOT NULL,
  profit_loss DECIMAL(15, 2) NOT NULL,
  profit_loss_pct DECIMAL(8, 4) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_stock_symbol (stock_symbol),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- 3. PRICE ALERTS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS price_alerts (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  stock_symbol VARCHAR(20) NOT NULL,
  stock_name VARCHAR(255) NOT NULL,
  target_price DECIMAL(15, 2) NOT NULL,
  alert_type VARCHAR(20) DEFAULT 'above',
  alert_email VARCHAR(255) NOT NULL,
  triggered BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_stock_symbol (stock_symbol),
  INDEX idx_triggered (triggered),
  INDEX idx_alert_email (alert_email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- 4. BLOG POSTS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS blog_posts (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  title VARCHAR(500) NOT NULL,
  excerpt TEXT NOT NULL,
  content LONGTEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  author VARCHAR(255) NOT NULL,
  image VARCHAR(500) NOT NULL,
  published_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_category (category),
  INDEX idx_published_at (published_at),
  FULLTEXT idx_search (title, excerpt, content)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- 5. INSERT SAMPLE BLOG POSTS
-- =============================================
INSERT INTO blog_posts (id, title, excerpt, content, category, author, image, published_at) VALUES
('1',
 'Mastering Your Personal Finances in 2024',
 'Discover essential strategies to manage your wealth, reduce debt, and build a secure financial future in the current economic landscape.',
 '<p class="lead">In today''s rapidly changing economic landscape, mastering your personal finances has never been more critical.</p><h2>1. Understanding Your Financial Position</h2><p>Before you can improve your financial situation, you need to understand where you stand. Start by calculating your net worth.</p><h2>2. Creating a Budget That Works</h2><p>A budget isn''t about restricting yourself – it''s about making conscious decisions.</p><h3>The 50/30/20 Rule:</h3><ul><li><strong>50%</strong> for Needs</li><li><strong>30%</strong> for Wants</li><li><strong>20%</strong> for Savings</li></ul><h2>3. Building an Emergency Fund</h2><p>Financial experts recommend having 3-6 months'' worth of living expenses saved.</p><h2>4. Strategic Debt Management</h2><p>High-interest debt like credit cards should be prioritized for repayment.</p><h2>5. Investing for the Future</h2><p>Time in the market is generally more important than timing the market.</p>',
 'Financial Planning',
 'Rajesh Sharma',
 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=800',
 '2024-03-15 10:00:00'),

('2',
 'Why SIP is the Best Way to Create Wealth',
 'Learn how Systematic Investment Plans (SIP) leverage the power of compounding and rupee cost averaging to grow your wealth over time.',
 '<p class="lead">Systematic Investment Plans (SIPs) have revolutionized how retail investors approach wealth creation.</p><h2>What is a Systematic Investment Plan?</h2><p>An SIP is a method of investing a fixed amount regularly into mutual funds.</p><h2>The Power of Compounding</h2><p>Albert Einstein reportedly called compound interest the "eighth wonder of the world."</p><h2>Rupee Cost Averaging</h2><p>SIPs eliminate the need to time the market.</p><h2>Key Benefits of SIPs:</h2><ul><li><strong>Disciplined Investing</strong></li><li><strong>Affordable</strong></li><li><strong>Flexible</strong></li><li><strong>Convenient</strong></li></ul>',
 'Investment',
 'Priya Gupta',
 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=800',
 '2024-03-10 10:00:00'),

('3',
 'Tax Saving Strategies for High Earners',
 'Explore advanced tax planning techniques to optimize your returns and stay compliant with the latest regulatory changes.',
 '<p class="lead">High earners face unique tax challenges. This guide explores advanced tax planning strategies.</p><h2>Understanding the Tax Landscape</h2><p>India''s tax system offers both old and new tax regimes.</p><h2>Section 80C: The Foundation</h2><p>Maximize your ₹1.5 lakh deduction under Section 80C.</p><h2>Beyond 80C: Additional Deductions</h2><h3>Section 80D: Health Insurance</h3><h3>Section 80CCD(1B): NPS</h3><h2>Advanced Strategies for High Earners</h2><ul><li>HUF (Hindu Undivided Family)</li><li>Family Trusts</li><li>Tax-Efficient Investments</li></ul>',
 'Tax Planning',
 'Amit Patel',
 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800',
 '2024-03-05 10:00:00');
