'use client'

import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { FlaskConical, Microscope, ShieldCheck, FileCheck } from 'lucide-react'

const qualitySteps = [
  {
    icon: FlaskConical,
    number: '01',
    title: 'In-House R&D Experts And Certified Labs',
    subtitle: "Unlike others, we don't outsource safety.",
  },
  {
    icon: Microscope,
    number: '02',
    title: '40+ Quality Checks. Every Single Batch.',
    subtitle: 'Fatty acid profile. Texture. Moisture. Adulteration. Nothing gets missed.',
  },
  {
    icon: ShieldCheck,
    number: '03',
    title: '3 Layers of Testing. Zero Room for Error.',
    subtitle: 'We test at sourcing, processing, and packaging for purity and nutrition.',
  },
  {
    icon: FileCheck,
    number: '04',
    title: "See the Proof. Don't Just Trust Us.",
    subtitle: 'Lab reports for every batch. Real trust is built on transparency.',
  },
]

export function QualityModern() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-[#f0f7f4] via-[#f5faf8] to-[#f8faf7] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 w-[800px] h-[400px] bg-gradient-radial from-[#1a5f48]/5 to-transparent rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal direction="up" className="text-center mb-12 md:mb-16">
          <span className="text-[#1a5f48] font-semibold tracking-widest uppercase text-xs md:text-sm mb-3 block">
            Quality Promise
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Only Perfect Makes{' '}
            <span className="text-[#1a5f48]">The Cut</span>
          </h2>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
            Three-stage testing + transparent reports — because real quality speaks for itself.
          </p>
        </ScrollReveal>

        {/* Timeline / Steps */}
        <div className="relative">
          {/* Vertical line connector (desktop) */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#1a5f48]/20 via-[#1a5f48]/10 to-transparent -translate-x-1/2" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {qualitySteps.map((step, index) => (
              <ScrollReveal
                key={step.number}
                delay={index * 0.15}
                direction={index % 2 === 0 ? 'left' : 'right'}
              >
                <div className="group relative p-6 md:p-8 rounded-3xl bg-white border border-gray-100 hover:border-[#1a5f48]/20 shadow-sm hover:shadow-xl hover:shadow-[#1a5f48]/5 transition-all duration-500 hover:-translate-y-1">
                  {/* Hover glow */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#1a5f48]/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative flex items-start gap-5">
                    {/* Number + Icon */}
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <div className="w-14 h-14 rounded-2xl bg-[#1a5f48] text-white flex items-center justify-center font-bold text-lg shadow-lg shadow-[#1a5f48]/20 group-hover:scale-110 transition-transform duration-500">
                          <step.icon strokeWidth={1.5} className="h-6 w-6" />
                        </div>
                        <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#c59d48] text-white text-xs font-bold flex items-center justify-center shadow-sm">
                          {step.number}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 leading-snug group-hover:text-[#1a5f48] transition-colors duration-300">
                        {step.title}
                      </h3>
                      <p className="text-sm md:text-base text-gray-500 leading-relaxed">
                        {step.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
