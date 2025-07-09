import { NextResponse } from 'next/server';
import { getBlogPosts } from '@/data/blogs';

// Disable body parsing for GET requests
// This is a security best practice for read-only endpoints
export const config = {
  api: {
    bodyParser: false,
  },
};

// Add security headers
const securityHeaders = {
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';",
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
};

export async function GET() {
  try {
    // Add rate limiting check here if needed
    
    const posts = await getBlogPosts();
    
    // Sanitize the response data
    const sanitizedPosts = posts.map(post => ({
      id: post.id,
      title: post.title,
      description: post.description,
      excerpt: post.excerpt,
      image: post.image,
      date: post.date,
      readTime: post.readTime,
      category: post.category,
      slug: post.slug,
      // Add any other non-sensitive fields here
    }));

    const response = NextResponse.json({ 
      success: true, 
      data: sanitizedPosts,
      timestamp: new Date().toISOString()
    });

    // Add security headers to the response
    Object.entries(securityHeaders).forEach(([key, value]) => {
      response.headers.set(key, value);
    });

    return response;
  } catch (error) {
    // Don't leak error details in production
    const errorMessage = process.env.NODE_ENV === 'development' 
      ? error instanceof Error ? error.message : 'Unknown error occurred'
      : 'Failed to fetch blog posts';
    
    console.error('Blog posts fetch error:', error);
    
    const response = NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
    
    // Add security headers to error response too
    Object.entries(securityHeaders).forEach(([key, value]) => {
      response.headers.set(key, value);
    });
    
    return response;
  }
}

// Ensure we get fresh data on each request
export const dynamic = 'force-dynamic';

// Optionally add revalidation if you want to cache the response
// export const revalidate = 3600; // 1 hour
