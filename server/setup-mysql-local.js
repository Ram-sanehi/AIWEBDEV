import mysql from 'mysql2/promise';

async function setupDatabase() {
  try {
    // First connection without specific database (to create the database)
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    console.log('✅ Connected to MySQL server');

    // Create database
    await connection.query('CREATE DATABASE IF NOT EXISTS alphaaim_db');
    console.log('✅ Database created or already exists');

    // Create user if needed
    try {
      await connection.query(
        `CREATE USER IF NOT EXISTS 'alphaaim_user'@'localhost' IDENTIFIED BY 'alphaaim_secure_password_2024'`
      );
      await connection.query(
        `GRANT ALL PRIVILEGES ON alphaaim_db.* TO 'alphaaim_user'@'localhost'`
      );
      await connection.query('FLUSH PRIVILEGES');
      console.log('✅ User and privileges configured');
    } catch (e) {
      if (e.code !== 'ER_PARSE_ERROR' && e.code !== 'ER_CANT_CREATE_USER_WITH_GRANT') {
        console.log('ℹ️  User setup: ' + e.message.substring(0, 50));
      }
    }

    await connection.end();

    // Second connection to the new database
    const dbConnection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'alphaaim_user',
      password: process.env.DB_PASSWORD || 'alphaaim_secure_password_2024',
      database: 'alphaaim_db',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    console.log('✅ Connected to alphaaim_db');

    // Create tables
    const tables = [
      `CREATE TABLE IF NOT EXISTS contact_submissions (
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
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

      `CREATE TABLE IF NOT EXISTS portfolio_simulations (
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
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

      `CREATE TABLE IF NOT EXISTS price_alerts (
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
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

      `CREATE TABLE IF NOT EXISTS blog_posts (
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
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`
    ];

    for (const table of tables) {
      await dbConnection.query(table);
    }
    console.log('✅ All tables created');

    // Insert sample blog posts
    const posts = [
      [
        '1',
        'Mastering Your Personal Finances in 2024',
        'Discover essential strategies to manage your wealth, reduce debt, and build a secure financial future.',
        '<p class="lead">In todays rapidly changing economic landscape, mastering your personal finances has never been more critical.</p><h2>1. Understanding Your Financial Position</h2><p>Calculate your net worth – assets minus liabilities.</p><h2>2. Creating a Budget That Works</h2><p>The 50/30/20 Rule: 50% Needs, 30% Wants, 20% Savings.</p><h2>3. Building an Emergency Fund</h2><p>Keep 3-6 months of expenses in liquid cash.</p>',
        'Financial Planning',
        'Rajesh Sharma',
        'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=800',
        '2024-03-15 10:00:00'
      ],
      [
        '2',
        'Why SIP is the Best Way to Create Wealth',
        'Learn how SIPs leverage compounding and rupee cost averaging to grow wealth over time.',
        '<p class="lead">Systematic Investment Plans (SIPs) have revolutionized retail investing.</p><h2>The Power of Compounding</h2><p>Rupees 10000 per month at 12 percent equals Rupees 23.2L in 10 years!</p><h2>Rupee Cost Averaging</h2><p>Buy more units when markets are low, fewer when high.</p>',
        'Investment',
        'Priya Gupta',
        'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=800',
        '2024-03-10 10:00:00'
      ],
      [
        '3',
        'Tax Saving Strategies for High Earners',
        'Advanced tax planning techniques to optimize returns while staying compliant.',
        '<p class="lead">High earners face unique tax challenges.</p><h2>Section 80C: The Foundation</h2><p>Maximize Rupees 1.5L deduction via EPF, PPF, ELSS, Insurance.</p><h2>Beyond 80C</h2><p>80D Health: Rupees 25K, 80CCD(1B) NPS: Rupees 50K</p>',
        'Tax Planning',
        'Amit Patel',
        'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800',
        '2024-03-05 10:00:00'
      ]
    ];

    for (const post of posts) {
      try {
        await dbConnection.query(
          `INSERT IGNORE INTO blog_posts (id, title, excerpt, content, category, author, image, published_at) 
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          post
        );
      } catch (e) {
        console.log('ℹ️  Blog post insert: ' + e.message.substring(0, 50));
      }
    }
    console.log('✅ Sample blog posts inserted');

    await dbConnection.end();
    console.log('\n✅ Database setup completed successfully!');
    console.log('\nDatabase Details:');
    console.log('  Host: localhost');
    console.log('  Database: alphaaim_db');
    console.log('  User: alphaaim_user');
    console.log('  Password: alphaaim_secure_password_2024');

  } catch (error) {
    console.error('❌ Database setup error:', error.message);
    process.exit(1);
  }
}

setupDatabase();
