'use client'

import Link from 'next/link'
import { Facebook, Instagram, Mail, Twitter, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'

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

export function Footer() {
  const [openSection, setOpenSection] = useState<string | null>(null)

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section)
  }

  return (
    <footer className="bg-[#0f6845] text-white mt-10">
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
          display: flex;
          width: max-content;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Certifications Carousel */}
      <div className="bg-white py-10 border-t border-border overflow-hidden">
        <div className="relative w-full">
          <div className="absolute left-0 top-0 z-10 h-full w-12 md:w-32 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
          <div className="absolute right-0 top-0 z-10 h-full w-12 md:w-32 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>

          <div className="animate-scroll hover:pause">
            {[...sliderImages, ...sliderImages].map((img, index) => (
              <div
                key={index}
                className="mx-3 md:mx-12 flex items-center justify-center h-10 w-20 md:h-20 md:w-40"
              >
                <img
                  src={img}
                  alt="Certification"
                  className="max-h-full max-w-full object-contain hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        {/* Mobile: Centered Brand Name */}
        <div className="md:hidden text-center mb-8">
          <h3 className="font-serif text-3xl font-bold lowercase mb-2">gau krishna</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">

          {/* Brand & Newsletter (Desktop Only Position / Reordered on Mobile) */}
          <div className="hidden md:block space-y-6">
            <div className="space-y-4">
              <h3 className="font-serif text-3xl font-bold lowercase">gau krishna</h3>
              <div className="text-sm opacity-90 space-y-1">
                <p>Corporate Office - Dhingsara , Fatehabad</p>
                <p>Registered Office - Main Bus stand Dhingasara</p>
              </div>
              <p className="text-sm opacity-90">
                Grievance Redressal Officer: <span className="underline cursor-pointer">Amit Suthar</span>
              </p>
            </div>
          </div>

          {/* Services - Accordion on Mobile */}
          <div className="border-b border-white/20 md:border-none pb-4 md:pb-0">
            <button
              onClick={() => toggleSection('services')}
              className="flex items-center justify-between w-full md:cursor-default"
            >
              <h4 className="font-bold text-[#dcf0e8] uppercase tracking-wider text-sm">Services</h4>
              <span className="md:hidden">
                {openSection === 'services' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </span>
            </button>
            <ul className={`space-y-3 text-sm mt-4 md:block ${openSection === 'services' ? 'block' : 'hidden'}`}>
              <li><Link href="/products" className="hover:text-[#dcf0e8] transition-colors opacity-90 hover:opacity-100">Shop</Link></li>
              <li><Link href="/track-order" className="hover:text-[#dcf0e8] transition-colors opacity-90 hover:opacity-100">Track Your Order</Link></li>
              <li><Link href="/story" className="hover:text-[#dcf0e8] transition-colors opacity-90 hover:opacity-100">Our Story</Link></li>
              <li><Link href="/blogs" className="hover:text-[#dcf0e8] transition-colors opacity-90 hover:opacity-100">Blog</Link></li>
              <li><Link href="/corporate" className="hover:text-[#dcf0e8] transition-colors opacity-90 hover:opacity-100">Corporate Info</Link></li>
              <li><Link href="/contact" className="hover:text-[#dcf0e8] transition-colors opacity-90 hover:opacity-100">Contact Us</Link></li>
            </ul>
          </div>

          {/* Policies - Accordion on Mobile */}
          <div className="border-b border-white/20 md:border-none pb-4 md:pb-0">
            <button
              onClick={() => toggleSection('policies')}
              className="flex items-center justify-between w-full md:cursor-default"
            >
              <h4 className="font-bold text-[#dcf0e8] uppercase tracking-wider text-sm">Policies</h4>
              <span className="md:hidden">
                {openSection === 'policies' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </span>
            </button>
            <ul className={`space-y-3 text-sm mt-4 md:block ${openSection === 'policies' ? 'block' : 'hidden'}`}>
              <li><Link href="/privacy-policy" className="hover:text-[#dcf0e8] transition-colors opacity-90 hover:opacity-100">Privacy Policy</Link></li>
              <li><Link href="/shipping-policy" className="hover:text-[#dcf0e8] transition-colors opacity-90 hover:opacity-100">Shipping Policy</Link></li>
              <li><Link href="/refund-policy" className="hover:text-[#dcf0e8] transition-colors opacity-90 hover:opacity-100">Refund Policy</Link></li>
              <li><Link href="/terms" className="hover:text-[#dcf0e8] transition-colors opacity-90 hover:opacity-100">Terms of Service</Link></li>
              <li><Link href="/sitemap" className="hover:text-[#dcf0e8] transition-colors opacity-90 hover:opacity-100">Sitemap</Link></li>
            </ul>
          </div>

          {/* Need Help & Contact */}
          <div className="space-y-6">
            <div>
              <h4 className="font-bold text-[#dcf0e8] mb-4 uppercase tracking-wider text-sm">Need Help?</h4>
              <button className="bg-[#d0c689] hover:bg-[#c0b679] text-[#1a5f48] font-bold py-2.5 px-6 rounded-full transition-colors w-full md:w-auto mb-6 flex items-center justify-center gap-2">
                <span>Contact Us</span>
              </button>

              <div className="flex justify-center md:justify-start gap-4">
                <a href="#" className="bg-[#d0c689] p-2.5 rounded-full text-[#1a5f48] hover:scale-110 transition-transform"><Facebook size={20} /></a>
                <a href="#" className="bg-[#d0c689] p-2.5 rounded-full text-[#1a5f48] hover:scale-110 transition-transform"><Instagram size={20} /></a>
                <a href="#" className="bg-[#d0c689] p-2.5 rounded-full text-[#1a5f48] hover:scale-110 transition-transform"><Mail size={20} /></a>
                <a href="#" className="bg-[#d0c689] p-2.5 rounded-full text-[#1a5f48] hover:scale-110 transition-transform"><Twitter size={20} /></a>
              </div>
            </div>
          </div>

        </div>

        {/* Mobile: Address & Info (Shown at bottom) */}
        <div className="md:hidden text-center space-y-4 mt-8 pt-8 border-t border-white/20">
          <div className="text-sm opacity-90 space-y-1">
            <p>Corporate Office - Dhingsara , Fatehabad</p>
            <p>Registered Office - Main Bus stand Dhingasara</p>
          </div>
          <p className="text-sm opacity-90">
            Grievance Redressal Officer: <span className="underline cursor-pointer">Amit Suthar</span>
          </p>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center text-xs text-white/70">
          <p>Copyright © 2026, Gau Krishna Farm Technologies Pvt. Ltd.</p>
        </div>
      </div>
    </footer>
  )
}
