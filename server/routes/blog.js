import express from 'express';
import { pool } from '../db/index.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// GET /api/blog - Get all blog posts
router.get('/', async (req, res) => {
  const { category, search } = req.query;
  let connection;
  try {
    connection = await pool.getConnection();
    let query = 'SELECT * FROM blog_posts';
    const conditions = [];
    const params = [];

    if (category) {
      conditions.push('category = ?');
      params.push(category);
    }

    if (search) {
      conditions.push('(title LIKE ? OR excerpt LIKE ? OR content LIKE ?)');
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm, searchTerm);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' ORDER BY published_at DESC';

    const [rows] = await connection.query(query, params);
    res.json(rows);
  } catch (error) {
    console.error('Get blog posts error:', error);
    res.status(500).json({ error: 'Failed to fetch blog posts' });
  } finally {
    if (connection) connection.release();
  }
});

// GET /api/blog/:id - Get single blog post
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  let connection;
  try {
    connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM blog_posts WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Get blog post error:', error);
    res.status(500).json({ error: 'Failed to fetch blog post' });
  } finally {
    if (connection) connection.release();
  }
});

// POST /api/blog - Create blog post
router.post('/', async (req, res) => {
  const { title, excerpt, content, category, author, image, published_at } = req.body;
  if (!title || !excerpt || !content || !category || !author) {
    return res.status(400).json({ error: 'Required fields missing' });
  }
  let connection;
  try {
    connection = await pool.getConnection();
    const query = `
      INSERT INTO blog_posts (id, title, excerpt, content, category, author, image, published_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    await connection.query(query, [uuidv4(), title, excerpt, content, category, author, image, published_at || new Date().toISOString()]);
    res.status(201).json({ success: true, message: 'Blog post created' });
  } catch (error) {
    console.error('Create blog post error:', error);
    res.status(500).json({ error: 'Failed to create blog post' });
  } finally {
    if (connection) connection.release();
  }
});

// PUT /api/blog/:id - Update blog post
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, excerpt, content, category, author, image, published_at } = req.body;
  let connection;
  try {
    connection = await pool.getConnection();
    const query = `
      UPDATE blog_posts
      SET title = ?, excerpt = ?, content = ?, category = ?, author = ?, image = ?, published_at = ?
      WHERE id = ?
    `;
    await connection.query(query, [title, excerpt, content, category, author, image, published_at, id]);
    res.json({ success: true, message: 'Blog post updated' });
  } catch (error) {
    console.error('Update blog post error:', error);
    res.status(500).json({ error: 'Failed to update blog post' });
  } finally {
    if (connection) connection.release();
  }
});

// DELETE /api/blog/:id - Delete blog post
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.query('DELETE FROM blog_posts WHERE id = ?', [id]);
    res.json({ success: true, message: 'Blog post deleted' });
  } catch (error) {
    console.error('Delete blog post error:', error);
    res.status(500).json({ error: 'Failed to delete blog post' });
  } finally {
    if (connection) connection.release();
  }
});

export default router;
