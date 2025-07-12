'use client';

import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FaMapMarkerAlt, FaCalendarAlt, FaRulerCombined, FaMoneyBillWave, FaArrowLeft } from 'react-icons/fa';
import { getProjectById } from '@/data/projects';
import { ProjectStatus } from '@/data/types';
import React, { useState, useEffect } from 'react';
import { submitPropertyInquiry } from '@/app/actions/propertyInquiry';
import { Loader2 } from 'lucide-react';

interface PropertyDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const unwrappedParams = React.use(params);
  const [formState, setFormState] = useState({
    isSubmitting: false,
    isSuccess: false,
    isSubmitted: false,
    message: ''
  });
  
  const [project, setProject] = useState<Awaited<ReturnType<typeof getProjectById>> | null>(null);
  
  useEffect(() => {
    const loadProject = async () => {
      try {
        const data = await getProjectById(unwrappedParams.id);
        if (!data) {
          notFound();
        }
        setProject(data);
      } catch (error) {
        console.error('Error loading project:', error);
        notFound();
      }
    };
    
    loadProject();
  }, [unwrappedParams.id]);
  
  if (!project) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  // Format price with Indian Rupee symbol and proper formatting
  const formattedPrice = project.price && !isNaN(Number(project.price.replace(/[^0-9]/g, '')))
    ? `₹${Number(project.price.replace(/[^0-9]/g, '')).toLocaleString('en-IN')}`
    : project.price || 'Price on request';

  const handleSubmit = async (formData: FormData) => {
    setFormState(prev => ({ ...prev, isSubmitting: true, isSuccess: false, message: '' }));
    try {
      formData.append('propertyId', project.id || '');
      formData.append('propertySlug', unwrappedParams.id);
      formData.append('propertyTitle', project.title || '');
      const result = await submitPropertyInquiry(formData);
      setFormState({
        isSubmitting: false,
        isSuccess: result.success,
        isSubmitted: result.success,
        message: result.message || ''
      });
      if (result.success) {
        const form = document.getElementById('property-inquiry-form') as HTMLFormElement;
        form?.reset();
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormState({
        isSubmitting: false,
        isSuccess: false,
        isSubmitted: false,
        message: 'An error occurred. Please try again.'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Property Header */}
      <div className="relative h-96 w-full">
        {/* Back Button */}
        <div className="absolute top-4 left-4 z-10">
          <Link 
            href="/projects" 
            className="flex items-center gap-2 bg-white/90 hover:bg-white text-navy-blue px-4 py-2 rounded-full shadow-md transition-all duration-300 hover:shadow-lg"
          >
            <FaArrowLeft className="w-4 h-4" />
            <span className="font-medium">Back to Projects</span>
          </Link>
        </div>
        {project.images && project.images.length > 0 ? (
          <Image
            src={project.images[0]}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No image available</span>
          </div>
        )}
        <div className="absolute inset-0 bg-black/40">
          <div className="container mx-auto px-4 h-full flex items-end pb-16">
            <div className="text-white max-w-4xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-3 font-heading">{project.title}</h1>
              <div className="flex flex-wrap items-center gap-3 pb-4">
                <span className="flex items-center bg-black/50 px-2.5 py-1 rounded-full text-xs md:text-sm">
                  <FaMapMarkerAlt className="mr-1.5 h-3 w-3" />
                  {project.location || 'Location not specified'}
                </span>
                <span className="flex items-center bg-black/50 px-2.5 py-1 rounded-full text-xs md:text-sm">
                  <FaCalendarAlt className="mr-1.5 h-3 w-3" />
                  {project.completion || 'Completion date not specified'}
                </span>
                <span className="text-lg font-bold text-primary-yellow bg-black/50 px-3 py-1 rounded-full">
                  {formattedPrice || 'Price on request'}
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
                <div className="prose max-w-none text-gray-700 mb-8 font-sans leading-relaxed">
                  {project.description ? (
                    typeof project.description === 'string' ? (
                      <p>{project.description}</p>
                    ) : (
                      project.description
                    )
                  ) : (
                    <p>No description available.</p>
                  )}
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                  <div className="bg-gray-50 p-5 rounded-lg text-center hover:shadow-md transition-shadow duration-300">
                    <FaMoneyBillWave className="w-7 h-7 mx-auto text-primary-yellow mb-3" />
                    <span className="text-gray-800 font-medium text-lg">{formattedPrice || 'Price on request'}</span>
                  </div>
                  <div className="bg-gray-50 p-5 rounded-lg text-center hover:shadow-md transition-shadow duration-300">
                    <FaRulerCombined className="w-7 h-7 mx-auto text-primary-yellow mb-3" />
                    <span className="text-gray-800 font-medium text-lg">{project.area || 'Area not specified'}</span>
                  </div>
                  <div className="bg-gray-50 p-5 rounded-lg text-center hover:shadow-md transition-shadow duration-300">
                    <FaCalendarAlt className="w-7 h-7 mx-auto text-primary-yellow mb-3" />
                    <span className="text-gray-800 font-medium text-lg">{project.completion || 'Completion date not specified'}</span>
                  </div>
                </div>

                {project.amenities && project.amenities.length > 0 && (
                  <div className="border-t border-gray-100 pt-6">
                    <h3 className="text-xl font-semibold mb-6 text-navy-blue font-heading">Amenities</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {project.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-start">
                          <div className="flex-shrink-0 mt-1 w-2 h-2 rounded-full bg-primary-yellow mr-3"></div>
                          <span className="text-gray-700 font-sans">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {project.locationAdvantages && project.locationAdvantages.length > 0 && (
                  <div className="border-t border-gray-100 pt-6 mt-6">
                    <h3 className="text-xl font-semibold mb-6 text-navy-blue font-heading">Location Advantages</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {project.locationAdvantages.map((advantage, index) => (
                        <div key={`advantage-${index}`} className="flex items-start">
                          <div className="flex-shrink-0 mt-1 w-2 h-2 rounded-full bg-primary-yellow mr-3"></div>
                          <span className="text-gray-700 font-sans">{advantage}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {project.specifications && Object.keys(project.specifications).length > 0 && (
                  <div className="border-t border-gray-100 pt-6 mt-6">
                    <h3 className="text-xl font-semibold mb-6 text-navy-blue font-heading">Specifications</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {Object.entries(project.specifications).map(([key, value]) => (
                        <div key={key} className="flex items-start">
                          <div className="flex-shrink-0 mt-1 w-2 h-2 rounded-full bg-primary-yellow mr-3"></div>
                          <div>
                            <span className="text-gray-700 font-sans capitalize">
                              <span className="font-medium">{key.replace(/([A-Z])/g, ' $1').trim()}:</span> {value}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
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
              
              <form action={handleSubmit} id="property-inquiry-form" className="p-6 space-y-5">
                {formState.message && (
                  <div className={`p-3 rounded-md ${formState.isSuccess ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                    {formState.message}
                  </div>
                )}
                <div className="space-y-1">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Your Name <span className="text-red-500">*</span></label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-yellow focus:border-transparent transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address <span className="text-red-500">*</span></label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-yellow focus:border-transparent transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    pattern="[0-9]{10,15}"
                    title="Please enter a valid phone number (10-15 digits)"
                    inputMode="numeric"
                    onKeyPress={(e) => {
                      if (!/[0-9]/.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-yellow focus:border-transparent transition-all"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">Your Message <span className="text-red-500">*</span></label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-yellow focus:border-transparent transition-all"
                    placeholder="I'm interested in this property..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={formState.isSubmitting || formState.isSubmitted}
                  className={`w-full btn btn-primary text-lg flex items-center justify-center ${(formState.isSubmitting || formState.isSubmitted) ? 'opacity-75 cursor-not-allowed' : ''}`}
                >
                  {formState.isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin mr-2 h-4 w-4" />
                      Submitting...
                    </>
                  ) : formState.isSubmitted ? (
                    <>
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Submitted
                    </>
                  ) : (
                    'Submit'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Properties Link (Bottom) */}
      <div className="bg-gray-100 py-8">
        <div className="container mx-auto px-4 text-center">
          <Link 
            href="/projects" 
            className="inline-flex items-center gap-2 text-navy-blue hover:text-primary-yellow transition-colors font-bold font-heading"
          >
            <FaArrowLeft className="w-4 h-4" />
            <span>Back to All Projects</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
