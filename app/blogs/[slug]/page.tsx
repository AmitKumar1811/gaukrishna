import { Footer } from '@/components/footer'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

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

async function getBlogs(): Promise<Blog[]> {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://backend-gau.onrender.com/api/v1'
        const res = await fetch(`${baseUrl}/blogs?limit=12`, { cache: 'no-store' })
        if (!res.ok) return []
        const data = await res.json()
        return Array.isArray(data?.data) ? data.data : []
    } catch (error) {
        console.error('Failed to fetch related blogs:', error)
        return []
    }
}

function blogHref(blog: Blog) {
    return `/blogs/${blog.slug || blog._id}`
}

function formatDate(date?: string) {
    return date
        ? new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        : 'Recent'
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
    const [blog, blogs] = await Promise.all([getBlog(slug), getBlogs()])
    if (!blog) notFound()

    const otherBlogs = blogs
        .filter((item) => (item.slug || item._id) !== (blog.slug || blog._id))
        .slice(0, 6)

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <main className="flex-1">
                <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
                    <Link href="/blogs" className="mb-8 inline-flex text-sm font-semibold text-[#1a5f48] hover:underline">
                        &larr; Back to blogs
                    </Link>

                    <div className="grid min-w-0 gap-10 lg:grid-cols-[minmax(0,1fr)_320px] xl:gap-14">
                        <article className="min-w-0 overflow-hidden">
                            <p className="mb-3 text-sm text-gray-500">
                                {formatDate(blog.createdAt)}{blog.author ? ` · ${blog.author}` : ''}
                            </p>
                            <h1 className="mb-8 max-w-full break-words font-serif text-3xl font-bold leading-tight text-[#1a5f48] sm:text-4xl lg:text-5xl">
                                {blog.title}
                            </h1>
                            {blog.image && (
                                <img
                                    src={blog.image}
                                    alt={blog.title || 'Blog'}
                                    className="mb-10 h-auto max-h-[560px] w-full rounded-2xl bg-gray-50 object-contain object-center shadow-sm"
                                />
                            )}
                            <div
                                className="prose prose-lg max-w-full overflow-hidden whitespace-normal break-words text-gray-700 leading-relaxed [&_*]:max-w-full [&_*]:whitespace-normal [&_*]:break-words [&_img]:h-auto"
                                dangerouslySetInnerHTML={{ __html: blog.content || '' }}
                            />
                        </article>

                        {otherBlogs.length > 0 && (
                            <aside className="min-w-0 lg:order-none">
                                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm lg:sticky lg:top-32">
                                    <div className="mb-5 flex items-center justify-between border-b border-gray-100 pb-4">
                                        <h2 className="font-serif text-2xl font-bold text-[#1a5f48]">Other Blogs</h2>
                                        <Link href="/blogs" className="text-xs font-semibold text-[#1a5f48] hover:underline">
                                            View all
                                        </Link>
                                    </div>
                                    <div className="space-y-5">
                                        {otherBlogs.slice(0, 5).map((item) => (
                                            <Link key={item._id || item.slug} href={blogHref(item)} className="group flex min-w-0 gap-3">
                                                <div className="h-20 w-24 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                                                    {item.image ? (
                                                        <img src={item.image} alt={item.title || 'Blog'} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                                                    ) : (
                                                        <div className="flex h-full items-center justify-center text-xs text-gray-400">No image</div>
                                                    )}
                                                </div>
                                                <div className="min-w-0">
                                                    <h3 className="line-clamp-2 break-words text-sm font-bold leading-snug text-gray-900 group-hover:text-[#1a5f48]">
                                                        {item.title}
                                                    </h3>
                                                    <p className="mt-2 text-xs text-gray-500">{formatDate(item.createdAt)}</p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </aside>
                        )}
                    </div>

                    {otherBlogs.length > 0 && (
                        <section className="mt-16 border-t border-gray-200 pt-10">
                            <div className="mb-7 flex items-end justify-between gap-4">
                                <div>
                                    <p className="mb-1 text-sm font-semibold uppercase tracking-wider text-[#1a5f48]">Keep reading</p>
                                    <h2 className="font-serif text-3xl font-bold text-gray-900">Related Posts</h2>
                                </div>
                                <Link href="/blogs" className="text-sm font-semibold text-[#1a5f48] hover:underline">All blogs &rarr;</Link>
                            </div>
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {otherBlogs.slice(0, 3).map((item) => (
                                    <Link key={item._id || item.slug} href={blogHref(item)} className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
                                        <div className="h-48 overflow-hidden bg-gray-100">
                                            {item.image ? (
                                                <img src={item.image} alt={item.title || 'Blog'} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                                            ) : (
                                                <div className="flex h-full items-center justify-center text-sm text-gray-400">No image</div>
                                            )}
                                        </div>
                                        <div className="p-5">
                                            <p className="mb-2 text-xs text-gray-500">{formatDate(item.createdAt)}</p>
                                            <h3 className="line-clamp-2 break-words text-lg font-bold leading-snug text-gray-900 group-hover:text-[#1a5f48]">{item.title}</h3>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    )
}
