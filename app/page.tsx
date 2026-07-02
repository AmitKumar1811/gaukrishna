import { AnimatedHero } from '@/components/homepage/animated-hero'
import { Categories } from '@/components/categories'
import { StatsSection } from '@/components/homepage/stats-section'
import { FeaturesModern } from '@/components/homepage/features-modern'
import { IngredientsModern } from '@/components/homepage/ingredients-modern'
import { QualityModern } from '@/components/homepage/quality-modern'
import { CertificationsBanner } from '@/components/homepage/certifications-banner'
import { TestimonialsModern } from '@/components/homepage/testimonials-modern'
import { CTASection } from '@/components/homepage/cta-section'
import { Footer } from '@/components/footer'

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1 pb-24 sm:pb-0">
        <AnimatedHero />
        <Categories />
        <StatsSection />
        <FeaturesModern />
        <IngredientsModern />
        <QualityModern />
        <CertificationsBanner />
        <TestimonialsModern />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
