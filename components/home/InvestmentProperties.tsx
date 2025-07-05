export default function InvestmentProperties() {
  return (
    <section className="section-padding bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-navy-blue font-heading tracking-tight">
            Best Investment Properties
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto font-sans">
            Discover premium investment opportunities with guaranteed returns and excellent growth potential
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
          {/* Video */}
          <div className="relative group">
            <div className="aspect-video bg-gray-900 rounded-xl overflow-hidden shadow-xl transform transition-all duration-300 group-hover:shadow-2xl">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/your-video-id"
                title="SRI SANARI - Your Trusted Real Estate Partner"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full transition-opacity duration-300 group-hover:opacity-90"
              ></iframe>
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors duration-300">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white/90 rounded-full flex items-center justify-center transform transition-transform group-hover:scale-110">
                  <svg className="w-8 h-8 md:w-10 md:h-10 text-primary-yellow" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:pl-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-navy-blue font-heading tracking-tight">
              Looking to buy or sell a property?
            </h3>
            <p className="text-gray-700 mb-8 leading-relaxed font-sans">
              Our team at SRI SANARI Real Estate has the expertise to guide you through every step of your property
              journey. Whether you're a first-time buyer, seasoned investor, or looking to sell your property, we
              provide personalized service tailored to your needs.
            </p>

            <div className="space-y-5 mb-10">
              <div className="flex items-start space-x-4">
                <div className="w-3 h-3 bg-primary-yellow rounded-full mt-1.5 flex-shrink-0"></div>
                <span className="text-gray-700 font-sans">RERA Approved Projects</span>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-3 h-3 bg-primary-yellow rounded-full mt-1.5 flex-shrink-0"></div>
                <span className="text-gray-700 font-sans">Clear Title Properties</span>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-3 h-3 bg-primary-yellow rounded-full mt-1.5 flex-shrink-0"></div>
                <span className="text-gray-700 font-sans">Flexible Payment Options</span>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-3 h-3 bg-primary-yellow rounded-full mt-1.5 flex-shrink-0"></div>
                <span className="text-gray-700 font-sans">Expert Legal Support</span>
              </div>
            </div>

            <button className="btn-primary font-heading tracking-wider hover:shadow-lg transition-shadow duration-300">
              Get Started Today
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
