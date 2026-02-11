import { TreeDeciduous, Factory, ClipboardCheck, Tractor } from 'lucide-react'

export function Features() {
  const features = [
    {
      icon: TreeDeciduous,
      title: 'Native Sourcing',
      description: 'Highest quality raw material from native regions all over India.',
    },
    {
      icon: Factory,
      title: 'Traditional Processing',
      description: 'Minimally processed using time-tested Bilona methods for maximum nutrition.',
    },
    {
      icon: ClipboardCheck,
      title: 'Extensive Quality Checks',
      description: 'Everything goes through 40+ lab tests, to make sure that you get only what is best.',
    },
    {
      icon: Tractor,
      title: 'Better Rural Lives',
      description: '5000+ farmer families are empowered with every Gau Krishna product you buy.',
    },
  ]

  return (
    <section className="py-20 bg-[#f8faf9]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[#1a5f48] font-bold tracking-widest uppercase text-sm mb-2 block">Why Choose Us</span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900">
            The Gau Krishna <span className="text-[#1a5f48]">Difference</span>
          </h2>
          <div className="w-24 h-1 bg-[#1a5f48] mx-auto mt-6 rounded-full opacity-20"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
            >
              <div className="h-16 w-16 mb-6 flex items-center justify-center rounded-xl bg-[#dcf0e8]/50 text-[#1a5f48] group-hover:bg-[#1a5f48] group-hover:text-white transition-colors duration-300">
                <feature.icon strokeWidth={1.5} className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#1a5f48] transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-500 leading-relaxed text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
