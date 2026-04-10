import express from 'express';
import { pool } from '../db/index.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// POST /api/contact - Submit contact form
router.post('/', async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  console.log('[CONTACT] New submission received:', { name, email, subject });

  if (!name || !email || !phone || !subject || !message) {
    console.log('[CONTACT] Validation failed: Missing fields');
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    console.log('[CONTACT] Validation failed: Invalid email');
    return res.status(400).json({ error: 'Invalid email address' });
  }

  let connection;
  try {
    connection = await pool.getConnection();
    
    const id = uuidv4();
    console.log('[CONTACT] Attempting to insert with ID:', id);
    
    const query = `
      INSERT INTO contact_submissions (id, name, email, phone, subject, message)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    
    const result = await connection.query(query, [id, name, email, phone, subject, message]);
    
    console.log('[CONTACT] Insert result:', result[0]);
    console.log('[CONTACT] Submission saved successfully for:', email);

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully'
    });
  } catch (error) {
    console.error('[CONTACT] Contact submission error:', error);
    res.status(500).json({ error: 'Failed to submit contact form' });
  } finally {
    if (connection) connection.release();
  }
});

// GET /api/contact - Get all submissions (admin only)
router.get('/', async (_req, res) => {
  let connection;
  try {
    connection = await pool.getConnection();
    
    const [rows] = await connection.query('SELECT * FROM contact_submissions ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    console.error('[CONTACT] Get contacts error:', error);
    res.status(500).json({ error: 'Failed to fetch submissions' });
  } finally {
    if (connection) connection.release();
  }
});

export default router;
