// Stock Price API Routes
import express from 'express';
import { getAllStocks, getStockPrice, getStocks } from '../services/stockPriceService.js';

const router = express.Router();

// Get all stocks with current prices
router.get('/', async (req, res) => {
  try {
    const stocks = await getAllStocks();
    res.json(stocks);
  } catch (error) {
    console.error('Error fetching stocks:', error.message);
    res.status(500).json({ error: 'Failed to fetch stock prices' });
  }
});

// Get specific stocks
router.get('/bulk', async (req, res) => {
  try {
    const symbols = req.query.symbols ? req.query.symbols.split(',') : [];
    const stocks = await getStocks(symbols);
    res.json(stocks);
  } catch (error) {
    console.error('Error fetching stocks:', error.message);
    res.status(500).json({ error: 'Failed to fetch stock prices' });
  }
});

// Get single stock price
router.get('/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params;
    const stock = await getStockPrice(symbol);
    
    if (!stock) {
      return res.status(404).json({ error: 'Stock not found' });
    }
    
    res.json(stock);
  } catch (error) {
    console.error('Error fetching stock:', error.message);
    res.status(500).json({ error: 'Failed to fetch stock price' });
  }
});

export default router;
