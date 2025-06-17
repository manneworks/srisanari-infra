"use client";

import React from 'react';

const MapSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our <span className="text-primary">Location</span></h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Visit our office at Villa #748, Symphony Park Homes, Beeramguda, Patancheru
          </p>
        </div>
        
        <div className="rounded-xl overflow-hidden shadow-lg h-96">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.669722316337!2d78.302708015279!3d17.37989478808093!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb94a9e8d3e1d9%3A0x6d1e7f5b9c7b4c1f!2sSymphony%20Park%20Homes!5e0!3m2!1sen!2sin!4v1659876543210!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
