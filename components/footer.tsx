import Link from 'next/link'
import { Facebook, Instagram, Mail, Twitter } from 'lucide-react'

const badges = [
  'ISO 9001:2015',
  'ISO 22000:2018',
  'fssai',
  'FDA',
  'GMP Certified',
  'HACCP Certified',
  'IAF',
]

export function Footer() {
  return (
    <footer className="bg-[#0f6845] text-white mt-10">
      {/* Certifications Strip */}
      <div className="bg-white py-8 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-6 md:gap-8">
            {badges.map((badge) => (
              <div
                key={badge}
                className="px-4 py-2 border-2 border-[#0f6845] rounded-full text-sm font-semibold text-[#0f6845] bg-white"
              >
                {badge}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand & Newsletter */}
          <div className="space-y-6">
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

            <div className="pt-4">
              <h4 className="font-bold text-sm mb-4 uppercase tracking-wider">Subscribe to our newsletter</h4>
              <form className="flex w-full max-w-sm items-center space-x-2">
                <input
                  type="email"
                  placeholder="Email"
                  className="flex h-10 w-full rounded-md border border-white/20 bg-[#0f6845] px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </form>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-[#dcf0e8] mb-6 uppercase tracking-wider text-sm">Services</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/products" className="hover:text-[#dcf0e8] transition-colors opacity-90 hover:opacity-100">Shop</Link></li>
              <li><Link href="/track-order" className="hover:text-[#dcf0e8] transition-colors opacity-90 hover:opacity-100">Track Your Order</Link></li>
              <li><Link href="/story" className="hover:text-[#dcf0e8] transition-colors opacity-90 hover:opacity-100">Our Story</Link></li>
              <li><Link href="/blogs" className="hover:text-[#dcf0e8] transition-colors opacity-90 hover:opacity-100">Blog</Link></li>
              <li><Link href="/corporate" className="hover:text-[#dcf0e8] transition-colors opacity-90 hover:opacity-100">Corporate Info</Link></li>
              <li><Link href="/contact" className="hover:text-[#dcf0e8] transition-colors opacity-90 hover:opacity-100">Contact Us</Link></li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="font-bold text-[#dcf0e8] mb-6 uppercase tracking-wider text-sm">Policies</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/privacy-policy" className="hover:text-[#dcf0e8] transition-colors opacity-90 hover:opacity-100">Privacy Policy</Link></li>
              <li><Link href="/shipping-policy" className="hover:text-[#dcf0e8] transition-colors opacity-90 hover:opacity-100">Shipping Policy</Link></li>
              <li><Link href="/refund-policy" className="hover:text-[#dcf0e8] transition-colors opacity-90 hover:opacity-100">Refund Policy</Link></li>
              <li><Link href="/terms" className="hover:text-[#dcf0e8] transition-colors opacity-90 hover:opacity-100">Terms of Service</Link></li>
              <li><Link href="/sitemap" className="hover:text-[#dcf0e8] transition-colors opacity-90 hover:opacity-100">Sitemap</Link></li>
            </ul>
          </div>

          {/* Need Help */}
          <div className="space-y-6">
            <div>
              <h4 className="font-bold text-[#dcf0e8] mb-6 uppercase tracking-wider text-sm">Need Help?</h4>
              <button className="bg-[#d0c689] hover:bg-[#c0b679] text-[#1a5f48] font-bold py-2 px-6 rounded-full transition-colors w-full sm:w-auto mb-6">
                Contact Us
              </button>
              <div className="flex gap-4">
                <a href="#" className="bg-[#d0c689] p-2 rounded-full text-[#1a5f48] hover:scale-110 transition-transform"><Facebook size={20} /></a>
                <a href="#" className="bg-[#d0c689] p-2 rounded-full text-[#1a5f48] hover:scale-110 transition-transform"><Instagram size={20} /></a>
                <a href="#" className="bg-[#d0c689] p-2 rounded-full text-[#1a5f48] hover:scale-110 transition-transform"><Mail size={20} /></a>
                <a href="#" className="bg-[#d0c689] p-2 rounded-full text-[#1a5f48] hover:scale-110 transition-transform"><Twitter size={20} /></a>
              </div>
            </div>

            <div className="pt-2">
              <h4 className="font-bold text-sm mb-3 text-[#dcf0e8]">Download App</h4>
              <div className="flex gap-3">
                <div className="h-10 w-32 bg-black rounded border border-white/20 flex items-center justify-center text-xs cursor-pointer hover:bg-black/80">
                  Google Play
                </div>
                <div className="h-10 w-32 bg-black rounded border border-white/20 flex items-center justify-center text-xs cursor-pointer hover:bg-black/80">
                  App Store
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-16 pt-8 text-center text-xs text-white/70">
          <p>Copyright © 2026, Gau Krishna Farm Technologies Pvt. Ltd.</p>
        </div>
      </div>
    </footer>
  )
}
