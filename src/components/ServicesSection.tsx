"use client";

import React from 'react';
import { FaHome, FaBuilding, FaTree, FaMapMarkedAlt, FaHandshake, FaChartLine } from 'react-icons/fa';

const ServicesSection = () => {
  const services = [
    {
      icon: <FaHome className="text-4xl" />,
      title: 'Residential Plots',
      description: 'Premium residential plots in prime locations with all modern amenities and infrastructure.'
    },
    {
      icon: <FaBuilding className="text-4xl" />,
      title: 'Commercial Spaces',
      description: 'Strategic commercial properties and office spaces in high-growth business districts.'
    },
    {
      icon: <FaTree className="text-4xl" />,
      title: 'Farm Lands',
      description: 'Fertile agricultural lands with good water resources for farming and investment.'
    },
    {
      icon: <FaMapMarkedAlt className="text-4xl" />,
      title: 'Layout Development',
      description: 'Expert town planning and layout development with all necessary approvals.'
    },
    {
      icon: <FaHandshake className="text-4xl" />,
      title: 'Legal Assistance',
      description: 'End-to-end legal support including documentation, registration, and verification.'
    },
    {
      icon: <FaChartLine className="text-4xl" />,
      title: 'Investment Guidance',
      description: 'Expert advice on real estate investments with high appreciation potential.'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#212d45] mb-4">Our <span className="text-[#ffc03d]">Services</span></h2>
          <div className="w-24 h-1 bg-[#ffc03d] mx-auto mb-2"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">We offer comprehensive real estate solutions tailored to your needs</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="group bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-center border border-gray-100"
            >
              <div className="flex justify-center mb-6">
                <div className="bg-[#ffc03d] bg-opacity-10 p-4 rounded-full text-[#ffc03d] group-hover:bg-[#ffc03d] group-hover:text-white transition-colors duration-300">
                  {service.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#212d45] mb-3">{service.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
              <div className="mt-6">
                <button className="text-[#ffc03d] font-medium text-sm uppercase tracking-wider flex items-center justify-center mx-auto group-hover:text-[#212d45] transition-colors duration-300">
                  Read More
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
