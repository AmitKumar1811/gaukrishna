import { NextRequest, NextResponse } from 'next/server'

const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'https://backend-gau.onrender.com/api/v1').replace(/\/$/, '')

interface CachedProduct {
  id: string
  name: string
  slug: string
  price: number
  originalPrice?: number
  stock: number
  category: string
  description: string
  image?: string
}

let productCache: { items: CachedProduct[]; expiresAt: number } = {
  items: [],
  expiresAt: 0,
}

async function getLiveProducts(): Promise<CachedProduct[]> {
  if (Date.now() < productCache.expiresAt && productCache.items.length > 0) {
    return productCache.items
  }
  try {
    const res = await fetch(`${API_URL}/products?limit=100`, { cache: 'no-store' })
    if (!res.ok) return productCache.items
    const json = await res.json()
    const raw = Array.isArray(json?.data) ? json.data : []
    const items: CachedProduct[] = raw
      .filter((p: any) => p && p.isActive !== false && p.name)
      .map((p: any) => ({
        id: p._id || p.id || '',
        name: String(p.name || ''),
        slug: String(p.slug || p._id || ''),
        price: Number(p.discountPrice || p.price || 0),
        originalPrice: p.price ? Number(p.price) : undefined,
        stock: typeof p.stock === 'number' ? p.stock : 10,
        category: String(p.category?.name || p.category || ''),
        description: String(p.description || ''),
        image: p.image || p.images?.[0],
      }))
    productCache = { items, expiresAt: Date.now() + 5 * 60 * 1000 }
    return items
  } catch {
    return productCache.items
  }
}

