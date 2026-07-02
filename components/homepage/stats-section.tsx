'use client'

import { AnimatedCounter } from '@/components/ui/animated-counter'
import { ScrollReveal } from '@/components/ui/scroll-reveal'

const stats = [
  { value: 5000, suffix: '+', label: 'Farmer Families', description: 'empowered across India' },
  { value: 40, suffix: '+', label: 'Quality Checks', description: 'on every single batch' },
  { value: 100, suffix: '%', label: 'Pure Ingredients', description: 'no substitutes, ever' },
  { value: 50000, suffix: '+', label: 'Happy Customers', description: 'and growing daily' },
]

export function StatsSection() {
  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(26,95,72,0.03)_1px,transparent_0)] bg-[length:32px_32px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <ScrollReveal key={stat.label} delay={index * 0.1} direction="up">
              <div className="group relative text-center p-6 md:p-8 rounded-3xl bg-gradient-to-br from-white to-gray-50/80 border border-gray-100 hover:border-[#1a5f48]/20 transition-all duration-500 hover:shadow-lg hover:shadow-[#1a5f48]/5 hover:-translate-y-1">
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#1a5f48]/5 to-[#c59d48]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative">
                  <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2 tabular-nums">
                    <AnimatedCounter
                      end={stat.value}
                      suffix={stat.suffix}
                      duration={2200}
                    />
                  </div>
                  <div className="text-sm md:text-base font-semibold text-[#1a5f48] mb-1">
                    {stat.label}
                  </div>
                  <div className="text-xs md:text-sm text-gray-400">
                    {stat.description}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
