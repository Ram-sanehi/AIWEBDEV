import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { pool } from './db/index.js';
import contactRoutes from './routes/contact.js';
import portfolioRoutes from './routes/portfolio.js';
import priceAlertRoutes from './routes/priceAlert.js';
import blogRoutes from './routes/blog.js';
import stocksRoutes from './routes/stocks.js';

dotenv.config();

const app = express();
const PORT = process.env.SERVER_PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/api/health', async (_req, res) => {
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.ping();
    res.json({ status: 'ok', database: 'MySQL connected' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  } finally {
    if (connection) connection.release();
  }
});

// Routes
app.use('/api/contact', contactRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/price-alerts', priceAlertRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/stocks', stocksRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Database: MySQL`);
});
