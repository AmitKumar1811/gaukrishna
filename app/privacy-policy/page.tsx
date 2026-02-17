
import { Footer } from '@/components/footer'

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />
            <main className="flex-1">
                <div className="mx-auto max-w-4xl px-4 py-16">
                    <h1 className="text-4xl font-bold font-serif text-[#1a5f48] mb-8 text-center">Privacy Policy</h1>
                    <div className="prose max-w-none text-gray-700 leading-relaxed space-y-4">
                        <p>At Gau Krishna, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information.</p>
                        <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-4">1. Information We Collect</h2>
                        <p>We may collect personal identification information from Users in a variety of ways, including, but not limited to, when Users visit our site, register on the site, place an order, subscribe to the newsletter, respond to a survey, fill out a form, and in connection with other activities, services, features or resources we make available on our Site.</p>
                        <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-4">2. How We Use Collected Information</h2>
                        <p>Gau Krishna collects and uses Users personal information for the following purposes:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>To improve customer service</li>
                            <li>To personalize user experience</li>
                            <li>To distinctively process payments</li>
                            <li>To send periodic emails</li>
                        </ul>
                        <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-4">3. Contact Us</h2>
                        <p>If you have any questions about this Privacy Policy, the practices of this site, or your dealings with this site, please contact us at: <a href="mailto:privacy@gaukrishna.com" className="text-[#1a5f48]">privacy@gaukrishna.com</a></p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
