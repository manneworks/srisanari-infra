import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

// Mock blog posts data - replace with your actual data source
const blogPosts = [
  {
    id: 1,
    title: "Top 5 Real Estate Investment Tips for 2025",
    excerpt: "Discover the best strategies for investing in real estate this year and maximize your returns.",
    date: "June 15, 2025",
    readTime: "5 min read",
    category: "Investment",
    image: "/images/blog/investment-tips.jpg"
  },
  {
    id: 2,
    title: "The Future of Smart Homes in India",
    excerpt: "Explore how smart home technology is transforming the real estate market in India.",
    date: "May 28, 2025",
    readTime: "4 min read",
    category: "Technology",
    image: "/images/blog/smart-homes.jpg"
  },
  {
    id: 3,
    title: "Sustainable Living: Green Buildings on the Rise",
    excerpt: "Learn about the growing trend of eco-friendly construction and sustainable living spaces.",
    date: "May 10, 2025",
    readTime: "6 min read",
    category: "Sustainability",
    image: "/images/blog/green-buildings.jpg"
  },
];

export default function BlogsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="pt-28 pb-12 md:pt-40 md:pb-24 bg-navy text-white relative z-10">
        <div className="container px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 font-heading">Our Blog</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Insights, trends, and updates from the world of real estate and property investment
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <div className="container mx-auto px-6 lg:px-8 py-12 md:py-16 lg:py-24 -mt-6 md:mt-0 relative z-0">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {blogPosts.map((post) => (
              <article key={post.id} className="flex flex-col h-full bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 mt-8 md:mt-0">
                <div className="h-56 lg:h-64 relative flex-shrink-0">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="flex flex-col flex-grow p-6 md:p-7 lg:p-8">
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 font-heading leading-tight">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="mt-auto pt-4">
                    <Link 
                      href={`/blogs/${post.id}`}
                      className="text-navy-blue font-semibold inline-flex items-center hover:text-primary-yellow transition-colors group"
                    >
                      Read More 
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-16 mb-8 md:mt-16 md:mb-10 lg:mb-12 max-w-5xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 md:p-10 lg:p-12 border border-gray-100">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 font-heading">
                Subscribe to Our Newsletter
              </h2>
              <p className="text-gray-600 mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed">
                Stay updated with the latest real estate trends, investment tips, and property news.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-5 py-3.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-yellow focus:border-transparent text-gray-700 placeholder-gray-400"
                />
                <button className="bg-navy-blue hover:bg-opacity-90 text-white px-8 py-3.5 rounded-lg font-semibold transition-colors whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
