
import { Footer } from '@/components/footer'

export default function PartnerPage() {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />
            <main className="flex-1">
                <div className="mx-auto max-w-7xl px-4 py-16">
                    <h1 className="text-4xl md:text-5xl font-bold font-serif text-[#1a5f48] mb-8 text-center">Gau Krishna Health Partner</h1>

                    <div className="max-w-3xl mx-auto text-lg text-gray-700 leading-relaxed mb-16 text-center">
                        <p>
                            Join our mission to bring purity to every household. Become a Gau Krishna Health Partner and earn by promoting a healthier lifestyle in your community.
                        </p>
                        <button className="mt-8 bg-[#1a5f48] text-white px-8 py-3 rounded-full text-lg font-bold hover:bg-[#154d3b] transition-all shadow-lg hover:shadow-xl">
                            Register Now
                        </button>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="p-6 border border-[#dcf0e8] rounded-xl hover:bg-[#dcf0e8]/10 transition-colors text-center">
                            <div className="w-16 h-16 bg-[#1a5f48]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">💰</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Zero Investment</h3>
                            <p className="text-gray-600">Start your business with absolutely no initial capital.</p>
                        </div>
                        <div className="p-6 border border-[#dcf0e8] rounded-xl hover:bg-[#dcf0e8]/10 transition-colors text-center">
                            <div className="w-16 h-16 bg-[#1a5f48]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">📈</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">High Margins</h3>
                            <p className="text-gray-600">Earn attractive commissions on every sale you make.</p>
                        </div>
                        <div className="p-6 border border-[#dcf0e8] rounded-xl hover:bg-[#dcf0e8]/10 transition-colors text-center">
                            <div className="w-16 h-16 bg-[#1a5f48]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">🎓</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Training & Support</h3>
                            <p className="text-gray-600">Comprehensive product training and marketing support.</p>
                        </div>
                        <div className="p-6 border border-[#dcf0e8] rounded-xl hover:bg-[#dcf0e8]/10 transition-colors text-center">
                            <div className="w-16 h-16 bg-[#1a5f48]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">🎁</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Exclusive Rewards</h3>
                            <p className="text-gray-600">Special incentives and rewards for top performers.</p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
