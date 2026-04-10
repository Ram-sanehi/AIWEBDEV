import express from 'express';
import { pool } from '../db/index.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// POST /api/price-alerts - Create price alert
router.post('/', async (req, res) => {
  const { stock_symbol, stock_name, target_price, alert_type, alert_email } = req.body;

  if (!stock_symbol || !target_price || !alert_email) {
    return res.status(400).json({ error: 'Required fields missing' });
  }

  let connection;
  try {
    connection = await pool.getConnection();
    
    const query = `
      INSERT INTO price_alerts
      (id, stock_symbol, stock_name, target_price, alert_type, alert_email)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    
    await connection.query(query, [uuidv4(), stock_symbol, stock_name, target_price, alert_type || 'above', alert_email]);

    res.status(201).json({
      success: true,
      message: 'Price alert created successfully'
    });
  } catch (error) {
    console.error('Price alert error:', error);
    res.status(500).json({ error: 'Failed to create price alert' });
  } finally {
    if (connection) connection.release();
  }
});

// GET /api/price-alerts - Get active alerts
router.get('/', async (req, res) => {
  const { email } = req.query;
  let connection;
  try {
    connection = await pool.getConnection();
    let query = 'SELECT * FROM price_alerts WHERE triggered = 0';
    let params = [];

    if (email) {
      query += ' AND alert_email = ?';
      params.push(email);
    }

    query += ' ORDER BY created_at DESC';

    const [rows] = await connection.query(query, params);
    res.json(rows);
  } catch (error) {
    console.error('Get price alerts error:', error);
    res.status(500).json({ error: 'Failed to fetch alerts' });
  } finally {
    if (connection) connection.release();
  }
});

// PUT /api/price-alerts/:id/trigger - Mark alert as triggered
router.put('/:id/trigger', async (req, res) => {
  const { id } = req.params;
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.query('UPDATE price_alerts SET triggered = 1 WHERE id = ?', [id]);
    res.json({ success: true, message: 'Alert triggered' });
  } catch (error) {
    console.error('Trigger alert error:', error);
    res.status(500).json({ error: 'Failed to update alert' });
  } finally {
    if (connection) connection.release();
  }
});

export default router;
