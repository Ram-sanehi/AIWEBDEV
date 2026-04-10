// Stock Price API Client
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

export async function fetchAllStocks() {
  try {
    const response = await fetch(`${API_BASE_URL}/stocks`);
    if (!response.ok) throw new Error('Failed to fetch stocks');
    return await response.json();
  } catch (error) {
    console.error('Error fetching stocks:', error);
    // Return mock data as fallback
    return getMockStocks();
  }
}

export async function fetchStockPrice(symbol) {
  try {
    const response = await fetch(`${API_BASE_URL}/stocks/${symbol}`);
    if (!response.ok) throw new Error(`Failed to fetch stock ${symbol}`);
    return await response.json();
  } catch (error) {
    console.error(`Error fetching stock ${symbol}:`, error);
    return null;
  }
}

export async function fetchStocksBySymbols(symbols) {
  try {
    const response = await fetch(`${API_BASE_URL}/stocks/bulk?symbols=${symbols.join(',')}`);
    if (!response.ok) throw new Error('Failed to fetch stocks');
    return await response.json();
  } catch (error) {
    console.error('Error fetching stocks:', error);
    return getMockStocks().filter(s => symbols.includes(s.symbol));
  }
}

// Fallback mock data
function getMockStocks() {
  return [
    { symbol: "RELIANCE", name: "Reliance Industries", price: 2890.50, changePercent: 0.32, change: 9.15 },
    { symbol: "TCS", name: "Tata Consultancy", price: 4120.75, changePercent: -1.08, change: -45.10 },
    { symbol: "HDFCBANK", name: "HDFC Bank", price: 1945.80, changePercent: 1.50, change: 28.75 },
    { symbol: "INFY", name: "Infosys Limited", price: 1678.35, changePercent: 2.17, change: 35.60 },
    { symbol: "ICICIBANK", name: "ICICI Bank", price: 1234.20, changePercent: 1.25, change: 15.20 },
    { symbol: "BHARTIARTL", name: "Bharti Airtel", price: 1456.90, changePercent: 2.70, change: 38.30 },
    { symbol: "SBIN", name: "State Bank of India", price: 845.30, changePercent: 3.03, change: 24.85 },
    { symbol: "WIPRO", name: "Wipro Limited", price: 685.45, changePercent: 2.71, change: 18.15 },
    { symbol: "SENSEX", name: "BSE Sensex", price: 77234.56, changePercent: 0.32, change: 234.56 },
    { symbol: "NIFTY", name: "Nifty 50", price: 23456.45, changePercent: 0.62, change: 145.23 },
  ];
}
