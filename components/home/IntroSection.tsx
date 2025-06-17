import { Home, Users, Award } from "lucide-react"

export default function IntroSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Telugu Text Block */}
          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-navy-blue mb-4">మహానుభావులకు తెలుగు సమాచారం</h2>
            <p className="text-navy-blue text-lg leading-relaxed">
              మా కంపెనీ అనేది ప్రీమియం ప్లాట్లు మరియు రియల్ ఎస్టేట్ పెట్టుబడుల్లో నిపుణులు. మేము మీకు అత్యుత్తమ సేవలను అందిస్తాము.
            </p>
            <button className="mt-4 bg-navy-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors">
              మరింత తెలుసుకోండి
            </button>
          </div>

          {/* Service Icons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-primary-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                <Home className="w-8 h-8 text-navy-blue" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Premium Properties</h3>
              <p className="text-gray-600">High-quality residential and commercial properties</p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-primary-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-navy-blue" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Expert Team</h3>
              <p className="text-gray-600">Professional real estate consultants</p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-primary-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-navy-blue" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Trusted Service</h3>
              <p className="text-gray-600">RERA registered and certified company</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
