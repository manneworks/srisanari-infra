import { Home, Users, Award } from "lucide-react"

export default function IntroSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Telugu Text Block */}
          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 p-8 rounded-2xl">
            <h2 className="text-2xl md:text-3xl font-bold text-navy-blue mb-4">మహానుభావులకు తెలుగు సమాచారం</h2>
            <p className="text-navy-blue text-lg leading-relaxed mb-6">
              మా కంపెనీ అనేది ప్రీమియం ప్లాట్లు మరియు రియల్ ఎస్టేట్ పెట్టుబడుల్లో నిపుణులు. మేము మీకు అత్యుత్తమ సేవలను అందిస్తాము.
            </p>
            <button className="bg-navy-blue text-white px-8 py-3 rounded-xl font-semibold">
              మరింత తెలుసుకోండి
            </button>
          </div>

          {/* Service Icons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-8 bg-gray-50 rounded-2xl">
              <div className="w-20 h-20 bg-yellow-400/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Home className="w-10 h-10 text-navy-blue" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Premium Properties</h3>
              <p className="text-gray-600 leading-relaxed">High-quality residential and commercial properties</p>
            </div>

            <div className="text-center p-8 bg-gray-50 rounded-2xl">
              <div className="w-20 h-20 bg-yellow-400/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-navy-blue" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Expert Team</h3>
              <p className="text-gray-600 leading-relaxed">Professional real estate consultants</p>
            </div>

            <div className="text-center p-8 bg-gray-50 rounded-2xl">
              <div className="w-20 h-20 bg-yellow-400/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Award className="w-10 h-10 text-navy-blue" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Trusted Service</h3>
              <p className="text-gray-600 leading-relaxed">RERA registered and certified company</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
