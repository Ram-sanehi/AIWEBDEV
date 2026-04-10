const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export async function submitContactForm(data: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}) {
  const response = await fetch(`${API_URL}/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || 'Failed to submit contact form');
  }

  return result;
}
