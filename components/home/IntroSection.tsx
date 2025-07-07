import { Home, Users, Award } from "lucide-react"
import Link from "next/link"

export default function IntroSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Telugu Text Block */}
          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-2xl md:text-3xl font-bold text-navy-blue mb-4 font-heading tracking-tight">
              శ్రీ సనరి ఇన్ఫ్రా
            </h2>
            <p className="text-navy-blue text-lg leading-relaxed mb-6 font-sans">
              మా కంపెనీ అనేది ప్రీమియం ప్లాట్లు మరియు రియల్ ఎస్టేట్ పెట్టుబడుల్లో నిపుణులు. మేము మీకు అత్యుత్తమ సేవలను అందిస్తాము.
            </p>
            <Link href="/about" className="inline-block bg-navy-blue hover:bg-opacity-90 text-white px-8 py-3 rounded-xl font-semibold font-heading tracking-wide transition-colors duration-200">
              మరింత తెలుసుకోండి
            </Link>
          </div>

          {/* Service Icons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="w-20 h-20 bg-yellow-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group">
                <Home className="w-10 h-10 text-primary-yellow group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 font-heading">Premium Properties</h3>
              <p className="text-gray-600 leading-relaxed font-sans">High-quality residential and commercial properties</p>
            </div>

            <div className="text-center p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="w-20 h-20 bg-yellow-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group">
                <Award className="w-10 h-10 text-primary-yellow group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 font-heading">Trusted Service</h3>
              <p className="text-gray-600 leading-relaxed font-sans">RERA registered and certified company</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
