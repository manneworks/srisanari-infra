export default function InvestmentProperties() {
  return (
    <section className="section-padding bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-navy-blue">Best Investment Properties</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover premium investment opportunities with guaranteed returns and excellent growth potential
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
          {/* Video */}
          <div className="relative">
            <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Property Investment Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>

          {/* Content */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-navy-blue">Looking to buy or sell a property?</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Our team at SRI SANARI Real Estate has the expertise to guide you through every step of your property
              journey. Whether you're a first-time buyer, seasoned investor, or looking to sell your property, we
              provide personalized service tailored to your needs.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary-yellow rounded-full"></div>
                <span className="text-gray-700">RERA Approved Projects</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary-yellow rounded-full"></div>
                <span className="text-gray-700">Clear Title Properties</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary-yellow rounded-full"></div>
                <span className="text-gray-700">Flexible Payment Options</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary-yellow rounded-full"></div>
                <span className="text-gray-700">Expert Legal Support</span>
              </div>
            </div>

            <button className="btn-primary">Get Started Today</button>
          </div>
        </div>

        {/* Additional Video */}
        <div className="max-w-4xl mx-auto">
          <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Company Overview Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  )
}
