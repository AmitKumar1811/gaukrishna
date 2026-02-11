
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export default function ContactPage() {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />
            <main className="flex-1">
                <div className="mx-auto max-w-4xl px-4 py-16">
                    <h1 className="text-4xl font-bold font-serif text-[#1a5f48] mb-12 text-center">Contact Us</h1>

                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Office Address</h3>
                                <p className="text-gray-600">
                                    Sector 44, Gurugram<br />
                                    Haryana, India - 122003
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Email Us</h3>
                                <p className="text-gray-600"><a href="mailto:support@gaukrishna.com">support@gaukrishna.com</a></p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Call Us</h3>
                                <p className="text-gray-600">+91 98765-43210</p>
                                <p className="text-sm text-gray-500">(Mon-Sat: 10AM - 7PM)</p>
                            </div>
                        </div>

                        <form className="space-y-4">
                            <input type="text" placeholder="Your Name" className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-[#1a5f48] focus:border-[#1a5f48]" />
                            <input type="email" placeholder="Your Email" className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-[#1a5f48] focus:border-[#1a5f48]" />
                            <input type="text" placeholder="Subject" className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-[#1a5f48] focus:border-[#1a5f48]" />
                            <textarea placeholder="Message" rows={5} className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-[#1a5f48] focus:border-[#1a5f48]"></textarea>
                            <button type="submit" className="w-full bg-[#1a5f48] text-white py-3 rounded hover:bg-[#154d3b] transition-colors font-semibold">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
