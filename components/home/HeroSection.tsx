'use client'

import Link from "next/link"
import { useCallback, useEffect, useState } from "react"
import useEmblaCarousel from 'embla-carousel-react'
import { NextButton, PrevButton } from './CarouselButtons'

const slides = [
  {
    title: "Premium Plots At Affordable Price",
    description: "Start Your Dream Home Journey With Us",
    image: "/images/home-page/hero-section/img1.jpg",
  },
  {
    title: "Prime Location Plots",
    description: "Invest in the most sought-after locations",
    image: "/images/home-page/hero-section/img2.jpg",
  },
  {
    title: "Luxury Living Awaits",
    description: "Experience the perfect blend of comfort and style",
    image: "/images/home-page/hero-section/img3.jpg",
  },
]

export default function HeroSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, draggable: true, dragFree: false })
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false)

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setPrevBtnEnabled(emblaApi.canScrollPrev())
    setNextBtnEnabled(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    
    // Auto-scroll functionality
    const autoScroll = setInterval(() => {
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext()
      } else {
        emblaApi.scrollTo(0)
      }
    }, 5000) // Change slide every 5 seconds

    return () => {
      clearInterval(autoScroll)
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi, onSelect])

  return (
    <section className="relative h-screen overflow-hidden">
      <div className="embla h-full" ref={emblaRef}>
        <div className="embla__container h-full">
          {slides.map((slide, index) => (
            <div className="embla__slide relative h-full" key={index}>
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${slide.image})`,
                }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
              </div>

              {/* Content */}
              <div className="relative z-10 h-full flex items-center justify-center text-center text-white px-4">
                <div className="max-w-4xl mx-auto px-4">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-5 animate-fadeIn">
                    {slide.title}
                  </h1>
                  <p className="text-base sm:text-lg md:text-xl mb-5 md:mb-6 max-w-2xl mx-auto animate-fadeIn animation-delay-100">
                    {slide.description}
                  </p>
                  <Link 
                    href="/projects" 
                    className="btn-primary text-sm sm:text-base px-5 sm:px-7 py-2.5 sm:py-3 inline-block animate-fadeIn animation-delay-200 hover:bg-opacity-90 transition-all duration-300"
                  >
                    Explore Properties
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="absolute z-20 w-full h-0 top-1/2 left-0 transform -translate-y-1/2 px-4 md:px-8">
        <div className="relative h-full">
          <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
          <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-1.5 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              emblaApi?.selectedScrollSnap() === index 
                ? 'bg-white w-6' 
                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Custom styles for embla carousel */}
      <style jsx global>{`
        .embla {
          position: relative;
        }
        .embla__container {
          display: flex;
          user-select: none;
          -webkit-touch-callout: none;
          -khtml-user-select: none;
          -webkit-tap-highlight-color: transparent;
        }
        .embla__slide {
          position: relative;
          min-width: 100%;
          flex: 0 0 100%;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .animation-delay-100 {
          animation-delay: 0.2s;
        }
        .animation-delay-200 {
          animation-delay: 0.4s;
        }
      `}</style>
    </section>
  )
}
