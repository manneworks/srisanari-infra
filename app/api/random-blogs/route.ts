import { NextResponse } from 'next/server';
import { getBlogPosts } from '@/data/blogs';

export async function GET(request: Request) {
  try {
    const blogPosts = await getBlogPosts();
    
    // Get 3 random articles
    const randomArticles = blogPosts
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    return NextResponse.json(randomArticles);
  } catch (error) {
    console.error('Error fetching random articles:', error);
    return NextResponse.json(
      { error: 'Failed to fetch random articles' },
      { status: 500 }
    );
  }
}
