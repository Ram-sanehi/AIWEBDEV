const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export interface PortfolioSimulation {
  stock_symbol: string;
  stock_name: string;
  amount_invested: number;
  buy_date: string;
  buy_price: number;
  current_price: number;
  profit_loss: number;
  profit_loss_pct: number;
}

export async function savePortfolioSimulation(data: PortfolioSimulation) {
  const response = await fetch(`${API_URL}/portfolio`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || 'Failed to save simulation');
  }

  return result;
}

export async function getPortfolioSimulations(limit = 10) {
  const response = await fetch(`${API_URL}/portfolio?limit=${limit}`);

  if (!response.ok) {
    throw new Error('Failed to fetch simulations');
  }

  return response.json();
}
