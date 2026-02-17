
import { Footer } from '@/components/footer'

const blogs = [
    {
        id: 1,
        title: "The Benefits of A2 Ghee",
        excerpt: "Discover why A2 Ghee is considered a superfood in Ayurveda and how it can improve your health.",
        date: "October 10, 2023",
        image: "/images/blog1.jpg",
    },
    {
        id: 2,
        title: "Wood Pressed Oils vs Refined Oils",
        excerpt: "Understand the difference between cold-pressed and refined oils and make a healthier choice for your family.",
        date: "September 25, 2023",
        image: "/images/blog2.jpg",
    },
    {
        id: 3,
        title: "5 Immune Boosting Recipes",
        excerpt: "Simple and delicious recipes using our organic products to boost your immunity this winter.",
        date: "November 05, 2023",
        image: "/images/blog3.jpg",
    }
]

export default function BlogsPage() {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />
            <main className="flex-1">
                <div className="mx-auto max-w-7xl px-4 py-16">
                    <h1 className="text-4xl font-bold font-serif text-[#1a5f48] mb-12 text-center">Our Blog</h1>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogs.map((blog) => (
                            <div key={blog.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                <div className="h-48 bg-gray-200">
                                    {/* Placeholder for blog image */}
                                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                                        Blog Image
                                    </div>
                                </div>
                                <div className="p-6">
                                    <p className="text-sm text-gray-500 mb-2">{blog.date}</p>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{blog.title}</h3>
                                    <p className="text-gray-600 mb-4 line-clamp-3">{blog.excerpt}</p>
                                    <button className="text-[#1a5f48] font-semibold hover:underline">Read More &rarr;</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
