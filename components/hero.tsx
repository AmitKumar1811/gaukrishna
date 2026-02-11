import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative w-full h-[85vh] overflow-hidden">
      {/* Background Image with Zoom Effect */}
      <div className="absolute inset-0">
        <img
          src="/images/slider.webp"
          alt="Hero Banner"
          className="w-full h-full object-cover transition-transform duration-[20s] hover:scale-110"
        />
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
      </div>

      {/* Content Container */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-2xl text-white space-y-6 animate-fade-in-up">
          <div className="inline-block px-4 py-1.5 rounded-full bg-[#1a5f48] bg-opacity-90 text-sm font-medium tracking-wide uppercase mb-4 border border-[#dcf0e8]/30 backdrop-blur-sm">
            Pure • Authentic • Traditional
          </div>

          <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight drop-shadow-lg">
            Rediscover the <br />
            <span className="text-[#dcf0e8]">Golden Purity</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-200 max-w-xl leading-relaxed drop-shadow-md">
            Hand-churned A2 Gir Cow Ghee made using the ancient Bilona method.
            Bring home health, taste, and tradition.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link
              href="/products"
              className="group flex items-center justify-center gap-2 px-8 py-4 bg-[#1a5f48] hover:bg-[#154d3b] text-white rounded-full font-semibold transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-[#1a5f48]/50"
            >
              Shop Now
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/story"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-full font-semibold transition-all duration-300 transform hover:-translate-y-1"
            >
              Our Story
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
