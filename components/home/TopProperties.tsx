import Image from "next/image"
import Link from "next/link"

export default function TopProperties() {
  const properties = [
    {
      title: "Commercial Plots",
      description: "Prime commercial plots in developing areas with high growth potential and excellent connectivity.",
      image: "/images/home-page/Top properties/image1.jpeg",
      link: "/projects?type=commercial",
    },
    {
      title: "Development Plots",
      description: "Ready-to-build residential plots with all amenities and infrastructure in place.",
      image: "/images/home-page/Top properties/image2.jpeg",
      link: "/projects?type=development",
    },
    {
      title: "Residential Plots",
      description: "Premium residential plots in gated communities with modern amenities and security.",
      image: "/images/home-page/Top properties/image3.webp",
      link: "/projects?type=residential",
    },
    {
      title: "Agriculture Lands",
      description: "Fertile agricultural lands perfect for farming and long-term investment opportunities.",
      image: "/images/home-page/Top properties/image4.jpeg",
      link: "/projects?type=agriculture",
    },
    {
      title: "Independent Houses",
      description: "Luxury independent houses with modern architecture and premium finishes.",
      image: "/images/home-page/Top properties/image5.jpg",
      link: "/projects?type=houses",
    },
    {
      title: "Residential Apartments",
      description: "Modern apartments with world-class amenities in prime locations.",
      image: "/images/home-page/Top properties/image6.jpeg",
      link: "/projects?type=apartments",
    },
  ]

  return (
    <section className="section-padding bg-light">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-navy-blue">Top Properties</h2>
          <p className="text-gray-600 text-lg">Explore our best property offerings</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 z-10"></div>
                <Image src={property.image || "/placeholder.svg"} alt={property.title} fill className="object-cover" />
              </div>
              <div className="p-6 flex flex-col h-[calc(100%-12rem)]">
                <h3 className="text-xl font-bold mb-3 text-navy-blue">{property.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed flex-grow">{property.description}</p>
                <div className="mt-auto">
                  <Link 
                    href={property.link}
                    className="inline-block px-5 py-2.5 bg-navy text-white font-medium rounded-xl hover:bg-opacity-90 transition-all duration-200 hover:shadow-sm active:scale-95"
                  >
                    View Properties
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
