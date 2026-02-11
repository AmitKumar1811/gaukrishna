
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export default function RefundPolicyPage() {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />
            <main className="flex-1">
                <div className="mx-auto max-w-4xl px-4 py-16">
                    <h1 className="text-4xl font-bold font-serif text-[#1a5f48] mb-8 text-center">Refund Policy</h1>
                    <div className="prose max-w-none text-gray-700 leading-relaxed space-y-4">
                        <p>Thanks for shopping at Gau Krishna. If you are not entirely satisfied with your purchase, we're here to help.</p>
                        <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-4">1. Returns</h2>
                        <p>You have 7 calendar days to return an item from the date you received it. To be eligible for a return, your item must be unused, in the same condition that you received it, and in the original packaging.</p>
                        <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-4">2. Refunds</h2>
                        <p>Once we receive your item, we will inspect it and notify you that we have received your returned item. We will immediately notify you on the status of your refund after inspecting the item.</p>
                        <p>If your return is approved, we will initiate a refund to your credit card (or original method of payment). You will receive the credit within a certain amount of days, depending on your card issuer's policies.</p>
                        <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-4">3. Shipping</h2>
                        <p>You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are nonrefundable. If you receive a refund, the cost of return shipping will be deducted from your refund.</p>
                        <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-4">4. Contact Us</h2>
                        <p>If you have any questions on how to return your item to us, contact us.</p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
