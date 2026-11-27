import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://gaukrishna.in').replace(/\/$/, '')
const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'https://backend-gau.onrender.com/api/v1').replace(/\/$/, '')

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET() {
  const staticPaths = [
    { path: '/', priority: '1.0', changefreq: 'daily' },
    { path: '/products', priority: '0.9', changefreq: 'daily' },
    { path: '/products?category=chyawanprash', priority: '0.9', changefreq: 'weekly' },
    { path: '/products?category=ghee', priority: '0.9', changefreq: 'weekly' },
    { path: '/products?category=oil', priority: '0.9', changefreq: 'weekly' },
    { path: '/products?category=dup', priority: '0.8', changefreq: 'weekly' },
    { path: '/story', priority: '0.8', changefreq: 'monthly' },
    { path: '/blogs', priority: '0.9', changefreq: 'daily' },
    { path: '/contact', priority: '0.7', changefreq: 'monthly' },
    { path: '/track-order', priority: '0.5', changefreq: 'monthly' },
  ]

  let productEntries: { path: string; lastmod?: string }[] = []
  let blogEntries: { path: string; lastmod?: string }[] = []

  try {
    const [prodRes, blogRes] = await Promise.all([
      fetch(`${API_URL}/products?limit=200`, { next: { revalidate: 3600 } }),
      fetch(`${API_URL}/blogs?limit=100`, { next: { revalidate: 3600 } }),
    ])

    if (prodRes.ok) {
      const prodJson = await prodRes.json()
      const products = Array.isArray(prodJson?.data) ? prodJson.data : []
      productEntries = products
        .filter((p: any) => p?.slug || p?._id)
        .map((p: any) => ({
          path: `/products/${p.slug || p._id}`,
          lastmod: p.updatedAt || p.createdAt,
        }))
    }

    if (blogRes.ok) {
      const blogJson = await blogRes.json()
      const blogs = Array.isArray(blogJson?.data) ? blogJson.data : []
      blogEntries = blogs
        .filter((b: any) => b?.slug || b?._id)
        .map((b: any) => ({
          path: `/blogs/${b.slug || b._id}`,
          lastmod: b.updatedAt || b.createdAt,
        }))
    }
  } catch {
    // Fallback to static URLs if upstream API is unavailable
  }

  const urls = [
    ...staticPaths.map(
      (item) => `  <url>
    <loc>${escapeXml(`${SITE_URL}${item.path}`)}</loc>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`
    ),
    ...productEntries.map(
      (item) => `  <url>
    <loc>${escapeXml(`${SITE_URL}${item.path}`)}</loc>${
      item.lastmod ? `\n    <lastmod>${new Date(item.lastmod).toISOString()}</lastmod>` : ''
    }
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
    ),
    ...blogEntries.map(
      (item) => `  <url>
    <loc>${escapeXml(`${SITE_URL}${item.path}`)}</loc>${
      item.lastmod ? `\n    <lastmod>${new Date(item.lastmod).toISOString()}</lastmod>` : ''
    }
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
    ),
  ].join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
