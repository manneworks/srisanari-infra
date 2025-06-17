import Image from "next/image"
import Link from "next/link"

export default function TopProperties() {
  const properties = [
    {
      title: "Commercial Plots",
      description: "Prime commercial plots in developing areas with high growth potential and excellent connectivity.",
      image: "/placeholder.svg?height=300&width=400",
      link: "/projects?type=commercial",
    },
    {
      title: "Development Plots",
      description: "Ready-to-build residential plots with all amenities and infrastructure in place.",
      image: "/placeholder.svg?height=300&width=400",
      link: "/projects?type=development",
    },
    {
      title: "Residential Plots",
      description: "Premium residential plots in gated communities with modern amenities and security.",
      image: "/placeholder.svg?height=300&width=400",
      link: "/projects?type=residential",
    },
    {
      title: "Agriculture Lands",
      description: "Fertile agricultural lands perfect for farming and long-term investment opportunities.",
      image: "/placeholder.svg?height=300&width=400",
      link: "/projects?type=agriculture",
    },
    {
      title: "Independent Houses",
      description: "Luxury independent houses with modern architecture and premium finishes.",
      image: "/placeholder.svg?height=300&width=400",
      link: "/projects?type=houses",
    },
    {
      title: "Residential Apartments",
      description: "Modern apartments with world-class amenities in prime locations.",
      image: "/placeholder.svg?height=300&width=400",
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
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative h-48">
                <Image src={property.image || "/placeholder.svg"} alt={property.title} fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-navy-blue">{property.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{property.description}</p>
                <Link href={property.link} className="text-primary-yellow font-semibold hover:underline">
                  View Properties →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
