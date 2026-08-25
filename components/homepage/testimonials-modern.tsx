'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Minerva Thakur',
    text: 'A variety of ways to use my favourite coconut oil and honey. My skin feels nourished, my cuticles are soft, my lips are smooth, and many other benefits come from using them!',
    rating: 5,
    role: 'Wellness Enthusiast',
    initials: 'MT',
  },
  {
    name: 'Lakshmi Dev',
    text: 'Their ghee helped solve my acid reflux problem. While cooking with wood pressed oils imparts a unique taste and I feel lighter.',
    rating: 5,
    role: 'Home Chef',
    initials: 'LD',
  },
  {
    name: 'Dr Shagun Walia',
    text: 'This ghee is the most healthy option out there for children. I use it regularly for my daughter and she loves the taste.',
    rating: 5,
    role: 'Pediatrician',
    initials: 'SW',
  },
  {
    name: 'Pankaj Tiwari',
    text: "Works very well for holistic healing! typical honey. It is very sweet and clean, like nobody's business :)",
    rating: 5,
    role: 'Ayurveda Practitioner',
    initials: 'PT',
  },
]

export function TestimonialsModern() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const updateScrollButtons = () => {
    const el = scrollContainerRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 10)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10)
  }

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 420
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
      setTimeout(updateScrollButtons, 400)
    }
  }

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-radial from-[#1a5f48]/3 to-transparent rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="max-w-xl"
          >
            <div className="flex flex-col gap-1 mb-4 opacity-90">
              <span className="text-[#1a5f48] font-serif text-xl sm:text-2xl tracking-widest">
                विश्वास जो परंपरा से आता है
              </span>
              <span className="text-[#1a5f48]/70 text-[10px] uppercase tracking-[0.2em] font-semibold">
                Trust that comes from tradition
              </span>
            </div>
            <span className="text-[#1a5f48] font-semibold tracking-widest uppercase text-xs md:text-sm mb-3 block mt-2">
              Testimonials
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Loved by <span className="text-[#1a5f48]">Thousands</span>
            </h2>
            <p className="text-gray-500 text-base md:text-lg">
              Don&apos;t just take our word for it. Here&apos;s what our community has to say about the purity we deliver.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex gap-3"
          >
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className="h-12 w-12 rounded-2xl border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-[#1a5f48] hover:text-white hover:border-[#1a5f48] transition-all duration-300 shadow-sm hover:shadow-lg disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-400 disabled:hover:border-gray-200 disabled:hover:shadow-sm"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className="h-12 w-12 rounded-2xl border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-[#1a5f48] hover:text-white hover:border-[#1a5f48] transition-all duration-300 shadow-sm hover:shadow-lg disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-400 disabled:hover:border-gray-200 disabled:hover:shadow-sm"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </motion.div>
        </div>

        {/* Testimonial Cards */}
        <div
          ref={scrollContainerRef}
          onScroll={updateScrollButtons}
          className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              className="flex-shrink-0 w-[85vw] sm:w-[380px] snap-center"
            >
              <div className="group relative h-full bg-gradient-to-br from-white to-gray-50/50 rounded-3xl p-8 border border-gray-100 hover:border-[#1a5f48]/20 shadow-sm hover:shadow-xl hover:shadow-[#1a5f48]/5 transition-all duration-500 hover:-translate-y-2 flex flex-col">
                {/* Quote icon */}
                <Quote className="absolute top-6 right-6 h-10 w-10 text-[#1a5f48]/8 group-hover:text-[#1a5f48]/15 transition-colors duration-500" />

                {/* Stars */}
                <div className="flex items-center gap-1 mb-6">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} size={14} className="fill-[#c59d48] text-[#c59d48]" />
                  ))}
                </div>

                {/* Text */}
                <p className="text-gray-600 leading-relaxed mb-8 flex-grow text-[15px]">
                  &ldquo;{testimonial.text}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 mt-auto pt-6 border-t border-gray-100">
                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#1a5f48] to-[#2a8f6a] text-white flex items-center justify-center font-bold text-sm shadow-md">
                    {testimonial.initials}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">{testimonial.name}</h4>
                    <p className="text-xs text-[#1a5f48] font-medium">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
