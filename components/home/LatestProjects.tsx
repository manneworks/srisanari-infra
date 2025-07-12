import Image from "next/image"
import Link from "next/link"

export default function LatestProjects() {
  const projects = [
    {
      title: "Open Plots",
      location: "Maheshwaram, Tukkaguda",
      image: "/images/home-page/our-latest-projects/plot1.jpeg",
      link: "/projects/open-plots",
    },
    {
      title: "Development Lands",
      location: "Hyderabad, Shadnagar",
      image: "/images/home-page/our-latest-projects/plot2.jpg",
      link: "/projects/development-lands",
    },
    {
      title: "Farm Lands",
      location: "Maheshwaram, Shamshabad",
      image: "/images/home-page/our-latest-projects/plot3.avif",
      link: "/projects/farm-lands",
    },
    {
      title: "Apartments/Villa",
      location: "Hyderabad",
      image: "/images/home-page/our-latest-projects/plot4.jpg",
      link: "/projects/apartments-villas",
    },
  ]

  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div className="text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-blue mb-3 font-heading tracking-tight">
              Our Preferred Categories
            </h2>
            <p className="text-gray-600 text-lg font-sans">
              Discover our carefully curated property categories
            </p>
          </div>
          <Link 
            href="/projects" 
            className="btn-call font-heading tracking-wider whitespace-nowrap hover:shadow-md transition-shadow duration-300"
          >
            View All Projects
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="group relative h-[400px] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute inset-0">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                <div className="bg-gradient-to-t from-black/90 to-transparent pt-16 pb-6 px-4 rounded-b-2xl">
                  <h3 className="text-xl font-bold mb-1.5 text-white font-heading group-hover:text-primary-yellow transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-200 text-sm font-sans">{project.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
