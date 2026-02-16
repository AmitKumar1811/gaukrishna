import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { Categories } from '@/components/categories'
import { ProductsSection } from '@/components/products-section'
import { Features } from '@/components/features'
import { Testimonials } from '@/components/testimonials'
import { Footer } from '@/components/footer'
import { Ingredients } from '@/components/ingredients'
import { Quality } from '@/components/quality'
import { BottomNav } from '@/components/bottom-nav'

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pb-24 sm:pb-0">
        <Hero />
        <Categories />
        <ProductsSection />
        <Features />
        <Ingredients />
        <Quality />
        <Testimonials />
      </main>
      <Footer />
      <BottomNav />
    </div>
  )
}
