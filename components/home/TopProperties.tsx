'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { topProperties } from '@/constants/properties';
import { Property } from '@/types';
import { PropertyCardSkeleton } from './PropertyCardSkeleton';

export default function TopProperties() {
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState<Property[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call
    const fetchProperties = async () => {
      try {
        setLoading(true);
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setProperties(topProperties);
      } catch (err) {
        setError('Failed to load properties. Please try again later.');
        console.error('Error fetching properties:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (error) {
    return (
      <section className="section-padding bg-light">
        <div className="container text-center">
          <div role="alert" className="text-red-600">
            {error}
          </div>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            aria-label="Retry loading properties"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  return (
    <section 
      className="section-padding bg-light"
      aria-labelledby="top-properties-heading"
    >
      <div className="container">
        <div className="text-center mb-12">
          <h2 id="top-properties-heading" className="text-3xl font-bold mb-4 text-navy-blue">
            Top Properties
          </h2>
          <p className="text-gray-600 text-lg">Explore our best property offerings</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <PropertyCardSkeleton key={index} />
            ))}
          </div>
        ) : (
          <div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            role="list"
            aria-label="List of top properties"
          >
            {properties.map((property) => (
              <div
                key={property.id}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100"
                role="listitem"
                aria-labelledby={`property-${property.id}-title`}
              >
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 z-10"></div>
                  <Image
                    src={property.image}
                    alt={property.alt || property.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={false}
                    loading="lazy"
                  />
                </div>
                <div className="p-6 flex flex-col h-[calc(100%-12rem)]">
                  <h3 
                    id={`property-${property.id}-title`}
                    className="text-xl font-bold mb-3 text-navy-blue"
                  >
                    {property.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed flex-grow">{property.description}</p>
                  <div className="mt-auto">
                    <Link
                      href={property.link}
                      className="inline-block px-5 py-2.5 bg-navy text-white font-medium rounded-xl hover:bg-opacity-90 transition-all duration-200 hover:shadow-sm active:scale-95"
                      aria-label={`View details for ${property.title}`}
                    >
                      View Properties
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
