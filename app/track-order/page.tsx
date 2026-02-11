
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export default function TrackOrderPage() {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />
            <main className="flex-1">
                <div className="mx-auto max-w-4xl px-4 py-16 text-center">
                    <h1 className="text-4xl font-bold font-serif text-[#1a5f48] mb-8">Track Your Order</h1>
                    <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                        To track your order please enter your Order ID in the box below and press the "Track" button. This was given to you on your receipt and in the confirmation email you should have received.
                    </p>
                    <div className="max-w-md mx-auto space-y-4">
                        <input
                            type="text"
                            placeholder="Order ID"
                            className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-[#1a5f48] focus:border-[#1a5f48]"
                        />
                        <input
                            type="email"
                            placeholder="Billing Email"
                            className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-[#1a5f48] focus:border-[#1a5f48]"
                        />
                        <button className="w-full bg-[#1a5f48] text-white py-3 rounded hover:bg-[#154d3b] transition-colors font-semibold">
                            Track
                        </button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
