const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  image: string;
  published_at: string;
}

export async function getBlogPosts(params?: { category?: string; search?: string }) {
  const url = new URL(`${API_URL}/blog`);

  if (params?.category) {
    url.searchParams.set('category', params.category);
  }
  if (params?.search) {
    url.searchParams.set('search', params.search);
  }

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error('Failed to fetch blog posts');
  }

  return response.json() as Promise<BlogPost[]>;
}

export async function getBlogPost(id: string) {
  const response = await fetch(`${API_URL}/blog/${id}`);

  if (!response.ok) {
    if (response.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch blog post');
  }

  return response.json() as Promise<BlogPost>;
}
