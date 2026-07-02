'use client'

const sliderImages = [
  '/slider/anv-1.png',
  '/slider/anv-2.png',
  '/slider/anv-3.png',
  '/slider/anv-4.png',
  '/slider/anv-5.png',
  '/slider/anv-6.png',
  '/slider/anv-7.png',
  '/slider/anv-8.png',
]

export function CertificationsBanner() {
  return (
    <section className="py-10 md:py-14 bg-[#f8faf7] overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <span className="text-gray-400 font-medium tracking-widest uppercase text-xs">
          Trusted & Certified
        </span>
      </div>

      <div className="relative w-full">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 z-10 h-full w-16 md:w-32 bg-gradient-to-r from-[#f8faf7] to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 z-10 h-full w-16 md:w-32 bg-gradient-to-l from-[#f8faf7] to-transparent pointer-events-none" />

        <div className="animate-scroll-x flex w-max">
          {[...sliderImages, ...sliderImages].map((img, index) => (
            <div
              key={index}
              className="mx-6 md:mx-12 flex items-center justify-center h-10 w-20 md:h-16 md:w-32 flex-shrink-0"
            >
              <img
                src={img}
                alt="Certification badge"
                className="max-h-full max-w-full object-contain opacity-50 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-500"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
