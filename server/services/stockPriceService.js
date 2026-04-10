// Stock Price Service - Fetches real-time stock prices
// Uses dynamic pricing with market realism

import axios from 'axios';

// Stock data cache
let priceCache = {
  timestamp: 0,
  data: {},
  updateInterval: 60000, // Update every 1 minute
};

// Initial stock data with realistic starting prices
export const STOCKS = {
  RELIANCE: { name: "Reliance Industries", basePrice: 2890.50 },
  TCS: { name: "Tata Consultancy", basePrice: 4120.75 },
  HDFCBANK: { name: "HDFC Bank", basePrice: 1945.80 },
  INFY: { name: "Infosys Limited", basePrice: 1678.35 },
  ICICIBANK: { name: "ICICI Bank", basePrice: 1234.20 },
  BHARTIARTL: { name: "Bharti Airtel", basePrice: 1456.90 },
  SBIN: { name: "State Bank of India", basePrice: 845.30 },
  WIPRO: { name: "Wipro Limited", basePrice: 685.45 },
  SENSEX: { name: "BSE Sensex", basePrice: 77234.56 },
  NIFTY: { name: "Nifty 50", basePrice: 23456.45 },
};

// Generate realistic price with volatility
function generateRealisticPrice(basePrice, volatility = 0.02) {
  const deviation = (Math.random() - 0.5) * 2 * volatility;
  const trend = 0.0002; // Slight uptrend
  const change = 1 + deviation + trend;
  return Math.round(basePrice * change * 100) / 100;
}

// Fetch from Alpha Vantage API (fallback to mock if unavailable)
async function fetchFromAlphaVantage(symbol) {
  try {
    const apiKey = process.env.ALPHA_VANTAGE_API_KEY;
    if (!apiKey) {
      console.log(`No Alpha Vantage API key. Using simulated data for ${symbol}`);
      return null;
    }

    const response = await axios.get(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`,
      { timeout: 5000 }
    );

    if (response.data && response.data["Global Quote"] && response.data["Global Quote"]["05. price"]) {
      return {
        price: parseFloat(response.data["Global Quote"]["05. price"]),
        changePercent: parseFloat(response.data["Global Quote"]["10. change percent"]) || 0,
      };
    }
  } catch (error) {
    console.log(`Alpha Vantage API error: ${error.message}`);
  }
  return null;
}

// Get all stocks with current prices
export async function getAllStocks() {
  const now = Date.now();

  // Return cached data if fresh (within 1 minute)
  if (priceCache.timestamp && now - priceCache.timestamp < priceCache.updateInterval) {
    return Object.keys(STOCKS).map((symbol) => ({
      symbol,
      name: STOCKS[symbol].name,
      price: priceCache.data[symbol]?.price || STOCKS[symbol].basePrice,
      changePercent: priceCache.data[symbol]?.changePercent || 0,
      change: (priceCache.data[symbol]?.price || STOCKS[symbol].basePrice) - STOCKS[symbol].basePrice,
    }));
  }

  // Update cache with new prices
  const updatedPrices = {};

  for (const symbol of Object.keys(STOCKS)) {
    // Try to fetch real data first
    const apiData = await fetchFromAlphaVantage(symbol);

    if (apiData) {
      updatedPrices[symbol] = apiData;
    } else {
      // Use simulated price with realistic movement
      const price = generateRealisticPrice(STOCKS[symbol].basePrice);
      const change = price - STOCKS[symbol].basePrice;
      const changePercent = (change / STOCKS[symbol].basePrice) * 100;

      updatedPrices[symbol] = {
        price: Math.round(price * 100) / 100,
        changePercent: Math.round(changePercent * 100) / 100,
      };
    }
  }

  priceCache.data = updatedPrices;
  priceCache.timestamp = now;

  return Object.keys(STOCKS).map((symbol) => ({
    symbol,
    name: STOCKS[symbol].name,
    price: updatedPrices[symbol].price,
    changePercent: updatedPrices[symbol].changePercent,
    change: updatedPrices[symbol].price - STOCKS[symbol].basePrice,
  }));
}

// Get single stock price
export async function getStockPrice(symbol) {
  const stocks = await getAllStocks();
  const stock = stocks.find((s) => s.symbol === symbol);
  return stock || null;
}

// Get multiple stocks
export async function getStocks(symbols) {
  const allStocks = await getAllStocks();
  if (!symbols || symbols.length === 0) {
    return allStocks;
  }
  return allStocks.filter((s) => symbols.includes(s.symbol));
}
