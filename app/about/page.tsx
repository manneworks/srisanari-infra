import Image from "next/image"
import { Users, Award, Home, TrendingUp, Shield, Clock } from "lucide-react"

export default function AboutPage() {
  const stats = [
    { number: "500+", label: "Happy Customers" },
    { number: "50+", label: "Projects Completed" },
    { number: "10+", label: "Years Experience" },
    { number: "1000+", label: "Properties Sold" },
  ]

  const values = [
    {
      icon: Shield,
      title: "Trust & Transparency",
      description:
        "We believe in complete transparency in all our dealings and maintain the highest standards of integrity.",
    },
    {
      icon: Award,
      title: "Quality Assurance",
      description:
        "Every project undergoes rigorous quality checks to ensure we deliver nothing but the best to our customers.",
    },
    {
      icon: Users,
      title: "Customer First",
      description:
        "Our customers are at the heart of everything we do. We strive to exceed their expectations at every step.",
    },
    {
      icon: Clock,
      title: "Timely Delivery",
      description:
        "We understand the importance of time and ensure all our projects are completed within the promised timeline.",
    },
  ]

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="section-padding bg-navy text-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center lg:text-left">About SRI SANARI SHANKARA INFRA</h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Building dreams, creating communities, and shaping the future of real estate development in Telangana
                with integrity, innovation, and excellence.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-primary-yellow mb-2">{stat.number}</div>
                    <div className="text-sm text-gray-300">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-96 lg:h-full">
              <Image
                src="/placeholder.svg?height=500&width=600"
                alt="About Us"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8 text-navy-blue">Our Story</h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Founded with a vision to transform the real estate landscape in Telangana, SRI SANARI SHANKARA INFRA AND
              MARKETING has grown from a small startup to one of the most trusted names in the industry. Our journey
              began with a simple belief: everyone deserves a quality home and a secure investment.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Over the years, we have successfully delivered numerous residential and commercial projects, each
              reflecting our commitment to quality, innovation, and customer satisfaction. Our RERA registration
              (A01100003667) stands as a testament to our compliance with industry standards and regulations.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Today, we continue to push boundaries, embrace new technologies, and create spaces that not just meet but
              exceed our customers' expectations. Our success is measured not just in the properties we've sold, but in
              the dreams we've helped realize and the communities we've built.
            </p>
          </div>
        </div>
      </section>

      {/* Our Values - Timeline */}
      <section className="section-padding bg-light">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-navy-blue">Our Core Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These values guide everything we do and shape the way we interact with our customers, partners, and
              communities.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Vertical line - Hidden on mobile, shown on md+ */}
            <div className="hidden md:block absolute left-1/2 w-0.5 h-full bg-gray-200 transform -translate-x-1/2"></div>
            
            {/* Timeline items */}
            <div className="space-y-16 md:space-y-24">
              {values.map((value, index) => (
                <div 
                  key={index}
                  className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center md:items-start`}
                >
                  {/* Content - Full width on mobile, 5/12 on desktop */}
                  <div className={`w-full md:w-5/12 text-center md:text-left ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'} ${index === 0 ? 'pt-0 md:pt-8' : ''} order-2 md:order-none`}>
                    <h3 className="text-xl font-bold text-navy-blue mb-2">{value.title}</h3>
                    <p className="text-gray-600 max-w-md mx-auto md:mx-0">{value.description}</p>
                  </div>
                  
                  {/* Icon in circle - Center on mobile, positioned on line for desktop */}
                  <div className={`relative z-10 w-16 h-16 bg-primary-yellow rounded-full flex items-center justify-center mx-auto mb-4 md:mb-0 md:absolute md:left-1/2 transform md:-translate-x-1/2 ${index === 0 ? 'md:mt-8' : ''} ${index % 2 === 0 ? 'md:translate-y-0' : 'md:translate-y-0'}`}>
                    <value.icon className="w-6 h-6 text-navy-blue" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-navy text-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose SRI SANARI?</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Here's what sets us apart from other real estate companies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-yellow rounded-full flex items-center justify-center mx-auto mb-6">
                <Home className="w-8 h-8 text-navy-blue" />
              </div>
              <h3 className="text-xl font-bold mb-4">RERA Approved</h3>
              <p className="text-gray-300">
                All our projects are RERA registered and approved, ensuring complete legal compliance and transparency.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-yellow rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-navy-blue" />
              </div>
              <h3 className="text-xl font-bold mb-4">High ROI</h3>
              <p className="text-gray-300">
                Our strategic location selection ensures high appreciation and excellent return on investment for our
                customers.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-yellow rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-navy-blue" />
              </div>
              <h3 className="text-xl font-bold mb-4">Expert Support</h3>
              <p className="text-gray-300">
                Our experienced team provides end-to-end support from property selection to registration and beyond.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-navy-blue">Our Leadership</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Meet the visionary leaders who drive our company's success and innovation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-6"></div>
              <h3 className="text-xl font-bold mb-2 text-navy-blue">Mr. Raju</h3>
              <p className="text-primary-yellow font-semibold mb-4">Founder & CEO</p>
              <p className="text-gray-600">
                Visionary leader with over 15 years of experience in real estate development and a passion for creating
                quality living spaces.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-6"></div>
              <h3 className="text-xl font-bold mb-2 text-navy-blue">Mrs. Sanari</h3>
              <p className="text-primary-yellow font-semibold mb-4">Co-Founder & Director</p>
              <p className="text-gray-600">
                Strategic planner and operations expert who ensures smooth execution of all projects and maintains
                quality standards.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-6"></div>
              <h3 className="text-xl font-bold mb-2 text-navy-blue">Mr. Shankara</h3>
              <p className="text-primary-yellow font-semibold mb-4">Technical Director</p>
              <p className="text-gray-600">
                Engineering expert with extensive knowledge in construction and infrastructure development, ensuring
                technical excellence.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
