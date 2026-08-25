'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'

export function AnimatedHero() {
  return (
    <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-center justify-center overflow-hidden bg-white py-20">
      {/* Hero Background Photo */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <Image
          src="/images/sliders.webp"
          alt="Gau Krishna Farm & Pure Ghee Background"
          fill
          priority
          className="object-cover object-center opacity-85 md:opacity-80"
          sizes="100vw"
        />
        {/* Lighter, crisp gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/50 to-white/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
          className="mb-6 md:mb-8 flex flex-col items-center justify-center gap-4"
        >
          <div className="flex flex-col items-center justify-center gap-1 opacity-90">
            <span className="text-[#1a5f48] font-serif text-xl sm:text-2xl tracking-widest">
              गावो विश्वस्य मातरः
            </span>
            <span className="text-[#1a5f48]/70 text-[10px] uppercase tracking-[0.2em] font-semibold">
              Cows are the mothers of the universe
            </span>
          </div>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1a5f48]/8 border border-[#1a5f48]/15 text-[#1a5f48] text-sm font-medium backdrop-blur-sm mt-2">
            <span className="w-2 h-2 rounded-full bg-[#1a5f48] animate-pulse" />
            Pure Desi Ghee &amp; Cold-Pressed Oils
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 mb-6 md:mb-8 leading-[1.1]"
        >
          Pure. Traditional.
          <br />
          <span className="bg-gradient-to-r from-[#1a5f48] via-[#2a8f6a] to-[#c59d48] bg-clip-text text-transparent">
            Uncompromised.
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-base sm:text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-8 md:mb-12 leading-relaxed"
        >
          A2 ghee from Gir cows, cold-pressed oils from native seeds — crafted with
          Bilona methods, verified through 40+ lab tests. Farm to family, the way it was always meant to be.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease: [0.25, 0.4, 0.25, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/products"
            className="group relative inline-flex items-center gap-2 px-8 py-4 bg-[#1a5f48] text-white rounded-2xl font-semibold text-base shadow-lg shadow-[#1a5f48]/25 hover:shadow-xl hover:shadow-[#1a5f48]/30 transition-all duration-300 hover:-translate-y-0.5 overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#154d3a] to-[#1a5f48] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative">Explore Products</span>
            <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link
            href="/story"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white/60 backdrop-blur-sm text-gray-700 rounded-2xl font-semibold text-base border border-gray-200 hover:border-[#1a5f48]/30 hover:text-[#1a5f48] hover:bg-white/80 transition-all duration-300 hover:-translate-y-0.5 shadow-sm"
          >
            Our Story
          </Link>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-12 md:mt-16 flex items-center justify-center gap-6 md:gap-10 text-gray-400 text-xs md:text-sm"
        >
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-[#1a5f48]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
            <span>FSSAI Certified</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-[#1a5f48]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
            <span>100% Pure</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-[#1a5f48]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
            <span>Lab Tested</span>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-gray-400 font-medium tracking-widest uppercase">Scroll</span>
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </motion.div>
      </motion.div>
    </section>
  )
}
