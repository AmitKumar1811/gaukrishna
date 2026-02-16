import Image from 'next/image'
import Link from 'next/link'

// Rebuild trigger

export function Hero() {
  return (
    <section className="relative w-full bg-[#f8f5f0]">
      {/* Mobile Banner */}
      <div className="block md:hidden relative w-full aspect-[390/480]">
        <Image
          src="/images/sliders.webp"
          alt="Gau Krishna Hero Banner"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <Link
            href="/products"
            className="bg-[#1a5f48] text-white px-8 py-3 rounded-full font-bold text-sm uppercase tracking-wide shadow-lg hover:bg-[#154d3a] transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </div>

      {/* Desktop Banner */}
      <div className="hidden md:block relative w-full aspect-[1440/600]">
        <Image
          src="/images/sliders.webp"
          alt="Gau Krishna Hero Banner"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute bottom-16 left-[10%]">
          <Link
            href="/products"
            className="bg-[#1a5f48] text-white px-10 py-4 rounded-full font-bold text-base uppercase tracking-wide shadow-xl hover:bg-[#154d3a] transition-all hover:scale-105"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  )
}