async function lookupOrderTracking(ref: string) {
  try {
    const res = await fetch(`${API_URL}/orders/track/${encodeURIComponent(ref.trim())}`, {
      cache: 'no-store',
    })
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

const STOP_WORDS = new Set([
  'hi', 'hello', 'hey', 'namaste', 'please', 'can', 'you', 'tell', 'me', 'about', 'what', 'is',
  'the', 'for', 'and', 'with', 'how', 'much', 'does', 'cost', 'buy', 'online', 'price', 'rate',
  'in', 'of', 'to', 'a', 'an', 'kya', 'hai', 'ka', 'ke', 'ki', 'chahiye', 'batao', 'bataye',
  'show', 'need', 'want', 'good', 'best', 'product', 'products', 'gau', 'krishna', 'gaukrishna',
])

function findMatchingProducts(query: string, products: CachedProduct[]): CachedProduct[] {
  const tokens = query
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .split(/\s+/)
    .filter((t) => t.length >= 2 && !STOP_WORDS.has(t))

  if (tokens.length === 0) return []

  const scored = products
    .map((p) => {
      const hay = `${p.name} ${p.category} ${p.description}`.toLowerCase()
      let score = 0
      for (const token of tokens) {
        if (p.name.toLowerCase().includes(token)) score += 3
        else if (p.category.toLowerCase().includes(token)) score += 2
        else if (hay.includes(token)) score += 1
      }
      return { product: p, score }
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)

  return scored.slice(0, 3).map((x) => x.product)
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const rawMessage = String(body?.message || '').trim()
    if (!rawMessage) {
      return NextResponse.json({
        reply: 'Namaste! Please type your question about our A2 Ghee, Chyawanprash, Oils, COD, or order tracking.',
      })
    }

    const lower = rawMessage.toLowerCase()

    // 1. Live Order Tracking lookup (GK-... order ID or 10-16 digit AWB waybill)
    const orderRefMatch = rawMessage.match(/\b(GK-[A-Z0-9-]+)\b/i) || rawMessage.match(/\b(\d{10,16})\b/)
    if (orderRefMatch && !lower.includes('phone') && !lower.includes('mobile') && !lower.includes('call')) {
      const ref = orderRefMatch[1]
      const tracking = await lookupOrderTracking(ref)
      if (tracking && (tracking.success || tracking.orderStatus || tracking.deliveryStatus)) {
        const status = tracking.deliveryStatus || tracking.orderStatus || 'Confirmed'
        const waybill = tracking.waybill || 'Pending allocation'
        return NextResponse.json({
          reply: `Order **${tracking.customOrderId || ref}**\n• Status: **${status}**\n• Waybill: **${waybill}**`,
          links: [
            {
              label: 'View Full Tracking',
              href: `/track-order?orderId=${encodeURIComponent(tracking.customOrderId || ref)}`,
            },
          ],
        })
      }
    }

    // 2. Greeting
    if (/^(hi|hello|hey|namaste|ram ram|jai shri krishna|radhe radhe)[\s!.]*$/i.test(lower)) {
      return NextResponse.json({
        reply:
          'Namaste! Welcome to **Gau Krishna (Ram Rasoi)**.\nAsk me about **A2 Bilona Ghee**, **Kesar Yukt Chyawanprash**, **Virgin Coconut Oil**, **Wood Pressed Groundnut Oil**, **COD charges**, or enter your **Order ID (GK-...)** to track your order!',
        suggestions: ['Chyawanprash Price', 'A2 Ghee Benefits', 'COD & Shipping', 'Track Order'],
      })
    }

    // 3. Order Tracking intent (without ID yet)
    if (/\b(track|tracking|where is my order|order status|waybill|awb|delhivery)\b/i.test(lower)) {
      return NextResponse.json({
        reply:
          'You can paste your **Order ID** (example: `GK-20261125-JBYLE8`) or **Waybill number** right here, or open our Order Tracking page.',
        links: [{ label: 'Open Track Order Page', href: '/track-order' }],
      })
    }

    // 4. COD & Payment Methods
    if (/\b(cod|cash on delivery|pay on delivery|payment|razorpay|upi)\b/i.test(lower)) {
      return NextResponse.json({
        reply:
          'Yes! We support both:\n• **Cash on Delivery (COD):** Pay cash or UPI at delivery (+₹50 COD charge).\n• **Online Payment:** UPI, Cards & Netbanking via Razorpay (no extra COD fee).',
        links: [{ label: 'Go to Checkout', href: '/checkout' }],
      })
    }

    // 5. Shipping, Delivery Time, Returns
    if (/\b(ship|shipping|delivery|free delivery|charges|return|refund|cancel)\b/i.test(lower)) {
      return NextResponse.json({
        reply:
          '• **Shipping:** FREE shipping on orders ₹500 and above (₹50 flat shipping under ₹500).\n• **Delivery Time:** 3–5 business days across India via Delhivery.\n• **COD Option:** Available with ₹50 COD fee.',
        links: [
          { label: 'Shipping Policy', href: '/shipping-policy' },
          { label: 'Refund Policy', href: '/refund-policy' },
        ],
      })
    }

    // 6. Contact / Agent / WhatsApp / Address / Phone
    if (/\b(contact|agent|human|whatsapp|address|location|office|phone|number|call|email|dhingsara|fatehabad|support|help)\b/i.test(lower)) {
      return NextResponse.json({
        reply:
          '**Gau Krishna Enterprises**\n• **WhatsApp / Agent:** +91 99969-90290\n• **Call:** +91 97289 30001 (Open Daily till 11 PM)\n• **Address:** 411 Ground Floor, Fatehabad Road, Dhingsara, Fatehabad, Haryana 125053\n• **Email:** gaukrishnaenterprises@gmail.com',
        links: [{ label: 'Contact Us Page', href: '/contact' }],
      })
    }

    // 7. Story / Gau Seva / Rajiv Dixit / Ram Rasoi
    if (/\b(story|about|gau seva|gaushala|cow|rajpal|rajiv dixit|swadeshi|mother|bilona)\b/i.test(lower)) {
      return NextResponse.json({
        reply:
          'Gau Krishna & **Ram Rasoi** began in **Dhingsara, Fatehabad (Haryana)** with Rajpal Suthar and his mother, inspired by **Shri Rajiv Dixit Ji’s** Swadeshi vision. We care for thousands of native cows and craft pure A2 Bilona Ghee & Ayurvedic products without chemicals.',
        links: [{ label: 'Read Our Story (Hindi)', href: '/story' }],
      })
    }

    // 8. Live Product Search + Product-specific FAQs
    const products = await getLiveProducts()
    const matchedProducts = findMatchingProducts(rawMessage, products)

    const isChyawanprash = /chyawanprash|chawanprash|kesar|chyawan|च्यवनप्राश/.test(lower)
    const isGhee = /\bghee\b|घी|gir cow|a2/.test(lower)
    const isCoconut = /coconut|face|skin|hair|moisturizer/.test(lower)
    const isGroundnut = /groundnut|peanut|oil|tel|kolhu/.test(lower)
    const isDhoop = /dhoop|dup|panchgavya|batti|pooja/.test(lower)

    let infoText = ''
    if (isChyawanprash) {
      infoText =
        '**Gau Krishna / Ram Rasoi Kesar Yukt Chyawanprash** is prepared in Dhingsara using wild-crafted amla, pure A2 Bilona cow ghee, kesar, ashwagandha, giloy, and 40+ Ayurvedic herbs — supporting immunity, energy, and digestion.'
    } else if (isGhee) {
      infoText =
        'Our **A2 Desi / Gir Cow Bilona Ghee** is churned traditionally from curd (dahi) for better digestion, natural vitamins A, D, E, K, and pure nutrition.'
    } else if (isCoconut) {
      infoText =
        'Our **Wood-Pressed Virgin Coconut Oil** is chemical-free and great both for cooking and as a natural overnight face moisturizer (warm 2–3 drops on damp skin; patch-test if oily/acne-prone).'
    } else if (isGroundnut) {
      infoText =
        'Our **Wood-Pressed (Kacchi Ghani) Oils** are extracted at low temperature without refining so natural antioxidants and aroma stay intact.'
    } else if (isDhoop) {
      infoText =
        'Our **Panchgavya Dhoop Batti** is made with pure desi cow dung, ghee, and herbs for clean, chemical-free daily pooja.'
    }

    if (matchedProducts.length > 0 || infoText) {
      return NextResponse.json({
        reply:
          infoText ||
          `Here ${matchedProducts.length === 1 ? 'is a matching product' : 'are matching products'} from Gau Krishna:`,
        products: matchedProducts.map((p) => ({
          name: p.name,
          price: p.price,
          inStock: p.stock > 0,
          href: `/products/${p.slug}`,
        })),
      })
    }

    // 9. Helpful Fallback
    return NextResponse.json({
      reply:
        'I can help you with:\n• **Product prices & benefits** (A2 Ghee, Chyawanprash, Virgin Coconut Oil, Groundnut Oil, Dhoop Batti)\n• **COD & Shipping details**\n• **Live Order Tracking** (just paste your `GK-...` Order ID)\n• **Store Contact & Address**',
      suggestions: ['Chyawanprash Price', 'A2 Ghee Benefits', 'Coconut Oil for Face', 'Contact & Address'],
    })
  } catch (error) {
    console.error('Chatbot error:', error)
    return NextResponse.json(
      {
        reply: 'Sorry, something went wrong. You can reach us directly at **+91 97289 30001** or visit our Contact page.',
        links: [{ label: 'Contact Us', href: '/contact' }],
      },
      { status: 500 }
    )
  }
}
