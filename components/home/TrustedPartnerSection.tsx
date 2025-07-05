import React from 'react'
import { Home, Building, TreePine, LandPlot, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function TrustedPartnerSection() {
  const services = [
    {
      icon: <Home className="w-6 h-6 text-yellow-500" />,
      title: "Residential Property Sales",
      description: "Premium plots and independent houses in prime locations"
    },
    {
      icon: <Building className="w-6 h-6 text-yellow-500" />,
      title: "Commercial Property Sales",
      description: "Office spaces and commercial plots for your business needs"
    },
    {
      icon: <TreePine className="w-6 h-6 text-yellow-500" />,
      title: "Agricultural Lands",
      description: "Fertile farm lands and agricultural properties"
    },
    {
      icon: <LandPlot className="w-6 h-6 text-yellow-500" />,
      title: "Development Projects",
      description: "Residential and commercial developments"
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-yellow-500" />,
      title: "Investment Opportunities",
      description: "High-return real estate investments"
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-heading tracking-tight">
            Your Trusted Partner In Real Estate
          </h2>
          <p className="text-xl text-gray-600 mb-8 font-sans">
            We Buy And Sell Properties, We Build Your Dream Home
          </p>
          <div className="w-24 h-1 bg-primary-yellow mx-auto mb-10"></div>
          
          <div className="space-y-6 mb-10">
            <p className="text-gray-700 leading-relaxed font-sans">
              SRI SANARI SHANKARA INFRA AND MARKETING is a leading real estate company specializing in premium residential plots, 
              commercial properties, and comprehensive real estate solutions. With years of experience in the industry, we have 
              established ourselves as a trusted name in property development and sales.
            </p>
            <p className="text-gray-700 leading-relaxed font-sans">
              Our commitment to quality, transparency, and customer satisfaction has made us the preferred choice for thousands of 
              satisfied customers across Telangana.
            </p>
          </div>
          
          <Link 
            href="/about" 
            className="btn-primary font-heading tracking-wider"
          >
            Learn More About Us
          </Link>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-xl hover:shadow-lg transition-all duration-300 border border-gray-100 group"
            >
              <div className="w-16 h-16 bg-yellow-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-yellow/10 transition-colors">
                {React.cloneElement(service.icon, { className: 'w-7 h-7 text-primary-yellow group-hover:scale-110 transition-transform' })}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 font-heading">{service.title}</h3>
              <p className="text-gray-600 font-sans">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
