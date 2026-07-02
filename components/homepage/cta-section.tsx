'use client'

import Link from 'next/link'
import { ArrowRight, Sparkles, ShieldCheck, Truck, Award, Leaf, Star, Heart } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/scroll-reveal'

const marqueeItems = [
  { icon: Leaf, text: '100% Pure A2 Gir Cow Ghee' },
  { icon: Award, text: 'Traditional Bilona Churned Method' },
  { icon: Truck, text: 'Express Shipping Across India' },
  { icon: ShieldCheck, text: '40+ Lab Quality Checks Passed' },
  { icon: Star, text: 'Loved By 50,000+ Happy Families' },
  { icon: Heart, text: 'Direct From Native Indian Farms' },
]

export function CTASection() {
  return (
    <section className="pt-20 md:pt-28 pb-0 relative overflow-hidden bg-gradient-to-b from-[#165c44] via-[#105b42] to-[#0d5538]">
      {/* Subtle radial glow accents */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-radial from-[#c59d48]/15 via-[#c59d48]/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-gradient-radial from-emerald-400/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Decorative subtle grid pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_0)] bg-[length:32px_32px] pointer-events-none" />

      {/* Main CTA Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center mb-16 md:mb-20">
        <ScrollReveal direction="up">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/90 text-xs md:text-sm font-semibold tracking-wide backdrop-blur-md mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#e5c158]" />
            Direct From Farm To Your Family
          </span>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.1}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">
            Experience The Difference
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-[#fce38a] via-[#e5c158] to-[#fce38a] bg-clip-text text-transparent">
              {' '}Pure Quality Makes
            </span>
          </h2>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.2}>
          <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            Join 50,000+ happy families across India. Experience 100% pure A2 Gir Cow Ghee
            and authentic cold-pressed oils delivered straight to your doorstep.
          </p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.3}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/products"
              className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white text-[#0d5538] rounded-2xl font-bold text-base shadow-xl shadow-black/10 hover:shadow-2xl hover:bg-[#fce38a] transition-all duration-300 hover:-translate-y-0.5 min-w-[180px]"
            >
              <span>Shop Now</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-2xl font-semibold text-base border border-white/25 hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:-translate-y-0.5 min-w-[180px]"
            >
              Contact Us
            </Link>
          </div>
        </ScrollReveal>
      </div>

      {/* Animated Infinite Marquee Ribbon (Seamless Footer Integration) */}
      <div className="relative w-full py-4 md:py-6 bg-black/15 border-t border-white/10 overflow-hidden backdrop-blur-sm">
        {/* Soft edge gradients */}
        <div className="absolute left-0 top-0 z-10 h-full w-16 md:w-32 bg-gradient-to-r from-[#0d5538] to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 z-10 h-full w-16 md:w-32 bg-gradient-to-l from-[#0d5538] to-transparent pointer-events-none" />

        {/* Scrolling ticker content */}
        <div className="animate-scroll-x flex w-max items-center">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, index) => {
            const ItemIcon = item.icon
            return (
              <div
                key={index}
                className="flex items-center gap-2.5 mx-6 md:mx-10 text-white/90 font-medium text-xs md:text-sm tracking-wide group whitespace-nowrap"
              >
                <div className="p-1.5 rounded-lg bg-white/10 text-[#fce38a] group-hover:scale-110 transition-transform duration-300">
                  <ItemIcon className="w-3.5 h-3.5 md:w-4 md:h-4" />
                </div>
                <span>{item.text}</span>
                <span className="ml-6 md:ml-10 text-white/20">•</span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}


