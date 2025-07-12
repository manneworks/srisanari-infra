"use client"

import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, User, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import React, { useState, useEffect } from "react";
import { BlogPost } from '@/data/blogs';

import { getBlogPostBySlug, getBlogPosts } from '@/data/blogs';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { Document } from '@contentful/rich-text-types';

export default function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = React.use(params);
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<BlogPost[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const fetchBlogPost = async () => {
      const post = await getBlogPostBySlug(unwrappedParams.id);
      setBlogPost(post);
    };
    fetchBlogPost();
  }, [unwrappedParams]);

  if (!blogPost) {
    return null;
  }

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query.trim() === "") {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const allPosts = await getBlogPosts();
    const filteredPosts = allPosts.filter(post =>
      post.title.toLowerCase().includes(query) ||
      post.blogdescription.toLowerCase().includes(query)
    );
    setSearchResults(filteredPosts);
    setIsSearching(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero/Banner Section */}
      <section className="pt-24 pb-10 sm:pt-28 sm:pb-12 md:pt-36 md:pb-20 bg-navy text-white relative z-10">
        <div className="container relative h-full flex flex-col justify-center px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="flex items-center justify-center mb-4">
              <Link href="/blogs" className="group flex items-center text-white hover:text-primary-yellow transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="text-sm font-medium">Back to Blogs</span>
              </Link>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 font-heading">
              {blogPost.title}
            </h1>
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-200">
              <span className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                {blogPost.authorName || "Unknown Author"}
              </span>
              <span className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {blogPost.date}
              </span>
              <span className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {blogPost.readTime}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Search Results Overlay */}
      {searchResults.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-4 sm:p-6 w-full max-w-sm sm:max-w-2xl shadow-lg">
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-bold">Search Results</h3>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSearchResults([]);
                }}
                className="text-gray-500 hover:text-gray-700 transition-colors p-2"
              >
                <svg className="h-4 w-4 sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-3 sm:space-y-4">
              {searchResults.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blogs/${post.slug}`}
                  className="block hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="p-3 sm:p-4">
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                      <div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 overflow-hidden rounded-lg bg-gray-100">
                        <img
                          src={post.image || "/images/blog/green-buildings.jpg"}
                          alt={post.title}
                          className="object-cover w-full h-full"
                          width={80}
                          height={80}
                          loading="lazy"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 line-clamp-2 text-sm sm:text-base">{post.title}</h4>
                        <p className="text-xs sm:text-sm text-gray-500 line-clamp-2">{post.blogdescription}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}



      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8 sm:py-12 md:py-16 lg:py-20 flex-1">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Main Content */}
            <main className="w-full lg:w-2/3">
              {/* Search */}
              <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-yellow focus:border-transparent"
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-navy">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </div>

              <article className="prose max-w-none w-full mt-4 sm:mt-0">
                <div className="bg-white rounded-xl shadow-md p-5 sm:p-6 md:p-8 lg:p-10">
                  {blogPost.fullContent && (
                    <div className="prose max-w-none">
                      <div 
                        dangerouslySetInnerHTML={{ 
                          __html: documentToHtmlString(blogPost.fullContent as Document, {
                            renderNode: {
                              'heading-1': (node, next) => `<h1 class="text-3xl font-bold mb-6">${next(node.content)}</h1>`,
                              'heading-2': (node, next) => `<h2 class="text-2xl font-semibold mb-4">${next(node.content)}</h2>`,
                              'heading-3': (node, next) => `<h3 class="text-xl font-medium mb-3">${next(node.content)}</h3>`,
                              'heading-4': (node, next) => `<h4 class="text-lg font-medium mb-2">${next(node.content)}</h4>`,
                              'heading-5': (node, next) => `<h5 class="text-base font-medium mb-1">${next(node.content)}</h5>`,
                              'heading-6': (node, next) => `<h6 class="text-sm font-medium mb-1">${next(node.content)}</h6>`
                            }
                          })
                        }}
                      />
                    </div>
                  )}
                  
                  {/* Tags */}
                  {blogPost.tags && blogPost.tags.length > 0 && (
                    <div className="mt-12 pt-8 border-t border-gray-200">
                      <h3 className="text-lg font-semibold mb-4">Tags</h3>
                      <div className="flex flex-wrap gap-2 -mx-1">
                        {blogPost.tags.map((tag, index) => (
                          <span key={index} className="inline-block bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full mx-1 my-1">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Share Buttons */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h4 className="text-lg font-semibold mb-4">Share This Post</h4>
                    <div className="flex space-x-4">
                      <button className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors">
                        <Facebook className="h-5 w-5" />
                      </button>
                      <button className="w-10 h-10 rounded-full bg-sky-500 text-white flex items-center justify-center hover:bg-sky-600 transition-colors">
                        <Twitter className="h-5 w-5" />
                      </button>
                      <button className="w-10 h-10 rounded-full bg-blue-700 text-white flex items-center justify-center hover:bg-blue-800 transition-colors">
                        <Linkedin className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </article>

              {/* Related Posts */}
              <div className="mt-16">
                <h3 className="text-2xl font-bold mb-8">You May Also Like Recent Articles</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {(blogPost.recentArticles || []).map((article, index) => {
                    const articleFields = article.fields || {};
                    return (
                      <Link key={articleFields.slug} href={`/blogs/${articleFields.slug}`} className="group">
                        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                          <div className="h-48 relative">
                            <Image
                              src={articleFields.coverImage?.fields?.file?.url || "/images/blog/green-buildings.jpg"}
                              alt={articleFields.title || 'Article'}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="p-6">
                            <h4 className="text-lg font-semibold mb-2 group-hover:text-primary-yellow transition-colors">
                              {articleFields.title || 'Untitled Article'}
                            </h4>
                            <p className="text-sm text-gray-500">{articleFields.publishDate ? new Date(articleFields.publishDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </main>

            {/* Sidebar */}
            <aside className="w-full lg:w-1/3 space-y-6 sm:space-y-8 mt-6 sm:mt-10 lg:mt-0">


               {/* Related Articles */}
               <div className="bg-white rounded-xl shadow-md overflow-hidden">
                 <div className="p-6">
                   <h3 className="text-xl font-semibold mb-4">Related Articles</h3>
                   <div className="space-y-5">
                      {blogPost.recentArticles?.map((article) => (
                        <Link key={article.fields.slug} href={`/blogs/${article.fields.slug}`} className="flex gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0 hover:bg-gray-50 transition-colors">
                         <div className="flex-shrink-0 w-20 h-20 overflow-hidden rounded-lg">
                           <img
                             src={article.fields.coverImage?.fields?.file?.url || "/images/blog/green-buildings.jpg"}
                             alt={article.fields.title}
                             width={80}
                             height={80}
                             className="object-cover w-full h-full"
                           />
                         </div>
                         <div className="flex-1 min-w-0">
                           <h4 className="font-medium text-gray-800 leading-tight line-clamp-2">
                             {article.fields.title}
                           </h4>
                           <p className="text-sm text-gray-500 mt-1 line-clamp-1">{article.fields.blogDescription}</p>
                           <span className="text-xs text-gray-400 mt-1 block">{new Date(article.fields.publishDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                         </div>
                       </Link>
                     ))}
                   </div>
                 </div>
                 <div className="bg-gray-50 px-6 py-3 text-center">
                   <a href="/blogs" className="text-sm font-medium text-navy hover:text-navy-dark transition-colors">
                     View All Articles →
                   </a>
                 </div>
               </div>

               {/* Categories */}
               <div className="bg-white rounded-xl shadow-md p-6">
                 <h3 className="text-xl font-semibold mb-4 text-center">Categories</h3>
                 <div className="bg-gray-50 p-4 rounded-lg text-center border border-gray-100">
                   <p className="text-base font-medium text-gray-700">Investment</p>
                   <p className="text-base font-medium text-gray-700">Market Trends</p>
                   <p className="text-base font-medium text-gray-700">Home Buying</p>
                   <p className="text-base font-medium text-gray-700">Interior Design</p>
                   <p className="text-base font-medium text-gray-700">Property Management</p>
                 </div>
               </div>

              {/* Follow Us */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors">
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-sky-500 text-white flex items-center justify-center hover:bg-sky-600 transition-colors">
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-blue-700 text-white flex items-center justify-center hover:bg-blue-800 transition-colors">
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-pink-600 text-white flex items-center justify-center hover:bg-pink-700 transition-colors">
                    <Instagram className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
      
      {/* Footer Spacer */}
      <div className="h-12 sm:h-16 md:h-20 bg-transparent"></div>
    </div>
  );
}
