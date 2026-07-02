'use client'

import Link from 'next/link'
import { Facebook, Instagram, Mail, Twitter, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'

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
    <footer className="bg-[#0d5538] text-white mt-0 border-t border-white/10 relative">
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

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        
        {/* Mobile: Centered Logo & Address */}
        <div className="md:hidden flex flex-col items-center text-center space-y-4 mb-8">
          <Link href="/" className="relative h-14 w-44 overflow-hidden block">
            <Image
              src="/footerlogo1.png"
              alt="Gau Krishna Logo"
              fill
              priority
              className="object-contain scale-[2.2] origin-center"
              sizes="180px"
            />
          </Link>
          <div className="text-xs text-white/80 space-y-1 max-w-xs">
            <p>Corporate Office - Dhingsara , Fatehabad</p>
            <p>Registered Office - Main Bus stand Dhingasara</p>
            <p className="pt-1">
              Grievance Officer: <span className="underline cursor-pointer font-medium text-white">Amit Suthar</span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          
          {/* Desktop Brand Column */}
          <div className="hidden md:block space-y-6">
            <div className="space-y-4">
              <Link href="/" className="inline-block relative h-16 w-52 sm:w-56 overflow-hidden group">
                <Image
                  src="/footerlogo1.png"
                  alt="Gau Krishna Logo"
                  fill
                  priority
                  className="object-contain scale-[2.2] sm:scale-[2.4] origin-center transition-transform duration-300 group-hover:scale-[2.5]"
                  sizes="220px"
                />
              </Link>
              <div className="text-sm text-white/80 space-y-1">
                <p>Corporate Office - Dhingsara , Fatehabad</p>
                <p>Registered Office - Main Bus stand Dhingasara</p>
              </div>
              <p className="text-sm text-white/80">
                Grievance Redressal Officer: <span className="underline cursor-pointer font-medium text-white">Amit Suthar</span>
              </p>
            </div>
          </div>

          {/* Services - Accordion on Mobile */}
          <div className="border-b border-white/15 md:border-none pb-4 md:pb-0">
            <button
              onClick={() => toggleSection('services')}
              className="flex items-center justify-between w-full md:cursor-default py-2 md:py-0"
            >
              <h4 className="font-bold text-[#dcf0e8] uppercase tracking-wider text-xs sm:text-sm">Services</h4>
              <span className="md:hidden text-[#dcf0e8]">
                {openSection === 'services' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </span>
            </button>
            <ul className={`space-y-3 text-sm mt-3 md:mt-4 transition-all duration-300 md:block ${openSection === 'services' ? 'block' : 'hidden'}`}>
              <li><Link href="/products" className="text-white/80 hover:text-[#dcf0e8] transition-colors">Shop All Products</Link></li>
              <li><Link href="/track-order" className="text-white/80 hover:text-[#dcf0e8] transition-colors">Track Your Order</Link></li>
              <li><Link href="/story" className="text-white/80 hover:text-[#dcf0e8] transition-colors">Our Story</Link></li>
              <li><Link href="/blogs" className="text-white/80 hover:text-[#dcf0e8] transition-colors">Blog</Link></li>
              <li><Link href="/corporate" className="text-white/80 hover:text-[#dcf0e8] transition-colors">Corporate Info</Link></li>
              <li><Link href="/contact" className="text-white/80 hover:text-[#dcf0e8] transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Policies - Accordion on Mobile */}
          <div className="border-b border-white/15 md:border-none pb-4 md:pb-0">
            <button
              onClick={() => toggleSection('policies')}
              className="flex items-center justify-between w-full md:cursor-default py-2 md:py-0"
            >
              <h4 className="font-bold text-[#dcf0e8] uppercase tracking-wider text-xs sm:text-sm">Policies</h4>
              <span className="md:hidden text-[#dcf0e8]">
                {openSection === 'policies' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </span>
            </button>
            <ul className={`space-y-3 text-sm mt-3 md:mt-4 transition-all duration-300 md:block ${openSection === 'policies' ? 'block' : 'hidden'}`}>
              <li><Link href="/privacy-policy" className="text-white/80 hover:text-[#dcf0e8] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/shipping-policy" className="text-white/80 hover:text-[#dcf0e8] transition-colors">Shipping Policy</Link></li>
              <li><Link href="/refund-policy" className="text-white/80 hover:text-[#dcf0e8] transition-colors">Refund Policy</Link></li>
              <li><Link href="/terms" className="text-white/80 hover:text-[#dcf0e8] transition-colors">Terms of Service</Link></li>
              <li><Link href="/sitemap" className="text-white/80 hover:text-[#dcf0e8] transition-colors">Sitemap</Link></li>
            </ul>
          </div>

          {/* Need Help & Social Links */}
          <div className="space-y-5 text-center md:text-left pt-2 md:pt-0">
            <div>
              <h4 className="font-bold text-[#dcf0e8] mb-4 uppercase tracking-wider text-xs sm:text-sm">Need Help?</h4>
              <Link
                href="/contact"
                className="bg-[#d0c689] hover:bg-[#c0b679] text-[#1a5f48] font-bold py-3 px-8 rounded-full transition-all shadow-sm hover:shadow-md inline-flex items-center justify-center gap-2 mb-6 w-full sm:w-auto"
              >
                <span>Contact Us</span>
              </Link>

              <div className="flex justify-center md:justify-start gap-4">
                <a href="#" className="bg-[#d0c689] p-2.5 rounded-full text-[#1a5f48] hover:scale-110 transition-transform shadow-sm" aria-label="Facebook"><Facebook size={18} /></a>
                <a href="#" className="bg-[#d0c689] p-2.5 rounded-full text-[#1a5f48] hover:scale-110 transition-transform shadow-sm" aria-label="Instagram"><Instagram size={18} /></a>
                <a href="#" className="bg-[#d0c689] p-2.5 rounded-full text-[#1a5f48] hover:scale-110 transition-transform shadow-sm" aria-label="Mail"><Mail size={18} /></a>
                <a href="#" className="bg-[#d0c689] p-2.5 rounded-full text-[#1a5f48] hover:scale-110 transition-transform shadow-sm" aria-label="Twitter"><Twitter size={18} /></a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-white/10 mt-10 md:mt-14 pt-8 text-center text-xs text-white/60">
          <p>Copyright © 2026, Gau Krishna Farm Technologies Pvt. Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
