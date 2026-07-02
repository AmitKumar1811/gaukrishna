'use client'

import { TreeDeciduous, Factory, ClipboardCheck, Tractor } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/scroll-reveal'

const features = [
  {
    icon: TreeDeciduous,
    title: 'Native Sourcing',
    description: 'Highest quality raw material from native regions all over India.',
    gradient: 'from-emerald-500/20 to-green-600/10',
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-600',
  },
  {
    icon: Factory,
    title: 'Traditional Processing',
    description: 'Minimally processed using time-tested Bilona methods for maximum nutrition.',
    gradient: 'from-amber-500/20 to-yellow-600/10',
    iconBg: 'bg-amber-500/10',
    iconColor: 'text-amber-600',
  },
  {
    icon: ClipboardCheck,
    title: 'Extensive Quality Checks',
    description: 'Everything goes through 40+ lab tests, to make sure you get only what is best.',
    gradient: 'from-teal-500/20 to-cyan-600/10',
    iconBg: 'bg-teal-500/10',
    iconColor: 'text-teal-600',
  },
  {
    icon: Tractor,
    title: 'Better Rural Lives',
    description: '5000+ farmer families are empowered with every Gau Krishna product you buy.',
    gradient: 'from-green-500/20 to-emerald-600/10',
    iconBg: 'bg-green-500/10',
    iconColor: 'text-green-600',
  },
]

export function FeaturesModern() {
  return (
    <section className="py-16 md:py-24 bg-[#f8faf7] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-[#1a5f48]/5 to-transparent rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal direction="up" className="text-center mb-12 md:mb-16">
          <span className="text-[#1a5f48] font-semibold tracking-widest uppercase text-xs md:text-sm mb-3 block">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            The Gau Krishna <span className="text-[#1a5f48]">Difference</span>
          </h2>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
            Every product is a promise — of purity, tradition, and care that goes beyond the ordinary.
          </p>
        </ScrollReveal>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {features.map((feature, index) => (
            <ScrollReveal key={feature.title} delay={index * 0.1} direction="up">
              <div className="group relative h-full p-6 md:p-8 rounded-3xl bg-white border border-gray-100 hover:border-[#1a5f48]/20 shadow-sm hover:shadow-xl hover:shadow-[#1a5f48]/5 transition-all duration-500 hover:-translate-y-2 cursor-default">
                {/* Hover gradient overlay */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="relative">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${feature.iconBg} mb-5 group-hover:scale-110 transition-transform duration-500`}>
                    <feature.icon strokeWidth={1.5} className={`h-7 w-7 ${feature.iconColor}`} />
                  </div>

                  {/* Text */}
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#1a5f48] transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {feature.description}
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
