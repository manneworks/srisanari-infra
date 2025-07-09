'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface BlogPost {
  id: string;
  title: string;
  blogdescription: string;
  excerpt: string;
  image: string;
  date: string;
  readTime: string;
  category: string;
  slug: string;
  authorName?: string;
  fullContent?: string;
  tags?: string[];
  socialMediaLinks?: Record<string, string>;
  recentArticles?: string[];
  categories?: string[];
}

interface BlogCardProps {
  post: BlogPost;
}


export default function BlogsPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);



  useEffect(() => {
    let isMounted = true;
    const abortController = new AbortController();
    const timeoutId = setTimeout(() => abortController.abort(), 10000); // 10s timeout

    const fetchBlogPosts = async () => {
      if (!isMounted) return;
      
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch('/api/blogs', {
          signal: abortController.signal,
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
          },
        });
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (!result || !Array.isArray(result.data)) {
          throw new Error('Invalid response format');
        }
        
        // Sanitize the data before setting state
        const sanitizedPosts = result.data.map((post: any) => ({
          id: String(post.id || ''),
          title: String(post.title || 'Untitled Post'),
          description: String(post.description || ''),
          excerpt: String(post.excerpt || ''),
          image: post.image ? String(post.image) : null,
          date: post.date ? String(post.date) : 'No date',
          readTime: post.readTime ? String(post.readTime) : '2 min read',
          category: post.category ? String(post.category) : 'Uncategorized',
          slug: post.slug ? String(post.slug) : `post-${post.id || 'unknown'}`,
        }));
        
        if (isMounted) {
          setBlogPosts(sanitizedPosts);
        }
      } catch (err) {
        if (isMounted) {
          const errorMessage = err instanceof Error && err.name !== 'AbortError'
            ? `Failed to load blog posts: ${err.message}`
            : 'Request timed out. Please check your connection and try again.';
          
          setError(errorMessage);
          
          if (process.env.NODE_ENV === 'development') {
            console.error('Blog posts fetch error:', err);
          }
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
          clearTimeout(timeoutId);
        }
      }
    };

    fetchBlogPosts();
    
    return () => {
      isMounted = false;
      abortController.abort();
      clearTimeout(timeoutId);
    };
  }, []);

  const filteredPosts = selectedCategory
    ? blogPosts.filter(post => 
        post.category && post.category.toLowerCase() === selectedCategory.toLowerCase()
      )
    : blogPosts;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Something went wrong</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }
  

  return (
    
    <>
    
    <div className="pt-20">
      {/* Hero Section - Matches Projects Page */}
      <section className="section-padding bg-navy text-white">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Blog</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Insights, trends, and updates from the world of real estate and property investment
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="section-padding bg-light">
        <div className="container">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-gray-700">No blog posts found</h2>
              <p className="text-gray-500 mt-2">Check back later for new articles.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (


                <div key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full">
                  <div className="relative h-48 sm:h-52 overflow-hidden">
                    <Image 
                      src={post.image || '/images/placeholder-blog.jpg'} 
                      alt={post.title} 
                      fill 
                      className="object-cover transition-transform duration-500 hover:scale-105"
                      sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent">
                      {post.category && (
                        <span className="absolute top-3 left-3 bg-black/70 text-white px-2.5 py-0.5 rounded-full text-xs sm:text-sm font-medium">
                          {post.category}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 md:p-6 flex-1 flex flex-col">
                    <div className="flex items-center text-xs text-gray-500 mb-2">
                      <span>{post.date}</span>
                      <span className="mx-2">•</span>
                      <span>{post.readTime || '5 min read'}</span>
                    </div>
                    
                    <h3 className="text-lg sm:text-xl font-bold mb-2 text-navy-blue line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <div className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {post.blogdescription || post.excerpt || 'No description available'}
                    </div>
                    
                    <div className="mt-auto pt-4 border-t border-gray-100">
                      <Link 
                        href={`/blogs/${post.slug || post.id}`}
                        className="inline-flex items-center font-heading text-gray-900 hover:text-yellow-600 font-semibold text-sm uppercase tracking-wider transition-colors"
                      >
                        Read more
                        <svg 
                          className="w-4 h-4 ml-1.5" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M14 5l7 7m0 0l-7 7m7-7H3" 
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Newsletter Subscription Card */}
          <div className="max-w-4xl mx-auto mt-16 bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-8 text-center">
              <h2 className="text-2xl font-bold text-navy-blue mb-3">Subscribe to Our Newsletter</h2>
              <p className="text-gray-600 mb-6">Get the latest updates, news and product offers</p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-yellow focus:border-transparent"
                />
                <button className="btn btn-primary font-heading font-semibold tracking-wider">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
