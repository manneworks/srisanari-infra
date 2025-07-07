import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, User, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

// Mock data - replace with actual data fetching
const blogPost = {
  id: 1,
  title: "Top 5 Real Estate Investment Tips for 2025",
  excerpt: "Discover the best strategies for investing in real estate this year and maximize your returns.",
  date: "June 15, 2025",
  readTime: "5 min read",
  category: "Investment",
  image: "/images/blog/investment-tips.jpg",
  author: {
    name: "John Doe",
    role: "Senior Real Estate Advisor",
    avatar: "/images/team/team-1.jpg"
  },
  content: `
    <p>Investing in real estate can be a lucrative venture if done correctly. Here are five essential tips to help you make the most of your real estate investments in 2025.</p>
    <h3 class="text-xl font-semibold mb-4 mt-6">1. Research the Market</h3>
    <p>Before making any investment, it's crucial to thoroughly research the local real estate market. Look for areas with growth potential, good infrastructure, and amenities.</p>
    <h3 class="text-xl font-semibold mb-4 mt-6">2. Set Clear Goals</h3>
    <p>Define your investment objectives clearly. Are you looking for rental income, long-term appreciation, or a quick flip? Your goals will determine your investment strategy.</p>
    <h3 class="text-xl font-semibold mb-4 mt-6">3. Consider Location Carefully</h3>
    <p>Location is everything in real estate. Look for properties in neighborhoods with strong growth potential, good schools, and access to transportation.</p>
    <h3 class="text-xl font-semibold mb-4 mt-6">4. Understand the Numbers</h3>
    <p>Crunch the numbers carefully. Consider all costs involved, including property taxes, maintenance, and potential vacancy rates.</p>
    <h3 class="text-xl font-semibold mb-4 mt-6">5. Build a Strong Network</h3>
    <p>Surround yourself with a team of professionals, including real estate agents, lawyers, and contractors who can help you make informed decisions.</p>
  `,
  tags: ["real estate", "investment", "2025", "property"],
  relatedPosts: [
    {
      id: 2,
      title: "The Future of Smart Homes in India",
      date: "May 28, 2025",
      image: "/images/blog/smart-homes.jpg"
    },
    {
      id: 3,
      title: "Sustainable Living: Green Buildings on the Rise",
      date: "May 10, 2025",
      image: "/images/blog/green-buildings.jpg"
    }
  ]
};

export default function BlogPostPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero/Banner Section */}
      <section className="pt-24 pb-10 sm:pt-28 sm:pb-12 md:pt-36 md:pb-20 bg-navy text-white relative z-10">
        <div className="absolute inset-0">
          <Image
            src={blogPost.image}
            alt={blogPost.title}
            fill
            className="object-cover opacity-70"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </div>
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
                {blogPost.author.name}
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

      {/* Mobile Search - Only visible on mobile */}
      <div className="lg:hidden bg-white py-4 px-4 shadow-sm sticky top-0 z-10">
        <div className="container mx-auto">
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-yellow focus:border-transparent"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-navy">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8 sm:py-12 md:py-16 lg:py-20 flex-1">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Main Content */}
            <main className="w-full lg:w-2/3">
              <article className="prose max-w-none w-full mt-4 sm:mt-0">
                <div className="bg-white rounded-xl shadow-md p-5 sm:p-6 md:p-8 lg:p-10">
                  <div 
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: blogPost.content }}
                  />
                  
                  {/* Tags */}
                  <div className="mt-12 pt-8 border-t border-gray-200">
                    <div className="flex flex-wrap gap-2 -mx-1">
                      {blogPost.tags.map((tag, index) => (
                        <span key={index} className="inline-block bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full mx-1 my-1">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

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
                <h3 className="text-2xl font-bold mb-8">You May Also Like</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {blogPost.relatedPosts.map((post) => (
                    <Link href={`/blogs/${post.id}`} key={post.id} className="group">
                      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="h-48 relative">
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="p-6">
                          <h4 className="text-lg font-semibold mb-2 group-hover:text-primary-yellow transition-colors">
                            {post.title}
                          </h4>
                          <p className="text-sm text-gray-500">{post.date}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </main>

            {/* Sidebar */}
            <aside className="w-full lg:w-1/3 space-y-6 sm:space-y-8 mt-6 sm:mt-10 lg:mt-0">
              {/* Desktop Search - Hidden on mobile */}
              <div className="hidden lg:block bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">Search</h3>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search articles..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-yellow focus:border-transparent"
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-navy">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Recent Articles */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Recent Articles</h3>
                  <div className="space-y-5">
                    {[
                      { 
                        id: 1, 
                        title: "5 Emerging Real Estate Markets in 2025",
                        excerpt: "Discover the top up-and-coming areas for real estate investment this year.",
                        date: "July 2, 2025",
                        image: "/images/blog/emerging-markets.jpg"
                      },
                      { 
                        id: 2, 
                        title: "Sustainable Living: Eco-Friendly Homes",
                        excerpt: "How green building practices are shaping the future of residential properties.",
                        date: "June 25, 2025",
                        image: "/images/blog/eco-homes.jpg"
                      },
                      { 
                        id: 3, 
                        title: "The Future of Urban Development",
                        excerpt: "Exploring the latest trends in city planning and smart communities.",
                        date: "June 18, 2025",
                        image: "/images/blog/urban-development.jpg"
                      },
                    ].map((article) => (
                      <div key={article.id} className="flex gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                        <div className="flex-shrink-0 w-20 h-20 overflow-hidden rounded-lg">
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                            </svg>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-800 leading-tight line-clamp-2">
                            {article.title}
                          </h4>
                          <p className="text-sm text-gray-500 mt-1 line-clamp-1">{article.excerpt}</p>
                          <span className="text-xs text-gray-400 mt-1 block">{article.date}</span>
                        </div>
                      </div>
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
                <h3 className="text-xl font-semibold mb-4">Categories</h3>
                <ul className="space-y-2">
                  {[
                    { name: "Investment", count: 12 },
                    { name: "Market Trends", count: 8 },
                    { name: "Home Buying", count: 15 },
                    { name: "Interior Design", count: 6 },
                    { name: "Property Management", count: 9 },
                  ].map((category, index) => (
                    <li key={index} className="flex justify-between items-center">
                      <span className="text-gray-700">
                        {category.name}
                      </span>
                      <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                        {category.count}
                      </span>
                    </li>
                  ))}
                </ul>
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
