import Image from "next/image"
import Link from "next/link"

export default function LatestProjects() {
  const projects = [
    {
      title: "Open Plots",
      subtitle: "Premium Residential Plots",
      image: "/placeholder.svg?height=300&width=400",
      link: "/projects/open-plots",
    },
    {
      title: "Development Plots",
      subtitle: "Ready to Build Plots",
      image: "/placeholder.svg?height=300&width=400",
      link: "/projects/development-plots",
    },
    {
      title: "Farm Lands",
      subtitle: "Agricultural Properties",
      image: "/placeholder.svg?height=300&width=400",
      link: "/projects/farm-lands",
    },
    {
      title: "Apartments/ Flats",
      subtitle: "Modern Living Spaces",
      image: "/placeholder.svg?height=300&width=400",
      link: "/projects/apartments",
    },
  ]

  return (
    <section className="section-padding bg-white">
      <div className="container">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold text-navy-blue">Our Latest Projects</h2>
            <p className="text-gray-600 mt-2">Discover our newest developments and opportunities</p>
          </div>
          <Link href="/projects" className="btn-primary hidden md:inline-block">
            View All Projects
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project, index) => (
            <Link key={index} href={project.link} className="group">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group-hover:transform group-hover:scale-105">
                <div className="relative h-48">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-lg font-bold">{project.title}</h3>
                    <p className="text-sm opacity-90">{project.subtitle}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8 md:hidden">
          <Link href="/projects" className="btn-primary">
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  )
}
