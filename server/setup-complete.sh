#!/bin/bash

# Setup MySQL Database for AlphaAIM with proper credentials

echo "=== AlphaAIM MySQL Database Setup with Credentials ==="
echo ""

# Create database and tables with sudo
echo "Setting up MySQL database with user credentials..."

sudo mysql <<'EOF'
-- Set root password
ALTER USER 'root'@'localhost' IDENTIFIED BY 'AlphaAIM@Root2024!Secure';

-- Create database
CREATE DATABASE IF NOT EXISTS alphaaim_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create application user
CREATE USER IF NOT EXISTS 'alphaaim_user'@'localhost' IDENTIFIED BY 'AlphaAIM@User2024!App';
GRANT ALL PRIVILEGES ON alphaaim_db.* TO 'alphaaim_user'@'localhost';

FLUSH PRIVILEGES;

USE alphaaim_db;

-- Contact Submissions Table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id VARCHAR(36) PRIMARY KEY,
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

-- Portfolio Simulations Table
CREATE TABLE IF NOT EXISTS portfolio_simulations (
  id VARCHAR(36) PRIMARY KEY,
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

-- Price Alerts Table
CREATE TABLE IF NOT EXISTS price_alerts (
  id VARCHAR(36) PRIMARY KEY,
  stock_symbol VARCHAR(20) NOT NULL,
  stock_name VARCHAR(255) NOT NULL,
  target_price DECIMAL(15, 2) NOT NULL,
  alert_type VARCHAR(20) DEFAULT 'above',
  alert_email VARCHAR(255) NOT NULL,
  triggered TINYINT(1) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_stock_symbol (stock_symbol),
  INDEX idx_triggered (triggered),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Blog Posts Table
CREATE TABLE IF NOT EXISTS blog_posts (
  id VARCHAR(36) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  excerpt TEXT NOT NULL,
  content LONGTEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  author VARCHAR(255) NOT NULL,
  image VARCHAR(500) NOT NULL,
  published_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_category (category),
  INDEX idx_published_at (published_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert sample blog posts
INSERT IGNORE INTO blog_posts (id, title, excerpt, content, category, author, image, published_at) VALUES
('1', 'Mastering Your Personal Finances in 2024', 'Discover essential strategies to manage your wealth, reduce debt, and build a secure financial future.', '<p class="lead">In todays rapidly changing economic landscape, mastering your personal finances has never been more critical.</p><h2>1. Understanding Your Financial Position</h2><p>Calculate your net worth – assets minus liabilities.</p><h2>2. Creating a Budget That Works</h2><p>The 50/30/20 Rule: 50% Needs, 30% Wants, 20% Savings.</p><h2>3. Building an Emergency Fund</h2><p>Keep 3-6 months of expenses in liquid cash.</p>', 'Financial Planning', 'Rajesh Sharma', 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=800', '2024-03-15 10:00:00'),
('2', 'Why SIP is the Best Way to Create Wealth', 'Learn how SIPs leverage compounding and rupee cost averaging to grow wealth over time.', '<p class="lead">Systematic Investment Plans (SIPs) have revolutionized retail investing.</p><h2>The Power of Compounding</h2><p>Rupees 10000 per month at 12 percent equals Rupees 23.2L in 10 years!</p><h2>Rupee Cost Averaging</h2><p>Buy more units when markets are low, fewer when high.</p>', 'Investment', 'Priya Gupta', 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=800', '2024-03-10 10:00:00'),
('3', 'Tax Saving Strategies for High Earners', 'Advanced tax planning techniques to optimize returns while staying compliant.', '<p class="lead">High earners face unique tax challenges.</p><h2>Section 80C: The Foundation</h2><p>Maximize Rupees 1.5L deduction via EPF, PPF, ELSS, Insurance.</p><h2>Beyond 80C</h2><p>80D Health: Rupees 25K, 80CCD(1B) NPS: Rupees 50K</p>', 'Tax Planning', 'Amit Patel', 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800', '2024-03-05 10:00:00');

SELECT 'Setup completed!' AS status;
EOF

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Database setup completed successfully!"
    echo ""
    echo "MySQL Credentials:"
    echo "  Root Password: AlphaAIM@Root2024!Secure"
    echo "  App User: alphaaim_user"
    echo "  App Password: AlphaAIM@User2024!App"
    echo ""
    echo "Update your .env file with:"
    echo "  DB_USER=alphaaim_user"
    echo "  DB_PASSWORD=AlphaAIM@User2024!App"
else
    echo ""
    echo "❌ Database setup failed."
fi
