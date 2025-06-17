"use client";

import { useState } from 'react';
import Image from 'next/image';
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt, FaArrowRight, FaStar } from 'react-icons/fa';

interface Property {
  id: number;
  title: string;
  type: string;
  price: string;
  location: string;
  beds: number;
  baths: number;
  area: string;
  image: string;
  featured?: boolean;
  rating: number;
  status: 'sale' | 'rent' | 'sold';
}

const PropertiesSection = () => {
  const [activeTab, setActiveTab] = useState('all');
  
  const properties: Property[] = [
    {
      id: 1,
      title: 'Luxury Villa in Gachibowli',
      type: 'villa',
      price: '₹4.5 Cr',
      location: 'Gachibowli, Hyderabad',
      beds: 4,
      baths: 3,
      area: '5000 sq.ft',
      image: '/images/property-1.jpg',
      featured: true,
      rating: 4.8,
      status: 'sale'
    },
    {
      id: 2,
      title: 'Premium Apartment in HITEC City',
      type: 'apartment',
      price: '₹2.2 Cr',
      location: 'HITEC City, Hyderabad',
      beds: 3,
      baths: 2,
      area: '1800 sq.ft',
      image: '/images/property-2.jpg',
      rating: 4.5,
      status: 'sale'
    },
    {
      id: 3,
      title: 'Luxury Villa in Financial District',
      type: 'villa',
      price: '₹5.2 Cr',
      location: 'Financial District, Hyderabad',
      beds: 5,
      baths: 4,
      area: '6000 sq.ft',
      image: '/images/property-3.jpg',
      featured: true,
      rating: 4.9,
      status: 'sale'
    },
    {
      id: 4,
      title: 'Modern Apartment in Gachibowli',
      type: 'apartment',
      price: '₹1.8 Cr',
      location: 'Gachibowli, Hyderabad',
      beds: 2,
      baths: 2,
      area: '1500 sq.ft',
      image: '/images/property-4.jpg',
      rating: 4.3,
      status: 'rent'
    },
  ];

  const filteredProperties = activeTab === 'all' 
    ? properties 
    : properties.filter(property => property.type === activeTab);

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'sale':
        return 'bg-green-100 text-green-800';
      case 'rent':
        return 'bg-blue-100 text-blue-800';
      case 'sold':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#212d45] mb-4">Featured <span className="text-[#ffc03d]">Properties</span></h2>
          <div className="w-24 h-1 bg-[#ffc03d] mx-auto mb-2"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our exclusive selection of premium properties in Hyderabad's most sought-after locations
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 bg-gray-100 p-1 rounded-full max-w-2xl mx-auto">
          {[
            { id: 'all', label: 'All Properties' },
            { id: 'villa', label: 'Villas' },
            { id: 'apartment', label: 'Apartments' },
            { id: 'plot', label: 'Plots' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2 rounded-full font-medium text-sm md:text-base transition-all ${
                activeTab === tab.id
                  ? 'bg-[#ffc03d] text-[#212d45] font-bold shadow-md'
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProperties.map(property => (
            <div 
              key={property.id} 
              className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#ffc03d]/30"
            >
              <div className="relative h-56">
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {property.featured && (
                  <div className="absolute top-4 left-4 bg-[#ffc03d] text-[#212d45] text-xs font-bold px-3 py-1 rounded-full flex items-center">
                    <FaStar className="mr-1" />
                    <span>Featured</span>
                  </div>
                )}
                <div className="absolute bottom-4 right-4">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusBadge(property.status)}`}>
                    {property.status.toUpperCase()}
                  </span>
                </div>
              </div>
              
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-[#212d45] group-hover:text-[#ffc03d] transition-colors">
                    {property.title}
                  </h3>
                  <div className="flex items-center bg-[#ffc03d] text-[#212d45] text-xs font-bold px-2 py-1 rounded">
                    <FaStar className="mr-1" />
                    <span>{property.rating}</span>
                  </div>
                </div>
                
                <div className="flex items-center text-gray-500 text-sm mb-4">
                  <FaMapMarkerAlt className="mr-1 text-[#ffc03d]" />
                  <span>{property.location}</span>
                </div>
                
                <div className="flex justify-between border-t border-gray-100 pt-4 mt-4 text-sm">
                  <div className="flex flex-col items-center">
                    <FaBed className="text-[#ffc03d] mb-1" />
                    <span className="text-gray-600">{property.beds} Beds</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <FaBath className="text-[#ffc03d] mb-1" />
                    <span className="text-gray-600">{property.baths} Baths</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <FaRulerCombined className="text-[#ffc03d] mb-1" />
                    <span className="text-gray-600">{property.area}</span>
                  </div>
                </div>
                
                <div className="mt-5 pt-4 border-t border-gray-100 flex justify-between items-center">
                  <div>
                    <span className="text-2xl font-bold text-[#212d45]">{property.price}</span>
                    {property.status === 'rent' && <span className="text-gray-500 text-sm">/month</span>}
                  </div>
                  <button className="bg-[#212d45] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[#ffc03d] hover:text-[#212d45] transition-colors flex items-center">
                    View <FaArrowRight className="ml-1 text-xs" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-14">
          <button className="bg-transparent border-2 border-[#212d45] text-[#212d45] px-8 py-3 rounded-full font-medium hover:bg-[#212d45] hover:text-white transition-colors flex items-center mx-auto group">
            View All Properties
            <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default PropertiesSection;
