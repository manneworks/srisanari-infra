export default function PartnerSection() {
  return (
    <section className="section-padding bg-light">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Company Introduction */}
          <div>
            <h2 className="text-3xl font-bold mb-6 text-navy-blue">Your Trusted Partner In Real Estate</h2>
            <p className="text-gray-600 mb-6 text-lg leading-relaxed">
              We Buy And Sell Properties, We Build Your Dream Home
            </p>
            <p className="text-gray-600 mb-6">
              SRI SANARI SHANKARA INFRA AND MARKETING is a leading real estate company specializing in premium
              residential plots, commercial properties, and comprehensive real estate solutions. With years of
              experience in the industry, we have established ourselves as a trusted name in property development and
              sales.
            </p>
            <p className="text-gray-600 mb-8">
              Our commitment to quality, transparency, and customer satisfaction has made us the preferred choice for
              thousands of satisfied customers across Telangana.
            </p>
            <button className="btn-primary">Learn More About Us</button>
          </div>

          {/* Services Offered */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-navy-blue">Services We Offer:</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary-yellow rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-lg">Residential Property Sales</h4>
                  <p className="text-gray-600">Premium plots and independent houses</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary-yellow rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-lg">Commercial Property Sales</h4>
                  <p className="text-gray-600">Office spaces and commercial plots</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary-yellow rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-lg">Agricultural Lands</h4>
                  <p className="text-gray-600">Farm lands and agricultural properties</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary-yellow rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-lg">Development Projects</h4>
                  <p className="text-gray-600">Residential and commercial developments</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary-yellow rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-lg">Investment Opportunities</h4>
                  <p className="text-gray-600">High-return real estate investments</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
