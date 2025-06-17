import Link from "next/link"

export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url(/placeholder.svg?height=800&width=1200&query=aerial%20view%20of%20plotted%20land%20development%20with%20roads%20and%20green%20spaces)",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Premium Plots At Affordable Price</h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">Start Your Dream Home Journey With Us</p>
        <Link href="/projects" className="btn-primary text-lg px-8 py-4 inline-block">
          Click Here
        </Link>
      </div>
    </section>
  )
}
