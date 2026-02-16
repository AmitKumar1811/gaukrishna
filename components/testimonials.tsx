'use client'

import { useRef } from 'react'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Minerva Thakur',
    text: 'A variety of ways to use my favourite coconut oil and honey. My skin feels nourished, my cuticles are soft, my lips are smooth, and many other benefits come from using them!',
    image: '/placeholder.svg',
    rating: 5,
    role: 'Wellness Enthusiast'
  },
  {
    name: 'Lakshmi Dev',
    text: 'Their ghee helped solve my acid reflux problem. While cooking with wood pressed oils imparts a unique taste and I feel lighter.',
    image: '/placeholder.svg',
    rating: 5,
    role: 'Home Chef'
  },
  {
    name: 'Dr Shagun Walia',
    text: 'This ghee is the most healthy option out there for children. I use it regularly for my daughter and she loves the taste.',
    image: '/placeholder.svg',
    rating: 5,
    role: 'Pediatrician'
  },
  {
    name: 'Pankaj Tiwari',
    text: 'Works very well for holistic healing! typical honey. It is very sweet and clean, like nobody\'s business :)',
    image: '/placeholder.svg',
    rating: 5,
    role: 'Ayurveda Practitioner'
  },
]

export function Testimonials() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  return (
    <section className="py-20 md:py-28 bg-[#f9fbf8] overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-[#1a5f48] font-bold tracking-widest uppercase text-sm mb-2 block">Testimonials</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
              Loved by <span className="text-[#1a5f48]">Thousands</span>
            </h2>
            <p className="text-gray-500 text-lg">
              Don't just take our word for it. Here's what our community has to say about the purity we deliver.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => scroll('left')}
              className="h-12 w-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-[#1a5f48] hover:text-white hover:border-[#1a5f48] transition-all duration-300 shadow-sm hover:shadow-lg"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="h-12 w-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-[#1a5f48] hover:text-white hover:border-[#1a5f48] transition-all duration-300 shadow-sm hover:shadow-lg"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          className="flex gap-8 overflow-x-auto pb-12 snap-x snap-mandatory hide-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[85vw] sm:w-[400px] bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 snap-center flex flex-col relative group hover:-translate-y-1 transition-transform duration-300"
            >
              <Quote className="absolute top-8 right-8 text-[#1a5f48]/10 h-12 w-12 group-hover:text-[#1a5f48]/20 transition-colors" />

              <div className="flex items-center gap-1.5 mb-6">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} size={16} className="fill-[#1a5f48] text-[#1a5f48]" />
                ))}
              </div>

              <p className="text-gray-600 leading-relaxed mb-8 flex-grow text-lg italic">
                "{testimonial.text}"
              </p>

              <div className="flex items-center gap-4 mt-auto">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="h-14 w-14 rounded-full object-cover border-2 border-white shadow-md"
                />
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-[#1a5f48] font-medium">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
