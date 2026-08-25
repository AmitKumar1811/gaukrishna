import { Footer } from '@/components/footer'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

type Blog = {
    _id?: string
    title?: string
    slug?: string
    content?: string
    image?: string
    author?: string
    createdAt?: string
}

async function getBlog(slug: string): Promise<Blog | null> {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://backend-gau.onrender.com/api/v1'
        const res = await fetch(`${baseUrl}/blogs/${slug}`, { cache: 'no-store' })
        if (!res.ok) return null
        return res.json()
    } catch (error) {
        console.error('Failed to fetch blog:', error)
        return null
    }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params
    const blog = await getBlog(slug)
    return {
        title: blog?.title ? `${blog.title} - Gau Krishna` : 'Blog - Gau Krishna',
        description: blog?.title || 'Read the latest from Gau Krishna.',
    }
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const blog = await getBlog(slug)
    if (!blog) notFound()

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <main className="flex-1">
                <article className="mx-auto max-w-6xl px-4 py-16">
                    <Link href="/blogs" className="text-sm font-semibold text-[#1a5f48] hover:underline">
                        &larr; Back to blogs
                    </Link>
                    <p className="text-sm text-gray-500 mt-6 mb-3">
                        {blog.createdAt
                            ? new Date(blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                            : 'Recent'}
                        {blog.author ? ` · ${blog.author}` : ''}
                    </p>
                    <h1 className="text-4xl font-bold font-serif text-[#1a5f48] mb-8">{blog.title}</h1>
                    {blog.image && (
                        <img src={blog.image} alt={blog.title || 'Blog'} className="w-full rounded-xl object-cover mb-10 max-h-[420px]" />
                    )}
                    <div
                        className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: blog.content || '' }}
                    />
                </article>
            </main>
            <Footer />
        </div>
    )
}
