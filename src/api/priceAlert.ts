const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export interface PriceAlert {
  stock_symbol: string;
  stock_name: string;
  target_price: number;
  alert_type: 'above' | 'below';
  alert_email: string;
}

export async function createPriceAlert(data: PriceAlert) {
  const response = await fetch(`${API_URL}/price-alerts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || 'Failed to create price alert');
  }

  return result;
}

export async function getPriceAlerts(email?: string) {
  const url = email
    ? `${API_URL}/price-alerts?email=${encodeURIComponent(email)}`
    : `${API_URL}/price-alerts`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch price alerts');
  }

  return response.json();
}

export async function triggerPriceAlert(id: string) {
  const response = await fetch(`${API_URL}/price-alerts/${id}/trigger`, {
    method: 'PUT',
  });

  if (!response.ok) {
    throw new Error('Failed to update alert');
  }

  return response.json();
}
