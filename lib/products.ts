export interface ProductVariant {
  id: string
  size: string
  price: number
  originalPrice: number
  quantity: string
}

export interface Product {
  id: string
  slug: string
  name: string
  image: string
  rating: number
  reviews: number
  category: string
  categoryId?: string
  description: string
  fullDescription: string
  tags: string[]
  variants: ProductVariant[]
  benefits: string[]
  certifications: string[]
  isBestSeller?: boolean
  isNewLaunch?: boolean
}

export const products: Product[] = [
  {
    id: 'a2-gir-cow-ghee-5l',
    slug: 'a2-gir-cow-ghee-5l',
    name: 'A2 Gir Cow Ghee - 5L Dolchi',
    image: '/images/image.webp',
    rating: 4.7,
    reviews: 1373,
    category: 'Ghee',
    description: 'Milk from Gir cows of Gujarat | Nutrient dense & heart-healthy | Bilona-churned | 70+ quality checks',
    fullDescription: 'Made in the farms of Gujarat, our A2 Gir Cow Ghee is the epitome of purity. Made using verified A2 milk of Gir Cows, this single-source ghee will change the way you think ghee. Traditionally churned from curd, not cream, this ghee is light on your gut and full of nutrients and heart-healthy fats. No hidden ingredients, no shortcuts. Only 100% A2 ghee.',
    tags: ['Best Seller', 'Top Rated Choice', 'Winter', 'Superfood', 'Deal'],
    variants: [
      { id: 'v1', size: '500ml Jar', price: 1250, originalPrice: 2500, quantity: '500ml' },
      { id: 'v2', size: '1L Jar', price: 2400, originalPrice: 2400, quantity: '1L' },
      { id: 'v3', size: '2.5L Dolchi', price: 5684, originalPrice: 5800, quantity: '2.5L' },
      { id: 'v4', size: '5L Dolchi', price: 10913, originalPrice: 11250, quantity: '5L' },
    ],
    benefits: [
      'Rich in butyric acid for gut health',
      'High in conjugated linoleic acid (CLA)',
      'Natural source of vitamin A, D, E, K2',
      'Supports digestion and immunity',
      'Perfect for cooking with high smoke point',
    ],
    certifications: ['ISO 9001:2015', 'ISO 22000:2018', 'FSSAI', 'FDA', 'GMP Certified', 'HACCP', 'IAF'],
  },
  {
    id: 'a2-desi-cow-ghee-5l',
    slug: 'a2-desi-cow-ghee-5l',
    name: 'A2 Desi Cow Ghee - 5L Dolchi',
    image: '/images/image.webp',
    rating: 4.7,
    reviews: 1373,
    category: 'Ghee',
    description: 'Premium A2 ghee from Desi cows | Pure and authentic | Bilona-churned | 40+ quality checks',
    fullDescription: 'Our A2 Desi Cow Ghee is sourced from the finest Desi cattle farms across India. Each batch is carefully crafted using traditional bilona method, ensuring maximum nutrition and taste. The ghee is tested for purity at every stage to guarantee you receive only the best quality product.',
    tags: ['Top Rated Choice'],
    variants: [
      { id: 'v1', size: '500ml Jar', price: 1150, originalPrice: 2300, quantity: '500ml' },
      { id: 'v2', size: '1L Jar', price: 2200, originalPrice: 2200, quantity: '1L' },
      { id: 'v3', size: '2.5L Dolchi', price: 5200, originalPrice: 5400, quantity: '2.5L' },
      { id: 'v4', size: '5L Dolchi', price: 9797, originalPrice: 10100, quantity: '5L' },
    ],
    benefits: [
      'Authentic desi cow breed genetics',
      'Higher fat-soluble vitamin content',
      'Supports bone health and strength',
      'Enhanced digestive enzymes',
      'Perfect for traditional Indian cooking',
    ],
    certifications: ['ISO 9001:2015', 'ISO 22000:2018', 'FSSAI', 'FDA', 'GMP Certified', 'HACCP', 'IAF'],
  },
  {
    id: 'bilona-churned-desi-buffalo-ghee',
    slug: 'bilona-churned-desi-buffalo-ghee',
    name: 'Bilona-Churned Desi Buffalo Ghee - 5L Dolchi',
    image: '/images/image.webp',
    rating: 4.4,
    reviews: 198,
    category: 'Ghee',
    description: 'Rich buffalo milk ghee | Creamy texture | Traditional bilona method | Premium quality',
    fullDescription: 'Experience the richness of traditional buffalo ghee. Our buffalo ghee is made from pure buffalo milk using the ancient bilona churning method. This ghee has a unique creamy taste and is known for its deep color and rich nutritional profile.',
    tags: ['Premium'],
    variants: [
      { id: 'v1', size: '500ml Jar', price: 1400, originalPrice: 2800, quantity: '500ml' },
      { id: 'v2', size: '1L Jar', price: 2700, originalPrice: 2700, quantity: '1L' },
      { id: 'v3', size: '2.5L Dolchi', price: 6000, originalPrice: 6250, quantity: '2.5L' },
      { id: 'v4', size: '5L Dolchi', price: 11500, originalPrice: 12000, quantity: '5L' },
    ],
    benefits: [
      'Rich in fat-soluble vitamins',
      'Creamy and luxurious texture',
      'Supports cognitive function',
      'Traditional method processing',
      'Perfect for massage and beauty',
    ],
    certifications: ['ISO 9001:2015', 'ISO 22000:2018', 'FSSAI', 'FDA', 'GMP Certified'],
  },
  {
    id: 'wood-pressed-groundnut-oil-5l',
    slug: 'wood-pressed-groundnut-oil-5l',
    name: 'Wood-Pressed Groundnut Oil - 5L Tin Can',
    image: '/images/image.webp',
    rating: 4.5,
    reviews: 890,
    category: 'Oils',
    description: '100% pure groundnut oil | Cold-pressed | No chemicals | Traditional extraction',
    fullDescription: 'Our wood-pressed groundnut oil is extracted using traditional methods without any chemicals or solvents. The result is a pure, nutrient-rich oil with a natural nutty flavor. Perfect for cooking, tempering, and massage.',
    tags: ['Selling Fast', 'Best Seller'],
    variants: [
      { id: 'v1', size: '500ml Bottle', price: 350, originalPrice: 700, quantity: '500ml' },
      { id: 'v2', size: '1L Bottle', price: 650, originalPrice: 650, quantity: '1L' },
      { id: 'v3', size: '2L Can', price: 1200, originalPrice: 1300, quantity: '2L' },
      { id: 'v4', size: '5L Can', price: 2800, originalPrice: 3000, quantity: '5L' },
    ],
    benefits: [
      'High in monounsaturated fats',
      'Rich in vitamin E',
      'High smoke point for cooking',
      'No additives or preservatives',
      'Traditional wood-pressed method',
    ],
    certifications: ['FSSAI', 'ISO 22000:2018', 'Organic Certified'],
  },
  {
    id: 'wood-pressed-mustard-oil-5l',
    slug: 'wood-pressed-mustard-oil-5l',
    name: 'Wood-Pressed Mustard Oil - 5L Can',
    image: '/images/image.webp',
    rating: 4.6,
    reviews: 650,
    category: 'Oils',
    description: 'Pure mustard oil | Therapeutic properties | Cold-pressed | Traditional processing',
    fullDescription: 'Extracted from premium mustard seeds using traditional wood-press methods. This oil has been used in Indian households for generations for its therapeutic properties and distinctive flavor.',
    tags: ['Best Seller', 'Deal', 'Winter'],
    variants: [
      { id: 'v1', size: '500ml Bottle', price: 280, originalPrice: 560, quantity: '500ml' },
      { id: 'v2', size: '1L Bottle', price: 520, originalPrice: 520, quantity: '1L' },
      { id: 'v3', size: '2L Can', price: 1000, originalPrice: 1100, quantity: '2L' },
      { id: 'v4', size: '5L Can', price: 2300, originalPrice: 2500, quantity: '5L' },
    ],
    benefits: [
      'Anti-inflammatory properties',
      'Supports circulation',
      'Excellent for massage',
      'Rich selenium content',
      'Aids skin health',
    ],
    certifications: ['FSSAI', 'ISO 22000:2018', 'Organic Certified'],
  },
  {
    id: 'wood-pressed-coconut-oil-5l',
    slug: 'wood-pressed-coconut-oil-5l',
    name: 'Wood-Pressed Coconut Oil - 5L Jar',
    image: '/images/image.webp',
    rating: 4.8,
    reviews: 1200,
    category: 'Oils',
    description: 'Pure coconut oil | Cold-pressed | Virgin quality | No refining',
    fullDescription: 'Our virgin coconut oil is cold-pressed from fresh coconuts using traditional methods. Rich in medium-chain triglycerides (MCTs), this oil is versatile and can be used for cooking, beauty, and wellness.',
    tags: ['Best Seller', 'Top Rated Choice', 'Superfood'],
    variants: [
      { id: 'v1', size: '200ml Jar', price: 250, originalPrice: 500, quantity: '200ml' },
      { id: 'v2', size: '500ml Jar', price: 580, originalPrice: 1160, quantity: '500ml' },
      { id: 'v3', size: '1L Jar', price: 1050, originalPrice: 1050, quantity: '1L' },
      { id: 'v4', size: '5L Jar', price: 4500, originalPrice: 5000, quantity: '5L' },
    ],
    benefits: [
      'MCT for quick energy',
      'Supports immune function',
      'Great for skin and hair',
      'Supports healthy weight management',
      'Thermogenic properties',
    ],
    certifications: ['FSSAI', 'ISO 22000:2018', 'Organic Certified'],
  },
  {
    id: 'khapli-wheat-atta-5kg',
    slug: 'khapli-wheat-atta-5kg',
    name: 'Khapli Wheat Atta - 5kg Sack',
    image: '/images/image.webp',
    rating: 4.8,
    reviews: 450,
    category: 'Atta',
    description: 'Ancient Emmer wheat flour | Low gluten | High fiber | Stone ground',
    fullDescription: 'Our Khapli Wheat Atta is made from the ancient Emmer wheat variety, known for its low gluten content and high fiber. Stone ground to preserve nutrients, this atta is perfect for making soft, healthy rotis that are easy to digest.',
    tags: ['Best Seller', 'Healthy Choice'],
    variants: [
      { id: 'v1', size: '1kg Pack', price: 180, originalPrice: 200, quantity: '1kg' },
      { id: 'v2', size: '5kg Sack', price: 850, originalPrice: 1000, quantity: '5kg' },
    ],
    benefits: [
      'Low glycemic index',
      'High in dietary fiber',
      'Rich in complex carbohydrates',
      'Easy on digestion',
      'Traditional stone ground',
    ],
    certifications: ['FSSAI', 'Organic Certified'],
  },
  {
    id: 'immunity-booster-combo',
    slug: 'immunity-booster-combo',
    name: 'Immunity Booster Combo',
    image: '/images/image.webp',
    rating: 4.9,
    reviews: 320,
    category: 'Combo',
    description: 'A2 Ghee + Turmeric Honey + Chyawanprash | Complete immunity shield',
    fullDescription: 'Boost your family\'s immunity with our specially curated Immunity Booster Combo. Includes our premium A2 Gir Cow Ghee, raw Turmeric Honey, and traditional Chyawanprash. A perfect gift of health.',
    tags: ['Health Partner', 'Combo'],
    variants: [
      { id: 'v1', size: 'Standard Pack', price: 1500, originalPrice: 1800, quantity: '1 Pack' },
    ],
    benefits: [
      'Complete immunity support',
      'Traditional formulations',
      'Daily health essentials',
      'Antioxidant rich',
      'Great value pack',
    ],
    certifications: ['FSSAI', 'GMP Certified'],
  },
]

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category)
}

export function getAllCategories(): string[] {
  return Array.from(new Set(products.map((p) => p.category)))
}
