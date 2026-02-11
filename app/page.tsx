import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { Categories } from '@/components/categories'
import { ProductsSection } from '@/components/products-section'
import { Features } from '@/components/features'
import { Testimonials } from '@/components/testimonials'
import { Footer } from '@/components/footer'

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <Categories />
        <ProductsSection />
        <Features />
        <Testimonials />
      </main>
      <Footer />
    </div>
  )
}
