"use client";

import React from 'react';
import { FaHome, FaBuilding, FaMapMarkedAlt, FaArrowRight } from 'react-icons/fa';

const IntroSection = () => {
  return (
    <section className="pt-32  bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Side - Bilingual Text Block */}
          <div className="lg:w-1/2 bg-[#ffc03d] p-8 text-[#212d45]">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Welcome to SRI SANARI SHANKARA INFRA</h2>
            <div className="space-y-4 mb-6">
              <p className="text-justify">
                We are committed to providing premium real estate solutions in Hyderabad. 
                With years of experience in the industry, we help you find the perfect property 
                that matches your dreams and budget.
              </p>
              <p className="text-justify">
                Our mission is to deliver quality projects with transparency and integrity, 
                ensuring complete customer satisfaction.
              </p>
              <p className="text-justify font-telugu" style={{ fontFamily: 'Noto Sans Telugu, sans-serif' }}>
                మేము హైదరాబాద్లో ప్రీమియం రియల్ ఎస్టేట్ పరిష్కారాలను అందించడానికి కట్టుబడి ఉన్నాము. 
                సంవత్సరాల అనుభవంతో, మేము మీ కలలు మరియు బడ్జెట్కు అనుగుణంగా ఉండే సరైన ఆస్తిని కనుగొనడంలో మీకు సహాయపడతాము.
              </p>
            </div>
            <button className="flex items-center bg-[#212d45] text-white px-6 py-3 rounded-full font-medium hover:bg-opacity-90 transition-all group">
              Read More
              <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
          {/* Right Side - Services */}
          <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <FaHome className="text-4xl text-[#ffc03d]" />,
                title: 'Residential Plots',
                description: 'Premium residential plots in prime locations with all modern amenities.',
                bgColor: 'bg-gray-100',
                hoverBgColor: 'hover:bg-[#ffc03d]',
                textColor: 'text-[#212d45]',
                hoverTextColor: 'hover:text-white'
              },
              {
                icon: <FaBuilding className="text-4xl text-[#ffc03d]" />,
                title: 'Commercial Spaces',
                description: 'Strategic commercial properties for businesses looking to expand.',
                bgColor: 'bg-gray-100',
                hoverBgColor: 'hover:bg-[#ffc03d]',
                textColor: 'text-[#212d45]',
                hoverTextColor: 'hover:text-white',
                className: 'md:mt-8'
              },
              {
                icon: <FaMapMarkedAlt className="text-4xl text-[#ffc03d]" />,
                title: 'Farm Lands',
                description: 'Fertile agricultural lands for farming and investment purposes.',
                bgColor: 'bg-gray-100',
                hoverBgColor: 'hover:bg-[#ffc03d]',
                textColor: 'text-[#212d45]',
                hoverTextColor: 'hover:text-white',
                className: 'md:mt-16'
              }
            ].map((service, index) => (
              <div 
                key={index} 
                className={`${service.bgColor} ${service.hoverBgColor} ${service.textColor} ${service.hoverTextColor} ${service.className || ''} p-6 rounded-lg shadow-sm transition-all duration-300 hover:shadow-lg cursor-pointer`}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-sm">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
