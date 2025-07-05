import Image from 'next/image';
import Link from 'next/link';
import { topProperties } from '@/constants/properties';
import { notFound } from 'next/navigation';
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt } from 'react-icons/fa';

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
  const property = topProperties.find(p => p.id === params.id);
  
  if (!property) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Property Header */}
      <div className="relative h-96 w-full">
        <Image
          src={property.image}
          alt={property.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40">
          <div className="container mx-auto px-4 h-full flex items-end pb-16">
            <div className="text-white max-w-4xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-3 font-heading">{property.title}</h1>
              <div className="flex flex-wrap items-center gap-3 pb-4">
                <span className="flex items-center bg-black/50 px-2.5 py-1 rounded-full text-xs md:text-sm">
                  <FaMapMarkerAlt className="mr-1.5 h-3 w-3" />
                  {property.location}
                </span>
                <span className="text-lg font-bold text-primary-yellow bg-black/50 px-3 py-1 rounded-full">
                  ₹{property.price.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Property Details */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-8">
                <h2 className="text-2xl font-bold mb-6 text-navy-blue font-heading border-b pb-4">Property Details</h2>
                <p className="text-gray-700 mb-8 font-sans leading-relaxed">{property.description}</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                  <div className="bg-gray-50 p-5 rounded-lg text-center hover:shadow-md transition-shadow duration-300">
                    <FaBed className="w-7 h-7 mx-auto text-primary-yellow mb-3" />
                    <span className="text-gray-800 font-medium text-lg">{property.bedrooms} Bedrooms</span>
                  </div>
                  <div className="bg-gray-50 p-5 rounded-lg text-center hover:shadow-md transition-shadow duration-300">
                    <FaBath className="w-7 h-7 mx-auto text-primary-yellow mb-3" />
                    <span className="text-gray-800 font-medium text-lg">{property.bathrooms} Bathrooms</span>
                  </div>
                  <div className="bg-gray-50 p-5 rounded-lg text-center hover:shadow-md transition-shadow duration-300">
                    <FaRulerCombined className="w-7 h-7 mx-auto text-primary-yellow mb-3" />
                    <span className="text-gray-800 font-medium text-lg">{property.area} sq.ft</span>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-6">
                  <h3 className="text-xl font-semibold mb-6 text-navy-blue font-heading">Key Features</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {property.features?.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <div className="flex-shrink-0 mt-1 w-2 h-2 rounded-full bg-primary-yellow mr-3"></div>
                        <span className="text-gray-700 font-sans">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden sticky top-6">
              <div className="bg-navy-blue p-6">
                <h3 className="text-2xl font-bold text-white font-heading">Request Information</h3>
                <p className="text-gray-200 mt-1 text-sm">Fill out the form and our team will get back to you shortly</p>
              </div>
              
              <form className="p-6 space-y-5">
                <div className="space-y-1">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Your Name</label>
                  <input
                    id="name"
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-yellow focus:border-transparent transition-all"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Your Email</label>
                  <input
                    id="email"
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-yellow focus:border-transparent transition-all"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <input
                    id="phone"
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-yellow focus:border-transparent transition-all"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">Your Message</label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-yellow focus:border-transparent transition-all"
                    placeholder="I'm interested in this property..."
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary-yellow hover:bg-opacity-90 text-navy-blue font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Properties Link */}
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-4 text-center">
          <Link 
            href="/#top-properties" 
            className="text-navy-blue hover:text-primary-yellow transition-colors font-bold font-heading"
            scroll={false}
          >
            Back to Properties
          </Link>
        </div>
      </div>
    </div>
  );
}
