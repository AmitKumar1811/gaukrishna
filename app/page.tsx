import type { Metadata } from 'next'
import { AnimatedHero } from '@/components/homepage/animated-hero'
import { Categories } from '@/components/categories'
import { StatsSection } from '@/components/homepage/stats-section'
import { FeaturesModern } from '@/components/homepage/features-modern'
import { IngredientsModern } from '@/components/homepage/ingredients-modern'
import { QualityModern } from '@/components/homepage/quality-modern'
import { CertificationsBanner } from '@/components/homepage/certifications-banner'
import { TestimonialsModern } from '@/components/homepage/testimonials-modern'
import { SeoFaqSection } from '@/components/homepage/seo-faq-section'
import { CTASection } from '@/components/homepage/cta-section'
import { Footer } from '@/components/footer'

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Store',
  name: 'Gau Krishna (Ram Rasoi)',
  alternateName: ['Gaukrishna', 'Ram Rasoi Chyawanprash', 'Gau Krishna Farm Technologies'],
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://gaukrishna.in',
  logo: '/logo1.png',
  image: '/images/a2-ghee.webp',
  description:
    'Manufacturer & direct-from-farm store for Ram Rasoi Kesar Yukt Chyawanprash, A2 Gir Cow Bilona Ghee, Virgin Coconut Oil, Wood Pressed Groundnut Oil, and Panchgavya Dhoop Batti.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Main Bus Stand, Dhingsara',
    addressLocality: 'Fatehabad',
    addressRegion: 'Haryana',
    postalCode: '125053',
    addressCountry: 'IN',
  },
  sameAs: [
    'https://www.facebook.com/ram.rasoi.2025',
    'https://www.instagram.com/ram_rasoi_chywanprash/',
    'https://www.facebook.com/rajpalsuthar.dhingsara',
  ],
}

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <main className="flex-1 pb-24 sm:pb-0">
        <AnimatedHero />
        <Categories />
        <StatsSection />
        <FeaturesModern />
        <IngredientsModern />
        <QualityModern />
        <CertificationsBanner />
        <TestimonialsModern />
        <SeoFaqSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
