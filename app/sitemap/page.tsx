
import { Footer } from '@/components/footer'
import Link from 'next/link'

export default function SitemapPage() {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <main className="flex-1">
                <div className="mx-auto max-w-7xl px-4 py-16">
                    <h1 className="text-4xl font-bold font-serif text-[#1a5f48] mb-12 text-center">Sitemap</h1>
                    <div className="grid md:grid-cols-3 gap-12 text-gray-700">
                        <div>
                            <h2 className="text-xl font-bold mb-6 text-gray-900 border-b pb-2">Main Pages</h2>
                            <ul className="space-y-3">
                                <li><Link href="/" className="hover:text-[#1a5f48] transition-colors">Home</Link></li>
                                <li><Link href="/products" className="hover:text-[#1a5f48] transition-colors">Shop All</Link></li>
                                <li><Link href="/cart" className="hover:text-[#1a5f48] transition-colors">Your Cart</Link></li>
                                <li><Link href="/profile" className="hover:text-[#1a5f48] transition-colors">My Account</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold mb-6 text-gray-900 border-b pb-2">Categories</h2>
                            <ul className="space-y-3">
                                <li><Link href="/products?category=ghee" className="hover:text-[#1a5f48] transition-colors">A2 Ghee</Link></li>
                                <li><Link href="/products?category=oils" className="hover:text-[#1a5f48] transition-colors">Wood-Pressed Oils</Link></li>
                                <li><Link href="/products?category=atta" className="hover:text-[#1a5f48] transition-colors">Atta</Link></li>
                                <li><Link href="/products?category=combo" className="hover:text-[#1a5f48] transition-colors">Healthy Combos</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold mb-6 text-gray-900 border-b pb-2">Information</h2>
                            <ul className="space-y-3">
                                <li><Link href="/story" className="hover:text-[#1a5f48] transition-colors">Our Story</Link></li>
                                <li><Link href="/blogs" className="hover:text-[#1a5f48] transition-colors">Blog</Link></li>
                                <li><Link href="/corporate" className="hover:text-[#1a5f48] transition-colors">Corporate Info</Link></li>
                                <li><Link href="/contact" className="hover:text-[#1a5f48] transition-colors">Contact Us</Link></li>
                                <li><Link href="/track-order" className="hover:text-[#1a5f48] transition-colors">Track Order</Link></li>
                                <li><Link href="/partner" className="hover:text-[#1a5f48] transition-colors">Health Partner</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold mb-6 text-gray-900 border-b pb-2">Policies</h2>
                            <ul className="space-y-3">
                                <li><Link href="/privacy-policy" className="hover:text-[#1a5f48] transition-colors">Privacy Policy</Link></li>
                                <li><Link href="/shipping-policy" className="hover:text-[#1a5f48] transition-colors">Shipping Policy</Link></li>
                                <li><Link href="/refund-policy" className="hover:text-[#1a5f48] transition-colors">Refund Policy</Link></li>
                                <li><Link href="/terms" className="hover:text-[#1a5f48] transition-colors">Terms of Service</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
