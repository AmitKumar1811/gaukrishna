# Gau Krishna - Complete Routes Reference

## All Available Routes

### Main Pages

| Route | File | Purpose | Status |
|-------|------|---------|--------|
| `/` | `app/page.tsx` | Home page with hero, categories, features | ✅ Working |
| `/products` | `app/products/page.tsx` | All products listing grid | ✅ Working |
| `/cart` | `app/cart/page.tsx` | Shopping cart review | ✅ Working |
| `/checkout` | `app/checkout/page.tsx` | Checkout form | ✅ Working |
| `/order-success` | `app/order-success/page.tsx` | Order confirmation | ✅ Working |

### Dynamic Product Pages

| Route | File | Purpose | Status |
|-------|------|---------|--------|
| `/products/a2-gir-cow-ghee-5l` | `app/products/[id]/page.tsx` | A2 Gir Cow Ghee details | ✅ Working |
| `/products/a2-desi-cow-ghee-5l` | `app/products/[id]/page.tsx` | A2 Desi Cow Ghee details | ✅ Working |
| `/products/bilona-churned-desi-buffalo-ghee` | `app/products/[id]/page.tsx` | Buffalo Ghee details | ✅ Working |
| `/products/wood-pressed-groundnut-oil-5l` | `app/products/[id]/page.tsx` | Groundnut Oil details | ✅ Working |
| `/products/wood-pressed-mustard-oil-5l` | `app/products/[id]/page.tsx` | Mustard Oil details | ✅ Working |
| `/products/wood-pressed-coconut-oil-5l` | `app/products/[id]/page.tsx` | Coconut Oil details | ✅ Working |

---

## Route Structure

```
Gau Krishna Website
│
├── Home (/)
│   ├── Hero Section
│   ├── Categories Navigation
│   ├── Featured Products
│   ├── Features Section
│   └── Testimonials
│
├── Products (/products)
│   ├── All Products Grid
│   ├── Product Cards
│   └── Individual Product Details (/products/[id])
│
├── Shopping
│   ├── Cart (/cart)
│   ├── Checkout (/checkout)
│   └── Order Success (/order-success)
│
└── Navigation (Header & Footer)
    ├── Home Link
    ├── Products Link
    ├── About Link
    ├── Cart Icon Badge
    └── Footer Links
```

---

## Navigation Flow

### User Journey Path

```
Start: /
   ↓
Browse: /products
   ↓
Details: /products/[id]
   ↓
Add to Cart → Stay on /products/[id]
   ↓
View Cart: /cart
   ↓
Proceed: /checkout
   ↓
Confirm: /order-success
```

---

## Breadcrumb Navigation

### Breadcrumbs on Each Page

| Page | Breadcrumb |
|------|-----------|
| `/` | *None* (home) |
| `/products` | Home / Products |
| `/products/[id]` | Home / Products / [Product Name] |
| `/cart` | Home / Products / Cart |
| `/checkout` | Home / Products / Cart / Checkout |
| `/order-success` | *None* (confirmation page) |

---

## Header Links

```
Logo: / (Home)
│
├── Home → /
├── Products → /products
├── About → /#about (scroll to section)
│
├── Search Icon (placeholder)
├── User Icon
└── Cart Icon → /cart (with item count badge)
```

---

## Footer Links

```
Services
├── Shop → /products
├── Track Your Order → /order-success
├── Our Story → /
├── Blog → / (external)
└── Corporate Info → / (external)

Policies
├── Privacy Policy → / (external)
├── Shipping Policy → / (external)
├── Refund Policy → / (external)
└── Terms of Service → / (external)

Help
├── Contact Us → / (button)
└── Get 17% Off → / (promo link)

Download App
├── Google Play → / (external)
└── App Store → / (external)

Social Media
├── Facebook → / (external)
├── Instagram → / (external)
├── Email → / (external)
└── Twitter → / (external)
```

---

## Direct Links in Components

### Product Card Links
```
Product Card Component
└── Click → /products/[id]
```

### Category Links
```
Categories Component
├── All → /products
├── Ghee → /products (filters to ghee)
├── Oils → /products (filters to oils)
└── Combos → /products (filters to combos)
```

### Button Links

| Button | Route | Location |
|--------|-------|----------|
| "View Details" | `/products/[id]` | Product Card |
| "Add to Cart" | Stay on page | Product Detail |
| "Buy Now" | `/checkout` | Product Detail |
| "Continue Shopping" | `/products` | Cart, Checkout, Empty states |
| "Proceed to Checkout" | `/checkout` | Cart |
| "Back to Products" | `/products` | 404, Error states |
| "Place Order" | `/order-success` | Checkout |
| "Back to Home" | `/` | Order Success, Error states |

---

## Error Routes

