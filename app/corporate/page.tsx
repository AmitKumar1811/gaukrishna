
import { Footer } from '@/components/footer'

export default function CorporatePage() {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <main className="flex-1">
                <div className="mx-auto max-w-7xl px-4 py-16">
                    <h1 className="text-4xl font-bold font-serif text-[#1a5f48] mb-12 text-center">Corporate Information</h1>

                    <div className="grid md:grid-cols-2 gap-12 text-gray-700">
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">About Gau Krishna Farm Technologies</h2>
                                <p>
                                    Gau Krishna Farm Technologies Pvt. Ltd. is a leading provider of premium, naturally processed agricultural products. Established in 2020, we are dedicated to promoting sustainable farming and bringing authentic Indian superfoods to global markets.
                                </p>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Our Vision</h2>
                                <p>
                                    To be the most trusted brand for natural and organic food products, setting standards for purity and quality.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Company Details</h2>
                                <ul className="space-y-2">
                                    <li><span className="font-bold">Registered Name:</span> Gau Krishna Farm Technologies Pvt. Ltd.</li>
                                    <li><span className="font-bold">CIN:</span> U01111HR2020PTC012345</li>
                                    <li><span className="font-bold">Date of Incorporation:</span> 15th August 2020</li>
                                    <li><span className="font-bold">Registered Office:</span> Sector 44, Gurugram, Haryana - 122003</li>
                                </ul>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Contact for Corporate Inquiries</h2>
                                <p>
                                    Email: <a href="mailto:corporate@gaukrishna.com" className="text-[#1a5f48]">corporate@gaukrishna.com</a>
                                </p>
                                <p>
                                    Phone: +91 124-4567890
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
