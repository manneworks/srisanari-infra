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
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setPrevBtnEnabled(emblaApi.canScrollPrev())
    setNextBtnEnabled(emblaApi.canScrollNext())
    setSelectedIndex(emblaApi.selectedScrollSnap())
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
                <div className="absolute inset-0 bg-black/50"></div>
              </div>

              {/* Content */}
              <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
                <div className="max-w-4xl mx-auto px-4">
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 animate-fadeIn text-white drop-shadow-lg font-heading tracking-tight">
                    {slide.title}
                  </h1>
                  <p className="text-lg sm:text-xl md:text-2xl mb-6 md:mb-8 max-w-2xl mx-auto animate-fadeIn animation-delay-100 text-gray-100 font-normal leading-relaxed">
                    {slide.description}
                  </p>
                  <Link 
                    href="/projects" 
                    className="btn-call text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 inline-block animate-fadeIn animation-delay-200 hover:bg-opacity-90 transition-all duration-300 font-heading font-semibold tracking-wider shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
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
            onClick={() => scrollTo(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              selectedIndex === index 
                ? 'bg-white w-6' 
                : 'bg-white bg-opacity-50 w-2 hover:bg-opacity-75 hover:w-3'
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
