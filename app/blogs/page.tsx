import { Footer } from '@/components/footer'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Blog - Gau Krishna',
  description: 'Read the latest updates, wellness tips, and Ayurvedic insights from Gau Krishna. Learn how to enrich your lifestyle naturally.',
}

async function getBlogs() {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://backend-gau.onrender.com/api/v1'
        const res = await fetch(`${baseUrl}/blogs?limit=50`, { cache: 'no-store' })
        if (!res.ok) {
            return []
        }
        const data = await res.json()
        return data?.data || []
    } catch (error) {
        console.error('Failed to fetch blogs:', error)
        return []
    }
}

export default async function BlogsPage() {
    const blogs = await getBlogs()

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <main className="flex-1">
                <div className="mx-auto max-w-7xl px-4 py-16">
                    <h1 className="text-4xl font-bold font-serif text-[#1a5f48] mb-12 text-center">Our Blog</h1>

                    {blogs.length === 0 ? (
                        <div className="text-center text-gray-500 py-12">
                            <p>No blogs available at the moment. Please check back later!</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {blogs.map((blog: any) => (
                                <div key={blog._id || blog.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col">
                                    <div className="h-48 bg-gray-200 relative">
                                        {blog.image ? (
                                            <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-500 bg-[#f8faf7]">
                                                No Image
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-6 flex flex-col flex-grow">
                                        <p className="text-sm text-gray-500 mb-2">
                                            {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Recent'}
                                        </p>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{blog.title}</h3>
                                        <p className="text-gray-600 mb-4 line-clamp-3 text-sm flex-grow">
                                            {(blog.content || '')
                                                .replace(/<[^>]*>/g, ' ')
                                                .replace(/\s+/g, ' ')
                                                .trim()
                                                .slice(0, 150)}
                                            {(blog.content || '').length > 150 ? '...' : ''}
                                        </p>
                                        <Link href={`/blogs/${blog.slug || blog._id}`} className="text-[#1a5f48] font-semibold hover:underline mt-auto inline-block">
                                            Read More &rarr;
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    )
}
