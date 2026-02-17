
import { Footer } from '@/components/footer'

export default function ShippingPolicyPage() {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <main className="flex-1">
                <div className="mx-auto max-w-4xl px-4 py-16">
                    <h1 className="text-4xl font-bold font-serif text-[#1a5f48] mb-8 text-center">Shipping Policy</h1>
                    <div className="prose max-w-none text-gray-700 leading-relaxed space-y-4">
                        <p>Thank you for visiting and shopping at Gau Krishna. Following are the terms and conditions that constitute our Shipping Policy.</p>
                        <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-4">1. Shipment Processing Time</h2>
                        <p>All orders are processed within 2-3 business days. Orders are not shipped or delivered on weekends or holidays.</p>
                        <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-4">2. Shipping Rates & Delivery Estimates</h2>
                        <p>Shipping charges for your order will be calculated and displayed at checkout.</p>
                        <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-4">3. Shipment Confirmation & Order Tracking</h2>
                        <p>You will receive a Shipment Confirmation email once your order has shipped containing your tracking number(s). The tracking number will be active within 24 hours.</p>
                        <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-4">4. International Shipping Policy</h2>
                        <p>We currently do not ship outside the India.</p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
