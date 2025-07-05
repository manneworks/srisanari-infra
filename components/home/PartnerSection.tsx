export default function PartnerSection() {
  return (
    <section className="section-padding bg-light">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Company Introduction */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-navy-blue font-heading tracking-tight">
              Your Trusted Partner In Real Estate
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed font-sans">
              We Buy And Sell Properties, We Build Your Dream Home
            </p>
            <div className="space-y-4 mb-8">
              <p className="text-gray-700 leading-relaxed font-sans">
                SRI SANARI SHANKARA INFRA AND MARKETING is a leading real estate company specializing in premium
                residential plots, commercial properties, and comprehensive real estate solutions. With years of
                experience in the industry, we have established ourselves as a trusted name in property development and
                sales.
              </p>
              <p className="text-gray-700 leading-relaxed font-sans">
                Our commitment to quality, transparency, and customer satisfaction has made us the preferred choice for
                thousands of satisfied customers across Telangana.
              </p>
            </div>
            <button className="btn-primary font-heading tracking-wider">
              Learn More About Us
            </button>
          </div>

          {/* Services Offered */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold mb-8 text-navy-blue font-heading tracking-tight">
              Services We Offer:
            </h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-3 h-3 bg-primary-yellow rounded-full mt-1.5 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-lg font-heading">Residential Property Sales</h4>
                  <p className="text-gray-600 font-sans mt-1">Premium plots and independent houses</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-3 h-3 bg-primary-yellow rounded-full mt-1.5 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-lg font-heading">Commercial Property Sales</h4>
                  <p className="text-gray-600 font-sans mt-1">Office spaces and commercial plots</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-3 h-3 bg-primary-yellow rounded-full mt-1.5 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-lg font-heading">Agricultural Lands</h4>
                  <p className="text-gray-600 font-sans mt-1">Farm lands and agricultural properties</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-3 h-3 bg-primary-yellow rounded-full mt-1.5 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-lg font-heading">Development Projects</h4>
                  <p className="text-gray-600 font-sans mt-1">Residential and commercial developments</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-3 h-3 bg-primary-yellow rounded-full mt-1.5 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-lg font-heading">Investment Opportunities</h4>
                  <p className="text-gray-600 font-sans mt-1">High-return real estate investments</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
