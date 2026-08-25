'use client'

import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { Leaf, Droplets, Wheat, FlaskConical } from 'lucide-react'

const ingredientCards = [
  {
    icon: Leaf,
    title: 'From Native Geographies to Ideal Growing Seasons',
    subtitle: 'We take care of every factor when sourcing local ingredients.',
    gradient: 'from-[#e8f5e9] to-[#f1f8e9]',
    accent: '#2e7d32',
  },
  {
    icon: FlaskConical,
    title: 'What Do We Look For?',
    subtitle: 'Not high yield. Not lower cost. Just flavour, nutrition, and soul.',
    gradient: 'from-[#fff8e1] to-[#fef3c7]',
    accent: '#f59e0b',
  },
  {
    icon: Droplets,
    title: 'Impurities, Out. Goodness, In.',
    subtitle: 'Only the best seeds & purest milk make the cut.',
    gradient: 'from-[#f3e8ff] to-[#ede9fe]',
    accent: '#7c3aed',
  },
  {
    icon: Wheat,
    title: 'A2 Milk of Gir Cows, Native Seeds & More',
    subtitle: 'We dare you to find better native ingredients.',
    gradient: 'from-[#e0f2f1] to-[#e8f5e9]',
    accent: '#1a5f48',
  },
]

export function IngredientsModern() {
  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-radial from-[#c59d48]/5 to-transparent rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal direction="up" className="text-center mb-12 md:mb-16">
          <div className="flex flex-col items-center justify-center gap-1 mb-4 opacity-90">
            <span className="text-[#c59d48] font-serif text-xl sm:text-2xl tracking-widest">
              प्रकृति का सच्चा वरदान
            </span>
            <span className="text-[#c59d48]/70 text-[10px] uppercase tracking-[0.2em] font-semibold">
              Nature's True Blessing
            </span>
          </div>
          <span className="text-[#c59d48] font-semibold tracking-widest uppercase text-xs md:text-sm mb-3 block mt-2">
            Our Ingredients
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Native Ingredients.{' '}
            <span className="bg-gradient-to-r from-[#c59d48] to-[#d4b85a] bg-clip-text text-transparent">
              No Substitutes.
            </span>
          </h2>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
            Pure sourcing + traditional methods for every batch.
          </p>
        </ScrollReveal>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {ingredientCards.map((card, index) => (
            <ScrollReveal
              key={card.title}
              delay={index * 0.12}
              direction={index % 2 === 0 ? 'left' : 'right'}
            >
              <div className={`group relative rounded-3xl bg-gradient-to-br ${card.gradient} p-8 md:p-10 border border-white/60 hover:shadow-xl transition-all duration-500 hover:-translate-y-1 min-h-[200px] flex flex-col justify-between overflow-hidden`}>
                {/* Hover glow */}
                <div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at 80% 20%, ${card.accent}10, transparent 60%)`,
                  }}
                />

                <div className="relative">
                  <div
                    className="inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-5 transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundColor: `${card.accent}15` }}
                  >
                    <card.icon
                      strokeWidth={1.5}
                      className="h-6 w-6"
                      style={{ color: card.accent }}
                    />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 leading-tight">
                    {card.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    {card.subtitle}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
