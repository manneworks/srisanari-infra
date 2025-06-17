"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaChevronLeft, FaChevronRight, FaPhone, FaEnvelope } from 'react-icons/fa';

const slides = [
  {
    id: 1,
    title: 'Premium Plots At',
    highlight: 'Affordable Price',
    subtitle: 'Your Dream Home Starts Here - Find Your Perfect Plot Today',
    image: '/images/hero-bg.jpg',
    cta: 'Explore Properties',
    ctaLink: '/properties'
  },
  {
    id: 2,
    title: 'Luxury Villas',
    highlight: 'Prime Locations',
    subtitle: 'Discover Your Dream Home in the Heart of the City',
    image: '/images/hero-2.jpg',
    cta: 'View Villas',
    ctaLink: '/villas'
  },
  {
    id: 3,
    title: 'Commercial Spaces',
    highlight: 'For Your Business',
    subtitle: 'Premium Commercial Properties in Prime Business Districts',
    image: '/images/hero-3.jpg',
    cta: 'Explore Commercial',
    ctaLink: '/commercial'
  }
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isHovered) {
      const timer = setTimeout(() => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [currentSlide, isHovered]);

  const nextSlide = () => setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  return (
    <>
      {/* Mobile Contact Bar */}
      <div className="lg:hidden bg-[#212d45] text-white text-xs py-2 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <a href="tel:+91986663349" className="flex items-center space-x-1">
            <FaPhone className="text-[#ffc03d]" />
            <span>+91 98666 63349</span>
          </a>
          <a href="mailto:info@srisanari.com" className="flex items-center space-x-1">
            <FaEnvelope className="text-[#ffc03d]" />
            <span>info@srisanari.com</span>
          </a>
        </div>
      </div>

      <section 
        className="relative h-screen w-full overflow-hidden -mt-16 lg:-mt-24"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Slides */}
        <div className="absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out">
          <Image
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            fill
            className="object-cover object-center"
            priority
            quality={100}
          />
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>
        
        {/* Navigation Arrows */}
        <button 
          onClick={prevSlide}
          className="absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 z-20 p-2 lg:p-3 rounded-full bg-black bg-opacity-30 text-white hover:bg-opacity-50 transition-all duration-300"
          aria-label="Previous slide"
        >
          <FaChevronLeft className="text-xl lg:text-2xl" />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 z-20 p-2 lg:p-3 rounded-full bg-black bg-opacity-30 text-white hover:bg-opacity-50 transition-all duration-300"
          aria-label="Next slide"
        >
          <FaChevronRight className="text-xl lg:text-2xl" />
        </button>
        
        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 pt-24 lg:pt-32">
          <div className="max-w-4xl mx-auto transform transition-transform duration-1000 ease-in-out px-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-3 lg:mb-4 leading-tight">
              {slides[currentSlide].title} <span className="text-[#ffc03d]">{slides[currentSlide].highlight}</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white mb-6 lg:mb-8 max-w-2xl mx-auto">
              {slides[currentSlide].subtitle}
            </p>
            <Link 
              href={slides[currentSlide].ctaLink}
              className="inline-block bg-[#ffc03d] hover:bg-[#e6ac35] text-[#212d45] font-bold text-base sm:text-lg px-6 sm:px-8 py-2 sm:py-3 rounded-md transition-all duration-300 transform hover:scale-105"
            >
              {slides[currentSlide].cta}
            </Link>
          </div>
        </div>
        
        {/* Indicators */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-[#ffc03d] w-6 sm:w-8' : 'bg-white bg-opacity-50'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
          <svg className="w-6 h-6 text-white animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>
    </>
  );
};

export default Hero;
