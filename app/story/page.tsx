
import { Footer } from '@/components/footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Story - Gau Krishna',
  description: 'Learn about the journey of Gau Krishna, from native geographies to the time-tested traditional Bilona methods.',
}

export default function StoryPage() {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <main className="flex-1">
                <div className="mx-auto max-w-7xl px-4 py-16">
                    <h1 className="text-4xl md:text-5xl font-bold font-serif text-[#1a5f48] mb-8 text-center">Our Story</h1>

                    <div className="flex flex-col md:flex-row items-center gap-12 mb-16">
                        <div className="w-full md:w-1/2 aspect-video bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                            Image: Founder in Farm
                        </div>
                        <div className="w-full md:w-1/2 prose max-w-none text-lg text-gray-700 leading-relaxed">
                            <p>
                                Gau Krishna was born from a simple desire: to bring the purest, most authentic products from our farms to your table. Our journey began in the lush green fields of Gujarat, where traditional farming practices have been preserved for generations.
                            </p>
                            <p className="mt-4">
                                We realized that in the race for mass production, the essence of purity was often lost. That's why we decided to go back to our roots. We adopted the ancient Bilona method for making ghee, ensuring that every jar is packed with nutrients and love.
                            </p>
                        </div>
                    </div>

                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold font-serif text-gray-900 mb-6">Our Mission</h2>
                        <p className="text-xl text-gray-600 italic">
                            "To revive the health and wellness of every household by providing food that is not just a meal, but a medicine."
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div className="p-6 bg-[#dcf0e8]/30 rounded-lg">
                            <h3 className="text-xl font-bold text-[#1a5f48] mb-2">100% Natural</h3>
                            <p className="text-gray-600">No chemicals, no preservatives. Just pure goodness.</p>
                        </div>
                        <div className="p-6 bg-[#dcf0e8]/30 rounded-lg">
                            <h3 className="text-xl font-bold text-[#1a5f48] mb-2">Ethical Sourcing</h3>
                            <p className="text-gray-600">We care for our cows and farmers like family.</p>
                        </div>
                        <div className="p-6 bg-[#dcf0e8]/30 rounded-lg">
                            <h3 className="text-xl font-bold text-[#1a5f48] mb-2">Traditional Methods</h3>
                            <p className="text-gray-600">Ancient wisdom combined with modern hygiene standards.</p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
