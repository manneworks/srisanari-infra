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
      title: "Apartments/Villas",
      location: "Hyderabad",
      image: "/images/home-page/our-latest-projects/plot4.jpg",
      link: "/projects/apartments-villas",
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <div className="text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-blue mb-2">Our Latest Projects</h2>
            <p className="text-gray-600 text-lg">
              Discover our premium properties and investment opportunities
            </p>
          </div>
          <div className="btn-primary whitespace-nowrap cursor-default">
            View All Projects
          </div>
        </div>

        <div className="flex space-x-6 overflow-x-auto pb-6 -mx-4 px-4 scrollbar-hide">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="flex-none w-[300px] sm:w-[350px] md:w-full md:flex-1 h-[500px] relative rounded-2xl overflow-hidden group"
            >
              <div className="h-full">
                <div className="absolute inset-0">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-90"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-center text-white flex flex-col items-center justify-end min-h-[150px]">
                  <h3 className="text-2xl font-bold mb-2 w-full whitespace-nowrap">{project.title}</h3>
                  <p className="text-gray-200 w-full">{project.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
