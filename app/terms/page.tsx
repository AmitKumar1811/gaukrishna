
import { Footer } from '@/components/footer'

export default function TermsPage() {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />
            <main className="flex-1">
                <div className="mx-auto max-w-4xl px-4 py-16">
                    <h1 className="text-4xl font-bold font-serif text-[#1a5f48] mb-8 text-center">Terms of Service</h1>
                    <div className="prose max-w-none text-gray-700 leading-relaxed space-y-4">
                        <p>Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the Gau Krishna website (the "Service") operated by Gau Krishna Farm Technologies Pvt. Ltd. ("us", "we", or "our").</p>
                        <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-4">1. Accounts</h2>
                        <p>When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.</p>
                        <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-4">2. Intellectual Property</h2>
                        <p>The Service and its original content, features and functionality are and will remain the exclusive property of Gau Krishna Farm Technologies Pvt. Ltd. and its licensors.</p>
                        <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-4">3. Links To Other Web Sites</h2>
                        <p>Our Service may contain links to third-party web sites or services that are not owned or controlled by Gau Krishna Farm Technologies Pvt. Ltd.</p>
                        <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-4">4. Termination</h2>
                        <p>We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
                        <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-4">5. Governing Law</h2>
                        <p>These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions.</p>
                        <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-4">6. Changes</h2>
                        <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.</p>
                        <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-4">7. Contact Us</h2>
                        <p>If you have any questions about these Terms, please contact us.</p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
