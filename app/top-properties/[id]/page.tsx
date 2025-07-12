'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaMapMarkerAlt, FaArrowLeft, FaBed, FaBath, FaRulerCombined, FaPhone, FaShareAlt, FaEnvelope, FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';
import { topProperties } from '@/constants/properties';
import { notFound } from 'next/navigation';
import { Property } from '@/types';
import { Button } from '@/components/ui/button';

// Sample gallery images - replace with your actual image data
const galleryImages = [
  { id: 1, src: '/images/gallery1.jpg', alt: 'Property view 1' },
  { id: 2, src: '/images/gallery2.jpg', alt: 'Property view 2' },
  { id: 3, src: '/images/gallery3.jpg', alt: 'Property view 3' },
  { id: 4, src: '/images/gallery4.jpg', alt: 'Property view 4' },
  { id: 5, src: '/images/gallery5.jpg', alt: 'Property view 5' },
  { id: 6, src: '/images/gallery6.jpg', alt: 'Property view 6' },
];

export default function PropertyDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const property: Property | undefined = topProperties.find((p: Property) => p.id === params.id);
  
  // Only show the first 3 images in the main gallery
  const mainGalleryImages = galleryImages.slice(0, 3);
  // Only show remaining images in the popup
  const remainingImages = galleryImages.slice(3);

  const openGallery = () => {
    setCurrentImageIndex(0); // Reset to first image when opening
    setIsGalleryOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const closeGallery = () => {
    setIsGalleryOpen(false);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  const goToNext = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === remainingImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? remainingImages.length - 1 : prevIndex - 1
    );
  };
  
  if (!property) {
    notFound();
  }

  // Format price with Indian Rupee symbol and proper formatting
  const formattedPrice = property.price 
    ? `₹${property.price.toLocaleString('en-IN')}`
    : 'Price on request';
    
  // Set default values for optional fields
  const propertyWithDefaults = {
    ...property,
    location: property.location || 'Location not specified',
    bedrooms: property.bedrooms ?? 0,
    bathrooms: property.bathrooms ?? 0,
    area: property.area ?? 0,
    features: property.features || [
      'Premium location',
      'Excellent connectivity',
      'Modern infrastructure',
      'Secure environment',
      '24/7 water supply',
      'Power backup',
      'Parking space',
      'Green surroundings'
    ],
    alt: property.alt || '',
    description: property.description || 'Premium property with all modern amenities and excellent connectivity.'
  } as const;

  // Get property type specific details
  const getPropertyTypeDetails = () => {
    switch(property.id) {
      case 'commercial':
        return {
          type: 'Commercial',
          icon: '🏢',
          highlights: [
            'Prime business location',
            'High footfall area',
            'Ideal for retail and offices',
            'Excellent visibility'
          ]
        };
      case 'development':
        return {
          type: 'Development',
          icon: '🏗️',
          highlights: [
            'Ready for construction',
            'All approvals in place',
            'Infrastructure ready',
            'Flexible floor plans'
          ]
        };
      case 'residential':
        return {
          type: 'Residential',
          icon: '🏠',
          highlights: [
            'Gated community',
            'Modern amenities',
            'Peaceful surroundings',
            'Family-friendly environment'
          ]
        };
      case 'agriculture':
        return {
          type: 'Agricultural',
          icon: '🌾',
          highlights: [
            'Fertile land',
            'Water availability',
            'Good soil quality',
            'Suitable for various crops'
          ]
        };
      default:
        return {
          type: 'Premium',
          icon: '⭐',
          highlights: [
            'Prime location',
            'Excellent connectivity',
            'Modern infrastructure',
            'Secure environment'
          ]
        };
    }
  };

  const propertyType = getPropertyTypeDetails();

  return (
    <div className="min-h-screen bg-gray-50 font-sans pt-28 relative">
      {/* Gallery Modal */}
      {isGalleryOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <button 
            onClick={closeGallery}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            aria-label="Close gallery"
          >
            <FaTimes className="w-6 h-6" />
          </button>
          
          <button 
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            className="absolute left-4 md:left-8 p-2 text-white hover:bg-white/20 rounded-full transition-colors"
            aria-label="Previous image"
          >
            <FaChevronLeft className="w-6 h-6" />
          </button>
          
          <div className="relative w-full max-w-4xl h-[70vh] mx-12">
            {remainingImages.length > 0 ? (
              <Image
                src={remainingImages[currentImageIndex].src}
                alt={remainingImages[currentImageIndex].alt}
                fill
                className="object-contain"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white">
                No additional images available
              </div>
            )}
          </div>
          
          <button 
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            className="absolute right-4 md:right-8 p-2 text-white hover:bg-white/20 rounded-full transition-colors"
            aria-label="Next image"
          >
            <FaChevronRight className="w-6 h-6" />
          </button>
          
          {remainingImages.length > 0 && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
              {remainingImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}
      {/* Property Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Back Button */}
          <div className="p-4 border-b border-gray-100">
            <Button 
              variant="ghost" 
              onClick={() => router.push('/')}
              className="text-navy-blue hover:bg-gray-100 hover:text-navy-blue transition-colors flex items-center gap-2"
            >
              <FaArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Button>
          </div>
          
          {/* Property Header */}
          <div className="p-6 md:p-8 border-b border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-2 text-gray-600">
                  <FaMapMarkerAlt className="text-primary-yellow" />
                  <span>{propertyWithDefaults.location}</span>
                </div>
                {propertyWithDefaults.bedrooms > 0 && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <FaBed className="text-primary-yellow" />
                    <span>{propertyWithDefaults.bedrooms} Beds</span>
                  </div>
                )}
                {propertyWithDefaults.bathrooms > 0 && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <FaBath className="text-primary-yellow" />
                    <span>{propertyWithDefaults.bathrooms} Baths</span>
                  </div>
                )}
                {propertyWithDefaults.area > 0 && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <FaRulerCombined className="text-primary-yellow" />
                    <span>{propertyWithDefaults.area.toLocaleString()} sq.ft</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-gray-600">
                  <span className="text-primary-yellow">{propertyType.icon}</span>
                  <span>{propertyType.type}</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="text-sm text-gray-500 block">Price</span>
                  <div className="text-2xl font-bold text-navy-blue">
                    {formattedPrice}
                  </div>
                </div>
                <Button 
                  variant="outline"
                  size="icon"
                  className="rounded-full border-gray-200 text-navy-blue hover:bg-gray-50 hover:border-gray-300"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: property.title,
                        text: property.description,
                        url: window.location.href,
                      }).catch(console.error);
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                      alert('Link copied to clipboard!');
                    }
                  }}
                  aria-label="Share this property"
                >
                  <FaShareAlt className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Main Image */}
          <div className="relative aspect-video w-full">
            <Image
              src={property.image}
              alt={property.alt || property.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 80vw"
            />
          </div>
          
          {/* Description */}
          <div className="p-6 md:p-8 border-b border-gray-100">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-navy-blue mb-6 font-heading">Property Details</h2>
              <div className="prose prose-navy max-w-none">
                {propertyWithDefaults.description ? (
                  <div className="text-gray-700 leading-relaxed space-y-4">
                    {propertyWithDefaults.description.split('\n').map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">No description available for this property.</p>
                )}
              </div>
            </div>
          </div>
          
          {/* Features */}
          {propertyWithDefaults.features.length > 0 && (
            <div className="p-6 md:p-8 border-b border-gray-100">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-navy-blue mb-6 font-heading">Features</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {propertyWithDefaults.features.map((feature: string, index: number) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="mt-1 w-2 h-2 rounded-full bg-primary-yellow flex-shrink-0"></div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* Gallery */}
          <div className="p-6 md:p-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-navy-blue mb-6 font-heading">Gallery</h2>
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map((item, index) => (
                  <div 
                    key={item} 
                    className={`aspect-square bg-gray-100 rounded-2xl overflow-hidden border border-gray-100 relative group ${
                      index === 2 ? 'cursor-pointer' : ''
                    }`}
                  >
                    <div className="w-full h-full bg-gray-200 animate-pulse">
                      {mainGalleryImages[index] && (
                        <Image
                          src={mainGalleryImages[index].src}
                          alt={mainGalleryImages[index].alt}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                    {index === 2 && (
                      <div 
                        onClick={openGallery}
                        className="absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity group-hover:bg-black/70 cursor-pointer"
                      >
                        <div className="text-white text-center">
                          <span className="text-2xl font-bold block">+{remainingImages.length}</span>
                          <span className="text-sm">More Photos</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="bg-gradient-to-r from-navy-blue to-navy-blue/90 text-white rounded-xl overflow-hidden my-16">
          <div className="p-8 md:p-12 text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-3 font-heading">Interested in this property?</h3>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
              Contact us today to schedule a viewing or to get more information about this property.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
              <Button 
                asChild
                size="lg"
                className="bg-white text-navy-blue hover:bg-gray-100 hover:shadow-md transition-all rounded-2xl font-medium px-6 py-3"
              >
                <a href="tel:+919876543210" className="flex items-center">
                  <FaPhone className="w-4 h-4 mr-2" />
                  Call Now
                </a>
              </Button>
              <Button 
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white/10 hover:text-white rounded-2xl font-medium px-6 py-3"
              >
                <a href="mailto:info@srisanari.com" className="flex items-center">
                  <FaEnvelope className="w-4 h-4 mr-2" />
                  Email Us
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
