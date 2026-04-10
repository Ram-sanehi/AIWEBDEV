import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Create connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'alphaaim_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test connection
(async () => {
  try {
    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();
    console.log('✅ MySQL database connected');
  } catch (err) {
    console.error('❌ Database connection error:', err.message);
    console.error('Trying with different authentication...');
  }
})();

export { pool };