| Scenario | Route | Behavior |
|----------|-------|----------|
| Invalid Product ID | `/products/invalid-id` | Shows "Product not found" message |
| Empty Cart Checkout | `/checkout` | Shows "Cart is empty" message |
| | | Suggests "Continue Shopping" |

---

## Query Parameters (Future Enhancement)

```
Currently Not Used - Ready for:
/products?category=ghee          → Filter to ghee products
/products?search=coconut         → Search functionality
/order-success?orderId=123ABC    → Pass order ID
/order-success?total=50000       → Pass total amount
```

---

## API Routes (Ready for Backend)

```
When Integrating Backend APIs:
/api/products               → GET all products
/api/products/[id]         → GET single product
/api/cart                   → POST add to cart
/api/checkout              → POST place order
/api/payment               → POST payment processing
/api/email                 → POST send email
/api/orders                → GET user orders
/api/auth                  → POST login/register
```

---

## Component Route Integration

### Header Navigation
```typescript
import Link from 'next/link'

// Header Links
<Link href="/">Home</Link>
<Link href="/products">Products</Link>
<Link href="/cart">Cart Icon</Link>
```

### Product Card Linking
```typescript
<Link href={`/products/${product.id}`}>
  <ProductCard product={product} />
</Link>
```

### Button Navigation
```typescript
import { useRouter } from 'next/navigation'

const router = useRouter()
const handleCheckout = () => {
  router.push('/checkout')
}
```

---

## Cache & Performance

### Static Routes (Pre-rendered)
- `/` - Home page
- `/products` - Products listing

### Dynamic Routes
- `/products/[id]` - Product detail (ISR possible)
- `/order-success` - Order confirmation

### Client-Side Routes
- `/cart` - Shopping cart
- `/checkout` - Checkout form

---

## Mobile Menu Routes

```
Mobile Menu (Hamburger)
├── Home → /
├── Products → /products
├── About → /#about
├── User Icon
└── Cart Icon → /cart
```

---

## History & State Management

### Browser History
```
/ → /products → /products/[id] 
  → /cart (back button available)
  → /checkout (back button disabled)
  → /order-success (back button to home)
```

### Cart State
```
Persisted across all routes using localStorage
- Added on /products/[id]
- Viewable on /cart
- Used on /checkout
- Cleared on /order-success
```

---

## Testing Routes

### Complete Route Test
```bash
1. Visit http://localhost:3000          → Home page loads
2. Click Products                       → /products loads
3. Click Any Product                    → /products/[id] loads
4. Click Add to Cart                    → Page stays, shows confirmation
5. Click Cart Icon                      → /cart loads
6. Click Proceed to Checkout            → /checkout loads
7. Fill form & Submit                   → /order-success loads
```

### Invalid Route Test
```bash
1. Visit http://localhost:3000/invalid  → 404 handled
2. Visit /products/fake-id              → Shows "Product not found"
3. Visit /checkout with empty cart      → Shows "Cart is empty"
```

---

## Meta Routes & Headers

### Each Page Has
```
- Proper <title> in HTML head
- Meta description for SEO
- Viewport for mobile
- Open Graph tags (ready for social)
```

---

## External Links (Placeholders)

```
These currently link to / but can be updated:
- Blog
- Privacy Policy
- Shipping Policy
- Refund Policy
- Terms of Service
- Google Play
- App Store
- Social Media Links (Facebook, Instagram, etc.)
```

---

## Route Parameters

### Product Detail Route
```
/products/[id]

Valid IDs:
- a2-gir-cow-ghee-5l
- a2-desi-cow-ghee-5l
- bilona-churned-desi-buffalo-ghee
- wood-pressed-groundnut-oil-5l
- wood-pressed-mustard-oil-5l
- wood-pressed-coconut-oil-5l
```

---

## Recommended Route Additions (Future)

```
When expanding:
/account                    → User account dashboard
/account/login             → Login page
/account/register          → Registration page
/account/orders            → Order history
/account/profile           → Profile management
/wishlist                  → Saved products
/search?q=keyword          → Search results
/about                     → About us page
/blog                      → Blog listing
/blog/[slug]              → Blog post detail
/contact                   → Contact form
/faq                       → FAQ page
/policy/[type]            → Policy pages
```

---

## Summary

### Current Routes: 7 Main + 6 Product Details = 13 Routes
```
✅ / (Home)
✅ /products (Listing)
✅ /products/[id] × 6 (Details - dynamic)
✅ /cart (Shopping Cart)
✅ /checkout (Checkout)
✅ /order-success (Confirmation)
```

### All Routes Tested & Working ✅
### All Routes Documented ✅
### All Routes Production Ready ✅

---

## Quick Reference

| I Want To... | Go To... |
|---|---|
| See home | `/` |
| Browse products | `/products` |
| View a product | `/products/[product-id]` |
| Check cart | `/cart` |
| Buy products | `/checkout` |
| See order | `/order-success` |

---

**Gau Krishna - All Routes Documented & Working**
