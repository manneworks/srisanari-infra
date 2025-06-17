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
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Your Trusted Partner In Real Estate
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            We Buy And Sell Properties, We Build Your Dream Home
          </p>
          <div className="w-24 h-1 bg-yellow-400 mx-auto mb-8"></div>
          
          <p className="text-gray-700 leading-relaxed mb-8">
            SRI SANARI SHANKARA INFRA AND MARKETING is a leading real estate company specializing in premium residential plots, 
            commercial properties, and comprehensive real estate solutions. With years of experience in the industry, we have 
            established ourselves as a trusted name in property development and sales.
          </p>
          <p className="text-gray-700 leading-relaxed mb-8">
            Our commitment to quality, transparency, and customer satisfaction has made us the preferred choice for thousands of 
            satisfied customers across Telangana.
          </p>
          
          <Link 
            href="/about" 
            className="btn-primary"
          >
            Learn More About Us
          </Link>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-xl hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              <div className="w-14 h-14 bg-yellow-50 rounded-xl flex items-center justify-center mb-4">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
