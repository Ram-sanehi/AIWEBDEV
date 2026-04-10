import express from 'express';
import { pool } from '../db/index.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// POST /api/portfolio - Save simulation
router.post('/', async (req, res) => {
  const { stock_symbol, stock_name, amount_invested, buy_date, buy_price, current_price, profit_loss, profit_loss_pct } = req.body;

  if (!stock_symbol || !amount_invested || !buy_date || !buy_price) {
    return res.status(400).json({ error: 'Required fields missing' });
  }

  let connection;
  try {
    connection = await pool.getConnection();
    
    const query = `
      INSERT INTO portfolio_simulations
      (id, stock_symbol, stock_name, amount_invested, buy_date, buy_price, current_price, profit_loss, profit_loss_pct)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    await connection.query(query, [uuidv4(), stock_symbol, stock_name, amount_invested, buy_date, buy_price, current_price, profit_loss, profit_loss_pct]);

    res.status(201).json({
      success: true,
      message: 'Simulation saved successfully'
    });
  } catch (error) {
    console.error('Portfolio simulation error:', error);
    res.status(500).json({ error: 'Failed to save simulation' });
  } finally {
    if (connection) connection.release();
  }
});

// GET /api/portfolio - Get recent simulations
router.get('/', async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  let connection;
  try {
    connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM portfolio_simulations ORDER BY created_at DESC LIMIT ?', [limit]);
    res.json(rows);
  } catch (error) {
    console.error('Get portfolio error:', error);
    res.status(500).json({ error: 'Failed to fetch simulations' });
  } finally {
    if (connection) connection.release();
  }
});

export default router;
